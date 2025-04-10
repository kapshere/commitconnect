
import { supabase } from "@/integrations/supabase/client";
import { Commitment, CommitmentStatus, CommitmentType } from "@/types/commitments";

export class CommitmentService {
  /**
   * Creates a new commitment
   * @param commitment Commitment data to create
   * @returns The created commitment with its id
   */
  static async createCommitment(commitment: Omit<Commitment, 'id'>): Promise<Commitment> {
    // Map the commitment data to match the database schema
    const commitmentData = {
      title: commitment.title,
      description: commitment.description,
      type: commitment.type,
      status: commitment.status,
      created_by: commitment.createdBy,
      deadline: commitment.deadline,
      value: commitment.value,
      
      // Type-specific fields
      is_public: 'isPublic' in commitment ? (commitment as any).isPublic : null,
      goal: 'goal' in commitment ? (commitment as any).goal : null,
      milestone: 'milestone' in commitment ? (commitment as any).milestone : null,
      terms: 'terms' in commitment ? (commitment as any).terms : null,
      contract_type: 'contractType' in commitment ? (commitment as any).contractType : null,
      contract_details: 'contractDetails' in commitment ? (commitment as any).contractDetails : null,
      religion: 'religion' in commitment ? (commitment as any).religion : null,
      deity: 'deity' in commitment ? (commitment as any).deity : null,
      ritual: 'ritual' in commitment ? (commitment as any).ritual : null,
      promise_type: 'promiseType' in commitment ? (commitment as any).promiseType : null,
      occasion: 'occasion' in commitment ? (commitment as any).occasion : null,
      secret_encrypted: 'secretEncrypted' in commitment ? (commitment as any).secretEncrypted : null,
      trust_level: 'trustLevel' in commitment ? (commitment as any).trustLevel : null
    };
    
    // Insert the commitment
    const { data, error } = await supabase
      .from('commitments')
      .insert(commitmentData)
      .select()
      .single();
    
    if (error) {
      console.error("Error creating commitment:", error);
      throw new Error(`Failed to create commitment: ${error.message}`);
    }
    
    // Then, if there are parties, insert them
    if (commitment.parties && commitment.parties.length > 0) {
      const partiesData = commitment.parties.map(party => ({
        commitment_id: data.id,
        user_id: party.id,
        name: party.name,
        email: party.email || null,
        role: party.role
      }));
      
      const { error: partiesError } = await supabase
        .from('commitment_parties')
        .insert(partiesData);
        
      if (partiesError) {
        console.error("Error adding commitment parties:", partiesError);
        // We don't throw here to avoid transaction-like behavior that's hard to handle
        // The commitment is created, but parties might not be
      }
    }
    
    // Map the DB response back to our app's Commitment type
    return mapDbCommitmentToAppCommitment(data);
  }
  
  /**
   * Gets all commitments for the current user
   * @returns List of commitments
   */
  static async getUserCommitments(): Promise<Commitment[]> {
    const { data: user } = await supabase.auth.getUser();
    
    if (!user.user) {
      throw new Error("User not authenticated");
    }
    
    const { data, error } = await supabase
      .from('commitments')
      .select(`
        *,
        commitment_parties(*)
      `)
      .eq('created_by', user.user.id)
      .order('created_at', { ascending: false });
      
    if (error) {
      console.error("Error fetching commitments:", error);
      throw new Error(`Failed to fetch commitments: ${error.message}`);
    }
    
    return data.map(mapDbCommitmentToAppCommitment);
  }
  
