export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      posts: {
        Row: {
          id: string
          title: string
          slug: string
          content: string
          excerpt: string
          featured_image: string | null
          published: boolean
          status: 'draft' | 'pending' | 'published' | 'rejected'
          created_at: string
          updated_at: string
          author_id: string | null
          published_by: string | null
          published_at: string | null
        }
        Insert: {
          id?: string
          title: string
          slug: string
          content: string
          excerpt: string
          featured_image?: string | null
          published?: boolean
          status?: 'draft' | 'pending' | 'published' | 'rejected'
          created_at?: string
          updated_at?: string
          author_id?: string | null
          published_by?: string | null
          published_at?: string | null
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          content?: string
          excerpt?: string
          featured_image?: string | null
          published?: boolean
          status?: 'draft' | 'pending' | 'published' | 'rejected'
          created_at?: string
          updated_at?: string
          author_id?: string | null
          published_by?: string | null
          published_at?: string | null
        }
      }
      categories: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          created_at?: string
        }
      }
      post_categories: {
        Row: {
          post_id: string
          category_id: string
        }
        Insert: {
          post_id: string
          category_id: string
        }
        Update: {
          post_id?: string
          category_id?: string
        }
      }
      user_roles: {
        Row: {
          id: string
          user_id: string
          role: 'admin' | 'writer' | 'publisher'
          created_at: string
          created_by: string | null
        }
        Insert: {
          id?: string
          user_id: string
          role: 'admin' | 'writer' | 'publisher'
          created_at?: string
          created_by?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          role?: 'admin' | 'writer' | 'publisher'
          created_at?: string
          created_by?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_role: {
        Args: {
          user_uuid: string
        }
        Returns: string
      }
      assign_user_role: {
        Args: {
          target_user_id: string
          new_role: string
        }
        Returns: void
      }
    }
    Enums: {
      [_ in never]: never
    }
  }
}