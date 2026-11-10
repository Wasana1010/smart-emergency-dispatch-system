import React from 'react';
import { DashboardLayout } from '../../layouts/DashboardLayout';
import { Card } from '../../components/Card';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';

export const BedManagement = () => (
  <DashboardLayout role="HOSPITAL">
    <h1 className="text-2xl font-bold mb-6">Bed Capacity Management</h1>
    <Card className="max-w-md">
      <form className="space-y-4">
        <Input label="Emergency Beds Available" type="number" />
        <Input label="ICU Beds Available" type="number" />
        <Button className="w-full">Update Availability</Button>
      </form>
    </Card>
  </DashboardLayout>
);