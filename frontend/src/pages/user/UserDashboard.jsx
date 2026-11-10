import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, Clock, History, Map } from 'lucide-react';
import { DashboardLayout } from '../../layouts/DashboardLayout';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { Badge } from '../../components/Badge';
import { StatusBadge } from '../../components/StatusBadge';

export const UserDashboard = () => {
  const navigate = useNavigate();
  // Mock data representing a user's active state
  const activeEmergency = {
    id: 'EMG-9921',
    status: 'DISPATCHED',
    ambulance: 'AMB-042',
    eta: '8 mins',
    type: 'Accident'
  };

  return (
    <DashboardLayout role="CITIZEN">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">My Emergency Portal</h1>
          <div className="flex gap-3">
            <Button variant="danger" onClick={() => navigate('/emergency-request')}>
              <ShieldAlert className="w-4 h-4 mr-2" /> Request Ambulance
            </Button>
          </div>
        </div>

        {/* Active Emergency Card */}
        <Card title="Current Status" className="border-l-4 border-l-red-500">
          <div className="grid md:grid-cols-4 gap-6 items-center">
            <div>
              <p className="text-xs text-gray-500">Emergency Type</p>
              <p className="font-semibold">{activeEmergency.type}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Current Status</p>
              <StatusBadge status={activeEmergency.status} />
            </div>
            <div>
              <p className="text-xs text-gray-500">Ambulance</p>
              <p className="font-semibold">{activeEmergency.ambulance}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500">Estimated Arrival</p>
              <p className="text-lg font-bold text-red-600 flex items-center justify-end gap-1">
                <Clock className="w-4 h-4" /> {activeEmergency.eta}
              </p>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t flex gap-3">
            <Button variant="secondary" size="sm"><Map className="w-4 h-4 mr-2" /> Track on Map</Button>
          </div>
        </Card>

        {/* History Section */}
        <Card title="Emergency History">
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-4">
                  <History className="text-gray-400" />
                  <div>
                    <p className="font-medium text-sm">Medical Emergency - Hospital Road</p>
                    <p className="text-xs text-gray-500">Aug 05, 2026 • Resolved</p>
                  </div>
                </div>
                <Badge variant="green">COMPLETED</Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};