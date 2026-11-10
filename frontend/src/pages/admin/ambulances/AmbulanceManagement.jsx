import React from 'react';
import { DashboardLayout } from '../../../layouts/DashboardLayout';
import { Card } from '../../../components/Card';
import { Button } from '../../../components/Button';
import { StatusBadge } from '../../../components/StatusBadge';
import { useNavigate } from 'react-router-dom';

export const AmbulanceManagement = () => {
  const navigate = useNavigate();
  const ambulances = [
    { id: 'AMB-001', type: 'ALS', status: 'AVAILABLE', location: 'Station A' },
    { id: 'AMB-002', type: 'BLS', status: 'ASSIGNED', location: 'Zone 4' }
  ];

  return (
    <DashboardLayout role="DISPATCHER">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Ambulance Fleet</h1>
        <Button onClick={() => navigate('/admin/ambulances/add')}>+ Add Ambulance</Button>
      </div>
      <Card>
        <table className="w-full text-sm text-left">
          <thead className="text-gray-500 border-b">
            <tr><th className="pb-3">ID</th><th className="pb-3">Type</th><th className="pb-3">Status</th><th className="pb-3">Actions</th></tr>
          </thead>
          <tbody className="divide-y">
            {ambulances.map(a => (
              <tr key={a.id} className="hover:bg-gray-50">
                <td className="py-3 font-semibold">{a.id}</td>
                <td className="py-3">{a.type}</td>
                <td className="py-3"><StatusBadge status={a.status} /></td>
                <td className="py-3"><Button size="sm" variant="outline" onClick={() => navigate(`/admin/ambulances/${a.id}`)}>View</Button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </DashboardLayout>
  );
};