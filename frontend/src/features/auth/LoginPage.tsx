import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, ShieldCheck, Database, TrendingUp } from 'lucide-react';
import { AuthShell } from './AuthShell';
import { useAuth } from '@/context/AuthContext';
import { UserRole } from '@/types';

export const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('alex.silva@marketlens.io');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      login(email, password);
      setIsLoading(false);
      navigate('/dashboard');
    }, 400);
  };

  const handleDemoLogin = (role: UserRole) => {
    setIsLoading(true);
    setTimeout(() => {
      login(undefined, undefined, role);
      setIsLoading(false);
      if (role === 'ROLE_ANALYST') navigate('/dashboard');
      else if (role === 'ROLE_DATA_MANAGER') navigate('/data-management');
      else if (role === 'ROLE_ADMIN') navigate('/admin/users');
    }, 250);
  };

  return (
    <AuthShell>
      <div className="text-center mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
          Welcome back
        </h1>
        <p className="text-sm text-gray-500 mt-2">
          Sign in to continue to MarketLens.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@example.com"
            required
            className="w-full px-3.5 py-2.5 bg-white border border-[#E5E7EB] rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="w-full px-3.5 py-2.5 pr-10 bg-white border border-[#E5E7EB] rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 cursor-pointer select-none text-gray-600">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 text-black rounded border-gray-300 focus:ring-black"
            />
            <span>Remember me</span>
          </label>
          <Link
            to="/forgot-password"
            className="text-gray-900 font-medium hover:underline text-sm"
          >
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-[#111827] text-white py-3 rounded-lg text-sm font-semibold hover:bg-black transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:opacity-50"
        >
          {isLoading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>

      {/* Demo Quick Logins */}
      <div className="mt-8 pt-6 border-t border-gray-100">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider text-center mb-3">
          Instant Demo Access
        </p>
        <div className="grid grid-cols-1 gap-2">
          <button
            type="button"
            onClick={() => handleDemoLogin('ROLE_ANALYST')}
            className="flex items-center justify-between px-3 py-2 text-xs font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 transition-colors"
          >
            <div className="flex items-center gap-2">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
              <span>Sign in as Market Analyst (Alex Silva)</span>
            </div>
            <span className="text-[10px] text-gray-400">Analyst View →</span>
          </button>

          <button
            type="button"
            onClick={() => handleDemoLogin('ROLE_DATA_MANAGER')}
            className="flex items-center justify-between px-3 py-2 text-xs font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Database className="w-3.5 h-3.5 text-blue-600" />
              <span>Sign in as Data Manager (Nimal Perera)</span>
            </div>
            <span className="text-[10px] text-gray-400">Ops View →</span>
          </button>

          <button
            type="button"
            onClick={() => handleDemoLogin('ROLE_ADMIN')}
            className="flex items-center justify-between px-3 py-2 text-xs font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 transition-colors"
          >
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-purple-600" />
              <span>Sign in as Administrator (Sarah Fernando)</span>
            </div>
            <span className="text-[10px] text-gray-400">Admin View →</span>
          </button>
        </div>
      </div>
    </AuthShell>
  );
};
