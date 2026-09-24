import React, { useState, useEffect } from 'react';
import { HelpCircle, ChevronLeft, ChevronRight, X, Sparkles, CheckCircle2 } from 'lucide-react';

export interface GuideStep {
  title: string;
  description: string;
  highlightTarget?: string;
}

export interface PageGuideConfig {
  pageTitle: string;
  badge: string;
  steps: GuideStep[];
}

export const PAGE_GUIDES: Record<string, PageGuideConfig> = {
  '/manager/dashboard': {
    pageTitle: 'Site Safety Command Center',
    badge: 'SITE MANAGER GUIDE',
    steps: [
      {
        title: '1. Real-Time KPI Cards (Clickable Filter)',
        description: 'Click on any KPI card at the top (Total Workers, Connected, Normal, Caution, High Risk, Active SOS) to automatically filter the live roster table below.'
      },
      {
        title: '2. Workforce Safety Distribution',
        description: 'Visual donut chart categorizing the active shift workforce into Normal, Caution, High Risk, Emergency, and Offline states based on edge AI risk engine output.'
      },
      {
        title: '3. Priority Alerts Panel',
        description: 'Instant feed of distress events and heat strain flags. Click "ACKNOWLEDGE" to acknowledge an alert and assign response notes.'
      },
      {
        title: '4. Live Worker Telemetry Roster',
        description: 'Full data table showing live Heart Rate, SpO₂, Skin Temperature, Ambient Heat, and battery levels for all 24 monitored field workers. Click any row to view full worker telemetry.'
      }
    ]
  },
  '/manager/workers': {
    pageTitle: 'Worker Safety Roster',
    badge: 'WORKFORCE ROSTER',
    steps: [
      {
        title: '1. Roster Overview & View Toggle',
        description: 'Switch between tabular list view and card grid view. Filter workers by risk state, site assignment, or search by name.'
      },
      {
        title: '2. Worker Status Cards',
        description: 'Displays current vital statistics, LoRa signal quality, and battery charge. Click "View Profile & Baseline" to inspect individual baseline parameters.'
      }
    ]
  },
  '/manager/alerts': {
    pageTitle: 'Attention & Emergency Alerts',
    badge: 'ALERTS LOG',
    steps: [
      {
        title: '1. Emergency Distress Feed',
        description: 'Timeline of all heat strain warnings, rapid heart rate spikes, low SpO₂ drops, and manual SOS panic signals.'
      },
      {
        title: '2. Alert Acknowledgment Workflow',
        description: 'Allows site managers to mark alerts as ACKNOWLEDGED or RESOLVED with timestamps and operational notes for compliance logs.'
      }
    ]
  },
  '/manager/analytics': {
    pageTitle: 'Safety & Environmental Analytics',
    badge: 'THERMAL ANALYTICS',
    steps: [
      {
        title: '1. Ambient Heat & Relative Humidity Trends',
        description: 'Real-time environmental thermal index tracking. Alerts site management when wet-bulb globe temperature thresholds are exceeded.'
      },
      {
        title: '2. Cumulative Physiological Strain',
        description: 'Monitors shift-wide cardiovascular load and heat stress accumulation across active work gangs.'
      }
    ]
  },
  '/manager/devices': {
    pageTitle: 'Edge Hardware & Devices Fleet',
    badge: 'HARDWARE FLEET',
    steps: [
      {
        title: '1. Arduino UNO Q Edge Node Status',
        description: 'Inspects local edge processing health, model inference latency, and LoRa gateway connection status.'
      },
      {
        title: '2. ESP32 Wristband Diagnostics',
        description: 'Fleet table showing firmware versions, communication protocol (LoRa / Wi-Fi), signal RSSI, and battery percentages.'
      }
    ]
  },
  '/worker/dashboard': {
    pageTitle: 'Personal Safety Dashboard',
    badge: 'WORKER PORTAL',
    steps: [
      {
        title: '1. Your Live Vital Stats',
        description: 'Shows your personal real-time Heart Rate, SpO₂, Skin Temperature, Ambient Heat, and Wearable Battery level acquired from your ESP32 wristband.'
      },
      {
        title: '2. Emergency SOS Distress Button',
        description: 'Hold the red SOS button for 3 seconds to immediately broadcast a high-priority panic distress signal to the site manager.'
      },
      {
        title: '3. Personal Baseline Calibration',
        description: 'Displays your statistical reference interval (e.g. 70 - 85 BPM). Click "Manage Calibration Workflow" to recalibrate your resting vitals.'
      }
    ]
  },
  '/worker/calibration': {
    pageTitle: 'Personal Baseline Calibration',
    badge: 'CALIBRATION WORKFLOW',
    steps: [
      {
        title: '1. Resting Vital Acquisition',
        description: '5-step interactive workflow. Sit still for 2 minutes while your wristband measures baseline resting Heart Rate and Skin Temperature.'
      },
      {
        title: '2. Baseline Validation',
        description: 'Calculates reference intervals tailored to your physiology, reducing false heat strain alarms.'
      }
    ]
  },
  '/worker/monitoring': {
    pageTitle: 'Live Telemetry Monitor',
    badge: 'RF & SENSOR TELEMETRY',
    steps: [
      {
        title: '1. Sensor Diagnostics',
        description: 'Detailed live diagnostic gauges showing optical PPG signal quality, skin contact resistance, and LoRa packet transmission.'
      }
    ]
  },
  '/admin/users': {
    pageTitle: 'Admin Access Directory',
    badge: 'SYSTEM ADMINISTRATION',
    steps: [
      {
        title: '1. User Roles & Accounts Directory',
        description: 'Full directory of Site Managers, Field Workers, and System Administrators. Inspect user emails, IDs, roles, and default credentials.'
      },
      {
        title: '2. Role-Based Access Control',
        description: 'Filter users by role (Site Manager vs Worker vs Admin) to audit system access permissions.'
      }
    ]
  }
};

