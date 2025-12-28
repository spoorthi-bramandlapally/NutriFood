import React from 'react';
import { Leaf, Sparkles } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="app-header">
      <div className="container header-inner">
        <div className="flex items-center gap-2.5">
          <div className="logo-box">
            <Leaf className="w-5 h-5 text-white" fill="currentColor" strokeWidth={2.5} />
          </div>
          <span className="logo-text">
            Nutri<span className="logo-highlight">Food</span>
          </span>
        </div>
        <div className="header-badge">
          <Sparkles className="w-4 h-4 text-amber-500" strokeWidth={2.5} />
          <span>AI Health Advisor</span>
        </div>
      </div>
    </header>
  );
};

export default Header;