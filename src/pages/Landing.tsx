import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, CheckCircle2, Replace } from 'lucide-react';
import { useAppContext } from '../store/AppContext';

const Landing: React.FC = () => {
    const navigate = useNavigate();
    const { state } = useAppContext();

    useEffect(() => {
        if (state.profile) {
            navigate('/dashboard');
        }
    }, [state.profile, navigate]);

    return (
        <div className="landing-page animate-fade-in">
            {/* Hero Section */}
            <section className="hero py-16 container text-center">
                <h1 className="text-gradient mb-4" style={{ fontSize: '3.5rem', maxWidth: '800px', margin: '0 auto 1.5rem' }}>
                    Vaše dieta je úspěšná jen tehdy, když ji skutečně dodržujete.
                </h1>
                <p className="text-secondary mb-8" style={{ fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
                    MealFlow vám pomůže zůstat na správné cestě. Nabízí jednoduché denní plány,
                    sledování pokroku bez zbytečností a chytré nahrazování jídel.
                </p>
                <button onClick={() => navigate('/setup')} className="btn btn-primary" style={{ padding: '0.75rem 2rem', fontSize: '1.125rem' }}>
                    Začít můj plán
                </button>
            </section>

            {/* Features Grid */}
            <section className="features py-16 container">
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="card text-center">
                        <div className="flex justify-center mb-4">
                            <div className="btn-icon" style={{ backgroundColor: 'var(--accent-light)', color: 'var(--accent-primary)', padding: '1rem' }}>
                                <Activity size={32} />
                            </div>
                        </div>
                        <h3 className="mb-2">Personalizovaný plán</h3>
                        <p className="text-secondary">Jídelníček na míru vašemu cíli. Žádné složité vážení každého zrnka rýže.</p>
                    </div>

                    <div className="card text-center">
                        <div className="flex justify-center mb-4">
                            <div className="btn-icon" style={{ backgroundColor: 'rgba(59, 130, 246, 0.15)', color: '#3b82f6', padding: '1rem' }}>
                                <CheckCircle2 size={32} />
                            </div>
                        </div>
                        <h3 className="mb-2">Snadné denní sledování</h3>
                        <p className="text-secondary">Oškrtněte jídla, zjistěte své skóre a zachovejte tempo. Konzistence vítězí nad dokonalostí.</p>
                    </div>

                    <div className="card text-center">
                        <div className="flex justify-center mb-4">
                            <div className="btn-icon" style={{ backgroundColor: 'rgba(245, 158, 11, 0.15)', color: 'var(--warning)', padding: '1rem' }}>
                                <Replace size={32} />
                            </div>
                        </div>
                        <h3 className="mb-2">Chytré náhrady jídel</h3>
                        <p className="text-secondary">Chybí vám suroviny? Nechcete tohle jídlo? Vyměňte ho s lehkostí bez ohrožení cílů.</p>
                    </div>
                </div>
            </section>

            {/* How it works */}
            <section className="how-it-works py-16 container mt-8 mb-16" style={{ backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-xl)' }}>
                <h2 className="text-center mb-12">Jak to funguje ve 3 krocích</h2>
                <div className="grid md:grid-cols-3 gap-8 text-center px-4">
                    <div>
                        <div className="text-accent mb-4" style={{ fontSize: '2.5rem', fontWeight: '800' }}>1.</div>
                        <h4 className="mb-2">Nastavíte cíl</h4>
                        <p className="text-secondary text-sm">Řekněte nám něco o sobě a my spočítáme kalorie.</p>
                    </div>
                    <div>
                        <div className="text-accent mb-4" style={{ fontSize: '2.5rem', fontWeight: '800' }}>2.</div>
                        <h4 className="mb-2">Získáte denní plán</h4>
                        <p className="text-secondary text-sm">Získáte hravý plán s možností úprav a výměn.</p>
                    </div>
                    <div>
                        <div className="text-accent mb-4" style={{ fontSize: '2.5rem', fontWeight: '800' }}>3.</div>
                        <h4 className="mb-2">Oškrtáváte úspěchy</h4>
                        <p className="text-secondary text-sm">Sledujte, jak vaše skóre roste, a buďte hrdí na svou konzistenci.</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Landing;
