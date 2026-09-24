import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, Bell, Clock, MapPin, Cpu, HelpCircle } from 'lucide-react';
import { PageGuideModal } from '../common/PageGuideModal';

interface TopbarProps {
  title?: string;
  onSearch?: (term: string) => void;
}

export const Topbar: React.FC<TopbarProps> = ({ title, onSearch }) => {
  const {
    isSidebarOpen,
    sites,
    selectedSiteId,
    setSelectedSiteId,
    alerts,
    user,
    role,
    navigate,
    currentRoute
  } = useApp();

  const [time, setTime] = useState<string>(new Date().toTimeString().split(' ')[0]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isGuideOpen, setGuideOpen] = useState<boolean>(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toTimeString().split(' ')[0]);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const activeAlertsCount = alerts.filter(a => a.status === 'ACTIVE').length;

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchTerm(val);
    if (onSearch) onSearch(val);
  };

  const getPageTitle = () => {
    if (title) return title;
    switch (currentRoute) {
      case '/manager/dashboard':
        return 'Site Safety Command Center';
      case '/manager/workers':
        return 'Worker Safety Roster';
      case '/manager/alerts':
        return 'Attention & Priority Alerts';
      case '/manager/analytics':
        return 'Safety & Thermal Analytics';
      case '/manager/devices':
        return 'Edge Hardware & Devices';
      case '/manager/profile':
        return 'Manager Profile';
      case '/worker/dashboard':
        return 'My Safety Overview';
      case '/worker/calibration':
        return 'Personal Baseline Calibration';
      case '/worker/monitoring':
        return 'Live Telemetry Monitor';
      case '/worker/trends':
        return 'My Shift Trends';
      case '/worker/alerts':
        return 'My Personal Alerts';
      case '/worker/device':
        return 'My Wearable Device';
      case '/worker/profile':
        return 'My Account Profile';
      case '/worker/sos':
        return 'Emergency SOS Panic Screen';
      case '/admin/users':
        return 'Admin Access Directory';
      default:
        return 'HEATGUARD Safety System';
    }
  };

  const getRoleBadgeStyle = () => {
    if (role === 'ADMIN') return 'bg-purple-500/10 text-purple-400 border-purple-500/30';
    if (role === 'WORKER') return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
    return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30';
  };

  return (
    <>
      <header
        className={`fixed top-0 right-0 z-30 h-16 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 flex items-center justify-between px-4 sm:px-6 transition-all duration-300 ${
          isSidebarOpen ? 'left-64' : 'left-20'
        }`}
      >
        {/* Left: Title, Logo & Role Tag */}
        <div className="flex items-center gap-3 min-w-0">
          <img
            src="/logo.jpeg"
            alt="HEATGUARD Logo"
            className="w-7 h-7 rounded-lg object-cover border border-cyan-500/40 shrink-0"
          />
          <h2 className="text-sm sm:text-base font-extrabold text-white tracking-tight font-mono truncate flex items-center gap-2">
            <span>{getPageTitle()}</span>
            <span className={`text-[10px] font-mono px-2 py-0.5 rounded border hidden sm:inline-block ${getRoleBadgeStyle()}`}>
              {role.replace('_', ' ')}
            </span>
          </h2>

          {/* Site Selector (Only for Managers & Admins) */}
          {role !== 'WORKER' && (
            <div className="hidden lg:flex items-center gap-1.5 pl-3 border-l border-slate-800">
              <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <select
                value={selectedSiteId}
                onChange={(e) => setSelectedSiteId(e.target.value)}
                className="bg-slate-900 text-xs text-slate-200 font-mono border border-slate-800 rounded-lg px-2 py-1 focus:outline-none focus:border-cyan-500"
              >
                <option value="all">ALL SITES</option>
                {sites.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name.split('—')[0].toUpperCase()}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Search */}
          {role !== 'WORKER' && (
            <div className="relative hidden md:block w-36 lg:w-48">
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-2.5" />
              <input
                type="text"
                placeholder="Search worker..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full bg-slate-900/90 border border-slate-800 rounded-xl pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors font-mono"
              />
            </div>
          )}

          {/* Page Guide Button */}
          <button
            onClick={() => setGuideOpen(true)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-900 border border-cyan-500/40 text-cyan-400 hover:bg-slate-800 hover:border-cyan-400 transition-all font-mono text-xs font-bold"
            title="Open Interactive Page Guide"
          >
            <HelpCircle className="w-4 h-4" />
            <span className="hidden sm:inline">GUIDE</span>
          </button>

          {/* Edge AI Live Indicator */}
          <div className="hidden xl:flex items-center gap-1.5 px-2 py-1 rounded-lg bg-slate-900/90 border border-slate-800 text-[11px] font-mono">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-emerald-400 font-bold">EDGE ONLINE</span>
          </div>

          {/* Clock */}
          <div className="flex items-center gap-1.5 font-mono text-xs text-slate-300 bg-slate-900/90 px-2.5 py-1.5 rounded-xl border border-slate-800">
            <Clock className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span>{time}</span>
          </div>

          {/* Notification Bell */}
          <button
            onClick={() => navigate(role === 'WORKER' ? '/worker/alerts' : '/manager/alerts')}
            className="relative p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-colors"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            {activeAlertsCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white font-mono text-[9px] font-bold flex items-center justify-center animate-pulse">
                {activeAlertsCount}
              </span>
            )}
          </button>

          {/* User Profile */}
          <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
            <img
              src={user.avatarUrl}
              alt={user.name}
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover border border-cyan-500/40 shrink-0"
            />
            <div className="hidden xl:block text-left">
              <span className="text-xs font-bold text-slate-200 block leading-none truncate max-w-[100px]">
                {user.name}
              </span>
              <span className="text-[10px] text-cyan-400 font-mono block mt-0.5 uppercase">
                {role.replace('_', ' ')}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Page Guide Modal */}
      <PageGuideModal
        isOpen={isGuideOpen}
        onClose={() => setGuideOpen(false)}
        currentRoute={currentRoute}
      />
    </>
  );
};
