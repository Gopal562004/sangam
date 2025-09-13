// import React, { useState, useEffect } from "react";
// import KPICard from "./components/KPICard";
// import ApplicationChart from "./components/ApplicationChart";
// import PipelineFunnel from "./components/PipelineFunnel";
// import ActivityFeed from "./components/ActivityFeed";
// import QuickStats from "./components/QuickStats";
// import DepartmentBreakdown from "./components/DepartmentBreakdown";
// import JobList from "./components/JobList";
// import PostJobForm from "./components/PostJobForm";
// import PendingJobList from "./components/PendingJobList";
// import ManageJobs from "./components/ManageJobs";
// import Icon from "../../components/AppIcon";
// import Button from "../../components/ui/Button";
// import BreadcrumbTrail from "../../components/ui/BreadcrumbTrail";

// const RecruitmentOverviewDashboard = () => {
//   const [user, setUser] = useState(null);
//   const [notifications, setNotifications] = useState([]);
//   const [activeTab, setActiveTab] = useState("overview");
//   const [lastUpdated, setLastUpdated] = useState(new Date());
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//       // Mock user data - in real app, this would come from authentication context
//       const mockUser = {
//         id: 1,
//         name: "John Anderson",
//         email: "john.anderson@email.com",
//         role: "alumni",
//         graduationYear: "2015",
//         department: "Computer Science",
//         avatar:
//           "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
//         jobTitle: "Senior Software Engineer",
//         company: "TechCorp Solutions",
//         location: "San Francisco, CA",
//         skills: ["JavaScript", "React", "Node.js", "Python", "AWS"],
//         bio: "Passionate software engineer with 8+ years of experience in full-stack development. Love mentoring students and giving back to the community.",
//         linkedinUrl: "https://linkedin.com/in/johnanderson",
//         isVerified: true,
//       };
  
//       const mockNotifications = [
//         {
//           id: 1,
//           type: "mentorship_request",
//           title: "New mentorship request from Sarah Johnson",
//           message: "A junior Computer Science student would like your mentorship",
//           timestamp: new Date(Date.now() - 3600000),
//           read: false,
//         },
//         {
//           id: 2,
//           type: "event_reminder",
//           title: "Tech Industry Career Panel - Tomorrow",
//           message: "Don't forget about the virtual career panel you're attending",
//           timestamp: new Date(Date.now() - 7200000),
//           read: false,
//         },
//         {
//           id: 3,
//           type: "network_update",
//           title: "David Kim got promoted",
//           message:
//             "Your connection David Kim was promoted to Senior Software Engineer",
//           timestamp: new Date(Date.now() - 10800000),
//           read: true,
//         },
//       ];
  
//       setUser(mockUser);
//       setNotifications(mockNotifications);
//     }, []);

//   const kpiData = [
//     {
//       title: "Active Job Postings",
//       value: "47",
//       icon: "Briefcase",
//       color: "blue",
//     },
//     {
//       title: "Total Applications",
//       value: "1,247",
//       icon: "Users",
//       color: "purple",
//     },
//     {
//       title: "Avg Time to Hire",
//       value: "18.5 days",
//       icon: "Clock",
//       color: "green",
//     },
//     {
//       title: "Cost per Hire",
//       value: "$3,240",
//       icon: "DollarSign",
//       color: "yellow",
//     },
//   ];

//   const handleRefresh = () => {
//     setIsLoading(true);
//     setTimeout(() => {
//       setLastUpdated(new Date());
//       setIsLoading(false);
//     }, 1500);
//   };

//   const handleExport = (format) => {
//     console.log(`Exporting as ${format}`);
//   };

//   useEffect(() => {
//     const interval = setInterval(
//       () => setLastUpdated(new Date()),
//       30 * 60 * 1000
//     );
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="min-h-screen bg-background">
//       <main className="pt-16 max-w-7xl mx-auto px-6 py-8">
//         {/* Header */}
//         <BreadcrumbTrail user={user} />
//         <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
//           <div className="mb-4 lg:mb-0">
//             <h1 className="text-3xl font-bold text-foreground mb-2">
//               Recruitment Dashboard
//             </h1>
//             <p className="text-muted-foreground">
//               Manage job postings, applications, and analytics in one place
//             </p>
//           </div>

