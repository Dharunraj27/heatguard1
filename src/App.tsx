import React, { useEffect, Suspense, lazy } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Sidebar } from './components/layout/Sidebar';
import { Topbar } from './components/layout/Topbar';
import { DemoControlPanel } from './components/layout/DemoControlPanel';
import { ToastContainer } from './components/common/Toast';

const LandingPage = lazy(() => import('./pages/LandingPage').then((m) => ({ default: m.LandingPage })));
const LoginPage = lazy(() => import('./pages/LoginPage').then((m) => ({ default: m.LoginPage })));
const ManagerDashboardPage = lazy(() => import('./pages/ManagerDashboardPage').then((m) => ({ default: m.ManagerDashboardPage })));
const ManagerWorkersPage = lazy(() => import('./pages/ManagerWorkersPage').then((m) => ({ default: m.ManagerWorkersPage })));
const ManagerWorkerDetailPage = lazy(() => import('./pages/ManagerWorkerDetailPage').then((m) => ({ default: m.ManagerWorkerDetailPage })));
const ManagerAlertsPage = lazy(() => import('./pages/ManagerAlertsPage').then((m) => ({ default: m.ManagerAlertsPage })));
const ManagerAnalyticsPage = lazy(() => import('./pages/ManagerAnalyticsPage').then((m) => ({ default: m.ManagerAnalyticsPage })));
const ManagerDevicesPage = lazy(() => import('./pages/ManagerDevicesPage').then((m) => ({ default: m.ManagerDevicesPage })));
const ManagerProfilePage = lazy(() => import('./pages/ManagerProfilePage').then((m) => ({ default: m.ManagerProfilePage })));
const WorkerDashboardPage = lazy(() => import('./pages/WorkerDashboardPage').then((m) => ({ default: m.WorkerDashboardPage })));
const WorkerCalibrationPage = lazy(() => import('./pages/WorkerCalibrationPage').then((m) => ({ default: m.WorkerCalibrationPage })));
const WorkerMonitoringPage = lazy(() => import('./pages/WorkerMonitoringPage').then((m) => ({ default: m.WorkerMonitoringPage })));
const WorkerTrendsPage = lazy(() => import('./pages/WorkerTrendsPage').then((m) => ({ default: m.WorkerTrendsPage })));
const WorkerAlertsPage = lazy(() => import('./pages/WorkerAlertsPage').then((m) => ({ default: m.WorkerAlertsPage })));
const WorkerDevicePage = lazy(() => import('./pages/WorkerDevicePage').then((m) => ({ default: m.WorkerDevicePage })));
const WorkerProfilePage = lazy(() => import('./pages/WorkerProfilePage').then((m) => ({ default: m.WorkerProfilePage })));
const WorkerSosPage = lazy(() => import('./pages/WorkerSosPage').then((m) => ({ default: m.WorkerSosPage })));
const AdminUsersPage = lazy(() => import('./pages/AdminUsersPage').then((m) => ({ default: m.AdminUsersPage })));


const AppRouter: React.FC = () => {
  const { currentRoute, isSidebarOpen, role, navigate } = useApp();

  // Route protection guard
  useEffect(() => {
    if (role === 'WORKER' && (currentRoute.startsWith('/manager') || currentRoute.startsWith('/admin'))) {
      navigate('/worker/dashboard');
    } else if (role === 'SITE_MANAGER' && currentRoute.startsWith('/admin')) {
      navigate('/manager/dashboard');
    }
  }, [role, currentRoute, navigate]);

  // Full-screen pages
  if (currentRoute === '/' || currentRoute === '') {
    return <LandingPage />;
  }

  if (currentRoute === '/login') {
    return <LoginPage />;
  }

  // Determine page content
  const renderPage = () => {
    // WORKER ROLE RESTRICTIONS
    if (role === 'WORKER') {
      if (currentRoute === '/worker/calibration') return <WorkerCalibrationPage />;
      if (currentRoute === '/worker/monitoring') return <WorkerMonitoringPage />;
      if (currentRoute === '/worker/trends') return <WorkerTrendsPage />;
      if (currentRoute === '/worker/alerts') return <WorkerAlertsPage />;
      if (currentRoute === '/worker/device') return <WorkerDevicePage />;
      if (currentRoute === '/worker/profile') return <WorkerProfilePage />;
      if (currentRoute === '/worker/sos') return <WorkerSosPage />;
      return <WorkerDashboardPage />;
    }

    // SITE MANAGER ROLE
    if (role === 'SITE_MANAGER') {
      if (currentRoute === '/manager/workers') return <ManagerWorkersPage />;
      if (currentRoute.startsWith('/manager/workers/')) return <ManagerWorkerDetailPage />;
      if (currentRoute === '/manager/alerts') return <ManagerAlertsPage />;
      if (currentRoute === '/manager/analytics') return <ManagerAnalyticsPage />;
      if (currentRoute === '/manager/devices') return <ManagerDevicesPage />;
      if (currentRoute === '/manager/profile') return <ManagerProfilePage />;
      if (currentRoute.startsWith('/worker/')) {
        if (currentRoute === '/worker/calibration') return <WorkerCalibrationPage />;
        if (currentRoute === '/worker/monitoring') return <WorkerMonitoringPage />;
        if (currentRoute === '/worker/trends') return <WorkerTrendsPage />;
        if (currentRoute === '/worker/alerts') return <WorkerAlertsPage />;
        if (currentRoute === '/worker/device') return <WorkerDevicePage />;
        if (currentRoute === '/worker/profile') return <WorkerProfilePage />;
        if (currentRoute === '/worker/sos') return <WorkerSosPage />;
        return <WorkerDashboardPage />;
      }
      return <ManagerDashboardPage />;
    }

    // ADMIN ROLE
    if (role === 'ADMIN') {
      if (currentRoute === '/admin/users') return <AdminUsersPage />;
      if (currentRoute === '/admin/workers') return <ManagerWorkersPage />;
      if (currentRoute === '/admin/devices') return <ManagerDevicesPage />;
      if (currentRoute === '/admin/sites') return <AdminUsersPage />;
      if (currentRoute === '/admin/access') return <AdminUsersPage />;
      if (currentRoute === '/admin/settings') return <AdminUsersPage />;
      if (currentRoute === '/manager/workers') return <ManagerWorkersPage />;
      if (currentRoute.startsWith('/manager/workers/')) return <ManagerWorkerDetailPage />;
      if (currentRoute === '/manager/alerts') return <ManagerAlertsPage />;
      if (currentRoute === '/manager/analytics') return <ManagerAnalyticsPage />;
      if (currentRoute === '/manager/devices') return <ManagerDevicesPage />;
      if (currentRoute === '/manager/profile') return <ManagerProfilePage />;
      return <AdminUsersPage />;
    }

    // Fallback based on role
    return role === 'WORKER' ? <WorkerDashboardPage /> : <ManagerDashboardPage />;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-cyan-500 selection:text-slate-950">
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Content Area */}
      <div
        className={`transition-all duration-300 ${
          isSidebarOpen ? 'ml-64' : 'ml-20'
        }`}
      >
        {/* Topbar */}
        <Topbar />

        {/* Page Content */}
        <main className="pt-20 px-4 sm:px-6 pb-8">
          {renderPage()}
        </main>
      </div>

      {/* Demo Control Panel (fixed bottom center) */}
      <DemoControlPanel />

      {/* Toast Notifications */}
      <ToastContainer />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-300 font-mono">Loading...</div>}>
        <AppRouter />
      </Suspense>
    </AppProvider>
  );
};

export default App;
