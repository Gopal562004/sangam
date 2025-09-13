import React, { useState, useEffect } from "react";
import Button from "../../../components/ui/Button";

const PendingJobList = () => {
  const [pendingJobs, setPendingJobs] = useState([]);

  useEffect(() => {
    // Mock pending jobs data
    setPendingJobs([
      {
        id: 1,
        title: "Frontend Developer",
        createdAt: "2025-09-10",
        applications: 0,
      },
      {
        id: 2,
        title: "Data Analyst",
        createdAt: "2025-09-11",
        applications: 2,
      },
    ]);
  }, []);

  const handleDeleteJob = (jobId) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      setPendingJobs((prev) => prev.filter((job) => job.id !== jobId));
    }
  };

  return (
    <div>
      {pendingJobs.length === 0 ? (
        <p className="text-muted-foreground text-center">No pending jobs.</p>
      ) : (
        <div className="space-y-4">
          {pendingJobs.map((job) => (
            <div
              key={job.id}
              className="bg-white p-4 rounded-lg shadow-md flex flex-col sm:flex-row sm:justify-between sm:items-center"
            >
              <div className="mb-2 sm:mb-0">
                <h3 className="text-lg font-semibold">{job.title}</h3>
                <p className="text-sm text-muted-foreground">
                  Created on: {job.createdAt} | Applications: {job.applications}
                </p>
                <span className="inline-block mt-1 px-2 py-0.5 text-xs text-yellow-800 bg-yellow-100 rounded-full">
                  Pending Approval
                </span>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handleDeleteJob(job.id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PendingJobList;
