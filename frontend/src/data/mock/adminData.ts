export interface SystemConfig {
  providers: {
    twelveData: {
      apiKey: string;
      baseUrl: string;
      rateLimitPerMin: number;
      syncIntervalMinutes: number;
      cacheTtlSeconds: number;
      status: 'Connected' | 'Degraded' | 'Offline';
    };
    cseDataSource: {
      endpointUrl: string;
      authToken: string;
      pollingFrequencySeconds: number;
      status: 'Connected' | 'Degraded' | 'Offline';
    };
  };
  ingestion: {
    maxBatchSize: number;
    autoQuarantineErrors: boolean;
    anomalyZScoreThreshold: number;
    strictSchemaValidation: boolean;
  };
  security: {
    mfaEnforced: boolean;
    sessionTimeoutMinutes: number;
    maxLoginAttempts: number;
    auditLogRetentionDays: number;
    maintenanceMode: boolean;
  };
  notifications: {
    webhookUrl: string;
    emailAlertsEnabled: boolean;
    slackAlertsEnabled: boolean;
  };
}

export const INITIAL_SYSTEM_CONFIG: SystemConfig = {
  providers: {
    twelveData: {
      apiKey: 'td_live_99812480a719c8f0',
      baseUrl: 'https://api.twelvedata.com',
      rateLimitPerMin: 800,
      syncIntervalMinutes: 5,
      cacheTtlSeconds: 120,
      status: 'Connected',
    },
    cseDataSource: {
      endpointUrl: 'https://stream.cse.market.internal/v2/feed',
      authToken: 'cse_sec_token_948a',
      pollingFrequencySeconds: 15,
      status: 'Connected',
    },
  },
  ingestion: {
    maxBatchSize: 25000,
    autoQuarantineErrors: true,
    anomalyZScoreThreshold: 3.5,
    strictSchemaValidation: true,
  },
  security: {
    mfaEnforced: true,
    sessionTimeoutMinutes: 30,
    maxLoginAttempts: 5,
    auditLogRetentionDays: 90,
    maintenanceMode: false,
  },
  notifications: {
    webhookUrl: 'https://hooks.slack.com/services/T00/B00/XXXXX',
    emailAlertsEnabled: true,
    slackAlertsEnabled: true,
  },
};

export interface AuditLogItem {
  id: string;
  timestamp: string;
  actor: string;
  role: string;
  action: string;
  resource: string;
  ipAddress: string;
  status: 'SUCCESS' | 'WARNING' | 'FAILURE';
}

export const INITIAL_AUDIT_LOGS: AuditLogItem[] = [
  {
    id: 'aud-101',
    timestamp: '2026-10-20 14:15:22',
    actor: 'Sarah Fernando',
    role: 'ROLE_ADMIN',
    action: 'UPDATE_PROVIDER_CONFIG',
    resource: 'Twelve Data API Rate Limit (800 req/min)',
    ipAddress: '192.168.1.104',
    status: 'SUCCESS',
  },
  {
    id: 'aud-102',
    timestamp: '2026-10-20 13:42:10',
    actor: 'Nimal Perera',
    role: 'ROLE_DATA_MANAGER',
    action: 'RESOLVE_DATA_QUALITY_ISSUE',
    resource: 'Record DQ-1037 (AAPL Volume)',
    ipAddress: '192.168.1.112',
    status: 'SUCCESS',
  },
  {
    id: 'aud-103',
    timestamp: '2026-10-20 12:10:45',
    actor: 'Alex Silva',
    role: 'ROLE_ANALYST',
    action: 'GENERATE_API_KEY',
    resource: 'Live Production Token #4092-LENS',
    ipAddress: '198.51.100.24',
    status: 'SUCCESS',
  },
  {
    id: 'aud-104',
    timestamp: '2026-10-20 11:05:18',
    actor: 'Unknown',
    role: 'GUEST',
    action: 'FAILED_LOGIN_ATTEMPT',
    resource: 'Account: marcus.brody@marketlens.io',
    ipAddress: '45.33.32.156',
    status: 'FAILURE',
  },
  {
    id: 'aud-105',
    timestamp: '2026-10-20 10:22:30',
    actor: 'Nimal Perera',
    role: 'ROLE_DATA_MANAGER',
    action: 'DATASET_INGEST_TRIGGER',
    resource: 'Batch B-1043 (12,540 records)',
    ipAddress: '192.168.1.112',
    status: 'WARNING',
  },
];
