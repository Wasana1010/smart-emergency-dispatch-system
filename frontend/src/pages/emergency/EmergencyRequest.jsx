import React, { useState } from 'react';
import { ShieldAlert } from 'lucide-react';
import { PageHeader } from '../../components/PageHeader';
import { Input } from '../../components/Input';
import { Select } from '../../components/Select';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { LocationPicker } from '../../components/LocationPicker';
import { emergencyService } from '../../services/emergencyService';

export const EmergencyRequest = () => {
  const [formData, setFormData] = useState({
    type: 'ACCIDENT',
    condition: 'CRITICAL',
    numPatients: 1,
    lat: '',
    lng: '',
    info: '',
    hospital: 'NEAREST'
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await emergencyService.createEmergencyRequest(formData);
    alert('Emergency Request Submitted! Tracking ID assigned.');
    setIsLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <PageHeader title="New Emergency Request" subtitle="Fill in details to trigger immediate dispatch." />
      <Card>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Select label="Emergency Type" options={[{value:'ACCIDENT',label:'Accident'},{value:'MEDICAL',label:'Medical'},{value:'CARDIAC',label:'Cardiac'},{value:'FIRE',label:'Fire'},{value:'TRAUMA',label:'Trauma'}]} value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})} />
            <Select label="Patient Condition" options={[{value:'CRITICAL',label:'Critical'},{value:'HIGH',label:'High'},{value:'MEDIUM',label:'Medium'},{value:'LOW',label:'Low'}]} value={formData.condition} onChange={(e) => setFormData({...formData, condition: e.target.value})} />
          </div>
          
          <Input label="Number of Patients" type="number" min="1" value={formData.numPatients} onChange={(e) => setFormData({...formData, numPatients: e.target.value})} />
          
          <LocationPicker lat={formData.lat} lng={formData.lng} onChange={(field, val) => setFormData({...formData, [field]: val})} />
          
          <Input label="Additional Information" value={formData.info} onChange={(e) => setFormData({...formData, info: e.target.value})} />
          
          <Button type="submit" variant="danger" className="w-full font-bold" isLoading={isLoading}>
            <ShieldAlert className="mr-2" /> SUBMIT EMERGENCY REQUEST
          </Button>
        </form>
      </Card>
    </div>
  );
};