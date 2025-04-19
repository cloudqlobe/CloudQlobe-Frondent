import React, { useEffect, useState } from 'react';
import { ChevronDown, Key, Bell, Shield, User, Moon, Lock } from 'lucide-react';
import DashboardLayout from '../dash_layout/page';
import { jwtDecode } from 'jwt-decode';
import axiosInstance from '../../../utils/axiosinstance';

const SettingsPage = () => {
  const [expandedSection, setExpandedSection] = useState(null);
  const [expandedPasswordOption, setExpandedPasswordOption] = useState(null);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState({ type: '', text: '' });
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const decoded = jwtDecode(token);
          const customerId = decoded.id;
          const response = await axiosInstance.get(`api/customer/${customerId}`);
          setProfileData(response.data.customer);
        }
      } catch (error) {
        console.error("Error fetching profile data", error);
      }
    };
    fetchProfileData();
  }, []);

  const validatePassword = (password) => {
    // Minimum 6 characters, at least one special character
    const regex = /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;
    return regex.test(password);
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });
    
    // Reset errors
    setErrors({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });

    let isValid = true;
    const newErrors = {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    };

    // Validate current password
    if (!currentPassword) {
      newErrors.currentPassword = 'Current password is required';
      isValid = false;
    }

    // Validate new password
    if (!newPassword) {
      newErrors.newPassword = 'New password is required';
      isValid = false;
    } else if (newPassword.length < 6) {
      newErrors.newPassword = 'Password must be at least 6 characters';
      isValid = false;
    } else if (!validatePassword(newPassword)) {
      newErrors.newPassword = 'Password must contain at least one special character';
      isValid = false;
    }

    // Validate confirm password
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your new password';
      isValid = false;
    } else if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    if (!isValid) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const decoded = jwtDecode(token);
      const customerId = decoded.id;

      // Verify current password first
      const verifyResponse = await axiosInstance.post('api/verify-password', {
        customerId,
        password: currentPassword
      });

      if (!verifyResponse.data.isValid) {
        setMessage({ type: 'error', text: 'Current password is incorrect' });
        setLoading(false);
        return;
      }

      // Update password
      const updateResponse = await axiosInstance.put(`api/${customerId}/password`, {
        newPassword
      });

      if (updateResponse.data.success) {
        setMessage({ type: 'success', text: 'Password updated successfully!' });
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        setMessage({ type: 'error', text: updateResponse.data.message || 'Failed to update password' });
      }
    } catch (error) {
      console.error("Error updating password:", error);
      setMessage({ 
        type: 'error', 
        text: error.response?.data?.message || 'An error occurred while updating password' 
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = (e) => {
    e.preventDefault();
    setMessage({ type: 'success', text: 'Password reset link sent to your email!' });
    setEmail('');
  };

  const settingsSections = [
    {
      id: 'password',
      title: 'Password & Security',
      icon: <Key className="w-5 h-5" />,
      description: 'Update your password and security preferences',
      options: [
        {
          id: 'change',
          title: 'Change Password',
          icon: <Lock className="w-4 h-4" />,
          description: 'Update your current password'
        },
      ]
    },
    {
      id: 'notifications',
      title: 'Notifications',
      icon: <Bell className="w-5 h-5" />,
      description: 'Manage your notification preferences'
    },
    {
      id: 'privacy',
      title: 'Privacy',
      icon: <Shield className="w-5 h-5" />,
      description: 'Control your privacy settings'
    },
    {
      id: 'profile',
      title: 'Profile',
      icon: <User className="w-5 h-5" />,
      description: 'Update your profile information'
    },
    {
      id: 'appearance',
      title: 'Appearance',
      icon: <Moon className="w-5 h-5" />,
      description: 'Customize your interface'
    }
  ];

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Settings</h1>
          <p className="text-gray-600 mb-8">Manage your account preferences and settings</p>

          <div className="space-y-4">
            {settingsSections.map((section) => (
              <div
                key={section.id}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
              >
                <button
                  onClick={() => {
                    setExpandedSection(expandedSection === section.id ? null : section.id);
                    setExpandedPasswordOption(null);
                  }}
                  className="w-full p-4 flex items-center justify-between text-left"
                >
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                      {section.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{section.title}</h3>
                      <p className="text-sm text-gray-600">{section.description}</p>
                    </div>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${
                      expandedSection === section.id ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    expandedSection === section.id ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  {section.id === 'password' && (
                    <div className="p-4 border-t space-y-4">
                      {section.options?.map((option) => (
                        <div key={option.id} className="bg-gray-50 rounded-lg">
                          <button
                            onClick={() => setExpandedPasswordOption(
                              expandedPasswordOption === option.id ? null : option.id
                            )}
                            className="w-full p-3 flex items-center justify-between text-left hover:bg-gray-100 rounded-lg transition-colors duration-200"
                          >
                            <div className="flex items-center space-x-3">
                              <div className="p-1.5 bg-white rounded-md text-blue-600 shadow-sm">
                                {option.icon}
                              </div>
                              <div>
                                <h4 className="font-medium text-gray-800">{option.title}</h4>
                                <p className="text-sm text-gray-600">{option.description}</p>
                              </div>
                            </div>
                            <ChevronDown
                              className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${
                                expandedPasswordOption === option.id ? 'transform rotate-180' : ''
                              }`}
                            />
                          </button>

                          <div
                            className={`overflow-hidden transition-all duration-300 ease-in-out ${
                              expandedPasswordOption === option.id ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                            }`}
                          >
                            {option.id === 'change' && (
                              <form onSubmit={handlePasswordSubmit} className="p-4 space-y-4">
                                <div className="space-y-2">
                                  <label className="block text-sm font-medium text-gray-700">
                                    Current Password
                                  </label>
                                  <input
                                    type="password"
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                    className={`w-full px-3 py-2 border ${
                                      errors.currentPassword ? 'border-red-500' : 'border-gray-300'
                                    } rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                                  />
                                  {errors.currentPassword && (
                                    <p className="text-sm text-red-600">{errors.currentPassword}</p>
                                  )}
                                </div>

                                <div className="space-y-2">
                                  <label className="block text-sm font-medium text-gray-700">
                                    New Password
                                  </label>
                                  <input
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className={`w-full px-3 py-2 border ${
                                      errors.newPassword ? 'border-red-500' : 'border-gray-300'
                                    } rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                                  />
                                  {errors.newPassword && (
                                    <p className="text-sm text-red-600">{errors.newPassword}</p>
                                  )}
                                  <p className="text-xs text-gray-500">
                                    Password must be at least 6 characters with at least one special character
                                  </p>
                                </div>

                                <div className="space-y-2">
                                  <label className="block text-sm font-medium text-gray-700">
                                    Confirm New Password
                                  </label>
                                  <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className={`w-full px-3 py-2 border ${
                                      errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                                    } rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                                  />
                                  {errors.confirmPassword && (
                                    <p className="text-sm text-red-600">{errors.confirmPassword}</p>
                                  )}
                                </div>

                                <button
                                  type="submit"
                                  disabled={loading}
                                  className={`w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-300 ${
                                    loading ? 'opacity-70 cursor-not-allowed' : ''
                                  }`}
                                >
                                  {loading ? 'Updating...' : 'Update Password'}
                                </button>
                              </form>
                            )}
                          </div>
                        </div>
                      ))}

                      {message.text && (
                        <div
                          className={`p-4 rounded-md ${
                            message.type === 'error'
                              ? 'bg-red-50 text-red-700'
                              : 'bg-green-50 text-green-700'
                          }`}
                        >
                          {message.text}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SettingsPage;