import React from 'react';
import { DashboardLayout } from '../../../layouts/DashboardLayout';
import { useParams } from 'react-router-dom';
import { Card } from '../../../components/Card';
import { StatusBadge } from '../../../components/StatusBadge';

export const AmbulanceDetails = () => {
  const { id } = useParams();
  return (
    <DashboardLayout role="DISPATCHER">
      <h1 className="text-2xl font-bold mb-6">Ambulance {id} Details</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <Card title="Vehicle Information">
          <p>Model: Toyota Hiace</p>
          <p>Current Status: <StatusBadge status="AVAILABLE" /></p>
        </Card>
        <Card title="Current Assignment">
          <p>No active assignment.</p>
        </Card>
      </div>
    </DashboardLayout>
  );
};