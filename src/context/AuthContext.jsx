import React, { createContext, useState, useEffect, useContext } from "react";

// Create context
const AuthContext = createContext();

// Predefined mock users for testing all roles
const MOCK_USERS = {
  admin: {
    id: 1,
    name: "Admin User",
    email: "admin@university.edu",
    role: "admin",
    avatar: "https://randomuser.me/api/portraits/women/45.jpg",
  },
  student: {
    id: 2,
    name: "Student User",
    email: "student@university.edu",
    role: "student",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  faculty: {
    id: 3,
    name: "Faculty User",
    email: "faculty@university.edu",
    role: "faculty",
    avatar: "https://randomuser.me/api/portraits/men/65.jpg",
  },
  alumni: {
    id: 4,
    name: "Alumni User",
    email: "alumni@university.edu",
    role: "alumni",
    avatar: "https://randomuser.me/api/portraits/women/12.jpg",
  },
  recruiter: {
    id: 5,
    name: "Recruiter User",
    email: "recruiter@company.com",
    role: "recruiter",
    avatar: "https://randomuser.me/api/portraits/men/78.jpg",
  },
};

// Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // { id, name, email, role, avatar }
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Login function (accepts role name for testing)
  const login = (role) => {
    const userData = MOCK_USERS[role];
    if (userData) {
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
    } else {
      console.warn(`Role "${role}" not found!`);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  // Check if user is authenticated
  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        login,
        logout,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for easy access
export const useAuth = () => useContext(AuthContext);
