import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="footer py-8">
            <div className="container text-center text-secondary">
                <p className="mb-2"><strong>MealFlow</strong> - Your diet is only as good as the days you actually follow it.</p>
                <p className="text-sm">© {new Date().getFullYear()} MealFlow MVP. Vytvořeno pro konzistenci.</p>
            </div>
        </footer>
    );
};

export default Footer;
