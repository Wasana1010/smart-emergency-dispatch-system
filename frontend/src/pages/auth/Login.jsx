import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldAlert, Mail, Lock } from 'lucide-react';

import { Input } from '../../components/Input';
import { Select } from '../../components/Select';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { authService } from '../../services/authService';

export const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'USER',
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  const roleOptions = [
    {
      value: 'USER',
      label: 'Emergency User / Citizen',
    },
    {
      value: 'ADMIN',
      label: 'Dispatcher / Admin',
    },
    {
      value: 'DRIVER',
      label: 'Ambulance Driver',
    },
    {
      value: 'HOSPITAL',
      label: 'Hospital Staff',
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((previous) => ({
        ...previous,
        [name]: '',
      }));
    }

    if (apiError) {
      setApiError('');
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email address format';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');

    if (!validate()) {
      return;
    }

    setIsLoading(true);

    try {
      // Send credentials to backend auth service
      const response = await authService.login(formData);

      console.log('Login successful:', response);

      // Extract role returned by backend response data
      const userRole = response?.role || formData.role || 'USER';

      // Route based on validated backend role permissions
      switch (userRole.toUpperCase()) {
        case 'ADMIN':
          navigate('/admin');
          break;
        case 'DRIVER':
        case 'USER':
          navigate('/user');
          break;
        case 'HOSPITAL':
          navigate('/hospital');
          break;
        default:
          navigate('/user');
          break;
      }
    } catch (error) {
      console.error('Login error:', error);

      if (error.response) {
        const status = error.response.status;
        const backendMessage =
          error.response.data?.error ||
          error.response.data?.message;

        if (status === 401) {
          setApiError(
            backendMessage || 'Invalid email or password.'
          );
        } else if (status === 403) {
          setApiError(
            'Access denied. Please check your credentials or account permissions.'
          );
        } else if (status === 400) {
          setApiError(
            backendMessage || 'Please check your login details.'
          );
        } else if (status >= 500) {
          setApiError(
            'Server error. Please try again later.'
          );
        } else {
          setApiError(
            backendMessage || 'Login failed. Please try again.'
          );
        }
      } else if (error.request) {
        setApiError(
          'Cannot connect to the server. Please make sure the Spring Boot backend is running.'
        );
      } else {
        setApiError('Login failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="inline-flex p-3 bg-red-600 text-white rounded-2xl shadow-lg mb-4">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          Sign in to SmartEMS
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Or{' '}
          <Link
            to="/register"
            className="font-medium text-red-600 hover:text-red-500"
          >
            create a new emergency profile
          </Link>
        </p>
      </div>

      {/* Login Card */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <Card className="shadow-xl">
          {/* API Error Alert */}
          {apiError && (
            <div
              className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg"
              role="alert"
            >
              {apiError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Role */}
            <Select
              label="Select Portal Role"
              name="role"
              id="role"
              value={formData.role}
              onChange={handleChange}
              options={roleOptions}
            />

            {/* Email */}
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
              autoComplete="email"
            />

            {/* Password */}
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
              autoComplete="current-password"
            />

            {/* Submit Button */}
            <div className="pt-2">
              <Button
                type="submit"
                variant="danger"
                className="w-full"
                isLoading={isLoading}
                disabled={isLoading}
              >
                {isLoading ? 'Signing In...' : 'Sign In'}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Login;