import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '../../../layouts/DashboardLayout';
import { Card } from '../../../components/Card';
import { StatusBadge } from '../../../components/StatusBadge';
import { Clock } from 'lucide-react';

export const PriorityQueue = () => {
  const [emergencies, setEmergencies] = useState([]);

  // Mock fetching logic - this will later call your backend's sorted endpoint
  useEffect(() => {
    setEmergencies([
      { id: 'EMG-001', type: 'CARDIAC', condition: 'CRITICAL', loc: '06.58, 79.96', wait: '2m', status: 'PENDING', ambulance: '-' },
      { id: 'EMG-002', type: 'TRAUMA', condition: 'HIGH', loc: '06.59, 79.97', wait: '5m', status: 'PENDING', ambulance: '-' },
    ]);
  }, []);

  return (
    <DashboardLayout role="DISPATCHER">
      <h1 className="text-2xl font-bold mb-6">Emergency Priority Queue</h1>
      <Card title="Live Sorted Requests">
        <table className="w-full text-sm text-left">
          <thead className="text-gray-500 border-b">
            <tr>
              <th className="pb-3">ID</th>
              <th className="pb-3">Type</th>
              <th className="pb-3">Condition</th>
              <th className="pb-3">Wait Time</th>
              <th className="pb-3">Priority</th>
              <th className="pb-3">Assignment</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {emergencies.map((e) => (
              <tr key={e.id} className="hover:bg-gray-50">
                <td className="py-3 font-semibold">{e.id}</td>
                <td className="py-3">{e.type}</td>
                <td className="py-3">{e.condition}</td>
                <td className="py-3 flex items-center gap-1 text-gray-500">
                  <Clock className="w-3 h-3" /> {e.wait}
                </td>
                <td className="py-3"><StatusBadge status={e.condition} /></td>
                <td className="py-3">{e.ambulance || 'Unassigned'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </DashboardLayout>
  );
};