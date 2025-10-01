import { create } from 'zustand';
import type { DemoPackage, AccountCreationRequest, CreationProgress, Template, BrandKit } from '../types';

interface AppState {
  // Demo packages
  demoPackages: DemoPackage[];
  selectedPackage: DemoPackage | null;

  // Account creation
  accountCreationRequest: Partial<AccountCreationRequest>;
  creationProgress: CreationProgress[];

  // Templates
  templates: Template[];
  selectedTemplates: string[];

  // Brand kits
  brandKits: BrandKit[];
  selectedBrandKit: BrandKit | null;

  // UI state
  currentStep: number;
  isCreating: boolean;
}

interface AppActions {
  setSelectedPackage: (pkg: DemoPackage | null) => void;
  updateAccountRequest: (updates: Partial<AccountCreationRequest>) => void;
  setSelectedTemplates: (templateIds: string[]) => void;
  setSelectedBrandKit: (brandKit: BrandKit | null) => void;
  updateCreationProgress: (progress: CreationProgress[]) => void;
  setCurrentStep: (step: number) => void;
  setIsCreating: (creating: boolean) => void;
  resetStore: () => void;
}

const initialState: AppState = {
  demoPackages: [],
  selectedPackage: null,
  accountCreationRequest: {},
  creationProgress: [],
  templates: [],
  selectedTemplates: [],
  brandKits: [],
  selectedBrandKit: null,
  currentStep: 0,
  isCreating: false,
};

export const useAppStore = create<AppState & AppActions>((set) => ({
  ...initialState,

  setSelectedPackage: (pkg) =>
    set(() => ({
      selectedPackage: pkg,
      selectedTemplates: pkg?.templateIds || []
    })),

  updateAccountRequest: (updates) =>
    set((state) => ({
      accountCreationRequest: { ...state.accountCreationRequest, ...updates }
    })),

  setSelectedTemplates: (templateIds) =>
    set({ selectedTemplates: templateIds }),

  setSelectedBrandKit: (brandKit) =>
    set({ selectedBrandKit: brandKit }),

  updateCreationProgress: (progress) =>
    set({ creationProgress: progress }),

  setCurrentStep: (step) =>
    set({ currentStep: step }),

  setIsCreating: (creating) =>
    set({ isCreating: creating }),

  resetStore: () => set(initialState),
}));