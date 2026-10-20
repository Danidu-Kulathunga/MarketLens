export interface AIAnalysisReport {
  symbol: string;
  period: string;
  executiveSummary: string;
  technicalEvidence: {
    momentum: string;
    momentumNote: string;
    ma20: string;
    ma20Note: string;
    ma50: string;
    ma50Note: string;
    volatility: string;
    volatilityNote: string;
  };
  sentimentStats: {
    positive: number;
    neutral: number;
    negative: number;
    overall: string;
    analyzedCount: number;
  };
  newsArticles: {
    headline: string;
    source: string;
    timeAgo: string;
    sentiment: 'Positive' | 'Neutral' | 'Negative';
  }[];
  aiInterpretation: string;
  riskFactors: string[];
  telemetryMatrix: {
    metric: string;
    observedValue: string;
  }[];
  relatedSources: {
    title: string;
    tag: string;
    date: string;
  }[];
}

export const MOCK_AI_REPORTS: Record<string, AIAnalysisReport> = {
  AAPL: {
    symbol: 'AAPL',
    period: '3-Month Analysis',
    executiveSummary: 'AAPL currently shows positive short-term momentum, supported by recent price movement, improving technical conditions, and moderately positive news sentiment.',
    technicalEvidence: {
      momentum: '+4.21%',
      momentumNote: 'Positive (10D window)',
      ma20: '$172.40',
      ma20Note: 'Price above (+1.7%)',
      ma50: '$168.90',
      ma50Note: 'Price above (+3.8%)',
      volatility: '18.4%',
      volatilityNote: 'Moderate (30D ann.)',
    },
    sentimentStats: {
      positive: 60,
      neutral: 30,
      negative: 10,
      overall: 'Moderately Positive',
      analyzedCount: 3,
    },
    newsArticles: [
      {
        headline: 'Apple reports stronger quarterly revenue',
        source: 'Reuters',
        timeAgo: '18 min ago',
        sentiment: 'Positive',
      },
      {
        headline: 'Services growth supports results',
        source: 'Bloomberg',
        timeAgo: '42 min ago',
        sentiment: 'Positive',
      },
    ],
    aiInterpretation: 'The combination of positive momentum, price strength above key moving averages, and supportive earnings-related news may contribute to positive short-term market sentiment.',
    riskFactors: [
      'Recent volatility has increased slightly across technology holdings.',
      'Technology-sector concentration remains significant in benchmark exposure.',
      'Macroeconomic FOMC announcements may affect short-term market discount rates.',
      'News sentiment may change rapidly upon regulatory developments.',
    ],
    telemetryMatrix: [
      { metric: 'Price History', observedValue: '3 Months (Trailing 63 trading days)' },
      { metric: 'Momentum', observedValue: '+4.21% (10-day window)' },
      { metric: 'MA20', observedValue: '$172.40' },
      { metric: 'MA50', observedValue: '$168.90' },
      { metric: 'Volatility', observedValue: '18.4%' },
      { metric: 'News Sentiment', observedValue: 'Moderately Positive (60% positive ratio)' },
    ],
    relatedSources: [
      {
        title: 'Reuters: "Apple reports stronger-than-expected quarterly earnings..."',
        tag: 'Filing verification tag #RT-49129',
        date: '18 Oct 2026',
      },
      {
        title: 'Bloomberg: "Apple services growth continues to outperform hardware segment..."',
        tag: 'Wire record #BBG-88021',
        date: '17 Oct 2026',
      },
    ],
  },
  NVDA: {
    symbol: 'NVDA',
    period: '3-Month Analysis',
    executiveSummary: 'NVDA exhibits dominant institutional accumulation and strong upside momentum, supported by hyperscaler datacenter orders and positive chip supply-chain dynamics.',
    technicalEvidence: {
      momentum: '+8.65%',
      momentumNote: 'Strong Bullish (10D window)',
      ma20: '$840.10',
      ma20Note: 'Price above (+4.2%)',
      ma50: '$820.40',
      ma50Note: 'Price above (+6.7%)',
      volatility: '28.4%',
      volatilityNote: 'Elevated (30D ann.)',
    },
    sentimentStats: {
      positive: 78,
      neutral: 16,
      negative: 6,
      overall: 'Highly Bullish',
      analyzedCount: 5,
    },
    newsArticles: [
      {
        headline: 'Nvidia Expands Next-Gen Blackwell Architecture Data Center Partnerships',
        source: 'Bloomberg',
        timeAgo: '12m ago',
        sentiment: 'Positive',
      },
      {
        headline: 'Hyperscaler capex projections revised upwards for H2 AI infrastructure',
        source: 'Reuters',
        timeAgo: '1h ago',
        sentiment: 'Positive',
      },
    ],
    aiInterpretation: 'Sustained Blackwell architecture demand and enterprise order backlogs provide robust structural tailwinds, though high valuation multiples suggest vigilance around supply delivery milestones.',
    riskFactors: [
      'High multiple sensitivity to any supply packaging bottlenecks.',
      'Geopolitical export control adjustments could impact non-US delivery runs.',
      'Elevated historical beta and implied options volatility.',
    ],
    telemetryMatrix: [
      { metric: 'Price History', observedValue: '3 Months (Trailing 63 trading days)' },
      { metric: 'Momentum', observedValue: '+8.65% (10-day window)' },
      { metric: 'MA20', observedValue: '$840.10' },
      { metric: 'MA50', observedValue: '$820.40' },
      { metric: 'Volatility', observedValue: '28.4%' },
      { metric: 'News Sentiment', observedValue: 'Highly Bullish (78% positive ratio)' },
    ],
    relatedSources: [
      {
        title: 'Bloomberg: "Nvidia Expands Next-Gen Blackwell Architecture Partnerships..."',
        tag: 'Filing verification tag #BBG-9921',
        date: '20 Oct 2026',
      },
    ],
  },
  PORTFOLIO: {
    symbol: 'PORTFOLIO',
    period: 'Portfolio Risk Analysis',
    executiveSummary: 'Current portfolio of 5 assets ($48,250) demonstrates solid returns (+14.01% total gain) with high concentration risk in Mega-Cap Technology (68.1% allocation).',
    technicalEvidence: {
      momentum: '+5.12%',
      momentumNote: 'Composite Weighted Return',
      ma20: '$46,800',
      ma20Note: 'Portfolio Value above MA20',
      ma50: '$44,500',
      ma50Note: 'Portfolio Value above MA50',
      volatility: '21.2%',
      volatilityNote: 'Tech-Weighted Volatility',
    },
    sentimentStats: {
      positive: 65,
      neutral: 25,
      negative: 10,
      overall: 'Positive',
      analyzedCount: 8,
    },
    newsArticles: [
      {
        headline: 'Big Tech earnings season kicks off with strong guidance',
        source: 'Wall Street Journal',
        timeAgo: '2h ago',
        sentiment: 'Positive',
      },
    ],
    aiInterpretation: 'While technology momentum drives high capital appreciation, introducing defensive exposure (Healthcare, Consumer Staples) or rebalancing into cash reserves would mitigate sector drawdown risk.',
    riskFactors: [
      'Tech sector concentration exceeds recommended benchmark bounds (>50%).',
      'Correlation between NVDA, MSFT and AAPL reaches 0.74 during market pullbacks.',
    ],
    telemetryMatrix: [
      { metric: 'Portfolio Net Worth', observedValue: '$48,250.00' },
      { metric: 'Active Holdings', observedValue: '5 Equities' },
      { metric: 'Weighted Beta', observedValue: '1.24 vs SPX' },
      { metric: 'Cash Drag', observedValue: '10.7% Available Capital' },
    ],
    relatedSources: [
      {
        title: 'MarketLens Portfolio Telemetry Engine',
        tag: 'Internal Aggregation #PF-001',
        date: '20 Oct 2026',
      },
    ],
  },
};
