import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart, Activity, Clock } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo & Brand */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="bg-gradient-to-br from-red-500 to-pink-600 p-2 rounded-xl shadow-lg group-hover:shadow-xl transition-shadow">
              <Heart className="w-6 h-6 text-white" fill="white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                LimbVital
              </h1>
              <p className="text-xs text-gray-500">AI Health Monitor</p>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            <NavLink 
              to="/" 
              icon={<Heart className="w-4 h-4" />}
              isActive={isActive('/')}
            >
              Home
            </NavLink>

            <NavLink 
              to="/dashboard" 
              icon={<Activity className="w-4 h-4" />}
              isActive={isActive('/dashboard')}
            >
              Dashboard
            </NavLink>

            <NavLink 
              to="/history" 
              icon={<Clock className="w-4 h-4" />}
              isActive={isActive('/history')}
            >
              History
            </NavLink>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
};

// Nav Link Component
const NavLink = ({ to, icon, isActive, children }) => {
  const baseClasses = "flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200";
  const activeClasses = isActive 
    ? "bg-gradient-to-r from-red-500 to-pink-600 text-white shadow-lg" 
    : "text-gray-700 hover:bg-gray-100 hover:text-red-600";

  return (
    <Link to={to} className={`${baseClasses} ${activeClasses}`}>
      {icon}
      <span>{children}</span>
    </Link>
  );
};

export default Navbar;
