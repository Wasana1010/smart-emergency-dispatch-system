import React from 'react';
import { Link } from 'react-router-dom';
import { LayoutDashboard, AlertTriangle, Truck, Building2, Map, Users, FileText } from 'lucide-react';

export const Sidebar = ({ role = 'DISPATCHER', activePath = '/' }) => {
  const menuItems = {
    DISPATCHER: [
      { name: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
      { name: 'Emergencies', icon: AlertTriangle, path: '/admin/emergencies' },
      { name: 'Ambulances', icon: Truck, path: '/admin/ambulances' },
      { name: 'Hospitals', icon: Building2, path: '/admin/hospitals' },
      { name: 'Road Network', icon: Map, path: '/admin/roads' },
      { name: 'Priority Queue', icon: FileText, path: '/admin/priority-queue' },
      { name: 'Reports', icon: Users, path: '/admin/reports' },
    ],
    CITIZEN: [
      { name: 'Request Emergency', icon: AlertTriangle, path: '/emergency-request' },
      { name: 'Active Status', icon: LayoutDashboard, path: '/status' },
      { name: 'History', icon: FileText, path: '/history' },
    ],
    DRIVER: [
      { name: 'Driver Dashboard', icon: LayoutDashboard, path: '/user' },
    ],
    HOSPITAL: [
      { name: 'Hospital Portal', icon: Building2, path: '/hospital' },
      { name: 'Bed Management', icon: FileText, path: '/hospital/beds' },
    ],
  };

  const links = menuItems[role] || menuItems.DISPATCHER;

  return (
    <aside className="w-64 bg-gray-900 text-gray-300 min-h-[calc(100vh-4rem)] p-4 flex flex-col justify-between hidden md:flex">
      <nav className="space-y-1">
        {links.map((item) => {
          const Icon = item.icon;
          const isActive = activePath === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center space-x-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive ? 'bg-blue-600 text-white' : 'hover:bg-gray-800 text-gray-400 hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
      <div className="px-4 py-3 bg-gray-800 rounded-lg text-xs text-gray-400">
        <p className="font-semibold text-gray-300">PDSA Coursework Engine</p>
        <p className="mt-0.5">Dijkstra & Heap Active</p>
      </div>
    </aside>
  );
};