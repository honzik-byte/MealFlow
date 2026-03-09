import type { UserProfile } from '../store/types';

// Simple logical formula for MVP
export const calculateTargets = (profile: UserProfile): { calories: number; protein: number; carbs: number; fats: number } => {
    // Mifflin-St Jeor Equation for BMR
    let bmr = 10 * profile.weight + 6.25 * profile.height - 5 * profile.age;
    bmr += profile.sex === 'male' ? 5 : -161;

    // Activity Multiplier
    const multipliers = {
        low: 1.2,
        moderate: 1.55,
        high: 1.725
    };

    let tdee = bmr * multipliers[profile.activityLevel];

    // Goal adjustment (deepened deficit per requested requirements)
    if (profile.goal === 'loss') tdee -= 800; // was 500, deepened for faster loss
    if (profile.goal === 'gain') tdee += 300;

    // Protein target (roughly 1.6-2.2g per kg depending on goal/preference)
    let proteinMultiplier = 1.6;
    if (profile.preference === 'high-protein' || profile.goal === 'gain') {
        proteinMultiplier = 2.0;
    } else if (profile.goal === 'loss') {
        proteinMultiplier = 2.2; // even higher protein helps retention in deeper deficit
    }

    const protein = Math.round(profile.weight * proteinMultiplier);
    const calories = Math.max(1200, Math.round(tdee)); // safety floor

    // Macro distribution logic
    // Protein = 4 kcal/g
    const proteinCalories = protein * 4;

    // Fats: ~25-30% of total calories based on diet type
    let fatRatio = 0.25;
    if (profile.preference === 'low-carb') fatRatio = 0.40;

    const fats = Math.round((calories * fatRatio) / 9);
    const fatCalories = fats * 9;

    // Carbs: rest of calories (Carbs = 4 kcal/g)
    const remainingCalories = calories - proteinCalories - fatCalories;
    const carbs = Math.max(0, Math.round(remainingCalories / 4));

    return {
        calories,
        protein,
        fats,
        carbs
    };
};

export const calculateAdherence = (completedMeals: number, totalMeals: number): number => {
    if (totalMeals === 0) return 0;
    return Math.round((completedMeals / totalMeals) * 100);
};

export const getTodayDateString = () => {
    return new Date().toISOString().split('T')[0];
};
