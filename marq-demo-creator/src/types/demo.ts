export interface DemoAccount {
  id: string;
  name: string;
  description?: string;
  package_type: 'marketing-agency' | 'enterprise' | 'small-business';
  demo_url: string;
  features: string[];
  tags: string[];
  created_by: string;
  created_at: Date;
  last_accessed?: Date;
  status: 'active' | 'expired' | 'draft';
  configuration: {
    templates: string[];
    branding?: {
      primaryColor?: string;
      logo?: string;
      companyName?: string;
    };
    users: number;
    settings?: Record<string, any>;
  };
}

export interface DemoAccountFilters {
  search: string;
  package_type?: string;
  status?: string;
  tags?: string[];
  date_range?: {
    start: Date;
    end: Date;
  };
}

export interface DemoAccountStats {
  total_accounts: number;
  active_accounts: number;
  total_accesses: number;
  popular_packages: Array<{
    package_type: string;
    count: number;
  }>;
}