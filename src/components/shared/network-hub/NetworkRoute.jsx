import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import {
  IoPeopleOutline,
  IoChatbubbleEllipsesOutline,
  IoSchoolOutline,
  IoGridOutline,
  IoPeopleCircleOutline,
  IoChatbubblesOutline,
  IoCalendarOutline,
} from "react-icons/io5";

const NetworkRoute = () => {
  const location = useLocation();
  const { user } = useAuth();
  const role = user?.role;

  // Define navigation items with icons
  const navigationItems = [
    {
      label: "Network Dashboard",
      path:
        role === "admin"
          ? "/admin/network"
          : role === "faculty"
          ? "/faculty/network"
          : role === "alumni"
          ? "/alumni/network"
          : role === "recruiter"
          ? "/recruiter/network"
          : "/student/network",
      roles: ["admin", "faculty", "alumni", "student", "recruiter"],
      icon: <IoGridOutline size={20} className="inline mr-2" />,
    },
    {
      label: "Chat",
      path:
        role === "admin"
          ? "/admin/network/chat"
          : role === "faculty"
          ? "/faculty/network/chat"
          : role === "alumni"
          ? "/alumni/network/chat"
          : role === "recruiter"
          ? "/recruiter/network/chat"
          : "/student/network/chat",
      roles: ["admin", "faculty", "alumni", "student", "recruiter"],
      icon: <IoChatbubblesOutline size={20} className="inline mr-2" />,
    },
    {
      label: "Mentorship",
      path:
        role === "admin"
          ? "/admin/network/mentorship-dashboard"
          : role === "faculty"
          ? "/faculty/network/mentorship-dashboard"
          : role === "alumni"
          ? "/alumni/network/mentorship-dashboard"
          : role === "recruiter"
          ? "/recruiter/network/mentorship-dashboard"
          : "/student/network/mentorship-dashboard",
      roles: ["admin", "faculty", "alumni", "student", "recruiter"],
      icon: <IoPeopleOutline size={20} className="inline mr-2" />,
    },
    {
      label: "Community",
      path:
        role === "admin"
          ? "/admin/network/community"
          : role === "faculty"
          ? "/faculty/network/community"
          : role === "alumni"
          ? "/alumni/network/community"
          : role === "recruiter"
          ? "/recruiter/network/community"
          : "/student/network/community",
      roles: ["admin", "faculty", "alumni", "student", "recruiter"],
      icon: <IoPeopleCircleOutline size={20} className="inline mr-2" />,
    },
    {
      label: "Sessions",
      path:
        role === "admin"
          ? "/admin/network/session-management"
          : role === "faculty"
          ? "/faculty/network/session-management"
          : role === "alumni"
          ? "/alumni/network/session-management"
          : role === "recruiter"
          ? "/recruiter/network/session-management"
          : "/student/network/session-management",
      roles: ["admin", "faculty", "alumni", "student", "recruiter"],
      icon: <IoCalendarOutline size={20} className="inline mr-2" />,
    },
    {
      label: "Group Chat",
      path:
        role === "admin"
          ? "/admin/network/group-chat"
          : role === "faculty"
          ? "/faculty/network/group-chat"
          : role === "alumni"
          ? "/alumni/network/group-chat"
          : role === "recruiter"
          ? "/recruiter/network/group-chat"
          : "/student/network/group-chat",
      roles: ["admin", "faculty", "alumni", "student", "recruiter"],
      icon: <IoChatbubbleEllipsesOutline size={20} className="inline mr-2" />,
    },
  ];

  return (
    <div className="min-h-screen bg-background pt-12">
      {/* Welcome Section */}
      <div className="bg-white shadow-sm rounded-lg max-w-7xl mx-auto px-6 lg:px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">
            Welcome to{" "}
            <span className="text-primary">Network Mentorship Hub</span>
          </h1>
          <p className="mt-3 text-base md:text-lg text-gray-600">
            Connect, collaborate, and grow your network of mentors and peers.
          </p>
        </div>

        <div className="flex space-x-6">
          <div className="flex flex-col items-center text-center p-4 bg-primary text-white rounded-lg shadow hover:shadow-lg transition">
            <IoPeopleOutline size={36} className="mb-2" />
            <span className="font-medium">Expand Network</span>
          </div>

          <div className="flex flex-col items-center text-center p-4 bg-success text-white rounded-lg shadow hover:shadow-lg transition">
            <IoChatbubbleEllipsesOutline size={36} className="mb-2" />
            <span className="font-medium">Join Discussions</span>
          </div>

          <div className="flex flex-col items-center text-center p-4 bg-accent text-white rounded-lg shadow hover:shadow-lg transition">
            <IoSchoolOutline size={36} className="mb-2" />
            <span className="font-medium">Learn from Mentors</span>
          </div>
        </div>
      </div>

      {/* Role-Based Tab Navigation */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mt-4">
        <div className="bg-white shadow rounded-lg flex overflow-x-auto">
          {navigationItems.map(
            (item) =>
              item.roles.includes(role) && (
                <Link
                  key={item.label}
                  to={item.path}
                  className={`flex-1 py-3 text-center text-sm font-medium transition flex items-center justify-center ${
                    location.pathname === item.path
                      ? "border-b-2 border-primary text-primary"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {item.icon}
                  {item.label}
                </Link>
              )
          )}
        </div>
      </div>

      {/* Render tab content */}
      <main className="max-w-7xl mx-auto px-6 lg:px-8 pb-20">
        <Outlet />
      </main>
    </div>
  );
};

export default NetworkRoute;
