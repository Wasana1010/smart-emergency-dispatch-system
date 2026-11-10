import React from 'react';
import { MapPin } from 'lucide-react';
import { Input } from './Input';

export const LocationPicker = ({ lat, lng, onChange, error }) => {
  return (
    <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
      <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
        <MapPin className="w-4 h-4" /> Emergency Location Coordinates
      </h4>
      <div className="grid grid-cols-2 gap-4">
        <Input 
          label="Latitude" 
          value={lat} 
          onChange={(e) => onChange('lat', e.target.value)} 
          error={error?.lat}
        />
        <Input 
          label="Longitude" 
          value={lng} 
          onChange={(e) => onChange('lng', e.target.value)} 
          error={error?.lng}
        />
      </div>
      <p className="text-[10px] text-gray-400 mt-1 italic">
        Future integration: Map API will auto-populate these fields.
      </p>
    </div>
  );
};