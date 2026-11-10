import React from 'react';
import { DashboardLayout } from '../../layouts/DashboardLayout';
import { Card } from '../../components/Card';
import { StatusBadge } from '../../components/StatusBadge';

export const HospitalDashboard = () => (
  <DashboardLayout role="HOSPITAL">
    <h1 className="text-2xl font-bold mb-6">Hospital Operational Dashboard</h1>
    <div className="grid md:grid-cols-3 gap-6">
      <Card title="Emergency Beds">
        <p className="text-3xl font-bold">12 / 50</p>
        <p className="text-sm text-gray-500">Available / Total</p>
      </Card>
      <Card title="ICU Capacity">
        <p className="text-3xl font-bold text-red-600">0 / 10</p>
        <p className="text-sm text-gray-500">Available / Total</p>
      </Card>
      <Card title="Hospital Status">
        <StatusBadge status="BUSY" />
      </Card>
    </div>
  </DashboardLayout>
);