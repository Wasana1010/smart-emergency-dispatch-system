import React, { useState, useEffect } from 'react';
import { ShieldAlert, Truck, Building2, AlertOctagon, Clock } from 'lucide-react';
import { DashboardLayout } from '../../layouts/DashboardLayout';
import { Card } from '../../components/Card';
import { StatusBadge } from '../../components/StatusBadge';
import EmergencyMap from '../../components/map/EmergencyMap';
import { emergencyService } from '../../services/emergencyService';

export const AdminDashboard = () => {
    const [emergencies, setEmergencies] = useState([]);
    const [priorityQueue, setPriorityQueue] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            // Fetch live data from backend REST endpoints
            const [allEmg, queueEmg] = await Promise.all([
                emergencyService.getAllEmergencies(),
                emergencyService.getPriorityQueue()
            ]);
            setEmergencies(allEmg);
            setPriorityQueue(queueEmg);
        } catch (error) {
            console.error("Failed to load dashboard data from backend:", error);
        } finally {
            setLoading(false);
        }
    };

    // Calculate dynamic counts from real data
    const totalCount = emergencies.length;
    const pendingCount = emergencies.filter(e => e.status === 'PENDING').length;
    const criticalCount = emergencies.filter(e => e.priority === 'CRITICAL').length;
    const activeTripsCount = emergencies.filter(e => e.status === 'EN_ROUTE_TO_HOSPITAL' || e.status === 'AMBULANCE_EN_ROUTE').length;

    const stats = [
        { title: 'Total Emergencies', value: totalCount, icon: ShieldAlert, color: 'text-blue-600' },
        { title: 'Pending Tasks', value: pendingCount, icon: Clock, color: 'text-yellow-600' },
        { title: 'Critical Status', value: criticalCount, icon: AlertOctagon, color: 'text-red-600' },
        { title: 'Active Trips', value: activeTripsCount, icon: Truck, color: 'text-emerald-600' },
    ];

    return (
        <DashboardLayout role="DISPATCHER">
            <div className="space-y-6">
                <h1 className="text-2xl font-bold text-gray-900">Operations Command Center</h1>

                {/* Top Statistics Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {stats.map((s, i) => (
                        <Card key={i} className="flex items-center p-4">
                            <s.icon className={`w-8 h-8 ${s.color} mr-4`} />
                            <div>
                                <p className="text-xs text-gray-500 uppercase font-semibold">{s.title}</p>
                                <p className="text-2xl font-bold">{loading ? '...' : s.value}</p>
                            </div>
                        </Card>
                    ))}
                </div>

                {/* Row: Priority Queue & Live Map Integration */}
                <div className="grid lg:grid-cols-3 gap-6">
                    <Card title="Priority Emergency Queue (Heap Sorted)" className="lg:col-span-2">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="text-gray-500 border-b">
                                    <tr>
                                        <th className="pb-3">Request #</th>
                                        <th className="pb-3">Type</th>
                                        <th className="pb-3">Priority</th>
                                        <th className="pb-3">Status</th>
                                        <th className="pb-3">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y">
                                    {loading ? (
                                        <tr><td colSpan="5" className="py-4 text-center text-gray-500">Loading priority queue...</td></tr>
                                    ) : priorityQueue.length === 0 ? (
                                        <tr><td colSpan="5" className="py-4 text-center text-gray-500">No active priority incidents found.</td></tr>
                                    ) : (
                                        priorityQueue.slice(0, 5).map((emg) => (
                                            <tr key={emg.id} className="hover:bg-gray-50">
                                                <td className="py-3 font-medium">{emg.requestNumber}</td>
                                                <td className="py-3">{emg.emergencyType}</td>
                                                <td className="py-3"><StatusBadge status={emg.priority} /></td>
                                                <td className="py-3"><StatusBadge status={emg.status} /></td>
                                                <td className="py-3 text-blue-600 font-semibold cursor-pointer">Dispatch</td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </Card>

                    <Card title="Live Operations Map" className="flex flex-col">
                        <div className="w-full overflow-hidden rounded-lg">
                            <EmergencyMap 
                                center={[6.5854, 79.9607]} // Centered around Kalutara
                                zoom={12}
                                emergencyLocation={emergencies.length > 0 ? { lat: emergencies[0].latitude, lon: emergencies[0].longitude } : null}
                            />
                        </div>
                    </Card>
                </div>

                {/* Bottom: Fleet & Hospital Overview */}
                <div className="grid lg:grid-cols-2 gap-6">
                    <Card title="Ambulance Fleet Status">
                        <div className="flex justify-between items-center p-3 border rounded-lg">
                            <span>AMB-042 (Advanced Life Support)</span>
                            <StatusBadge status="BUSY" />
                        </div>
                        <div className="mt-2 flex justify-between items-center p-3 border rounded-lg">
                            <span>AMB-011 (Basic Life Support)</span>
                            <StatusBadge status="AVAILABLE" />
                        </div>
                    </Card>
                    
                    <Card title="Hospital Capacity">
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-medium">Kalutara General Hospital</span>
                                <StatusBadge status="CRITICAL" />
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-red-500 h-2 rounded-full w-[95%]"></div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default AdminDashboard;