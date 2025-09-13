// // // // import React from "react";
// // // // import { Routes, Route, Navigate } from "react-router-dom";
// // // // import { useAuth } from "../context/AuthContext";

// // // // import RouteLayout from "../pages/RouteLayout";

// // // // // Admin Pages
// // // // import AdminDashboard from "../pages/Admin/AdminDashboard";
// // // // import AdminProfile from "../pages/Admin/profile/AdminProfile";

// // // // // Alumni Pages
// // // // import AlumniDashboard from "../pages/Alumni/AlumniDashboard";
// // // // import AlumniProfile from "../pages/Alumni/profile/AlumniProfile";

// // // // // Student Pages
// // // // import StudentDashboard from "../pages/Student/StudentDashboard";
// // // // import StudentProfile from "../pages/Student/profile/StudentProfile";

// // // // // Faculty Pages
// // // // import FacultyDashboard from "../pages/Faculty/FacultyDashboard";
// // // // import FacultyProfile from "../pages/Faculty/profile/FacultyProfile";

// // // // // Recruiter Pages
// // // // import RecruiterDashboard from "../pages/Recruiter/RecruitmentOverviewDashboard";
// // // // import RecruiterProfile from "../pages/Recruiter/profile/RecruiterProfile";

// // // // // Shared Pages
// // // // import Donations from "../components/shared/donation-center/Donation";
// // // // import Directory from "../components/shared/alumni-directory/Directory";
// // // // import JobSearchAndApplicationPortal from "../components/shared/job-search-and-application-portal/JobSearchAndApplicationPortal";
// // // // import Networkhub from "../components/shared/network-hub/NetworkRoute";
// // // // // Public Pages
// // // // import Login from "../pages/General/auth/Login";
// // // // import Signup from "../pages/General/auth/Signup";
// // // // import About from "../pages/General/About";

// // // // export default function AppRoutes() {
// // // //   const { user, isAuthenticated, loading } = useAuth();
// // // //   const role = user?.role;

// // // //   const getDashboardPath = () => {
// // // //     switch (role) {
// // // //       case "admin":
// // // //         return "/admin";
// // // //       case "student":
// // // //         return "/student";
// // // //       case "faculty":
// // // //         return "/faculty";
// // // //       case "alumni":
// // // //         return "/alumni";
// // // //       case "recruiter":
// // // //         return "/recruiter";
// // // //       default:
// // // //         return "/login";
// // // //     }
// // // //   };

// // // //   if (loading) return <div>Loading...</div>;

// // // //   const ProtectedRoute = ({ allowedRoles, children }) => {
// // // //     if (!isAuthenticated) return <Navigate to="/login" replace />;
// // // //     if (allowedRoles && !allowedRoles.includes(role))
// // // //       return <Navigate to={getDashboardPath()} replace />;
// // // //     return children;
// // // //   };

// // // //   return (
// // // //     <Routes>
// // // //       {/* Home redirect */}
// // // //       <Route
// // // //         path="/"
// // // //         element={
// // // //           isAuthenticated ? (
// // // //             <Navigate to={getDashboardPath()} replace />
// // // //           ) : (
// // // //             <Navigate to="/login" replace />
// // // //           )
// // // //         }
// // // //       />

// // // //       {/* Public Routes */}
// // // //       <Route path="/login" element={<Login />} />
// // // //       <Route path="/signup" element={<Signup />} />
// // // //       <Route path="/about" element={<About />} />

// // // //       {/* Protected Routes */}
// // // //       <Route element={<RouteLayout />}>
// // // //         {/* Admin */}
// // // //         <Route
// // // //           path="admin"
// // // //           element={
// // // //             <ProtectedRoute allowedRoles={["admin"]}>
// // // //               <AdminDashboard />
// // // //             </ProtectedRoute>
// // // //           }
// // // //         />
// // // //         <Route
// // // //           path="admin/profile/:id"
// // // //           element={
// // // //             <ProtectedRoute allowedRoles={["admin"]}>
// // // //               <AdminProfile />
// // // //             </ProtectedRoute>
// // // //           }
// // // //         />

// // // //         {/* Alumni */}
// // // //         <Route
// // // //           path="alumni"
// // // //           element={
// // // //             <ProtectedRoute allowedRoles={["alumni"]}>
// // // //               <AlumniDashboard />
// // // //             </ProtectedRoute>
// // // //           }
// // // //         />
// // // //         <Route
// // // //           path="alumni/profile/:id"
// // // //           element={
// // // //             <ProtectedRoute allowedRoles={["alumni"]}>
// // // //               <AlumniProfile />
// // // //             </ProtectedRoute>
// // // //           }
// // // //         />

// // // //         {/* Student */}
// // // //         <Route
// // // //           path="student"
// // // //           element={
// // // //             <ProtectedRoute allowedRoles={["student"]}>
// // // //               <StudentDashboard />
// // // //             </ProtectedRoute>
// // // //           }
// // // //         />
// // // //         <Route
// // // //           path="student/profile/:id"
// // // //           element={
// // // //             <ProtectedRoute allowedRoles={["student"]}>
// // // //               <StudentProfile />
// // // //             </ProtectedRoute>
// // // //           }
// // // //         />

