import React, { useState } from "react";
import Button from "../../../components/ui/Button";
import Icon from "../../../components/AppIcon";
import AnalyticsChart from "../components/AnalyticsChart";

// Sample donation & campaign data
const sampleDonations = [
  {
    id: 1,
    donor: "Michael Rodriguez",
    email: "michael.r@email.com",
    role: "alumni",
    campaign: "Annual Fundraiser",
    amount: 500,
    status: "completed",
    date: "2025-09-01",
  },
  {
    id: 2,
    donor: "Emily Chen",
    email: "emily.chen@email.com",
    role: "student",
    campaign: "Library Upgrade",
    amount: 200,
    status: "pending",
    date: "2025-09-03",
  },
  {
    id: 3,
    donor: "David Thompson",
    email: "david.t@email.com",
    role: "faculty",
    campaign: "Scholarship Fund",
    amount: 1000,
    status: "completed",
    date: "2025-09-05",
  },
  {
    id: 4,
    donor: "Lisa Park",
    email: "lisa.park@email.com",
    role: "alumni",
    campaign: "Library Upgrade",
    amount: 300,
    status: "completed",
    date: "2025-09-06",
  },
  {
    id: 5,
    donor: "James Wilson",
    email: "james.w@email.com",
    role: "student",
    campaign: "Scholarship Fund",
    amount: 150,
    status: "pending",
    date: "2025-09-07",
  },
];

const sampleCampaigns = [
  {
    id: 1,
    title: "New Library Fund",
    requestedBy: "Lisa Park (Alumni)",
    requestedDate: "2025-09-07",
    description: "Upgrade library resources and equipment.",
  },
  {
    id: 2,
    title: "Scholarship Drive",
    requestedBy: "Dr. David Thompson (Faculty)",
    requestedDate: "2025-09-08",
    description: "Provide scholarships for meritorious students.",
  },
];

