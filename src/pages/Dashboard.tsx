import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../store/AppContext';
import { CheckCircle2, ChevronRight, Circle } from 'lucide-react';
import { getTodayDateString, calculateTargets } from '../utils/calculations';

const Dashboard: React.FC = () => {
    const { state, toggleMealCompletion, markAllCompleted } = useAppContext();
    const navigate = useNavigate();

    const today = getTodayDateString();
    const todayData = state.dailyData[today];
    const profile = state.profile;

    // Protect route
    if (!profile || !todayData) {
        return (
            <div className="container py-16 text-center animate-fade-in">
                <h2 className="mb-4">Zatím nemáte plán</h2>
                <p className="text-secondary mb-8">Nejdříve musíme zjistit vaše cíle a nastavit denní příjem.</p>
                <button className="btn btn-primary" onClick={() => navigate('/setup')}>
                    Vytvořit plán
                </button>
            </div>
        );
    }

    // Calculate current progress
    const completedMeals = todayData.meals.filter(m => m.isCompleted);
    const currentCalories = completedMeals.reduce((acc, m) => acc + m.calories, 0);
    const currentProtein = completedMeals.reduce((acc, m) => acc + m.protein, 0);
    const currentCarbs = completedMeals.reduce((acc, m) => acc + m.carbs, 0);
    const currentFats = completedMeals.reduce((acc, m) => acc + m.fats, 0);

    let targetCarbs = todayData.targetCarbs;
    let targetFats = todayData.targetFats;

    // Fallback for missing older data from before Phase 2
    if (targetCarbs === undefined || targetFats === undefined) {
        const calculated = calculateTargets(profile);
        targetCarbs = calculated.carbs;
        targetFats = calculated.fats;
    }

    const calPercent = Math.min(100, Math.round((currentCalories / todayData.targetCalories) * 100)) || 0;
    const proPercent = Math.min(100, Math.round((currentProtein / todayData.targetProtein) * 100)) || 0;
    const carbPercent = Math.min(100, Math.round((currentCarbs / targetCarbs) * 100)) || 0;
    const fatPercent = Math.min(100, Math.round((currentFats / targetFats) * 100)) || 0;

    // Adherence color
    let adherenceColor = 'var(--accent-primary)';
    if (todayData.adherenceScore < 70) adherenceColor = 'var(--danger)';
    else if (todayData.adherenceScore < 95) adherenceColor = 'var(--warning)';

    return (
        <div className="container py-8 animate-fade-in">
            <header className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl mb-1">Dobrý den{profile.sex === 'male' ? '' : ''}</h1>
                    <p className="text-secondary">Dnes je {new Date().toLocaleDateString('cs-CZ', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
                </div>
                <div className="text-right">
                    <div className="text-sm text-secondary">Skóre dodržování</div>
                    <div className="text-2xl font-bold" style={{ color: adherenceColor }}>
                        {todayData.adherenceScore} <span className="text-sm text-secondary">/ 100</span>
                    </div>
                </div>
            </header>

            {/* Progress Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="card" style={{ padding: '1rem' }}>
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="text-base">Kalorie</h3>
                        <span className="text-secondary text-xs">{currentCalories} / {todayData.targetCalories} kcal</span>
                    </div>
                    <div className="progress-bg" style={{ width: '100%', height: '6px', backgroundColor: 'var(--bg-tertiary)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                        <div className="progress-fill" style={{ width: `${calPercent}%`, height: '100%', backgroundColor: 'var(--accent-primary)', transition: 'width var(--transition-slow)' }}></div>
                    </div>
                </div>

                <div className="card" style={{ padding: '1rem' }}>
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="text-base">Bílkoviny</h3>
                        <span className="text-secondary text-xs">{currentProtein} / {todayData.targetProtein} g</span>
                    </div>
                    <div className="progress-bg" style={{ width: '100%', height: '6px', backgroundColor: 'var(--bg-tertiary)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                        <div className="progress-fill" style={{ width: `${proPercent}%`, height: '100%', backgroundColor: '#3b82f6', transition: 'width var(--transition-slow)' }}></div>
                    </div>
                </div>

                <div className="card" style={{ padding: '1rem' }}>
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="text-base">Sacharidy</h3>
                        <span className="text-secondary text-xs">{currentCarbs} / {targetCarbs} g</span>
                    </div>
                    <div className="progress-bg" style={{ width: '100%', height: '6px', backgroundColor: 'var(--bg-tertiary)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                        <div className="progress-fill" style={{ width: `${carbPercent}%`, height: '100%', backgroundColor: '#f59e0b', transition: 'width var(--transition-slow)' }}></div>
                    </div>
                </div>

                <div className="card" style={{ padding: '1rem' }}>
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="text-base">Tuky</h3>
                        <span className="text-secondary text-xs">{currentFats} / {targetFats} g</span>
                    </div>
                    <div className="progress-bg" style={{ width: '100%', height: '6px', backgroundColor: 'var(--bg-tertiary)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                        <div className="progress-fill" style={{ width: `${fatPercent}%`, height: '100%', backgroundColor: '#8b5cf6', transition: 'width var(--transition-slow)' }}></div>
                    </div>
                </div>
            </div>

            {/* Meals List */}
            <div className="card mb-8">
                <div className="flex justify-between items-center mb-6">
                    <h2>Dnešní jídla</h2>
                    {todayData.adherenceScore < 100 && (
                        <button onClick={() => markAllCompleted()} className="text-sm text-accent hover:underline">
                            Označit vše jako hotové
                        </button>
                    )}
                </div>

                <div className="flex flex-col gap-3">
                    {todayData.meals.map(meal => (
                        <div
                            key={meal.id}
                            className={`p-4 rounded-lg flex items-center justify-between cursor-pointer transition-all ${meal.isCompleted ? 'opacity-75 bg-bg-tertiary' : 'bg-bg-primary hover:bg-bg-tertiary'}`}
                            style={{ backgroundColor: meal.isCompleted ? 'var(--bg-tertiary)' : 'var(--bg-primary)', border: '1px solid var(--bg-tertiary)' }}
                            onClick={() => toggleMealCompletion(meal.id)}
                        >
                            <div className="flex items-center gap-4">
                                <div style={{ color: meal.isCompleted ? 'var(--accent-primary)' : 'var(--text-tertiary)' }}>
                                    {meal.isCompleted ? <CheckCircle2 size={24} /> : <Circle size={24} />}
                                </div>
                                <div>
                                    <div className="font-medium text-lg" style={{ textDecoration: meal.isCompleted ? 'line-through' : 'none' }}>
                                        {meal.name}
                                    </div>
                                    <div className="text-sm text-secondary">
                                        {meal.calories} kcal • {meal.protein}g bílkovin
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-6 text-center">
                    <button className="btn btn-outline w-full justify-between" onClick={() => navigate('/plan')}>
                        <span>Otevřít celý denní plán</span>
                        <ChevronRight size={18} />
                    </button>
                </div>
            </div>

            {/* Motivation */}
            <div className="text-center p-6 rounded-xl" style={{ backgroundColor: 'var(--accent-light)' }}>
                <p className="text-accent font-medium">
                    {todayData.adherenceScore === 100 ? 'Skvělá práce! Dnešní plán úspěšně splněn.' : 'Konsekvence poráží dokonalost. Zvládnete to.'}
                </p>
            </div>

        </div>
    );
};

export default Dashboard;
