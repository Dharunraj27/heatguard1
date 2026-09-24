import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { StatusBadge } from '../common/StatusBadge';
import { DataFreshness } from '../common/DataFreshness';
import { BatteryIndicator } from '../common/BatteryIndicator';
import { Search, ExternalLink, SlidersHorizontal, WifiOff } from 'lucide-react';

interface LiveWorkerTableProps {
  filterStatus?: string;
  onFilterStatusChange?: (status: string) => void;
}

export const LiveWorkerTable: React.FC<LiveWorkerTableProps> = ({
  filterStatus = 'all',
  onFilterStatusChange
}) => {
  const { workers, selectedSiteId, setSelectedWorkerId, navigate } = useApp();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [internalStatusFilter, setInternalStatusFilter] = useState<string>('all');

  const activeStatusFilter = filterStatus !== 'all' ? filterStatus : internalStatusFilter;

  const handleStatusClick = (st: string) => {
    if (onFilterStatusChange) {
      onFilterStatusChange(st);
    } else {
      setInternalStatusFilter(st);
    }
  };

  const filteredWorkers = workers.filter(w => {
    // Site filter
    if (selectedSiteId !== 'all' && w.siteId !== selectedSiteId) return false;

    // Status filter
    if (activeStatusFilter !== 'all') {
      if (activeStatusFilter === 'CONNECTED') {
        if (w.status === 'NO_DATA') return false;
      } else if (activeStatusFilter === 'SOS' || activeStatusFilter === 'EMERGENCY') {
        if (w.status !== 'HIGH_RISK' && w.status !== 'EMERGENCY') return false;
      } else if (activeStatusFilter === 'NO_DATA' || activeStatusFilter === 'Offline') {
        if (w.status !== 'NO_DATA') return false;
      } else if (w.status !== activeStatusFilter) {
        return false;
      }
    }

    // Search term
    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase();
      const matchName = w.name.toLowerCase().includes(term);
      const matchCode = w.code.toLowerCase().includes(term);
      const matchRole = w.role.toLowerCase().includes(term);
      const matchDevice = w.deviceId.toLowerCase().includes(term);
      if (!matchName && !matchCode && !matchRole && !matchDevice) return false;
    }

    return true;
  });

  const handleRowClick = (workerId: string) => {
    setSelectedWorkerId(workerId);
    navigate(`/manager/workers/${workerId}`);
  };

  return (
    <div id="live-worker-roster" className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-md space-y-4 scroll-mt-24">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-bold text-white tracking-wider uppercase font-mono flex items-center gap-2">
            <span>Live Worker Monitoring Roster</span>
            {activeStatusFilter !== 'all' && (
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 uppercase">
                FILTER: {activeStatusFilter.replace('_', ' ')} ({filteredWorkers.length})
              </span>
            )}
          </h3>
          <p className="text-xs text-slate-400">
            Real-time sensor telemetry, personal baseline status, & battery health
          </p>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Status Filter Pills */}
          <div className="flex items-center gap-1 p-1 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono">
            {['all', 'CONNECTED', 'NORMAL', 'CAUTION', 'HIGH_RISK', 'SOS', 'NO_DATA'].map((st) => (
              <button
                key={st}
                onClick={() => handleStatusClick(st)}
                className={`px-2.5 py-1 rounded-lg transition-all font-semibold uppercase ${
                  activeStatusFilter === st
                    ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {st === 'all' ? 'ALL' : st.replace('_', ' ')}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-44">
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-2.5" />
            <input
              type="text"
              placeholder="Filter worker..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-2.5 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono"
            />
          </div>
        </div>
      </div>

      {/* Table Component */}
      <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/40">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-950/80 text-[11px] font-mono text-slate-400 uppercase tracking-wider">
              <th className="py-3 px-4">Worker</th>
              <th className="py-3 px-4">Site & Role</th>
              <th className="py-3 px-4">Device</th>
              <th className="py-3 px-4">Freshness</th>
              <th className="py-3 px-4">Heart Rate</th>
              <th className="py-3 px-4">SpO₂</th>
              <th className="py-3 px-4">Skin Temp</th>
              <th className="py-3 px-4">Environment</th>
              <th className="py-3 px-4">Risk State</th>
              <th className="py-3 px-4">Battery</th>
              <th className="py-3 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 font-mono">
            {filteredWorkers.length === 0 ? (
              <tr>
                <td colSpan={11} className="text-center py-8 text-slate-500">
                  No workers match current filter criteria.
                </td>
              </tr>
            ) : (
              filteredWorkers.map((w) => {
                const isOffline = w.status === 'NO_DATA';

                return (
                  <tr
                    key={w.id}
                    onClick={() => handleRowClick(w.id)}
                    className="hover:bg-slate-900/80 cursor-pointer transition-colors group"
                  >
                    {/* Worker Code & Name */}
                    <td className="py-3 px-4">
                      <div className="font-bold text-white group-hover:text-cyan-400 transition-colors">
                        {w.name}
                      </div>
                      <span className="text-[10px] text-cyan-400 font-semibold">{w.code}</span>
                    </td>

                    {/* Site & Role */}
                    <td className="py-3 px-4">
                      <div className="text-slate-300 font-sans font-medium">{w.role}</div>
                      <span className="text-[10px] text-slate-500 font-mono">{w.siteName}</span>
                    </td>

                    {/* Device ID */}
                    <td className="py-3 px-4 text-slate-400 text-[11px]">
                      {w.deviceId}
                    </td>

                    {/* Data Freshness */}
                    <td className="py-3 px-4">
                      <DataFreshness lastUpdate={w.lastUpdate} isStale={isOffline} />
                    </td>

                    {/* HR */}
                    <td className="py-3 px-4 font-extrabold text-slate-200">
                      {isOffline ? '—' : `${w.telemetry.heartRate} BPM`}
                    </td>

                    {/* SpO2 */}
                    <td className="py-3 px-4 text-slate-300">
                      {isOffline ? '—' : `${w.telemetry.spo2}%`}
                    </td>

                    {/* Skin Temp */}
                    <td className="py-3 px-4 text-slate-300">
                      {isOffline ? '—' : `${w.telemetry.skinTemp}°C`}
                    </td>

                    {/* Env */}
                    <td className="py-3 px-4 text-slate-400 text-[11px]">
                      {isOffline ? '—' : `${w.telemetry.ambientTemp}°C / ${w.telemetry.humidity}% RH`}
                    </td>

                    {/* Risk State */}
                    <td className="py-3 px-4">
                      <StatusBadge status={w.status} size="sm" />
                    </td>

                    {/* Battery */}
                    <td className="py-3 px-4">
                      <BatteryIndicator level={w.telemetry.battery} size="sm" />
                    </td>

                    {/* Action */}
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRowClick(w.id);
                        }}
                        className="p-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-cyan-400 hover:bg-slate-800 transition-colors"
                        title="View Worker Telemetry Details"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
