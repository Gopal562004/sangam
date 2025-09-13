import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../../components/shared/Header";
import BreadcrumbTrail from "../../../components/ui/BreadcrumbTrail";
import FilterPanel from "./components/FilterPanel";
import SortControls from "./components/SortControls";
import AlumniGrid from "./components/AlumniGrid";

import Button from "../../../components/ui/Button";

const Directory = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isFilterCollapsed, setIsFilterCollapsed] = useState(false);
  const [selectedAlumni, setSelectedAlumni] = useState([]);
  const [viewMode, setViewMode] = useState("grid");

  // Mock user data
  const currentUser = {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.johnson@university.edu",
    role: "student",
    profileImage:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
  };

  // Filter state
  const [filters, setFilters] = useState({
    search: "",
    graduationYear: "",
    department: "",
    industry: "",
    location: "",
    skills: "",
    availableForMentorship: false,
    availableForSpeaking: false,
    availableForRecruiting: false,
  });

  // Sort state
  const [sortBy, setSortBy] = useState("relevance");
  const [sortOrder, setSortOrder] = useState("desc");

  // Mock alumni data
  const mockAlumni = [
    {
      id: 1,
      name: "Michael Rodriguez",
      profileImage:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      graduationYear: 2018,
      currentPosition: "Senior Software Engineer",
      company: "Google",
      department: "Computer Science",
      skills: ["JavaScript", "React", "Node.js", "Python", "Machine Learning"],
      location: "San Francisco, CA",
      industry: "technology",
      availableForMentorship: true,
      availableForSpeaking: true,
      availableForRecruiting: false,
      isConnected: false,
      lastActive: "2025-01-05",
    },
    {
      id: 2,
      name: "Emily Chen",
      profileImage:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      graduationYear: 2020,
      currentPosition: "Product Manager",
      company: "Microsoft",
      department: "Business Administration",
      skills: ["Product Strategy", "Data Analysis", "Agile", "Leadership"],
      location: "Seattle, WA",
      industry: "technology",
      availableForMentorship: true,
      availableForSpeaking: false,
      availableForRecruiting: true,
      isConnected: true,
      lastActive: "2025-01-06",
    },
    {
      id: 3,
      name: "David Thompson",
      profileImage:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      graduationYear: 2015,
      currentPosition: "Investment Banker",
      company: "Goldman Sachs",
      department: "Economics",
      skills: ["Financial Analysis", "Risk Management", "Excel", "Bloomberg"],
      location: "New York, NY",
      industry: "finance",
      availableForMentorship: false,
      availableForSpeaking: true,
      availableForRecruiting: true,
      isConnected: false,
      lastActive: "2025-01-04",
    },
    {
      id: 4,
      name: "Dr. Lisa Park",
      profileImage:
        "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face",
      graduationYear: 2012,
      currentPosition: "Cardiologist",
      company: "Mayo Clinic",
      department: "Medicine",
      skills: ["Cardiology", "Research", "Patient Care", "Medical Education"],
      location: "Rochester, MN",
      industry: "healthcare",
      availableForMentorship: true,
      availableForSpeaking: true,
      availableForRecruiting: false,
      isConnected: false,
      lastActive: "2025-01-03",
    },
    {
      id: 5,
      name: "James Wilson",
      profileImage:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      graduationYear: 2019,
      currentPosition: "Marketing Director",
      company: "Nike",
      department: "Business Administration",
      skills: [
        "Digital Marketing",
        "Brand Strategy",
        "Analytics",
        "Creative Direction",
      ],
      location: "Portland, OR",
      industry: "retail",
      availableForMentorship: true,
      availableForSpeaking: false,
      availableForRecruiting: false,
      isConnected: false,
      lastActive: "2025-01-07",
    },
    {
      id: 6,
      name: "Rachel Green",
      profileImage:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      graduationYear: 2021,
      currentPosition: "UX Designer",
      company: "Airbnb",
      department: "Arts & Humanities",
      skills: ["UI/UX Design", "Figma", "User Research", "Prototyping"],
      location: "San Francisco, CA",
      industry: "technology",
      availableForMentorship: true,
      availableForSpeaking: true,
      availableForRecruiting: false,
      isConnected: true,
      lastActive: "2025-01-06",
    },
    {
      id: 7,
      name: "Robert Kim",
      profileImage:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
      graduationYear: 2017,
      currentPosition: "Data Scientist",
      company: "Netflix",
      department: "Computer Science",
      skills: [
        "Python",
        "Machine Learning",
        "SQL",
        "Statistics",
        "Deep Learning",
      ],
      location: "Los Angeles, CA",
      industry: "media",
      availableForMentorship: false,
      availableForSpeaking: false,
      availableForRecruiting: true,
      isConnected: false,
      lastActive: "2025-01-05",
    },
    {
      id: 8,
      name: "Amanda Foster",
      profileImage:
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face",
      graduationYear: 2016,
      currentPosition: "Environmental Lawyer",
      company: "Environmental Defense Fund",
      department: "Law",
      skills: [
        "Environmental Law",
        "Policy Analysis",
        "Litigation",
        "Sustainability",
      ],
      location: "Washington, DC",
      industry: "nonprofit",
      availableForMentorship: true,
      availableForSpeaking: true,
      availableForRecruiting: false,
      isConnected: false,
      lastActive: "2025-01-02",
    },
  ];

  const [filteredAlumni, setFilteredAlumni] = useState(mockAlumni);

  // Mock notifications
  const notifications = [
    { id: 1, message: "New connection request", read: false },
    { id: 2, message: "Event invitation received", read: false },
  ];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Apply filters and sorting
    let filtered = [...mockAlumni];

    // Apply search filter
    if (filters?.search) {
      const searchTerm = filters?.search?.toLowerCase();
      filtered = filtered?.filter(
        (alumni) =>
          alumni?.name?.toLowerCase()?.includes(searchTerm) ||
          alumni?.skills?.some((skill) =>
            skill?.toLowerCase()?.includes(searchTerm)
          ) ||
          alumni?.currentPosition?.toLowerCase()?.includes(searchTerm) ||
          alumni?.company?.toLowerCase()?.includes(searchTerm)
      );
    }

    // Apply graduation year filter
    if (filters?.graduationYear) {
      if (filters?.graduationYear === "2010-2014") {
        filtered = filtered?.filter(
          (alumni) =>
            alumni?.graduationYear >= 2010 && alumni?.graduationYear <= 2014
        );
      } else if (filters?.graduationYear === "2005-2009") {
        filtered = filtered?.filter(
          (alumni) =>
            alumni?.graduationYear >= 2005 && alumni?.graduationYear <= 2009
        );
      } else if (filters?.graduationYear === "2000-2004") {
        filtered = filtered?.filter(
          (alumni) =>
            alumni?.graduationYear >= 2000 && alumni?.graduationYear <= 2004
        );
      } else if (filters?.graduationYear === "before-2000") {
        filtered = filtered?.filter((alumni) => alumni?.graduationYear < 2000);
      } else {
        filtered = filtered?.filter(
          (alumni) =>
            alumni?.graduationYear?.toString() === filters?.graduationYear
        );
      }
    }

    // Apply department filter
    if (filters?.department) {
      const departmentMap = {
        "computer-science": "Computer Science",
        engineering: "Engineering",
        business: "Business Administration",
        medicine: "Medicine",
        law: "Law",
        arts: "Arts & Humanities",
        sciences: "Natural Sciences",
        education: "Education",
        psychology: "Psychology",
        economics: "Economics",
      };
      filtered = filtered?.filter(
        (alumni) => alumni?.department === departmentMap?.[filters?.department]
      );
    }

    // Apply industry filter
    if (filters?.industry) {
      filtered = filtered?.filter(
        (alumni) => alumni?.industry === filters?.industry
      );
    }

    // Apply location filter
    if (filters?.location) {
      const locationMap = {
        "new-york": "New York, NY",
        "san-francisco": "San Francisco, CA",
        "los-angeles": "Los Angeles, CA",
        chicago: "Chicago, IL",
        boston: "Boston, MA",
        seattle: "Seattle, WA",
        austin: "Austin, TX",
        denver: "Denver, CO",
        atlanta: "Atlanta, GA",
        miami: "Miami, FL",
      };
      if (filters?.location === "international") {
        filtered = filtered?.filter(
          (alumni) => !Object.values(locationMap)?.includes(alumni?.location)
        );
      } else {
        filtered = filtered?.filter(
          (alumni) => alumni?.location === locationMap?.[filters?.location]
        );
      }
    }

    // Apply skills filter
    if (filters?.skills) {
      const skillTerms = filters?.skills
        ?.toLowerCase()
        ?.split(",")
        ?.map((s) => s?.trim());
      filtered = filtered?.filter((alumni) =>
        skillTerms?.some((term) =>
          alumni?.skills?.some((skill) => skill?.toLowerCase()?.includes(term))
        )
      );
    }

    // Apply availability filters
    if (filters?.availableForMentorship) {
      filtered = filtered?.filter((alumni) => alumni?.availableForMentorship);
    }
    if (filters?.availableForSpeaking) {
      filtered = filtered?.filter((alumni) => alumni?.availableForSpeaking);
    }
    if (filters?.availableForRecruiting) {
      filtered = filtered?.filter((alumni) => alumni?.availableForRecruiting);
    }

    // Apply sorting
    filtered?.sort((a, b) => {
      let aValue, bValue;

      switch (sortBy) {
        case "name":
          aValue = a?.name;
          bValue = b?.name;
          break;
        case "graduationYear":
          aValue = a?.graduationYear;
          bValue = b?.graduationYear;
          break;
        case "location":
          aValue = a?.location;
          bValue = b?.location;
          break;
        case "department":
          aValue = a?.department;
          bValue = b?.department;
          break;
        case "lastActive":
          aValue = new Date(a.lastActive);
          bValue = new Date(b.lastActive);
          break;
        default: // relevance
          aValue = a?.id;
          bValue = b?.id;
      }

      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredAlumni(filtered);
  }, [filters, sortBy, sortOrder]);

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      search: "",
      graduationYear: "",
      department: "",
      industry: "",
      location: "",
      skills: "",
      availableForMentorship: false,
      availableForSpeaking: false,
      availableForRecruiting: false,
    });
  };

  const handleSortChange = (newSortBy, newSortOrder) => {
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
  };

  const handleConnect = (alumni) => {
    console.log("Connecting to:", alumni?.name);
    // In a real app, this would make an API call
  };

  const handleMessage = (alumni) => {
    console.log("Messaging:", alumni?.name);
    // In a real app, this would open a message dialog or navigate to messages
  };

  const handleBulkAction = (action) => {
    console.log(`Bulk ${action} for:`, selectedAlumni);
    // In a real app, this would handle bulk operations
  };

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <BreadcrumbTrail user={currentUser} />

        {/* Page Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="mb-4 lg:mb-0">
              <h1 className="text-3xl font-bold text-text-primary mb-2">
                Alumni Directory
              </h1>
              <p className="text-text-secondary max-w-2xl">
                Connect with fellow alumni, find mentors, and expand your
                professional network. Discover alumni by graduation year,
                department, skills, and availability.
              </p>
            </div>

            <div className="flex items-center space-x-3">
              <Button variant="outline" iconName="Download" iconPosition="left">
                Export Directory
              </Button>
              <Button variant="default" iconName="UserPlus" iconPosition="left">
                Invite Alumni
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filter Panel */}
          <div className="lg:col-span-1">
            <FilterPanel
              filters={filters}
              onFiltersChange={handleFiltersChange}
              onClearFilters={handleClearFilters}
              isCollapsed={isFilterCollapsed}
              onToggleCollapse={() => setIsFilterCollapsed(!isFilterCollapsed)}
              totalResults={filteredAlumni?.length}
            />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Sort Controls */}
            <SortControls
              sortBy={sortBy}
              sortOrder={sortOrder}
              onSortChange={handleSortChange}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              selectedCount={selectedAlumni?.length}
              onBulkAction={handleBulkAction}
              totalResults={filteredAlumni?.length}
            />

            {/* Alumni Grid */}
            <AlumniGrid
              alumni={filteredAlumni}
              viewMode={viewMode}
              onConnect={handleConnect}
              onMessage={handleMessage}
              selectedAlumni={selectedAlumni}
              onSelectionChange={setSelectedAlumni}
              loading={loading}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Directory;
