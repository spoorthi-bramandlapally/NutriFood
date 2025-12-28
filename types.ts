export enum Gender {
  Male = 'Male',
  Female = 'Female',
  Other = 'Other',
  PreferNotToSay = 'Prefer not to say'
}

export enum ActivityLevel {
  Sedentary = 'Sedentary (Little or no exercise)',
  Light = 'Light (Exercise 1-3 days/week)',
  Moderate = 'Moderate (Exercise 3-5 days/week)',
  High = 'High (Exercise 6-7 days/week)',
  VeryHigh = 'Very High (Physical job or training)'
}

export interface UserProfile {
  age: number;
  gender: Gender;
  height: number; // cm
  weight: number; // kg
  activityLevel: ActivityLevel;
}

export interface BMIData {
  value: number;
  category: string;
  color: string;
}

export interface RecommendationResponse {
  summary: string;
  exercise: {
    routine: string[];
    frequency: string;
    home_workouts: string[];
  };
  walking: {
    daily_steps: string;
    tips: string[];
  };
  nutrition: {
    meals: string[];
    hydration: string;
    foods_to_include: string[];
    foods_to_avoid: string[];
  };
  lifestyle: {
    sleep: string;
    stress_management: string[];
  };
}
