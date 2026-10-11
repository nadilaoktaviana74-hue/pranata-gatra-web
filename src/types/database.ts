export type ReleaseStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';

export type BugStatus = 'OPEN' | 'INVESTIGATING' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';

export interface Release {
  id: string;
  version: string;
  version_code: number;
  title: string;
  changelog: string;
  file_path: string;
  download_url?: string | null;
  file_size: number;
  status: ReleaseStatus;
  created_at: string;
  published_at: string | null;
}

export interface BugReport {
  id: string;
  name: string;
  email: string;
  title: string;
  description: string;
  app_version: string;
  device: string;
  os_version: string;
  attachment_path: string | null;
  status: BugStatus;
  created_at: string;
  updated_at: string;
}

export interface DashboardStats {
  totalReleases: number;
  publishedReleases: number;
  totalBugReports: number;
  openBugs: number;
  resolvedBugs: number;
}

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      releases: {
        Row: Release;
        Insert: {
          id?: string;
          version: string;
          version_code: number;
          title: string;
          changelog: string;
          file_path: string;
          download_url?: string | null;
          file_size: number;
          status?: ReleaseStatus;
          created_at?: string;
          published_at?: string | null;
        };
        Update: {
          id?: string;
          version?: string;
          version_code?: number;
          title?: string;
          changelog?: string;
          file_path?: string;
          download_url?: string | null;
          file_size?: number;
          status?: ReleaseStatus;
          created_at?: string;
          published_at?: string | null;
        };
        Relationships: Array<{
          foreignKeyName: string;
          columns: string[];
          isOneToOne?: boolean;
          referencedRelation: string;
          referencedColumns: string[];
        }>;
      };
      bug_reports: {
        Row: BugReport;
        Insert: {
          id?: string;
          name: string;
          email: string;
          title: string;
          description: string;
          app_version: string;
          device: string;
          os_version: string;
          attachment_path?: string | null;
          status?: BugStatus;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          title?: string;
          description?: string;
          app_version?: string;
          device?: string;
          os_version?: string;
          attachment_path?: string | null;
          status?: BugStatus;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: Array<{
          foreignKeyName: string;
          columns: string[];
          isOneToOne?: boolean;
          referencedRelation: string;
          referencedColumns: string[];
        }>;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      release_status: ReleaseStatus;
      bug_status: BugStatus;
    };
    CompositeTypes: Record<string, never>;
  };
}

export type ReleaseInsert = Database['public']['Tables']['releases']['Insert'];
export type ReleaseUpdate = Database['public']['Tables']['releases']['Update'];
export type BugReportInsert = Database['public']['Tables']['bug_reports']['Insert'];
export type BugReportUpdate = Database['public']['Tables']['bug_reports']['Update'];
