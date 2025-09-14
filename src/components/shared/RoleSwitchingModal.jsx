// RoleSwitchingModal.jsx
import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext"; // adjust path

const roles = ["admin", "alumni", "student", "faculty", "recruiter"];

const RoleSwitchingModal = ({ isOpen, onClose }) => {
  const { login } = useAuth();
  const [selectedRole, setSelectedRole] = useState("");

  const handleRoleChange = (role) => {
    setSelectedRole(role);
  };
  // //also save in this 
  //   useEffect(() => {
  //     if (role) {
  //       login(role); // ✅ use the prop value
  //     }
  //   }, [login, role]);

  const handleConfirm = () => {
    if (selectedRole) {
      login(selectedRole); // update context and localStorage
      window.location.reload(); // simulate role change
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-80 p-6 animate-fade-in">
        <h2 className="text-lg font-semibold mb-4">Switch Role</h2>
        <div className="flex flex-col space-y-3">
          {roles.map((role) => (
            <button
              key={role}
              onClick={() => handleRoleChange(role)}
              className={`px-4 py-2 rounded border ${
                selectedRole === role
                  ? "bg-primary text-white border-primary"
                  : "bg-white text-text-primary border-gray-300 hover:bg-gray-100"
              } transition-colors duration-200`}
            >
              {role.charAt(0).toUpperCase() + role.slice(1)}
            </button>
          ))}
        </div>
        <div className="mt-6 flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 rounded bg-primary text-white hover:bg-primary/90"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoleSwitchingModal;
