import React from 'react';
import Icon from '../../../../AppIcon';
import Image from '../../../../AppImage';

const TrendingPanel = ({ trendingTopics, activeContributors }) => {
  return (
    <div className="space-y-6">
      {/* Trending Topics */}
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="TrendingUp" size={20} className="text-accent" />
          <h3 className="font-semibold text-card-foreground">Trending Topics</h3>
        </div>
        
        <div className="space-y-3">
          {trendingTopics?.map((topic, index) => (
            <div key={topic?.id} className="flex items-center space-x-3">
              <div className="w-6 h-6 rounded-full bg-accent/20 text-accent flex items-center justify-center text-xs font-bold">
                {index + 1}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-card-foreground line-clamp-1">
                  {topic?.title}
                </p>
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <span>{topic?.discussionCount} discussions</span>
                  <span>•</span>
                  <span>{topic?.engagement} engagement</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Active Contributors */}
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="Users" size={20} className="text-primary" />
          <h3 className="font-semibold text-card-foreground">Top Contributors</h3>
        </div>
        
        <div className="space-y-3">
          {activeContributors?.map((contributor, index) => (
            <div key={contributor?.id} className="flex items-center space-x-3">
              <div className="relative">
                <Image
                  src={contributor?.avatar}
                  alt={contributor?.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
                {index < 3 && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-accent rounded-full flex items-center justify-center">
                    <Icon name="Crown" size={10} className="text-accent-foreground" />
                  </div>
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <p className="text-sm font-medium text-card-foreground">
                    {contributor?.name}
                  </p>
                  {contributor?.badge && (
                    <span className="px-1.5 py-0.5 bg-accent/20 text-accent rounded text-xs">
                      {contributor?.badge}
                    </span>
                  )}
                </div>
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <span>{contributor?.contributions} contributions</span>
                  <span>•</span>
                  <span>{contributor?.helpfulVotes} helpful votes</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Community Stats */}
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="BarChart3" size={20} className="text-success" />
          <h3 className="font-semibold text-card-foreground">Community Stats</h3>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Total Members</span>
            <span className="text-sm font-medium text-card-foreground">2,847</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Active Today</span>
            <span className="text-sm font-medium text-success">342</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Discussions</span>
            <span className="text-sm font-medium text-card-foreground">1,256</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Resources Shared</span>
            <span className="text-sm font-medium text-card-foreground">489</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendingPanel;