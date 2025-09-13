import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/shared/Header";
import { useAuth } from "../context/AuthContext";

const RouteLayout = () => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex min-h-screen bg-background">
      <div className="flex-1 flex flex-col">
        {/* Static header shown for all authenticated users */}
        <Header
          user={user}
          onLogout={() => {
            /* Add logout logic here */
          }}
        />

        {/* Main dynamic content (Dashboard, Directory, Donations, etc.) */}
        <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default RouteLayout;
