
import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { CommitmentService } from "@/services/CommitmentService";
import { Commitment, CommitmentStatus } from "@/types/commitments";
import { useToast } from "@/hooks/use-toast";

export function useCommitments() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Get all user commitments
  const {
    data: commitments,
    isLoading: isLoadingCommitments,
    error: commitmentsError,
    refetch: refetchCommitments
  } = useQuery({
    queryKey: ["commitments", "user"],
    queryFn: () => CommitmentService.getUserCommitments(),
    refetchOnWindowFocus: false,
  });

  // Get commitments where user is participating
  const {
    data: participatingCommitments,
    isLoading: isLoadingParticipating,
    error: participatingError,
  } = useQuery({
    queryKey: ["commitments", "participating"],
    queryFn: () => CommitmentService.getParticipatingCommitments(),
    refetchOnWindowFocus: false,
  });

  // Create commitment mutation
  const createCommitment = useMutation({
    mutationFn: (newCommitment: Omit<Commitment, 'id'>) => 
      CommitmentService.createCommitment(newCommitment),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["commitments"] });
      toast({
        title: "Commitment Created",
        description: "Your commitment has been created successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error Creating Commitment",
        description: error instanceof Error ? error.message : "Unknown error occurred",
        variant: "destructive",
      });
    },
  });

  // Update commitment mutation
  const updateCommitment = useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<Commitment> }) =>
      CommitmentService.updateCommitment(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["commitments"] });
      toast({
        title: "Commitment Updated",
        description: "Your commitment has been updated successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error Updating Commitment",
        description: error instanceof Error ? error.message : "Unknown error occurred",
        variant: "destructive",
      });
    },
  });

  // Update status mutation
  const updateCommitmentStatus = useMutation({
    mutationFn: ({ id, status }: { id: string; status: CommitmentStatus }) =>
      CommitmentService.updateCommitmentStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["commitments"] });
      toast({
        title: "Status Updated",
        description: "Commitment status has been updated successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error Updating Status",
        description: error instanceof Error ? error.message : "Unknown error occurred",
        variant: "destructive",
      });
    },
  });

  // Delete commitment mutation
  const deleteCommitment = useMutation({
    mutationFn: (id: string) => CommitmentService.deleteCommitment(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["commitments"] });
      toast({
        title: "Commitment Deleted",
        description: "Your commitment has been deleted successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error Deleting Commitment",
        description: error instanceof Error ? error.message : "Unknown error occurred",
        variant: "destructive",
      });
    },
  });

  // Handle errors
  useEffect(() => {
    if (commitmentsError) {
      toast({
        title: "Error Loading Commitments",
        description: commitmentsError instanceof Error ? commitmentsError.message : "Unknown error occurred",
        variant: "destructive",
      });
    }

    if (participatingError) {
      toast({
        title: "Error Loading Participating Commitments",
        description: participatingError instanceof Error ? participatingError.message : "Unknown error occurred",
        variant: "destructive",
      });
    }
  }, [commitmentsError, participatingError, toast]);

  return {
    // Queries
    commitments,
    participatingCommitments,
    isLoadingCommitments,
    isLoadingParticipating,
    refetchCommitments,
    
    // Mutations
    createCommitment: createCommitment.mutate,
    isCreatingCommitment: createCommitment.isPending,
    
    updateCommitment: updateCommitment.mutate,
    isUpdatingCommitment: updateCommitment.isPending,
    
    updateCommitmentStatus: updateCommitmentStatus.mutate,
    isUpdatingStatus: updateCommitmentStatus.isPending,
    
    deleteCommitment: deleteCommitment.mutate,
    isDeletingCommitment: deleteCommitment.isPending,
  };
}

// Hook to get a single commitment by ID
export function useCommitment(id?: string) {
  const { toast } = useToast();
  
  const {
    data: commitment,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["commitment", id],
    queryFn: () => id ? CommitmentService.getCommitmentById(id) : null,
    enabled: !!id,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (error) {
      toast({
        title: "Error Loading Commitment",
        description: error instanceof Error ? error.message : "Unknown error occurred",
        variant: "destructive",
      });
    }
  }, [error, toast]);

  return {
    commitment,
    isLoading,
    error,
    refetch,
  };
}
