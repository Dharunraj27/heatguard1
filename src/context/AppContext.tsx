import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Worker, Alert, WorkerDevice, Site, EdgeAiNode, Role, User, DemoScenario } from '../types/heatguard';
import { mockService } from '../services/mockService';
import { INITIAL_USERS } from '../data/initialData';

interface ToastItem {
  id: string;
  type: 'info' | 'warning' | 'error' | 'success';
  message: string;
}

interface AppContextType {
  user: User;
  role: Role;
  setRole: (role: Role) => void;
  workers: Worker[];
  alerts: Alert[];
  devices: WorkerDevice[];
  sites: Site[];
  edgeNode: EdgeAiNode;
  selectedWorkerId: string;
  setSelectedWorkerId: (id: string) => void;
  selectedSiteId: string;
  setSelectedSiteId: (siteId: string) => void;
  demoMode: boolean;
  setDemoMode: (val: boolean) => void;
  simulating: boolean;
  setSimulating: (val: boolean) => void;
  triggerDemoScenario: (scenario: DemoScenario, targetWorkerId?: string) => void;
  acknowledgeAlert: (alertId: string, note?: string) => void;
  triggerSOS: (workerId?: string) => void;
  toasts: ToastItem[];
  addToast: (type: 'info' | 'warning' | 'error' | 'success', message: string) => void;
  removeToast: (id: string) => void;
  currentRoute: string;
  navigate: (route: string) => void;
  isSidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [role, setRoleState] = useState<Role>('SITE_MANAGER');
  const [user, setUser] = useState<User>(INITIAL_USERS[0]); // Default manager
  const [workers, setWorkers] = useState<Worker[]>(mockService.getWorkers());
  const [alerts, setAlerts] = useState<Alert[]>(mockService.getAlerts());
  const [devices, setDevices] = useState<WorkerDevice[]>(mockService.getDevices());
  const [sites] = useState<Site[]>(mockService.getSites());
  const [edgeNode, setEdgeNode] = useState<EdgeAiNode>(mockService.getEdgeNode());

  const [selectedWorkerId, setSelectedWorkerId] = useState<string>('W001');
  const [selectedSiteId, setSelectedSiteId] = useState<string>('all');

  const [demoMode, setDemoMode] = useState<boolean>(true);
  const [simulating, setSimulating] = useState<boolean>(true);
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [currentRoute, setCurrentRoute] = useState<string>('/manager/dashboard');
  const [isSidebarOpen, setSidebarOpen] = useState<boolean>(true);

  // Sync with MockService
  useEffect(() => {
    const unsubscribe = mockService.subscribe(() => {
      setWorkers(mockService.getWorkers());
      setAlerts(mockService.getAlerts());
      setDevices(mockService.getDevices());
      setEdgeNode(mockService.getEdgeNode());
    });
    return unsubscribe;
  }, []);

  // Continuous Telemetry Timer (every 3 seconds when simulating)
  useEffect(() => {
    if (!simulating) return;
    const interval = setInterval(() => {
      mockService.simulateTelemetryTick();
    }, 3000);
    return () => clearInterval(interval);
  }, [simulating]);

  // Handle role changes
  const setRole = (newRole: Role) => {
    setRoleState(newRole);
    if (newRole === 'WORKER') {
      const wUser = INITIAL_USERS.find(u => u.role === 'WORKER') || INITIAL_USERS[1];
      setUser(wUser);
      setSelectedWorkerId(wUser.workerId || 'W001');
      setCurrentRoute('/worker/dashboard');
    } else if (newRole === 'SITE_MANAGER') {
      setUser(INITIAL_USERS[0]);
      setCurrentRoute('/manager/dashboard');
    } else if (newRole === 'ADMIN') {
      setUser(INITIAL_USERS[2]);
      setCurrentRoute('/admin/users');
    }
    addToast('info', `Switched view role to ${newRole}`);
  };

  const addToast = (type: 'info' | 'warning' | 'error' | 'success', message: string) => {
    const id = Date.now().toString();
    setToasts(prev => [...prev.slice(-4), { id, type, message }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const navigate = (route: string) => {
    setCurrentRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const triggerDemoScenario = (scenario: DemoScenario, targetWorkerId: string = 'W002') => {
    mockService.triggerDemoScenario(scenario, targetWorkerId);

    if (scenario === 'CAUTION') {
      addToast('warning', `Scenario: Worker ${targetWorkerId} entered CAUTION thermal load.`);
    } else if (scenario === 'HIGH_RISK') {
      addToast('error', `Scenario: Worker ${targetWorkerId} detected HIGH RISK heat strain!`);
    } else if (scenario === 'SOS') {
      addToast('error', `EMERGENCY: Worker ${targetWorkerId} triggered MANUAL SOS DISTRESS!`);
    } else if (scenario === 'OFFLINE') {
      addToast('info', `Scenario: Worker ${targetWorkerId} device disconnected (STALE DATA).`);
    } else if (scenario === 'RESET') {
      addToast('success', `Scenario: Reset to nominal 24-worker site state.`);
    }
  };

  const acknowledgeAlert = (alertId: string, note?: string) => {
    mockService.acknowledgeAlert(alertId, note, user.name);
    addToast('success', `Alert ${alertId} acknowledged by ${user.name}`);
  };

  const triggerSOS = (workerId?: string) => {
    const wId = workerId || user.workerId || 'W001';
    mockService.triggerWorkerSOS(wId);
    addToast('error', `EMERGENCY ALERT BROADCAST: Worker SOS activated for ${wId}!`);
  };

  return (
    <AppContext.Provider
      value={{
        user,
        role,
        setRole,
        workers,
        alerts,
        devices,
        sites,
        edgeNode,
        selectedWorkerId,
        setSelectedWorkerId,
        selectedSiteId,
        setSelectedSiteId,
        demoMode,
        setDemoMode,
        simulating,
        setSimulating,
        triggerDemoScenario,
        acknowledgeAlert,
        triggerSOS,
        toasts,
        addToast,
        removeToast,
        currentRoute,
        navigate,
        isSidebarOpen,
        setSidebarOpen
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
