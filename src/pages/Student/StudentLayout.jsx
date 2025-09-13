import React from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import StudentDashboard from "./StudentDashboard";

const StudentLayout = () => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex min-h-screen bg-background">
      <div className="flex-1 flex flex-col">
        {/* Static header */}

        {/* Show Alumni Dashboard by default */}
        <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
          <StudentDashboard />
        </main>
      </div>
    </div>
  );
};

export default StudentLayout;
