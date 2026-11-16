import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { APIOverviewTab } from './APIOverviewTab';
import { APIKeyTab } from './APIKeyTab';
import { APIEndpointsTab } from './APIEndpointsTab';
import { APIUsageTab } from './APIUsageTab';

export const APIAccessPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Determine active tab based on pathname
  const getActiveTab = () => {
    if (location.pathname.includes('/api-access/key')) return 'key';
    if (location.pathname.includes('/api-access/endpoints')) return 'endpoints';
    if (location.pathname.includes('/api-access/usage')) return 'usage';
    return 'overview';
  };

  const activeTab = getActiveTab();

  const handleTabChange = (tab: string) => {
    if (tab === 'overview') navigate('/api-access');
    else if (tab === 'key') navigate('/api-access/key');
    else if (tab === 'endpoints') navigate('/api-access/endpoints');
    else if (tab === 'usage') navigate('/api-access/usage');
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div>
        <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
          <span>Developer</span>
          <span>/</span>
          <span className="text-gray-900 font-bold">API Access</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight mt-1">
          API Access
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Access MarketLens financial market data and analytics programmatically.
        </p>
      </div>

      {/* Tabs Bar */}
      <div className="border-b border-gray-200">
        <div className="flex items-center gap-6 -mb-px text-xs font-semibold">
          <button
            onClick={() => handleTabChange('overview')}
            className={`py-3 border-b-2 flex items-center gap-2 transition-colors ${
              activeTab === 'overview'
                ? 'border-black text-black'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            <span>Overview</span>
          </button>

          <button
            onClick={() => handleTabChange('key')}
            className={`py-3 border-b-2 flex items-center gap-2 transition-colors ${
              activeTab === 'key'
                ? 'border-black text-black'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            <span>API Key</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          </button>

          <button
            onClick={() => handleTabChange('endpoints')}
            className={`py-3 border-b-2 flex items-center gap-2 transition-colors ${
              activeTab === 'endpoints'
                ? 'border-black text-black'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            <span>Endpoints</span>
            <span className="px-1.5 py-0.2 rounded text-[10px] bg-gray-100 text-gray-600 font-mono">
              v1
            </span>
          </button>

          <button
            onClick={() => handleTabChange('usage')}
            className={`py-3 border-b-2 flex items-center gap-2 transition-colors ${
              activeTab === 'usage'
                ? 'border-black text-black'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            <span>Usage</span>
          </button>
        </div>
      </div>

      {/* Active Tab Component */}
      <div>
        {activeTab === 'overview' && <APIOverviewTab />}
        {activeTab === 'key' && <APIKeyTab />}
        {activeTab === 'endpoints' && <APIEndpointsTab />}
        {activeTab === 'usage' && <APIUsageTab />}
      </div>
    </div>
  );
};
