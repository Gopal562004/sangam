import React, { useState } from 'react';
import AlumniCard from './AlumniCard';
import { Checkbox } from '../../../../components/ui/Checkbox';
import Button from '../../../../components/ui/Button';
import Icon from '../../../../components/AppIcon';

const AlumniGrid = ({ 
  alumni, 
  viewMode, 
  onConnect, 
  onMessage, 
  selectedAlumni, 
  onSelectionChange,
  loading = false 
}) => {
  const [selectAll, setSelectAll] = useState(false);

  const handleSelectAll = (checked) => {
    setSelectAll(checked);
    if (checked) {
      onSelectionChange(alumni?.map(a => a?.id));
    } else {
      onSelectionChange([]);
    }
  };

  const handleSelectAlumni = (alumniId, checked) => {
    if (checked) {
      onSelectionChange([...selectedAlumni, alumniId]);
    } else {
      onSelectionChange(selectedAlumni?.filter(id => id !== alumniId));
      setSelectAll(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {/* Loading Header */}
        <div className="flex items-center justify-between p-4 bg-card border border-border rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="w-4 h-4 bg-muted rounded animate-pulse"></div>
            <div className="w-24 h-4 bg-muted rounded animate-pulse"></div>
          </div>
        </div>
        {/* Loading Grid */}
        <div className={`grid gap-6 ${
          viewMode === 'grid' ?'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' :'grid-cols-1'
        }`}>
          {Array.from({ length: 8 })?.map((_, index) => (
            <div key={index} className="bg-card border border-border rounded-lg p-6">
              <div className="flex justify-center mb-4">
                <div className="w-20 h-20 bg-muted rounded-full animate-pulse"></div>
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-muted rounded animate-pulse"></div>
                <div className="h-3 bg-muted rounded animate-pulse w-3/4 mx-auto"></div>
                <div className="h-3 bg-muted rounded animate-pulse w-1/2 mx-auto"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (alumni?.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="Users" size={32} className="text-text-secondary" />
        </div>
        <h3 className="text-lg font-semibold text-text-primary mb-2">
          No Alumni Found
        </h3>
        <p className="text-text-secondary mb-6 max-w-md mx-auto">
          We couldn't find any alumni matching your current filters. Try adjusting your search criteria or clearing some filters.
        </p>
        <Button variant="outline" iconName="RotateCcw" iconPosition="left">
          Clear Filters
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Selection Header */}
      <div className="flex items-center justify-between p-4 bg-card border border-border rounded-lg">
        <div className="flex items-center space-x-3">
          <Checkbox
            checked={selectAll}
            onChange={(e) => handleSelectAll(e?.target?.checked)}
            indeterminate={selectedAlumni?.length > 0 && selectedAlumni?.length < alumni?.length}
          />
          <span className="text-sm text-text-secondary">
            {selectedAlumni?.length > 0 
              ? `${selectedAlumni?.length} of ${alumni?.length} selected`
              : `Select all ${alumni?.length} alumni`
            }
          </span>
        </div>
        
        {selectedAlumni?.length > 0 && (
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onSelectionChange([])}
              iconName="X"
            >
              Clear Selection
            </Button>
          </div>
        )}
      </div>
      {/* Alumni Grid/List */}
      <div className={`grid gap-6 ${
        viewMode === 'grid' ?'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' :'grid-cols-1'
      }`}>
        {alumni?.map((alumniMember) => (
          <div key={alumniMember?.id} className="relative">
            {/* Selection Checkbox */}
            <div className="absolute top-3 left-3 z-10">
              <Checkbox
                checked={selectedAlumni?.includes(alumniMember?.id)}
                onChange={(e) => handleSelectAlumni(alumniMember?.id, e?.target?.checked)}
                className="bg-white/90 backdrop-blur-sm"
              />
            </div>
            
            <AlumniCard
              alumni={alumniMember}
              viewMode={viewMode}
              onConnect={onConnect}
              onMessage={onMessage}
            />
          </div>
        ))}
      </div>
      {/* Load More Button */}
      {alumni?.length >= 20 && (
        <div className="text-center py-8">
          <Button
            variant="outline"
            iconName="ChevronDown"
            iconPosition="left"
          >
            Load More Alumni
          </Button>
        </div>
      )}
    </div>
  );
};

export default AlumniGrid;