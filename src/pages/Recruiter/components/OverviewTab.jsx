import React from "react";
import KPICard from "../components/KPICard";
import ApplicationChart from "../components/ApplicationChart";
import PipelineFunnel from "../components/PipelineFunnel";
import ActivityFeed from "../components/ActivityFeed";
import QuickStats from "../components/QuickStats";
import DepartmentBreakdown from "../components/DepartmentBreakdown";
import JobList from "../components/JobList";

const kpiData = [
  {
    title: "Active Job Postings",
    value: "47",
    icon: "Briefcase",
    color: "blue",
  },
  {
    title: "Total Applications",
    value: "1,247",
    icon: "Users",
    color: "purple",
  },
  {
    title: "Avg Time to Hire",
    value: "18.5 days",
    icon: "Clock",
    color: "green",
  },
  {
    title: "Cost per Hire",
    value: "$3,240",
    icon: "DollarSign",
    color: "yellow",
  },
];

export default function OverviewTab() {
  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, idx) => (
          <KPICard key={idx} {...kpi} />
        ))}
      </div>

      <QuickStats />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ApplicationChart />
        </div>
        <div className="lg:col-span-1">
          <PipelineFunnel />
        </div>
      </div>

      <JobList />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ActivityFeed />
        <DepartmentBreakdown />
      </div>
    </div>
  );
}
