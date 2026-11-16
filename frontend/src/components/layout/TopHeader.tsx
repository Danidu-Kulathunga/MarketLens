import React, { useState } from 'react';
import { Search, Bell, Menu, X, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useMarketData } from '@/context/MarketDataContext';
import { useNavigate } from 'react-router-dom';

interface TopHeaderProps {
  onToggleMobileMenu?: () => void;
  isMobileMenuOpen?: boolean;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  onToggleMobileMenu,
  isMobileMenuOpen,
}) => {
  const { user, logout } = useAuth();
  const { triggeredAlerts, dismissTriggeredAlert } = useMarketData();
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    const query = searchQuery.trim().toUpperCase();
    navigate(`/markets/${query}`);
  };

  return (
    <header className="h-16 bg-white border-b border-[#E5E7EB] px-6 flex items-center justify-between sticky top-0 z-30">
      {/* Left: Mobile hamburger & Global Search */}
      <div className="flex items-center gap-4 flex-1 max-w-xl">
        <button
          onClick={onToggleMobileMenu}
          className="p-2 -ml-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 lg:hidden"
          aria-label="Toggle navigation menu"
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        <form onSubmit={handleSearchSubmit} className="relative w-full max-w-md">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search markets, companies, symbols, or news..."
            className="w-full bg-[#F9FAFB] hover:bg-white text-sm text-gray-900 pl-10 pr-12 py-2 rounded-lg border border-[#E5E7EB] focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-colors"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none hidden sm:flex items-center text-[10px] text-gray-400 font-mono px-1.5 py-0.5 rounded border border-gray-200 bg-white">
            ⌘K
          </div>
        </form>
      </div>

      {/* Right: Live Status, Notifications, Account */}
      <div className="flex items-center gap-4">
        {/* Real-time feed status pill */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-emerald-50/70 border border-emerald-200/80 rounded-full text-xs font-medium text-emerald-800">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>Market Data Live</span>
        </div>

        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-full text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors relative"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
            {triggeredAlerts.length > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-gray-200 p-4 z-50 animate-in fade-in zoom-in-95 duration-100">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-semibold text-gray-900">Notifications & Alerts</h4>
                  <span className="text-[11px] px-2 py-0.5 bg-gray-100 text-gray-700 rounded-full font-medium">
                    {triggeredAlerts.length}
                  </span>
                </div>
                <button
                  onClick={() => setShowNotifications(false)}
                  className="text-xs text-gray-500 hover:text-gray-900"
                >
                  Close
                </button>
              </div>

              <div className="divide-y divide-gray-100 max-h-80 overflow-y-auto mt-2">
                {triggeredAlerts.length === 0 ? (
                  <div className="py-6 text-center text-xs text-gray-500">
                    <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2 opacity-80" />
                    All market alerts clear. No pending notifications.
                  </div>
                ) : (
                  triggeredAlerts.map((alt) => (
                    <div key={alt.id} className="py-3 flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold text-gray-900">{alt.title}</span>
                          <span className="text-[10px] text-gray-400">{alt.time}</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                          {alt.description}
                        </p>
                        <div className="mt-2 flex items-center gap-3">
                          <button
                            onClick={() => {
                              setShowNotifications(false);
                              navigate(`/markets/${alt.symbol}`);
                            }}
                            className="text-[11px] font-medium text-emerald-600 hover:text-emerald-700 flex items-center gap-0.5"
                          >
                            <span>View {alt.symbol}</span>
                            <ArrowUpRight className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => dismissTriggeredAlert(alt.id)}
                            className="text-[11px] text-gray-400 hover:text-gray-600"
                          >
                            Dismiss
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Profile Avatar Button */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="w-8 h-8 rounded-full bg-[#111827] text-white flex items-center justify-center font-medium text-xs hover:ring-2 hover:ring-offset-2 hover:ring-black transition-all"
            aria-label="User profile menu"
          >
            {user?.initials || 'AS'}
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50 animate-in fade-in duration-100">
              <div className="px-4 py-2 border-b border-gray-100">
                <p className="text-sm font-semibold text-gray-900">{user?.name}</p>
                <p className="text-xs text-gray-500">{user?.email}</p>
                <div className="mt-1.5 inline-block text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 bg-gray-100 text-gray-700 rounded">
                  {user?.roleLabel}
                </div>
              </div>

              <div className="py-1">
                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    navigate('/session-expired');
                  }}
                  className="w-full text-left px-4 py-2 text-xs text-gray-700 hover:bg-gray-50"
                >
                  Simulate Session Expired
                </button>
              </div>

              <div className="border-t border-gray-100 py-1">
                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    logout();
                    navigate('/login');
                  }}
                  className="w-full text-left px-4 py-2 text-xs text-red-600 hover:bg-red-50 font-medium"
                >
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
