import React, { useState } from 'react';
import {
  Key,
  Copy,
  Check,
  Eye,
  EyeOff,
  RotateCw,
  XCircle,
  ShieldCheck,
  AlertTriangle,
  Lock,
  ExternalLink,
  X,
  FileCode,
} from 'lucide-react';
import { useMarketData } from '@/context/MarketDataContext';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';

export const APIKeyTab: React.FC = () => {
  const { apiKeys, generateApiKey, revokeApiKey } = useMarketData();
  const [showFullKey, setShowFullKey] = useState(false);
  const [copiedKey, setCopiedKey] = useState(false);
  const [copiedBannerKey, setCopiedBannerKey] = useState(false);
  const [dismissBanner, setDismissBanner] = useState(false);
  const [codeTab, setCodeTab] = useState<'curl' | 'python' | 'node'>('curl');
  const [isRegenerateModalOpen, setIsRegenerateModalOpen] = useState(false);

  const activeKey = apiKeys.find((k) => k.status === 'Active') || apiKeys[0];

  const handleCopyKey = (keyText: string, isBanner = false) => {
    navigator.clipboard.writeText(keyText);
    if (isBanner) {
      setCopiedBannerKey(true);
      setTimeout(() => setCopiedBannerKey(false), 2000);
    } else {
      setCopiedKey(true);
      setTimeout(() => setCopiedKey(false), 2000);
    }
  };

  const handleRegenerate = () => {
    generateApiKey('Live Production Token', 'Production');
    setIsRegenerateModalOpen(false);
    setShowFullKey(true);
    setDismissBanner(false);
  };

  const sampleCodes = {
    curl: `// Request live AAPL quote snapshot
curl -X GET \\
  "https://api.marketlens.example/v1/markets/quotes?symbol=AAPL" \\
  -H "X-API-Key: ${activeKey?.fullKey || 'ml_live_8f9a2b7c4d1e0f3a5b6c7d8e9f0a1b2c'}" \\
  -H "Accept: application/json"`,
    python: `# Python SDK / requests example
import requests

url = "https://api.marketlens.example/v1/markets/quotes?symbol=AAPL"
headers = {
    "X-API-Key": "${activeKey?.fullKey || 'ml_live_8f9a2b7c4d1e0f3a5b6c7d8e9f0a1b2c'}",
    "Accept": "application/json"
}

response = requests.get(url, headers=headers)
print(response.json())`,
    node: `// Node.js fetch example
const response = await fetch("https://api.marketlens.example/v1/markets/quotes?symbol=AAPL", {
  headers: {
    "X-API-Key": "${activeKey?.fullKey || 'ml_live_8f9a2b7c4d1e0f3a5b6c7d8e9f0a1b2c'}",
    "Accept": "application/json"
  }
});
const data = await response.json();
console.log(data);`,
  };

  return (
    <div className="space-y-6">
      {/* Top Breadcrumb & Environment Status */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs">
        <span className="font-mono text-gray-400">
          AUTH // CREDENTIALS • PROD_KEY_ID: #4092-LENS
        </span>
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-gray-200 rounded-lg text-gray-700 font-medium">
            ENVIRONMENT <strong className="text-gray-900">Production</strong>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          </span>
          <button className="inline-flex items-center gap-1 text-gray-600 hover:text-black font-medium">
            <FileCode className="w-3.5 h-3.5" />
            <span>Docs & Specs</span>
          </button>
        </div>
      </div>

      {/* Dismissible New Key Generated Banner */}
      {!dismissBanner && (
        <div className="bg-emerald-50/60 border border-emerald-200 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-xs font-bold text-gray-900">NEW API KEY GENERATED</h4>
                <span className="text-[10px] font-semibold px-2 py-0.5 bg-white text-emerald-700 rounded border border-emerald-200">
                  Secret Unmasked
                </span>
              </div>
              <p className="text-xs text-gray-600 mt-0.5">
                Copy this key now. For security reasons, MarketLens will not display the full secret key again after you leave this page.
              </p>
              <div className="mt-2 flex items-center gap-2">
                <code className="text-xs font-mono bg-white px-2.5 py-1 rounded border border-emerald-200 text-gray-800">
                  {activeKey?.fullKey}
                </code>
                <button
                  onClick={() => handleCopyKey(activeKey?.fullKey || '', true)}
                  className="px-2.5 py-1 bg-black text-white rounded text-xs font-medium hover:bg-gray-800 flex items-center gap-1"
                >
                  {copiedBannerKey ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedBannerKey ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>
          </div>

          <button
            onClick={() => setDismissBanner(true)}
            className="text-xs text-gray-400 hover:text-gray-600 self-start md:self-center"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Main Grid: Key Management & Code (Left 2/3) + Security Advisory & Quota (Right 1/3) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2/3) */}
        <div className="lg:col-span-2 space-y-6">
          {/* YOUR API KEY Card */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-xs">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  YOUR API KEY
                </span>
                <span className="text-xs text-gray-400">• Customer Read & Stream Tier</span>
              </div>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Active
              </span>
            </div>

            {/* Key Container */}
            <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-gray-600">
                  <Key className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-gray-400 uppercase">
                    Live Production Token
                  </p>
                  <code className="text-sm font-mono font-medium text-gray-900 tracking-wider">
                    {showFullKey ? activeKey?.fullKey : activeKey?.maskedKey}
                  </code>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowFullKey(!showFullKey)}
                  className="p-2 bg-white border border-gray-200 rounded-lg text-gray-500 hover:text-black transition-colors"
                  title={showFullKey ? 'Hide key' : 'Reveal full key'}
                >
                  {showFullKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => handleCopyKey(activeKey?.fullKey || '')}
                  className="px-3.5 py-2 bg-black text-white rounded-lg text-xs font-semibold hover:bg-gray-800 transition-colors flex items-center gap-1.5"
                >
                  {copiedKey ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey ? 'Copied!' : 'Copy Key'}</span>
                </button>
              </div>
            </div>

            {/* Footer metadata & actions */}
            <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-xs text-gray-500">
              <div className="flex items-center gap-4">
                <span>Created {activeKey?.createdDate}</span>
                <span>•</span>
                <span>Last used {activeKey?.lastUsed}</span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsRegenerateModalOpen(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 font-medium"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                  <span>Regenerate Key</span>
                </button>
                <button
                  onClick={() => activeKey && revokeApiKey(activeKey.id)}
                  className="inline-flex items-center gap-1.5 text-red-600 hover:text-red-700 font-medium"
                >
                  <XCircle className="w-3.5 h-3.5" />
                  <span>Revoke Key</span>
                </button>
              </div>
            </div>
          </div>

          {/* Authentication Code Documentation Card */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div>
                <h3 className="text-base font-bold text-gray-900">Authentication</h3>
                <p className="text-xs text-gray-400">
                  Include your API key in the HTTP request header with every API call:
                </p>
              </div>
              <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-[10px] font-mono font-medium">
                🔒 HTTPS Required
              </span>
            </div>

            {/* Base URL */}
            <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-between text-xs font-mono">
              <span className="text-gray-400">BASE URL</span>
              <span className="text-gray-900 font-semibold">https://api.marketlens.example/v1</span>
              <button
                onClick={() => handleCopyKey('https://api.marketlens.example/v1')}
                className="text-gray-400 hover:text-gray-700 p-1"
              >
                <Copy className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* HTTP Headers Format */}
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg space-y-2 text-xs font-mono">
              <p className="text-gray-400 text-[11px] font-sans font-medium">
                HTTP Headers Format (Choose either standard):
              </p>
              <div className="text-gray-700">
                <span className="text-gray-400"># Option 1: Custom header</span>
                <br />
                <strong>X-API-Key:</strong> YOUR_API_KEY
              </div>
              <div className="text-gray-700 pt-2">
                <span className="text-gray-400"># Option 2: Bearer token header</span>
                <br />
                <strong>Authorization:</strong> Bearer YOUR_API_KEY
              </div>
            </div>

            {/* Code Examples Tabs */}
            <div className="pt-2">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-gray-900">Code Examples</span>
                <div className="flex items-center bg-gray-100 rounded-lg p-0.5 text-xs font-semibold">
                  {(['curl', 'python', 'node'] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => setCodeTab(t)}
                      className={`px-3 py-1 rounded-md transition-colors ${
                        codeTab === t
                          ? 'bg-white text-gray-900 shadow-xs'
                          : 'text-gray-500 hover:text-gray-900'
                      }`}
                    >
                      {t === 'curl' ? 'cURL' : t === 'python' ? 'Python' : 'Node.js'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-[#111827] text-gray-100 p-4 rounded-xl font-mono text-xs overflow-x-auto relative">
                <pre className="whitespace-pre-wrap">{sampleCodes[codeTab]}</pre>
                <button
                  onClick={() => handleCopyKey(sampleCodes[codeTab])}
                  className="absolute top-3 right-3 p-1.5 bg-gray-800 text-gray-300 hover:text-white rounded-lg transition-colors"
                  title="Copy code"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Key Access Log */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-xs overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-gray-900">Key Access Log</h3>
                <p className="text-xs text-gray-400">Last 4 authentication events</p>
              </div>
              <span className="text-xs font-semibold text-gray-600 hover:underline cursor-pointer">
                View full log →
              </span>
            </div>

            <table className="w-full text-left text-xs border-collapse font-mono">
              <thead>
                <tr className="bg-gray-50 text-[10px] text-gray-400 uppercase tracking-wider border-b border-gray-100 font-sans">
                  <th className="py-2.5 px-6">TIMESTAMP (UTC)</th>
                  <th className="py-2.5 px-4">ENDPOINT</th>
                  <th className="py-2.5 px-4">CLIENT IP</th>
                  <th className="py-2.5 px-6 text-right">STATUS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="py-2.5 px-6 text-gray-600">2026-10-18 14:32:04</td>
                  <td className="py-2.5 px-4 text-gray-900">GET /v1/markets/quotes</td>
                  <td className="py-2.5 px-4 text-gray-500">198.51.100.24</td>
                  <td className="py-2.5 px-6 text-right font-bold text-emerald-600">200 OK</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-6 text-gray-600">2026-10-18 14:30:19</td>
                  <td className="py-2.5 px-4 text-gray-900">GET /v1/portfolio/summary</td>
                  <td className="py-2.5 px-4 text-gray-500">198.51.100.24</td>
                  <td className="py-2.5 px-6 text-right font-bold text-emerald-600">200 OK</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-6 text-gray-600">2026-10-18 14:15:02</td>
                  <td className="py-2.5 px-4 text-gray-900">POST /v1/analyst/queries</td>
                  <td className="py-2.5 px-4 text-gray-500">198.51.100.24</td>
                  <td className="py-2.5 px-6 text-right font-bold text-emerald-600">200 OK</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-6 text-gray-600">2026-10-18 13:58:44</td>
                  <td className="py-2.5 px-4 text-gray-900">GET /v1/news/intelligence</td>
                  <td className="py-2.5 px-4 text-gray-500">198.51.100.24</td>
                  <td className="py-2.5 px-6 text-right font-bold text-emerald-600">200 OK</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Security Tips, Plan Quota, IP Restrictions (1/3) */}
        <div className="space-y-6">
          {/* Keep your API key secure */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
              <Lock className="w-4 h-4 text-gray-700" />
              <h3 className="text-sm font-bold text-gray-900">Keep your API key secure</h3>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2.5">
                <span className="text-red-500 font-bold mt-0.5">✕</span>
                <p className="text-gray-600">
                  <strong className="text-gray-900">Never expose in client code:</strong> Do not commit keys to GitHub, embed in mobile apps, or store in browser frontend scripts.
                </p>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="text-emerald-500 font-bold mt-0.5">✓</span>
                <p className="text-gray-600">
                  <strong className="text-gray-900">Environment variables:</strong> Store keys in secure backend environment variables (e.g. <code className="bg-gray-100 px-1 rounded">MARKETLENS_API_KEY</code>).
                </p>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="text-amber-500 font-bold mt-0.5">!</span>
                <p className="text-gray-600">
                  <strong className="text-gray-900">Compromised keys:</strong> Immediately regenerate your key if you suspect unauthorized leak or breach.
                </p>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-black mt-1.5 flex-shrink-0" />
                <p className="text-gray-600">
                  <strong className="text-gray-900">Account Bound:</strong> Quotas and permissions are tied to your personal Market Analyst account seat.
                </p>
              </div>
            </div>

            <div className="mt-4 p-3 bg-gray-50 rounded-lg flex items-center justify-between text-xs">
              <span className="text-gray-500">Key Rotation Policy</span>
              <span className="font-semibold text-gray-900">Recommended 90d</span>
            </div>
          </div>

          {/* API Plan & Quota */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                API PLAN & QUOTA
              </h3>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-gray-100 text-gray-800">
                Analyst Pro
              </span>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-gray-500">Requests Today</span>
                <span className="font-mono font-bold text-gray-900">14,280 / 100,000</span>
              </div>
              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full" style={{ width: '14.2%' }} />
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-gray-100 text-xs text-gray-600">
              <div className="flex items-center justify-between">
                <span>Rate Limit: 60 req/sec</span>
                <span>Resets in 9h 28m</span>
              </div>
              <div className="flex items-center justify-between">
                <span>WebSocket Streams</span>
                <span className="font-semibold text-gray-900">3 / 10 Connected</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Current Latency</span>
                <span className="font-semibold text-gray-900 font-mono">18ms (us-east)</span>
              </div>
            </div>
          </div>

          {/* IP Restrictions */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-gray-100">
              <div className="flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-gray-500" />
                <h4 className="text-xs font-bold text-gray-900">IP Restrictions</h4>
              </div>
              <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
                Active (1 IP)
              </span>
            </div>

            <p className="text-xs text-gray-500 leading-relaxed">
              Restricted to requests originating from configured corporate proxy networks.
            </p>

            <div className="p-2.5 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-between text-xs font-mono text-gray-800">
              <span>198.51.100.0/24</span>
              <span className="text-[11px] text-emerald-600">✓ Enforced</span>
            </div>
          </div>
        </div>
      </div>

      {/* Modal: Regenerate Key Confirmation */}
      <Modal
        isOpen={isRegenerateModalOpen}
        onClose={() => setIsRegenerateModalOpen(false)}
        title="Regenerate API Key"
        subtitle="This action will immediately invalidate your current active token."
        footer={
          <>
            <Button variant="outline" onClick={() => setIsRegenerateModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleRegenerate}>
              Yes, Regenerate Key
            </Button>
          </>
        }
      >
        <p className="text-xs text-gray-600 leading-relaxed">
          Any services or cron jobs using your existing token will fail with <code>401 Unauthorized</code> until updated with the new token. Are you sure you want to proceed?
        </p>
      </Modal>
    </div>
  );
};
