import { APIKeyItem, APIEndpointDoc } from '@/types';

export const INITIAL_API_KEYS: APIKeyItem[] = [
  {
    id: 'key-1',
    name: 'Live Production Token',
    fullKey: 'ml_live_8f9a2b7c4d1e0f3a5b6c7d8e9f0a1b2c',
    maskedKey: 'ml_live_••••••••••••••••••••••••••••••••',
    environment: 'Production',
    tier: 'Customer Read & Stream Tier',
    status: 'Active',
    createdDate: '18 October 2026',
    lastUsed: '4 minutes ago',
  },
];

export const MOCK_API_ENDPOINTS: APIEndpointDoc[] = [
  {
    id: 'ep-1',
    method: 'GET',
    path: '/api/v1/markets/{symbol}',
    category: 'Market Data',
    subCategory: 'Core',
    description: 'Retrieve real-time and end-of-day market information for a selected ticker symbol.',
    auth: 'Auth: API-Key Header',
    rateLimit: 'Rate Limit: 1,200 req/min',
    cacheControl: 'Cache-Control: max-age=1',
    pathParams: [
      {
        field: 'symbol',
        type: 'string',
        status: 'Required',
        description: 'The market symbol or ticker identifier (e.g. AAPL, MSFT, NVDA). Case-insensitive.',
      },
    ],
    queryParams: [
      {
        field: 'extended_hours',
        type: 'boolean',
        defaultVal: 'false',
        description: 'Include pre-market and post-market quote data where available from exchange feeds.',
      },
    ],
    exampleCurl: `curl -X GET "https://api.marketlens.example/v1/markets/AAPL" \\
  -H "X-API-Key: YOUR_API_KEY"`,
    exampleResponse: `{
  "symbol": "AAPL",
  "name": "Apple Inc.",
  "exchange": "NASDAQ",
  "price": 175.43,
  "change": 3.72,
  "changePercent": 2.17,
  "volume": 52300000,
  "timestamp": "2026-10-18T14:32:00Z",
  "status": "LIVE"
}`,
  },
  {
    id: 'ep-2',
    method: 'GET',
    path: '/api/v1/markets',
    category: 'Market Data',
    subCategory: 'Catalog',
    description: 'Retrieve active market catalog list of all instruments and equities currently indexed.',
    auth: 'Auth: API-Key Header',
    rateLimit: 'Rate Limit: 600 req/min',
    cacheControl: 'Cache-Control: max-age=60',
    pathParams: [],
    queryParams: [
      {
        field: 'limit',
        type: 'integer',
        defaultVal: '50',
        description: 'Maximum number of equity instruments to return per page (max 200).',
      },
      {
        field: 'sector',
        type: 'string',
        defaultVal: 'all',
        description: 'Filter instruments by economic sector (e.g. Technology, Healthcare).',
      },
    ],
    exampleCurl: `curl -X GET "https://api.marketlens.example/v1/markets?limit=10" \\
  -H "X-API-Key: YOUR_API_KEY"`,
    exampleResponse: `{
  "count": 10,
  "total": 5420,
  "data": [
    { "symbol": "AAPL", "name": "Apple Inc.", "price": 175.43 },
    { "symbol": "MSFT", "name": "Microsoft Corp.", "price": 415.16 }
  ]
}`,
  },
  {
    id: 'ep-3',
    method: 'GET',
    path: '/api/v1/markets/{symbol}/history',
    category: 'Historical Data',
    subCategory: 'Time Series',
    description: 'Retrieve historical OHLCV candles across configurable interval windows.',
    auth: 'Auth: API-Key Header',
    rateLimit: 'Rate Limit: 300 req/min',
    cacheControl: 'Cache-Control: max-age=300',
    pathParams: [
      {
        field: 'symbol',
        type: 'string',
        status: 'Required',
        description: 'Security ticker symbol.',
      },
    ],
    queryParams: [
      {
        field: 'interval',
        type: 'string',
        defaultVal: '1d',
        description: 'Candle timeframe: 1m, 5m, 1h, 1d, 1w.',
      },
      {
        field: 'range',
        type: 'string',
        defaultVal: '3m',
        description: 'Historical duration window: 1m, 3m, 6m, 1y, 5y.',
      },
    ],
    exampleCurl: `curl -X GET "https://api.marketlens.example/v1/markets/AAPL/history?interval=1d&range=3m" \\
  -H "X-API-Key: YOUR_API_KEY"`,
    exampleResponse: `{
  "symbol": "AAPL",
  "interval": "1d",
  "bars": [
    { "date": "2026-10-18", "open": 172.10, "high": 176.82, "low": 171.90, "close": 175.43, "volume": 52341200 }
  ]
}`,
  },
  {
    id: 'ep-4',
    method: 'GET',
    path: '/api/v1/analytics/{symbol}',
    category: 'Analytics',
    subCategory: 'Quant',
    description: 'Calculated technical momentum, RSI, moving averages, and 20-day volatility metrics.',
    auth: 'Auth: API-Key Header',
    rateLimit: 'Rate Limit: 600 req/min',
    cacheControl: 'Cache-Control: max-age=30',
    pathParams: [
      {
        field: 'symbol',
        type: 'string',
        status: 'Required',
        description: 'Security ticker symbol.',
      },
    ],
    queryParams: [],
    exampleCurl: `curl -X GET "https://api.marketlens.example/v1/analytics/NVDA" \\
  -H "X-API-Key: YOUR_API_KEY"`,
    exampleResponse: `{
  "symbol": "NVDA",
  "rsi14": 67.2,
  "macd": 3.45,
  "volatility20d": 28.4,
  "sma50": 820.40,
  "sma200": 680.10,
  "momentumScore": 88
}`,
  },
  {
    id: 'ep-5',
    method: 'GET',
    path: '/api/v1/news',
    category: 'Financial News',
    subCategory: 'Feed',
    description: 'Structured financial news wire feeds filtered by symbol or macro category.',
    auth: 'Auth: API-Key Header',
    rateLimit: 'Rate Limit: 600 req/min',
    cacheControl: 'Cache-Control: max-age=60',
    pathParams: [],
    queryParams: [
      {
        field: 'symbol',
        type: 'string',
        defaultVal: 'all',
        description: 'Optional ticker to filter tagged stories.',
      },
    ],
    exampleCurl: `curl -X GET "https://api.marketlens.example/v1/news?symbol=AAPL" \\
  -H "X-API-Key: YOUR_API_KEY"`,
    exampleResponse: `{
  "articles": [
    {
      "headline": "Apple reports stronger quarterly revenue",
      "source": "Reuters",
      "sentiment": "Positive",
      "timestamp": "2026-10-20T14:18:00Z"
    }
  ]
}`,
  },
];

