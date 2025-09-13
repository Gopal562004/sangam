import React, { useState, useEffect } from "react";
import Button from "../../../components/ui/Button";

const ManageJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null); // For modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
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
    ]);
  }, []);

  const handleDeleteJob = (jobId) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      setJobs((prev) => prev.filter((job) => job.id !== jobId));
    }
  };

  const handleOpenModal = (job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedJob(null);
    setIsModalOpen(false);
  };

  const handleViewResume = (resumeUrl) => {
    window.open(resumeUrl, "_blank");
  };

  const handleMessageApplicant = (applicant) => {
    alert(`Messaging ${applicant.name} (${applicant.email})`);
  };

  return (
    <div>
      {jobs.length === 0 ? (
        <p className="text-muted-foreground text-center">No jobs found.</p>
      ) : (
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
                  onClick={() => handleOpenModal(job)}
                >
                  View Applicants
                </Button>
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

      {/* Modal */}
      {isModalOpen && selectedJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-11/12 max-w-2xl p-6 relative">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
              onClick={handleCloseModal}
            >
              ✕
            </button>
            <h2 className="text-xl font-semibold mb-4">
              {selectedJob.title} - Applicants
            </h2>

            {selectedJob.applications.length === 0 ? (
              <p className="text-muted-foreground">
                No applicants for this job yet.
              </p>
            ) : (
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {selectedJob.applications.map((app) => (
                  <div
                    key={app.id}
                    className="flex justify-between items-center p-2 border border-border rounded"
                  >
                    <div>
                      <p className="font-medium">{app.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {app.email}
                      </p>
                    </div>
                    <div className="flex space-x-2">
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
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageJobs;
