
export enum AppStatus {
  WELCOME = 'WELCOME',
  AUTH = 'AUTH',
  ONBOARDING = 'ONBOARDING',
  DASHBOARD = 'DASHBOARD'
}

export interface UserProfile {
  name: string;
  avatar: string | null;
  email: string;
  level: number;
  xp: number;
  maxXp: number;
  rank: string;
  focusAreas: string[];
  bio?: string;
  lastLevelUpDate: string; // ISO string to track stagnation
  lastPlannedDate: string; // ISO string to track daily task creation
}

export interface OnboardingData {
  name: string;
  profession: string;
  fitnessLevel: string;
  skills: string[];
}

export interface TierDefinition {
  tier: number;
  levels: [number, number];
  title: string;
  xpPerLevel: number;
  maxTasks: number;
  minTaskTime: number; // in minutes
  uiStyle: string;
}

export const TIER_DATA: TierDefinition[] = [
  { tier: 1, levels: [1, 10], title: 'User', xpPerLevel: 100, maxTasks: 5, minTaskTime: 15, uiStyle: 'plain' },
  { tier: 2, levels: [11, 20], title: 'Cadet', xpPerLevel: 150, maxTasks: 6, minTaskTime: 20, uiStyle: 'thick-xp' },
  { tier: 3, levels: [21, 30], title: 'Apprentice', xpPerLevel: 200, maxTasks: 6, minTaskTime: 25, uiStyle: 'contrast' },
  { tier: 4, levels: [31, 40], title: 'Disciplined', xpPerLevel: 250, maxTasks: 7, minTaskTime: 30, uiStyle: 'accents' },
  { tier: 5, levels: [41, 50], title: 'Focused', xpPerLevel: 300, maxTasks: 7, minTaskTime: 35, uiStyle: 'darker' },
  { tier: 6, levels: [51, 60], title: 'Relentless', xpPerLevel: 350, maxTasks: 8, minTaskTime: 40, uiStyle: 'bold' },
  { tier: 7, levels: [61, 70], title: 'Hardened', xpPerLevel: 400, maxTasks: 8, minTaskTime: 45, uiStyle: 'minimal' },
  { tier: 8, levels: [71, 80], title: 'Elite', xpPerLevel: 450, maxTasks: 9, minTaskTime: 50, uiStyle: 'sharp' },
  { tier: 9, levels: [81, 90], title: 'Commander', xpPerLevel: 500, maxTasks: 9, minTaskTime: 55, uiStyle: 'no-noise' },
  { tier: 10, levels: [91, 100], title: 'Legacy', xpPerLevel: 600, maxTasks: 10, minTaskTime: 60, uiStyle: 'ultra-minimal' },
];

export interface Quest {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  category: 'Physical' | 'Mental' | 'Career' | 'Social' | 'Creative';
  completed: boolean;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Legendary';
  scheduledDate?: string;
}
