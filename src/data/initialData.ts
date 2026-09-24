import type { Worker, WorkerDevice, Alert, Site, User, EdgeAiNode } from '../types/heatguard';

export const INITIAL_SITES: Site[] = [
  {
    id: 'site-alpha',
    name: 'Site Alpha — Highway Expansion P2',
    location: 'Sector 4, Express Corridor',
    totalWorkers: 18,
    activeShift: 'Day Shift (08:00 - 17:00)',
    ambientTemp: 34.8,
    humidity: 68,
    envStatus: 'ELEVATED'
  },
  {
    id: 'site-beta',
    name: 'Site Beta — Flyover Pier 14',
    location: 'North Bypass Interchange',
    totalWorkers: 6,
    activeShift: 'Day Shift (08:00 - 17:00)',
    ambientTemp: 32.1,
    humidity: 59,
    envStatus: 'NORMAL'
  }
];

export const INITIAL_EDGE_NODE: EdgeAiNode = {
  nodeId: 'EDGE-UNO-Q-01',
  name: 'Site Alpha Edge Processor',
  status: 'ONLINE',
  hardware: 'Arduino UNO Q (STM32H7 + ESP32)',
  firmware: 'v1.4.2-edge-sih',
  model: 'HEATGUARD Risk Engine v1.0',
  lastInference: new Date().toTimeString().split(' ')[0],
  loraGatewayStatus: 'HEALTHY',
  activeWorkersMonitored: 21
};

export const INITIAL_USERS: User[] = [
  {
    id: 'usr-mgr-1',
    name: 'Dharunraj',
    email: 'manager@heatguard.io',
    role: 'SITE_MANAGER',
    avatarUrl: '/site_manager.jpeg'
  },
  {
    id: 'usr-mgr-2',
    name: 'Priya Verma',
    email: 'priya.verma@heatguard.io',
    role: 'SITE_MANAGER',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'usr-mgr-3',
    name: 'Amit Patel',
    email: 'amit.patel@heatguard.io',
    role: 'SITE_MANAGER',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'usr-wrk-1',
    name: 'Vikram Singh',
    email: 'w001@heatguard.io',
    role: 'WORKER',
    workerId: 'W001',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'usr-wrk-2',
    name: 'Suresh Kumar',
    email: 'w002@heatguard.io',
    role: 'WORKER',
    workerId: 'W002',
    avatarUrl: 'https://images.unsplash.com/photo-1628157582853-a796fa650a6a?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'usr-wrk-3',
    name: 'Ramesh Yadav',
    email: 'w003@heatguard.io',
    role: 'WORKER',
    workerId: 'W003',
    avatarUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'usr-wrk-4',
    name: 'Anil Gupta',
    email: 'w004@heatguard.io',
    role: 'WORKER',
    workerId: 'W004',
    avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'usr-adm-1',
    name: 'Dr. Anita Desai',
    email: 'admin@heatguard.io',
    role: 'ADMIN',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'usr-adm-2',
    name: 'S. K. Roy',
    email: 'sk.roy@heatguard.io',
    role: 'ADMIN',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80'
  }
];

const nowTimeString = () => new Date().toTimeString().split(' ')[0];
const minsAgoString = (mins: number) => {
  const d = new Date(Date.now() - mins * 60 * 1000);
  return d.toTimeString().split(' ')[0];
};

