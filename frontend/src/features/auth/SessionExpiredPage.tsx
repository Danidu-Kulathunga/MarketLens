import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock } from 'lucide-react';
import { AuthShell } from './AuthShell';
import { useAuth } from '@/context/AuthContext';

export const SessionExpiredPage: React.FC = () => {
  const navigate = useNavigate();
  const { setSessionExpired } = useAuth();

  const handleSignIn = () => {
    setSessionExpired(false);
    navigate('/login');
  };

  return (
    <AuthShell>
      <div className="text-center space-y-6">
        {/* Clock icon in grey square */}
        <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto text-gray-500">
          <Clock className="w-7 h-7" />
        </div>

        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            Your session has expired
          </h1>
          <p className="text-sm text-gray-600 mt-3 leading-relaxed">
            Please sign in again to continue using MarketLens.
          </p>
          <p className="text-xs text-gray-400 mt-2">
            For security, inactive sessions may be ended automatically.
          </p>
        </div>

        <button
          onClick={handleSignIn}
          className="w-full bg-[#111827] text-white py-3 rounded-lg text-sm font-semibold hover:bg-black transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
        >
          Sign In
        </button>
      </div>
    </AuthShell>
  );
};
