import React from "react";
import MetricsCard from "../components/MetricsCard";
import AnalyticsChart from "../components/AnalyticsChart";
import ActivityFeed from "../components/ActivityFeed";
import Icon from "../../../components/AppIcon";

const Analytics = () => {
  // Sample Data
  const metrics = [
    {
      title: "Total Users",
      value: 235,
      icon: "Users",
      color: "primary",
    },
    {
      title: "Total Events",
      value: 56,
      icon: "Calendar",
      color: "warning",
    },
    {
      title: "Active Mentors",
      value: 12,
      icon: "UserCheck",
      color: "success",
    },
    {
      title: "Total Engagements",
      value: 178,
      icon: "Chat",
      color: "primary",
    },
  ];

  const chartData = {
    users: [
      { label: "Students", value: 120 },
      { label: "Alumni", value: 80 },
      { label: "Faculty", value: 30 },
      { label: "Admins", value: 5 },
    ],
    events: [
      { label: "Jan", value: 5 },
      { label: "Feb", value: 8 },
      { label: "Mar", value: 12 },
      { label: "Apr", value: 7 },
      { label: "May", value: 10 },
      { label: "Jun", value: 6 },
      { label: "Jul", value: 15 },
    ],
    mentorship: [
      { mentor: "Dr. Smith", mentees: 12 },
      { mentor: "Michael Rodriguez", mentees: 8 },
      { mentor: "Prof. Williams", mentees: 15 },
      { mentor: "Dr. Brown", mentees: 5 },
    ],
  };

  const activityFeedData = [
    { message: "Alumni Networking Event created", time: "2 hours ago" },
    { message: "New student verified", time: "4 hours ago" },
    { message: "Mentorship session started", time: "1 day ago" },
    { message: "Event completed: Donation Campaign", time: "2 days ago" },
  ];

  return (
    <div className="space-y-6 p-6">
      <h2 className="text-2xl font-bold text-text-primary">
        Analytics Dashboard
      </h2>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, idx) => (
          <MetricsCard
            key={idx}
            title={metric.title}
            value={metric.value}
            icon={
              <Icon
                name={metric.icon}
                size={28}
                className={`text-${metric.color}`}
              />
            }
          />
        ))}
      </div>

      {/* Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnalyticsChart
          title="User Distribution"
          type="pie"
          data={chartData.users}
          labelKey="label"
          valueKey="value"
        />
        <AnalyticsChart
          title="Events per Month"
          type="bar"
          data={chartData.events}
          labelKey="label"
          valueKey="value"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnalyticsChart
          title="Mentorship Engagement"
          type="line"
          data={chartData.mentorship}
          labelKey="mentor"
          valueKey="mentees"
        />
        <ActivityFeed activities={activityFeedData} />
      </div>
    </div>
  );
};

export default Analytics;
