import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  TrendingUp,
  Briefcase,
  Newspaper,
  Brain,
  Bell,
  Code2,
  Database,
  ShieldCheck,
  FileSpreadsheet,
  Users,
  Settings,
  ShieldAlert,
  MoreVertical,
  LogOut,
  UserCheck,
  ChevronRight,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { UserRole } from '@/types';
import logoSvg from '@/assets/branding/marketlens-logo.svg';

interface SidebarProps {
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onCloseMobile }) => {
  const { user, switchRole, logout } = useAuth();
  const navigate = useNavigate();
  const [showRoleMenu, setShowRoleMenu] = useState(false);

  interface NavSection {
    heading?: string;
    badge?: string;
    items: {
      label: string;
      path: string;
      icon: any;
    }[];
  }

  // Role based navigation structure matching approved PNG designs
  const getNavSections = (): NavSection[] => {
    if (!user) return [];

    if (user.role === 'ROLE_ANALYST') {
      return [
        {
          items: [
            { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
          ],
        },
        {
          heading: 'MARKET',
          items: [
            { label: 'Markets', path: '/markets', icon: TrendingUp },
            { label: 'Portfolio', path: '/portfolio', icon: Briefcase },
            { label: 'News Intelligence', path: '/news', icon: Newspaper },
            { label: 'AI Analyst', path: '/ai-analyst', icon: Brain },
            { label: 'Watchlist & Alerts', path: '/watchlist', icon: Bell },
          ],
        },
        {
          heading: 'DEVELOPER',
          items: [
            { label: 'API Access', path: '/api-access', icon: Code2 },
          ],
        },
      ];
    }

    if (user.role === 'ROLE_DATA_MANAGER') {
      return [
        {
          heading: 'DATA OPERATIONS',
          badge: 'ADMIN',
          items: [
            { label: 'Data Management', path: '/data-management', icon: Database },
            { label: 'Data Import', path: '/data-import', icon: FileSpreadsheet },
            { label: 'Data Quality', path: '/data-quality', icon: ShieldCheck },
          ],
        },
      ];
    }

    // ROLE_ADMIN
    return [
      {
        heading: 'ADMINISTRATION',
        items: [
          { label: 'User Management', path: '/admin/users', icon: Users },
          { label: 'System Settings', path: '/admin/settings', icon: Settings },
          { label: 'Audit Logs', path: '/admin/audit', icon: ShieldAlert },
        ],
      },
    ];
  };

  const navSections = getNavSections();

  const handleRoleSwitch = (newRole: UserRole) => {
    switchRole(newRole);
    setShowRoleMenu(false);
    if (newRole === 'ROLE_ANALYST') navigate('/dashboard');
    else if (newRole === 'ROLE_DATA_MANAGER') navigate('/data-management');
    else if (newRole === 'ROLE_ADMIN') navigate('/admin/users');
  };

  return (
    <aside className="w-64 h-screen bg-white border-r border-[#E5E7EB] flex flex-col flex-shrink-0 select-none">
      {/* Brand Header */}
      <div className="h-16 px-6 flex items-center border-b border-[#F3F4F6]">
        <NavLink to="/" className="flex items-center gap-2" onClick={onCloseMobile}>
          <img
            src={logoSvg}
            alt="MarketLens"
            className="h-8 w-auto object-contain"
          />
        </NavLink>
      </div>

      {/* Nav Menu */}
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-6">
        {navSections.map((section, idx) => (
          <div key={idx} className="space-y-1">
            {section.heading && (
              <div className="px-3 pb-1 flex items-center justify-between text-[11px] font-semibold tracking-wider text-gray-400 uppercase">
                <span>{section.heading}</span>
                {section.badge && (
                  <span className="text-[10px] px-1.5 py-0.2 bg-emerald-50 text-emerald-600 rounded font-bold border border-emerald-200">
                    {section.badge}
                  </span>
                )}
              </div>
            )}
            <nav className="space-y-0.5">
              {section.items.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={onCloseMobile}
                    className={({ isActive }) =>
                      `group flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                        isActive
                          ? 'bg-[#F3F4F6] text-[#111827] font-semibold'
                          : 'text-[#4B5563] hover:text-[#111827] hover:bg-[#F9FAFB]'
                      }`
                    }
                  >
                    <Icon className="w-4 h-4 text-gray-500 group-hover:text-gray-900 transition-colors" />
                    <span>{item.label}</span>
                  </NavLink>
                );
              })}
            </nav>
          </div>
        ))}
      </div>

      {/* User / Profile Section at Bottom */}
      <div className="p-3 border-t border-[#F3F4F6] relative">
        <div className="flex items-center justify-between p-2 rounded-xl hover:bg-gray-50 transition-colors">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-full bg-[#111827] text-white flex items-center justify-center font-semibold text-xs flex-shrink-0">
              {user?.initials || 'ML'}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {user?.name || 'Guest User'}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {user?.roleLabel || 'MarketLens'}
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowRoleMenu(!showRoleMenu)}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
            title="Switch demo role or sign out"
          >
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>

        {/* Role Switcher Menu Popup */}
        {showRoleMenu && (
          <div className="absolute bottom-16 left-3 right-3 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50 animate-in fade-in duration-100">
            <div className="px-3 py-1 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
              Switch Demo Role
            </div>

            <button
              onClick={() => handleRoleSwitch('ROLE_ANALYST')}
              className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-left transition-colors ${
                user?.role === 'ROLE_ANALYST'
                  ? 'bg-emerald-50 text-emerald-800'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-2">
                <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Market Analyst (Alex Silva)</span>
              </div>
              {user?.role === 'ROLE_ANALYST' && <ChevronRight className="w-3.5 h-3.5" />}
            </button>

            <button
              onClick={() => handleRoleSwitch('ROLE_DATA_MANAGER')}
              className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-left transition-colors ${
                user?.role === 'ROLE_DATA_MANAGER'
                  ? 'bg-emerald-50 text-emerald-800'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-2">
                <Database className="w-3.5 h-3.5 text-blue-600" />
                <span>Data Manager (Nimal Perera)</span>
              </div>
              {user?.role === 'ROLE_DATA_MANAGER' && <ChevronRight className="w-3.5 h-3.5" />}
            </button>

            <button
              onClick={() => handleRoleSwitch('ROLE_ADMIN')}
              className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-left transition-colors ${
                user?.role === 'ROLE_ADMIN'
                  ? 'bg-emerald-50 text-emerald-800'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-purple-600" />
                <span>Administrator (Sarah Fernando)</span>
              </div>
              {user?.role === 'ROLE_ADMIN' && <ChevronRight className="w-3.5 h-3.5" />}
            </button>

            <div className="my-1 border-t border-gray-100" />

            <button
              onClick={() => {
                logout();
                navigate('/login');
              }}
              className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign out</span>
            </button>
          </div>
        )}
      </div>
    </aside>
  );
};
