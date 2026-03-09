import React, { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import type { AppState, Meal, UserProfile } from './types';
import { getTodayDateString, calculateAdherence } from '../utils/calculations';

// @ts-ignore
const AppContext = createContext<{
    state: AppState;
    setProfile: (profile: UserProfile) => void;
    setDailyTargets: (calories: number, protein: number, carbs: number, fats: number, meals: Meal[]) => void;
    toggleMealCompletion: (mealId: string) => void;
    replaceMeal: (oldMealId: string, newMeal: Meal) => void;
    markAllCompleted: () => void;
}>({} as any);

const STORAGE_KEY = 'mealflow_state_v1';

const getInitialState = (): AppState => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
        try {
            return JSON.parse(saved);
        } catch (e) {
            console.error('Failed to parse state:', e);
        }
    }
    return {
        profile: null,
        dailyData: {},
        currentDate: getTodayDateString()
    };
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, setState] = useState<AppState>(getInitialState());

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }, [state]);

    const setProfile = (profile: UserProfile) => {
        setState(prev => ({ ...prev, profile }));
    };

    const setDailyTargets = (calories: number, protein: number, carbs: number, fats: number, meals: Meal[]) => {
        const today = getTodayDateString();
        setState(prev => ({
            ...prev,
            dailyData: {
                ...prev.dailyData,
                [today]: {
                    date: today,
                    targetCalories: calories,
                    targetProtein: protein,
                    targetCarbs: carbs,
                    targetFats: fats,
                    meals,
                    adherenceScore: 0
                }
            }
        }));
    };

    const updateAdherence = (meals: Meal[]) => {
        const completed = meals.filter(m => m.isCompleted).length;
        return calculateAdherence(completed, meals.length);
    };

    const toggleMealCompletion = (mealId: string) => {
        const today = getTodayDateString();

        setState(prev => {
            const todayData = prev.dailyData[today];
            if (!todayData) return prev;

            const updatedMeals = todayData.meals.map(m =>
                m.id === mealId ? { ...m, isCompleted: !m.isCompleted } : m
            );

            return {
                ...prev,
                dailyData: {
                    ...prev.dailyData,
                    [today]: {
                        ...todayData,
                        meals: updatedMeals,
                        adherenceScore: updateAdherence(updatedMeals)
                    }
                }
            };
        });
    };

    const replaceMeal = (oldMealId: string, newMeal: Meal) => {
        const today = getTodayDateString();

        setState(prev => {
            const todayData = prev.dailyData[today];
            if (!todayData) return prev;

            const updatedMeals = todayData.meals.map(m =>
                m.id === oldMealId ? { ...newMeal, id: oldMealId } : m
            );

            return {
                ...prev,
                dailyData: {
                    ...prev.dailyData,
                    [today]: {
                        ...todayData,
                        meals: updatedMeals,
                        adherenceScore: updateAdherence(updatedMeals)
                    }
                }
            };
        });
    };

    const markAllCompleted = () => {
        const today = getTodayDateString();
        setState(prev => {
            const todayData = prev.dailyData[today];
            if (!todayData) return prev;

            const updatedMeals = todayData.meals.map(m => ({ ...m, isCompleted: true }));

            return {
                ...prev,
                dailyData: {
                    ...prev.dailyData,
                    [today]: {
                        ...todayData,
                        meals: updatedMeals,
                        adherenceScore: 100
                    }
                }
            };
        });
    };

    return (
        <AppContext.Provider value={{
            state,
            setProfile,
            setDailyTargets,
            toggleMealCompletion,
            replaceMeal,
            markAllCompleted
        }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);
