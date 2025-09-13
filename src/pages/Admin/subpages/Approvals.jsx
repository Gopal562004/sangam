import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

// Sample Pending Data
const pendingData = {
  users: [
    {
      id: 1,
      name: "Lisa Park",
      role: "alumni",
      status: "pending",
      email: "lisa.park@email.com",
    },
    {
      id: 2,
      name: "Emily Chen",
      role: "student",
      status: "pending",
      email: "emily.chen@email.com",
    },
    {
      id: 3,
      name: "David Thompson",
      role: "faculty",
      status: "pending",
      email: "david.t@email.com",
    },
    {
      id: 4,
      name: "John Doe",
      role: "recruiter",
      status: "pending",
      email: "john.doe@company.com",
    },
  ],
  events: [
    { id: 1, title: "Alumni Meetup", status: "pending", createdBy: "Alumni" },
    { id: 2, title: "Workshop on AI", status: "pending", createdBy: "Faculty" },
  ],
  jobs: [
    {
      id: 1,
      title: "Frontend Developer",
      status: "pending",
      postedBy: "Recruiter",
    },
    {
      id: 2,
      title: "Backend Developer",
      status: "pending",
      postedBy: "Recruiter",
    },
  ],
  mentorships: [
    {
      id: 1,
      title: "AI Mentorship Program",
      status: "pending",
      mentor: "Dr. Smith",
    },
    {
      id: 2,
      title: "Web Dev Mentorship",
      status: "pending",
      mentor: "Michael Rodriguez",
    },
  ],
};

const Approvals = ({ onApprove, onReject }) => {
  const [data, setData] = useState(pendingData);

  const handleApprove = (type, id) => {
    onApprove(type, id);
    setData((prev) => ({
      ...prev,
      [type]: prev[type].filter((item) => item.id !== id),
    }));
  };

  const handleReject = (type, id) => {
    onReject(type, id);
    setData((prev) => ({
      ...prev,
      [type]: prev[type].filter((item) => item.id !== id),
    }));
  };

  // Utility function to render tables dynamically
  const renderTable = (items, type, columns) => (
    <div className="bg-card rounded-lg border border-border shadow p-4 mb-6">
      <h3 className="text-lg font-semibold text-text-primary mb-4">
        Pending {type.charAt(0).toUpperCase() + type.slice(1)}
      </h3>
      {items.length === 0 ? (
        <div className="text-center py-6 text-text-secondary">
          <Icon name="Clock" size={40} className="mx-auto mb-2" />
          No pending {type}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                {columns.map((col, idx) => (
                  <th
                    key={idx}
                    className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider"
                  >
                    {col}
                  </th>
                ))}
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-muted/50">
                  {columns.map((col) => (
                    <td
                      key={col}
                      className="px-6 py-4 whitespace-nowrap text-text-primary"
                    >
                      {item[col.toLowerCase().replace(" ", "")] ||
                        item[col.toLowerCase()]}
                    </td>
                  ))}
                  <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                    <Button
                      variant="default"
                      size="sm"
                      iconName="Check"
                      onClick={() => handleApprove(type, item.id)}
                    >
                      Approve
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      iconName="Ban"
                      onClick={() => handleReject(type, item.id)}
                    >
                      Reject
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-8 p-6">
      <h2 className="text-3xl font-bold text-text-primary mb-6">
        Pending Approvals Dashboard
      </h2>

      {/* User Approvals */}
      {renderTable(data.users, "users", ["Name", "Role", "Email"])}

      {/* Event Approvals */}
      {renderTable(data.events, "events", ["Title", "Status", "CreatedBy"])}

      {/* Job Approvals */}
      {renderTable(data.jobs, "jobs", ["Title", "Status", "PostedBy"])}

      {/* Mentorship Approvals */}
      {renderTable(data.mentorships, "mentorships", [
        "Title",
        "Status",
        "Mentor",
      ])}
    </div>
  );
};

export default Approvals;
