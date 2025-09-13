import React, { useState } from "react";
import Button from "../../../components/ui/Button";
import Icon from "../../../components/AppIcon";

// Sample Job Data
const jobsData = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "Tech Solutions Inc.",
    location: "Remote",
    type: "Full-Time",
    status: "active",
    postedDate: "2025-09-01",
  },
  {
    id: 2,
    title: "Data Scientist",
    company: "AI Labs",
    location: "New York, NY",
    type: "Part-Time",
    status: "paused",
    postedDate: "2025-08-25",
  },
  {
    id: 3,
    title: "Backend Engineer",
    company: "CloudTech",
    location: "San Francisco, CA",
    type: "Full-Time",
    status: "active",
    postedDate: "2025-08-30",
  },
  {
    id: 4,
    title: "UI/UX Designer",
    company: "Creative Minds",
    location: "Remote",
    type: "Contract",
    status: "closed",
    postedDate: "2025-08-20",
  },
];

const JobManagement = ({ onViewJob, onEditJob, onDeactivateJob }) => {
  const [jobs, setJobs] = useState(jobsData);

  const getStatusBadge = (status) => {
    const badges = {
      active: { label: "Active", color: "bg-success/10 text-success" },
      paused: { label: "Paused", color: "bg-warning/10 text-warning" },
      closed: { label: "Closed", color: "bg-error/10 text-error" },
    };
    return (
      badges?.[status] || {
        label: status,
        color: "bg-muted text-text-secondary",
      }
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h3 className="text-xl font-semibold text-text-primary">
          Job Management
        </h3>
        <Button
          variant="default"
          iconName="Plus"
          onClick={() => onEditJob(null)}
        >
          Post New Job
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => {
          const statusBadge = getStatusBadge(job?.status);
          return (
            <div
              key={job.id}
              className="bg-card border border-border rounded-lg p-4 shadow-sm hover:shadow-md transition"
            >
              <div className="flex justify-between items-start mb-2">
                <h4 className="text-lg font-semibold text-text-primary">
                  {job.title}
                </h4>
                <span
                  className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${statusBadge.color}`}
                >
                  {statusBadge.label}
                </span>
              </div>
              <p className="text-sm text-text-secondary">{job.company}</p>
              <p className="text-sm text-text-secondary">
                {job.location} • {job.type}
              </p>
              <p className="text-xs text-text-secondary mt-2">
                Posted: {job.postedDate}
              </p>

              <div className="flex mt-4 space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Eye"
                  onClick={() => onViewJob(job.id)}
                >
                  View
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  iconName="Edit"
                  onClick={() => onEditJob(job.id)}
                >
                  Edit
                </Button>
                {job.status !== "closed" && (
                  <Button
                    variant="destructive"
                    size="sm"
                    iconName="Ban"
                    onClick={() => onDeactivateJob(job.id)}
                  >
                    Deactivate
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default JobManagement;
