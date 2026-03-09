import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../store/AppContext';
import { CheckCircle2, ChevronLeft, Circle, Replace } from 'lucide-react';
import { getTodayDateString } from '../utils/calculations';
import { getReplacementMeals } from '../utils/mockData';
import type { Meal } from '../store/types';

const MealPlan: React.FC = () => {
    const navigate = useNavigate();
    const { state, toggleMealCompletion, replaceMeal } = useAppContext();

    const [replacingMeal, setReplacingMeal] = useState<Meal | null>(null);

    const today = getTodayDateString();
    const todayData = state.dailyData[today];

    if (!todayData) {
        return (
            <div className="container py-16 text-center animate-fade-in">
                <h2>Plán nenačten</h2>
                <button className="btn btn-primary mt-4" onClick={() => navigate('/dashboard')}>Zpět</button>
            </div>
        );
    }

    const handleReplaceClick = (meal: Meal) => {
        setReplacingMeal(meal);
    };

    const confirmReplacement = (newMeal: Meal) => {
        if (replacingMeal) {
            replaceMeal(replacingMeal.id, newMeal);
            setReplacingMeal(null);
        }
    };

    return (
        <div className="container py-8 animate-fade-in relative">
            <button onClick={() => navigate('/dashboard')} className="btn btn-secondary btn-sm mb-6 flex items-center gap-2">
                <ChevronLeft size={16} /> Zpět na přehled
            </button>

            <h1 className="mb-2">Denní plán</h1>
            <p className="text-secondary mb-8">Detailní rozpis vašich jídel s možností chytré výměny.</p>

            <div className="flex flex-col gap-6">
                {todayData.meals.map(meal => (
                    <div key={meal.id} className="card p-0 overflow-hidden relative">

                        {/* Meal Header */}
                        <div
                            className={`p-4 md:p-6 flex items-start justify-between border-b cursor-pointer transition-colors ${meal.isCompleted ? 'bg-bg-tertiary opacity-75' : 'bg-bg-secondary hover:bg-bg-tertiary'}`}
                            style={{ borderColor: 'var(--bg-tertiary)' }}
                            onClick={() => toggleMealCompletion(meal.id)}
                        >
                            <div className="flex gap-4 items-center w-full">
                                <div style={{ color: meal.isCompleted ? 'var(--accent-primary)' : 'var(--text-tertiary)' }}>
                                    {meal.isCompleted ? <CheckCircle2 size={32} /> : <Circle size={32} />}
                                </div>
                                <div className="flex-1">
                                    <div className="text-sm text-secondary uppercase tracking-wider font-semibold mb-1">
                                        {meal.type === 'breakfast' ? 'Snídaně' : meal.type === 'lunch' ? 'Oběd' : meal.type === 'dinner' ? 'Večeře' : 'Svačina'}
                                    </div>
                                    <h3 style={{ textDecoration: meal.isCompleted ? 'line-through' : 'none' }}>{meal.name}</h3>
                                    <div className="text-sm text-secondary mt-1">
                                        {meal.calories} kcal • {meal.protein}g bílkovin
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Meal Details */}
                        <div className="p-4 md:p-6 bg-bg-primary">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <h4 className="text-sm text-secondary mb-2">Ingredience:</h4>
                                    <ul className="list-disc list-inside text-sm">
                                        {meal.ingredients.map((ing, i) => <li key={i}>{ing}</li>)}
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="text-sm text-secondary mb-2">Příprava:</h4>
                                    <div className="text-sm flex flex-col gap-1">
                                        {meal.preparationNode.split('\n').map((step, i) => (
                                            <p key={i}>{step}</p>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 flex justify-end">
                                <button
                                    onClick={() => handleReplaceClick(meal)}
                                    className="btn btn-outline text-sm"
                                    disabled={meal.isCompleted}
                                >
                                    <Replace size={16} /> Vyměnit jídlo
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Replacement Modal */}
            {replacingMeal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(15, 23, 42, 0.8)', backdropFilter: 'blur(4px)' }}>
                    <div className="card w-full max-w-lg shadow-xl relative animate-fade-in" style={{ maxHeight: '90vh', overflowY: 'auto' }}>
                        <h2 className="mb-2">Výměna jídla</h2>
                        <p className="text-secondary mb-6 text-sm">Vyměňujete: <strong>{replacingMeal.name}</strong></p>

                        <div className="flex flex-col gap-3">
                            {getReplacementMeals(replacingMeal).map(altMeal => (
                                <div key={altMeal.id} className="p-4 border rounded-lg hover:bg-bg-tertiary transition-colors cursor-pointer" style={{ borderColor: 'var(--bg-tertiary)' }} onClick={() => confirmReplacement(altMeal)}>
                                    <div className="font-semibold mb-1">{altMeal.name}</div>
                                    <div className="text-xs text-secondary flex gap-3">
                                        <span>{altMeal.calories} kcal</span>
                                        <span>{altMeal.protein}g bílkovin</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button onClick={() => setReplacingMeal(null)} className="btn btn-secondary w-full mt-6">
                            Zrušit
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MealPlan;