// // // //         {/* Faculty */}
// // // //         <Route
// // // //           path="faculty"
// // // //           element={
// // // //             <ProtectedRoute allowedRoles={["faculty"]}>
// // // //               <FacultyDashboard />
// // // //             </ProtectedRoute>
// // // //           }
// // // //         />
// // // //         <Route
// // // //           path="faculty/profile/:id"
// // // //           element={
// // // //             <ProtectedRoute allowedRoles={["faculty"]}>
// // // //               <FacultyProfile />
// // // //             </ProtectedRoute>
// // // //           }
// // // //         />

// // // //         {/* Recruiter */}
// // // //         <Route
// // // //           path="recruiter"
// // // //           element={
// // // //             <ProtectedRoute allowedRoles={["recruiter"]}>
// // // //               <RecruiterDashboard />
// // // //             </ProtectedRoute>
// // // //           }
// // // //         />
// // // //         <Route
// // // //           path="recruiter/profile/:id"
// // // //           element={
// // // //             <ProtectedRoute allowedRoles={["recruiter"]}>
// // // //               <RecruiterProfile />
// // // //             </ProtectedRoute>
// // // //           }
// // // //         />

// // // //         {/* Donations & Directory accessible by all roles */}
// // // //         {["admin", "student", "faculty", "alumni", "recruiter"].map((r) => (
// // // //           <React.Fragment key={r}>
// // // //             <Route
// // // //               path={`${r}/donations`}
// // // //               element={
// // // //                 <ProtectedRoute
// // // //                   allowedRoles={[
// // // //                     "admin",
// // // //                     "student",
// // // //                     "faculty",
// // // //                     "alumni",
// // // //                     "recruiter",
// // // //                   ]}
// // // //                 >
// // // //                   <Donations />
// // // //                 </ProtectedRoute>
// // // //               }
// // // //             />
// // // //             <Route
// // // //               path={`${r}/directory`}
// // // //               element={
// // // //                 <ProtectedRoute
// // // //                   allowedRoles={[
// // // //                     "admin",
// // // //                     "student",
// // // //                     "faculty",
// // // //                     "alumni",
// // // //                     "recruiter",
// // // //                   ]}
// // // //                 >
// // // //                   <Directory />
// // // //                 </ProtectedRoute>
// // // //               }
// // // //             />
// // // //             <Route
// // // //               path={`${r}/jobs`}
// // // //               element={
// // // //                 <ProtectedRoute
// // // //                   allowedRoles={[
// // // //                     "admin",
// // // //                     "student",
// // // //                     "faculty",
// // // //                     "alumni",
// // // //                     "recruiter",
// // // //                   ]}
// // // //                 >
// // // //                   <JobSearchAndApplicationPortal />
// // // //                 </ProtectedRoute>
// // // //               }
// // // //             />
// // // //             <Route
// // // //               path={`${r}/network/*`}
// // // //               element={
// // // //                 <ProtectedRoute
// // // //                   allowedRoles={[
// // // //                     "admin",
// // // //                     "student",
// // // //                     "faculty",
// // // //                     "alumni",
// // // //                     "recruiter",
// // // //                   ]}
// // // //                 >
// // // //                   <Networkhub />
// // // //                 </ProtectedRoute>
// // // //               }
// // // //             />
// // // //           </React.Fragment>
// // // //         ))}
// // // //       </Route>

// // // //       {/* Fallback */}
// // // //       <Route
// // // //         path="*"
// // // //         element={
// // // //           <Navigate
// // // //             to={isAuthenticated ? getDashboardPath() : "/login"}
// // // //             replace
// // // //           />
// // // //         }
// // // //       />
// // // //     </Routes>
// // // //   );
// // // // }
// // // // AppRoutes.jsx
// // // import React from "react";
// // // import { Routes, Route, Navigate } from "react-router-dom";
// // // import { useAuth } from "../context/AuthContext";

// // // import RouteLayout from "../pages/RouteLayout";

// // // // Admin Pages
// // // import AdminDashboard from "../pages/Admin/AdminDashboard";
// // // import AdminProfile from "../pages/Admin/profile/AdminProfile";

// // // // Alumni Pages
// // // import AlumniDashboard from "../pages/Alumni/AlumniDashboard";
// // // import AlumniProfile from "../pages/Alumni/profile/AlumniProfile";

// // // // Student Pages
// // // import StudentDashboard from "../pages/Student/StudentDashboard";
// // // import StudentProfile from "../pages/Student/profile/StudentProfile";

// // // // Faculty Pages
// // // import FacultyDashboard from "../pages/Faculty/FacultyDashboard";
// // // import FacultyProfile from "../pages/Faculty/profile/FacultyProfile";

// // // // Recruiter Pages
// // // import RecruiterDashboard from "../pages/Recruiter/RecruitmentOverviewDashboard";
// // // import RecruiterProfile from "../pages/Recruiter/profile/RecruiterProfile";


// // // // Shared Pages
// // // import Donations from "../components/shared/donation-center/Donation";
// // // import Directory from "../components/shared/alumni-directory/Directory";
// // // import JobSearchAndApplicationPortal from "../components/shared/job-search-and-application-portal/JobSearchAndApplicationPortal";
// // // // Network Hub Pages
// // // import NetworkRoute from "../components/shared/network-hub/NetworkRoute";
// // // import NetworkDashboard from "../components/shared/network-hub/dashboard/index";
// // // import NetworkChat from "../components/shared/network-hub/chat/index";
// // // import MentorshipDashboard from "../components/shared/network-hub/mentorship-dashboard/index";
// // // import Community from "../components/shared/network-hub/community/index";
// // // import GroupChatPage from "../components/shared/network-hub/group-chat/index";
// // // import SessionManagement from "../components/shared/network-hub/session-management/index";

