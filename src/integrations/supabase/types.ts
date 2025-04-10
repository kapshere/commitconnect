export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      commitment_documents: {
        Row: {
          commitment_id: string
          id: string
          name: string
          type: string | null
          uploaded_at: string
          uploaded_by: string
          url: string
        }
        Insert: {
          commitment_id: string
          id?: string
          name: string
          type?: string | null
          uploaded_at?: string
          uploaded_by: string
          url: string
        }
        Update: {
          commitment_id?: string
          id?: string
          name?: string
          type?: string | null
          uploaded_at?: string
          uploaded_by?: string
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "commitment_documents_commitment_id_fkey"
            columns: ["commitment_id"]
            isOneToOne: false
            referencedRelation: "commitments"
            referencedColumns: ["id"]
          },
        ]
      }
      commitment_history: {
        Row: {
          change_details: Json | null
          changed_at: string
          changed_by: string
          commitment_id: string
          id: string
          new_status: string | null
          previous_status: string | null
        }
        Insert: {
          change_details?: Json | null
          changed_at?: string
          changed_by: string
          commitment_id: string
          id?: string
          new_status?: string | null
          previous_status?: string | null
        }
        Update: {
          change_details?: Json | null
          changed_at?: string
          changed_by?: string
          commitment_id?: string
          id?: string
          new_status?: string | null
          previous_status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "commitment_history_commitment_id_fkey"
            columns: ["commitment_id"]
            isOneToOne: false
            referencedRelation: "commitments"
            referencedColumns: ["id"]
          },
        ]
      }
      commitment_parties: {
        Row: {
          commitment_id: string
          created_at: string
          email: string | null
          id: string
          name: string
          role: string
          user_id: string
        }
        Insert: {
          commitment_id: string
          created_at?: string
          email?: string | null
          id?: string
          name: string
          role: string
          user_id: string
        }
        Update: {
          commitment_id?: string
          created_at?: string
          email?: string | null
          id?: string
          name?: string
          role?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "commitment_parties_commitment_id_fkey"
            columns: ["commitment_id"]
            isOneToOne: false
            referencedRelation: "commitments"
            referencedColumns: ["id"]
          },
        ]
      }
      commitment_types: {
        Row: {
          created_at: string
          description: string | null
          icon: string | null
          label: string
          name: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          icon?: string | null
          label: string
          name: string
        }
        Update: {
          created_at?: string
          description?: string | null
          icon?: string | null
          label?: string
          name?: string
        }
        Relationships: []
      }
      commitments: {
        Row: {
          contract_details: string | null
          contract_type: string | null
          created_at: string
          created_by: string
          deadline: string | null
          deity: string | null
          description: string
          goal: string | null
          id: string
          is_public: boolean | null
          milestone: string | null
          occasion: string | null
          promise_type: string | null
          religion: string | null
          ritual: string | null
          secret_encrypted: string | null
          status: string
          terms: string | null
          title: string
          trust_level: string | null
          type: string
          updated_at: string
          value: number | null
        }
        Insert: {
          contract_details?: string | null
          contract_type?: string | null
          created_at?: string
          created_by: string
          deadline?: string | null
          deity?: string | null
          description: string
          goal?: string | null
          id?: string
          is_public?: boolean | null
          milestone?: string | null
          occasion?: string | null
          promise_type?: string | null
          religion?: string | null
          ritual?: string | null
          secret_encrypted?: string | null
          status?: string
          terms?: string | null
          title: string
          trust_level?: string | null
          type: string
          updated_at?: string
          value?: number | null
        }
        Update: {
          contract_details?: string | null
          contract_type?: string | null
          created_at?: string
          created_by?: string
          deadline?: string | null
          deity?: string | null
          description?: string
          goal?: string | null
          id?: string
          is_public?: boolean | null
          milestone?: string | null
          occasion?: string | null
          promise_type?: string | null
          religion?: string | null
          ritual?: string | null
          secret_encrypted?: string | null
          status?: string
          terms?: string | null
          title?: string
          trust_level?: string | null
          type?: string
          updated_at?: string
          value?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "commitments_type_fkey"
            columns: ["type"]
            isOneToOne: false
            referencedRelation: "commitment_types"
            referencedColumns: ["name"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          biography: string | null
          created_at: string
          full_name: string | null
          id: string
          updated_at: string
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          biography?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          updated_at?: string
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          biography?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          updated_at?: string
          username?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
