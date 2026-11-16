import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthShell } from './AuthShell';
import { CheckCircle2 } from 'lucide-react';

export const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 400);
  };

  return (
    <AuthShell>
      <div className="text-center mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
          Forgot your password?
        </h1>
        <p className="text-sm text-gray-500 mt-2">
          Enter your email address and we'll send instructions to reset your password.
        </p>
      </div>

      {isSubmitted ? (
        <div className="text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <p className="text-sm text-gray-700">
            If an account exists for <span className="font-semibold">{email}</span>, you will receive password reset instructions shortly.
          </p>
          <div className="pt-4 border-t border-gray-100">
            <Link
              to="/reset-password"
              className="inline-block text-xs font-semibold text-emerald-600 hover:text-emerald-700 mb-2"
            >
              Simulate Opening Reset Link →
            </Link>
            <br />
            <Link
              to="/login"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              ← Back to Sign In
            </Link>
          </div>
        </div>
      ) : (
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

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#111827] text-white py-3 rounded-lg text-sm font-semibold hover:bg-black transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:opacity-50"
          >
            {isLoading ? 'Sending Link...' : 'Send Reset Link'}
          </button>

          <div className="pt-4 border-t border-gray-100 text-center">
            <Link
              to="/login"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              ← Back to Sign In
            </Link>
          </div>
        </form>
      )}
    </AuthShell>
  );
};