interface PageGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentRoute: string;
}

export const PageGuideModal: React.FC<PageGuideModalProps> = ({ isOpen, onClose, currentRoute }) => {
  const [currentStep, setCurrentStep] = useState<number>(0);

  // Match current route or fallback
  const baseRoute = currentRoute.startsWith('/manager/workers/') ? '/manager/workers' : currentRoute;
  const guide = PAGE_GUIDES[baseRoute] || PAGE_GUIDES['/manager/dashboard'];

  useEffect(() => {
    setCurrentStep(0);
  }, [currentRoute, isOpen]);

  if (!isOpen) return null;

  const totalSteps = guide.steps.length;
  const activeStep = guide.steps[currentStep];

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      onClose();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg rounded-2xl border border-cyan-500/40 bg-slate-900 shadow-2xl p-6 space-y-5 text-white font-sans overflow-hidden">
        {/* Glow Accent Top Bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500" />

        {/* Header */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 uppercase">
                {guide.badge}
              </span>
              <h3 className="text-base font-extrabold font-mono text-white tracking-tight mt-0.5">
                {guide.pageTitle}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Box */}
        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between text-xs font-mono text-cyan-400">
            <span className="font-bold">STEP {currentStep + 1} OF {totalSteps}</span>
            <span className="text-slate-500">HEATGUARD GUIDE</span>
          </div>

          <h4 className="text-sm font-bold text-white font-mono">
            {activeStep.title}
          </h4>

          <p className="text-xs text-slate-300 leading-relaxed font-sans">
            {activeStep.description}
          </p>
        </div>

        {/* Step Indicator Dots */}
        <div className="flex items-center justify-center gap-1.5 pt-1">
          {guide.steps.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentStep(idx)}
              className={`h-2 rounded-full transition-all ${
                idx === currentStep ? 'w-6 bg-cyan-400' : 'w-2 bg-slate-700 hover:bg-slate-500'
              }`}
            />
          ))}
        </div>

        {/* Navigation Footer Controls */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 font-mono text-xs">
          <button
            onClick={handlePrev}
            disabled={currentStep === 0}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-xl border transition-all ${
              currentStep === 0
                ? 'opacity-40 cursor-not-allowed border-slate-800 text-slate-600'
                : 'border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Prev</span>
          </button>

          <button
            onClick={onClose}
            className="text-xs text-slate-400 hover:text-slate-200"
          >
            Skip Guide
          </button>

          <button
            onClick={handleNext}
            className="flex items-center gap-1 px-4 py-1.5 rounded-xl font-bold bg-cyan-500 text-slate-950 hover:bg-cyan-400 transition-colors shadow-md glow-cyan"
          >
            <span>{currentStep === totalSteps - 1 ? 'Got It!' : 'Next'}</span>
            {currentStep < totalSteps - 1 ? <ChevronRight className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
};
