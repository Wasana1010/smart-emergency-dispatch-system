import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../../services/authService';

export default function Navbar() {
    const navigate = useNavigate();
    const token = localStorage.getItem('jwt_token');
    const role = authService.getCurrentRole();

    const handleLogout = () => {
        authService.logout();
        navigate('/login');
    };

    return (
        <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '15px 30px', background: '#1e293b', color: '#fff' }}>
            <div>
                <Link to="/" style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold', fontSize: '1.2rem' }}>
                    🚨 Smart Emergency System
                </Link>
            </div>
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                <Link to="/" style={{ color: '#cbd5e1', textDecoration: 'none' }}>Home</Link>
                <Link to="/emergency-request" style={{ color: '#cbd5e1', textDecoration: 'none' }}>Report Emergency</Link>
                
                {token ? (
                    <>
                        {role === 'ADMIN' && <Link to="/admin-dashboard" style={{ color: '#cbd5e1', textDecoration: 'none' }}>Admin Panel</Link>}
                        {role === 'HOSPITAL' && <Link to="/hospital-dashboard" style={{ color: '#cbd5e1', textDecoration: 'none' }}>Hospital Portal</Link>}
                        <button onClick={handleLogout} style={{ background: '#ef4444', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' }}>
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" style={{ color: '#cbd5e1', textDecoration: 'none' }}>Login</Link>
                        <Link to="/register" style={{ background: '#3b82f6', color: '#fff', padding: '6px 12px', borderRadius: '4px', textDecoration: 'none' }}>Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
}