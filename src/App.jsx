import React, { useEffect } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import AppRoutes from "./routes/AppRoutes";

// Temporary component to auto-login for testing
const TestLogin = ({ role }) => {
  const { login } = useAuth();

  useEffect(() => {
    if (role) {
      login(role); // ✅ use the prop value
    }
  }, [login, role]);

  return <AppRoutes />;
};

const App = () => {
  return (
    <AuthProvider>
      {/* Auto-login as a test role */}
      <TestLogin role="admin" />{" "}
      {/* Change role to test different dashboards */}
    </AuthProvider>
  );
};

export default App;
