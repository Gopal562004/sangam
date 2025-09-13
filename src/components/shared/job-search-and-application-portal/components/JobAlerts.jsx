import React, { useState } from 'react';
import Icon from '../../../AppIcon';
import Button from '../../../ui/Button';
import Input from '../../../ui/Input';
import { Checkbox } from '../../../ui/Checkbox';

const JobAlerts = ({ isOpen, onClose, onSave }) => {
  const [alertData, setAlertData] = useState({
    keywords: '',
    location: '',
    frequency: 'daily',
    categories: [],
    salaryMin: '',
    employmentTypes: []
  });

  const categories = [
    'Technology', 'Marketing', 'Sales', 'Design', 'Finance', 
    'Operations', 'Human Resources', 'Customer Service', 'Engineering'
  ];

  const employmentTypes = [
    'Full-time', 'Part-time', 'Contract', 'Freelance', 'Internship'
  ];

  const frequencies = [
    { value: 'immediate', label: 'Immediate' },
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' }
  ];

  const handleInputChange = (field, value) => {
    setAlertData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleArrayToggle = (field, value) => {
    setAlertData(prev => ({
      ...prev,
      [field]: prev?.[field]?.includes(value)
        ? prev?.[field]?.filter(item => item !== value)
        : [...prev?.[field], value]
    }));
  };

  const handleSave = () => {
    onSave?.(alertData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />
      {/* Modal */}
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-card w-full max-w-lg rounded-lg shadow-xl">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <h2 className="text-xl font-bold text-foreground">Create Job Alert</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-muted rounded-md transition-colors"
            >
              <Icon name="X" size={20} className="text-muted-foreground" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Keywords */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Keywords
              </label>
              <Input
                type="text"
                value={alertData?.keywords}
                onChange={(e) => handleInputChange('keywords', e?.target?.value)}
                placeholder="Job title, skills, or keywords"
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Location
              </label>
              <Input
                type="text"
                value={alertData?.location}
                onChange={(e) => handleInputChange('location', e?.target?.value)}
                placeholder="City, state, or remote"
              />
            </div>

            {/* Frequency */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Alert Frequency
              </label>
              <select
                value={alertData?.frequency}
                onChange={(e) => handleInputChange('frequency', e?.target?.value)}
                className="w-full px-3 py-2 border border-border rounded-md text-sm text-foreground bg-background"
              >
                {frequencies?.map(freq => (
                  <option key={freq?.value} value={freq?.value}>
                    {freq?.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Categories */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Job Categories
              </label>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {categories?.map(category => (
                  <Checkbox
                    key={category}
                    id={category}
                    checked={alertData?.categories?.includes(category)}
                    onChange={(checked) => handleArrayToggle('categories', category)}
                    label={category}
                  />
                ))}
              </div>
            </div>

            {/* Employment Types */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Employment Type
              </label>
              <div className="space-y-2">
                {employmentTypes?.map(type => (
                  <Checkbox
                    key={type}
                    id={type}
                    checked={alertData?.employmentTypes?.includes(type)}
                    onChange={(checked) => handleArrayToggle('employmentTypes', type)}
                    label={type}
                  />
                ))}
              </div>
            </div>

            {/* Minimum Salary */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Minimum Salary (Optional)
              </label>
              <select
                value={alertData?.salaryMin}
                onChange={(e) => handleInputChange('salaryMin', e?.target?.value)}
                className="w-full px-3 py-2 border border-border rounded-md text-sm text-foreground bg-background"
              >
                <option value="">Any salary</option>
                <option value="30000">$30,000+</option>
                <option value="50000">$50,000+</option>
                <option value="75000">$75,000+</option>
                <option value="100000">$100,000+</option>
                <option value="150000">$150,000+</option>
              </select>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end space-x-3 p-6 border-t border-border">
            <Button
              variant="outline"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
            >
              Create Alert
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobAlerts;