
# Migration Guide: From Supabase to Amazon QLDB

This document outlines the process for migrating from Supabase to Amazon QLDB (Quantum Ledger Database) for the Connect application's commitment storage system.

## Why Migrate to QLDB?

While Supabase provides an excellent starting point with its PostgreSQL database, auth system, and real-time capabilities, Amazon QLDB offers specific advantages for commitment tracking:

1. **Immutable History**: QLDB maintains a complete, immutable, and cryptographically verifiable history of all data changes.
2. **Built-in Verification**: Cryptographic verification of data integrity without the overhead of a distributed consensus mechanism.
3. **Audit Trail**: Complete audit trail for regulatory compliance and dispute resolution.
4. **Performance**: High transaction throughput with consistent, predictable performance.

## Migration Strategy

### 1. Preparation Phase

#### Data Mapping
- Map Supabase table structures to QLDB document structures
- Design the QLDB ledger and table organization
- Create data transformation scripts for the migration

#### API Abstraction
- Implement a data access abstraction layer if not already present
- This allows switching between Supabase and QLDB without changing application code

#### Testing Environment
- Set up a parallel QLDB environment for testing
- Create test datasets representative of production data

### 2. Implementation Phase

#### QLDB Setup
```typescript
// Example QLDB setup code
import { QldbDriver, RetryConfig } from 'amazon-qldb-driver-nodejs';

const maxRetries = 3;
const retryConfig = new RetryConfig(maxRetries);

const qldbDriver = new QldbDriver('connect-commitments-ledger', 
  { retryConfig });

// Create tables and indexes
await qldbDriver.executeLambda(async (txn) => {
  await txn.execute('CREATE TABLE commitments');
  await txn.execute('CREATE INDEX ON commitments (id)');
  await txn.execute('CREATE INDEX ON commitments (createdBy)');
  // Additional tables and indexes as needed
});
```

#### Data Access Layer
```typescript
// Example data access layer
class CommitmentRepository {
  // Interface methods
  async getCommitmentById(id: string): Promise<Commitment> {
    // Implementation will vary based on current storage
    if (useQldb) {
      return this.getCommitmentFromQldb(id);
    } else {
      return this.getCommitmentFromSupabase(id);
    }
  }
  
  // Supabase implementation
  private async getCommitmentFromSupabase(id: string): Promise<Commitment> {
    const { data, error } = await supabase
      .from('commitments')
      .select('*')
      .eq('id', id)
      .single();
      
    if (error) throw error;
    return data;
  }
  
  // QLDB implementation
  private async getCommitmentFromQldb(id: string): Promise<Commitment> {
    const result = await qldbDriver.executeLambda(async (txn) => {
      return await txn.execute(
        'SELECT * FROM commitments WHERE id = ?', id
      );
    });
    
    if (result.getResultList().length === 0) {
      throw new Error('Commitment not found');
    }
    
    return result.getResultList()[0].toJSON() as Commitment;
  }
}
```

### 3. Migration Phase

#### Dual-Write Stage
- Update application to write to both Supabase and QLDB
- Continue reading from Supabase as the source of truth
- Implement verification routines to ensure data consistency

#### Data Migration
- Export existing data from Supabase
- Transform data to fit QLDB document model
- Import data into QLDB with appropriate timestamps and metadata

#### Cutover Stage
- Update application to read from QLDB
- Monitor for any issues during a controlled rollout
- Maintain Supabase as a fallback for a defined grace period

### 4. Post-Migration Phase

#### Verification
- Run comprehensive data integrity checks
- Ensure all application features work correctly with QLDB
- Validate performance meets requirements

#### Cleanup
- Decommission Supabase components once QLDB is stable
- Remove dual-write code paths
- Archive Supabase data for reference

## QLDB Specific Considerations

### Document Model
QLDB uses a document data model similar to MongoDB rather than the relational model of PostgreSQL. Design your documents to take advantage of this:

```json
{
  "id": "commit-123",
  "title": "Business Partnership Agreement",
  "description": "Terms for partnership between Company A and Company B",
  "type": "business",
  "status": "active",
  "createdAt": "2023-04-01T12:00:00Z",
  "createdBy": "user-456",
  "parties": [
    {
      "userId": "user-456",
      "role": "creator"
    },
    {
      "userId": "user-789",
      "role": "participant"
    }
  ],
  "terms": "Both parties agree to share profits equally...",
  "documents": [
    {
      "name": "contract.pdf",
      "url": "https://storage.example.com/contract.pdf",
      "uploadedAt": "2023-04-01T12:05:00Z"
    }
  ]
}
```

### Historical Queries
QLDB excels at historical queries using its built-in history function:

```sql
SELECT h.data.title, h.metadata.version 
FROM history(commitments) AS h 
WHERE h.data.id = 'commit-123'
```

### Verification
Use QLDB's digest functionality to verify the integrity of your data:

```typescript
async function verifyCommitment(commitmentId: string, expectedDigest: string): Promise<boolean> {
  const digest = await qldbDriver.getDigest();
  
  const proof = await qldbDriver.getRevision({
    blockAddress: {
      strandId: "00000001",
      sequenceNo: 123
    },
    documentId: commitmentId,
    digestTipAddress: digest.digestTipAddress
  });
  
  return QLDB.verifyDocument({
    documentHash: proof.proof.hash,
    digest: proof.digest,
    proof: proof.proof
  });
}
```

## Technical Challenges

### Data Consistency
- Ensure all QLDB transactions are ACID compliant
- Handle conflict resolution during the dual-write phase

### Schema Differences
- Address differences between relational and document models
- Optimize document structure for common query patterns

### Performance Tuning
- Adjust QLDB read/write capacity for optimal performance
- Implement appropriate caching strategies

## Rollback Plan

In case of critical issues during migration:
1. Revert application to read from Supabase
2. Continue dual-writing to both systems
3. Address issues in the QLDB implementation
4. Retry migration after resolving problems

## Timeline and Resources

- **Planning**: 2-3 weeks
- **Implementation**: 4-6 weeks
- **Migration**: 1-2 weeks
- **Validation and Cleanup**: 2 weeks

**Required Resources**:
- Backend developers familiar with both Supabase and AWS
- DevOps engineer for AWS infrastructure setup
- QA resources for thorough testing
- Product owner involvement for feature validation
