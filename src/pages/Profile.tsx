import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../store/AppContext';
import { LogOut, Settings } from 'lucide-react';

const Profile: React.FC = () => {
    const { state } = useAppContext();
    const navigate = useNavigate();

    const profile = state.profile;

    if (!profile) {
        return (
            <div className="container py-16 text-center animate-fade-in">
                <h2>Profil nenalezen</h2>
                <button className="btn btn-primary mt-4" onClick={() => navigate('/setup')}>
                    Vytvořit profil
                </button>
            </div>
        );
    }

    const handleReset = () => {
        if (confirm('Jste si jistí? Tímto krokem smažete celou historii a vrátíte aplikaci do výchozího stavu.')) {
            localStorage.clear();
            window.location.href = '/'; // hard reload to clear context
        }
    };

    return (
        <div className="container py-8 max-w-lg mx-auto animate-fade-in">
            <header className="mb-8 flex items-center justify-between">
                <h1 className="text-2xl">Můj profil</h1>
                <Settings size={24} className="text-secondary" />
            </header>

            <div className="card mb-8">
                <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                    <div>
                        <div className="text-sm text-secondary">Věk</div>
                        <div className="font-medium text-lg">{profile.age} let</div>
                    </div>
                    <div>
                        <div className="text-sm text-secondary">Pohlaví</div>
                        <div className="font-medium text-lg">{profile.sex === 'male' ? 'Muž' : 'Žena'}</div>
                    </div>
                    <div>
                        <div className="text-sm text-secondary">Váha</div>
                        <div className="font-medium text-lg">{profile.weight} kg</div>
                    </div>
                    <div>
                        <div className="text-sm text-secondary">Výška</div>
                        <div className="font-medium text-lg">{profile.height} cm</div>
                    </div>
                    <div className="col-span-2 mt-2">
                        <div className="text-sm text-secondary">Hlavní cíl</div>
                        <div className="font-medium text-lg">
                            {profile.goal === 'loss' ? 'Zhubnout tuk' : profile.goal === 'gain' ? 'Nabrať svaly' : 'Udržovat váhu'}
                        </div>
                    </div>
                </div>

                <div className="mt-8 pt-6 border-t border-[var(--bg-tertiary)] flex gap-4">
                    <button className="btn btn-primary w-full" onClick={() => navigate('/setup')}>
                        Upravit údaje
                    </button>
                </div>
            </div>

            <div className="card text-center" style={{ border: '1px solid var(--danger)' }}>
                <h3 className="text-danger mb-2">Resetovat aplikaci</h3>
                <p className="text-sm text-secondary mb-6">
                    Smaže veškerá data o vámi zadaných jídlech, historii pokroku a profilech napříč celou aplikací.
                    Nelze vzít zpět.
                </p>
                <button className="btn btn-outline" style={{ color: 'var(--danger)', borderColor: 'var(--danger)' }} onClick={handleReset}>
                    <LogOut size={16} className="mr-2 inline" /> Smazat všechna data
                </button>
            </div>
        </div>
    );
};

export default Profile;
