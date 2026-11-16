import { NewsArticle } from '@/types';

export const MOCK_NEWS_ARTICLES: NewsArticle[] = [
  {
    id: 'news-1',
    source: 'BLOOMBERG',
    timeAgo: '12m ago',
    timestamp: '2026-10-20T14:18:00Z',
    impact: 'High Impact',
    sentiment: 'Bullish',
    sentimentPercent: 88,
    category: 'Corporate Earnings',
    headline: 'Nvidia Expands Next-Gen Blackwell Architecture Data Center Partnerships Across Hyperscalers',
    summary: 'Enterprise demand exceeds initial shipment timelines as cloud providers accelerate capex allocations. Secondary suppliers report accelerating supply pipeline clearance with zero inventory surplus.',
    tickers: [
      { symbol: '$NVDA', change: 3.4 },
      { symbol: '$MSFT', change: 1.1 },
    ],
    entityMatchScore: 98,
  },
  {
    id: 'news-2',
    source: 'REUTERS',
    timeAgo: '34m ago',
    timestamp: '2026-10-20T13:56:00Z',
    impact: 'Macro & Policy',
    sentiment: 'Neutral',
    sentimentPercent: 52,
    category: 'Macro & Fed',
    headline: 'Federal Reserve Officials Reiterate Data-Dependent Stance Ahead of Core PCE Benchmark Release',
    summary: 'Comments from regional Fed governors emphasize balanced risks between employment resilience and lingering service-sector inflation. Treasury yields stabilized with two-year notes steady at 4.62%.',
    tickers: [
      { symbol: '$SPY', change: 0.2 },
      { symbol: '$TLT', change: -0.4 },
    ],
    entityMatchScore: 94,
  },
  {
    id: 'news-3',
    source: 'WALL STREET JOURNAL',
    timeAgo: '1h ago',
    timestamp: '2026-10-20T13:30:00Z',
    impact: 'High Impact',
    sentiment: 'Bearish',
    sentimentPercent: 74,
    category: 'Sector Trends',
    headline: 'Automotive EV Price Pressures Compound as European Regulators Scrutinize Import Subsidies',
    summary: 'Margin compressions across legacy and pure-play EV manufacturers trigger target reductions among tier-one investment banks. Delivery guidance remains conservative heading into quarterly closing.',
    tickers: [
      { symbol: '$TSLA', change: -2.8 },
      { symbol: '$RIVN', change: -3.9 },
    ],
    entityMatchScore: 96,
  },
  {
    id: 'news-4',
    source: 'FINANCIAL TIMES',
    timeAgo: '2h ago',
    timestamp: '2026-10-20T12:30:00Z',
    impact: 'Corporate Hardware',
    sentiment: 'Bullish',
    sentimentPercent: 72,
    category: 'Corporate Earnings',
    headline: 'Apple Supply Chain Checks Signal Accelerated Silicon Integration Across Enterprise Device Tier',
    summary: 'Contract fabrication yields demonstrate enhanced efficiency with on-device AI integration receiving high early enterprise adoption feedback. Gross margins projected steady through upcoming fiscal cycle.',
    tickers: [
      { symbol: '$AAPL', change: 1.8 },
      { symbol: '$TSM', change: 2.1 },
    ],
    entityMatchScore: 91,
  },
  {
    id: 'news-5',
    source: 'REUTERS',
    timeAgo: '3h ago',
    timestamp: '2026-10-20T11:30:00Z',
    impact: 'High Impact',
    sentiment: 'Bullish',
    sentimentPercent: 82,
    category: 'Corporate Earnings',
    headline: 'Apple reports stronger-than-expected quarterly results driven by services acceleration',
    summary: 'Revenue exceeded institutional estimates with expansion across international subscriptions and strong overseas enterprise client demand.',
    tickers: [
      { symbol: '$AAPL', change: 2.17 },
    ],
    entityMatchScore: 97,
  },
];

export const SECTOR_SENTIMENTS = [
  { sector: 'Technology', bullishPercent: 76, status: 'Bullish' },
  { sector: 'Financials', bullishPercent: 58, status: 'Bullish' },
  { sector: 'Energy', bullishPercent: 41, status: 'Bearish' },
  { sector: 'Healthcare', bullishPercent: 63, status: 'Bullish' },
];

export const TRENDING_TICKERS = [
  { symbol: '$NVDA', name: 'Nvidia Corp', volumeChange: '+184% vol', sentiment: 'Bullish' },
  { symbol: '$AAPL', name: 'Apple Inc', volumeChange: '+92% vol', sentiment: 'Bullish' },
  { symbol: '$TSLA', name: 'Tesla Inc', volumeChange: '+64% vol', sentiment: 'Bearish' },
  { symbol: '$MSFT', name: 'Microsoft', volumeChange: '+41% vol', sentiment: 'Neutral' },
];
