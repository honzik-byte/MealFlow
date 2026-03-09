import React from 'react';
import { NavLink } from 'react-router-dom';
import { Activity, Flame, LayoutDashboard } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="container flex items-center justify-between">
        <NavLink to="/" className="navbar-logo flex items-center gap-2">
          <Activity size={28} className="text-accent" />
          <span className="logo-text">MealFlow</span>
        </NavLink>

        <div className="navbar-links flex gap-6 items-center">
          <NavLink to="/dashboard" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            <LayoutDashboard size={20} />
            <span className="hidden-mobile">Osobní plán</span>
          </NavLink>
          <NavLink to="/fridge" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            {/* Using Flame icon temporarily or maybe we can import a 'Snowflake'/'Refrigerator' equivalent from lucide. Refrigerator isn't standard, let's use List */}
            <Activity size={20} />
            <span className="hidden-mobile">Lednice</span>
          </NavLink>
          <NavLink to="/progress" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            <Flame size={20} />
            <span className="hidden-mobile">Historie</span>
          </NavLink>
          <NavLink to="/profile" className="btn btn-primary btn-sm ml-4 hidden-mobile">
            Profil
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
