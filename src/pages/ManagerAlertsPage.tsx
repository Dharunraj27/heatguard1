import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { AlertOctagon, Check, Flame, MessageSquare, Clock, Filter, ShieldAlert } from 'lucide-react';
import { Modal } from '../components/common/Modal';

export const ManagerAlertsPage: React.FC = () => {
  const { alerts, acknowledgeAlert, setSelectedWorkerId, navigate } = useApp();
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedAlertId, setSelectedAlertId] = useState<string | null>(null);
  const [noteText, setNoteText] = useState<string>('');

  const filteredAlerts = alerts.filter(a => {
    if (statusFilter === 'ACTIVE') return a.status === 'ACTIVE';
    if (statusFilter === 'ACKNOWLEDGED') return a.status === 'ACKNOWLEDGED';
    if (statusFilter === 'SOS') return a.priority === 'SOS';
    return true;
  });

  const handleOpenNoteModal = (alertId: string) => {
    setSelectedAlertId(alertId);
    setNoteText('');
  };

  const handleConfirmAck = () => {
    if (selectedAlertId) {
      acknowledgeAlert(selectedAlertId, noteText || 'Standard site response initiated');
      setSelectedAlertId(null);
    }
  };

  return (
    <div className="space-y-6 pb-24">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2 font-mono">
            <AlertOctagon className="w-5 h-5 text-orange-400" />
            <span>Attention & Safety Alert Timeline</span>
          </h2>
          <p className="text-xs text-slate-400">
            Real-time emergency events, thermal stress alerts, & manager responses
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1 p-1 bg-slate-900 rounded-xl border border-slate-800 text-xs font-mono">
          {['all', 'ACTIVE', 'ACKNOWLEDGED', 'SOS'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1 rounded-lg transition-all font-semibold ${
                statusFilter === st
                  ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Alert Feed List */}
      <div className="space-y-3">
        {filteredAlerts.length === 0 ? (
          <div className="p-12 text-center rounded-2xl border border-slate-800 bg-slate-900/40">
            <ShieldAlert className="w-8 h-8 text-slate-500 mx-auto mb-2" />
            <p className="text-xs text-slate-400 font-mono">No alerts match selected filter.</p>
          </div>
        ) : (
          filteredAlerts.map((alert) => {
            const isSos = alert.priority === 'SOS';
            const isAck = alert.status === 'ACKNOWLEDGED';

            return (
              <div
                key={alert.id}
                className={`p-5 rounded-2xl border transition-all space-y-3 ${
                  isSos
                    ? 'bg-red-500/15 border-red-500/50 glow-emergency'
                    : isAck
                    ? 'bg-slate-900/40 border-slate-800 opacity-80'
                    : 'bg-slate-900/80 border-orange-500/30'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-xl bg-slate-950 border border-white/5 ${isSos ? 'text-red-400' : 'text-orange-400'}`}>
                      {isSos ? <Flame className="w-5 h-5 animate-pulse" /> : <AlertOctagon className="w-5 h-5" />}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-mono font-extrabold px-2 py-0.5 rounded ${isSos ? 'bg-red-500 text-white' : 'bg-orange-500 text-slate-950'}`}>
                          {alert.priority} PRIORITY
                        </span>
                        <span className="text-sm font-bold text-white">
                          {alert.workerName} ({alert.workerCode})
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-400 font-mono flex items-center gap-1 mt-0.5">
                        <Clock className="w-3 h-3 text-cyan-400" />
                        {alert.timestamp} • {alert.eventType}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {!isAck ? (
                      <button
                        onClick={() => handleOpenNoteModal(alert.id)}
                        className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 hover:bg-emerald-500/30 transition-all flex items-center gap-1.5"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Acknowledge Alert</span>
                      </button>
                    ) : (
                      <span className="px-3 py-1 rounded-xl text-xs font-mono font-bold bg-slate-800 text-emerald-400 border border-emerald-500/30">
                        ACK BY {alert.acknowledgedBy} AT {alert.acknowledgedAt}
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-xs text-slate-200 font-medium pl-11">
                  {alert.message}
                </p>

                {alert.notes && (
                  <div className="ml-11 p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 font-mono flex items-start gap-2">
                    <MessageSquare className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                    <span>Response Note: {alert.notes}</span>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Acknowledge Note Modal */}
      <Modal
        isOpen={selectedAlertId !== null}
        onClose={() => setSelectedAlertId(null)}
        title="Acknowledge Alert & Add Response Note"
        subtitle="Record site manager intervention details for compliance log"
      >
        <div className="space-y-4 font-mono text-xs">
          <div>
            <label className="text-slate-400 block mb-1">MANAGER RESPONSE NOTE (OPTIONAL):</label>
            <textarea
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              placeholder="e.g. Dispatched site marshal Vikram with water bottle. Rest break initiated."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 focus:outline-none focus:border-cyan-500 h-24"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              onClick={() => setSelectedAlertId(null)}
              className="px-4 py-2 rounded-xl text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmAck}
              className="px-4 py-2 rounded-xl font-bold bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition-all shadow-md"
            >
              Confirm Acknowledge
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
