import React, { useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Sidebar } from './components/layout/Sidebar';
import { Topbar } from './components/layout/Topbar';
import { DemoControlPanel } from './components/layout/DemoControlPanel';
import { ToastContainer } from './components/common/Toast';

// Pages
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { ManagerDashboardPage } from './pages/ManagerDashboardPage';
import { ManagerWorkersPage } from './pages/ManagerWorkersPage';
import { ManagerWorkerDetailPage } from './pages/ManagerWorkerDetailPage';
import { ManagerAlertsPage } from './pages/ManagerAlertsPage';
import { ManagerAnalyticsPage } from './pages/ManagerAnalyticsPage';
import { ManagerDevicesPage } from './pages/ManagerDevicesPage';
import { ManagerProfilePage } from './pages/ManagerProfilePage';
import { WorkerDashboardPage } from './pages/WorkerDashboardPage';
import { WorkerCalibrationPage } from './pages/WorkerCalibrationPage';
import { WorkerMonitoringPage } from './pages/WorkerMonitoringPage';
import { WorkerTrendsPage } from './pages/WorkerTrendsPage';
import { WorkerAlertsPage } from './pages/WorkerAlertsPage';
import { WorkerDevicePage } from './pages/WorkerDevicePage';
import { WorkerProfilePage } from './pages/WorkerProfilePage';
import { WorkerSosPage } from './pages/WorkerSosPage';
import { AdminUsersPage } from './pages/AdminUsersPage';

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
      <AppRouter />
    </AppProvider>
  );
};

export default App;