export const INITIAL_WORKERS: Worker[] = [
  {
    id: 'W001',
    code: 'W001',
    name: 'Vikram Singh',
    siteId: 'site-alpha',
    siteName: 'Site Alpha',
    role: 'Paving Machine Operator',
    shift: 'Day Shift (08:00 - 17:00)',
    deviceId: 'HG-ESP32-001',
    status: 'NORMAL',
    lastUpdate: nowTimeString(),
    telemetry: {
      heartRate: 78,
      spo2: 98,
      skinTemp: 33.8,
      ambientTemp: 34.8,
      humidity: 68,
      activity: 'MODERATE',
      signalQuality: 92,
      battery: 88,
      timestamp: nowTimeString()
    },
    baseline: {
      calibrationStatus: 'COMPLETED',
      createdAt: '2026-09-20',
      dataQuality: 'GOOD',
      referenceHrMin: 72,
      referenceHrMax: 82,
      referenceSkinTempMin: 33.2,
      referenceSkinTempMax: 34.1,
      calibrationEnvironmentTemp: 29.5,
      calibrationEnvironmentHumidity: 60
    },
    riskAssessment: {
      state: 'NORMAL',
      factors: ['Heart rate within personal baseline (+6 BPM shift)', 'Skin temperature stable at 33.8°C'],
      dataQuality: 'GOOD',
      timestamp: nowTimeString(),
      model: 'HEATGUARD Risk Engine v1.0',
      processingNode: 'Arduino UNO Q (Edge AI)',
      recommendation: 'Nominal physiological status. Maintain regular hydration breaks.'
    }
  },
  {
    id: 'W002',
    code: 'W002',
    name: 'Aarav Patel',
    siteId: 'site-alpha',
    siteName: 'Site Alpha',
    role: 'Asphalt Raker',
    shift: 'Day Shift (08:00 - 17:00)',
    deviceId: 'HG-ESP32-002',
    status: 'CAUTION',
    lastUpdate: minsAgoString(2),
    telemetry: {
      heartRate: 104,
      spo2: 96,
      skinTemp: 34.7,
      ambientTemp: 36.2,
      humidity: 71,
      activity: 'HEAVY',
      signalQuality: 88,
      battery: 74,
      timestamp: minsAgoString(2)
    },
    baseline: {
      calibrationStatus: 'COMPLETED',
      createdAt: '2026-09-18',
      dataQuality: 'GOOD',
      referenceHrMin: 70,
      referenceHrMax: 80,
      referenceSkinTempMin: 33.0,
      referenceSkinTempMax: 33.9,
      calibrationEnvironmentTemp: 28.0,
      calibrationEnvironmentHumidity: 55
    },
    riskAssessment: {
      state: 'CAUTION',
      factors: ['Elevation shift: HR +24 BPM above personal max', 'Skin temp +0.8°C baseline drift', 'High environmental thermal index (36.2°C ambient)'],
      dataQuality: 'GOOD',
      timestamp: minsAgoString(2),
      model: 'HEATGUARD Risk Engine v1.0',
      processingNode: 'Arduino UNO Q (Edge AI)',
      recommendation: 'Recommend 10-minute rest break in shaded area and hydration protocol.'
    }
  },
  {
    id: 'W003',
    code: 'W003',
    name: 'Rahul Kumar',
    siteId: 'site-alpha',
    siteName: 'Site Alpha',
    role: 'Heavy Roller Operator',
    shift: 'Day Shift (08:00 - 17:00)',
    deviceId: 'HG-ESP32-003',
    status: 'HIGH_RISK',
    lastUpdate: minsAgoString(1),
    telemetry: {
      heartRate: 128,
      spo2: 94,
      skinTemp: 35.4,
      ambientTemp: 36.5,
      humidity: 73,
      activity: 'HEAVY',
      signalQuality: 95,
      battery: 62,
      timestamp: minsAgoString(1)
    },
    baseline: {
      calibrationStatus: 'COMPLETED',
      createdAt: '2026-09-19',
      dataQuality: 'GOOD',
      referenceHrMin: 68,
      referenceHrMax: 78,
      referenceSkinTempMin: 32.9,
      referenceSkinTempMax: 33.8,
      calibrationEnvironmentTemp: 28.5,
      calibrationEnvironmentHumidity: 58
    },
    riskAssessment: {
      state: 'HIGH_RISK',
      factors: ['Sustained tachycardia: HR +50 BPM baseline shift', 'Skin temp 35.4°C exceeding heat strain threshold', 'Combined physical exertion + extreme ambient heat'],
      dataQuality: 'GOOD',
      timestamp: minsAgoString(1),
      model: 'HEATGUARD Risk Engine v1.0',
      processingNode: 'Arduino UNO Q (Edge AI)',
      recommendation: 'PRIORITY: Require immediate activity halt, cooling station access, & hydration check.'
    }
  },
  {
    id: 'W004',
    code: 'W004',
    name: 'Suresh Verma',
    siteId: 'site-beta',
    siteName: 'Site Beta',
    role: 'Rebar Welder',
    shift: 'Day Shift (08:00 - 17:00)',
    deviceId: 'HG-ESP32-004',
    status: 'NO_DATA',
    lastUpdate: minsAgoString(44),
    telemetry: {
      heartRate: 0,
      spo2: 0,
      skinTemp: 0,
      ambientTemp: 0,
      humidity: 0,
      activity: 'REST',
      signalQuality: 0,
      battery: 15,
      timestamp: minsAgoString(44)
    },
    baseline: {
      calibrationStatus: 'COMPLETED',
      createdAt: '2026-09-15',
      dataQuality: 'FAIR',
      referenceHrMin: 74,
      referenceHrMax: 85,
      referenceSkinTempMin: 33.3,
      referenceSkinTempMax: 34.3,
      calibrationEnvironmentTemp: 30.0,
      calibrationEnvironmentHumidity: 62
    },
    riskAssessment: {
      state: 'NO_DATA',
      factors: ['Device transmission interrupted', 'Stale telemetry > 40 mins'],
      dataQuality: 'POOR',
      timestamp: minsAgoString(44),
      model: 'HEATGUARD Risk Engine v1.0',
      processingNode: 'Arduino UNO Q',
      recommendation: 'Check wearable device connectivity or LoRa range.'
    }
  }
];

// Helper to generate remaining 20 workers to total 24
for (let i = 5; i <= 24; i++) {
  const code = `W${i.toString().padStart(3, '0')}`;
  const isCaution = i === 6 || i === 12;
  const isNoData = i === 18 || i === 22;
  const status = isNoData ? 'NO_DATA' : isCaution ? 'CAUTION' : 'NORMAL';
  const siteId = i % 4 === 0 ? 'site-beta' : 'site-alpha';
  const siteName = siteId === 'site-beta' ? 'Site Beta' : 'Site Alpha';

  const roles = ['Concrete Finisher', 'Survey Assistant', 'Rigging Tech', 'Safety Helper', 'Scaffolder', 'Compactor Operator'];
  const names = ['Amit', 'Sunil', 'Pradeep', 'Deepak', 'Mohan', 'Ramesh', 'Karan', 'Suresh', 'Manish', 'Vijay', 'Pankaj', 'Gaurav', 'Nitin', 'Alok', 'Rohan', 'Satish', 'Tarun', 'Vikas', 'Yash', 'Zaid'];

  INITIAL_WORKERS.push({
    id: code,
    code,
    name: `${names[(i - 5) % names.length]} ${['Kumar', 'Yadav', 'Sharma', 'Gupta', 'Jha', 'Mehta'][(i - 5) % 6]}`,
    siteId,
    siteName,
    role: roles[(i - 5) % roles.length],
    shift: 'Day Shift',
    deviceId: `HG-ESP32-${i.toString().padStart(3, '0')}`,
    status,
    lastUpdate: isNoData ? minsAgoString(25 + i * 2) : minsAgoString(i % 5),
    telemetry: {
      heartRate: isNoData ? 0 : isCaution ? 98 + i : 72 + (i % 12),
      spo2: isNoData ? 0 : 96 + (i % 3),
      skinTemp: isNoData ? 0 : isCaution ? 34.5 : 33.4 + (i % 6) * 0.1,
      ambientTemp: isNoData ? 0 : 33.0 + (i % 4),
      humidity: isNoData ? 0 : 60 + (i % 10),
      activity: isCaution ? 'HEAVY' : i % 2 === 0 ? 'MODERATE' : 'REST',
      signalQuality: isNoData ? 0 : 82 + (i % 15),
      battery: isNoData ? 30 + i : 60 + (i % 35),
      timestamp: isNoData ? minsAgoString(25 + i * 2) : minsAgoString(i % 5)
    },
    baseline: {
      calibrationStatus: 'COMPLETED',
      createdAt: '2026-09-17',
      dataQuality: 'GOOD',
      referenceHrMin: 70,
      referenceHrMax: 82,
      referenceSkinTempMin: 33.1,
      referenceSkinTempMax: 34.0,
      calibrationEnvironmentTemp: 29.0,
      calibrationEnvironmentHumidity: 58
    },
    riskAssessment: {
      state: status,
      factors: isNoData
        ? ['LoRa packet dropped', 'Signal timeout']
        : isCaution
        ? ['Thermal load rising', 'Cardiovascular response elevated']
        : ['Baseline reference aligned', 'Thermal index nominal'],
      dataQuality: isNoData ? 'POOR' : 'GOOD',
      timestamp: isNoData ? minsAgoString(25 + i * 2) : minsAgoString(i % 5),
      model: 'HEATGUARD Risk Engine v1.0',
      processingNode: 'Arduino UNO Q',
      recommendation: isNoData
        ? 'Verify device battery and location.'
        : isCaution
        ? 'Monitor thermal status next 15 mins.'
        : 'Normal operations permitted.'
    }
  });
}

