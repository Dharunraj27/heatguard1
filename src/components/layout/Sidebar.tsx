import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Shield,
  LayoutDashboard,
  Users,
  AlertOctagon,
  LineChart,
  HardDrive,
  User,
  Flame,
  Activity,
  Sliders,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Cpu,
  MapPin,
  Lock
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { role, currentRoute, navigate, user, isSidebarOpen, setSidebarOpen, edgeNode } = useApp();

  const getNavItems = () => {
    if (role === 'WORKER') {
      return [
        { label: 'My Safety Dashboard', route: '/worker/dashboard', icon: LayoutDashboard },
        { label: 'Baseline Calibration', route: '/worker/calibration', icon: Sliders },
        { label: 'Live Telemetry', route: '/worker/monitoring', icon: Activity },
        { label: 'Shift Trends', route: '/worker/trends', icon: LineChart },
        { label: 'Personal Alerts', route: '/worker/alerts', icon: AlertOctagon },
        { label: 'My Wearable Device', route: '/worker/device', icon: HardDrive },
        { label: 'My Profile', route: '/worker/profile', icon: User },
        { label: 'Emergency SOS', route: '/worker/sos', icon: Flame, isEmergency: true }
      ];
    }

    if (role === 'SITE_MANAGER') {
      return [
        { label: 'Command Center', route: '/manager/dashboard', icon: LayoutDashboard },
        { label: 'Workers Roster', route: '/manager/workers', icon: Users },
        { label: 'Attention Alerts', route: '/manager/alerts', icon: AlertOctagon },
        { label: 'Safety Analytics', route: '/manager/analytics', icon: LineChart },
        { label: 'Edge Hardware', route: '/manager/devices', icon: HardDrive },
        { label: 'Manager Profile', route: '/manager/profile', icon: User }
      ];
    }

    // ADMIN
    return [
      { label: 'Admin Directory', route: '/admin/users', icon: Users },
      { label: 'Workers Registry', route: '/admin/workers', icon: Users },
      { label: 'Hardware Devices', route: '/admin/devices', icon: HardDrive },
      { label: 'Site Boundaries', route: '/admin/sites', icon: MapPin },
      { label: 'Access Control', route: '/admin/access', icon: Lock },
      { label: 'System Settings', route: '/admin/settings', icon: Sliders }
    ];
  };

  const navItems = getNavItems();

  const getRoleLabel = () => {
    if (role === 'WORKER') return { label: 'WORKER (PERSONAL)', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30' };
    if (role === 'SITE_MANAGER') return { label: 'SITE MANAGER', color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30' };
    return { label: 'SYSTEM ADMIN', color: 'text-purple-400 bg-purple-500/10 border-purple-500/30' };
  };

  const roleInfo = getRoleLabel();

  return (
    <aside
      className={`fixed top-0 left-0 bottom-0 z-40 flex flex-col bg-slate-950/95 border-r border-slate-800/80 backdrop-blur-xl transition-all duration-300 ${
        isSidebarOpen ? 'w-64' : 'w-20'
      }`}
    >
      {/* Brand Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-slate-800/80">
        <div
          onClick={() => navigate(role === 'WORKER' ? '/worker/dashboard' : '/manager/dashboard')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <img
            src="/logo.jpeg"
            alt="HEATGUARD Logo"
            className="w-8 h-8 rounded-xl object-cover shadow-lg glow-cyan border border-cyan-500/40 group-hover:scale-105 transition-transform shrink-0"
          />
          {isSidebarOpen && (
            <div>
              <h1 className="text-base font-extrabold tracking-wider text-white font-mono flex items-center gap-1.5">
                HEATGUARD
              </h1>
              <span className="text-[10px] font-mono text-cyan-400 font-semibold tracking-widest block -mt-1">
                EDGE AI SAFETY
              </span>
            </div>
          )}
        </div>

        <button
          onClick={() => setSidebarOpen(!isSidebarOpen)}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 transition-colors"
        >
          {isSidebarOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </button>
      </div>

      {/* Role Badge Indicator */}
      {isSidebarOpen && (
        <div className="p-3 px-4 bg-slate-900/60 border-b border-slate-800/60 flex items-center justify-between font-mono text-xs">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">ACTIVE ROLE:</span>
          <div className={`px-2.5 py-1 rounded border font-bold text-[10px] flex items-center gap-1.5 ${roleInfo.color}`}>
            <Lock className="w-3 h-3" />
            <span>{roleInfo.label}</span>
          </div>
        </div>
      )}

      {/* Navigation List */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-1">
        {navItems.map((item) => {
          const isActive = currentRoute === item.route;
          const IconComp = item.icon;

          return (
            <button
              key={item.route}
              onClick={() => navigate(item.route)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                item.isEmergency
                  ? isActive
                    ? 'bg-red-500/20 text-red-400 border border-red-500/50 glow-emergency'
                    : 'bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/30'
                  : isActive
                  ? 'bg-gradient-to-r from-cyan-500/15 to-blue-500/10 text-cyan-400 border border-cyan-500/30 shadow-md'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/80 border border-transparent'
              }`}
              title={!isSidebarOpen ? item.label : undefined}
            >
              <IconComp className={`w-4 h-4 shrink-0 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
              {isSidebarOpen && <span>{item.label}</span>}
            </button>
          );
        })}
      </nav>

      {/* Footer Edge Node & User Profile */}
      <div className="p-3 border-t border-slate-800/80 bg-slate-950/80 space-y-3">
        {/* Edge Status */}
        <div className="flex items-center gap-2.5 p-2 rounded-lg bg-slate-900/80 border border-slate-800">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <Cpu className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
          {isSidebarOpen && (
            <div className="flex-1 min-w-0">
              <span className="text-[11px] font-mono font-bold text-slate-200 block truncate">
                {edgeNode.hardware}
              </span>
              <span className="text-[10px] font-mono text-emerald-400 font-semibold block">
                EDGE NODE ONLINE
              </span>
            </div>
          )}
        </div>

        {/* User Card & Logout */}
        {isSidebarOpen && (
          <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900/60 border border-slate-800/80">
            <div className="flex items-center gap-2 min-w-0">
              <img
                src={user.avatarUrl}
                alt={user.name}
                className="w-7 h-7 rounded-full object-cover border border-slate-700 shrink-0"
              />
              <div className="min-w-0">
                <span className="text-xs font-bold text-slate-200 block truncate">{user.name}</span>
                <span className="text-[10px] text-slate-400 block uppercase font-mono">{role.replace('_', ' ')}</span>
              </div>
            </div>
            <button
              onClick={() => navigate('/login')}
              className="text-slate-400 hover:text-red-400 p-1.5 rounded-lg hover:bg-slate-800 transition-colors"
              title="Switch Account / Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </aside>
  );
};
