import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { KpiCards } from '../components/manager/KpiCards';
import { WorkerSafetyOverview } from '../components/manager/WorkerSafetyOverview';
import { PriorityAlertsPanel } from '../components/manager/PriorityAlertsPanel';
import { LiveWorkerTable } from '../components/manager/LiveWorkerTable';

export const ManagerDashboardPage: React.FC = () => {
  const [safetyFilter, setSafetyFilter] = useState<string>('all');

  const handleKpiFilterSelect = (filterKey: string) => {
    setSafetyFilter(filterKey);
    setTimeout(() => {
      const el = document.getElementById('live-worker-roster');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 50);
  };

  return (
    <div className="space-y-6 pb-24 max-w-[1600px] mx-auto">
      {/* 6 Core KPI Summary Cards (Clickable) */}
      <KpiCards
        activeFilter={safetyFilter}
        onSelectFilter={handleKpiFilterSelect}
      />

      {/* Primary Command Grid: Worker Safety Breakdown Chart + Live Priority Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7">
          <WorkerSafetyOverview
            activeFilter={safetyFilter}
            onFilterChange={(f) => setSafetyFilter(f)}
          />
        </div>
        <div className="lg:col-span-5">
          <PriorityAlertsPanel />
        </div>
      </div>

      {/* Live Worker Telemetry & Monitoring Table */}
      <LiveWorkerTable
        filterStatus={safetyFilter}
        onFilterStatusChange={(f) => setSafetyFilter(f)}
      />
    </div>
  );
};
