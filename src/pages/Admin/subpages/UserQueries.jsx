import React, { useState } from "react";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import Icon from "../../../components/AppIcon";

// Sample user queries
const sampleQueries = [
  {
    id: 1,
    user: "Michael Rodriguez",
    email: "michael.r@email.com",
    query: "I can't reset my password.",
    status: "pending",
    date: "2025-09-10",
  },
  {
    id: 2,
    user: "Emily Chen",
    email: "emily.chen@email.com",
    query: "How do I submit my project report?",
    status: "resolved",
    date: "2025-09-08",
  },
];

const UserQueries = () => {
  const [queries, setQueries] = useState(sampleQueries);

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-text-primary">User Queries</h3>

      <div className="overflow-x-auto">
        <table className="w-full border border-border rounded-lg">
          <thead className="bg-muted">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                Query
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                Date
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {queries.map((q) => (
              <tr key={q.id} className="hover:bg-muted/50">
                <td className="px-6 py-4 whitespace-nowrap text-text-primary">
                  {q.user}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-text-secondary">
                  {q.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-text-secondary">
                  {q.query}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      q.status === "pending"
                        ? "bg-warning/10 text-warning"
                        : "bg-success/10 text-success"
                    }`}
                  >
                    {q.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-text-secondary">
                  {q.date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserQueries;
