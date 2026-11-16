import React, { useState, useMemo } from 'react';
import { useMarketData } from '@/context/MarketDataContext';
import { AuditLogItem } from '@/data/mock/adminData';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import {
  ShieldAlert,
  Search,
  Download,
  Filter,
  Eye,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  FileText,
  User,
  Clock,
  Terminal,
} from 'lucide-react';

export const AuditLogsPage: React.FC = () => {
  const { auditLogs } = useMarketData();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'SUCCESS' | 'WARNING' | 'FAILURE'>('ALL');
  const [roleFilter, setRoleFilter] = useState<string>('ALL');
  const [selectedLog, setSelectedLog] = useState<AuditLogItem | null>(null);

  const filteredLogs = useMemo(() => {
    return auditLogs.filter(log => {
      const matchesSearch =
        log.actor.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.resource.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.ipAddress.includes(searchQuery);

      const matchesStatus = statusFilter === 'ALL' || log.status === statusFilter;
      const matchesRole = roleFilter === 'ALL' || log.role === roleFilter;

      return matchesSearch && matchesStatus && matchesRole;
    });
  }, [auditLogs, searchQuery, statusFilter, roleFilter]);

  const handleExportCSV = () => {
    const headers = ['ID', 'Timestamp', 'Actor', 'Role', 'Action', 'Resource', 'IP Address', 'Status'];
    const rows = filteredLogs.map(l => [
      l.id,
      `"${l.timestamp}"`,
      `"${l.actor}"`,
      l.role,
      l.action,
      `"${l.resource}"`,
      l.ipAddress,
      l.status,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `marketlens_audit_logs_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStatusBadge = (status: AuditLogItem['status']) => {
    switch (status) {
      case 'SUCCESS':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            SUCCESS
          </span>
        );
      case 'WARNING':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
            <AlertTriangle className="w-3 h-3 text-amber-600" />
            WARNING
          </span>
        );
      case 'FAILURE':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-50 text-red-700 border border-red-200">
            <XCircle className="w-3 h-3 text-red-600" />
            FAILURE
          </span>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">System Audit Logs</h1>
          <p className="text-sm text-gray-500 mt-1">
            Immutable chronological trace of administrative changes, security events, and data mutations.
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={handleExportCSV} className="text-xs">
          <Download className="w-3.5 h-3.5 mr-1.5 text-gray-500" />
          Export Audit Trail (CSV)
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Total Recorded Events</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{auditLogs.length}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Success Operations</p>
          <p className="text-2xl font-bold text-emerald-600 mt-1">
            {auditLogs.filter(l => l.status === 'SUCCESS').length}
          </p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Warnings & Deviations</p>
          <p className="text-2xl font-bold text-amber-600 mt-1">
            {auditLogs.filter(l => l.status === 'WARNING').length}
          </p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Security Failures</p>
          <p className="text-2xl font-bold text-red-600 mt-1">
            {auditLogs.filter(l => l.status === 'FAILURE').length}
          </p>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 space-y-4 shadow-sm">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by actor, action, resource, IP..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-gray-900"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Filter className="w-4 h-4 text-gray-400" />
              <span>Status:</span>
              <select
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value as any)}
                className="border border-gray-300 rounded-lg px-2.5 py-1.5 text-xs text-gray-700 bg-white focus:outline-none focus:ring-1 focus:ring-gray-900"
              >
                <option value="ALL">All Statuses</option>
                <option value="SUCCESS">Success Only</option>
                <option value="WARNING">Warnings</option>
                <option value="FAILURE">Failures</option>
              </select>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>Role:</span>
              <select
                value={roleFilter}
                onChange={e => setRoleFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-2.5 py-1.5 text-xs text-gray-700 bg-white focus:outline-none focus:ring-1 focus:ring-gray-900"
              >
                <option value="ALL">All Roles</option>
                <option value="ROLE_ADMIN">ROLE_ADMIN</option>
                <option value="ROLE_DATA_MANAGER">ROLE_DATA_MANAGER</option>
                <option value="ROLE_ANALYST">ROLE_ANALYST</option>
                <option value="GUEST">GUEST</option>
              </select>
            </div>
          </div>
        </div>

        {/* Audit Table */}
        <div className="overflow-x-auto border border-gray-200 rounded-lg">
          <table className="min-w-full divide-y divide-gray-200 text-left text-sm">
            <thead className="bg-[#F9FAFB] text-xs font-semibold text-gray-500 uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4">Actor</th>
                <th className="py-3 px-4">Action</th>
                <th className="py-3 px-4">Target Resource</th>
                <th className="py-3 px-4">IP Address</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white text-gray-800">
              {filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-sm text-gray-500">
                    No audit records matching the specified filters.
                  </td>
                </tr>
              ) : (
                filteredLogs.map(log => (
                  <tr key={log.id} className="hover:bg-gray-50/75 transition-colors">
                    <td className="py-3 px-4 text-xs font-mono text-gray-600 whitespace-nowrap">
                      {log.timestamp}
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900 text-xs">{log.actor}</div>
                      <div className="text-[10px] text-gray-400 font-mono">{log.role}</div>
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <span className="font-mono text-xs font-semibold text-gray-800 bg-gray-100 px-2 py-0.5 rounded">
                        {log.action}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-xs text-gray-700 max-w-xs truncate" title={log.resource}>
                      {log.resource}
                    </td>
                    <td className="py-3 px-4 text-xs font-mono text-gray-500 whitespace-nowrap">
                      {log.ipAddress}
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      {getStatusBadge(log.status)}
                    </td>
                    <td className="py-3 px-4 text-right whitespace-nowrap">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-7 w-7 p-0"
                        onClick={() => setSelectedLog(log)}
                        title="View Full Audit Telemetry"
                      >
                        <Eye className="w-3.5 h-3.5 text-gray-600" />
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Audit Detail Modal */}
      {selectedLog && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedLog(null)}
          title={`Audit Log Record: ${selectedLog.id}`}
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-gray-700" />
                <span className="font-semibold text-gray-900 font-mono">{selectedLog.action}</span>
              </div>
              {getStatusBadge(selectedLog.status)}
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="bg-gray-50 p-3 rounded-lg space-y-1">
                <span className="text-gray-400 block uppercase font-semibold text-[10px]">Actor & Role</span>
                <p className="font-medium text-gray-900">{selectedLog.actor}</p>
                <p className="font-mono text-gray-500">{selectedLog.role}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg space-y-1">
                <span className="text-gray-400 block uppercase font-semibold text-[10px]">Timestamp & Client</span>
                <p className="font-medium text-gray-900">{selectedLog.timestamp}</p>
                <p className="font-mono text-gray-500">IP: {selectedLog.ipAddress}</p>
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-xs font-semibold text-gray-700 uppercase">Target Resource</span>
              <p className="text-sm bg-gray-50 border border-gray-200 p-2.5 rounded-lg text-gray-800 font-mono text-xs">
                {selectedLog.resource}
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-xs font-semibold text-gray-700 uppercase">Raw Event Signature</span>
              <pre className="bg-[#111827] text-gray-100 p-3 rounded-lg text-xs font-mono overflow-x-auto">
{JSON.stringify(
  {
    event_id: selectedLog.id,
    signature: 'SHA256:8f4c2e17a499318bdf92',
    timestamp: selectedLog.timestamp,
    actor_metadata: {
      name: selectedLog.actor,
      role: selectedLog.role,
      ip: selectedLog.ipAddress,
    },
    action: selectedLog.action,
    target: selectedLog.resource,
    result: selectedLog.status,
    verified_by: 'MarketLens Security Engine v2.4',
  },
  null,
  2
)}
              </pre>
            </div>

            <div className="flex justify-end pt-3">
              <Button variant="outline" size="sm" onClick={() => setSelectedLog(null)}>
                Close
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
