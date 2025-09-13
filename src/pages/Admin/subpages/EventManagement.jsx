import React, { useState } from "react";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import Icon from "../../../components/AppIcon";

// Sample Events Data
const eventsData = [
  {
    id: 1,
    title: "Alumni Networking Event",
    type: "Networking",
    date: "2025-09-20",
    status: "upcoming",
    createdBy: "Alumni",
  },
  {
    id: 2,
    title: "Donation Campaign Kickoff",
    type: "Fundraising",
    date: "2025-08-15",
    status: "completed",
    createdBy: "Admin",
  },
  {
    id: 3,
    title: "Workshop on AI",
    type: "Workshop",
    date: "2025-09-05",
    status: "ongoing",
    createdBy: "Faculty",
  },
  {
    id: 4,
    title: "Mentorship Session",
    type: "Mentorship",
    date: "2025-09-12",
    status: "upcoming",
    createdBy: "Admin",
  },
  {
    id: 5,
    title: "Coding Bootcamp",
    type: "Workshop",
    date: "2025-09-10",
    status: "ongoing",
    createdBy: "Alumni",
  },
];

// Sample Pending Approvals
const pendingEventsData = [
  {
    id: 101,
    title: "Career Guidance Session",
    type: "Workshop",
    date: "2025-09-18",
    requestedBy: "Alumni",
    description: "Help students plan careers",
  },
  {
    id: 102,
    title: "AI Hackathon",
    type: "Competition",
    date: "2025-09-22",
    requestedBy: "Faculty",
    description: "Organize 24hr AI hackathon",
  },
];

const EventManagement = ({ onViewEvent, onEditEvent, onCancelEvent }) => {
  const [events, setEvents] = useState(eventsData);
  const [pendingEvents, setPendingEvents] = useState(pendingEventsData);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // Filtering events
  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || event.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Badge helper
  const getStatusBadge = (status) => {
    const badges = {
      upcoming: { label: "Upcoming", color: "bg-primary/10 text-primary" },
      ongoing: { label: "Ongoing", color: "bg-warning/10 text-warning" },
      completed: { label: "Completed", color: "bg-success/10 text-success" },
      cancelled: { label: "Cancelled", color: "bg-error/10 text-error" },
    };
    return (
      badges[status] || { label: status, color: "bg-muted text-text-secondary" }
    );
  };

  // Aggregated metrics
  const totalEvents = events.length;
  const eventsByStatus = events.reduce((acc, e) => {
    acc[e.status] = (acc[e.status] || 0) + 1;
    return acc;
  }, {});
  const eventsByCreator = events.reduce((acc, e) => {
    acc[e.createdBy] = (acc[e.createdBy] || 0) + 1;
    return acc;
  }, {});
  const thisMonth = new Date().getMonth() + 1;
  const eventsThisMonth = events.filter(
    (e) => new Date(e.date).getMonth() + 1 === thisMonth
  );
  const ongoingEvents = events.filter((e) => e.status === "ongoing");

  // Approve or Reject Pending Event
  const handleApproveEvent = (id) => {
    const approvedEvent = pendingEvents.find((e) => e.id === id);
    if (approvedEvent) {
      setEvents([
        ...events,
        {
          ...approvedEvent,
          status: "upcoming",
          createdBy: approvedEvent.requestedBy,
        },
      ]);
      setPendingEvents(pendingEvents.filter((e) => e.id !== id));
    }
  };

  const handleRejectEvent = (id) => {
    setPendingEvents(pendingEvents.filter((e) => e.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-card p-4 rounded-lg shadow-sm flex items-center space-x-3">
          <Icon name="Calendar" size={32} className="text-primary" />
          <div>
            <p className="text-xs text-text-secondary">Total Events</p>
            <p className="text-xl font-semibold">{totalEvents}</p>
          </div>
        </div>
        <div className="bg-card p-4 rounded-lg shadow-sm flex items-center space-x-3">
          <Icon name="Clock" size={32} className="text-warning" />
          <div>
            <p className="text-xs text-text-secondary">Ongoing Events</p>
            <p className="text-xl font-semibold">{ongoingEvents.length}</p>
          </div>
        </div>
        <div className="bg-card p-4 rounded-lg shadow-sm flex items-center space-x-3">
          <Icon name="User" size={32} className="text-success" />
          <div>
            <p className="text-xs text-text-secondary">Created by Alumni</p>
            <p className="text-xl font-semibold">
              {eventsByCreator.Alumni || 0}
            </p>
          </div>
        </div>
        <div className="bg-card p-4 rounded-lg shadow-sm flex items-center space-x-3">
          <Icon name="UserCheck" size={32} className="text-primary" />
          <div>
            <p className="text-xs text-text-secondary">This Month Events</p>
            <p className="text-xl font-semibold">{eventsThisMonth.length}</p>
          </div>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <Input
          type="search"
          placeholder="Search events..."
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
          <option value="upcoming">Upcoming</option>
          <option value="ongoing">Ongoing</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {/* Events Table */}
      <div className="overflow-x-auto">
        <table className="w-full border border-border rounded-lg">
          <thead className="bg-muted">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                Event
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                Created By
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filteredEvents.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-8 text-center">
                  <Icon
                    name="Calendar"
                    size={48}
                    className="text-text-secondary mx-auto mb-3"
                  />
                  <p className="text-text-secondary">No events found</p>
                </td>
              </tr>
            ) : (
              filteredEvents.map((event) => {
                const statusBadge = getStatusBadge(event.status);
                return (
                  <tr key={event.id} className="hover:bg-muted/50">
                    <td className="px-6 py-4 whitespace-nowrap text-text-primary font-medium">
                      {event.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-text-secondary">
                      {event.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-text-secondary">
                      {event.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${statusBadge.color}`}
                      >
                        {statusBadge.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-text-secondary">
                      {event.createdBy}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="Eye"
                        onClick={() => onViewEvent(event.id)}
                      >
                        View
                      </Button>
                      <Button
                        variant="default"
                        size="sm"
                        iconName="Edit"
                        onClick={() => onEditEvent(event.id)}
                      >
                        Edit
                      </Button>
                      {event.status !== "cancelled" && (
                        <Button
                          variant="destructive"
                          size="sm"
                          iconName="Ban"
                          onClick={() => onCancelEvent(event.id)}
                        >
                          Cancel
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
      {/* Pending Approvals */}
      <div className="bg-card p-4 rounded-lg border border-border shadow-sm">
        <h3 className="text-lg font-semibold text-text-primary mb-3 flex items-center">
          <Icon name="Bell" size={20} className="mr-2 text-primary" /> Pending
          Event Approvals
        </h3>
        {pendingEvents.length === 0 ? (
          <p className="text-text-secondary text-sm">
            No pending event approvals
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pendingEvents.map((event) => (
              <div
                key={event.id}
                className="border border-border p-3 rounded-lg bg-muted flex flex-col justify-between"
              >
                <div>
                  <h4 className="text-md font-medium">{event.title}</h4>
                  <p className="text-sm text-text-secondary">{event.type}</p>
                  <p className="text-xs text-text-secondary">
                    Requested by: {event.requestedBy}
                  </p>
                  <p className="text-xs text-text-secondary">
                    Date: {event.date}
                  </p>
                  <p className="text-xs text-text-secondary">
                    {event.description}
                  </p>
                </div>
                <div className="mt-2 flex space-x-2">
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => handleApproveEvent(event.id)}
                  >
                    Approve
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleRejectEvent(event.id)}
                  >
                    Reject
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EventManagement;
