import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../store/AppContext';
import type { UserProfile } from '../store/types';
import { calculateTargets } from '../utils/calculations';
import { generateMealPlan } from '../utils/mockData';

const Setup: React.FC = () => {
    const navigate = useNavigate();
    const { state, setProfile, setDailyTargets } = useAppContext();

    const [formData, setFormData] = useState<Partial<UserProfile>>(
        state.profile || {
            age: 30,
            sex: 'male',
            weight: 75,
            height: 175,
            goal: 'loss',
            activityLevel: 'moderate',
            mealsPerDay: 4,
            preference: 'none',
            dislikes: '',
            allergies: ''
        }
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'age' || name === 'weight' || name === 'height' || name === 'mealsPerDay' ? Number(value) : value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const profile = formData as UserProfile;
        setProfile(profile);

        // Initial setup calculation
        const targets = calculateTargets(profile);
        const initialMeals = generateMealPlan(targets.calories, targets.protein, profile.mealsPerDay);

        setDailyTargets(targets.calories, targets.protein, targets.carbs, targets.fats, initialMeals);

        navigate('/dashboard');
    };

    return (
        <div className="container py-8 max-w-lg mx-auto animate-fade-in">
            <h1 className="text-center mb-2">Nastavení cíle</h1>
            <p className="text-center text-secondary mb-8">Zadejte své údaje, abychom pro vás mohli vygenerovat ideální denní plán na míru.</p>

            <div className="card">
                <form onSubmit={handleSubmit}>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="form-group">
                            <label className="form-label">Věk</label>
                            <input type="number" name="age" className="form-input" value={formData.age} onChange={handleChange} required min={15} max={100} />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Pohlaví</label>
                            <select name="sex" className="form-select" value={formData.sex} onChange={handleChange}>
                                <option value="male">Muž</option>
                                <option value="female">Žena</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="form-group">
                            <label className="form-label">Váha (kg)</label>
                            <input type="number" name="weight" className="form-input" value={formData.weight} onChange={handleChange} required min={40} max={200} />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Výška (cm)</label>
                            <input type="number" name="height" className="form-input" value={formData.height} onChange={handleChange} required min={140} max={220} />
                        </div>
                    </div>

                    <div className="form-group mt-4">
                        <label className="form-label">Co je váš hlavní cíl?</label>
                        <select name="goal" className="form-select" value={formData.goal} onChange={handleChange}>
                            <option value="loss">Zhubnout tuk</option>
                            <option value="maintain">Udržovat váhu</option>
                            <option value="gain">Nabrať svaly</option>
                        </select>
                    </div>

                    <div className="form-group mt-4">
                        <label className="form-label">Úroveň aktivity</label>
                        <select name="activityLevel" className="form-select" value={formData.activityLevel} onChange={handleChange}>
                            <option value="low">Nízká (sedavé zaměstnání)</option>
                            <option value="moderate">Střední (občasný sport)</option>
                            <option value="high">Vysoká (pravidelný intenzivní trénink)</option>
                        </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-4">
                        <div className="form-group">
                            <label className="form-label">Předvolba stravy</label>
                            <select name="preference" className="form-select" value={formData.preference} onChange={handleChange}>
                                <option value="none">Bez omezení</option>
                                <option value="high-protein">Vysoký obsah bílkovin</option>
                                <option value="vegetarian">Vegetarián</option>
                                <option value="low-carb">Low-carb</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Počet jídel denně</label>
                            <select name="mealsPerDay" className="form-select" value={formData.mealsPerDay} onChange={handleChange}>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-group mt-4">
                        <label className="form-label">Neoblíbené potraviny (nepovinné)</label>
                        <input type="text" name="dislikes" placeholder="např. kopr, olivy..." className="form-input" value={formData.dislikes} onChange={handleChange} />
                    </div>

                    <div className="form-group mt-4 mb-8">
                        <label className="form-label">Alergie (nepovinné)</label>
                        <input type="text" name="allergies" placeholder="např. ořechy, laktóza..." className="form-input" value={formData.allergies} onChange={handleChange} />
                    </div>

                    <div className="flex gap-4">
                        <button type="button" onClick={() => navigate(-1)} className="btn btn-secondary w-full">
                            Zpět
                        </button>
                        <button type="submit" className="btn btn-primary w-full shadow-glow">
                            {state.profile ? 'Uložit a přepočítat plán' : 'Vygenerovat můj plán'}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default Setup;
