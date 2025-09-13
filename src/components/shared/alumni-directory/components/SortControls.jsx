import React from 'react';

import Select from '../../../../components/ui/Select';
import Button from '../../../../components/ui/Button';

const SortControls = ({ 
  sortBy, 
  sortOrder, 
  onSortChange, 
  viewMode, 
  onViewModeChange,
  selectedCount,
  onBulkAction,
  totalResults
}) => {
  const sortOptions = [
    { value: 'relevance', label: 'Relevance' },
    { value: 'name', label: 'Name' },
    { value: 'graduationYear', label: 'Graduation Year' },
    { value: 'location', label: 'Location' },
    { value: 'department', label: 'Department' },
    { value: 'lastActive', label: 'Last Active' }
  ];

  const handleSortByChange = (value) => {
    onSortChange(value, sortOrder);
  };

  const handleSortOrderToggle = () => {
    const newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    onSortChange(sortBy, newOrder);
  };

  const handleBulkConnect = () => {
    onBulkAction('connect');
  };

  const handleBulkMessage = () => {
    onBulkAction('message');
  };

  const handleBulkInvite = () => {
    onBulkAction('invite');
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        {/* Left Side - Sort Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
          <div className="flex items-center space-x-3">
            <Select
              options={sortOptions}
              value={sortBy}
              onChange={handleSortByChange}
              placeholder="Sort by..."
              className="w-40"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={handleSortOrderToggle}
              iconName={sortOrder === 'asc' ? 'ArrowUp' : 'ArrowDown'}
              iconPosition="left"
            >
              {sortOrder === 'asc' ? 'A-Z' : 'Z-A'}
            </Button>
          </div>

          {/* Results Count */}
          <div className="text-sm text-text-secondary">
            {totalResults} alumni found
          </div>
        </div>

        {/* Center - Bulk Actions (when items selected) */}
        {selectedCount > 0 && (
          <div className="flex items-center space-x-2 px-3 py-2 bg-primary/10 rounded-lg">
            <span className="text-sm font-medium text-primary">
              {selectedCount} selected
            </span>
            <div className="flex space-x-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBulkConnect}
                iconName="UserPlus"
                iconPosition="left"
              >
                Connect
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBulkMessage}
                iconName="MessageCircle"
                iconPosition="left"
              >
                Message
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBulkInvite}
                iconName="Calendar"
                iconPosition="left"
              >
                Invite
              </Button>
            </div>
          </div>
        )}

        {/* Right Side - View Controls */}
        <div className="flex items-center space-x-2">
          <span className="text-sm text-text-secondary hidden sm:inline">View:</span>
          <div className="flex bg-muted rounded-lg p-1">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onViewModeChange('grid')}
              iconName="Grid3X3"
              className="rounded-md"
            />
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onViewModeChange('list')}
              iconName="List"
              className="rounded-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SortControls;