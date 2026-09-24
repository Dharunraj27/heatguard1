import type { Worker, Alert, WorkerDevice, Site, EdgeAiNode, DemoScenario } from '../types/heatguard';
import { INITIAL_WORKERS, INITIAL_ALERTS, INITIAL_DEVICES, INITIAL_SITES, INITIAL_EDGE_NODE } from '../data/initialData';

export class MockService {
  private workers: Worker[] = [...INITIAL_WORKERS];
  private alerts: Alert[] = [...INITIAL_ALERTS];
  private devices: WorkerDevice[] = [...INITIAL_DEVICES];
  private sites: Site[] = [...INITIAL_SITES];
  private edgeNode: EdgeAiNode = { ...INITIAL_EDGE_NODE };
  private listeners: Array<() => void> = [];

  constructor() {
    // Self-register
  }

  public subscribe(listener: () => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notify() {
    this.listeners.forEach(l => l());
  }

  public getWorkers(): Worker[] {
    return [...this.workers];
  }

  public getWorkerById(id: string): Worker | undefined {
    return this.workers.find(w => w.id === id || w.code === id);
  }

  public getAlerts(): Alert[] {
    return [...this.alerts];
  }

  public getDevices(): WorkerDevice[] {
    return [...this.devices];
  }

  public getSites(): Site[] {
    return [...this.sites];
  }

  public getEdgeNode(): EdgeAiNode {
    return { ...this.edgeNode };
  }

  public acknowledgeAlert(alertId: string, note?: string, user: string = 'Site Manager'): void {
    const alert = this.alerts.find(a => a.id === alertId);
    if (alert) {
      alert.status = 'ACKNOWLEDGED';
      alert.acknowledgedBy = user;
      alert.acknowledgedAt = new Date().toTimeString().split(' ')[0];
      if (note) alert.notes = note;
      this.notify();
    }
  }

  public triggerWorkerSOS(workerId: string): Alert {
    const worker = this.getWorkerById(workerId) || this.workers[0];
    const timeStr = new Date().toTimeString().split(' ')[0];

    // Update worker state
    worker.status = 'EMERGENCY';
    worker.lastUpdate = timeStr;
    worker.riskAssessment = {
      state: 'EMERGENCY',
      factors: ['Manual SOS panic button pressed by worker', 'Immediate assistance flagged'],
      dataQuality: 'GOOD',
      timestamp: timeStr,
      model: 'HEADGUARD Risk Engine v1.0',
      processingNode: 'Arduino UNO Q',
      recommendation: 'DISPATCH EMERGENCY SITE RESPONDER IMMEDIATELY to worker GPS/Cell location!'
    };

    const newAlert: Alert = {
      id: `ALT-SOS-${Date.now().toString().slice(-4)}`,
      workerId: worker.id,
      workerCode: worker.code,
      workerName: worker.name,
      siteId: worker.siteId,
      priority: 'SOS',
      eventType: 'MANUAL SOS TRIGGER',
      message: `Worker ${worker.name} (${worker.code}) activated emergency distress button!`,
      timestamp: timeStr,
      status: 'ACTIVE',
      riskState: 'EMERGENCY'
    };

    this.alerts.unshift(newAlert);
    this.notify();
    return newAlert;
  }

  public triggerDemoScenario(scenario: DemoScenario, targetWorkerId: string = 'W002'): void {
    const timeStr = new Date().toTimeString().split(' ')[0];

    if (scenario === 'RESET') {
      this.workers = JSON.parse(JSON.stringify(INITIAL_WORKERS));
      this.alerts = JSON.parse(JSON.stringify(INITIAL_ALERTS));
      this.devices = JSON.parse(JSON.stringify(INITIAL_DEVICES));
      this.notify();
      return;
    }

    const worker = this.getWorkerById(targetWorkerId) || this.workers[1];

    switch (scenario) {
      case 'CAUTION':
        worker.status = 'CAUTION';
        worker.lastUpdate = timeStr;
        worker.telemetry.heartRate = 106;
        worker.telemetry.skinTemp = 34.8;
        worker.telemetry.ambientTemp = 37.2;
        worker.telemetry.timestamp = timeStr;
        worker.riskAssessment = {
          state: 'CAUTION',
          factors: ['Elevated core skin temp', 'Thermal strain index rising'],
          dataQuality: 'GOOD',
          timestamp: timeStr,
          model: 'HEADGUARD Risk Engine v1.0',
          processingNode: 'Arduino UNO Q',
          recommendation: 'Worker instructed to initiate cooling rest break.'
        };
        this.alerts.unshift({
          id: `ALT-DEMO-${Date.now().toString().slice(-4)}`,
          workerId: worker.id,
          workerCode: worker.code,
          workerName: worker.name,
          siteId: worker.siteId,
          priority: 'MEDIUM',
          eventType: 'Simulated Heat Caution',
          message: `Simulated caution event triggered for ${worker.name}.`,
          timestamp: timeStr,
          status: 'ACTIVE',
          riskState: 'CAUTION'
        });
        break;

      case 'HIGH_RISK':
        worker.status = 'HIGH_RISK';
        worker.lastUpdate = timeStr;
        worker.telemetry.heartRate = 126;
        worker.telemetry.skinTemp = 35.6;
        worker.telemetry.ambientTemp = 39.5;
        worker.telemetry.timestamp = timeStr;
        worker.riskAssessment = {
          state: 'HIGH_RISK',
          factors: ['Extreme ambient heat (39.5°C)', 'Heart rate baseline deviation +46 BPM', 'Rapid thermal loading'],
          dataQuality: 'GOOD',
          timestamp: timeStr,
          model: 'HEADGUARD Risk Engine v1.0',
          processingNode: 'Arduino UNO Q',
          recommendation: 'HIGH RISK: Mandate immediate shade, cold fluid intake, and marshal check.'
        };
        this.alerts.unshift({
          id: `ALT-DEMO-${Date.now().toString().slice(-4)}`,
          workerId: worker.id,
          workerCode: worker.code,
          workerName: worker.name,
          siteId: worker.siteId,
          priority: 'HIGH',
          eventType: 'Simulated High Risk Strain',
          message: `Simulated high risk heat strain event triggered for ${worker.name}.`,
          timestamp: timeStr,
          status: 'ACTIVE',
          riskState: 'HIGH_RISK'
        });
        break;

      case 'SOS':
        this.triggerWorkerSOS(worker.id);
        break;

      case 'OFFLINE':
        worker.status = 'NO_DATA';
        worker.lastUpdate = '44 min ago';
        worker.telemetry.signalQuality = 0;
        const dev = this.devices.find(d => d.workerId === worker.id);
        if (dev) {
          dev.connectionState = 'DISCONNECTED';
          dev.signalQuality = 0;
        }
        this.alerts.unshift({
          id: `ALT-DEMO-${Date.now().toString().slice(-4)}`,
          workerId: worker.id,
          workerCode: worker.code,
          workerName: worker.name,
          siteId: worker.siteId,
          priority: 'LOW',
          eventType: 'Device Telemetry Interrupted',
          message: `Device WG-ESP32-${worker.code} stopped transmitting packets.`,
          timestamp: timeStr,
          status: 'ACTIVE',
          riskState: 'NO_DATA'
        });
        break;
    }

    this.notify();
  }

  // Smooth realistic continuous telemetry update simulation
  public simulateTelemetryTick(): void {
    const timeStr = new Date().toTimeString().split(' ')[0];
    this.edgeNode.lastInference = timeStr;

    this.workers.forEach(worker => {
      if (worker.status === 'NO_DATA') return;

      // Small realistic fluctuate
      const hrDelta = (Math.random() - 0.5) * 2;
      const tempDelta = (Math.random() - 0.5) * 0.1;

      let newHr = Math.round(worker.telemetry.heartRate + hrDelta);
      let newSkinTemp = +(worker.telemetry.skinTemp + tempDelta).toFixed(1);

      // Clamp within realistic bounds
      if (worker.status === 'NORMAL') {
        newHr = Math.max(68, Math.min(88, newHr));
        newSkinTemp = Math.max(33.0, Math.min(34.2, newSkinTemp));
      } else if (worker.status === 'CAUTION') {
        newHr = Math.max(98, Math.min(112, newHr));
        newSkinTemp = Math.max(34.4, Math.min(34.9, newSkinTemp));
      } else if (worker.status === 'HIGH_RISK') {
        newHr = Math.max(118, Math.min(135, newHr));
        newSkinTemp = Math.max(35.0, Math.min(35.8, newSkinTemp));
      }

      worker.telemetry.heartRate = newHr;
      worker.telemetry.skinTemp = newSkinTemp;
      worker.telemetry.timestamp = timeStr;
      worker.lastUpdate = timeStr;
    });

    this.notify();
  }
}

export const mockService = new MockService();