// // // // Public Pages
// // // import Login from "../pages/General/auth/Login";
// // // import Signup from "../pages/General/auth/Signup";
// // // import About from "../pages/General/About";

// // // // Fallback

// // // export default function AppRoutes() {
// // //   const { user, isAuthenticated, loading } = useAuth();
// // //   const role = user?.role;

// // //   // Determine the dashboard path for role-based redirects
// // //   const getDashboardPath = () => {
// // //     switch (role) {
// // //       case "admin":
// // //         return "/admin";
// // //       case "student":
// // //         return "/student";
// // //       case "faculty":
// // //         return "/faculty";
// // //       case "alumni":
// // //         return "/alumni";
// // //       case "recruiter":
// // //         return "/recruiter";
// // //       default:
// // //         return "/login";
// // //     }
// // //   };

// // //   if (loading) return <div>Loading...</div>;

// // //   // Protected Route wrapper
// // //   const ProtectedRoute = ({ allowedRoles, children }) => {
// // //     if (!isAuthenticated) return <Navigate to="/login" replace />;
// // //     if (allowedRoles && !allowedRoles.includes(role))
// // //       return <Navigate to={getDashboardPath()} replace />;
// // //     return children;
// // //   };

// // //   return (
// // //     <Routes>
// // //       {/* Home redirect */}
// // //       <Route
// // //         path="/"
// // //         element={
// // //           isAuthenticated ? (
// // //             <Navigate to={getDashboardPath()} replace />
// // //           ) : (
// // //             <Navigate to="/login" replace />
// // //           )
// // //         }
// // //       />

// // //       {/* Public Routes */}
// // //       <Route path="/login" element={<Login />} />
// // //       <Route path="/signup" element={<Signup />} />
// // //       <Route path="/about" element={<About />} />

// // //       {/* Protected Routes */}
// // //       <Route element={<RouteLayout />}>
// // //         {/* Admin */}
// // //         <Route
// // //           path="admin"
// // //           element={
// // //             <ProtectedRoute allowedRoles={["admin"]}>
// // //               <AdminDashboard />
// // //             </ProtectedRoute>
// // //           }
// // //         />
// // //         <Route
// // //           path="admin/profile/:id"
// // //           element={
// // //             <ProtectedRoute allowedRoles={["admin"]}>
// // //               <AdminProfile />
// // //             </ProtectedRoute>
// // //           }
// // //         />

// // //         {/* Alumni */}
// // //         <Route
// // //           path="alumni"
// // //           element={
// // //             <ProtectedRoute allowedRoles={["alumni"]}>
// // //               <AlumniDashboard />
// // //             </ProtectedRoute>
// // //           }
// // //         />
// // //         <Route
// // //           path="alumni/profile/:id"
// // //           element={
// // //             <ProtectedRoute allowedRoles={["alumni"]}>
// // //               <AlumniProfile />
// // //             </ProtectedRoute>
// // //           }
// // //         />

// // //         {/* Student */}
// // //         <Route
// // //           path="student"
// // //           element={
// // //             <ProtectedRoute allowedRoles={["student"]}>
// // //               <StudentDashboard />
// // //             </ProtectedRoute>
// // //           }
// // //         />
// // //         <Route
// // //           path="student/profile/:id"
// // //           element={
// // //             <ProtectedRoute allowedRoles={["student"]}>
// // //               <StudentProfile />
// // //             </ProtectedRoute>
// // //           }
// // //         />

// // //         {/* Faculty */}
// // //         <Route
// // //           path="faculty"
// // //           element={
// // //             <ProtectedRoute allowedRoles={["faculty"]}>
// // //               <FacultyDashboard />
// // //             </ProtectedRoute>
// // //           }
// // //         />
// // //         <Route
// // //           path="faculty/profile/:id"
// // //           element={
// // //             <ProtectedRoute allowedRoles={["faculty"]}>
// // //               <FacultyProfile />
// // //             </ProtectedRoute>
// // //           }
// // //         />

// // //         {/* Recruiter */}
// // //         <Route
// // //           path="recruiter"
// // //           element={
// // //             <ProtectedRoute allowedRoles={["recruiter"]}>
// // //               <RecruiterDashboard />
// // //             </ProtectedRoute>
// // //           }
// // //         />
// // //         <Route
// // //           path="recruiter/profile/:id"
// // //           element={
// // //             <ProtectedRoute allowedRoles={["recruiter"]}>
// // //               <RecruiterProfile />
// // //             </ProtectedRoute>
// // //           }
// // //         />

