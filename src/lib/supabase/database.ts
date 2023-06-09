export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface Database {
  public: {
    Tables: {
      data: {
        Row: {
          created_at: string | null;
          fruit: string | null;
          id: number;
          price: string | null;
          size: string | null;
        };
        Insert: {
          created_at?: string | null;
          fruit?: string | null;
          id?: number;
          price?: string | null;
          size?: string | null;
        };
        Update: {
          created_at?: string | null;
          fruit?: string | null;
          id?: number;
          price?: string | null;
          size?: string | null;
        };
      };
      profiles: {
        Row: {
          avatar_url: string | null;
          first_name: string | null;
          id: string;
          last_name: string | null;
          updated_at: string | null;
        };
        Insert: {
          avatar_url?: string | null;
          first_name?: string | null;
          id: string;
          last_name?: string | null;
          updated_at?: string | null;
        };
        Update: {
          avatar_url?: string | null;
          first_name?: string | null;
          id?: string;
          last_name?: string | null;
          updated_at?: string | null;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
