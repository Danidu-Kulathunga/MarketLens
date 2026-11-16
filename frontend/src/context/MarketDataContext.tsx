import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Holding,
  PortfolioSummary,
  WatchlistItem,
  AlertItem,
  TriggeredAlert,
  DataQualityIssue,
  ImportBatch,
  APIKeyItem,
  User,
} from '@/types';
import { INITIAL_HOLDINGS, INITIAL_PORTFOLIO_SUMMARY } from '@/data/mock/portfolioData';
import { INITIAL_WATCHLIST, INITIAL_ALERTS, INITIAL_TRIGGERED_ALERTS } from '@/data/mock/watchlistData';
import { INITIAL_DATA_QUALITY_ISSUES, INITIAL_IMPORT_BATCHES } from '@/data/mock/dataManagerData';
import { INITIAL_API_KEYS } from '@/data/mock/apiDeveloperData';
import { MOCK_USERS } from '@/data/mock/users';
import { INITIAL_SYSTEM_CONFIG, SystemConfig, AuditLogItem, INITIAL_AUDIT_LOGS } from '@/data/mock/adminData';

interface MarketDataContextType {
  // Portfolio
  holdings: Holding[];
  portfolioSummary: PortfolioSummary;
  addHolding: (holding: Omit<Holding, 'id' | 'marketValue' | 'totalGain' | 'totalGainPercent' | 'dayGain' | 'dayGainPercent' | 'allocation'>) => void;
  editHolding: (id: string, shares: number, avgCost: number) => void;
  removeHolding: (id: string) => void;

  // Watchlist & Alerts
  watchlist: WatchlistItem[];
  toggleWatchlist: (symbol: string) => void;
  alerts: AlertItem[];
  createAlert: (alert: Omit<AlertItem, 'id' | 'createdDate'>) => void;
  toggleAlertStatus: (id: string) => void;
  deleteAlert: (id: string) => void;
  triggeredAlerts: TriggeredAlert[];
  dismissTriggeredAlert: (id: string) => void;

  // Data Quality & Import
  dataQualityIssues: DataQualityIssue[];
  resolveQualityIssue: (id: string, correctedValue: string) => void;
  ignoreQualityIssue: (id: string) => void;
  removeQualityRecord: (id: string) => void;
  reprocessResolvedIssues: () => void;
  importBatches: ImportBatch[];
  addImportBatch: (batch: ImportBatch) => void;

  // API Developer
  apiKeys: APIKeyItem[];
  generateApiKey: (name: string, environment: string) => APIKeyItem;
  revokeApiKey: (id: string) => void;

  // Users & Admin
  users: User[];
  createUser: (user: Omit<User, 'id' | 'createdAt'>) => void;
  updateUser: (id: string, updates: Partial<User>) => void;
  toggleUserStatus: (id: string) => void;
  systemConfig: SystemConfig;
  updateSystemConfig: (updates: Partial<SystemConfig>) => void;
  auditLogs: AuditLogItem[];
  addAuditLog: (log: Omit<AuditLogItem, 'id' | 'timestamp'>) => void;
}

const MarketDataContext = createContext<MarketDataContextType | undefined>(undefined);

