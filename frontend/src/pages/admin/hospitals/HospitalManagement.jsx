import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '../../../layouts/DashboardLayout';
import { Card } from '../../../components/Card';
import { Button } from '../../../components/Button';
import { StatusBadge } from '../../../components/StatusBadge';

export const HospitalManagement = () => {
  const navigate = useNavigate();
  const hospitals = [{ id: 'H-001', name: 'Kalutara General', status: 'AVAILABLE', beds: 50 }];

  return (
    <DashboardLayout role="DISPATCHER">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Hospital Network</h1>
        <Button onClick={() => navigate('/admin/hospitals/add')}>+ Register Hospital</Button>
      </div>
      <Card>
        <table className="w-full text-sm">
          <thead className="text-gray-500 border-b">
            <tr><th className="pb-3">Name</th><th className="pb-3">Status</th><th className="pb-3">Action</th></tr>
          </thead>
          <tbody className="divide-y">
            {hospitals.map(h => (
              <tr key={h.id}>
                <td className="py-3 font-semibold">{h.name}</td>
                <td className="py-3"><StatusBadge status={h.status} /></td>
                <td className="py-3"><Button size="sm" onClick={() => navigate(`/admin/hospitals/${h.id}`)}>Details</Button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </DashboardLayout>
  );
};