export const INITIAL_DEVICES: WorkerDevice[] = INITIAL_WORKERS.map(w => ({
  id: w.deviceId,
  workerId: w.id,
  workerName: w.name,
  firmwareVersion: 'v0.9.4-lora',
  batteryLevel: w.telemetry.battery,
  connectionState: w.status === 'NO_DATA' ? 'DISCONNECTED' : w.telemetry.signalQuality < 50 ? 'WEAK_SIGNAL' : 'CONNECTED',
  signalQuality: w.telemetry.signalQuality,
  commMethod: parseInt(w.id.slice(1)) % 3 === 0 ? 'Wi-Fi' : 'LoRa',
  edgeNodeId: 'EDGE-UNO-Q-01',
  lastSeen: w.lastUpdate
}));

export const INITIAL_ALERTS: Alert[] = [
  {
    id: 'ALT-1001',
    workerId: 'W003',
    workerCode: 'W003',
    workerName: 'Rahul Kumar',
    siteId: 'site-alpha',
    priority: 'HIGH',
    eventType: 'Heat Stress Indicator',
    message: 'Unusual physiological/environmental pattern detected. HR +41 BPM baseline shift.',
    timestamp: minsAgoString(1),
    status: 'ACTIVE',
    riskState: 'HIGH_RISK'
  },
  {
    id: 'ALT-1002',
    workerId: 'W002',
    workerCode: 'W002',
    workerName: 'Aarav Patel',
    siteId: 'site-alpha',
    priority: 'MEDIUM',
    eventType: 'Thermal Load Caution',
    message: 'Temperature/environmental stress indicator increased (36.0°C ambient).',
    timestamp: minsAgoString(3),
    status: 'ACTIVE',
    riskState: 'CAUTION'
  },
  {
    id: 'ALT-1003',
    workerId: 'W006',
    workerCode: 'W006',
    workerName: 'Sunil Sharma',
    siteId: 'site-alpha',
    priority: 'MEDIUM',
    eventType: 'Cardiovascular Strain',
    message: 'Continuous heavy strain detected during pave operation.',
    timestamp: minsAgoString(8),
    status: 'ACTIVE',
    riskState: 'CAUTION'
  }
];