// // //         {/* Network Hub Routes (Role-Based) */}
// // //         {["admin", "student", "faculty", "alumni", "recruiter"].map((r) => (
// // //           <Route
// // //             key={r}
// // //             path={`${r}/network/*`}
// // //             element={
// // //               <ProtectedRoute
// // //                 allowedRoles={["admin", "student", "faculty", "alumni", "recruiter"]}
// // //               >
// // //                 <NetworkRoute />
// // //               </ProtectedRoute>
// // //             }
// // //           >
// // //             <Route index element={<NetworkDashboard />} />
// // //             <Route path="dashboard" element={<NetworkDashboard />} />
// // //             <Route path="chat" element={<NetworkChat />} />
// // //             <Route path="mentorship-dashboard" element={<MentorshipDashboard />} />
// // //             <Route path="community" element={<Community />} />
// // //             <Route path="session-management" element={<SessionManagement />} />
// // //             <Route path="group-chat" element={<GroupChatPage />} />
// // //           </Route>
// // //           //             <Route
// // // //               path={`${r}/jobs`}
// // // //               element={
// // // //                 <ProtectedRoute
// // // //                   allowedRoles={[
// // // //                     "admin",
// // // //                     "student",
// // // //                     "faculty",
// // // //                     "alumni",
// // // //                     "recruiter",
// // // //                   ]}
// // // //                 >
// // // //                   <JobSearchAndApplicationPortal />
// // // //                 </ProtectedRoute>
// // // //               }
// // // //             />
// // //         ))}
// // //       </Route>

// // //       {/* Fallback */}
// // //       <Route
// // //         path="*"
// // //         element={
// // //           <Navigate
// // //             to={isAuthenticated ? getDashboardPath() : "/login"}
// // //             replace
// // //           />
// // //         }
// // //       />
// // //     </Routes>
// // //   );
// // // }
// // import React from "react";
// // import { Routes, Route, Navigate } from "react-router-dom";
// // import { useAuth } from "../context/AuthContext";

// // import RouteLayout from "../pages/RouteLayout";

// // // Admin Pages
// // import AdminDashboard from "../pages/Admin/AdminDashboard";
// // import AdminProfile from "../pages/Admin/profile/AdminProfile";

// // // Alumni Pages
// // import AlumniDashboard from "../pages/Alumni/AlumniDashboard";
// // import AlumniProfile from "../pages/Alumni/profile/AlumniProfile";

// // // Student Pages
// // import StudentDashboard from "../pages/Student/StudentDashboard";
// // import StudentProfile from "../pages/Student/profile/StudentProfile";

// // // Faculty Pages
// // import FacultyDashboard from "../pages/Faculty/FacultyDashboard";
// // import FacultyProfile from "../pages/Faculty/profile/FacultyProfile";

// // // Recruiter Pages
// // import RecruiterDashboard from "../pages/Recruiter/RecruitmentOverviewDashboard";
// // import RecruiterProfile from "../pages/Recruiter/profile/RecruiterProfile";

// // // Shared Pages
// // import Donations from "../components/shared/donation-center/Donation";
// // import Directory from "../components/shared/alumni-directory/Directory";
// // import JobSearchAndApplicationPortal from "../components/shared/job-search-and-application-portal/JobSearchAndApplicationPortal";

// // // Network Hub Pages
// // import NetworkRoute from "../components/shared/network-hub/NetworkRoute";
// // import NetworkDashboard from "../components/shared/network-hub/dashboard/index";
// // import NetworkChat from "../components/shared/network-hub/chat/index";
// // import MentorshipDashboard from "../components/shared/network-hub/mentorship-dashboard/index";
// // import Community from "../components/shared/network-hub/community/index";
// // import GroupChatPage from "../components/shared/network-hub/group-chat/index";
// // import SessionManagement from "../components/shared/network-hub/session-management/index";

// // // Public Pages
// // import Login from "../pages/General/auth/Login";
// // import Signup from "../pages/General/auth/Signup";
// // import About from "../pages/General/About";

// // export default function AppRoutes() {
// //   const { user, isAuthenticated, loading } = useAuth();
// //   const role = user?.role;

// //   const getDashboardPath = () => {
// //     switch (role) {
// //       case "admin":
// //         return "/admin";
// //       case "student":
// //         return "/student";
// //       case "faculty":
// //         return "/faculty";
// //       case "alumni":
// //         return "/alumni";
// //       case "recruiter":
// //         return "/recruiter";
// //       default:
// //         return "/login";
// //     }
// //   };

// //   if (loading) return <div>Loading...</div>;

// //   const ProtectedRoute = ({ allowedRoles, children }) => {
// //     if (!isAuthenticated) return <Navigate to="/login" replace />;
// //     if (allowedRoles && !allowedRoles.includes(role))
// //       return <Navigate to={getDashboardPath()} replace />;
// //     return children;
// //   };

// //   return (
// //     <Routes>
// //       {/* Home redirect */}
// //       <Route
// //         path="/"
// //         element={
// //           isAuthenticated ? (
// //             <Navigate to={getDashboardPath()} replace />
// //           ) : (
// //             <Navigate to="/login" replace />
// //           )
// //         }
// //       />

// //       {/* Public Routes */}
// //       <Route path="/login" element={<Login />} />
// //       <Route path="/signup" element={<Signup />} />
// //       <Route path="/about" element={<About />} />

// //       {/* Protected Routes */}
// //       <Route element={<RouteLayout />}>
// //         {/* Admin */}
// //         <Route
// //           path="admin"
// //           element={
// //             <ProtectedRoute allowedRoles={["admin"]}>
// //               <AdminDashboard />
// //             </ProtectedRoute>
// //           }
// //         />
// //         <Route
// //           path="admin/profile/:id"
// //           element={
// //             <ProtectedRoute allowedRoles={["admin"]}>
// //               <AdminProfile />
// //             </ProtectedRoute>
// //           }
// //         />

