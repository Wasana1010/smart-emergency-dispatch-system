import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldAlert, User, Mail, Lock, Phone, MapPin, CreditCard } from 'lucide-react';
import { Input } from '../../components/Input';
import { Select } from '../../components/Select';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { authService } from '../../services/authService';

export const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    nic: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    address: '',
    role: 'USER',
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  const roleOptions = [
    { value: 'USER', label: 'Emergency User / Citizen' },
    { value: 'ADMIN', label: 'Dispatcher / Admin' },
    { value: 'DRIVER', label: 'Ambulance Driver' },
    { value: 'HOSPITAL', label: 'Hospital Staff' },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!formData.nic.trim()) newErrors.nic = 'NIC/ID is required';
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[0-9]{10,12}$/.test(formData.phone.replace(/[\s-]/g, ''))) {
      newErrors.phone = 'Invalid phone format';
    }
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!formData.address.trim()) newErrors.address = 'Address is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    setApiError('');

    try {
      await authService.register(formData);
      navigate('/login');
    } catch (err) {
      setApiError('Registration failed. Please check your network or try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-xl text-center">
        <div className="inline-flex p-3 bg-red-600 text-white rounded-2xl shadow-lg mb-4">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Create SmartEMS Account</h2>
        <p className="mt-2 text-sm text-gray-600">
          Already registered?{' '}
          <Link to="/login" className="font-medium text-red-600 hover:text-red-500">
            Sign in here
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl px-4 sm:px-0">
        <Card className="shadow-xl">
          {apiError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg">
              {apiError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Select
              label="Account Role"
              name="role"
              id="role"
              value={formData.role}
              onChange={handleChange}
              options={roleOptions}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Full Name"
                name="fullName"
                id="fullName"
                placeholder="John Doe"
                icon={User}
                value={formData.fullName}
                onChange={handleChange}
                error={errors.fullName}
              />
              <Input
                label="NIC / National ID"
                name="nic"
                id="nic"
                placeholder="199912345678"
                icon={CreditCard}
                value={formData.nic}
                onChange={handleChange}
                error={errors.nic}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Phone Number"
                name="phone"
                id="phone"
                placeholder="0771234567"
                icon={Phone}
                value={formData.phone}
                onChange={handleChange}
                error={errors.phone}
              />
              <Input
                label="Email Address"
                type="email"
                name="email"
                id="email"
                placeholder="user@example.com"
                icon={Mail}
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Password"
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                icon={Lock}
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
              />
              <Input
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                placeholder="••••••••"
                icon={Lock}
                value={formData.confirmPassword}
                onChange={handleChange}
                error={errors.confirmPassword}
              />
            </div>

            <Input
              label="Physical Address"
              name="address"
              id="address"
              placeholder="No 123, Main Street, City"
              icon={MapPin}
              value={formData.address}
              onChange={handleChange}
              error={errors.address}
            />

            <div className="pt-2">
              <Button type="submit" variant="danger" className="w-full" isLoading={isLoading}>
                Complete Registration
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Register;