export type UserRole = 'ROLE_ANALYST' | 'ROLE_DATA_MANAGER' | 'ROLE_ADMIN';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  roleLabel: string;
  initials: string;
  title: string;
  status: 'Active' | 'Inactive';
  apiAccess: boolean;
  avatarBg?: string;
  createdAt: string;
  lastLogin?: string;
}

export interface MarketIndex {
  id: string;
  symbol: string;
  name: string;
  type: string;
  category: string;
  value: number;
  change: number;
  changePercent: number;
  prevClose: number;
  high: number;
  low: number;
}

export interface StockSummary {
  symbol: string;
  name: string;
  sector: string;
  industry: string;
  exchange: string;
  price: number;
  change: number;
  changePercent: number;
  volume: string;
  avgVolume: string;
  marketCap: string;
  shares: string;
  rank: string;
  dayLow: number;
  dayHigh: number;
  week52Low: number;
  week52High: number;
  peRatio: number;
  forwardPe: number;
  pegRatio: number;
  fcfYield: string;
  momentumScore: number;
  rsi14: number;
  macd: number;
  macdSignal: number;
  volatility20d: number;
  sma50: number;
  sma200: number;
  ownedInPortfolio?: boolean;
  inWatchlist?: boolean;
  priceHistory: { time: string; price: number; volume: number; sma50?: number; sma200?: number }[];
}

export interface Holding {
  id: string;
  symbol: string;
  companyName: string;
  shares: number;
  avgCost: number;
  currentPrice: number;
  marketValue: number;
  totalGain: number;
  totalGainPercent: number;
  dayGain: number;
  dayGainPercent: number;
  allocation: number;
  purchaseDate: string;
  sector: string;
}

export interface PortfolioSummary {
  totalValue: number;
  dayChange: number;
  dayChangePercent: number;
  totalReturn: number;
  totalReturnPercent: number;
  cashBalance: number;
  holdingsCount: number;
}

export interface WatchlistItem {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  momentum: 'Positive' | 'Neutral' | 'Negative';
  owned: boolean;
  alertStatus: string;
  alertCondition?: string;
  sparkline: number[];
}

export interface AlertItem {
  id: string;
  symbol: string;
  companyName: string;
  type: 'Price Threshold' | 'Volatility Threshold' | 'Momentum Change';
  condition: string;
  targetValue: string;
  currentValue: string;
  status: 'Active' | 'Disabled';
  channel: string;
  createdDate: string;
  targetDistance?: string;
}

export interface TriggeredAlert {
  id: string;
  symbol: string;
  title: string;
  description: string;
  time: string;
  date: string;
  executionPrice?: string;
  previousClose?: string;
}

export interface NewsArticle {
  id: string;
  source: string;
  timeAgo: string;
  timestamp: string;
  impact?: 'High Impact' | 'Macro & Policy' | 'Corporate Hardware';
  sentiment: 'Bullish' | 'Neutral' | 'Bearish';
  sentimentPercent: number;
  headline: string;
  summary: string;
  tickers: { symbol: string; change: number }[];
  entityMatchScore: number;
  category: 'Corporate Earnings' | 'Macro & Fed' | 'Sector Trends' | 'All News';
}

export interface DataSourceItem {
  id: string;
  source: string;
  type: 'API' | 'CSV / JSON';
  status: 'Active' | 'Available' | 'Degraded';
  lastUpdated: string;
  records: string | number;
  hasAlert?: boolean;
  alertTitle?: string;
  alertMessage?: string;
}

export interface ImportBatch {
  id: string;
  source: string;
  started: string;
  totalRecords: number;
  validRecords: number;
  failedRecords: number;
  status: 'Completed' | 'Warning' | 'Failed';
  timestamp: string;
}

export interface PipelineTask {
  id: string;
  name: string;
  status: 'Processing' | 'Completed' | 'Waiting';
  progress?: number;
  eta?: string;
  lastCompleted?: string;
  detail?: string;
}

export interface DataQualityIssue {
  id: string;
  symbol: string;
  companyName: string;
  batch: string;
  field: string;
  problem: string;
  severity: 'High' | 'Medium' | 'Low';
  status: 'Open' | 'Quarantined' | 'Resolved';
  detected: string;
  targetTable: string;
  fixSuggestion?: string;
  rawRecord: {
    symbol: string;
    date: string;
    open: number;
    high: number;
    low: number;
    close: number | null | string;
    volume: number;
    rowNumber?: number;
  };
  resolvedAt?: string;
  resolvedBy?: string;
  correctionApplied?: string;
}

export interface APIKeyItem {
  id: string;
  name: string;
  maskedKey: string;
  fullKey: string;
  environment: string;
  tier: string;
  status: 'Active' | 'Revoked';
  createdDate: string;
  lastUsed: string;
}

export interface APIEndpointDoc {
  id: string;
  method: 'GET' | 'POST';
  path: string;
  category: 'Market Data' | 'Historical Data' | 'Analytics' | 'Financial News';
  subCategory?: string;
  description: string;
  auth: string;
  rateLimit: string;
  cacheControl: string;
  pathParams?: { field: string; type: string; status: string; description: string }[];
  queryParams?: { field: string; type: string; defaultVal: string; description: string }[];
  exampleCurl: string;
  exampleResponse: string;
}
