import React from 'react';
import { DashboardLayout } from '../../../layouts/DashboardLayout';
import { Card } from '../../../components/Card';
import { Input } from '../../../components/Input';
import { Select } from '../../../components/Select';
import { Button } from '../../../components/Button';

export const AddAmbulance = () => (
  <DashboardLayout role="DISPATCHER">
    <h1 className="text-2xl font-bold mb-6">Register New Ambulance</h1>
    <Card className="max-w-xl">
      <form className="space-y-4">
        <Input label="Ambulance ID" />
        <Select label="Type" options={[{value:'ALS',label:'Advanced Life Support'},{value:'BLS',label:'Basic Life Support'}]} />
        <Button className="w-full">Save Ambulance</Button>
      </form>
    </Card>
  </DashboardLayout>
);