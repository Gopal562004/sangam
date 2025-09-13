import React from 'react';
import Icon from '../../../components/AppIcon';

const PipelineFunnel = () => {
  const pipelineData = [
    { stage: 'Applications', count: 1247, percentage: 100, color: 'bg-primary' },
    { stage: 'Screening', count: 623, percentage: 50, color: 'bg-accent' },
    { stage: 'Phone Interview', count: 312, percentage: 25, color: 'bg-warning' },
    { stage: 'Technical Interview', count: 156, percentage: 12.5, color: 'bg-secondary' },
    { stage: 'Final Interview', count: 78, percentage: 6.3, color: 'bg-success' },
    { stage: 'Offer Extended', count: 39, percentage: 3.1, color: 'bg-success' },
    { stage: 'Hired', count: 31, percentage: 2.5, color: 'bg-success' }
  ];

  const getDropoffRate = (index) => {
    if (index === 0) return null;
    const current = pipelineData?.[index]?.count;
    const previous = pipelineData?.[index - 1]?.count;
    const dropoff = ((previous - current) / previous * 100)?.toFixed(1);
    return dropoff;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Candidate Pipeline</h3>
          <p className="text-sm text-muted-foreground">Current funnel performance</p>
        </div>
        <button className="text-primary hover:text-primary/80 text-sm font-medium">
          View Details
        </button>
      </div>
      <div className="space-y-4">
        {pipelineData?.map((stage, index) => {
          const dropoff = getDropoffRate(index);
          return (
            <div key={stage?.stage} className="relative">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${stage?.color}`}></div>
                  <span className="text-sm font-medium text-foreground">{stage?.stage}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-bold text-foreground">{stage?.count}</span>
                  <span className="text-xs text-muted-foreground">({stage?.percentage}%)</span>
                </div>
              </div>
              <div className="relative">
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${stage?.color} transition-all duration-300`}
                    style={{ width: `${stage?.percentage}%` }}
                  ></div>
                </div>
              </div>
              {dropoff && (
                <div className="flex items-center justify-end mt-1">
                  <div className="flex items-center space-x-1 text-xs text-error">
                    <Icon name="TrendingDown" size={12} />
                    <span>{dropoff}% drop-off</span>
                  </div>
                </div>
              )}
              {index < pipelineData?.length - 1 && (
                <div className="flex justify-center my-2">
                  <Icon name="ChevronDown" size={16} className="text-muted-foreground" />
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="mt-6 pt-4 border-t border-border">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-lg font-bold text-success">2.5%</div>
            <div className="text-xs text-muted-foreground">Overall Conversion</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-warning">18.5 days</div>
            <div className="text-xs text-muted-foreground">Avg. Time to Hire</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PipelineFunnel;