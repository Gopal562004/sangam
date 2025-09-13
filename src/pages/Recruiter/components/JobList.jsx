import React, { useState, useEffect } from "react";
import Button from "../../../components/ui/Button";
import Icon from "../../../components/AppIcon";

const JobList = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    // Mock job data
    setJobs([
      {
        id: 1,
        title: "Frontend Developer",
        status: "Approved",
        applications: [
          {
            id: 101,
            name: "Alice Johnson",
            email: "alice@example.com",
            resumeUrl: "#",
          },
          {
            id: 102,
            name: "Bob Smith",
            email: "bob@example.com",
            resumeUrl: "#",
          },
        ],
      },
      {
        id: 2,
        title: "Backend Developer",
        status: "Pending",
        applications: [],
      },
      {
        id: 3,
        title: "Full Stack Engineer",
        status: "Approved",
        applications: [
          {
            id: 103,
            name: "Charlie Brown",
            email: "charlie@example.com",
            resumeUrl: "#",
          },
        ],
      },
    ]);
  }, []);

  const handleDeleteJob = (jobId) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      setJobs((prev) => prev.filter((job) => job.id !== jobId));
    }
  };

  const handleViewApplicants = (applications) => {
    if (applications.length === 0) {
      alert("No applicants for this job yet.");
      return;
    }
    const applicantList = applications
      .map((app) => `${app.name} (${app.email})`)
      .join("\n");
    alert(`Applicants:\n${applicantList}`);
  };

  const handleViewResume = (resumeUrl) => {
    window.open(resumeUrl, "_blank");
  };

  const handleMessageApplicant = (applicant) => {
    alert(`Messaging ${applicant.name} (${applicant.email})`);
  };

  return (
    <div className="space-y-4">
      {jobs.map((job) => (
        <div
          key={job.id}
          className="bg-white p-4 rounded-lg shadow-md flex flex-col sm:flex-row sm:justify-between sm:items-center"
        >
          <div className="mb-2 sm:mb-0">
            <h3 className="text-lg font-semibold">{job.title}</h3>
            <p className="text-sm text-muted-foreground">
              Status:{" "}
              <span
                className={
                  job.status === "Approved"
                    ? "text-green-600"
                    : "text-yellow-600"
                }
              >
                {job.status}
              </span>
            </p>
            <p className="text-sm text-muted-foreground">
              Total Applications: {job.applications.length}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0 mt-2 sm:mt-0">
            <Button
              variant="primary"
              size="sm"
              onClick={() => handleViewApplicants(job.applications)}
            >
              View Applicants
            </Button>

            {job.applications.map((app) => (
              <div
                key={app.id}
                className="flex flex-row items-center space-x-1"
              >
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handleViewResume(app.resumeUrl)}
                >
                  Resume
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleMessageApplicant(app)}
                >
                  Msg
                </Button>
              </div>
            ))}

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
  );
};

export default JobList;
