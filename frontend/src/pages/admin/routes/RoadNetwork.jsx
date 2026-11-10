import React from 'react';
import { DashboardLayout } from '../../../layouts/DashboardLayout';
import { Card } from '../../../components/Card';
import { Button } from '../../../components/Button';
import { StatusBadge } from '../../../components/StatusBadge';

export const RoadNetwork = () => {
  const roads = [{ id: 'R-001', from: 'Station A', to: 'Hospital 1', weight: 4.5, status: 'AVAILABLE' }];

  return (
    <DashboardLayout role="DISPATCHER">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Road Network Graph</h1>
        <Button>+ Add Road Segment</Button>
      </div>
      <Card title="Network Edges">
        <table className="w-full text-sm">
          <thead className="text-gray-500 border-b">
            <tr><th>From</th><th>To</th><th>Weight</th><th>Status</th><th>Action</th></tr>
          </thead>
          <tbody className="divide-y">
            {roads.map(r => (
              <tr key={r.id}>
                <td className="py-3">{r.from}</td>
                <td className="py-3">{r.to}</td>
                <td className="py-3">{r.weight}km</td>
                <td className="py-3"><StatusBadge status={r.status} /></td>
                <td className="py-3"><Button size="sm" variant="outline">Manage</Button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </DashboardLayout>
  );
};