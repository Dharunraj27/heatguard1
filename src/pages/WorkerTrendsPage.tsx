import React from 'react';
import { useApp } from '../context/AppContext';
import { TelemetryChart } from '../components/charts/TelemetryChart';

export const WorkerTrendsPage: React.FC = () => {
  const { workers, user } = useApp();
  const worker = workers.find(w => w.id === (user.workerId || 'W001')) || workers[0];

  return (
    <div className="space-y-6 pb-24">
      <TelemetryChart title="Historical Telemetry Trends" workerCode={worker.code} />
    </div>
  );
};