  /**
   * Gets commitments where the user is a participant
   * @returns List of commitments
   */
  static async getParticipatingCommitments(): Promise<Commitment[]> {
    const { data: user } = await supabase.auth.getUser();
    
    if (!user.user) {
      throw new Error("User not authenticated");
    }
    
    // First get all commitment IDs where the user is a party
    const { data: partyData, error: partyError } = await supabase
      .from('commitment_parties')
      .select('commitment_id')
      .eq('user_id', user.user.id);
      
    if (partyError) {
      console.error("Error fetching participating commitments:", partyError);
      throw new Error(`Failed to fetch participating commitments: ${partyError.message}`);
    }
    
    if (!partyData || partyData.length === 0) {
      return [];
    }
    
    // Then get the actual commitments
    const commitmentIds = partyData.map(item => item.commitment_id);
    
    const { data, error } = await supabase
      .from('commitments')
      .select(`
        *,
        commitment_parties(*)
      `)
      .in('id', commitmentIds)
      .order('created_at', { ascending: false });
      
    if (error) {
      console.error("Error fetching commitments by IDs:", error);
      throw new Error(`Failed to fetch commitments by IDs: ${error.message}`);
    }
    
    return data.map(mapDbCommitmentToAppCommitment);
  }
  
  /**
   * Gets a commitment by its ID
   * @param id The commitment ID
   * @returns The commitment or null if not found
   */
  static async getCommitmentById(id: string): Promise<Commitment | null> {
    const { data, error } = await supabase
      .from('commitments')
      .select(`
        *,
        commitment_parties(*)
      `)
      .eq('id', id)
      .maybeSingle();
      
    if (error) {
      console.error("Error fetching commitment:", error);
      throw new Error(`Failed to fetch commitment: ${error.message}`);
    }
    
    if (!data) return null;
    
    return mapDbCommitmentToAppCommitment(data);
  }
  
  /**
   * Updates a commitment by its ID
   * @param id The commitment ID
   * @param updates The fields to update
   * @returns The updated commitment
   */
  static async updateCommitment(id: string, updates: Partial<Commitment>): Promise<Commitment> {
    // Map the updates to match the database schema
    const dbUpdates: any = {};
    
    if (updates.title) dbUpdates.title = updates.title;
    if (updates.description) dbUpdates.description = updates.description;
    if (updates.status) dbUpdates.status = updates.status;
    if (updates.deadline) dbUpdates.deadline = updates.deadline;
    if (updates.value !== undefined) dbUpdates.value = updates.value;
    
    // Handle type-specific fields
    if ('isPublic' in updates) dbUpdates.is_public = (updates as any).isPublic;
    if ('goal' in updates) dbUpdates.goal = (updates as any).goal;
    if ('milestone' in updates) dbUpdates.milestone = (updates as any).milestone;
    if ('terms' in updates) dbUpdates.terms = (updates as any).terms;
    if ('contractType' in updates) dbUpdates.contract_type = (updates as any).contractType;
    if ('contractDetails' in updates) dbUpdates.contract_details = (updates as any).contractDetails;
    if ('religion' in updates) dbUpdates.religion = (updates as any).religion;
    if ('deity' in updates) dbUpdates.deity = (updates as any).deity;
    if ('ritual' in updates) dbUpdates.ritual = (updates as any).ritual;
    if ('promiseType' in updates) dbUpdates.promise_type = (updates as any).promiseType;
    if ('occasion' in updates) dbUpdates.occasion = (updates as any).occasion;
    if ('secretEncrypted' in updates) dbUpdates.secret_encrypted = (updates as any).secretEncrypted;
    if ('trustLevel' in updates) dbUpdates.trust_level = (updates as any).trustLevel;

    // Add updated_at timestamp
    dbUpdates.updated_at = new Date().toISOString();
    
    const { data, error } = await supabase
      .from('commitments')
      .update(dbUpdates)
      .eq('id', id)
      .select(`
        *,
        commitment_parties(*)
      `)
      .single();
      
    if (error) {
      console.error("Error updating commitment:", error);
      throw new Error(`Failed to update commitment: ${error.message}`);
    }
    
    // Update parties if provided
    if (updates.parties) {
      // First, delete existing parties
      const { error: deleteError } = await supabase
        .from('commitment_parties')
        .delete()
        .eq('commitment_id', id);
        
      if (deleteError) {
        console.error("Error deleting existing parties:", deleteError);
        // Continue anyway to try inserting new parties
      }
      
      // Then insert new parties
      const partiesData = updates.parties.map(party => ({
        commitment_id: id,
        user_id: party.id,
        name: party.name,
        email: party.email || null,
        role: party.role
      }));
      
      if (partiesData.length > 0) {
        const { error: insertError } = await supabase
          .from('commitment_parties')
          .insert(partiesData);
          
        if (insertError) {
          console.error("Error inserting new parties:", insertError);
          // Continue anyway, commitment is updated
        }
      }
    }
    
    return mapDbCommitmentToAppCommitment(data);
  }
  