//           <div className="flex items-center space-x-3">
//             <div className="text-sm text-muted-foreground">
//               Last updated:{" "}
//               {lastUpdated.toLocaleTimeString("en-US", {
//                 hour: "2-digit",
//                 minute: "2-digit",
//                 hour12: false,
//               })}
//             </div>
//             <Button
//               variant="outline"
//               size="sm"
//               onClick={handleRefresh}
//               loading={isLoading}
//               iconName="RefreshCw"
//               iconPosition="left"
//             />
//             <div className="relative group">
//               <Button
//                 variant="outline"
//                 size="sm"
//                 iconName="Download"
//                 iconPosition="left"
//               >
//                 Export
//               </Button>
//               <div className="absolute right-0 top-full mt-2 w-48 bg-white border rounded shadow opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
//                 <div className="p-2">
//                   <button
//                     onClick={() => handleExport("pdf")}
//                     className="w-full text-left px-3 py-2 flex items-center space-x-2 hover:bg-gray-100 rounded"
//                   >
//                     <Icon name="FileText" size={16} />{" "}
//                     <span>Export as PDF</span>
//                   </button>
//                   <button
//                     onClick={() => handleExport("excel")}
//                     className="w-full text-left px-3 py-2 flex items-center space-x-2 hover:bg-gray-100 rounded"
//                   >
//                     <Icon name="FileSpreadsheet" size={16} />{" "}
//                     <span>Export as Excel</span>
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Tabs */}
//         <div className="flex border-b border-border mb-6 flex-wrap gap-2">
//           {["overview", "postJob", "pendingJobs", "manageJobs"].map((tab) => (
//             <button
//               key={tab}
//               className={`px-4 py-2 -mb-px font-medium ${
//                 activeTab === tab
//                   ? "border-b-2 border-primary text-primary"
//                   : "text-muted-foreground"
//               }`}
//               onClick={() => setActiveTab(tab)}
//             >
//               {tab === "overview"
//                 ? "Overview"
//                 : tab === "postJob"
//                 ? "Post Job"
//                 : tab === "pendingJobs"
//                 ? "Pending Jobs"
//                 : "Manage Jobs"}
//             </button>
//           ))}
//         </div>

//         {/* Tab Content */}
//         {activeTab === "overview" && (
//           <>
//             {/* KPI Cards */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//               {kpiData.map((kpi, idx) => (
//                 <KPICard
//                   key={idx}
//                   title={kpi.title}
//                   value={kpi.value}
//                   icon={kpi.icon}
//                   color={kpi.color}
//                 />
//               ))}
//             </div>

//             <QuickStats />
//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
//               <div className="lg:col-span-2">
//                 <ApplicationChart />
//               </div>
//               <div className="lg:col-span-1">
//                 <PipelineFunnel />
//               </div>
//             </div>
//             <JobList />
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//               <ActivityFeed />
//               <DepartmentBreakdown />
//             </div>
//           </>
//         )}

//         {activeTab === "postJob" && (
//           <div className="bg-white p-6 rounded-lg shadow-md">
//             <PostJobForm />
//           </div>
//         )}

//         {activeTab === "pendingJobs" && (
//           <div className="bg-white p-6 rounded-lg shadow-md">
//             <PendingJobList />
//           </div>
//         )}

//         {activeTab === "manageJobs" && (
//           <div className="bg-white p-6 rounded-lg shadow-md">
//             <ManageJobs />
//           </div>
//         )}
//       </main>
//     </div>
//   );
// };

// export default RecruitmentOverviewDashboard;
import React, { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import KPICard from "./components/KPICard";
import BreadcrumbTrail from "../../components/ui/BreadcrumbTrail";
import Button from "../../components/ui/Button";
import Icon from "../../components/AppIcon";

const RecruitmentOverviewDashboard = () => {
  const [user, setUser] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // Mock user data
  useEffect(() => {
    const mockUser = {
      id: 1,
      name: "John Anderson",
      role: "alumni",
    };
    setUser(mockUser);
  }, []);

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setLastUpdated(new Date());
      setIsLoading(false);
    }, 1500);
  };

  const handleExport = (format) => {
    console.log(`Exporting as ${format}`);
  };

  useEffect(() => {
    const interval = setInterval(
      () => setLastUpdated(new Date()),
      30 * 60 * 1000
    );
    return () => clearInterval(interval);
  }, []);

  const tabs = [
    { label: "Overview", path: "" },
    { label: "Post Job", path: "post-job" },
    { label: "Pending Jobs", path: "pending-jobs" },
    { label: "Manage Jobs", path: "manage-jobs" },
  ];

  const isActive = (path) => {
    if (path === "" && location.pathname.endsWith("recruitment")) return true;
    return location.pathname.endsWith(path);
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="pt-16 max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <BreadcrumbTrail user={user} />
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div className="mb-4 lg:mb-0">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Recruitment Dashboard
            </h1>
            <p className="text-muted-foreground">
              Manage job postings, applications, and analytics in one place
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <div className="text-sm text-muted-foreground">
              Last updated:{" "}
              {lastUpdated.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              })}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              loading={isLoading}
              iconName="RefreshCw"
              iconPosition="left"
            />
            <div className="relative group">
              <Button
                variant="outline"
                size="sm"
                iconName="Download"
                iconPosition="left"
              >
                Export
              </Button>
              <div className="absolute right-0 top-full mt-2 w-48 bg-white border rounded shadow opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                <div className="p-2">
                  <button
                    onClick={() => handleExport("pdf")}
                    className="w-full text-left px-3 py-2 flex items-center space-x-2 hover:bg-gray-100 rounded"
                  >
                    <Icon name="FileText" size={16} />{" "}
                    <span>Export as PDF</span>
                  </button>
                  <button
                    onClick={() => handleExport("excel")}
                    className="w-full text-left px-3 py-2 flex items-center space-x-2 hover:bg-gray-100 rounded"
                  >
                    <Icon name="FileSpreadsheet" size={16} />{" "}
                    <span>Export as Excel</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border mb-6 flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.path}
              className={`px-4 py-2 -mb-px font-medium ${
                isActive(tab.path)
                  ? "border-b-2 border-primary text-primary"
                  : "text-muted-foreground"
              }`}
              onClick={() => navigate(tab.path)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content via Outlet */}
        <Outlet />
      </main>
    </div>
  );
};

export default RecruitmentOverviewDashboard;
