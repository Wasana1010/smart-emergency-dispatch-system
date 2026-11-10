import React from 'react';
import { DashboardLayout } from '../../../layouts/DashboardLayout';
import { Card } from '../../../components/Card';
import { Input } from '../../../components/Input';
import { Select } from '../../../components/Select';
import { Button } from '../../../components/Button';

export const AddHospital = () => (
  <DashboardLayout role="DISPATCHER">
    <h1 className="text-2xl font-bold mb-6">Register Hospital</h1>
    <Card className="max-w-xl">
      <form className="space-y-4">
        <Input label="Hospital Name" />
        <Input label="Location" />
        <Input label="Capacity" type="number" />
        <Select
          label="Status"
          options={[
            { value: 'AVAILABLE', label: 'Available' },
            { value: 'BUSY', label: 'Busy' },
            { value: 'CRITICAL', label: 'Critical' },
          ]}
        />
        <Button className="w-full">Save Hospital</Button>
      </form>
    </Card>
  </DashboardLayout>
);

export default AddHospital;
