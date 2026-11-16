import React, { useState } from 'react';
import {
  Copy,
  Check,
  Search,
  Play,
  Terminal,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { MOCK_API_ENDPOINTS } from '@/data/mock/apiDeveloperData';
import { APIEndpointDoc } from '@/types';

export const APIEndpointsTab: React.FC = () => {
  const [selectedEndpoint, setSelectedEndpoint] = useState<APIEndpointDoc>(MOCK_API_ENDPOINTS[0]);
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [copiedBaseUrl, setCopiedBaseUrl] = useState(false);
  const [copiedCurl, setCopiedCurl] = useState(false);
  const [copiedJson, setCopiedJson] = useState(false);

  // Sandbox interactive state
  const [sandboxResponse, setSandboxResponse] = useState<string | null>(null);
  const [isSandboxRunning, setIsSandboxRunning] = useState(false);

  const categories = [
    { label: 'All', count: 5 },
    { label: 'Market Data', count: 2 },
    { label: 'Historical Data', count: 1 },
    { label: 'Analytics', count: 1 },
    { label: 'Financial News', count: 1 },
  ];

  const filteredEndpoints = MOCK_API_ENDPOINTS.filter((ep) => {
    const matchesCat = categoryFilter === 'All' || ep.category === categoryFilter;
    const matchesSearch =
      ep.path.toLowerCase().includes(search.toLowerCase()) ||
      ep.description.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleRunSandbox = () => {
    setIsSandboxRunning(true);
    setTimeout(() => {
      setIsSandboxRunning(false);
      setSandboxResponse(selectedEndpoint.exampleResponse);
    }, 450);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono text-gray-400">
            REST API • Public & Enterprise Access
          </span>
          <h2 className="text-2xl font-bold text-gray-900 mt-1">API Endpoints</h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Explore the MarketLens API endpoints available to your account.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <code className="text-xs font-mono bg-gray-50 border border-gray-200 px-3 py-2 rounded-lg text-gray-700">
            https://api.marketlens.example/v1
          </code>
          <button
            onClick={() => {
              navigator.clipboard.writeText('https://api.marketlens.example/v1');
              setCopiedBaseUrl(true);
              setTimeout(() => setCopiedBaseUrl(false), 2000);
            }}
            className="px-3.5 py-2 bg-black text-white text-xs font-semibold rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-1.5"
          >
            {copiedBaseUrl ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedBaseUrl ? 'Copied' : 'Copy Base URL'}</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search endpoints by path, method, or keyword..."
            className="w-full pl-8 pr-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs text-gray-900 focus:outline-none focus:ring-1 focus:ring-black"
          />
        </div>

        <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
          {categories.map((c) => (
            <button
              key={c.label}
              onClick={() => setCategoryFilter(c.label)}
              className={`px-3 py-1 rounded-md text-xs font-semibold whitespace-nowrap transition-colors ${
                categoryFilter === c.label
                  ? 'bg-[#111827] text-white shadow-xs'
                  : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              {c.label} ({c.count})
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Endpoints list (Left 1/3) + Detail View (Right 2/3) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Endpoints Sidebar List */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-xs space-y-4">
            {['Market Data', 'Historical Data', 'Analytics', 'Financial News'].map((category) => {
              const eps = filteredEndpoints.filter((e) => e.category === category);
              if (eps.length === 0) return null;
              return (
                <div key={category} className="space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                    <span>{category}</span>
                    <span>{eps.length} Endpoints</span>
                  </div>

                  <div className="space-y-1.5">
                    {eps.map((ep) => {
                      const isSelected = selectedEndpoint.id === ep.id;
                      return (
                        <div
                          key={ep.id}
                          onClick={() => {
                            setSelectedEndpoint(ep);
                            setSandboxResponse(null);
                          }}
                          className={`p-3 rounded-xl border text-left cursor-pointer transition-colors ${
                            isSelected
                              ? 'bg-emerald-50/50 border-emerald-300 ring-1 ring-emerald-400'
                              : 'bg-gray-50/60 border-gray-100 hover:border-gray-200 hover:bg-gray-50'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="px-1.5 py-0.2 rounded text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800">
                              {ep.method}
                            </span>
                            <span className="text-[10px] text-gray-400 font-mono">
                              {ep.subCategory}
                            </span>
                          </div>
                          <p className="font-mono text-xs font-semibold text-gray-900 truncate">
                            {ep.path}
                          </p>
                          <p className="text-[11px] text-gray-500 mt-1 truncate">
                            {ep.description}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Cluster Telemetry Stats */}
          <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-xs text-xs space-y-2 font-mono">
            <div className="flex items-center justify-between text-gray-500">
              <span className="text-gray-400 uppercase text-[10px]">CLUSTER REGION</span>
              <span className="text-gray-800">us-east-1 (N. Virginia)</span>
            </div>
            <div className="flex items-center justify-between text-gray-500">
              <span className="text-gray-400 uppercase text-[10px]">MEDIAN RESPONSE</span>
              <span className="text-emerald-600 font-bold">14.2 ms</span>
            </div>
            <div className="flex items-center justify-between text-gray-500">
              <span className="text-gray-400 uppercase text-[10px]">MONTHLY UPTIME</span>
              <span className="text-gray-800 font-bold">99.992%</span>
            </div>
          </div>
        </div>

        {/* Selected Endpoint Detail View */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-xs space-y-6">
            {/* Header info */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-emerald-100 text-emerald-800">
                  {selectedEndpoint.method}
                </span>
                <h3 className="text-lg font-mono font-bold text-gray-900">
                  {selectedEndpoint.path}
                </h3>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                {selectedEndpoint.description}
              </p>

              <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-gray-500 font-mono">
                <span>{selectedEndpoint.auth}</span>
                <span>•</span>
                <span>{selectedEndpoint.rateLimit}</span>
                <span>•</span>
                <span>{selectedEndpoint.cacheControl}</span>
              </div>
            </div>

            {/* Path Parameters */}
            {selectedEndpoint.pathParams && selectedEndpoint.pathParams.length > 0 && (
              <div className="space-y-2 pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between text-xs font-bold text-gray-400 uppercase tracking-wider">
                  <span>PATH PARAMETERS</span>
                  <span>{selectedEndpoint.pathParams.length} required</span>
                </div>

                <div className="border border-gray-100 rounded-lg overflow-hidden text-xs">
                  <table className="w-full text-left">
                    <thead className="bg-gray-50 text-[10px] text-gray-400 uppercase tracking-wider">
                      <tr>
                        <th className="py-2 px-4">Field</th>
                        <th className="py-2 px-4">Type</th>
                        <th className="py-2 px-4">Status</th>
                        <th className="py-2 px-4">Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 font-mono">
                      {selectedEndpoint.pathParams.map((p) => (
                        <tr key={p.field}>
                          <td className="py-2.5 px-4 font-bold text-gray-900">{p.field}</td>
                          <td className="py-2.5 px-4 text-gray-500">{p.type}</td>
                          <td className="py-2.5 px-4 font-sans">
                            <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-red-50 text-red-700">
                              {p.status}
                            </span>
                          </td>
                          <td className="py-2.5 px-4 font-sans text-gray-600">{p.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Query Parameters */}
            {selectedEndpoint.queryParams && selectedEndpoint.queryParams.length > 0 && (
              <div className="space-y-2 pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between text-xs font-bold text-gray-400 uppercase tracking-wider">
                  <span>QUERY PARAMETERS</span>
                  <span>{selectedEndpoint.queryParams.length} optional</span>
                </div>

                <div className="border border-gray-100 rounded-lg overflow-hidden text-xs">
                  <table className="w-full text-left">
                    <thead className="bg-gray-50 text-[10px] text-gray-400 uppercase tracking-wider">
                      <tr>
                        <th className="py-2 px-4">Field</th>
                        <th className="py-2 px-4">Type</th>
                        <th className="py-2 px-4">Default</th>
                        <th className="py-2 px-4">Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 font-mono">
                      {selectedEndpoint.queryParams.map((q) => (
                        <tr key={q.field}>
                          <td className="py-2.5 px-4 font-bold text-gray-900">{q.field}</td>
                          <td className="py-2.5 px-4 text-gray-500">{q.type}</td>
                          <td className="py-2.5 px-4 text-gray-500">{q.defaultVal}</td>
                          <td className="py-2.5 px-4 font-sans text-gray-600">{q.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Example Request */}
            <div className="space-y-2 pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between text-xs font-bold text-gray-900">
                <span>EXAMPLE REQUEST</span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(selectedEndpoint.exampleCurl);
                    setCopiedCurl(true);
                    setTimeout(() => setCopiedCurl(false), 2000);
                  }}
                  className="inline-flex items-center gap-1 text-gray-500 hover:text-black font-medium text-[11px]"
                >
                  {copiedCurl ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedCurl ? 'Copied' : 'Copy cURL'}</span>
                </button>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-xl p-3.5 font-mono text-xs text-gray-800">
                <pre className="whitespace-pre-wrap">{selectedEndpoint.exampleCurl}</pre>
              </div>
            </div>

            {/* Example Response */}
            <div className="space-y-2 pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between text-xs font-bold text-gray-900">
                <div className="flex items-center gap-2">
                  <span>EXAMPLE RESPONSE</span>
                  <span className="px-1.5 py-0.2 rounded text-[10px] font-mono bg-emerald-50 text-emerald-700">
                    200 OK
                  </span>
                  <span className="text-[10px] text-gray-400 font-mono">application/json</span>
                </div>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(selectedEndpoint.exampleResponse);
                    setCopiedJson(true);
                    setTimeout(() => setCopiedJson(false), 2000);
                  }}
                  className="inline-flex items-center gap-1 text-gray-500 hover:text-black font-medium text-[11px]"
                >
                  {copiedJson ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedJson ? 'Copied' : 'Copy JSON'}</span>
                </button>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-xl p-3.5 font-mono text-xs text-emerald-700">
                <pre className="whitespace-pre-wrap">{selectedEndpoint.exampleResponse}</pre>
              </div>
            </div>

            {/* Standard Response Status Codes Table */}
            <div className="space-y-2 pt-4 border-t border-gray-100">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                STANDARD RESPONSE STATUS CODES
              </h4>

              <div className="border border-gray-100 rounded-xl overflow-hidden text-xs">
                <table className="w-full text-left">
                  <tbody className="divide-y divide-gray-100">
                    <tr>
                      <td className="py-2.5 px-4 font-mono font-bold text-emerald-600 w-28">
                        200 OK
                      </td>
                      <td className="py-2.5 px-4 font-semibold text-gray-800">Request successful</td>
                      <td className="py-2.5 px-4 text-gray-500 text-right">Returns complete payload</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-4 font-mono font-bold text-amber-600">
                        400 Bad
                      </td>
                      <td className="py-2.5 px-4 font-semibold text-gray-800">Invalid parameter format</td>
                      <td className="py-2.5 px-4 text-gray-500 text-right">Check symbol regex and query types</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-4 font-mono font-bold text-red-600">
                        401 Unauth
                      </td>
                      <td className="py-2.5 px-4 font-semibold text-gray-800">Missing or invalid API key</td>
                      <td className="py-2.5 px-4 text-gray-500 text-right">Provide valid X-API-Key token</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-4 font-mono font-bold text-gray-600">
                        404 N/F
                      </td>
                      <td className="py-2.5 px-4 font-semibold text-gray-800">Symbol not recognized</td>
                      <td className="py-2.5 px-4 text-gray-500 text-right">Ticker not tracked in repository</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-4 font-mono font-bold text-purple-600">
                        429 Limit
                      </td>
                      <td className="py-2.5 px-4 font-semibold text-gray-800">Monthly request quota reached</td>
                      <td className="py-2.5 px-4 text-gray-500 text-right">Upgrade tier or await cycle rollover</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Sandbox Console Banner */}
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Terminal className="w-5 h-5 text-gray-700" />
                <div>
                  <h4 className="text-xs font-bold text-gray-900">MarketLens Sandbox Console</h4>
                  <p className="text-[11px] text-gray-500">
                    Execute authenticated live test queries directly from your browser.
                  </p>
                </div>
              </div>

              <button
                onClick={handleRunSandbox}
                disabled={isSandboxRunning}
                className="px-4 py-2 bg-black text-white text-xs font-semibold rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-1.5 self-start sm:self-center"
              >
                <Play className="w-3 h-3 fill-current" />
                <span>{isSandboxRunning ? 'Testing...' : 'Test in Sandbox'}</span>
              </button>
            </div>

            {/* Sandbox Output if executed */}
            {sandboxResponse && (
              <div className="p-4 bg-[#111827] text-white rounded-xl font-mono text-xs space-y-2">
                <div className="flex items-center justify-between text-gray-400 border-b border-gray-700 pb-2">
                  <span className="text-emerald-400">HTTP/2 200 OK — 14.2ms</span>
                  <span>Payload: 412 bytes</span>
                </div>
                <pre className="text-emerald-400 overflow-x-auto">{sandboxResponse}</pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