  /**
   * Updates the status of a commitment
   * @param id The commitment ID
   * @param status The new status
   * @returns The updated commitment
   */
  static async updateCommitmentStatus(id: string, status: CommitmentStatus): Promise<Commitment> {
    return this.updateCommitment(id, { status });
  }
  
  /**
   * Deletes a commitment by its ID
   * @param id The commitment ID
   */
  static async deleteCommitment(id: string): Promise<void> {
    const { error } = await supabase
      .from('commitments')
      .delete()
      .eq('id', id);
      
    if (error) {
      console.error("Error deleting commitment:", error);
      throw new Error(`Failed to delete commitment: ${error.message}`);
    }
  }
  
  /**
   * Gets all commitment types from the database
   * @returns List of commitment types
   */
  static async getCommitmentTypes(): Promise<CommitmentType[]> {
    const { data, error } = await supabase
      .from('commitment_types')
      .select('name');
      
    if (error) {
      console.error("Error fetching commitment types:", error);
      throw new Error(`Failed to fetch commitment types: ${error.message}`);
    }
    
    return data.map(type => type.name as CommitmentType);
  }
}

/**
 * Helper function to map database commitment objects to application commitment objects
 */
function mapDbCommitmentToAppCommitment(dbCommitment: any): Commitment {
  // Map parties if they exist
  const parties = dbCommitment.commitment_parties 
    ? dbCommitment.commitment_parties.map((party: any) => ({
        id: party.user_id,
        name: party.name,
        email: party.email || undefined,
        role: party.role as "associated" | "informed"
      }))
    : [];

  // Create base commitment
  const baseCommitment = {
    id: dbCommitment.id,
    title: dbCommitment.title,
    description: dbCommitment.description,
    type: dbCommitment.type as CommitmentType,
    createdAt: dbCommitment.created_at,
    deadline: dbCommitment.deadline || undefined,
    status: dbCommitment.status as CommitmentStatus,
    createdBy: dbCommitment.created_by,
    parties: parties,
    value: dbCommitment.value || undefined
  };
  
  // Add type-specific fields
  switch (dbCommitment.type) {
    case 'personal':
      return {
        ...baseCommitment,
        type: 'personal',
        isPublic: !!dbCommitment.is_public,
        goal: dbCommitment.goal || '',
        milestone: dbCommitment.milestone
      };
      
    case 'business':
      return {
        ...baseCommitment,
        type: 'business',
        documents: [], // We would need to fetch these separately if needed
        terms: dbCommitment.terms
      };
      
    case 'contract':
      return {
        ...baseCommitment,
        type: 'contract',
        contractType: dbCommitment.contract_type as any || 'other',
        contractDetails: dbCommitment.contract_details || '',
        documents: [] // We would need to fetch these separately if needed
      };
      
    case 'religious':
      return {
        ...baseCommitment,
        type: 'religious',
        religion: dbCommitment.religion || '',
        deity: dbCommitment.deity || '',
        ritual: dbCommitment.ritual
      };
      
    case 'promise':
      return {
        ...baseCommitment,
        type: 'promise',
        promiseType: dbCommitment.promise_type || ''
      };
      
    case 'friendly':
      return {
        ...baseCommitment,
        type: 'friendly',
        occasion: dbCommitment.occasion
      };
      
    case 'trust':
      return {
        ...baseCommitment,
        type: 'trust',
        secretEncrypted: dbCommitment.secret_encrypted || '',
        trustLevel: (dbCommitment.trust_level as any) || 'medium'
      };
      
    default:
      // Fallback to basic commitment type
      return {
        ...baseCommitment,
        type: dbCommitment.type as CommitmentType
      } as Commitment;
  }
}
