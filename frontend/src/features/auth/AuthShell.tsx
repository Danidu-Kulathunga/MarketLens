import React from 'react';
import { Link } from 'react-router-dom';
import logoSvg from '@/assets/branding/marketlens-logo.svg';

interface AuthShellProps {
  children: React.ReactNode;
}

export const AuthShell: React.FC<AuthShellProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col">
      {/* Top Header Bar */}
      <header className="h-16 bg-white border-b border-[#E5E7EB] px-8 flex items-center">
        <Link to="/login" className="flex items-center">
          <img
            src={logoSvg}
            alt="MarketLens"
            className="h-8 w-auto object-contain"
          />
        </Link>
      </header>

      {/* Main Centered Content */}
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-[480px] bg-white rounded-2xl border border-[#E5E7EB] p-8 sm:p-10 shadow-sm">
          {children}
        </div>
      </main>
    </div>
  );
};
