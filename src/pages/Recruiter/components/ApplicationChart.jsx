import React from 'react';
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ApplicationChart = () => {
  const chartData = [
    { month: 'Jan', applications: 245, conversionRate: 12.5 },
    { month: 'Feb', applications: 289, conversionRate: 15.2 },
    { month: 'Mar', applications: 312, conversionRate: 14.8 },
    { month: 'Apr', applications: 278, conversionRate: 16.3 },
    { month: 'May', applications: 356, conversionRate: 18.1 },
    { month: 'Jun', applications: 398, conversionRate: 17.9 },
    { month: 'Jul', applications: 423, conversionRate: 19.4 },
    { month: 'Aug', applications: 445, conversionRate: 20.2 },
    { month: 'Sep', applications: 467, conversionRate: 21.8 }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium text-foreground mb-2">{`${label} 2024`}</p>
          <div className="space-y-1">
            <p className="text-sm text-primary">
              <span className="inline-block w-3 h-3 bg-primary rounded-full mr-2"></span>
              Applications: {payload?.[0]?.value}
            </p>
            <p className="text-sm text-accent">
              <span className="inline-block w-3 h-3 bg-accent rounded-full mr-2"></span>
              Conversion Rate: {payload?.[1]?.value}%
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Application Volume & Conversion Rate</h3>
          <p className="text-sm text-muted-foreground">Monthly application trends with conversion performance</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-primary rounded-full"></div>
            <span className="text-sm text-muted-foreground">Applications</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-accent rounded-full"></div>
            <span className="text-sm text-muted-foreground">Conversion Rate</span>
          </div>
        </div>
      </div>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="month" 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <YAxis 
              yAxisId="left"
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <YAxis 
              yAxisId="right" 
              orientation="right"
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              yAxisId="left"
              dataKey="applications" 
              fill="var(--color-primary)"
              radius={[4, 4, 0, 0]}
              opacity={0.8}
            />
            <Line 
              yAxisId="right"
              type="monotone" 
              dataKey="conversionRate" 
              stroke="var(--color-accent)"
              strokeWidth={3}
              dot={{ fill: 'var(--color-accent)', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, fill: 'var(--color-accent)' }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ApplicationChart;