const DonationManagement = () => {
  const [donations, setDonations] = useState(sampleDonations);
  const [campaigns, setCampaigns] = useState(sampleCampaigns);
  const [selectedDonation, setSelectedDonation] = useState(null);

  // Aggregate totals
  const totalDonation = donations.reduce((sum, d) => sum + d.amount, 0);
  const donationsByRole = donations.reduce((acc, d) => {
    acc[d.role] = (acc[d.role] || 0) + d.amount;
    return acc;
  }, {});
  const topDonation = [...donations].sort((a, b) => b.amount - a.amount)[0];

  const getStatusBadge = (status) => {
    const badges = {
      completed: "bg-success/10 text-success",
      pending: "bg-warning/10 text-warning",
      failed: "bg-error/10 text-error",
    };
    return badges[status] || "bg-muted text-text-secondary";
  };

  const handleViewDonation = (donation) => setSelectedDonation(donation);
  const handleApproveDonation = (id) =>
    setDonations((prev) =>
      prev.map((d) => (d.id === id ? { ...d, status: "completed" } : d))
    );
  const handleRejectDonation = (id) =>
    setDonations((prev) => prev.filter((d) => d.id !== id));
  const handleApproveCampaign = (id) =>
    setCampaigns((prev) => prev.filter((c) => c.id !== id));
  const handleRejectCampaign = (id) =>
    setCampaigns((prev) => prev.filter((c) => c.id !== id));

  // Chart data
  const donationTrendData = donations.map((d) => ({
    name: d.date,
    value: d.amount,
  }));
  const donationRoleData = Object.keys(donationsByRole).map((role) => ({
    name: role,
    value: donationsByRole[role],
  }));

  return (
    <div className="space-y-10">
      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-card p-4 rounded-lg shadow-sm flex items-center space-x-3">
          <Icon name="DollarSign" size={24} className="text-accent" />
          <div>
            <h4 className="text-sm text-text-secondary">Total Donations</h4>
            <p className="text-xl font-semibold">${totalDonation}</p>
          </div>
        </div>
        {["alumni", "faculty", "student"].map((role) => (
          <div
            key={role}
            className="bg-card p-4 rounded-lg shadow-sm flex items-center space-x-3"
          >
            <Icon name="User" size={24} className="text-primary" />
            <div>
              <h4 className="text-sm text-text-secondary">
                {role.charAt(0).toUpperCase() + role.slice(1)} Donations
              </h4>
              <p className="text-xl font-semibold">
                ${donationsByRole[role] || 0}
              </p>
            </div>
          </div>
        ))}
        <div className="bg-card p-4 rounded-lg shadow-sm flex items-center space-x-3">
          <Icon name="Star" size={24} className="text-warning" />
          <div>
            <h4 className="text-sm text-text-secondary">Top Donation</h4>
            <p className="text-xl font-semibold">${topDonation?.amount}</p>
            <p className="text-sm">{topDonation?.donor}</p>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnalyticsChart
          data={donationTrendData}
          type="line"
          title="Donations Over Time"
          height={300}
        />
        <AnalyticsChart
          data={donationRoleData}
          type="pie"
          title="Donations by Role"
          height={300}
        />
      </div>

      {/* Donations Table */}
      <div className="overflow-x-auto bg-card rounded-lg border border-border p-4">
        <h3 className="text-xl font-semibold text-text-primary mb-4">
          All Donations
        </h3>
        <table className="w-full border-collapse table-auto">
          <thead className="bg-muted">
            <tr>
              {[
                "Donor",
                "Email",
                "Role",
                "Campaign",
                "Amount",
                "Status",
                "Date",
                "Actions",
              ].map((h) => (
                <th
                  key={h}
                  className="px-4 py-2 text-left text-xs font-medium text-text-secondary uppercase"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {donations.map((d) => (
              <tr key={d.id} className="hover:bg-muted/50">
                <td className="px-4 py-2">{d.donor}</td>
                <td className="px-4 py-2">{d.email}</td>
                <td className="px-4 py-2">{d.role}</td>
                <td className="px-4 py-2">{d.campaign}</td>
                <td className="px-4 py-2">${d.amount}</td>
                <td className="px-4 py-2">
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusBadge(
                      d.status
                    )}`}
                  >
                    {d.status}
                  </span>
                </td>
                <td className="px-4 py-2">{d.date}</td>
                <td className="px-4 py-2">
                  <div className="flex flex-wrap gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="min-w-[60px]"
                      onClick={() => handleViewDonation(d)}
                    >
                      View
                    </Button>
                    {d.status === "pending" && (
                      <>
                        <Button
                          variant="default"
                          size="sm"
                          className="min-w-[60px]"
                          onClick={() => handleApproveDonation(d.id)}
                        >
                          Approve
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          className="min-w-[60px]"
                          onClick={() => handleRejectDonation(d.id)}
                        >
                          Reject
                        </Button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pending Campaign Approvals */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {campaigns.map((c) => (
          <div
            key={c.id}
            className="bg-card border border-border p-4 rounded-lg shadow-sm flex flex-col justify-between"
          >
            <div>
              <h4 className="text-lg font-semibold">{c.title}</h4>
              <p className="text-sm text-text-secondary">{c.description}</p>
              <p className="text-xs text-text-secondary">
                Requested by: {c.requestedBy}
              </p>
              <p className="text-xs text-text-secondary">
                Date: {c.requestedDate}
              </p>
            </div>
            <div className="mt-2 flex space-x-2">
              <Button
                variant="default"
                size="sm"
                onClick={() => handleApproveCampaign(c.id)}
              >
                Approve
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleRejectCampaign(c.id)}
              >
                Reject
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Donation Details Modal */}
      {selectedDonation && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-card p-6 rounded-lg w-11/12 md:w-2/3 lg:w-1/2">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-lg font-semibold">Donation Details</h4>
              <Button variant="ghost" onClick={() => setSelectedDonation(null)}>
                Close
              </Button>
            </div>
            <div className="space-y-2">
              {Object.entries(selectedDonation).map(([k, v]) => (
                <p key={k}>
                  <span className="font-medium">{k}:</span> {v}
                </p>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonationManagement;
