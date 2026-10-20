import React, { useState } from 'react';
import {
  Users,
  Search,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  XCircle,
  Key,
  ShieldCheck,
  Database,
  TrendingUp,
  MoreVertical,
  ChevronRight,
  Filter,
} from 'lucide-react';
import { useMarketData } from '@/context/MarketDataContext';
import { User, UserRole } from '@/types';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';

export const UserManagementPage: React.FC = () => {
  const { users, createUser, updateUser, toggleUserStatus } = useMarketData();
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  // Form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<UserRole>('ROLE_ANALYST');
  const [title, setTitle] = useState('');
  const [apiAccess, setApiAccess] = useState(true);

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchesRole =
      roleFilter === 'All' ||
      (roleFilter === 'Analyst' && u.role === 'ROLE_ANALYST') ||
      (roleFilter === 'Data Manager' && u.role === 'ROLE_DATA_MANAGER') ||
      (roleFilter === 'Admin' && u.role === 'ROLE_ADMIN');
    return matchesSearch && matchesRole;
  });

  const handleOpenAdd = () => {
    setName('');
    setEmail('');
    setRole('ROLE_ANALYST');
    setTitle('Equity Analyst');
    setApiAccess(true);
    setIsAddUserOpen(true);
  };

  const handleOpenEdit = (user: User) => {
    setEditingUser(user);
    setName(user.name);
    setEmail(user.email);
    setRole(user.role);
    setTitle(user.title);
    setApiAccess(user.apiAccess);
  };

  const handleSaveAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const initials = name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);

    const roleLabel =
      role === 'ROLE_ANALYST'
        ? 'Market Analyst'
        : role === 'ROLE_DATA_MANAGER'
        ? 'Data Manager'
        : 'System Administrator';

    createUser({
      name,
      email,
      role,
      roleLabel,
      initials,
      title,
      status: 'Active',
      apiAccess,
    });
    setIsAddUserOpen(false);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;
    const roleLabel =
      role === 'ROLE_ANALYST'
        ? 'Market Analyst'
        : role === 'ROLE_DATA_MANAGER'
        ? 'Data Manager'
        : 'System Administrator';

    updateUser(editingUser.id, {
      name,
      email,
      role,
      roleLabel,
      title,
      apiAccess,
    });
    setEditingUser(null);
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <nav className="flex items-center gap-1.5 text-xs text-gray-500 font-medium mb-1">
            <span>Administration</span>
            <ChevronRight className="w-3 h-3 text-gray-400" />
            <span className="text-gray-900 font-bold">Users</span>
          </nav>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            User Management
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage MarketLens user accounts, role-based access controls, and customer API permissions.
          </p>
        </div>

        <Button
          variant="primary"
          icon={<Plus className="w-4 h-4" />}
          onClick={handleOpenAdd}
        >
          Add New User
        </Button>
      </div>

      {/* Stat Card */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-xs">
          <div className="flex items-center justify-between text-xs text-gray-400 font-semibold uppercase tracking-wider">
            <span>TOTAL USERS</span>
            <Users className="w-4 h-4 text-gray-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-gray-900 font-mono">
              {users.length}
            </span>
          </div>
          <p className="mt-3 text-xs text-gray-500 pt-2 border-t border-gray-100">
            All registered accounts
          </p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-xs">
          <div className="flex items-center justify-between text-xs text-gray-400 font-semibold uppercase tracking-wider">
            <span>ACTIVE ACCOUNTS</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-gray-900 font-mono">
              {users.filter((u) => u.status === 'Active').length}
            </span>
          </div>
          <p className="mt-3 text-xs text-gray-500 pt-2 border-t border-gray-100">
            Ready for platform login
          </p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-xs">
          <div className="flex items-center justify-between text-xs text-gray-400 font-semibold uppercase tracking-wider">
            <span>API ACCESS ENABLED</span>
            <Key className="w-4 h-4 text-gray-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-gray-900 font-mono">
              {users.filter((u) => u.apiAccess).length}
            </span>
          </div>
          <p className="mt-3 text-xs text-gray-500 pt-2 border-t border-gray-100">
            Developer key authorization
          </p>
        </div>
      </div>

      {/* Users Search and Filters Bar */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or email..."
            className="w-full pl-9 pr-4 py-2 bg-gray-50 text-xs text-gray-900 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-black focus:bg-white"
          />
        </div>

        <div className="flex items-center gap-1 overflow-x-auto">
          {['All', 'Analyst', 'Data Manager', 'Admin'].map((r) => (
            <button
              key={r}
              onClick={() => setRoleFilter(r)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                roleFilter === r
                  ? 'bg-[#111827] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Users Table matching user management.png */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-xs overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-gray-900">Users</h3>
            <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-700 font-mono">
              {users.length} users
            </span>
          </div>
          <span className="text-xs text-gray-400">
            Showing 1–{filteredUsers.length} of {users.length} users
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-gray-50/50 text-[10px] text-gray-400 uppercase tracking-wider border-b border-gray-100 font-sans">
                <th className="py-3 px-6">USER</th>
                <th className="py-3 px-4">EMAIL</th>
                <th className="py-3 px-4">ROLE</th>
                <th className="py-3 px-4">STATUS</th>
                <th className="py-3 px-4">API ACCESS</th>
                <th className="py-3 px-6 text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredUsers.map((u) => (
                <tr key={u.id} className="hover:bg-gray-50/80 transition-colors">
                  <td className="py-3.5 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#111827] text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
                        {u.initials}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{u.name}</p>
                        <p className="text-[11px] text-gray-400">{u.title}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-gray-600">{u.email}</td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                        u.role === 'ROLE_ADMIN'
                          ? 'bg-purple-50 text-purple-700 border-purple-200'
                          : u.role === 'ROLE_DATA_MANAGER'
                          ? 'bg-blue-50 text-blue-700 border-blue-200'
                          : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      }`}
                    >
                      {u.role === 'ROLE_ADMIN' && <ShieldCheck className="w-3 h-3" />}
                      {u.role === 'ROLE_DATA_MANAGER' && <Database className="w-3 h-3" />}
                      {u.role === 'ROLE_ANALYST' && <TrendingUp className="w-3 h-3" />}
                      <span>{u.roleLabel}</span>
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                        u.status === 'Active'
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      {u.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    {u.apiAccess ? (
                      <span className="text-emerald-700 text-xs font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Enabled</span>
                      </span>
                    ) : (
                      <span className="text-gray-400 text-xs">—</span>
                    )}
                  </td>
                  <td className="py-3.5 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleOpenEdit(u)}
                        className="p-1.5 rounded-lg border border-gray-200 text-gray-600 hover:text-black hover:bg-gray-50"
                        title="Edit user"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => toggleUserStatus(u.id)}
                        className={`px-2 py-1 rounded-lg text-xs font-semibold border ${
                          u.status === 'Active'
                            ? 'text-gray-600 border-gray-200 hover:bg-gray-50'
                            : 'text-emerald-600 border-emerald-200 hover:bg-emerald-50'
                        }`}
                      >
                        {u.status === 'Active' ? 'Deactivate' : 'Activate'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Add New User */}
      <Modal
        isOpen={isAddUserOpen}
        onClose={() => setIsAddUserOpen(false)}
        title="Add New User Account"
        subtitle="Provision access for Analyst, Data Manager or Administrator."
        footer={
          <>
            <Button variant="outline" onClick={() => setIsAddUserOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSaveAdd}>
              Create User
            </Button>
          </>
        }
      >
        <form onSubmit={handleSaveAdd} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Rachel Green"
              required
              className="w-full border border-gray-200 px-3.5 py-2 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-black"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. rachel@marketlens.io"
              required
              className="w-full border border-gray-200 px-3.5 py-2 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-black"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Job Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Risk Analyst"
              required
              className="w-full border border-gray-200 px-3.5 py-2 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-black"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">System Role</label>
            <select
              value={role}
              onChange={(e: any) => setRole(e.target.value)}
              className="w-full border border-gray-200 px-3.5 py-2 rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:ring-1 focus:ring-black"
            >
              <option value="ROLE_ANALYST">Market Analyst (ROLE_ANALYST)</option>
              <option value="ROLE_DATA_MANAGER">Data Manager (ROLE_DATA_MANAGER)</option>
              <option value="ROLE_ADMIN">System Administrator (ROLE_ADMIN)</option>
            </select>
          </div>

          <label className="flex items-center gap-2 text-xs text-gray-700 cursor-pointer pt-2">
            <input
              type="checkbox"
              checked={apiAccess}
              onChange={(e) => setApiAccess(e.target.checked)}
              className="w-4 h-4 text-black rounded focus:ring-black"
            />
            <span className="font-medium">Grant API Access / Developer Token Permissions</span>
          </label>
        </form>
      </Modal>

      {/* Modal: Edit User */}
      <Modal
        isOpen={!!editingUser}
        onClose={() => setEditingUser(null)}
        title="Edit User Permissions & Role"
        subtitle="Update role assignment or developer credentials status."
        footer={
          <>
            <Button variant="outline" onClick={() => setEditingUser(null)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSaveEdit}>
              Save Changes
            </Button>
          </>
        }
      >
        <form onSubmit={handleSaveEdit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full border border-gray-200 px-3.5 py-2 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-black"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-gray-200 px-3.5 py-2 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-black"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Job Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full border border-gray-200 px-3.5 py-2 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-black"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">System Role</label>
            <select
              value={role}
              onChange={(e: any) => setRole(e.target.value)}
              className="w-full border border-gray-200 px-3.5 py-2 rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:ring-1 focus:ring-black"
            >
              <option value="ROLE_ANALYST">Market Analyst (ROLE_ANALYST)</option>
              <option value="ROLE_DATA_MANAGER">Data Manager (ROLE_DATA_MANAGER)</option>
              <option value="ROLE_ADMIN">System Administrator (ROLE_ADMIN)</option>
            </select>
          </div>

          <label className="flex items-center gap-2 text-xs text-gray-700 cursor-pointer pt-2">
            <input
              type="checkbox"
              checked={apiAccess}
              onChange={(e) => setApiAccess(e.target.checked)}
              className="w-4 h-4 text-black rounded focus:ring-black"
            />
            <span className="font-medium">Grant API Access / Developer Token Permissions</span>
          </label>
        </form>
      </Modal>
    </div>
  );
};
