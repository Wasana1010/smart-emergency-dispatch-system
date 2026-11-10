import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import { Home } from './pages/Home';
import { Login } from './pages/auth/Login';
import { Register } from './pages/auth/Register';
import { EmergencyRequest } from './pages/emergency/EmergencyRequest';
import { UserDashboard } from './pages/user/UserDashboard';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AmbulanceManagement } from './pages/admin/ambulances/AmbulanceManagement';
import { AmbulanceDetails } from './pages/admin/ambulances/AmbulanceDetails';
import { AddAmbulance } from './pages/admin/ambulances/AddAmbulance';
import { HospitalManagement } from './pages/admin/hospitals/HospitalManagement';
import { AddHospital } from './pages/admin/hospitals/AddHospital';
import { HospitalDashboard } from './pages/hospital/HospitalDashboard';
import { BedManagement } from './pages/hospital/BedManagement';
import { RouteOptimizationView } from './pages/admin/routes/RouteOptimizationView';
import { RoadNetwork } from './pages/admin/routes/RoadNetwork';
import { RoadBlockage } from './pages/admin/routes/RoadBlockage';
import { PriorityQueue } from './pages/admin/emergencies/PriorityQueue';
import EmergencyDashboard from './pages/admin/emergencies/EmergencyDashboard';

export function App() {
  return (
    <Router>
      <Navbar />
      <div style={{ minHeight: '85vh', background: '#f8fafc' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/emergency-request" element={<EmergencyRequest />} />
          <Route path="/request" element={<EmergencyRequest />} />

          {/* Dashboards */}
          <Route path="/user" element={<UserDashboard />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/admin/emergency-dashboard" element={<EmergencyDashboard />} />
          <Route path="/admin/emergencies" element={<EmergencyDashboard />} />
          <Route path="/hospital" element={<HospitalDashboard />} />
          <Route path="/hospital-dashboard" element={<HospitalDashboard />} />
          <Route path="/hospital/beds" element={<BedManagement />} />

          {/* Management & Algorithm Views */}
          <Route path="/admin/ambulances" element={<AmbulanceManagement />} />
          <Route path="/admin/ambulances/add" element={<AddAmbulance />} />
          <Route path="/admin/ambulances/:id" element={<AmbulanceDetails />} />
          <Route path="/admin/hospitals" element={<HospitalManagement />} />
          <Route path="/admin/hospitals/add" element={<AddHospital />} />
          <Route path="/admin/roads" element={<RoadNetwork />} />
          <Route path="/admin/road-blockages" element={<RoadBlockage />} />
          <Route path="/admin/route-optimization" element={<RouteOptimizationView />} />
          <Route path="/admin/priority-queue" element={<PriorityQueue />} />
          <Route path="/admin/reports" element={<EmergencyDashboard />} />

          {/* User-side paths */}
          <Route path="/status" element={<UserDashboard />} />
          <Route path="/history" element={<UserDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;