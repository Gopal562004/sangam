// // import React, { useState, useEffect, lazy, Suspense } from "react";
// // import { useNavigate } from "react-router-dom";
// // import AdminLayout from "./AdminLayout";
// // import Icon from "../../components/AppIcon";
// // import Button from "../../components/ui/Button";

// // // Lazy load subpages
// // const Overview = lazy(() => import("./subpages/Overview"));
// // const UserManagement = lazy(() => import("./subpages/UserManagement"));
// // const EventManagement = lazy(() => import("./subpages/EventManagement"));
// // const JobManagement = lazy(() => import("./subpages/JobManagement"));
// // const DonationManagement = lazy(() => import("./subpages/DonationManagement"));
// // const MentorshipManagement = lazy(() =>
// //   import("./subpages/MentorshipManagement")
// // );
// // const Analytics = lazy(() => import("./subpages/Analytics"));
// // const Approvals = lazy(() => import("./subpages/Approvals"));
// // const UserQueries = lazy(() => import("./subpages/UserQueries"));

// // const tabs = [
// //   {
// //     id: "overview",
// //     label: "Overview",
// //     component: Overview,
// //     icon: "LayoutDashboard",
// //   },
// //   {
// //     id: "users",
// //     label: "User Management",
// //     component: UserManagement,
// //     icon: "Users",
// //   },
// //   {
// //     id: "events",
// //     label: "Event Management",
// //     component: EventManagement,
// //     icon: "Calendar",
// //   },
// //   {
// //     id: "jobs",
// //     label: "Job Management",
// //     component: JobManagement,
// //     icon: "Briefcase",
// //   },
// //   {
// //     id: "donations",
// //     label: "Donation Management",
// //     component: DonationManagement,
// //     icon: "CreditCard",
// //   },
// //   {
// //     id: "mentorship",
// //     label: "Mentorship Management",
// //     component: MentorshipManagement,
// //     icon: "Handshake",
// //   },
// //   {
// //     id: "analytics",
// //     label: "Analytics",
// //     component: Analytics,
// //     icon: "BarChart3",
// //   },
// //   {
// //     id: "approvals",
// //     label: "Approvals",
// //     component: Approvals,
// //     icon: "CheckCircle",
// //   },
// //   {
// //     id: "user-queries",
// //     label: "User Queries",
// //     component: UserQueries,
// //     icon: "MessageSquare",
// //   },
// // ];

// // const Dashboard = () => {
// //   const navigate = useNavigate();
// //   const [activeTab, setActiveTab] = useState("overview");
// //   const [user, setUser] = useState(null);

// //   useEffect(() => {
// //     const mockUser = {
// //       id: 1,
// //       name: "Dr. Sarah Johnson",
// //       email: "admin@university.edu",
// //       role: "admin",
// //       avatar: "https://randomuser.me/api/portraits/women/45.jpg",
// //     };
// //     setUser(mockUser);
// //   }, []);

// //   const handleLogout = () => navigate("/login");

// //   const renderTab = () => {
// //     const tab = tabs.find((t) => t.id === activeTab);
// //     if (!tab) return null;
// //     const Component = tab.component;
// //     return (
// //       <Suspense
// //         fallback={
// //           <div className="p-6 text-center text-text-secondary">Loading...</div>
// //         }
// //       >
// //         <Component user={user} />
// //       </Suspense>
// //     );
// //   };

// //   return (
// //     <AdminLayout user={user} onLogout={handleLogout}>
// //       {/* Page Header */}
// //       <div className="mb-8">
// //         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
// //           <div>
// //             <h1 className="text-3xl font-bold text-text-primary">
// //               Admin Dashboard
// //             </h1>
// //             <p className="mt-2 text-text-secondary">
// //               Comprehensive oversight and management tools for the alumni
// //               platform
// //             </p>
// //           </div>
// //           <div className="mt-4 sm:mt-0 flex space-x-3">
// //             <Button variant="outline" iconName="Download">
// //               Export Report
// //             </Button>
// //             <Button variant="default" iconName="Plus">
// //               Quick Action
// //             </Button>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Tab Navigation */}
// //       <div className="mb-6 border-b border-border">
// //         <nav className="-mb-px flex space-x-8 overflow-x-auto scrollbar-hide">
// //           {tabs.map((tab) => (
// //             <button
// //               key={tab.id}
// //               onClick={() => setActiveTab(tab.id)}
// //               className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors duration-200 ${
// //                 activeTab === tab.id
// //                   ? "border-primary text-primary"
// //                   : "border-transparent text-text-secondary hover:text-text-primary hover:border-border"
// //               }`}
// //             >
// //               <Icon name={tab.icon} size={18} />
// //               <span>{tab.label}</span>
// //             </button>
// //           ))}
// //         </nav>
// //       </div>

// //       {/* Tab Content */}
// //       {renderTab()}
// //     </AdminLayout>
// //   );
// // };

// // export default Dashboard;
// import React, { useState, useEffect, Suspense, lazy } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import AdminLayout from "./AdminLayout";
// import Icon from "../../components/AppIcon";
// import Button from "../../components/ui/Button";

// // Lazy load subpages
// const Overview = lazy(() => import("./subpages/Overview"));
// const UserManagement = lazy(() => import("./subpages/UserManagement"));
// const EventManagement = lazy(() => import("./subpages/EventManagement"));
// const JobManagement = lazy(() => import("./subpages/JobManagement"));
// const DonationManagement = lazy(() => import("./subpages/DonationManagement"));
// const MentorshipManagement = lazy(() =>
//   import("./subpages/MentorshipManagement")
// );
// const Analytics = lazy(() => import("./subpages/Analytics"));
// const Approvals = lazy(() => import("./subpages/Approvals"));
// const UserQueries = lazy(() => import("./subpages/UserQueries"));

// // Tabs config
// const tabs = [
//   {
//     id: "overview",
//     label: "Overview",
//     component: Overview,
//     icon: "LayoutDashboard",
//   },
//   {
//     id: "users",
//     label: "User Management",
//     component: UserManagement,
//     icon: "Users",
//   },
//   {
//     id: "events",
//     label: "Event Management",
//     component: EventManagement,
//     icon: "Calendar",
//   },
//   {
//     id: "jobs",
//     label: "Job Management",
//     component: JobManagement,
//     icon: "Briefcase",
//   },
//   {
//     id: "donations",
//     label: "Donation Management",
//     component: DonationManagement,
//     icon: "CreditCard",
//   },
//   {
//     id: "mentorship",
//     label: "Mentorship Management",
//     component: MentorshipManagement,
//     icon: "Handshake",
//   },
//   {
//     id: "analytics",
//     label: "Analytics",
//     component: Analytics,
//     icon: "BarChart3",
//   },
//   {
//     id: "approvals",
//     label: "Approvals",
//     component: Approvals,
//     icon: "CheckCircle",
//   },
//   {
//     id: "user-queries",
//     label: "User Queries",
//     component: UserQueries,
//     icon: "MessageSquare",
//   },
// ];

// const AdminDashboard = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [activeTab, setActiveTab] = useState("overview");
//   const [user, setUser] = useState(null);

//   // Update tab based on URL query
//   useEffect(() => {
//     const searchParams = new URLSearchParams(location.search);
//     const tabParam = searchParams.get("tab");
//     if (tabParam && tabs.find((t) => t.id === tabParam)) {
//       setActiveTab(tabParam);
//     }
//   }, [location.search]);

//   // Mock admin user
//   useEffect(() => {
//     const mockUser = {
//       id: 1,
//       name: "Dr. Sarah Johnson",
//       email: "admin@university.edu",
//       role: "admin",
//       avatar: "https://randomuser.me/api/portraits/women/45.jpg",
//     };
//     setUser(mockUser);
//   }, []);

//   const handleLogout = () => navigate("/login");

//   const handleTabClick = (tabId) => {
//     setActiveTab(tabId);
//     // Update URL query without reloading the page
//     navigate(`/admin?tab=${tabId}`, { replace: true });
//   };

//   const renderTab = () => {
//     const tab = tabs.find((t) => t.id === activeTab);
//     if (!tab) return null;
//     const Component = tab.component;
//     return (
//       <Suspense fallback={<div className="p-4">Loading...</div>}>
//         <Component user={user} />
//       </Suspense>
//     );
//   };

//   return (
//     <AdminLayout user={user} onLogout={handleLogout}>
//       {/* Header */}
//       <div className="mb-8">
//         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
//           <div>
//             <h1 className="text-3xl font-bold text-text-primary">
//               Admin Dashboard
//             </h1>
//             <p className="mt-2 text-text-secondary">
//               Comprehensive oversight and management tools for the alumni
//               platform
//             </p>
//           </div>
//           <div className="mt-4 sm:mt-0 flex space-x-3">
//             <Button variant="outline" iconName="Download">
//               Export Report
//             </Button>
//             <Button variant="default" iconName="Plus">
//               Quick Action
//             </Button>
//           </div>
//         </div>
//       </div>

//       {/* Tabs */}
//       <div className="mb-6 border-b border-border">
//         <nav className="-mb-px flex space-x-8 overflow-x-auto scrollbar-hide">
//           {tabs.map((tab) => (
//             <button
//               key={tab.id}
//               onClick={() => handleTabClick(tab.id)}
//               className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors duration-200 ${
//                 activeTab === tab.id
//                   ? "border-primary text-primary"
//                   : "border-transparent text-text-secondary hover:text-text-primary hover:border-border"
//               }`}
//             >
//               <Icon name={tab.icon} size={18} />
//               <span>{tab.label}</span>
//             </button>
//           ))}
//         </nav>
//       </div>

//       {/* Tab Content */}
//       <div>{renderTab()}</div>
//     </AdminLayout>
//   );
// };

// export default AdminDashboard;
import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import AdminLayout from "./AdminLayout";
import Icon from "../../components/AppIcon";
import Button from "../../components/ui/Button";

const tabs = [
  {
    id: "overview",
    label: "Overview",
    icon: "LayoutDashboard",
    path: "overview",
  },
  { id: "users", label: "User Management", icon: "Users", path: "users-m" },
  { id: "events", label: "Event Management", icon: "Calendar", path: "events-m" },
  { id: "jobs", label: "Job Management", icon: "Briefcase", path: "jobs-m" },
  {
    id: "donations",
    label: "Donation Management",
    icon: "CreditCard",
    path: "donations-m",
  },
  {
    id: "mentorship",
    label: "Mentorship Management",
    icon: "Handshake",
    path: "mentorship-m",
  },
  { id: "analytics", label: "Analytics", icon: "BarChart3", path: "analytics" },
  {
    id: "approvals",
    label: "Approvals",
    icon: "CheckCircle",
    path: "approvals",
  },
  {
    id: "user-queries",
    label: "User Queries",
    icon: "MessageSquare",
    path: "user-queries",
  },
];

export default function AdminDashboard({ user }) {
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState("overview");

  const handleLogout = () => navigate("/login");

  const handleTabClick = (tab) => {
    setCurrentTab(tab);
    navigate(tab); // navigate to /admin/<tab>
  };

  return (
    <AdminLayout user={user} onLogout={handleLogout}>
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-text-primary">
              Admin Dashboard
            </h1>
            <p className="mt-2 text-text-secondary">
              Comprehensive oversight and management tools for the alumni
              platform
            </p>
          </div>
          <div className="mt-4 sm:mt-0 flex space-x-3">
            <Button variant="outline" iconName="Download">
              Export Report
            </Button>
            <Button variant="default" iconName="Plus">
              Quick Action
            </Button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6 border-b border-border">
        <nav className="-mb-px flex space-x-8 overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.path)}
              className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors duration-200 ${
                currentTab === tab.path
                  ? "border-primary text-primary"
                  : "border-transparent text-text-secondary hover:text-text-primary hover:border-border"
              }`}
            >
              <Icon name={tab.icon} size={18} />
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Render tab content via Outlet */}
      <div>
        <Outlet />
      </div>
    </AdminLayout>
  );
}
