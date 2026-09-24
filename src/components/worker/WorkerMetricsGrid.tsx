import React from 'react';
import type { TelemetryReading } from '../../types/heatguard';
import { MetricCard } from '../common/MetricCard';
import { Heart, Activity, Thermometer, Sun, Battery, Gauge } from 'lucide-react';

interface WorkerMetricsGridProps {
  telemetry: TelemetryReading;
  isStale?: boolean;
}

export const WorkerMetricsGrid: React.FC<WorkerMetricsGridProps> = ({ telemetry, isStale = false }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <MetricCard
        label="Heart Rate"
        value={isStale ? '—' : telemetry.heartRate}
        unit="BPM"
        icon={Heart}
        status={telemetry.heartRate > 110 ? 'HIGH_RISK' : telemetry.heartRate > 95 ? 'CAUTION' : 'NORMAL'}
        trend={telemetry.heartRate > 95 ? 'up' : 'stable'}
        trendText={telemetry.heartRate > 95 ? '+18 BPM vs ref' : 'Nominal range'}
        signalQuality={telemetry.signalQuality}
        timestamp={telemetry.timestamp}
      />

      <MetricCard
        label="Blood Oxygen (SpO₂)"
        value={isStale ? '—' : telemetry.spo2}
        unit="%"
        icon={Gauge}
        status={telemetry.spo2 < 95 ? 'CAUTION' : 'NORMAL'}
        trend="stable"
        trendText="Healthy saturation"
        signalQuality={telemetry.signalQuality}
        timestamp={telemetry.timestamp}
      />

      <MetricCard
        label="Skin Temperature"
        value={isStale ? '—' : telemetry.skinTemp}
        unit="°C"
        icon={Thermometer}
        status={telemetry.skinTemp > 35.0 ? 'HIGH_RISK' : telemetry.skinTemp > 34.4 ? 'CAUTION' : 'NORMAL'}
        trend={telemetry.skinTemp > 34.4 ? 'up' : 'stable'}
        trendText={telemetry.skinTemp > 34.4 ? '+1.2°C vs ref' : 'Thermal nominal'}
        signalQuality={telemetry.signalQuality}
        timestamp={telemetry.timestamp}
      />

      <MetricCard
        label="Activity Level"
        value={isStale ? '—' : telemetry.activity}
        icon={Activity}
        status={telemetry.activity === 'HEAVY' || telemetry.activity === 'EXTREME' ? 'CAUTION' : 'NORMAL'}
        trend={telemetry.activity === 'HEAVY' ? 'up' : 'stable'}
        trendText={`${telemetry.activity} physical strain`}
        timestamp={telemetry.timestamp}
      />

      <MetricCard
        label="Site Environment"
        value={isStale ? '—' : `${telemetry.ambientTemp}°C`}
        unit={`${telemetry.humidity}% RH`}
        icon={Sun}
        status={telemetry.ambientTemp > 35 ? 'CAUTION' : 'NORMAL'}
        trend="up"
        trendText="Micro-climate heat load"
        timestamp={telemetry.timestamp}
      />

      <MetricCard
        label="Wristband Battery"
        value={isStale ? '—' : telemetry.battery}
        unit="%"
        icon={Battery}
        status={telemetry.battery < 20 ? 'CAUTION' : 'NORMAL'}
        trend="stable"
        trendText="ESP32 LiPo Power"
        timestamp={telemetry.timestamp}
      />
    </div>
  );
};
