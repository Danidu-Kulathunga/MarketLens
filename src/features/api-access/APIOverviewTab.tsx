import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Copy,
  Check,
  Code2,
  TrendingUp,
  History,
  LineChart,
  Newspaper,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { useMarketData } from '@/context/MarketDataContext';

export const APIOverviewTab: React.FC = () => {
  const navigate = useNavigate();
  const { apiKeys } = useMarketData();
  const [copiedSnippet, setCopiedSnippet] = useState(false);

  const sampleCurl = `curl -s -X GET \\
  "https://api.marketlens.io/v1/markets/AAPL" \\
  -H "Accept: application/json" \\
  -H "X-API-Key: ml_live_8f9a2b7c4d1e0f3a5b6c7d8e9f0a1b2c"`;

  const sampleJson = `{
  "symbol": "AAPL",
  "price": 189.45,
  "change_pct": +1.24%,
  "timestamp": 1716982400
}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(sampleCurl);
    setCopiedSnippet(true);
    setTimeout(() => setCopiedSnippet(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* API Status */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-xs">
          <div className="flex items-center justify-between text-xs text-gray-400 font-semibold uppercase tracking-wider">
            <span>API STATUS</span>
            <span className="text-gray-400 font-mono text-[10px]">Global Edge</span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              • Available
            </span>
          </div>
          <p className="mt-3 text-xs text-gray-500 pt-2 border-t border-gray-100">
            Latency: <strong className="text-gray-900 font-mono">24ms</strong> avg
          </p>
        </div>

        {/* API Key */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-xs">
          <div className="flex items-center justify-between text-xs text-gray-400 font-semibold uppercase tracking-wider">
            <span>API KEY</span>
            <span className="text-gray-400 text-[10px]">Live Key 01</span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              • Active
            </span>
          </div>
          <p className="mt-3 text-xs text-gray-500 pt-2 border-t border-gray-100">
            Created: <strong className="text-gray-900 font-mono">2024-11-12</strong>
          </p>
        </div>

        {/* Requests This Month */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-xs">
          <div className="flex items-center justify-between text-xs text-gray-400 font-semibold uppercase tracking-wider">
            <span>REQUESTS THIS MONTH</span>
            <TrendingUp className="w-3.5 h-3.5 text-gray-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-gray-900 tracking-tight font-mono">
              1,284
            </span>
          </div>
          <p className="mt-3 text-xs text-gray-500 pt-2 border-t border-gray-100">
            Daily Run Rate: <strong className="text-gray-900 font-mono">~42 req/day</strong>
          </p>
        </div>

        {/* Remaining Quota */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-xs">
          <div className="flex items-center justify-between text-xs text-gray-400 font-semibold uppercase tracking-wider">
            <span>REMAINING QUOTA</span>
            <span className="text-gray-400 text-[10px]">of 5,000 req</span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-gray-900 tracking-tight font-mono">
              3,716
            </span>
          </div>
          <div className="mt-3 flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-100">
            <span>25.7% consumed</span>
            <span>Resets in 14 days</span>
          </div>
        </div>
      </div>

      {/* Middle Row: Getting Started (Left) + Quick Request Example (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Getting Started Guide */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="text-base font-bold text-gray-900">Getting Started</h3>
              <span className="text-xs font-mono text-gray-400">REST / HTTPS</span>
            </div>
            <p className="text-xs text-gray-500 mt-1 mb-5">
              Integrate MarketLens financial feeds in four structured steps.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-black text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                  1
                </span>
                <div>
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-gray-900">
                      Generate or copy your API key
                    </h4>
                    <span className="text-[10px] text-emerald-600 font-semibold">Ready</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Access your production secret key from your secure account vault. Never expose secret keys in client-side bundles.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-black text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                  2
                </span>
                <div>
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-gray-900">
                      Send key with HTTP Header
                    </h4>
                    <span className="text-[10px] font-mono text-gray-400">X-API-Key</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Provide your active token in the request headers. Query parameter authentication is rejected for security compliance.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-black text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                  3
                </span>
                <div>
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-gray-900">
                      Call a supported MarketLens endpoint
                    </h4>
                    <span className="text-[10px] text-emerald-600 font-mono">200 OK JSON</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Request tick-level prices, daily historical bars, moving-averages, or parsed analyst intelligence payloads.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-black text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                  4
                </span>
                <div>
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-gray-900">
                      Monitor your monthly quota
                    </h4>
                    <span className="text-[10px] text-gray-500 font-mono">5,000 / mo</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Inspect the X-RateLimit-Remaining response headers or inspect the usage telemetry panel.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-5 border-t border-gray-100 flex items-center justify-between mt-6">
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate('/api-access/key')}
                className="px-3.5 py-1.5 bg-[#111827] text-white rounded-lg text-xs font-semibold hover:bg-black"
              >
                View API Key
              </button>
              <button
                onClick={() => navigate('/api-access/endpoints')}
                className="px-3.5 py-1.5 border border-gray-200 bg-white text-gray-800 rounded-lg text-xs font-semibold hover:bg-gray-50"
              >
                View Endpoints
              </button>
            </div>
            <span className="text-[11px] text-gray-400">SDKs for Python, Node.js & Go</span>
          </div>
        </div>

        {/* Quick Request Example */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <Code2 className="w-4 h-4 text-gray-500" />
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
                  QUICK REQUEST EXAMPLE
                </h3>
              </div>
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                cURL
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-1 mb-4">
              Execute this test query from any terminal to verify authentication and fetch real-time AAPL quote metrics.
            </p>

            {/* Terminal snippet box */}
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 font-mono text-xs text-gray-800 space-y-2 relative">
              <div className="flex items-center justify-between text-[11px] text-gray-400 border-b border-gray-200 pb-2 mb-2">
                <span>HTTPS Request</span>
                <span>curl -X GET</span>
              </div>
              <pre className="text-xs leading-relaxed text-gray-900 overflow-x-auto whitespace-pre-wrap">
                {sampleCurl}
              </pre>
              <div className="pt-2 text-[11px] text-emerald-600 flex items-center justify-between border-t border-gray-200 mt-2">
                <span>Expected response: 200 OK</span>
                <span className="text-gray-400 font-mono text-[10px]">gzip, br</span>
              </div>
            </div>

            {/* Response Preview Box */}
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 font-mono text-xs text-gray-800 mt-3">
              <div className="flex items-center justify-between text-[11px] text-gray-400 border-b border-gray-200 pb-2 mb-2">
                <span>Response Sample</span>
                <span>application/json</span>
              </div>
              <pre className="text-xs text-emerald-700 font-mono">{sampleJson}</pre>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100 mt-4">
            <button
              onClick={handleCopy}
              className="w-full py-2 bg-white border border-gray-200 rounded-lg text-xs font-semibold text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-2"
            >
              {copiedSnippet ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-gray-400" />
                  <span>Copy cURL Snippet</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Available API Categories */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-gray-900">Available API Categories</h3>
          <span className="text-xs text-gray-400 font-medium">4 core namespaces enabled</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div
            onClick={() => navigate('/api-access/endpoints')}
            className="bg-white rounded-xl border border-gray-200 p-5 shadow-xs hover:border-black cursor-pointer transition-colors"
          >
            <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-700 mb-3">
              <TrendingUp className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold text-gray-900">Market Data</h4>
            <p className="text-xs text-gray-500 mt-1">
              Latest supported market prices, indices, and quote feeds.
            </p>
            <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400 font-mono">
              <span>/v1/markets/*</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          <div
            onClick={() => navigate('/api-access/endpoints')}
            className="bg-white rounded-xl border border-gray-200 p-5 shadow-xs hover:border-black cursor-pointer transition-colors"
          >
            <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-700 mb-3">
              <History className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold text-gray-900">Historical Data</h4>
            <p className="text-xs text-gray-500 mt-1">
              Historical OHLCV daily and interval market data.
            </p>
            <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400 font-mono">
              <span>/v1/historical/*</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          <div
            onClick={() => navigate('/api-access/endpoints')}
            className="bg-white rounded-xl border border-gray-200 p-5 shadow-xs hover:border-black cursor-pointer transition-colors"
          >
            <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-700 mb-3">
              <LineChart className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold text-gray-900">Analytics</h4>
            <p className="text-xs text-gray-500 mt-1">
              Momentum, volatility, moving-average, and technical indicators.
            </p>
            <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400 font-mono">
              <span>/v1/analytics/*</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          <div
            onClick={() => navigate('/api-access/endpoints')}
            className="bg-white rounded-xl border border-gray-200 p-5 shadow-xs hover:border-black cursor-pointer transition-colors"
          >
            <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-700 mb-3">
              <Newspaper className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold text-gray-900">Financial News</h4>
            <p className="text-xs text-gray-500 mt-1">
              Financial market headlines and contextual entity sentiment.
            </p>
            <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400 font-mono">
              <span>/v1/news/*</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
