import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";

// Sample Mentorship Programs Data
const mentorshipPrograms = [
  {
    id: 1,
    mentor: "Dr. Smith",
    role: "Faculty",
    topic: "AI in Healthcare",
    mentees: ["John Doe", "Anna Lee", "Emily Chen"],
    docsShared: 5,
    chatsCount: 12,
    startDate: "2025-09-01",
    status: "active",
  },
  {
    id: 2,
    mentor: "Michael Rodriguez",
    role: "Alumni",
    topic: "Web Development Bootcamp",
    mentees: ["Michael Johnson", "Sarah Lee"],
    docsShared: 3,
    chatsCount: 8,
    startDate: "2025-09-10",
    status: "upcoming",
  },
  {
    id: 3,
    mentor: "Prof. Williams",
    role: "Faculty",
    topic: "Data Science Basics",
    mentees: ["Emily Chen", "Lisa Park", "James Wilson", "David Thompson"],
    docsShared: 7,
    chatsCount: 15,
    startDate: "2025-08-20",
    status: "active",
  },
];

const MentorshipManagement = () => {
  const [programs, setPrograms] = useState(mentorshipPrograms);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // Filtered programs
  const filteredPrograms = programs.filter((p) => {
    const matchesSearch =
      p.mentor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.topic.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || p.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Get mentors with most mentees
  const topMentor = programs.reduce((prev, curr) =>
    curr.mentees.length > prev.mentees.length ? curr : prev
  );

  // Status badge
  const getStatusBadge = (status) => {
    const badges = {
      active: { label: "Active", color: "bg-success/10 text-success" },
      upcoming: { label: "Upcoming", color: "bg-primary/10 text-primary" },
      completed: { label: "Completed", color: "bg-muted text-text-secondary" },
    };
    return (
      badges[status] || { label: status, color: "bg-muted text-text-secondary" }
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl font-bold text-text-primary">
          Mentorship Programs
        </h2>
        <div className="flex flex-col sm:flex-row gap-2">
          <Input
            type="search"
            placeholder="Search by mentor or topic..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-64"
          />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-border rounded-md text-sm bg-input"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="upcoming">Upcoming</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-card p-4 rounded-lg shadow flex items-center space-x-3">
          <Icon name="Users" size={32} className="text-primary" />
          <div>
            <p className="text-xs text-text-secondary">Total Programs</p>
            <p className="text-xl font-semibold">{programs.length}</p>
          </div>
        </div>
        <div className="bg-card p-4 rounded-lg shadow flex items-center space-x-3">
          <Icon name="UserCheck" size={32} className="text-success" />
          <div>
            <p className="text-xs text-text-secondary">Total Mentees</p>
            <p className="text-xl font-semibold">
              {programs.reduce((sum, p) => sum + p.mentees.length, 0)}
            </p>
          </div>
        </div>
        <div className="bg-card p-4 rounded-lg shadow flex items-center space-x-3">
          <Icon name="DocumentText" size={32} className="text-warning" />
          <div>
            <p className="text-xs text-text-secondary">Total Docs Shared</p>
            <p className="text-xl font-semibold">
              {programs.reduce((sum, p) => sum + p.docsShared, 0)}
            </p>
          </div>
        </div>
        <div className="bg-card p-4 rounded-lg shadow flex items-center space-x-3">
          <Icon name="Chat" size={32} className="text-primary" />
          <div>
            <p className="text-xs text-text-secondary">Top Mentor</p>
            <p className="text-xl font-semibold">{topMentor.mentor}</p>
            <p className="text-sm text-text-secondary">
              {topMentor.mentees.length} mentees
            </p>
          </div>
        </div>
      </div>

      {/* Programs Table */}
      <div className="overflow-x-auto bg-card p-4 rounded-lg shadow">
        <table className="w-full border border-border rounded-lg">
          <thead className="bg-muted">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                Mentor
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                Topic
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                Mentees Count
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                Docs Shared
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                Chats
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                Start Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filteredPrograms.length === 0 ? (
              <tr>
                <td
                  colSpan="8"
                  className="px-6 py-8 text-center text-text-secondary"
                >
                  <Icon name="Users" size={48} className="mx-auto mb-3" />
                  No mentorship programs found
                </td>
              </tr>
            ) : (
              filteredPrograms.map((p) => {
                const badge = getStatusBadge(p.status);
                return (
                  <tr key={p.id} className="hover:bg-muted/50">
                    <td className="px-6 py-4 font-medium text-text-primary">
                      {p.mentor}
                    </td>
                    <td className="px-6 py-4 text-text-secondary">{p.topic}</td>
                    <td className="px-6 py-4 text-text-secondary">
                      {p.mentees.length}
                    </td>
                    <td className="px-6 py-4 text-text-secondary">
                      {p.docsShared}
                    </td>
                    <td className="px-6 py-4 text-text-secondary">
                      {p.chatsCount}
                    </td>
                    <td className="px-6 py-4 text-text-secondary">
                      {p.startDate}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${badge.color}`}
                      >
                        {badge.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 space-x-2">
                      <Button variant="ghost" size="sm" iconName="Eye">
                        View
                      </Button>
                      <Button variant="default" size="sm" iconName="Chat">
                        Engage
                      </Button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MentorshipManagement;
