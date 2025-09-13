import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../../components/shared/Header";
import BreadcrumbTrail from "../../../components/ui/BreadcrumbTrail";

// Reuse same component names as requested
import ProfileHeader from "./components/ProfileHeader";
import AboutSection from "./components/AboutSection";
import ExperienceSection from "./components/ExperienceSection";
import SkillsSection from "./components/SkillsSection";
import EducationSection from "./components/EducationSection";
import AchievementsSection from "./components/AchievementsSection";
import PrivacyControls from "./components/PrivacyControls";

const StudentProfilePage = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [user] = useState({
    id: 1,
    name: " student",
    email: "admin@platform.com",
    role: "admin",
    avatar:
      "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=300&h=300&fit=crop&crop=face",
    department: "Administration",
    phone: "+1 (555) 987-6543",
    location: "New York, NY",
    joinedDate: "2020-01-01T00:00:00Z",
  });

  const [notifications] = useState([
    { id: 1, message: "New user registered", read: false },
    { id: 2, message: "New event submitted for approval", read: false },
    { id: 3, message: "System maintenance scheduled", read: true },
  ]);

  const [activeTab, setActiveTab] = useState("about");
  const [isEditing, setIsEditing] = useState(false);
  const [isOwner] = useState(true);

  const [profileData, setProfileData] = useState({
    bio: "Admin of the platform overseeing user management, events, system logs, and platform settings.",
    currentPosition: "System Administrator",
    company: "AlumniConnect Platform",
    skills: [
      { name: "System Management", level: "Expert", endorsements: 30 },
      { name: "User Support", level: "Advanced", endorsements: 20 },
      { name: "Security & Privacy", level: "Advanced", endorsements: 25 },
    ],
    experiences: [
      {
        id: 1,
        title: "System Administrator",
        company: "AlumniConnect Platform",
        location: "New York, NY",
        type: "Full-time",
        startDate: "2020-01-01",
        endDate: null,
        current: true,
        description:
          "Managing platform infrastructure, user data, and privacy settings.",
        achievements: [
          "Secured user data",
          "Managed platform scaling",
          "Implemented backup solutions",
        ],
      },
    ],
    education: [
      {
        id: 1,
        institution: "MIT",
        degree: "Bachelor of Science",
        field: "Information Technology",
        startDate: "2015-09-01",
        endDate: "2019-06-01",
        gpa: "3.9",
        honors: ["Dean's List"],
        relevantCoursework: ["Network Security", "Database Administration"],
      },
    ],
    achievements: [
      {
        id: 1,
        title: "Platform Stability Award",
        date: "2022-11-15",
        description:
          "Recognized for maintaining 99.99% uptime for the platform.",
        category: "Award",
      },
    ],
    mentorshipPreferences: {
      available: false,
      topics: [],
      meetingFrequency: "",
      preferredFormat: "",
    },
    privacySettings: {
      profileVisibility: "private",
      contactInfoVisible: true,
    },
  });

  const tabs = [
    { id: "about", label: "About", icon: "User" },
    { id: "experience", label: "Experience", icon: "Briefcase" },
    { id: "skills", label: "Skills", icon: "Award" },
    { id: "education", label: "Education", icon: "GraduationCap" },
    { id: "achievements", label: "Achievements", icon: "Trophy" },
    { id: "privacy", label: "Privacy", icon: "Shield" },
  ];

  const handlePhotoUpload = () => {
    if (!isOwner) return;
    fileInputRef?.current?.click();
  };

  const handleFileChange = (event) => {
    const file = event?.target?.files?.[0];
    if (file) {
      console.log("File selected:", file);
    }
  };

  const handleEditToggle = () => {
    if (!isOwner) return;
    setIsEditing(!isEditing);
  };

  const handleSaveProfile = () => {
    console.log("Saving admin profile:", profileData);
    setIsEditing(false);
  };

  const handleCancelEdit = () => setIsEditing(false);

  const handleUpdateProfileData = (section, data) => {
    setProfileData((prev) => ({
      ...prev,
      [section]: data,
    }));
  };

  const handleLogout = () => navigate("/login");

  const renderTabContent = () => {
    switch (activeTab) {
      case "about":
        return (
          <AboutSection
            data={profileData}
            isEditing={isEditing}
            isOwner={isOwner}
            onUpdate={(data) => handleUpdateProfileData("bio", data?.bio)}
            onUpdatePosition={(data) => {
              handleUpdateProfileData("currentPosition", data?.currentPosition);
              handleUpdateProfileData("company", data?.company);
            }}
          />
        );
      case "experience":
        return (
          <ExperienceSection
            experiences={profileData?.experiences}
            isEditing={isEditing}
            isOwner={isOwner}
            onUpdate={(experiences) =>
              handleUpdateProfileData("experiences", experiences)
            }
          />
        );
      case "skills":
        return (
          <SkillsSection
            skills={profileData?.skills}
            isEditing={isEditing}
            isOwner={isOwner}
            onUpdate={(skills) => handleUpdateProfileData("skills", skills)}
          />
        );
      case "education":
        return (
          <EducationSection
            education={profileData?.education}
            isEditing={isEditing}
            isOwner={isOwner}
            onUpdate={(education) =>
              handleUpdateProfileData("education", education)
            }
          />
        );
      case "achievements":
        return (
          <AchievementsSection
            achievements={profileData?.achievements}
            isEditing={isEditing}
            isOwner={isOwner}
            onUpdate={(achievements) =>
              handleUpdateProfileData("achievements", achievements)
            }
          />
        );
      case "privacy":
        return (
          <PrivacyControls
            settings={profileData?.privacySettings}
            isOwner={isOwner}
            onUpdatePrivacy={(settings) =>
              handleUpdateProfileData("privacySettings", settings)
            }
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <BreadcrumbTrail user={user} />

        <ProfileHeader
          user={user}
          profileData={profileData}
          isOwner={isOwner}
          isEditing={isEditing}
          onPhotoUpload={handlePhotoUpload}
          onEditToggle={handleEditToggle}
          onSave={handleSaveProfile}
          onCancel={handleCancelEdit}
        />

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />

        <div className="mt-8">
          <div className="border-b border-border">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? "border-primary text-primary"
                      : "border-transparent text-text-secondary hover:text-text-primary hover:border-border"
                  }`}
                >
                  <span className="mr-2">
                    {tab.icon === "User" && "👤"}
                    {tab.icon === "Briefcase" && "💼"}
                    {tab.icon === "Award" && "🏆"}
                    {tab.icon === "GraduationCap" && "🎓"}
                    {tab.icon === "Trophy" && "🏅"}
                    {tab.icon === "Shield" && "🛡️"}
                  </span>
                  {tab.label}
                </button>
              ))}
            </nav>

            <div className="mt-8">{renderTabContent()}</div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentProfilePage;
