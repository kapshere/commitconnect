
# Backend Architecture Documentation

## Overview

This document outlines the backend architecture for the Connect application, which is designed to store and manage commitments between users. The system is initially implemented using Supabase for data storage but designed with the flexibility to migrate to Amazon QLDB (Quantum Ledger Database) in the future.

## Core Components

### 1. Data Storage Layer

#### Current Implementation: Supabase

The application uses Supabase as the primary data store with the following key features:
- **PostgreSQL Database**: Core relational database for storing all commitment and user data
- **Row-Level Security (RLS)**: Controls data access at the row level based on user authentication
- **Real-time Subscriptions**: Enables real-time updates to connected clients

#### Future Implementation: Amazon QLDB

Amazon QLDB provides:
- **Immutability**: Complete, cryptographically verifiable history of data changes
- **Blockchain-like Features**: Cryptographic verification without the distributed consensus overhead
- **Document-oriented Model**: Flexible schema for commitment data

### 2. Authentication System

- **User Authentication**: Email/password, social logins, and token-based auth using Supabase Auth
- **Session Management**: Secure token handling and refresh mechanisms
- **Authorization**: Role-based access control for different commitment types

### 3. API Layer

- **RESTful API**: For standard CRUD operations on commitments and user data
- **GraphQL API**: For more complex queries and real-time subscriptions
- **Serverless Functions**: For handling business logic, validations, and integrations

### 4. Business Logic Layer

- **Commitment Management**: Creation, updates, status changes
- **Validation Service**: Ensures commitments meet required criteria
- **Notification System**: Alerts for commitment changes and deadlines

## Database Schema

### Key Tables

1. **profiles**
   - User profile information linked to auth system

2. **commitments**
   - Core table for all commitment records
   - Contains common fields like title, description, status
   - Linked to specific users via foreign keys

3. **commitment_types**
   - Different types of commitments (personal, business, etc.)
   - Configuration for type-specific behavior

4. **commitment_parties**
   - Junction table for many-to-many relationship between users and commitments
   - Stores the role of each user in the commitment (creator, participant, witness)

5. **commitment_documents**
   - Stores links to documents associated with commitments
   - Handles document versioning and metadata

6. **commitment_history**
   - Audit trail of all changes to commitments
   - Critical for verification and dispute resolution

## Security Model

- **Row-Level Security**: Users can only access commitments they're authorized to see
- **Data Encryption**: Sensitive data fields are encrypted at rest
- **API Authentication**: JWT-based authentication for all API requests
- **Input Validation**: Thorough validation of all user inputs

## Migration Path: Supabase to QLDB

### Phase 1: Supabase Implementation
- Implement core functionality using Supabase
- Design schema with future migration in mind

### Phase 2: Hybrid Operation
- Implement QLDB connectors alongside existing Supabase system
- Begin dual-writing critical commitment data to both systems
- Implement verification processes between systems

### Phase 3: Full Migration
- Migrate historical data from Supabase to QLDB
- Update all read operations to use QLDB as source of truth
- Decommission Supabase components once migration is verified

## Integration Points

- **Payment Processing**: Integration with payment gateways for financial commitments
- **Calendar Systems**: For deadline management and reminders
- **Document Storage**: For storing and managing commitment-related documents
- **Notification Services**: Email, SMS, and push notifications for important events

## Monitoring and Operations

- **Logging Strategy**: Structured logging with different verbosity levels
- **Metrics Collection**: Performance metrics for all key components
- **Alerting System**: Proactive alerts for potential issues
- **Backup Strategy**: Regular backups with point-in-time recovery

## Technical Requirements

- **Scalability**: Designed to handle thousands of concurrent users
- **Availability**: 99.9% uptime target
- **Performance**: API response times under 200ms for standard operations
- **Data Integrity**: Cryptographic verification of all commitment data
