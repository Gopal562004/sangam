import React, { useState } from 'react';
import Icon from '../../../../components/AppIcon';
import Input from '../../../../components/ui/Input';
import Select from '../../../../components/ui/Select';
import { Checkbox } from '../../../../components/ui/Checkbox';
import Button from '../../../../components/ui/Button';

const FilterPanel = ({ 
  filters, 
  onFiltersChange, 
  onClearFilters, 
  isCollapsed, 
  onToggleCollapse,
  totalResults 
}) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const graduationYearOptions = [
    { value: '', label: 'All Years' },
    { value: '2024', label: '2024' },
    { value: '2023', label: '2023' },
    { value: '2022', label: '2022' },
    { value: '2021', label: '2021' },
    { value: '2020', label: '2020' },
    { value: '2019', label: '2019' },
    { value: '2018', label: '2018' },
    { value: '2017', label: '2017' },
    { value: '2016', label: '2016' },
    { value: '2015', label: '2015' },
    { value: '2010-2014', label: '2010-2014' },
    { value: '2005-2009', label: '2005-2009' },
    { value: '2000-2004', label: '2000-2004' },
    { value: 'before-2000', label: 'Before 2000' }
  ];

  const departmentOptions = [
    { value: '', label: 'All Departments' },
    { value: 'computer-science', label: 'Computer Science' },
    { value: 'engineering', label: 'Engineering' },
    { value: 'business', label: 'Business Administration' },
    { value: 'medicine', label: 'Medicine' },
    { value: 'law', label: 'Law' },
    { value: 'arts', label: 'Arts & Humanities' },
    { value: 'sciences', label: 'Natural Sciences' },
    { value: 'education', label: 'Education' },
    { value: 'psychology', label: 'Psychology' },
    { value: 'economics', label: 'Economics' }
  ];

  const industryOptions = [
    { value: '', label: 'All Industries' },
    { value: 'technology', label: 'Technology' },
    { value: 'finance', label: 'Finance & Banking' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'consulting', label: 'Consulting' },
    { value: 'education', label: 'Education' },
    { value: 'manufacturing', label: 'Manufacturing' },
    { value: 'retail', label: 'Retail' },
    { value: 'media', label: 'Media & Entertainment' },
    { value: 'nonprofit', label: 'Non-profit' },
    { value: 'government', label: 'Government' }
  ];

  const locationOptions = [
    { value: '', label: 'All Locations' },
    { value: 'new-york', label: 'New York, NY' },
    { value: 'san-francisco', label: 'San Francisco, CA' },
    { value: 'los-angeles', label: 'Los Angeles, CA' },
    { value: 'chicago', label: 'Chicago, IL' },
    { value: 'boston', label: 'Boston, MA' },
    { value: 'seattle', label: 'Seattle, WA' },
    { value: 'austin', label: 'Austin, TX' },
    { value: 'denver', label: 'Denver, CO' },
    { value: 'atlanta', label: 'Atlanta, GA' },
    { value: 'miami', label: 'Miami, FL' },
    { value: 'international', label: 'International' }
  ];

  const handleFilterChange = (key, value) => {
    const updatedFilters = { ...localFilters, [key]: value };
    setLocalFilters(updatedFilters);
    onFiltersChange(updatedFilters);
  };

  const handleClearAll = () => {
    const clearedFilters = {
      search: '',
      graduationYear: '',
      department: '',
      industry: '',
      location: '',
      skills: '',
      availableForMentorship: false,
      availableForSpeaking: false,
      availableForRecruiting: false
    };
    setLocalFilters(clearedFilters);
    onClearFilters();
  };

  const hasActiveFilters = Object.values(localFilters)?.some(value => 
    value !== '' && value !== false
  );

  return (
    <div className="bg-card border border-border rounded-lg">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <Icon name="Filter" size={20} className="text-text-secondary" />
          <h3 className="text-lg font-semibold text-text-primary">Filters</h3>
          {totalResults !== undefined && (
            <span className="px-2 py-1 bg-primary/10 text-primary text-sm rounded-full">
              {totalResults} results
            </span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearAll}
              iconName="X"
              iconPosition="left"
            >
              Clear All
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleCollapse}
            className="md:hidden"
          >
            <Icon name={isCollapsed ? "ChevronDown" : "ChevronUp"} size={20} />
          </Button>
        </div>
      </div>
      {/* Filter Content */}
      <div className={`${isCollapsed ? 'hidden md:block' : 'block'}`}>
        <div className="p-4 space-y-6">
          {/* Search */}
          <div>
            <Input
              label="Search Alumni"
              type="search"
              placeholder="Search by name or skills..."
              value={localFilters?.search}
              onChange={(e) => handleFilterChange('search', e?.target?.value)}
              className="w-full"
            />
          </div>

          {/* Skills */}
          <div>
            <Input
              label="Skills"
              type="text"
              placeholder="e.g., JavaScript, Marketing, Finance"
              value={localFilters?.skills}
              onChange={(e) => handleFilterChange('skills', e?.target?.value)}
              description="Separate multiple skills with commas"
            />
          </div>

          {/* Dropdowns Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Graduation Year"
              options={graduationYearOptions}
              value={localFilters?.graduationYear}
              onChange={(value) => handleFilterChange('graduationYear', value)}
            />
            <Select
              label="Department"
              options={departmentOptions}
              value={localFilters?.department}
              onChange={(value) => handleFilterChange('department', value)}
            />
          </div>

          {/* Dropdowns Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Industry"
              options={industryOptions}
              value={localFilters?.industry}
              onChange={(value) => handleFilterChange('industry', value)}
            />
            <Select
              label="Location"
              options={locationOptions}
              value={localFilters?.location}
              onChange={(value) => handleFilterChange('location', value)}
            />
          </div>

          {/* Availability Checkboxes */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-3">
              Availability
            </label>
            <div className="space-y-3">
              <Checkbox
                label="Available for Mentorship"
                checked={localFilters?.availableForMentorship}
                onChange={(e) => handleFilterChange('availableForMentorship', e?.target?.checked)}
              />
              <Checkbox
                label="Available for Speaking Engagements"
                checked={localFilters?.availableForSpeaking}
                onChange={(e) => handleFilterChange('availableForSpeaking', e?.target?.checked)}
              />
              <Checkbox
                label="Available for Recruiting Partnerships"
                checked={localFilters?.availableForRecruiting}
                onChange={(e) => handleFilterChange('availableForRecruiting', e?.target?.checked)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;