// //         {/* Alumni */}
// //         <Route
// //           path="alumni"
// //           element={
// //             <ProtectedRoute allowedRoles={["alumni"]}>
// //               <AlumniDashboard />
// //             </ProtectedRoute>
// //           }
// //         />
// //         <Route
// //           path="alumni/profile/:id"
// //           element={
// //             <ProtectedRoute allowedRoles={["alumni"]}>
// //               <AlumniProfile />
// //             </ProtectedRoute>
// //           }
// //         />

// //         {/* Student */}
// //         <Route
// //           path="student"
// //           element={
// //             <ProtectedRoute allowedRoles={["student"]}>
// //               <StudentDashboard />
// //             </ProtectedRoute>
// //           }
// //         />
// //         <Route
// //           path="student/profile/:id"
// //           element={
// //             <ProtectedRoute allowedRoles={["student"]}>
// //               <StudentProfile />
// //             </ProtectedRoute>
// //           }
// //         />

// //         {/* Faculty */}
// //         <Route
// //           path="faculty"
// //           element={
// //             <ProtectedRoute allowedRoles={["faculty"]}>
// //               <FacultyDashboard />
// //             </ProtectedRoute>
// //           }
// //         />
// //         <Route
// //           path="faculty/profile/:id"
// //           element={
// //             <ProtectedRoute allowedRoles={["faculty"]}>
// //               <FacultyProfile />
// //             </ProtectedRoute>
// //           }
// //         />

// //         {/* Recruiter */}
// //         <Route
// //           path="recruiter"
// //           element={
// //             <ProtectedRoute allowedRoles={["recruiter"]}>
// //               <RecruiterDashboard />
// //             </ProtectedRoute>
// //           }
// //         />
// //         <Route
// //           path="recruiter/profile/:id"
// //           element={
// //             <ProtectedRoute allowedRoles={["recruiter"]}>
// //               <RecruiterProfile />
// //             </ProtectedRoute>
// //           }
// //         />

// //         {/* Role-Based Network Hub, Jobs, Donations, Directory */}
// //         {["admin", "student", "faculty", "alumni", "recruiter"].map((r) => (
// //           <React.Fragment key={r}>
// //             {/* Network Hub */}
// //             <Route
// //               path={`${r}/network/*`}
// //               element={
// //                 <ProtectedRoute
// //                   allowedRoles={[
// //                     "admin",
// //                     "student",
// //                     "faculty",
// //                     "alumni",
// //                     "recruiter",
// //                   ]}
// //                 >
// //                   <NetworkRoute />
// //                 </ProtectedRoute>
// //               }
// //             >
// //               <Route index element={<NetworkDashboard />} />
// //               <Route path="dashboard" element={<NetworkDashboard />} />
// //               <Route path="chat" element={<NetworkChat />} />
// //               <Route
// //                 path="mentorship-dashboard"
// //                 element={<MentorshipDashboard />}
// //               />
// //               <Route path="community" element={<Community />} />
// //               <Route
// //                 path="session-management"
// //                 element={<SessionManagement />}
// //               />
// //               <Route path="group-chat" element={<GroupChatPage />} />
// //             </Route>

// //             {/* Jobs */}
// //             <Route
// //               path={`${r}/jobs`}
// //               element={
// //                 <ProtectedRoute
// //                   allowedRoles={[
// //                     "admin",
// //                     "student",
// //                     "faculty",
// //                     "alumni",
// //                     "recruiter",
// //                   ]}
// //                 >
// //                   <JobSearchAndApplicationPortal />
// //                 </ProtectedRoute>
// //               }
// //             />

// //             {/* Donations */}
// //             <Route
// //               path={`${r}/donations`}
// //               element={
// //                 <ProtectedRoute
// //                   allowedRoles={[
// //                     "admin",
// //                     "student",
// //                     "faculty",
// //                     "alumni",
// //                     "recruiter",
// //                   ]}
// //                 >
// //                   <Donations />
// //                 </ProtectedRoute>
// //               }
// //             />

// //             {/* Directory */}
// //             <Route
// //               path={`${r}/directory`}
// //               element={
// //                 <ProtectedRoute
// //                   allowedRoles={[
// //                     "admin",
// //                     "student",
// //                     "faculty",
// //                     "alumni",
// //                     "recruiter",
// //                   ]}
// //                 >
// //                   <Directory />
// //                 </ProtectedRoute>
// //               }
// //             />
// //           </React.Fragment>
// //         ))}
// //       </Route>

// //       {/* Fallback */}
// //       <Route
// //         path="*"
// //         element={
// //           <Navigate
// //             to={isAuthenticated ? getDashboardPath() : "/login"}
// //             replace
// //           />
// //         }
// //       />
// //     </Routes>
// //   );
// // }
// import React from "react";
// import { Routes, Route, Navigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// import RouteLayout from "../pages/RouteLayout";

// // Admin Pages
// import AdminDashboard from "../pages/Admin/AdminDashboard";
// import AdminProfile from "../pages/Admin/profile/AdminProfile";

// // Alumni Pages
// import AlumniDashboard from "../pages/Alumni/AlumniDashboard";
// import AlumniProfile from "../pages/Alumni/profile/AlumniProfile";

// // Student Pages
// import StudentDashboard from "../pages/Student/StudentDashboard";
// import StudentProfile from "../pages/Student/profile/StudentProfile";

// // Faculty Pages
// import FacultyDashboard from "../pages/Faculty/FacultyDashboard";
// import FacultyProfile from "../pages/Faculty/profile/FacultyProfile";

// // Recruiter Pages
// import RecruitmentOverviewDashboard from "../pages/Recruiter/RecruitmentOverviewDashboard";
// import RecruiterProfile from "../pages/Recruiter/profile/RecruiterProfile";
// import OverviewTab from "../pages/Recruiter/components/OverviewTab";
// import PostJobTab from "../pages/Recruiter/components/PostJobForm";
// import PendingJobsTab from "../pages/Recruiter/components/PendingJobList";
// import ManageJobsTab from "../pages/Recruiter/components/ManageJobs";

// // Shared Pages
// import Donations from "../components/shared/donation-center/Donation";
// import Directory from "../components/shared/alumni-directory/Directory";
// import JobSearchAndApplicationPortal from "../components/shared/job-search-and-application-portal/JobSearchAndApplicationPortal";

// // Network Hub Pages
// import NetworkRoute from "../components/shared/network-hub/NetworkRoute";
// import NetworkDashboard from "../components/shared/network-hub/dashboard/index";
// import NetworkChat from "../components/shared/network-hub/chat/index";
// import MentorshipDashboard from "../components/shared/network-hub/mentorship-dashboard/index";
// import Community from "../components/shared/network-hub/community/index";
// import GroupChatPage from "../components/shared/network-hub/group-chat/index";
// import SessionManagement from "../components/shared/network-hub/session-management/index";

// // Public Pages
// import Login from "../pages/General/auth/Login";
// import Signup from "../pages/General/auth/Signup";
// import About from "../pages/General/About";

// export default function AppRoutes() {
//   const { user, isAuthenticated, loading } = useAuth();
//   const role = user?.role;

//   const getDashboardPath = () => {
//     switch (role) {
//       case "admin":
//         return "/admin";
//       case "student":
//         return "/student";
//       case "faculty":
//         return "/faculty";
//       case "alumni":
//         return "/alumni";
//       case "recruiter":
//         return "/recruiter";
//       default:
//         return "/login";
//     }
//   };

//   if (loading) return <div>Loading...</div>;

//   const ProtectedRoute = ({ allowedRoles, children }) => {
//     if (!isAuthenticated) return <Navigate to="/login" replace />;
//     if (allowedRoles && !allowedRoles.includes(role))
//       return <Navigate to={getDashboardPath()} replace />;
//     return children;
//   };

//   return (
//     <Routes>
//       {/* Home redirect */}
//       <Route
//         path="/"
//         element={
//           isAuthenticated ? (
//             <Navigate to={getDashboardPath()} replace />
//           ) : (
//             <Navigate to="/login" replace />
//           )
//         }
//       />

//       {/* Public Routes */}
//       <Route path="/login" element={<Login />} />
//       <Route path="/signup" element={<Signup />} />
//       <Route path="/about" element={<About />} />

//       {/* Protected Routes */}
//       <Route element={<RouteLayout />}>
//         {/* Admin */}
//         <Route
//           path="admin"
//           element={
//             <ProtectedRoute allowedRoles={["admin"]}>
//               <AdminDashboard />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="admin/profile/:id"
//           element={
//             <ProtectedRoute allowedRoles={["admin"]}>
//               <AdminProfile />
//             </ProtectedRoute>
//           }
//         />

//         {/* Alumni */}
//         <Route
//           path="alumni"
//           element={
//             <ProtectedRoute allowedRoles={["alumni"]}>
//               <AlumniDashboard />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="alumni/profile/:id"
//           element={
//             <ProtectedRoute allowedRoles={["alumni"]}>
//               <AlumniProfile />
//             </ProtectedRoute>
//           }
//         />

//         {/* Student */}
//         <Route
//           path="student"
//           element={
//             <ProtectedRoute allowedRoles={["student"]}>
//               <StudentDashboard />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="student/profile/:id"
//           element={
//             <ProtectedRoute allowedRoles={["student"]}>
//               <StudentProfile />
//             </ProtectedRoute>
//           }
//         />

//         {/* Faculty */}
//         <Route
//           path="faculty"
//           element={
//             <ProtectedRoute allowedRoles={["faculty"]}>
//               <FacultyDashboard />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="faculty/profile/:id"
//           element={
//             <ProtectedRoute allowedRoles={["faculty"]}>
//               <FacultyProfile />
//             </ProtectedRoute>
//           }
//         />

//         {/* Recruiter */}
//         <Route
//           path="recruiter/*"
//           element={
//             <ProtectedRoute allowedRoles={["recruiter"]}>
//               <RecruitmentOverviewDashboard />
//             </ProtectedRoute>
//           }
//         >
//           <Route index element={<OverviewTab />} />
//           <Route path="post-job" element={<PostJobTab />} />
//           <Route path="pending-jobs" element={<PendingJobsTab />} />
//           <Route path="manage-jobs" element={<ManageJobsTab />} />
//         </Route>

//         <Route
//           path="recruiter/profile/:id"
//           element={
//             <ProtectedRoute allowedRoles={["recruiter"]}>
//               <RecruiterProfile />
//             </ProtectedRoute>
//           }
//         />

//         {/* Role-Based Network Hub, Jobs, Donations, Directory */}
//         {["admin", "student", "faculty", "alumni", "recruiter"].map((r) => (
//           <React.Fragment key={r}>
//             {/* Network Hub */}
//             <Route
//               path={`${r}/network/*`}
//               element={
//                 <ProtectedRoute
//                   allowedRoles={[
//                     "admin",
//                     "student",
//                     "faculty",
//                     "alumni",
//                     "recruiter",
//                   ]}
//                 >
//                   <NetworkRoute />
//                 </ProtectedRoute>
//               }
//             >
//               <Route index element={<NetworkDashboard />} />
//               <Route path="dashboard" element={<NetworkDashboard />} />
//               <Route path="chat" element={<NetworkChat />} />
//               <Route
//                 path="mentorship-dashboard"
//                 element={<MentorshipDashboard />}
//               />
//               <Route path="community" element={<Community />} />
//               <Route
//                 path="session-management"
//                 element={<SessionManagement />}
//               />
//               <Route path="group-chat" element={<GroupChatPage />} />
//             </Route>

//             {/* Jobs */}
//             <Route
//               path={`${r}/jobs`}
//               element={
//                 <ProtectedRoute
//                   allowedRoles={[
//                     "admin",
//                     "student",
//                     "faculty",
//                     "alumni",
//                     "recruiter",
//                   ]}
//                 >
//                   <JobSearchAndApplicationPortal />
//                 </ProtectedRoute>
//               }
//             />

//             {/* Donations */}
//             <Route
//               path={`${r}/donations`}
//               element={
//                 <ProtectedRoute
//                   allowedRoles={[
//                     "admin",
//                     "student",
//                     "faculty",
//                     "alumni",
//                     "recruiter",
//                   ]}
//                 >
//                   <Donations />
//                 </ProtectedRoute>
//               }
//             />

//             {/* Directory */}
//             <Route
//               path={`${r}/directory`}
//               element={
//                 <ProtectedRoute
//                   allowedRoles={[
//                     "admin",
//                     "student",
//                     "faculty",
//                     "alumni",
//                     "recruiter",
//                   ]}
//                 >
//                   <Directory />
//                 </ProtectedRoute>
//               }
//             />
//           </React.Fragment>
//         ))}
//       </Route>

//       {/* Fallback */}
//       <Route
//         path="*"
//         element={
//           <Navigate
//             to={isAuthenticated ? getDashboardPath() : "/login"}
//             replace
//           />
//         }
//       />
//     </Routes>
//   );
// }
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import RouteLayout from "../pages/RouteLayout";

// Admin Pages
import AdminDashboard from "../pages/Admin/AdminDashboard";
import AdminProfile from "../pages/Admin/profile/AdminProfile";
import Overview from "../pages/Admin/subpages/Overview";
import UserManagement from "../pages/Admin/subpages/UserManagement";
import EventManagement from "../pages/Admin/subpages/EventManagement";
import JobManagement from "../pages/Admin/subpages/JobManagement";
import DonationManagement from "../pages/Admin/subpages/DonationManagement";
import MentorshipManagement from "../pages/Admin/subpages/MentorshipManagement";
import Analytics from "../pages/Admin/subpages/Analytics";
import Approvals from "../pages/Admin/subpages/Approvals";
import UserQueries from "../pages/Admin/subpages/UserQueries";

// Alumni Pages
import AlumniDashboard from "../pages/Alumni/AlumniDashboard";
import AlumniProfile from "../pages/Alumni/profile/AlumniProfile";

// Student Pages
import StudentDashboard from "../pages/Student/StudentDashboard";
import StudentProfile from "../pages/Student/profile/StudentProfile";

// Faculty Pages
import FacultyDashboard from "../pages/Faculty/FacultyDashboard";
import FacultyProfile from "../pages/Faculty/profile/FacultyProfile";

// Recruiter Pages
import RecruitmentOverviewDashboard from "../pages/Recruiter/RecruitmentOverviewDashboard";
import RecruiterProfile from "../pages/Recruiter/profile/RecruiterProfile";
import OverviewTab from "../pages/Recruiter/components/OverviewTab";
import PostJobTab from "../pages/Recruiter/components/PostJobForm";
import PendingJobsTab from "../pages/Recruiter/components/PendingJobList";
import ManageJobsTab from "../pages/Recruiter/components/ManageJobs";

// Shared Pages
import Donations from "../components/shared/donation-center/Donation";
import Directory from "../components/shared/alumni-directory/Directory";
import JobSearchAndApplicationPortal from "../components/shared/job-search-and-application-portal/JobSearchAndApplicationPortal";

// Network Hub Pages
import NetworkRoute from "../components/shared/network-hub/NetworkRoute";
import NetworkDashboard from "../components/shared/network-hub/dashboard/index";
import NetworkChat from "../components/shared/network-hub/chat/index";
import MentorshipDashboard from "../components/shared/network-hub/mentorship-dashboard/index";
import Community from "../components/shared/network-hub/community/index";
import GroupChatPage from "../components/shared/network-hub/group-chat/index";
import SessionManagement from "../components/shared/network-hub/session-management/index";

// Public Pages
import Login from "../pages/General/auth/Login";
import Signup from "../pages/General/auth/Signup";
import About from "../pages/General/About";

export default function AppRoutes() {
  const { user, isAuthenticated, loading } = useAuth();
  const role = user?.role;

  const getDashboardPath = () => {
    switch (role) {
      case "admin":
        return "/admin";
      case "student":
        return "/student";
      case "faculty":
        return "/faculty";
      case "alumni":
        return "/alumni";
      case "recruiter":
        return "/recruiter";
      default:
        return "/login";
    }
  };

  if (loading) return <div>Loading...</div>;

  const ProtectedRoute = ({ allowedRoles, children }) => {
    if (!isAuthenticated) return <Navigate to="/login" replace />;
    if (allowedRoles && !allowedRoles.includes(role))
      return <Navigate to={getDashboardPath()} replace />;
    return children;
  };

  return (
    <Routes>
      {/* Home redirect */}
      <Route
        path="/"
        element={
          isAuthenticated ? (
            <Navigate to={getDashboardPath()} replace />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/about" element={<About />} />

      {/* Protected Routes */}
      <Route element={<RouteLayout />}>
        {/* Admin */}
        <Route
          path="admin/*"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<Overview />} />
          <Route path="overview" element={<Overview />} />
          <Route path="users-m" element={<UserManagement />} />
          <Route path="events-m" element={<EventManagement />} />
          <Route path="jobs-m" element={<JobManagement />} />
          <Route path="donations-m" element={<DonationManagement />} />
          <Route path="mentorship-m" element={<MentorshipManagement />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="approvals" element={<Approvals />} />
          <Route path="user-queries" element={<UserQueries />} />
        </Route>
        <Route
          path="admin/profile/:id"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminProfile />
            </ProtectedRoute>
          }
        />

        {/* Alumni */}
        <Route
          path="alumni"
          element={
            <ProtectedRoute allowedRoles={["alumni"]}>
              <AlumniDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="alumni/profile/:id"
          element={
            <ProtectedRoute allowedRoles={["alumni"]}>
              <AlumniProfile />
            </ProtectedRoute>
          }
        />

        {/* Student */}
        <Route
          path="student"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="student/profile/:id"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <StudentProfile />
            </ProtectedRoute>
          }
        />

        {/* Faculty */}
        <Route
          path="faculty"
          element={
            <ProtectedRoute allowedRoles={["faculty"]}>
              <FacultyDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="faculty/profile/:id"
          element={
            <ProtectedRoute allowedRoles={["faculty"]}>
              <FacultyProfile />
            </ProtectedRoute>
          }
        />

        {/* Recruiter */}
        <Route
          path="recruiter/*"
          element={
            <ProtectedRoute allowedRoles={["recruiter"]}>
              <RecruitmentOverviewDashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<OverviewTab />} />
          <Route path="post-job" element={<PostJobTab />} />
          <Route path="pending-jobs" element={<PendingJobsTab />} />
          <Route path="manage-jobs" element={<ManageJobsTab />} />
        </Route>
        <Route
          path="recruiter/profile/:id"
          element={
            <ProtectedRoute allowedRoles={["recruiter"]}>
              <RecruiterProfile />
            </ProtectedRoute>
          }
        />

        {/* Role-Based Network Hub, Jobs, Donations, Directory */}
        {["admin", "student", "faculty", "alumni", "recruiter"].map((r) => (
          <React.Fragment key={r}>
            {/* Network Hub */}
            <Route
              path={`${r}/network/*`}
              element={
                <ProtectedRoute
                  allowedRoles={[
                    "admin",
                    "student",
                    "faculty",
                    "alumni",
                    "recruiter",
                  ]}
                >
                  <NetworkRoute />
                </ProtectedRoute>
              }
            >
              <Route index element={<NetworkDashboard />} />
              <Route path="dashboard" element={<NetworkDashboard />} />
              <Route path="chat" element={<NetworkChat />} />
              <Route
                path="mentorship-dashboard"
                element={<MentorshipDashboard />}
              />
              <Route path="community" element={<Community />} />
              <Route
                path="session-management"
                element={<SessionManagement />}
              />
              <Route path="group-chat" element={<GroupChatPage />} />
            </Route>

            {/* Jobs */}
            <Route
              path={`${r}/jobs`}
              element={
                <ProtectedRoute
                  allowedRoles={[
                    "admin",
                    "student",
                    "faculty",
                    "alumni",
                    "recruiter",
                  ]}
                >
                  <JobSearchAndApplicationPortal />
                </ProtectedRoute>
              }
            />

            {/* Donations */}
            <Route
              path={`${r}/donations`}
              element={
                <ProtectedRoute
                  allowedRoles={[
                    "admin",
                    "student",
                    "faculty",
                    "alumni",
                    "recruiter",
                  ]}
                >
                  <Donations />
                </ProtectedRoute>
              }
            />

            {/* Directory */}
            <Route
              path={`${r}/directory`}
              element={
                <ProtectedRoute
                  allowedRoles={[
                    "admin",
                    "student",
                    "faculty",
                    "alumni",
                    "recruiter",
                  ]}
                >
                  <Directory />
                </ProtectedRoute>
              }
            />
          </React.Fragment>
        ))}
      </Route>

      {/* Fallback */}
      <Route
        path="*"
        element={
          <Navigate
            to={isAuthenticated ? getDashboardPath() : "/login"}
            replace
          />
        }
      />
    </Routes>
  );
}
