import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { UserRole } from '@/types';
import { AppLayout } from '@/components/layout/AppLayout';

// Auth Pages
import { LoginPage } from '@/features/auth/LoginPage';
import { ForgotPasswordPage } from '@/features/auth/ForgotPasswordPage';
import { ResetPasswordPage } from '@/features/auth/ResetPasswordPage';
import { SessionExpiredPage } from '@/features/auth/SessionExpiredPage';

// Analyst Pages
import { DashboardPage } from '@/features/dashboard/DashboardPage';
import { MarketsPage } from '@/features/market/MarketsPage';
import { SingleStockPage } from '@/features/market/SingleStockPage';
import { PortfolioPage } from '@/features/portfolio/PortfolioPage';
import { WatchlistPage } from '@/features/watchlist/WatchlistPage';
import { NewsPage } from '@/features/news/NewsPage';
import { AIAnalystPage } from '@/features/ai/AIAnalystPage';
import { APIAccessPage } from '@/features/api-access/APIAccessPage';

// Data Manager Pages
import { DataManagementPage } from '@/features/data-management/DataManagementPage';
import { DataImportPage } from '@/features/data-import/DataImportPage';
import { DataQualityPage } from '@/features/data-quality/DataQualityPage';

// Administrator Pages
import { UserManagementPage } from '@/features/admin/UserManagementPage';
import { SystemSettingsPage } from '@/features/admin/SystemSettingsPage';
import { AuditLogsPage } from '@/features/admin/AuditLogsPage';

// Helper function to get default landing route per role
export const getDefaultRouteForRole = (role?: UserRole): string => {
  switch (role) {
    case 'ROLE_ANALYST':
      return '/dashboard';
    case 'ROLE_DATA_MANAGER':
      return '/data-management';
    case 'ROLE_ADMIN':
      return '/admin/users';
    default:
      return '/dashboard';
  }
};

// Protected route wrapper
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

// Role guard wrapper
const RoleGuard: React.FC<{ allowedRoles: UserRole[]; children: React.ReactNode }> = ({
  allowedRoles,
  children,
}) => {
  const { user } = useAuth();

  if (!user || !allowedRoles.includes(user.role)) {
    // Redirect to the default route for the user's role
    return <Navigate to={getDefaultRouteForRole(user?.role)} replace />;
  }

  return <>{children}</>;
};

// Root redirect component
const RootRedirect: React.FC = () => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Navigate to={getDefaultRouteForRole(user?.role)} replace />;
};

// 404 Not Found Page
const NotFoundPage: React.FC = () => {
  const { user } = useAuth();
  const targetRoute = getDefaultRouteForRole(user?.role);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-6">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-2xl font-bold text-gray-500 mb-4">
        404
      </div>
      <h1 className="text-xl font-bold text-gray-900 mb-1">Page Not Found</h1>
      <p className="text-sm text-gray-500 max-w-sm mb-6">
        The requested screen or resource could not be found. Please check the URL or return to your dashboard.
      </p>
      <a
        href={targetRoute}
        className="px-4 py-2 bg-[#111827] text-white text-xs font-semibold rounded-lg hover:bg-black transition-colors"
      >
        Return to Dashboard
      </a>
    </div>
  );
};

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public Authentication Routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route path="/session-expired" element={<SessionExpiredPage />} />

      {/* Protected Application Routes inside AppLayout */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<RootRedirect />} />

        {/* Analyst Routes */}
        <Route
          path="dashboard"
          element={
            <RoleGuard allowedRoles={['ROLE_ANALYST', 'ROLE_ADMIN']}>
              <DashboardPage />
            </RoleGuard>
          }
        />
        <Route
          path="markets"
          element={
            <RoleGuard allowedRoles={['ROLE_ANALYST', 'ROLE_ADMIN']}>
              <MarketsPage />
            </RoleGuard>
          }
        />
        <Route
          path="markets/:symbol"
          element={
            <RoleGuard allowedRoles={['ROLE_ANALYST', 'ROLE_ADMIN']}>
              <SingleStockPage />
            </RoleGuard>
          }
        />
        <Route
          path="portfolio"
          element={
            <RoleGuard allowedRoles={['ROLE_ANALYST', 'ROLE_ADMIN']}>
              <PortfolioPage />
            </RoleGuard>
          }
        />
        <Route
          path="watchlist"
          element={
            <RoleGuard allowedRoles={['ROLE_ANALYST', 'ROLE_ADMIN']}>
              <WatchlistPage />
            </RoleGuard>
          }
        />
        <Route
          path="news"
          element={
            <RoleGuard allowedRoles={['ROLE_ANALYST', 'ROLE_ADMIN']}>
              <NewsPage />
            </RoleGuard>
          }
        />
        <Route
          path="ai-analyst"
          element={
            <RoleGuard allowedRoles={['ROLE_ANALYST', 'ROLE_ADMIN']}>
              <AIAnalystPage />
            </RoleGuard>
          }
        />
        <Route
          path="api-access/*"
          element={
            <RoleGuard allowedRoles={['ROLE_ANALYST', 'ROLE_ADMIN']}>
              <APIAccessPage />
            </RoleGuard>
          }
        />

        {/* Data Manager Routes */}
        <Route
          path="data-management"
          element={
            <RoleGuard allowedRoles={['ROLE_DATA_MANAGER', 'ROLE_ADMIN']}>
              <DataManagementPage />
            </RoleGuard>
          }
        />
        <Route
          path="data-import"
          element={
            <RoleGuard allowedRoles={['ROLE_DATA_MANAGER', 'ROLE_ADMIN']}>
              <DataImportPage />
            </RoleGuard>
          }
        />
        <Route
          path="data-quality"
          element={
            <RoleGuard allowedRoles={['ROLE_DATA_MANAGER', 'ROLE_ADMIN']}>
              <DataQualityPage />
            </RoleGuard>
          }
        />

        {/* Administrator Routes */}
        <Route
          path="admin/users"
          element={
            <RoleGuard allowedRoles={['ROLE_ADMIN']}>
              <UserManagementPage />
            </RoleGuard>
          }
        />
        <Route
          path="admin/settings"
          element={
            <RoleGuard allowedRoles={['ROLE_ADMIN']}>
              <SystemSettingsPage />
            </RoleGuard>
          }
        />
        <Route
          path="admin/audit"
          element={
            <RoleGuard allowedRoles={['ROLE_ADMIN']}>
              <AuditLogsPage />
            </RoleGuard>
          }
        />

        {/* 404 Catch-All in Layout */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>

      {/* Global Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
