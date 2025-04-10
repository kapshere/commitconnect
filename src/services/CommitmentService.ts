
import { supabase } from "@/integrations/supabase/client";
import { Commitment, CommitmentStatus, CommitmentType } from "@/types/commitments";

export class CommitmentService {
  /**
   * Creates a new commitment
   * @param commitment Commitment data to create
   * @returns The created commitment with its id
   */
  static async createCommitment(commitment: Omit<Commitment, 'id'>): Promise<Commitment> {
    const { data, error } = await supabase
      .from('commitments')
      .insert({
        ...commitment,
        createdAt: new Date().toISOString(),
      })
      .select()
      .single();
    
    if (error) {
      console.error("Error creating commitment:", error);
      throw new Error(`Failed to create commitment: ${error.message}`);
    }
    
    return data as Commitment;
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
      .select('*')
      .eq('createdBy', user.user.id)
      .order('createdAt', { ascending: false });
      
    if (error) {
      console.error("Error fetching commitments:", error);
      throw new Error(`Failed to fetch commitments: ${error.message}`);
    }
    
    return data as Commitment[];
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
    
    const { data, error } = await supabase
      .from('commitment_parties')
      .select('commitment_id')
      .eq('user_id', user.user.id);
      
    if (error) {
      console.error("Error fetching participating commitments:", error);
      throw new Error(`Failed to fetch participating commitments: ${error.message}`);
    }
    
    if (!data || data.length === 0) {
      return [];
    }
    
    const commitmentIds = data.map(item => item.commitment_id);
    
    const { data: commitments, error: commitmentsError } = await supabase
      .from('commitments')
      .select('*')
      .in('id', commitmentIds)
      .order('createdAt', { ascending: false });
      
    if (commitmentsError) {
      console.error("Error fetching commitments by IDs:", commitmentsError);
      throw new Error(`Failed to fetch commitments by IDs: ${commitmentsError.message}`);
    }
    
    return commitments as Commitment[];
  }
  
  /**
   * Gets a commitment by its ID
   * @param id The commitment ID
   * @returns The commitment or null if not found
   */
  static async getCommitmentById(id: string): Promise<Commitment | null> {
    const { data, error } = await supabase
      .from('commitments')
      .select('*')
      .eq('id', id)
      .maybeSingle();
      
    if (error) {
      console.error("Error fetching commitment:", error);
      throw new Error(`Failed to fetch commitment: ${error.message}`);
    }
    
    return data as Commitment | null;
  }
  
  /**
   * Updates a commitment by its ID
   * @param id The commitment ID
   * @param updates The fields to update
   * @returns The updated commitment
   */
  static async updateCommitment(id: string, updates: Partial<Commitment>): Promise<Commitment> {
    const { data, error } = await supabase
      .from('commitments')
      .update({
        ...updates,
        updatedAt: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();
      
    if (error) {
      console.error("Error updating commitment:", error);
      throw new Error(`Failed to update commitment: ${error.message}`);
    }
    
    return data as Commitment;
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
      .select('*');
      
    if (error) {
      console.error("Error fetching commitment types:", error);
      throw new Error(`Failed to fetch commitment types: ${error.message}`);
    }
    
    return data.map(type => type.name) as CommitmentType[];
  }
}
