export type RiskStatus = 'NORMAL' | 'CAUTION' | 'HIGH_RISK' | 'EMERGENCY' | 'NO_DATA';
export type Role = 'WORKER' | 'SITE_MANAGER' | 'ADMIN';
export type ActivityLevel = 'REST' | 'MODERATE' | 'HEAVY' | 'EXTREME';
export type CalibrationStatus = 'COMPLETED' | 'IN_PROGRESS' | 'PENDING' | 'NOT_STARTED';
export type AlertPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' | 'SOS';
export type AlertStatus = 'ACTIVE' | 'ACKNOWLEDGED' | 'RESOLVED';
export type ConnectionState = 'CONNECTED' | 'DISCONNECTED' | 'WEAK_SIGNAL';
export type DataFreshnessState = 'LIVE' | 'RECENT' | 'STALE' | 'OFFLINE';

export interface TelemetryReading {
  heartRate: number; // BPM
  spo2: number; // %
  skinTemp: number; // °C
  ambientTemp: number; // °C
  humidity: number; // % RH
  activity: ActivityLevel;
  signalQuality: number; // 0-100%
  battery: number; // 0-100%
  timestamp: string; // ISO or HH:MM:SS format
}

export interface PersonalBaseline {
  calibrationStatus: CalibrationStatus;
  createdAt: string;
  dataQuality: 'GOOD' | 'FAIR' | 'POOR';
  referenceHrMin: number;
  referenceHrMax: number;
  referenceSkinTempMin: number;
  referenceSkinTempMax: number;
  calibrationEnvironmentTemp: number;
  calibrationEnvironmentHumidity: number;
}

export interface RiskAssessment {
  state: RiskStatus;
  factors: string[];
  dataQuality: 'GOOD' | 'FAIR' | 'POOR';
  timestamp: string;
  model: string;
  processingNode: string;
  recommendation: string;
}

export interface WorkerDevice {
  id: string; // e.g. "HG-ESP32-001"
  workerId: string;
  workerName: string;
  firmwareVersion: string;
  batteryLevel: number;
  connectionState: ConnectionState;
  signalQuality: number;
  commMethod: 'LoRa' | 'Wi-Fi';
  edgeNodeId: string;
  lastSeen: string;
}

export interface Worker {
  id: string; // e.g. "W001"
  code: string; // "W001"
  name: string;
  siteId: string;
  siteName: string;
  role: string;
  shift: string;
  deviceId: string;
  status: RiskStatus;
  telemetry: TelemetryReading;
  baseline: PersonalBaseline;
  riskAssessment: RiskAssessment;
  lastUpdate: string;
}

export interface Alert {
  id: string;
  workerId: string;
  workerCode: string;
  workerName: string;
  siteId: string;
  priority: AlertPriority;
  eventType: string;
  message: string;
  timestamp: string;
  status: AlertStatus;
  riskState: RiskStatus;
  acknowledgedBy?: string;
  acknowledgedAt?: string;
  notes?: string;
}

export interface Site {
  id: string;
  name: string;
  location: string;
  totalWorkers: number;
  activeShift: string;
  ambientTemp: number;
  humidity: number;
  envStatus: 'NORMAL' | 'ELEVATED' | 'SEVERE';
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  workerId?: string; // If role is WORKER
  avatarUrl?: string;
}

export interface EdgeAiNode {
  nodeId: string;
  name: string;
  status: 'ONLINE' | 'OFFLINE' | 'DEGRADED';
  hardware: string; // "Arduino UNO Q"
  firmware: string;
  model: string; // "HEATGUARD Risk Engine v1.0"
  lastInference: string;
  loraGatewayStatus: 'HEALTHY' | 'WARNING' | 'OFFLINE';
  activeWorkersMonitored: number;
}

export type DemoScenario = 'NORMAL' | 'CAUTION' | 'HIGH_RISK' | 'SOS' | 'OFFLINE' | 'RESET';
