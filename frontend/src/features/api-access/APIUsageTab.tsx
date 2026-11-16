import React from 'react';
import {
  Calendar,
  Filter,
  Download,
  Info,
  ExternalLink,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from 'recharts';
import { MOCK_API_USAGE_STATS } from '@/data/mock/apiDeveloperData';

export const APIUsageTab: React.FC = () => {
  const stats = MOCK_API_USAGE_STATS;

  return (
    <div className="space-y-6">
      {/* Top Breadcrumb & Billing Period */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs">
        <span className="font-mono text-gray-400">
          TELEMETRY & TELEMETRICS / Production Tier
        </span>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-gray-200 rounded-lg text-gray-600">
          <Calendar className="w-3.5 h-3.5 text-gray-400" />
          <span>Current billing period ends <strong className="text-gray-900 font-semibold">{stats.billingPeriodEnd}</strong></span>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Requests This Month */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-xs">
          <div className="flex items-center justify-between text-xs text-gray-400 font-semibold uppercase tracking-wider">
            <span>REQUESTS THIS MONTH</span>
            <span>Calls</span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-gray-900 font-mono">
              {stats.requestsThisMonth.toLocaleString()}
            </span>
          </div>
          <div className="mt-3 flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-100">
            <span>Daily Mean</span>
            <span className="font-mono font-medium text-gray-900">{stats.dailyMean} / day</span>
          </div>
        </div>

        {/* Monthly Limit */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-xs">
          <div className="flex items-center justify-between text-xs text-gray-400 font-semibold uppercase tracking-wider">
            <span>MONTHLY LIMIT</span>
            <span>Fixed Quota</span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-gray-900 font-mono">
              {stats.monthlyLimit.toLocaleString()}
            </span>
          </div>
          <div className="mt-3 flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-100">
            <span>Tier Capacity</span>
            <span className="font-medium text-gray-900">{stats.tierCapacity}</span>
          </div>
        </div>

        {/* Remaining Quota */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-xs">
          <div className="flex items-center justify-between text-xs text-gray-400 font-semibold uppercase tracking-wider">
            <span>REMAINING QUOTA</span>
            <span>Available</span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-gray-900 font-mono">
              {stats.remainingQuota.toLocaleString()}
            </span>
          </div>
          <div className="mt-3 flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-100">
            <span>Runway Forecast</span>
            <span className="font-medium text-emerald-600 font-mono">{stats.runwayForecast}</span>
          </div>
        </div>

        {/* Usage Rate */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-xs">
          <div className="flex items-center justify-between text-xs text-gray-400 font-semibold uppercase tracking-wider">
            <span>USAGE RATE</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              • Healthy
            </span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-gray-900 font-mono">
              {stats.usageRatePercent}%
            </span>
          </div>
          <div className="mt-3 flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-100">
            <span>Threshold State</span>
            <span className="text-emerald-600 font-medium">&lt; 80% baseline</span>
          </div>
        </div>
      </div>

      {/* Monthly Request Limit Progress Bar Card */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <h3 className="text-base font-bold text-gray-900">Monthly Request Limit Progress</h3>
            <p className="text-xs text-gray-400">
              Aggregate requests accrued across all authenticated API keys in current billing frame.
            </p>
          </div>
          <div className="text-right">
            <span className="text-sm font-mono font-bold text-gray-900">
              {stats.requestsThisMonth.toLocaleString()} / {stats.monthlyLimit.toLocaleString()}{' '}
              requests used
            </span>
            <span className="text-xs text-gray-500 ml-2 font-mono">({stats.usageRatePercent}%)</span>
          </div>
        </div>

        {/* Multi-tier Progress Bar */}
        <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden flex">
          <div
            className="bg-black h-full rounded-full transition-all"
            style={{ width: `${stats.usageRatePercent}%` }}
          />
        </div>

        <div className="flex flex-wrap items-center justify-between text-xs pt-1">
          <div className="flex items-center gap-4 text-gray-500 text-[11px]">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Healthy (&lt;80%)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              Warning (80–95%)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-500" />
              Quota Exhausted (&gt;95%)
            </span>
          </div>

          <span className="text-[11px] text-gray-400">
            ↻ Your quota resets automatically on the 1st of every month at 00:00 UTC.
          </span>
        </div>
      </div>

      {/* Middle Row: Daily Requests Chart (Left) + Usage by Endpoint (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Requests Chart */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div>
                <h3 className="text-base font-bold text-gray-900">Daily Requests — Last 7 Days</h3>
                <p className="text-xs text-gray-400">Volume distribution across UTC calendar days</p>
              </div>
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Live telemetry
              </span>
            </div>

            <div className="h-56 w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats.dailyVolume} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
                  <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#9CA3AF' }} tickLine={false} axisLine={{ stroke: '#E5E7EB' }} />
                  <YAxis tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#111827', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
                    formatter={(val: number) => [`${val} requests`, 'Volume']}
                  />
                  <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                    {stats.dailyVolume.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.isLive ? '#10B981' : index === 4 ? '#111827' : '#374151'}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500 font-mono">
            <span>Min: 146 reqs</span>
            <span>Rolling 7-day total: 1,284 reqs</span>
            <span>Max: 220 reqs</span>
          </div>
        </div>

        {/* Usage by Endpoint */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="text-base font-bold text-gray-900">Usage by Endpoint</h3>
              <span className="text-xs text-gray-400">5 Active</span>
            </div>
            <p className="text-xs text-gray-400 mt-1 mb-4">
              Request distribution across public routing contracts
            </p>

            <div className="space-y-3 font-mono text-xs">
              {stats.endpointUsage.map((item) => (
                <div key={item.endpoint} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-800 truncate max-w-xs">{item.endpoint}</span>
                    <span className="text-gray-900 font-semibold">
                      {item.count} <span className="text-gray-400 font-normal">({item.percent}%)</span>
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-black h-full rounded-full"
                      style={{ width: `${item.percent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500 font-mono mt-4">
            <span>Core feed dominance</span>
            <span className="text-gray-900 font-semibold">Top 2 routes = 62.4%</span>
          </div>
        </div>
      </div>

      {/* Recent API Requests Activity Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-gray-900">Recent API Requests Activity</h3>
            <p className="text-xs text-gray-400">
              Real-time inspection stream for calls received in current session
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 border border-gray-200 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-gray-400" />
              <span>Filter Logs</span>
            </button>
            <button className="px-3 py-1.5 border border-gray-200 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-1.5">
              <Download className="w-3.5 h-3.5 text-gray-400" />
              <span>Export JSON</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse font-mono">
            <thead>
              <tr className="bg-gray-50/50 text-[10px] text-gray-400 uppercase tracking-wider border-b border-gray-100 font-sans">
                <th className="py-2.5 px-6">TIMESTAMP</th>
                <th className="py-2.5 px-4">ENDPOINT</th>
                <th className="py-2.5 px-4">METHOD</th>
                <th className="py-2.5 px-4">STATUS</th>
                <th className="py-2.5 px-4">LATENCY</th>
                <th className="py-2.5 px-6">IP / CLIENT</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {stats.recentActivity.map((act) => (
                <tr key={act.id} className="hover:bg-gray-50/80 transition-colors">
                  <td className="py-3 px-6 text-gray-500">{act.timestamp}</td>
                  <td className="py-3 px-4 font-bold text-gray-900">{act.endpoint}</td>
                  <td className="py-3 px-4">
                    <span className="px-1.5 py-0.5 rounded text-[10px] bg-gray-100 text-gray-700">
                      {act.method}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-semibold">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] ${
                        act.status === 200
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-amber-50 text-amber-700'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          act.status === 200 ? 'bg-emerald-500' : 'bg-amber-500'
                        }`}
                      />
                      {act.statusText}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-600">{act.latency}</td>
                  <td className="py-3 px-6 text-gray-500 text-[11px]">{act.clientIp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
          <span>Showing last 6 of 1,284 request events</span>
          <button className="text-gray-900 font-semibold hover:underline flex items-center gap-1">
            <span>Open Request Explorer</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Monthly Request Limit Policy Callout */}
      <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl flex items-start gap-3 text-xs">
        <Info className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
        <div className="space-y-1">
          <h4 className="font-semibold text-gray-900">Monthly Request Limit Policy</h4>
          <p className="text-gray-600 leading-relaxed">
            Your account can make up to <strong className="text-gray-900">5,000 API requests</strong> during the monthly billing window. When limit is reached, API requests return <code className="bg-white px-1 border rounded">HTTP 429 Too Many Requests</code> until the monthly reset on the 1st of every month at 00:00 UTC. To scale beyond 5,000 requests or request custom rate limits, contact the developer infrastructure team.
          </p>
          <div className="flex items-center gap-4 pt-2 text-xs font-medium">
            <a href="#" className="text-gray-900 hover:underline flex items-center gap-1">
              <span>Read Rate Limit Documentation</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <a href="#" className="text-emerald-700 hover:underline flex items-center gap-1">
              <span>Request Quota Increase ↗</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
