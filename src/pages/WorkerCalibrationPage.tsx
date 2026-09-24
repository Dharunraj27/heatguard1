import React from 'react';
import { CalibrationWorkflow } from '../components/worker/CalibrationWorkflow';

export const WorkerCalibrationPage: React.FC = () => {
  return (
    <div className="space-y-6 max-w-4xl pb-24">
      <CalibrationWorkflow />
    </div>
  );
};
