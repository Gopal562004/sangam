import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";

// Sample Users Data with multiple pending users in each role
const usersData = [
  {
    id: 1,
    name: "Michael Rodriguez",
    email: "michael.r@email.com",
    role: "alumni",
    status: "verified",
    joinedDate: "Jan 15, 2024",
  },
  {
    id: 2,
    name: "Emily Chen",
    email: "emily.chen@email.com",
    role: "student",
    status: "active",
    joinedDate: "Feb 20, 2024",
  },
  {
    id: 3,
    name: "David Thompson",
    email: "david.t@email.com",
    role: "faculty",
    status: "verified",
    joinedDate: "Mar 10, 2024",
  },
  {
    id: 4,
    name: "Lisa Park",
    email: "lisa.park@email.com",
    role: "alumni",
    status: "pending",
    joinedDate: "Mar 25, 2024",
  },
  {
    id: 5,
    name: "James Wilson",
    email: "james.w@email.com",
    role: "student",
    status: "suspended",
    joinedDate: "Apr 5, 2024",
  },
  {
    id: 6,
    name: "Sophia Khan",
    email: "sophia.k@email.com",
    role: "recruiter",
    status: "pending",
    joinedDate: "Sep 1, 2025",
  },

  // Pending Alumni
  {
    id: 7,
    name: "John Doe",
    email: "john.d@email.com",
    role: "alumni",
    status: "pending",
    joinedDate: "Sep 2, 2025",
  },
  {
    id: 8,
    name: "Anna Lee",
    email: "anna.lee@email.com",
    role: "alumni",
    status: "pending",
    joinedDate: "Sep 3, 2025",
  },

  // Pending Students
  {
    id: 9,
    name: "Mary Jane",
    email: "mary.j@email.com",
    role: "student",
    status: "pending",
    joinedDate: "Sep 5, 2025",
  },
  {
    id: 10,
    name: "Kevin Brown",
    email: "kevin.b@email.com",
    role: "student",
    status: "pending",
    joinedDate: "Sep 6, 2025",
  },

  // Pending Faculty
  {
    id: 11,
    name: "Anna Smith",
    email: "anna.s@email.com",
    role: "faculty",
    status: "pending",
    joinedDate: "Aug 15, 2025",
  },
  {
    id: 12,
    name: "Robert White",
    email: "robert.w@email.com",
    role: "faculty",
    status: "pending",
    joinedDate: "Aug 16, 2025",
  },

  // Pending Recruiters
  {
    id: 13,
    name: "Laura Green",
    email: "laura.g@email.com",
    role: "recruiter",
    status: "pending",
    joinedDate: "Sep 7, 2025",
  },
  {
    id: 14,
    name: "Tom Harris",
    email: "tom.h@email.com",
    role: "recruiter",
    status: "pending",
    joinedDate: "Sep 8, 2025",
  },
];

