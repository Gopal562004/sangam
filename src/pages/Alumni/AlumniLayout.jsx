import React from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import AlumniDashboard from "./AlumniDashboard";

const AlumniLayout = () => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex min-h-screen bg-background">
      <div className="flex-1 flex flex-col">
        {/* Static header */}


        {/* Show Alumni Dashboard by default */}
        <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
          <AlumniDashboard />
        </main>
      </div>
    </div>
  );
};

export default AlumniLayout;
