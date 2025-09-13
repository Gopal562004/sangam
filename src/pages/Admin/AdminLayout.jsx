import React from "react";
import Header from "../../components/shared/Header";
const AdminLayout = ({ children, user, onLogout }) => {
  return (
    <div className="flex min-h-screen bg-background">
      {" "}
      <div className="flex-1 flex flex-col">
        {" "}
        <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
          {" "}
          {children}{" "}
        </main>{" "}
      </div>{" "}
    </div>
  );
};
export default AdminLayout;