export const MarketDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Holdings
  const [holdings, setHoldings] = useState<Holding[]>(() => {
    const saved = localStorage.getItem('marketlens_holdings');
    return saved ? JSON.parse(saved) : INITIAL_HOLDINGS;
  });

  // Watchlist
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>(() => {
    const saved = localStorage.getItem('marketlens_watchlist');
    return saved ? JSON.parse(saved) : INITIAL_WATCHLIST;
  });

  // Alerts
  const [alerts, setAlerts] = useState<AlertItem[]>(() => {
    const saved = localStorage.getItem('marketlens_alerts');
    return saved ? JSON.parse(saved) : INITIAL_ALERTS;
  });

  const [triggeredAlerts, setTriggeredAlerts] = useState<TriggeredAlert[]>(() => {
    const saved = localStorage.getItem('marketlens_triggered_alerts');
    return saved ? JSON.parse(saved) : INITIAL_TRIGGERED_ALERTS;
  });

  // Data Quality
  const [dataQualityIssues, setDataQualityIssues] = useState<DataQualityIssue[]>(() => {
    const saved = localStorage.getItem('marketlens_dq_issues');
    return saved ? JSON.parse(saved) : INITIAL_DATA_QUALITY_ISSUES;
  });

  // Import Batches
  const [importBatches, setImportBatches] = useState<ImportBatch[]>(() => {
    const saved = localStorage.getItem('marketlens_import_batches');
    return saved ? JSON.parse(saved) : INITIAL_IMPORT_BATCHES;
  });

  // API Keys
  const [apiKeys, setApiKeys] = useState<APIKeyItem[]>(() => {
    const saved = localStorage.getItem('marketlens_api_keys');
    return saved ? JSON.parse(saved) : INITIAL_API_KEYS;
  });

  // Users
  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('marketlens_users');
    return saved ? JSON.parse(saved) : MOCK_USERS;
  });

  // System Settings
  const [systemConfig, setSystemConfig] = useState<SystemConfig>(() => {
    const saved = localStorage.getItem('marketlens_sys_config');
    return saved ? JSON.parse(saved) : INITIAL_SYSTEM_CONFIG;
  });

  // Audit Logs
  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>(() => {
    const saved = localStorage.getItem('marketlens_audit_logs');
    return saved ? JSON.parse(saved) : INITIAL_AUDIT_LOGS;
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('marketlens_holdings', JSON.stringify(holdings));
  }, [holdings]);

  useEffect(() => {
    localStorage.setItem('marketlens_watchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  useEffect(() => {
    localStorage.setItem('marketlens_alerts', JSON.stringify(alerts));
  }, [alerts]);

  useEffect(() => {
    localStorage.setItem('marketlens_triggered_alerts', JSON.stringify(triggeredAlerts));
  }, [triggeredAlerts]);

  useEffect(() => {
    localStorage.setItem('marketlens_dq_issues', JSON.stringify(dataQualityIssues));
  }, [dataQualityIssues]);

  useEffect(() => {
    localStorage.setItem('marketlens_import_batches', JSON.stringify(importBatches));
  }, [importBatches]);

  useEffect(() => {
    localStorage.setItem('marketlens_api_keys', JSON.stringify(apiKeys));
  }, [apiKeys]);

  useEffect(() => {
    localStorage.setItem('marketlens_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('marketlens_sys_config', JSON.stringify(systemConfig));
  }, [systemConfig]);

  useEffect(() => {
    localStorage.setItem('marketlens_audit_logs', JSON.stringify(auditLogs));
  }, [auditLogs]);

  // Recalculate Portfolio summary
  const portfolioSummary: PortfolioSummary = React.useMemo(() => {
    const totalInvestedValue = holdings.reduce((sum, h) => sum + h.shares * h.currentPrice, 0);
    const cash = 5200.00;
    const totalVal = totalInvestedValue + cash;
    const totalCost = holdings.reduce((sum, h) => sum + h.shares * h.avgCost, 0);
    const totalGain = totalInvestedValue - totalCost;
    const totalGainPct = totalCost > 0 ? (totalGain / totalCost) * 100 : 0;
    const dayGain = holdings.reduce((sum, h) => sum + (h.dayGain || 0), 0);
    const dayGainPct = totalInvestedValue > 0 ? (dayGain / totalInvestedValue) * 100 : 0;

    return {
      totalValue: Math.round(totalVal * 100) / 100,
      dayChange: Math.round(dayGain * 100) / 100,
      dayChangePercent: Math.round(dayGainPct * 100) / 100,
      totalReturn: Math.round(totalGain * 100) / 100,
      totalReturnPercent: Math.round(totalGainPct * 100) / 100,
      cashBalance: cash,
      holdingsCount: holdings.length,
    };
  }, [holdings]);

  const addHolding = (item: Omit<Holding, 'id' | 'marketValue' | 'totalGain' | 'totalGainPercent' | 'dayGain' | 'dayGainPercent' | 'allocation'>) => {
    const marketVal = item.shares * item.currentPrice;
    const cost = item.shares * item.avgCost;
    const gain = marketVal - cost;
    const gainPct = (gain / cost) * 100;
    const dayG = marketVal * 0.015; // sample day gain
    const dayGPct = 1.5;

    const newHolding: Holding = {
      ...item,
      id: `h-${Date.now()}`,
      marketValue: Math.round(marketVal * 100) / 100,
      totalGain: Math.round(gain * 100) / 100,
      totalGainPercent: Math.round(gainPct * 100) / 100,
      dayGain: Math.round(dayG * 100) / 100,
      dayGainPercent: dayGPct,
      allocation: 10,
    };

    setHoldings(prev => [newHolding, ...prev]);
  };

  const editHolding = (id: string, shares: number, avgCost: number) => {
    setHoldings(prev =>
      prev.map(h => {
        if (h.id === id) {
          const marketValue = shares * h.currentPrice;
          const cost = shares * avgCost;
          const totalGain = marketValue - cost;
          const totalGainPercent = cost > 0 ? (totalGain / cost) * 100 : 0;
          return {
            ...h,
            shares,
            avgCost,
            marketValue: Math.round(marketValue * 100) / 100,
            totalGain: Math.round(totalGain * 100) / 100,
            totalGainPercent: Math.round(totalGainPercent * 100) / 100,
          };
        }
        return h;
      })
    );
  };

  const removeHolding = (id: string) => {
    setHoldings(prev => prev.filter(h => h.id !== id));
  };

  const toggleWatchlist = (symbol: string) => {
    setWatchlist(prev => {
      const exists = prev.find(item => item.symbol === symbol);
      if (exists) {
        return prev.filter(item => item.symbol !== symbol);
      } else {
        return [
          ...prev,
          {
            symbol,
            name: `${symbol} Corp`,
            price: 150.00,
            change: 1.50,
            changePercent: 1.01,
            momentum: 'Positive',
            owned: holdings.some(h => h.symbol === symbol),
            alertStatus: 'No Alert',
            sparkline: [148, 149, 150, 149.5, 150],
          },
        ];
      }
    });
  };

  const createAlert = (alertData: Omit<AlertItem, 'id' | 'createdDate'>) => {
    const newAlert: AlertItem = {
      ...alertData,
      id: `alt-${Date.now()}`,
      createdDate: new Date().toISOString().split('T')[0],
    };
    setAlerts(prev => [newAlert, ...prev]);
  };

  const toggleAlertStatus = (id: string) => {
    setAlerts(prev =>
      prev.map(a => (a.id === id ? { ...a, status: a.status === 'Active' ? 'Disabled' : 'Active' } : a))
    );
  };

  const deleteAlert = (id: string) => {
    setAlerts(prev => prev.filter(a => a.id !== id));
  };

  const dismissTriggeredAlert = (id: string) => {
    setTriggeredAlerts(prev => prev.filter(a => a.id !== id));
  };

  const resolveQualityIssue = (id: string, correctedValue: string) => {
    setDataQualityIssues(prev =>
      prev.map(issue => {
        if (issue.id === id) {
          return {
            ...issue,
            status: 'Resolved',
            resolvedAt: 'Just now',
            resolvedBy: 'Data Team',
            correctionApplied: correctedValue,
            rawRecord: {
              ...issue.rawRecord,
              [issue.field]: correctedValue,
            },
          };
        }
        return issue;
      })
    );
  };

  const ignoreQualityIssue = (id: string) => {
    setDataQualityIssues(prev => prev.filter(i => i.id !== id));
  };

  const removeQualityRecord = (id: string) => {
    setDataQualityIssues(prev => prev.filter(i => i.id !== id));
  };

  const reprocessResolvedIssues = () => {
    setDataQualityIssues(prev => prev.filter(i => i.status !== 'Resolved'));
  };

  const addImportBatch = (batch: ImportBatch) => {
    setImportBatches(prev => [batch, ...prev]);
  };

  const generateApiKey = (name: string, environment: string): APIKeyItem => {
    const randomHex = Array.from({ length: 32 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
    const fullKey = `ml_${environment.toLowerCase()}_${randomHex}`;
    const newKey: APIKeyItem = {
      id: `key-${Date.now()}`,
      name,
      fullKey,
      maskedKey: `ml_${environment.toLowerCase()}_••••••••••••••••••••••••••••••••`,
      environment,
      tier: 'Customer Read & Stream Tier',
      status: 'Active',
      createdDate: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
      lastUsed: 'Just now',
    };
    setApiKeys(prev => [newKey, ...prev]);
    return newKey;
  };

  const revokeApiKey = (id: string) => {
    setApiKeys(prev =>
      prev.map(k => (k.id === id ? { ...k, status: 'Revoked' } : k))
    );
  };

  const createUser = (userData: Omit<User, 'id' | 'createdAt'>) => {
    const newUser: User = {
      ...userData,
      id: `user-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
      lastLogin: 'Never',
    };
    setUsers(prev => [newUser, ...prev]);
  };

  const updateUser = (id: string, updates: Partial<User>) => {
    setUsers(prev => prev.map(u => (u.id === id ? { ...u, ...updates } : u)));
  };

  const toggleUserStatus = (id: string) => {
    setUsers(prev =>
      prev.map(u => (u.id === id ? { ...u, status: u.status === 'Active' ? 'Inactive' : 'Active' } : u))
    );
  };

  const updateSystemConfig = (updates: Partial<SystemConfig>) => {
    setSystemConfig(prev => ({ ...prev, ...updates }));
  };

  const addAuditLog = (log: Omit<AuditLogItem, 'id' | 'timestamp'>) => {
    const newLog: AuditLogItem = {
      ...log,
      id: `aud-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  return (
    <MarketDataContext.Provider
      value={{
        holdings,
        portfolioSummary,
        addHolding,
        editHolding,
        removeHolding,
        watchlist,
        toggleWatchlist,
        alerts,
        createAlert,
        toggleAlertStatus,
        deleteAlert,
        triggeredAlerts,
        dismissTriggeredAlert,
        dataQualityIssues,
        resolveQualityIssue,
        ignoreQualityIssue,
        removeQualityRecord,
        reprocessResolvedIssues,
        importBatches,
        addImportBatch,
        apiKeys,
        generateApiKey,
        revokeApiKey,
        users,
        createUser,
        updateUser,
        toggleUserStatus,
        systemConfig,
        updateSystemConfig,
        auditLogs,
        addAuditLog,
      }}
    >
      {children}
    </MarketDataContext.Provider>
  );
};

export const useMarketData = () => {
  const context = useContext(MarketDataContext);
  if (!context) {
    throw new Error('useMarketData must be used within a MarketDataProvider');
  }
  return context;
};
