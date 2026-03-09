import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout: React.FC = () => {
    return (
        <>
            <Navbar />
            <main className="main-content">
                <Outlet />
            </main>
            <Footer />
        </>
    );
};

export default Layout;
