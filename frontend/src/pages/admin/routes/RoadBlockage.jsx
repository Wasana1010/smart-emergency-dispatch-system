import React from 'react';
import { DashboardLayout } from '../../../layouts/DashboardLayout';
import { Card } from '../../../components/Card';
import { Button } from '../../../components/Button';
import { Select } from '../../../components/Select';

export const RoadBlockage = () => (
  <DashboardLayout role="DISPATCHER">
    <h1 className="text-2xl font-bold mb-6">Blockage Management</h1>
    <Card title="Traffic/Incident Control" className="max-w-lg">
      <div className="space-y-4">
        <Select label="Select Road Segment" options={[{value:'R-001', label:'Main St - Hospital Rd'}]} />
        <div className="flex gap-4">
          <Button variant="danger" className="flex-1">Mark as Blocked</Button>
          <Button variant="success" className="flex-1">Mark as Available</Button>
        </div>
      </div>
    </Card>
  </DashboardLayout>
);