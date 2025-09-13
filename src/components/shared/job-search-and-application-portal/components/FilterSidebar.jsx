import React, { useState } from 'react';
import Icon from '../../../AppIcon';
import { Checkbox } from '../../../ui/Checkbox';
import Select from '../../../ui/Select';

const FilterSidebar = ({ filters = {}, onFiltersChange }) => {
  const [expandedSections, setExpandedSections] = useState({
    jobType: true,
    experience: true,
    salary: true,
    company: true,
    posted: true
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev?.[section]
    }));
  };

  const handleFilterChange = (category, value, checked) => {
    const currentFilters = filters?.[category] || [];
    let newFilters;
    
    if (checked) {
      newFilters = [...currentFilters, value];
    } else {
      newFilters = currentFilters?.filter(f => f !== value);
    }
    
    onFiltersChange?.({
      ...filters,
      [category]: newFilters
    });
  };

  const handleRangeChange = (category, field, value) => {
    onFiltersChange?.({
      ...filters,
      [category]: {
        ...filters?.[category],
        [field]: value
      }
    });
  };

  const clearAllFilters = () => {
    onFiltersChange?.({});
  };

  const jobTypes = [
    { value: 'full-time', label: 'Full-time', count: 234 },
    { value: 'part-time', label: 'Part-time', count: 87 },
    { value: 'contract', label: 'Contract', count: 156 },
    { value: 'freelance', label: 'Freelance', count: 45 },
    { value: 'internship', label: 'Internship', count: 78 }
  ];

  const experienceLevels = [
    { value: 'entry', label: 'Entry Level (0-2 years)', count: 145 },
    { value: 'mid', label: 'Mid Level (2-5 years)', count: 298 },
    { value: 'senior', label: 'Senior Level (5-10 years)', count: 167 },
    { value: 'executive', label: 'Executive (10+ years)', count: 89 }
  ];

  const companySizes = [
    { value: 'startup', label: 'Startup (1-50)', count: 89 },
    { value: 'small', label: 'Small (51-200)', count: 134 },
    { value: 'medium', label: 'Medium (201-1000)', count: 178 },
    { value: 'large', label: 'Large (1000+)', count: 234 }
  ];

  const postedTimes = [
    { value: 'today', label: 'Today', count: 23 },
    { value: 'week', label: 'Past week', count: 145 },
    { value: 'month', label: 'Past month', count: 356 },
    { value: 'anytime', label: 'Any time', count: 699 }
  ];

  const FilterSection = ({ title, section, children }) => (
    <div className="border-b border-border pb-4 mb-4">
      <button
        onClick={() => toggleSection(section)}
        className="flex items-center justify-between w-full py-2 text-left"
      >
        <h3 className="font-semibold text-foreground">{title}</h3>
        <Icon 
          name={expandedSections?.[section] ? "ChevronUp" : "ChevronDown"} 
          size={16} 
          className="text-muted-foreground" 
        />
      </button>
      {expandedSections?.[section] && (
        <div className="mt-3 space-y-3">
          {children}
        </div>
      )}
    </div>
  );

  return (
    <div className="w-full lg:w-80 bg-card border border-border rounded-lg p-6">
      {/* Filter Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-foreground">Filters</h2>
        <button
          onClick={clearAllFilters}
          className="text-sm text-primary hover:text-primary/80 font-medium"
        >
          Clear all
        </button>
      </div>

      {/* Job Type Filter */}
      <FilterSection title="Job Type" section="jobType">
        {jobTypes?.map((type) => (
          <div key={type?.value} className="flex items-center justify-between">
            <Checkbox
              id={type?.value}
              checked={filters?.jobType?.includes(type?.value)}
              onChange={(checked) => handleFilterChange('jobType', type?.value, checked)}
              label={type?.label}
              className="flex-1"
            />
            <span className="text-sm text-muted-foreground ml-2">({type?.count})</span>
          </div>
        ))}
      </FilterSection>

      {/* Experience Level Filter */}
      <FilterSection title="Experience Level" section="experience">
        {experienceLevels?.map((level) => (
          <div key={level?.value} className="flex items-center justify-between">
            <Checkbox
              id={level?.value}
              checked={filters?.experience?.includes(level?.value)}
              onChange={(checked) => handleFilterChange('experience', level?.value, checked)}
              label={level?.label}
              className="flex-1"
            />
            <span className="text-sm text-muted-foreground ml-2">({level?.count})</span>
          </div>
        ))}
      </FilterSection>

      {/* Salary Range Filter */}
      <FilterSection title="Salary Range" section="salary">
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium text-foreground block mb-1">Min</label>
              <Select
                value={filters?.salary?.min || ''}
                onChange={(value) => handleRangeChange('salary', 'min', value)}
                options={[
                  { value: '', label: 'Any' },
                  { value: '30000', label: '$30,000' },
                  { value: '50000', label: '$50,000' },
                  { value: '75000', label: '$75,000' },
                  { value: '100000', label: '$100,000' },
                  { value: '150000', label: '$150,000' }
                ]}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground block mb-1">Max</label>
              <Select
                value={filters?.salary?.max || ''}
                onChange={(value) => handleRangeChange('salary', 'max', value)}
                options={[
                  { value: '', label: 'Any' },
                  { value: '75000', label: '$75,000' },
                  { value: '100000', label: '$100,000' },
                  { value: '150000', label: '$150,000' },
                  { value: '200000', label: '$200,000' },
                  { value: '300000', label: '$300,000+' }
                ]}
              />
            </div>
          </div>
        </div>
      </FilterSection>

      {/* Company Size Filter */}
      <FilterSection title="Company Size" section="company">
        {companySizes?.map((size) => (
          <div key={size?.value} className="flex items-center justify-between">
            <Checkbox
              id={size?.value}
              checked={filters?.companySize?.includes(size?.value)}
              onChange={(checked) => handleFilterChange('companySize', size?.value, checked)}
              label={size?.label}
              className="flex-1"
            />
            <span className="text-sm text-muted-foreground ml-2">({size?.count})</span>
          </div>
        ))}
      </FilterSection>

      {/* Date Posted Filter */}
      <FilterSection title="Date Posted" section="posted">
        {postedTimes?.map((time) => (
          <div key={time?.value} className="flex items-center justify-between">
            <Checkbox
              id={time?.value}
              checked={filters?.posted?.includes(time?.value)}
              onChange={(checked) => handleFilterChange('posted', time?.value, checked)}
              label={time?.label}
              className="flex-1"
            />
            <span className="text-sm text-muted-foreground ml-2">({time?.count})</span>
          </div>
        ))}
      </FilterSection>

      {/* Active Filters Count */}
      {Object?.keys(filters)?.length > 0 && (
        <div className="mt-6 pt-4 border-t border-border">
          <div className="text-sm text-muted-foreground">
            {Object?.values(filters)?.flat()?.length} active filters
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterSidebar;