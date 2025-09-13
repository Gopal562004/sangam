import React from 'react';
import Icon from '../../../../AppIcon';
import Button from '../../../../ui/Button';
import Input from '../../../../ui/Input';

const SessionFilters = ({ 
  filters, 
  onFiltersChange, 
  mentees = [],
  onClearFilters,
  className = '' 
}) => {
  const statusOptions = [
    { value: '', label: 'All Status' },
    { value: 'upcoming', label: 'Upcoming' },
    { value: 'completed', label: 'Completed' },
    { value: 'cancelled', label: 'Cancelled' }
  ];

  const handleFilterChange = (key, value) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const hasActiveFilters = Object.values(filters)?.some(value => 
    value && value !== '' && value !== 'all'
  );

  return (
    <div className={`bg-card border border-border rounded-lg p-4 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium text-card-foreground">Filters</h3>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            iconName="X"
            iconPosition="left"
          >
            Clear All
          </Button>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Date Range */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-card-foreground">
            From Date
          </label>
          <Input
            type="date"
            value={filters?.startDate || ''}
            onChange={(e) => handleFilterChange('startDate', e?.target?.value)}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-card-foreground">
            To Date
          </label>
          <Input
            type="date"
            value={filters?.endDate || ''}
            onChange={(e) => handleFilterChange('endDate', e?.target?.value)}
          />
        </div>

        {/* Status Filter */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-card-foreground">
            Status
          </label>
          <select
            value={filters?.status || ''}
            onChange={(e) => handleFilterChange('status', e?.target?.value)}
            className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {statusOptions?.map(option => (
              <option key={option?.value} value={option?.value}>
                {option?.label}
              </option>
            ))}
          </select>
        </div>

        {/* Mentee Filter */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-card-foreground">
            Mentee
          </label>
          <select
            value={filters?.menteeId || ''}
            onChange={(e) => handleFilterChange('menteeId', e?.target?.value)}
            className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="">All Mentees</option>
            {mentees?.map(mentee => (
              <option key={mentee?.id} value={mentee?.id}>
                {mentee?.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* Search */}
      <div className="mt-4">
        <div className="relative">
          <Icon 
            name="Search" 
            size={16} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
          />
          <Input
            type="text"
            placeholder="Search sessions by topic or description..."
            value={filters?.search || ''}
            onChange={(e) => handleFilterChange('search', e?.target?.value)}
            className="pl-10"
          />
        </div>
      </div>
      {/* Quick Filters */}
      <div className="mt-4">
        <p className="text-sm font-medium text-card-foreground mb-2">Quick Filters</p>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={filters?.quickFilter === 'today' ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleFilterChange('quickFilter', 
              filters?.quickFilter === 'today' ? '' : 'today'
            )}
          >
            Today
          </Button>
          
          <Button
            variant={filters?.quickFilter === 'thisWeek' ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleFilterChange('quickFilter', 
              filters?.quickFilter === 'thisWeek' ? '' : 'thisWeek'
            )}
          >
            This Week
          </Button>
          
          <Button
            variant={filters?.quickFilter === 'thisMonth' ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleFilterChange('quickFilter', 
              filters?.quickFilter === 'thisMonth' ? '' : 'thisMonth'
            )}
          >
            This Month
          </Button>
          
          <Button
            variant={filters?.quickFilter === 'upcoming' ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleFilterChange('quickFilter', 
              filters?.quickFilter === 'upcoming' ? '' : 'upcoming'
            )}
          >
            Upcoming Only
          </Button>
        </div>
      </div>
      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="mt-4 pt-4 border-t border-border">
          <p className="text-sm font-medium text-card-foreground mb-2">Active Filters:</p>
          <div className="flex flex-wrap gap-2">
            {filters?.status && (
              <span className="inline-flex items-center space-x-1 px-2 py-1 bg-primary/20 text-primary rounded text-xs">
                <span>Status: {filters?.status}</span>
                <button onClick={() => handleFilterChange('status', '')}>
                  <Icon name="X" size={12} />
                </button>
              </span>
            )}
            
            {filters?.menteeId && (
              <span className="inline-flex items-center space-x-1 px-2 py-1 bg-primary/20 text-primary rounded text-xs">
                <span>Mentee: {mentees?.find(m => m?.id === filters?.menteeId)?.name}</span>
                <button onClick={() => handleFilterChange('menteeId', '')}>
                  <Icon name="X" size={12} />
                </button>
              </span>
            )}
            
            {filters?.startDate && (
              <span className="inline-flex items-center space-x-1 px-2 py-1 bg-primary/20 text-primary rounded text-xs">
                <span>From: {filters?.startDate}</span>
                <button onClick={() => handleFilterChange('startDate', '')}>
                  <Icon name="X" size={12} />
                </button>
              </span>
            )}
            
            {filters?.endDate && (
              <span className="inline-flex items-center space-x-1 px-2 py-1 bg-primary/20 text-primary rounded text-xs">
                <span>To: {filters?.endDate}</span>
                <button onClick={() => handleFilterChange('endDate', '')}>
                  <Icon name="X" size={12} />
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SessionFilters;