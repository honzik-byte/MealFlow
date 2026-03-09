export type Goal = 'loss' | 'maintain' | 'gain';
export type ActivityLevel = 'low' | 'moderate' | 'high';
export type DietaryPreference = 'none' | 'high-protein' | 'vegetarian' | 'low-carb';
export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack';

export interface UserProfile {
    age: number;
    sex: 'male' | 'female';
    weight: number; // in kg
    height: number; // in cm
    goal: Goal;
    activityLevel: ActivityLevel;
    mealsPerDay: 3 | 4 | 5;
    preference: DietaryPreference;
    dislikes: string;
    allergies: string;
}

export interface Meal {
    id: string;
    name: string;
    type: MealType;
    ingredients: string[];
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
    preparationNode: string;
    isCompleted: boolean;
}

export interface DailyData {
    date: string; // YYYY-MM-DD
    targetCalories: number;
    targetProtein: number;
    targetCarbs: number;
    targetFats: number;
    meals: Meal[];
    adherenceScore: number;
}

export interface AppState {
    profile: UserProfile | null;
    dailyData: Record<string, DailyData>; // History of days
    currentDate: string;
}

export type Action =
    | { type: 'SET_PROFILE'; payload: UserProfile }
    | { type: 'SET_DAILY_TARGETS'; payload: { calories: number; protein: number; carbs: number; fats: number; meals: Meal[] } }
    | { type: 'TOGGLE_MEAL_COMPLETION'; payload: { date: string; mealId: string } }
    | { type: 'REPLACE_MEAL'; payload: { date: string; oldMealId: string; newMeal: Meal } }
    | { type: 'MARK_ALL_COMPLETED'; payload: { date: string } };
