import React from 'react';
import Icon from '../../../../AppIcon';
import Button from '../../../../ui/Button';
import Input from '../../../../ui/Input';

const FilterPanel = ({ 
  filters, 
  onFilterChange, 
  onClearFilters, 
  isOpen, 
  onToggle 
}) => {
  const handleFilterChange = (key, value) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'completed', label: 'Completed' }
  ];

  const sessionTypeOptions = [
    { value: 'all', label: 'All Types' },
    { value: 'video', label: 'Video Call' },
    { value: 'audio', label: 'Audio Call' },
    { value: 'chat', label: 'Chat' },
    { value: 'in-person', label: 'In Person' }
  ];

  const dateRangeOptions = [
    { value: 'all', label: 'All Time' },
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'This Quarter' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const hasActiveFilters = Object.values(filters)?.some(value => 
    value && value !== 'all' && value !== ''
  );

  return (
    <div className="bg-card border border-border rounded-lg shadow-elevation-1">
      {/* Filter Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-2">
          <Icon name="Filter" size={20} className="text-muted-foreground" />
          <h3 className="font-medium text-card-foreground">Filters</h3>
          {hasActiveFilters && (
            <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-medium bg-accent text-accent-foreground rounded-full">
              {Object.values(filters)?.filter(value => value && value !== 'all' && value !== '')?.length}
            </span>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              iconName="X"
            >
              Clear
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggle}
            className="lg:hidden"
          >
            <Icon name={isOpen ? "ChevronUp" : "ChevronDown"} size={16} />
          </Button>
        </div>
      </div>
      {/* Filter Content */}
      <div className={`${isOpen ? 'block' : 'hidden'} lg:block`}>
        <div className="p-4 space-y-4">
          {/* Search */}
          <div>
            <Input
              type="search"
              placeholder="Search mentees, sessions..."
              value={filters?.search || ''}
              onChange={(e) => handleFilterChange('search', e?.target?.value)}
              className="w-full"
            />
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-sm font-medium text-card-foreground mb-2">
              Status
            </label>
            <select
              value={filters?.status || 'all'}
              onChange={(e) => handleFilterChange('status', e?.target?.value)}
              className="w-full px-3 py-2 border border-border rounded-lg text-sm bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {statusOptions?.map(option => (
                <option key={option?.value} value={option?.value}>
                  {option?.label}
                </option>
              ))}
            </select>
          </div>

          {/* Session Type Filter */}
          <div>
            <label className="block text-sm font-medium text-card-foreground mb-2">
              Session Type
            </label>
            <select
              value={filters?.sessionType || 'all'}
              onChange={(e) => handleFilterChange('sessionType', e?.target?.value)}
              className="w-full px-3 py-2 border border-border rounded-lg text-sm bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {sessionTypeOptions?.map(option => (
                <option key={option?.value} value={option?.value}>
                  {option?.label}
                </option>
              ))}
            </select>
          </div>

          {/* Date Range Filter */}
          <div>
            <label className="block text-sm font-medium text-card-foreground mb-2">
              Date Range
            </label>
            <select
              value={filters?.dateRange || 'all'}
              onChange={(e) => handleFilterChange('dateRange', e?.target?.value)}
              className="w-full px-3 py-2 border border-border rounded-lg text-sm bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {dateRangeOptions?.map(option => (
                <option key={option?.value} value={option?.value}>
                  {option?.label}
                </option>
              ))}
            </select>
          </div>

          {/* Custom Date Range */}
          {filters?.dateRange === 'custom' && (
            <div className="grid grid-cols-2 gap-2">
              <Input
                type="date"
                label="From"
                value={filters?.startDate || ''}
                onChange={(e) => handleFilterChange('startDate', e?.target?.value)}
              />
              <Input
                type="date"
                label="To"
                value={filters?.endDate || ''}
                onChange={(e) => handleFilterChange('endDate', e?.target?.value)}
              />
            </div>
          )}

          {/* Experience Level Filter */}
          <div>
            <label className="block text-sm font-medium text-card-foreground mb-2">
              Experience Level
            </label>
            <div className="space-y-2">
              {['beginner', 'intermediate', 'advanced']?.map(level => (
                <label key={level} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={filters?.experienceLevel?.includes(level) || false}
                    onChange={(e) => {
                      const current = filters?.experienceLevel || [];
                      const updated = e?.target?.checked
                        ? [...current, level]
                        : current?.filter(l => l !== level);
                      handleFilterChange('experienceLevel', updated);
                    }}
                    className="rounded border-border text-primary focus:ring-ring"
                  />
                  <span className="text-sm text-card-foreground capitalize">{level}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Apply Filters Button */}
        <div className="p-4 border-t border-border bg-muted/20">
          <Button
            variant="default"
            fullWidth
            iconName="Search"
            iconPosition="left"
          >
            Apply Filters
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;