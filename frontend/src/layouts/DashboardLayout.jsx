import React from 'react';
import { Navbar } from '../components/Navbar';
import { Sidebar } from '../components/Sidebar';
import { Footer } from '../components/Footer';

export const DashboardLayout = ({ children, role }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar userRole={role} />
      <div className="flex">
        <Sidebar role={role} />
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
};