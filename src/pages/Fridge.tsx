import React, { useState } from 'react';
import { Search, ChefHat } from 'lucide-react';
import { MOCK_MEALS } from '../utils/mockData';
import type { Meal } from '../store/types';

const Fridge: React.FC = () => {
    const [ingredients, setIngredients] = useState<string>('');
    const [results, setResults] = useState<Meal[]>([]);
    const [isSearching, setIsSearching] = useState(false);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (!ingredients.trim()) return;
        setIsSearching(true);

        setTimeout(() => {
            const searchTerms = ingredients.toLowerCase().split(',').map(s => s.trim()).filter(Boolean);

            const matchedMeals = MOCK_MEALS.filter(meal => {
                return searchTerms.some(term =>
                    meal.ingredients.some(ing => ing.toLowerCase().includes(term))
                );
            });

            setIsSearching(false);
            setResults(matchedMeals);
        }, 800);
    };

    return (
        <div className="container py-8 max-w-2xl mx-auto animate-fade-in">
            <header className="mb-8 text-center">
                <div className="flex justify-center mb-4">
                    <div className="btn-icon" style={{ backgroundColor: 'var(--accent-light)', color: 'var(--accent-primary)', padding: '1.5rem' }}>
                        <ChefHat size={40} />
                    </div>
                </div>
                <h1 className="text-3xl mb-2">Chytrá Lednice</h1>
                <p className="text-secondary text-lg">Povězte nám, co máte doma. My vymyslíme, co z toho jíst, abyste splnili makra.</p>
            </header>

            <div className="card mb-8">
                <form onSubmit={handleSearch}>
                    <div className="form-group mb-4">
                        <label className="form-label font-medium mb-3 block">Zadejte ingredience (oddělené čárkou)</label>
                        <textarea
                            className="form-input"
                            rows={3}
                            placeholder="Např. 3 vejce, polotučný tvaroh, banán, ovesné vločky..."
                            value={ingredients}
                            onChange={(e) => setIngredients(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-full" disabled={!ingredients.trim() || isSearching}>
                        {isSearching ? 'Hledám recepty...' : <><Search size={18} className="inline mr-2" /> Vymyslet jídlo</>}
                    </button>
                </form>
            </div>

            {results.length > 0 && (
                <div className="animate-fade-in">
                    <h3 className="mb-4">Návrhy receptů pro vás</h3>
                    <div className="flex flex-col gap-4">
                        {results.map((r, i) => (
                            <div key={i} className="card flex flex-col md:flex-row md:items-center justify-between hover:border-[var(--accent-primary)] transition-all cursor-pointer">
                                <div className="mb-4 md:mb-0">
                                    <div className="font-semibold text-lg">{r.name}</div>
                                    <div className="text-sm text-secondary mt-1">
                                        <span className="font-medium">Potřebujete:</span> {r.ingredients.join(', ')}
                                    </div>
                                    <div className="text-xs text-secondary mt-2">
                                        {r.calories} kcal • {r.protein}g bílkovin • {r.carbs}g sacharidů • {r.fats}g tuků
                                    </div>
                                </div>
                                <div className="text-left md:text-right">
                                    <span className="text-xs bg-[var(--accent-light)] text-accent px-3 py-1 rounded-full font-medium inline-block border border-[var(--accent-primary)]">
                                        <ChefHat size={12} className="inline mr-1" /> Přidat do denního plánu
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Fridge;