export const MOCK_API_USAGE_STATS = {
  requestsThisMonth: 1284,
  monthlyLimit: 5000,
  remainingQuota: 3716,
  usageRatePercent: 25.7,
  dailyMean: 183.4,
  tierCapacity: 'Developer Plus',
  runwayForecast: '20+ Days',
  billingPeriodEnd: 'Oct 31, 2026',
  dailyVolume: [
    { day: 'Mon', count: 146 },
    { day: 'Tue', count: 173 },
    { day: 'Wed', count: 201 },
    { day: 'Thu', count: 188 },
    { day: 'Fri', count: 220 },
    { day: 'Sat', count: 172 },
    { day: 'Sun', count: 184, isLive: true },
  ],
  endpointUsage: [
    { endpoint: 'GET /markets/{symbol}', count: 481, percent: 37.5 },
    { endpoint: 'GET /markets', count: 320, percent: 24.9 },
    { endpoint: 'GET /markets/{symbol}/history', count: 214, percent: 16.7 },
    { endpoint: 'GET /analytics/{symbol}', count: 173, percent: 13.5 },
    { endpoint: 'GET /news', count: 96, percent: 7.5 },
  ],
  recentActivity: [
    {
      id: 'req-1',
      timestamp: '10:42:15 AM',
      endpoint: '/api/v1/markets/AAPL',
      method: 'GET',
      status: 200,
      statusText: '200 OK',
      latency: '38ms',
      clientIp: '198.51.100.24 (sdk-python/v2.1)',
    },
    {
      id: 'req-2',
      timestamp: '10:40:02 AM',
      endpoint: '/api/v1/news?symbol=AAPL',
      method: 'GET',
      status: 200,
      statusText: '200 OK',
      latency: '62ms',
      clientIp: '198.51.100.24 (sdk-python/v2.1)',
    },
    {
      id: 'req-3',
      timestamp: '10:31:44 AM',
      endpoint: '/api/v1/analytics/NVDA',
      method: 'GET',
      status: 200,
      statusText: '200 OK',
      latency: '114ms',
      clientIp: '192.0.2.140 (custom-worker/fin)',
    },
    {
      id: 'req-4',
      timestamp: '10:22:19 AM',
      endpoint: '/api/v1/markets/INVALID',
      method: 'GET',
      status: 404,
      statusText: '404 Not Found',
      latency: '22ms',
      clientIp: '198.51.100.24 (sdk-python/v2.1)',
    },
    {
      id: 'req-5',
      timestamp: '09:55:08 AM',
      endpoint: '/api/v1/markets/MSFT/history',
      method: 'GET',
      status: 200,
      statusText: '200 OK',
      latency: '89ms',
      clientIp: '198.51.100.24 (sdk-python/v2.1)',
    },
    {
      id: 'req-6',
      timestamp: '09:14:32 AM',
      endpoint: '/api/v1/markets',
      method: 'GET',
      status: 200,
      statusText: '200 OK',
      latency: '45ms',
      clientIp: '203.0.113.88 (node-fetch/v3.0)',
    },
  ],
};
