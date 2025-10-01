export interface DemoPackage {
  id: string;
  name: string;
  industry: string;
  description: string;
  templateIds: string[];
  brandKitOptions: BrandKit[];
  features: Feature[];
  estimatedSetupTime: number;
}

export interface AccountCreationRequest {
  accountName: string;
  contactEmail: string;
  selectedPackage: DemoPackage;
  customTemplates: string[];
  brandKit: BrandKit | null;
  enabledFeatures: string[];
  dataAutomationSets: string[];
}

export interface CreationProgress {
  step: string;
  status: 'pending' | 'in-progress' | 'completed' | 'error';
  message?: string;
  estimatedTimeRemaining?: number;
}

export interface Template {
  id: string;
  name: string;
  category: string;
  thumbnailUrl: string;
  industry: string[];
  marqTemplateId: string;
}

export interface BrandKit {
  id: string;
  name: string;
  logoUrl?: string;
  colors: string[];
  fonts: string[];
  isCustom: boolean;
}

export interface Feature {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
}

export interface DataAutomationSet {
  id: string;
  name: string;
  description: string;
  industry: string[];
}