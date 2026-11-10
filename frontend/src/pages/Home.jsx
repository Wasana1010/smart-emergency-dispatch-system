import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ShieldAlert, 
  MapPin, 
  Truck, 
  Building2, 
  Activity, 
  Clock, 
  PhoneCall, 
  Navigation
} from 'lucide-react';
import { Button } from '../components/Button';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900 font-sans">
      {/* Top Navbar */}
      <Navbar userRole="Citizen / Public" userName="Guest User" />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-900 to-red-950 text-white py-20 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-red-500/10 border border-red-500/20 rounded-full text-red-400 text-xs font-semibold tracking-wide uppercase">
              <ShieldAlert className="w-4 h-4 animate-pulse" />
              <span>Smart Emergency Dispatch Engine</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
              Rapid Response, <span className="text-red-500">Optimized Routing</span> & Saving Lives.
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed">
              An advanced full-stack emergency management platform powered by Dijkstra’s shortest path algorithm, dynamic traffic adjustments, and real-time hospital bed allocation.
            </p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 pt-4">
              <Button 
                variant="danger" 
                size="lg" 
                className="shadow-lg shadow-red-600/30 font-bold"
                onClick={() => navigate('/emergency-request')}
              >
                <ShieldAlert className="w-5 h-5 mr-2" />
                Request Emergency Help
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="bg-transparent border-gray-700 text-white hover:bg-gray-800"
                onClick={() => navigate('/admin')}
              >
                <Navigation className="w-5 h-5 mr-2" />
                Track Live Ambulance
              </Button>
            </div>
          </div>

          {/* Hero Highlight Card (Mock Data preview) */}
          <div className="bg-gray-800/60 border border-gray-700/60 p-6 sm:p-8 rounded-2xl backdrop-blur-md shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-gray-700">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-emerald-500 rounded-full animate-ping" />
                <span className="font-semibold text-sm text-gray-200">System Status: Operational</span>
              </div>
              <span className="text-xs bg-gray-700 text-gray-300 px-2.5 py-1 rounded-md">PDSA Engine Active</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-900/50 p-4 rounded-xl border border-gray-800">
                <p className="text-xs text-gray-400">Active Ambulances</p>
                <p className="text-2xl font-bold text-white mt-1">24 / 28</p>
                <span className="text-xs text-emerald-400 font-medium">85% Fleet Ready</span>
              </div>
              <div className="bg-gray-900/50 p-4 rounded-xl border border-gray-800">
                <p className="text-xs text-gray-400">Avg Response Time</p>
                <p className="text-2xl font-bold text-white mt-1">4.2 min</p>
                <span className="text-xs text-blue-400 font-medium">Optimized via Dijkstra</span>
              </div>
            </div>
            <div className="p-4 bg-red-950/30 border border-red-900/40 rounded-xl flex items-start space-x-3">
              <Activity className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              <p className="text-xs text-red-200">
                Priority queue actively sorting emergency requests based on patient trauma severity and waiting intervals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Action Cards Section */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 -mt-10 relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-md hover:shadow-lg transition-shadow">
          <div className="w-12 h-12 bg-red-100 text-red-600 rounded-xl flex items-center justify-center mb-4">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-gray-900 text-lg">Instant SOS</h3>
          <p className="text-xs text-gray-500 mt-1">Rapid emergency triggering with condition checklists and location coordinates.</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-md hover:shadow-lg transition-shadow">
          <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-4">
            <Truck className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-gray-900 text-lg">Fleet Management</h3>
          <p className="text-xs text-gray-500 mt-1">Real-time dispatcher view tracking drivers, active trips, and vehicle availability.</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-md hover:shadow-lg transition-shadow">
          <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mb-4">
            <Building2 className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-gray-900 text-lg">Hospital Coordination</h3>
          <p className="text-xs text-gray-500 mt-1">Live updates on emergency beds, ICU capacity, and incoming ambulance feeds.</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-md hover:shadow-lg transition-shadow">
          <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-4">
            <MapPin className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-gray-900 text-lg">Smart Routing</h3>
          <p className="text-xs text-gray-500 mt-1">Advanced path calculation avoiding road blockages and traffic bottlenecks.</p>
        </div>
      </section>

      {/* How It Works & Smart Routing Section */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-20">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">How the Smart System Works</h2>
          <p className="text-gray-500 text-sm mt-2">Integrating software engineering data structures with emergency medical dispatching.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm space-y-4">
            <div className="w-10 h-10 bg-red-600 text-white font-bold rounded-lg flex items-center justify-center">1</div>
            <h3 className="text-xl font-bold text-gray-900">Priority Queue Processing</h3>
            <p className="text-sm text-gray-600">
              Incoming emergency cases are categorized (Critical, High, Medium, Low) and processed using a Java Min Heap / Priority Queue to guarantee critical patients are serviced first.
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm space-y-4">
            <div className="w-10 h-10 bg-red-600 text-white font-bold rounded-lg flex items-center justify-center">2</div>
            <h3 className="text-xl font-bold text-gray-900">Dijkstra's Shortest Path</h3>
            <p className="text-sm text-gray-600">
              Road networks are structured as weighted graphs. The backend calculates optimal paths while dynamically circumventing reported road closures and blockages.
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm space-y-4">
            <div className="w-10 h-10 bg-red-600 text-white font-bold rounded-lg flex items-center justify-center">3</div>
            <h3 className="text-xl font-bold text-gray-900">Automated Allocation</h3>
            <p className="text-sm text-gray-600">
              The system factors in ambulance availability, vehicle type, travel distance, and hospital ICU capacity to match patients with the most appropriate medical facility.
            </p>
          </div>
        </div>
      </section>

      {/* Statistics Section (Mock Data) */}
      <section className="bg-gray-900 text-white py-16 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <p className="text-3xl sm:text-4xl font-extrabold text-red-500">1,420+</p>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">Emergencies Handled</p>
          </div>
          <div>
            <p className="text-3xl sm:text-4xl font-extrabold text-blue-400">99.8%</p>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">Route Accuracy</p>
          </div>
          <div>
            <p className="text-3xl sm:text-4xl font-extrabold text-emerald-400">3.5 min</p>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">Average Dispatch Time</p>
          </div>
          <div>
            <p className="text-3xl sm:text-4xl font-extrabold text-purple-400">12</p>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">Partner Hospitals</p>
          </div>
        </div>
      </section>

      {/* Emergency Call to Action */}
      <section className="max-w-5xl mx-auto px-6 py-20 w-full text-center">
        <div className="bg-gradient-to-r from-red-600 to-red-700 text-white rounded-3xl p-10 sm:p-14 shadow-2xl space-y-6">
          <ShieldAlert className="w-16 h-16 mx-auto text-white animate-bounce" />
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Need Immediate Emergency Assistance?</h2>
          <p className="text-red-100 max-w-xl mx-auto text-sm sm:text-base">
            Our dispatch center and automated routing engines are online 24/7. Click below to submit an emergency request instantly.
          </p>
          <div className="pt-4">
            <Button 
              variant="secondary" 
              size="lg" 
              className="bg-white text-red-600 hover:bg-gray-100 font-bold px-8 shadow-lg"
              onClick={() => navigate('/emergency-request')}
            >
              <PhoneCall className="w-5 h-5 mr-2" />
              Trigger Emergency SOS Now
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;