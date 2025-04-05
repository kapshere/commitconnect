
export type CommitmentStatus = "active" | "pending" | "completed" | "expired";

export type CommitmentType = 
  | "personal" 
  | "business" 
  | "contract" 
  | "religious" 
  | "promise"
  | "friendly"
  | "trust";

export interface TaggedUser {
  id: string;
  name: string;
  email?: string;
  role: "associated" | "informed";
}

export interface BaseCommitment {
  id?: string;
  title: string;
  description: string;
  type: CommitmentType;
  createdAt: string;
  deadline?: string;
  status: CommitmentStatus;
  createdBy: string;
  parties: TaggedUser[];
  value?: number;
}

export interface PersonalCommitment extends BaseCommitment {
  type: "personal";
  isPublic: boolean;
  goal: string;
  milestone?: string;
}

export interface BusinessCommitment extends BaseCommitment {
  type: "business";
  documents: {
    name: string;
    url: string;
    type: "contract" | "invoice" | "receipt" | "negotiation" | "other";
    uploadedAt: string;
  }[];
  terms?: string;
}

export interface ContractCommitment extends BaseCommitment {
  type: "contract";
  contractType: "sponsorship" | "employment" | "service" | "termsheet" | "other";
  contractDetails: string;
  documents: {
    name: string;
    url: string;
    uploadedAt: string;
  }[];
}

export interface ReligiousCommitment extends BaseCommitment {
  type: "religious";
  religion: string;
  deity: string;
  ritual?: string;
}

export interface PromiseCommitment extends BaseCommitment {
  type: "promise";
  promiseType: string;
}

export interface FriendlyCommitment extends BaseCommitment {
  type: "friendly";
  occasion?: string;
}

export interface TrustCommitment extends BaseCommitment {
  type: "trust";
  secretEncrypted: string;
  trustLevel: "low" | "medium" | "high";
}

export type Commitment = 
  | PersonalCommitment 
  | BusinessCommitment 
  | ContractCommitment 
  | ReligiousCommitment 
  | PromiseCommitment
  | FriendlyCommitment
  | TrustCommitment;