const ApprovalSection = ({ title, users, onApprove, onReject }) => {
  if (!users || users.length === 0) return null;

  return (
    <div className="bg-card p-4 rounded-lg border border-border shadow-sm mb-6">
      <h3 className="text-lg font-semibold text-text-primary mb-3">
        {title} Approvals
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full border border-border rounded-lg">
          <thead className="bg-muted">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                Joined
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-muted/50">
                <td className="px-6 py-4">{user.name}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">{user.joinedDate}</td>
                <td className="px-6 py-4 space-x-2">
                  <Button
                    variant="default"
                    size="sm"
                    iconName="Check"
                    onClick={() => onApprove(user.id)}
                  >
                    Approve
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    iconName="X"
                    onClick={() => onReject(user.id)}
                  >
                    Reject
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const UserManagement = ({ onVerifyUser, onSuspendUser, onViewProfile }) => {
  const [users, setUsers] = useState(usersData);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === "all" || u.role === filterRole;
    const matchesStatus = filterStatus === "all" || u.status === filterStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const getStatusBadge = (status) =>
    ({
      verified: { label: "Verified", color: "bg-success/10 text-success" },
      pending: { label: "Pending", color: "bg-warning/10 text-warning" },
      suspended: { label: "Suspended", color: "bg-error/10 text-error" },
      active: { label: "Active", color: "bg-primary/10 text-primary" },
    }[status] || { label: status, color: "bg-muted text-text-secondary" });

  const getRoleBadge = (role) =>
    ({
      admin: { label: "Admin", color: "bg-accent/10 text-accent" },
      alumni: { label: "Alumni", color: "bg-primary/10 text-primary" },
      student: { label: "Student", color: "bg-secondary/10 text-secondary" },
      faculty: { label: "Faculty", color: "bg-success/10 text-success" },
      recruiter: { label: "Recruiter", color: "bg-warning/10 text-warning" },
    }[role] || { label: role, color: "bg-muted text-text-secondary" });

  const totalUsers = users.length;
  const recentlyAdded = users.slice(-5).length;
  const roleCounts = users.reduce((acc, u) => {
    acc[u.role] = (acc[u.role] || 0) + 1;
    return acc;
  }, {});
  const pendingUsersByRole = (role) =>
    users.filter((u) => u.role === role && u.status === "pending");

  const handleApprove = (id) =>
    setUsers(
      users.map((u) => (u.id === id ? { ...u, status: "verified" } : u))
    );
  const handleReject = (id) => setUsers(users.filter((u) => u.id !== id));

  return (
    <div className="space-y-6">
      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-card p-4 rounded-lg shadow-sm flex items-center space-x-3">
          <Icon name="Users" size={32} className="text-primary" />
          <div>
            <p className="text-xs text-text-secondary">Total Users</p>
            <p className="text-xl font-semibold">{totalUsers}</p>
          </div>
        </div>
        <div className="bg-card p-4 rounded-lg shadow-sm flex items-center space-x-3">
          <Icon name="Clock" size={32} className="text-warning" />
          <div>
            <p className="text-xs text-text-secondary">Recently Added</p>
            <p className="text-xl font-semibold">{recentlyAdded}</p>
          </div>
        </div>
        <div className="bg-card p-4 rounded-lg shadow-sm flex items-center space-x-3">
          <Icon name="User" size={32} className="text-success" />
          <div>
            <p className="text-xs text-text-secondary">Alumni Count</p>
            <p className="text-xl font-semibold">{roleCounts.alumni || 0}</p>
          </div>
        </div>
        <div className="bg-card p-4 rounded-lg shadow-sm flex items-center space-x-3">
          <Icon name="User" size={32} className="text-secondary" />
          <div>
            <p className="text-xs text-text-secondary">Students Count</p>
            <p className="text-xl font-semibold">{roleCounts.student || 0}</p>
          </div>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <Input
          type="search"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-64"
        />
        <div className="flex space-x-2">
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="px-3 py-2 border border-border rounded-md text-sm bg-input"
          >
            <option value="all">All Roles</option>
            <option value="admin">Admin</option>
            <option value="alumni">Alumni</option>
            <option value="student">Student</option>
            <option value="faculty">Faculty</option>
            <option value="recruiter">Recruiter</option>
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-border rounded-md text-sm bg-input"
          >
            <option value="all">All Status</option>
            <option value="verified">Verified</option>
            <option value="pending">Pending</option>
            <option value="suspended">Suspended</option>
            <option value="active">Active</option>
          </select>
        </div>
      </div>

      {/* User Table */}
      <div className="overflow-x-auto">
        <table className="w-full border border-border rounded-lg">
          <thead className="bg-muted">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                Joined
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-6 py-8 text-center">
                  <Icon
                    name="Users"
                    size={48}
                    className="text-text-secondary mx-auto mb-3"
                  />
                  <p className="text-text-secondary">No users found</p>
                </td>
              </tr>
            ) : (
              filteredUsers.map((user) => {
                const statusBadge = getStatusBadge(user.status);
                const roleBadge = getRoleBadge(user.role);
                return (
                  <tr key={user.id} className="hover:bg-muted/50">
                    <td className="px-6 py-4 whitespace-nowrap flex items-center">
                      <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-medium">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-text-primary">
                          {user.name}
                        </div>
                        <div className="text-sm text-text-secondary">
                          {user.email}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${roleBadge.color}`}
                      >
                        {roleBadge.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${statusBadge.color}`}
                      >
                        {statusBadge.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                      {user.joinedDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="Eye"
                        onClick={() => onViewProfile(user.id)}
                      >
                        View
                      </Button>
                      {user.status === "pending" && (
                        <Button
                          variant="default"
                          size="sm"
                          iconName="Check"
                          onClick={() => onVerifyUser(user.id)}
                        >
                          Verify
                        </Button>
                      )}
                      {user.status !== "suspended" && (
                        <Button
                          variant="destructive"
                          size="sm"
                          iconName="Ban"
                          onClick={() => onSuspendUser(user.id)}
                        >
                          Suspend
                        </Button>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pending Approval Sections at the bottom */}
      <ApprovalSection
        title="Alumni"
        users={pendingUsersByRole("alumni")}
        onApprove={handleApprove}
        onReject={handleReject}
      />
      <ApprovalSection
        title="Students"
        users={pendingUsersByRole("student")}
        onApprove={handleApprove}
        onReject={handleReject}
      />
      <ApprovalSection
        title="Faculty"
        users={pendingUsersByRole("faculty")}
        onApprove={handleApprove}
        onReject={handleReject}
      />
      <ApprovalSection
        title="Recruiters"
        users={pendingUsersByRole("recruiter")}
        onApprove={handleApprove}
        onReject={handleReject}
      />
    </div>
  );
};

export default UserManagement;
