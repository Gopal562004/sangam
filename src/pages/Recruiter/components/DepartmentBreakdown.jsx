import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const DepartmentBreakdown = () => {
  const departmentData = [
    { name: 'Engineering', value: 35, count: 438, color: '#2563eb' },
    { name: 'Sales', value: 22, count: 275, color: '#0ea5e9' },
    { name: 'Marketing', value: 18, count: 225, color: '#059669' },
    { name: 'Operations', value: 12, count: 150, color: '#ea580c' },
    { name: 'HR', value: 8, count: 100, color: '#dc2626' },
    { name: 'Finance', value: 5, count: 62, color: '#7c3aed' }
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload?.length) {
      const data = payload?.[0]?.payload;
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium text-foreground">{data?.name}</p>
          <p className="text-sm text-muted-foreground">
            Applications: {data?.count} ({data?.value}%)
          </p>
        </div>
      );
    }
    return null;
  };

  const CustomLegend = ({ payload }) => {
    return (
      <div className="grid grid-cols-2 gap-2 mt-4">
        {payload?.map((entry, index) => (
          <div key={index} className="flex items-center space-x-2">
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: entry?.color }}
            ></div>
            <span className="text-xs text-muted-foreground">{entry?.value}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Applications by Department</h3>
          <p className="text-sm text-muted-foreground">Distribution across departments</p>
        </div>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={departmentData}
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
            >
              {departmentData?.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry?.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend content={<CustomLegend />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 pt-4 border-t border-border">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-foreground">1,250</div>
            <div className="text-xs text-muted-foreground">Total Applications</div>
          </div>
          <div>
            <div className="text-lg font-bold text-primary">6</div>
            <div className="text-xs text-muted-foreground">Active Departments</div>
          </div>
          <div>
            <div className="text-lg font-bold text-success">15.2%</div>
            <div className="text-xs text-muted-foreground">Avg Conversion</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepartmentBreakdown;