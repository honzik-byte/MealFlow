import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../store/AppContext';
import { Flame, Trophy } from 'lucide-react';

const Progress: React.FC = () => {
    const { state } = useAppContext();
    const navigate = useNavigate();

    const profile = state.profile;
    const history = Object.values(state.dailyData).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    if (!profile || history.length === 0) {
        return (
            <div className="container py-16 text-center animate-fade-in">
                <h2>Zatím nemáte žádná data</h2>
                <button className="btn btn-primary mt-4" onClick={() => navigate('/setup')}>Vytvořit plán</button>
            </div>
        );
    }

    // Calculate generic stats
    // MOCK: Since we are MVP and might only have today's data, let's create a fake 7-day history if needed
    // just for display purposes. We only use real data if it exists.

    const avgAdherence = Math.round(history.reduce((acc, day) => acc + day.adherenceScore, 0) / history.length);

    // Calculate mock current streak based on 100% days
    let streak = 0;
    for (const day of history) {
        if (day.adherenceScore >= 70) streak++;
        else break;
    }

    // Generate 7 days bars
    const last7Days = [];
    for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        const dateStr = d.toISOString().split('T')[0];
        const dayData = state.dailyData[dateStr];

        // If no real data, show empty or mock for visual sake if user wants to see what it looks like
        const score = dayData ? dayData.adherenceScore : 0;

        let color = 'var(--bg-tertiary)';
        if (score >= 95) color = 'var(--accent-primary)';
        else if (score >= 70) color = 'var(--warning)';
        else if (score > 0) color = 'var(--danger)';

        last7Days.push({
            label: d.toLocaleDateString('cs-CZ', { weekday: 'short' }),
            score,
            color,
            hasData: !!dayData
        });
    }

    return (
        <div className="container py-8 animate-fade-in">
            <h1 className="mb-2">Týdenní přehled</h1>
            <p className="text-secondary mb-8">Sledujte svou konzistenci. Dokonalost není cíl, pravidelnost ano.</p>

            <div className="grid md:grid-cols-2 gap-4 mb-8">
                <div className="card text-center py-8">
                    <div className="flex justify-center mb-4">
                        <div className="btn-icon" style={{ backgroundColor: 'var(--accent-light)', color: 'var(--accent-primary)', padding: '1rem' }}>
                            <Trophy size={48} />
                        </div>
                    </div>
                    <div className="text-4xl font-bold mb-2">{avgAdherence} %</div>
                    <div className="text-secondary text-sm">Průměrné skóre plnění</div>
                </div>

                <div className="card text-center py-8">
                    <div className="flex justify-center mb-4">
                        <div className="btn-icon" style={{ backgroundColor: 'rgba(245, 158, 11, 0.15)', color: 'var(--warning)', padding: '1rem' }}>
                            <Flame size={48} />
                        </div>
                    </div>
                    <div className="text-4xl font-bold mb-2">{streak} dní</div>
                    <div className="text-secondary text-sm">Aktuální série na trati (skóre &gt; 70)</div>
                </div>
            </div>

            <div className="card">
                <h3 className="mb-6">Posledních 7 dní</h3>

                <div className="flex items-end justify-between h-48 gap-2 pb-6 border-b" style={{ borderColor: 'var(--bg-tertiary)' }}>
                    {last7Days.map((day, i) => (
                        <div key={i} className="flex flex-col items-center flex-1 h-full justify-end group">
                            {day.hasData && (
                                <div className="text-xs mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    {day.score}%
                                </div>
                            )}
                            <div
                                className="w-full rounded-t-md transition-all duration-500 max-w-[40px]"
                                style={{
                                    backgroundColor: day.color,
                                    height: day.hasData ? `${Math.max(5, day.score)}%` : '5%',
                                    opacity: day.hasData ? 1 : 0.3
                                }}
                            ></div>
                        </div>
                    ))}
                </div>

                <div className="flex justify-between mt-4">
                    {last7Days.map((day, i) => (
                        <div key={i} className="text-xs text-secondary flex-1 text-center font-medium uppercase">
                            {day.label}
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default Progress;
