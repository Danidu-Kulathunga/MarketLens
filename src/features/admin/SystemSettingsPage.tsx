import React, { useState } from 'react';
import { useMarketData } from '@/context/MarketDataContext';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import {
  Server,
  ShieldCheck,
  Bell,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  Save,
  RotateCcw,
  Wifi,
  Sliders,
  Database,
  Lock,
} from 'lucide-react';
import { INITIAL_SYSTEM_CONFIG, SystemConfig } from '@/data/mock/adminData';

export const SystemSettingsPage: React.FC = () => {
  const { systemConfig, updateSystemConfig, addAuditLog } = useMarketData();
  const { user } = useAuth();

  const [formData, setFormData] = useState<SystemConfig>(systemConfig);
  const [activeTab, setActiveTab] = useState<'providers' | 'ingestion' | 'security' | 'notifications'>('providers');
  const [savedNotification, setSavedNotification] = useState<string | null>(null);
  const [testStatus, setTestStatus] = useState<{ [key: string]: 'idle' | 'testing' | 'success' | 'failed' }>({
    twelveData: 'idle',
    cse: 'idle',
  });

  const handleProviderChange = (provider: 'twelveData' | 'cseDataSource', field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      providers: {
        ...prev.providers,
        [provider]: {
          ...prev.providers[provider],
          [field]: value,
        },
      },
    }));
  };

  const handleIngestionChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      ingestion: {
        ...prev.ingestion,
        [field]: value,
      },
    }));
  };

  const handleSecurityChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      security: {
        ...prev.security,
        [field]: value,
      },
    }));
  };

  const handleNotificationChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [field]: value,
      },
    }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSystemConfig(formData);
    addAuditLog({
      actor: user ? user.name : 'System Admin',
      role: 'ROLE_ADMIN',
      action: 'UPDATE_SYSTEM_SETTINGS',
      resource: `Updated ${activeTab.toUpperCase()} configuration parameters`,
      ipAddress: '192.168.1.104',
      status: 'SUCCESS',
    });
    setSavedNotification('System configuration updated successfully and broadcast to all engine nodes.');
    setTimeout(() => setSavedNotification(null), 4000);
  };

  const handleResetDefaults = () => {
    if (confirm('Are you sure you want to reset settings to system defaults?')) {
      setFormData(INITIAL_SYSTEM_CONFIG);
      updateSystemConfig(INITIAL_SYSTEM_CONFIG);
      addAuditLog({
        actor: user ? user.name : 'System Admin',
        role: 'ROLE_ADMIN',
        action: 'RESET_SYSTEM_SETTINGS_DEFAULT',
        resource: 'Reverted all provider and security settings to default',
        ipAddress: '192.168.1.104',
        status: 'WARNING',
      });
      setSavedNotification('All settings have been restored to initial defaults.');
      setTimeout(() => setSavedNotification(null), 4000);
    }
  };

  const runConnectionTest = (target: 'twelveData' | 'cse') => {
    setTestStatus(prev => ({ ...prev, [target]: 'testing' }));
    setTimeout(() => {
      setTestStatus(prev => ({ ...prev, [target]: 'success' }));
      setTimeout(() => {
        setTestStatus(prev => ({ ...prev, [target]: 'idle' }));
      }, 5000);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner / Heading */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">System Settings</h1>
          <p className="text-sm text-gray-500 mt-1">
            Configure external market data providers, ingestion parameters, security policies, and system thresholds.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={handleResetDefaults} className="text-xs">
            <RotateCcw className="w-3.5 h-3.5 mr-1.5 text-gray-500" />
            Reset to Defaults
          </Button>
          <Button size="sm" onClick={handleSave} className="text-xs bg-[#111827] text-white">
            <Save className="w-3.5 h-3.5 mr-1.5" />
            Save Changes
          </Button>
        </div>
      </div>

      {savedNotification && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-lg flex items-center gap-3 text-sm animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          <span>{savedNotification}</span>
        </div>
      )}

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('providers')}
            className={`py-3 px-1 border-b-2 font-medium text-sm flex items-center gap-2 transition-colors ${
              activeTab === 'providers'
                ? 'border-gray-900 text-gray-900 font-semibold'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <Server className="w-4 h-4" />
            Data Providers & APIs
          </button>
          <button
            onClick={() => setActiveTab('ingestion')}
            className={`py-3 px-1 border-b-2 font-medium text-sm flex items-center gap-2 transition-colors ${
              activeTab === 'ingestion'
                ? 'border-gray-900 text-gray-900 font-semibold'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <Sliders className="w-4 h-4" />
            Ingestion & Data Quality
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className={`py-3 px-1 border-b-2 font-medium text-sm flex items-center gap-2 transition-colors ${
              activeTab === 'security'
                ? 'border-gray-900 text-gray-900 font-semibold'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            Security & Compliance
          </button>
          <button
            onClick={() => setActiveTab('notifications')}
            className={`py-3 px-1 border-b-2 font-medium text-sm flex items-center gap-2 transition-colors ${
              activeTab === 'notifications'
                ? 'border-gray-900 text-gray-900 font-semibold'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <Bell className="w-4 h-4" />
            Webhooks & Alerts
          </button>
        </nav>
      </div>

      {/* Tab 1: Data Providers */}
      {activeTab === 'providers' && (
        <div className="space-y-6">
          {/* Twelve Data Configuration */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-5 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm">
                  12D
                </div>
                <div>
                  <h3 className="text-base font-semibold text-gray-900">Twelve Data API (Global Markets)</h3>
                  <p className="text-xs text-gray-500">Real-time quotes, technical indicators, and historical candle stream</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant={formData.providers.twelveData.status === 'Connected' ? 'success' : 'error'}>
                  {formData.providers.twelveData.status}
                </Badge>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-xs"
                  onClick={() => runConnectionTest('twelveData')}
                  disabled={testStatus.twelveData === 'testing'}
                >
                  {testStatus.twelveData === 'testing' ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 mr-1.5 animate-spin" />
                      Testing Ping...
                    </>
                  ) : testStatus.twelveData === 'success' ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 mr-1.5 text-emerald-600" />
                      Latency: 38ms (OK)
                    </>
                  ) : (
                    <>
                      <Wifi className="w-3.5 h-3.5 mr-1.5 text-gray-500" />
                      Test Connection
                    </>
                  )}
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Input
                label="API Key / Secret"
                type="password"
                value={formData.providers.twelveData.apiKey}
                onChange={e => handleProviderChange('twelveData', 'apiKey', e.target.value)}
                helperText="Encrypted using AES-256-GCM in vault storage"
              />
              <Input
                label="API Base URL"
                value={formData.providers.twelveData.baseUrl}
                onChange={e => handleProviderChange('twelveData', 'baseUrl', e.target.value)}
              />
              <Input
                label="Rate Limit (Requests / min)"
                type="number"
                value={formData.providers.twelveData.rateLimitPerMin}
                onChange={e => handleProviderChange('twelveData', 'rateLimitPerMin', parseInt(e.target.value) || 0)}
                helperText="Tier quota: Enterprise plan allows up to 1,200 req/min"
              />
              <div className="grid grid-cols-2 gap-3">
                <Input
                  label="Sync Interval (min)"
                  type="number"
                  value={formData.providers.twelveData.syncIntervalMinutes}
                  onChange={e => handleProviderChange('twelveData', 'syncIntervalMinutes', parseInt(e.target.value) || 1)}
                />
                <Input
                  label="Cache TTL (sec)"
                  type="number"
                  value={formData.providers.twelveData.cacheTtlSeconds}
                  onChange={e => handleProviderChange('twelveData', 'cacheTtlSeconds', parseInt(e.target.value) || 30)}
                />
              </div>
            </div>
          </div>

          {/* Colombo Stock Exchange (CSE) Source */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-5 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-sm">
                  CSE
                </div>
                <div>
                  <h3 className="text-base font-semibold text-gray-900">CSE Local Feed (Internal Direct Gateway)</h3>
                  <p className="text-xs text-gray-500">Colombo Stock Exchange high-frequency order book and trade broadcast</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant={formData.providers.cseDataSource.status === 'Connected' ? 'success' : 'error'}>
                  {formData.providers.cseDataSource.status}
                </Badge>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-xs"
                  onClick={() => runConnectionTest('cse')}
                  disabled={testStatus.cse === 'testing'}
                >
                  {testStatus.cse === 'testing' ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 mr-1.5 animate-spin" />
                      Testing Ping...
                    </>
                  ) : testStatus.cse === 'success' ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 mr-1.5 text-emerald-600" />
                      Latency: 14ms (Direct)
                    </>
                  ) : (
                    <>
                      <Wifi className="w-3.5 h-3.5 mr-1.5 text-gray-500" />
                      Test Connection
                    </>
                  )}
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Input
                label="Stream Endpoint URL"
                value={formData.providers.cseDataSource.endpointUrl}
                onChange={e => handleProviderChange('cseDataSource', 'endpointUrl', e.target.value)}
              />
              <Input
                label="Private Authorization Token"
                type="password"
                value={formData.providers.cseDataSource.authToken}
                onChange={e => handleProviderChange('cseDataSource', 'authToken', e.target.value)}
              />
              <Input
                label="Polling Frequency (Seconds)"
                type="number"
                value={formData.providers.cseDataSource.pollingFrequencySeconds}
                onChange={e => handleProviderChange('cseDataSource', 'pollingFrequencySeconds', parseInt(e.target.value) || 5)}
                helperText="Default: 15s during trading hours (09:30 - 14:30 SLT)"
              />
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Ingestion & Data Quality */}
      {activeTab === 'ingestion' && (
        <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-6 shadow-sm">
          <div>
            <h3 className="text-base font-semibold text-gray-900">Ingestion Engine & Anomaly Detection</h3>
            <p className="text-xs text-gray-500 mt-0.5">Automated screening rules applied to incoming CSV/JSON market records</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <Input
              label="Maximum Batch Ingestion Size (Records)"
              type="number"
              value={formData.ingestion.maxBatchSize}
              onChange={e => handleIngestionChange('maxBatchSize', parseInt(e.target.value) || 1000)}
              helperText="Batches exceeding this will be split into parallel worker chunks"
            />
            <Input
              label="Statistical Anomaly Z-Score Threshold (σ)"
              type="number"
              step="0.1"
              value={formData.ingestion.anomalyZScoreThreshold}
              onChange={e => handleIngestionChange('anomalyZScoreThreshold', parseFloat(e.target.value) || 3.0)}
              helperText="Records with price/volume changes > this threshold are flagged for Data Quality review"
            />
          </div>

          <div className="border-t border-gray-100 pt-5 space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm font-semibold text-gray-900">Strict Schema Validation</p>
                <p className="text-xs text-gray-500">
                  Reject entire file upload if required headers (timestamp, symbol, open, high, low, close) are missing.
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.ingestion.strictSchemaValidation}
                  onChange={e => handleIngestionChange('strictSchemaValidation', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm font-semibold text-gray-900">Auto-Quarantine Corrupt Records</p>
                <p className="text-xs text-gray-500">
                  Isolate malformed or out-of-bound records into the Data Quality triage queue without halting clean rows.
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.ingestion.autoQuarantineErrors}
                  onChange={e => handleIngestionChange('autoQuarantineErrors', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
              </label>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Security & Governance */}
      {activeTab === 'security' && (
        <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-6 shadow-sm">
          <div>
            <h3 className="text-base font-semibold text-gray-900">Security Policies & Access Control</h3>
            <p className="text-xs text-gray-500 mt-0.5">Session controls, multi-factor enforcement, and compliance audit policies</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <Input
              label="Session Inactivity Timeout (Minutes)"
              type="number"
              value={formData.security.sessionTimeoutMinutes}
              onChange={e => handleSecurityChange('sessionTimeoutMinutes', parseInt(e.target.value) || 15)}
              helperText="Users will be redirected to Session Expired after this period of inactivity"
            />
            <Input
              label="Max Failed Login Attempts"
              type="number"
              value={formData.security.maxLoginAttempts}
              onChange={e => handleSecurityChange('maxLoginAttempts', parseInt(e.target.value) || 3)}
              helperText="Account will be temporarily locked for 15 minutes upon exceeding"
            />
            <Input
              label="Audit Log Retention Policy (Days)"
              type="number"
              value={formData.security.auditLogRetentionDays}
              onChange={e => handleSecurityChange('auditLogRetentionDays', parseInt(e.target.value) || 30)}
              helperText="Compliance requirement: Minimum 90 days for financial auditor sign-off"
            />
          </div>

          <div className="border-t border-gray-100 pt-5 space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm font-semibold text-gray-900">Enforce Multi-Factor Authentication (MFA)</p>
                <p className="text-xs text-gray-500">Require TOTP authenticator code for all Data Managers and Administrators</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.security.mfaEnforced}
                  onChange={e => handleSecurityChange('mfaEnforced', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-red-50/50 border border-red-100 rounded-lg">
              <div>
                <p className="text-sm font-semibold text-red-900 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-red-600" />
                  System Maintenance Mode
                </p>
                <p className="text-xs text-red-600">
                  When enabled, only administrators can sign in. External APIs and public analyst portal will display a maintenance message.
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.security.maintenanceMode}
                  onChange={e => handleSecurityChange('maintenanceMode', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
              </label>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Webhooks & Notifications */}
      {activeTab === 'notifications' && (
        <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-6 shadow-sm">
          <div>
            <h3 className="text-base font-semibold text-gray-900">Alert Webhooks & Notification Dispatch</h3>
            <p className="text-xs text-gray-500 mt-0.5">Route pipeline failures, security breaches, and price anomalies to internal teams</p>
          </div>

          <div className="space-y-4">
            <Input
              label="Slack Incident Webhook URL"
              value={formData.notifications.webhookUrl}
              onChange={e => handleNotificationChange('webhookUrl', e.target.value)}
              helperText="Incoming Webhook for #ops-marketlens-alerts"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm font-semibold text-gray-900">Email System Alerts</p>
                  <p className="text-xs text-gray-500">Dispatch critical errors to admin team emails</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.notifications.emailAlertsEnabled}
                    onChange={e => handleNotificationChange('emailAlertsEnabled', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm font-semibold text-gray-900">Slack Dispatch Channel</p>
                  <p className="text-xs text-gray-500">Post automated summaries on batch ingestion</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.notifications.slackAlertsEnabled}
                    onChange={e => handleNotificationChange('slackAlertsEnabled', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                </label>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
