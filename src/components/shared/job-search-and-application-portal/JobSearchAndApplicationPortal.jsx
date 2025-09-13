import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import FilterSidebar from './components/FilterSidebar';
import JobCard from './components/JobCard';
import JobDetailsModal from './components/JobDetailsModal';
import ApplicationModal from './components/ApplicationModal';
import JobAlerts from './components/JobAlerts';
import Icon from '../../AppIcon';
import Button from '../../ui/Button';
import BreadcrumbTrail from '../../ui/BreadcrumbTrail';

const JobSearchAndApplicationPortal = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [filters, setFilters] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [selectedJob, setSelectedJob] = useState(null);
  const [showJobDetails, setShowJobDetails] = useState(false);
  const [showApplication, setShowApplication] = useState(false);
  const [showJobAlerts, setShowJobAlerts] = useState(false);
  const [savedJobs, setSavedJobs] = useState(new Set());
  const [isLoading, setIsLoading] = useState(false);
  const [sortBy, setSortBy] = useState('relevance');
  const [viewType, setViewType] = useState('grid');

  // Mock current user
  const currentUser = {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.johnson@university.edu",
    role: "student",
    profileImage:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
  };
  // Mock job data
  const mockJobs = [
    {
      id: 1,
      title: 'Senior Frontend Developer',
      company: {
        name: 'TechCorp Inc',
        logo: null,
        description: 'Leading technology company specializing in web development and digital solutions.',
        size: '500-1000',
        founded: '2015',
        industry: 'Technology',
        rating: '4.5'
      },
      location: 'San Francisco, CA',
      employmentType: 'Full-time',
      remote: true,
      urgent: false,
      salary: { min: 120000, max: 160000 },
      postedDate: '2025-09-10T00:00:00Z',
      description: 'We are looking for a talented Senior Frontend Developer to join our dynamic team. You will be responsible for developing user-facing web applications using modern JavaScript frameworks.',
      keyRequirements: ['React.js', 'TypeScript', 'CSS3', 'Git', 'REST APIs'],
      requirements: [
        '5+ years of frontend development experience',
        'Expert knowledge of React.js and TypeScript',
        'Strong understanding of modern CSS and responsive design',
        'Experience with version control systems (Git)',
        'Familiarity with REST API integration'
      ],
      benefits: [
        'Competitive salary and equity package',
        'Comprehensive health insurance',
        'Flexible working hours',
        'Professional development budget',
        'Remote work options'
      ],
      matchScore: 92
    },
    {
      id: 2,
      title: 'Product Manager',
      company: {
        name: 'StartupXYZ',
        logo: null,
        description: 'Fast-growing startup focused on innovative consumer products.',
        size: '50-200',
        founded: '2020',
        industry: 'Consumer Products',
        rating: '4.2'
      },
      location: 'Remote',
      employmentType: 'Full-time',
      remote: true,
      urgent: true,
      salary: { min: 90000, max: 130000 },
      postedDate: '2025-09-11T00:00:00Z',
      description: 'Join our product team to drive strategy and execution for our core product offerings. You will work closely with engineering, design, and marketing teams.',
      keyRequirements: ['Product Strategy', 'Agile', 'Data Analysis', 'User Research', 'Roadmapping'],
      requirements: [
        '3+ years of product management experience',
        'Strong analytical and problem-solving skills',
        'Experience with agile development methodologies',
        'Excellent communication and leadership skills',
        'Background in user research and data analysis'
      ],
      benefits: [
        'Competitive salary',
        'Stock options',
        'Health and dental insurance',
        'Unlimited PTO',
        'Learning stipend'
      ],
      matchScore: 85
    },
    {
      id: 3,
      title: 'UI/UX Designer',
      company: {
        name: 'DesignStudio Pro',
        logo: null,
        description: 'Creative design studio working with Fortune 500 companies.',
        size: '100-300',
        founded: '2012',
        industry: 'Design Services',
        rating: '4.7'
      },
      location: 'New York, NY',
      employmentType: 'Contract',
      remote: false,
      urgent: false,
      salary: { min: 80000, max: 110000 },
      postedDate: '2025-09-09T00:00:00Z',
      description: 'We are seeking a creative UI/UX Designer to create intuitive and visually appealing user experiences for our client projects.',
      keyRequirements: ['Figma', 'Adobe Creative Suite', 'Prototyping', 'User Research', 'Design Systems'],
      requirements: [
        '4+ years of UI/UX design experience',
        'Proficiency in Figma and Adobe Creative Suite',
        'Strong portfolio demonstrating user-centered design',
        'Experience with design systems and component libraries',
        'Knowledge of front-end development principles'
      ],
      benefits: [
        'Competitive hourly rate',
        'Flexible schedule',
        'Creative freedom',
        'Professional development opportunities',
        'Potential for full-time conversion'
      ],
      matchScore: 78
    },
    {
      id: 4,
      title: 'Data Analyst',
      company: {
        name: 'DataCorp Analytics',
        logo: null,
        description: 'Data analytics company helping businesses make data-driven decisions.',
        size: '200-500',
        founded: '2018',
        industry: 'Data & Analytics',
        rating: '4.3'
      },
      location: 'Austin, TX',
      employmentType: 'Full-time',
      remote: false,
      urgent: false,
      salary: { min: 65000, max: 85000 },
      postedDate: '2025-09-08T00:00:00Z',
      description: 'Join our analytics team to help clients transform their data into actionable insights. You will work with large datasets and create meaningful visualizations.',
      keyRequirements: ['SQL', 'Python', 'Tableau', 'Statistics', 'Excel'],
      requirements: [
        '2+ years of data analysis experience',
        'Strong SQL and Python skills',
        'Experience with data visualization tools (Tableau, Power BI)',
        'Statistical analysis and modeling knowledge',
        'Excellent problem-solving skills'
      ],
      benefits: [
        'Competitive salary',
        'Health insurance',
        '401k matching',
        'Professional development',
        'Work-life balance'
      ],
      matchScore: 88
    }
  ];

  const savedSearches = [
    { query: 'Frontend Developer', location: 'San Francisco', count: 25 },
    { query: 'React Developer', location: 'Remote', count: 42 },
    { query: 'Senior Engineer', location: 'New York', count: 18 }
  ];

  useEffect(() => {
    // Simulate loading jobs
    setIsLoading(true);
    setTimeout(() => {
      setJobs(mockJobs);
      setFilteredJobs(mockJobs);
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    // Apply filters and search
    let filtered = jobs?.filter(job => {
      // Search query filter
      const matchesSearch = !searchQuery || 
        job?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        job?.company?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        job?.keyRequirements?.some(req => req?.toLowerCase()?.includes(searchQuery?.toLowerCase()));

      // Location filter
      const matchesLocation = !searchLocation || 
        job?.location?.toLowerCase()?.includes(searchLocation?.toLowerCase());

      // Job type filter
      const matchesJobType = !filters?.jobType?.length || 
        filters?.jobType?.includes(job?.employmentType?.toLowerCase()?.replace('-', '-'));

      // Experience filter
      const matchesExperience = !filters?.experience?.length || 
        filters?.experience?.some(exp => {
          // This would need more sophisticated matching in a real app
          return true;
        });

      // Salary filter
      const matchesSalary = (!filters?.salary?.min || job?.salary?.max >= parseInt(filters?.salary?.min)) &&
        (!filters?.salary?.max || job?.salary?.min <= parseInt(filters?.salary?.max));

      // Date posted filter
      const matchesPosted = !filters?.posted?.length || filters?.posted?.includes('anytime');

      return matchesSearch && matchesLocation && matchesJobType && matchesExperience && matchesSalary && matchesPosted;
    });

    // Apply sorting
    switch (sortBy) {
      case 'date':
        filtered = filtered?.sort((a, b) => new Date(b?.postedDate) - new Date(a?.postedDate));
        break;
      case 'salary':
        filtered = filtered?.sort((a, b) => (b?.salary?.max || 0) - (a?.salary?.max || 0));
        break;
      case 'match':
        filtered = filtered?.sort((a, b) => (b?.matchScore || 0) - (a?.matchScore || 0));
        break;
      default: // relevance
        break;
    }

    setFilteredJobs(filtered);
  }, [jobs, filters, searchQuery, searchLocation, sortBy]);

  const handleSearch = (query, location) => {
    setSearchQuery(query);
    setSearchLocation(location);
  };

  const handleLocationChange = (location) => {
    setSearchLocation(location);
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleSaveJob = (jobId, save) => {
    const newSavedJobs = new Set(savedJobs);
    if (save) {
      newSavedJobs?.add(jobId);
    } else {
      newSavedJobs?.delete(jobId);
    }
    setSavedJobs(newSavedJobs);
  };

  const handleViewDetails = (job) => {
    setSelectedJob(job);
    setShowJobDetails(true);
  };

  const handleApply = (job) => {
    setSelectedJob(job);
    setShowApplication(true);
    setShowJobDetails(false);
  };

  const handleApplicationSubmit = (applicationData) => {
    console.log('Application submitted:', applicationData);
    // Handle application submission
  };

  const handleJobAlertSave = (alertData) => {
    console.log('Job alert saved:', alertData);
    // Handle job alert creation
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="pt-16">
        <BreadcrumbTrail user={currentUser} />
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Search Section */}
          <div className="mb-8">
            <SearchBar
              onSearch={handleSearch}
              onLocationChange={handleLocationChange}
              savedSearches={savedSearches}
            />
          </div>

          {/* Main Content */}
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Filter Sidebar */}
            <div className="lg:w-80 flex-shrink-0">
              <FilterSidebar
                filters={filters}
                onFiltersChange={handleFiltersChange}
              />
            </div>

            {/* Job Listings */}
            <div className="flex-1">
              {/* Results Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-foreground">
                    {isLoading
                      ? "Searching..."
                      : `${filteredJobs?.length} Jobs Found`}
                  </h2>
                  {searchQuery && (
                    <p className="text-sm text-muted-foreground mt-1">
                      Results for "{searchQuery}"{" "}
                      {searchLocation && `in ${searchLocation}`}
                    </p>
                  )}
                </div>

                <div className="flex items-center space-x-4 mt-4 sm:mt-0">
                  {/* View Type Toggle */}
                  <div className="flex items-center bg-muted rounded-md p-1">
                    <button
                      onClick={() => setViewType("grid")}
                      className={`p-2 rounded ${
                        viewType === "grid"
                          ? "bg-background shadow-sm"
                          : "hover:bg-background/50"
                      }`}
                    >
                      <Icon
                        name="Grid3X3"
                        size={16}
                        className="text-foreground"
                      />
                    </button>
                    <button
                      onClick={() => setViewType("list")}
                      className={`p-2 rounded ${
                        viewType === "list"
                          ? "bg-background shadow-sm"
                          : "hover:bg-background/50"
                      }`}
                    >
                      <Icon name="List" size={16} className="text-foreground" />
                    </button>
                  </div>

                  {/* Sort Dropdown */}
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e?.target?.value)}
                    className="px-3 py-2 border border-border rounded-md text-sm text-foreground bg-background"
                  >
                    <option value="relevance">Most Relevant</option>
                    <option value="date">Newest First</option>
                    <option value="salary">Highest Salary</option>
                    <option value="match">Best Match</option>
                  </select>

                  {/* Job Alerts Button */}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowJobAlerts(true)}
                    iconName="Bell"
                    iconPosition="left"
                  >
                    Create Alert
                  </Button>
                </div>
              </div>

              {/* Job Cards */}
              {isLoading ? (
                <div className="space-y-4">
                  {[1, 2, 3, 4]?.map((i) => (
                    <div
                      key={i}
                      className="bg-card border border-border rounded-lg p-6"
                    >
                      <div className="animate-pulse space-y-4">
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 bg-muted rounded-lg"></div>
                          <div className="flex-1 space-y-2">
                            <div className="h-4 bg-muted rounded w-2/3"></div>
                            <div className="h-3 bg-muted rounded w-1/2"></div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="h-3 bg-muted rounded w-full"></div>
                          <div className="h-3 bg-muted rounded w-3/4"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : filteredJobs?.length > 0 ? (
                <div
                  className={viewType === "grid" ? "space-y-4" : "space-y-3"}
                >
                  {filteredJobs?.map((job) => (
                    <JobCard
                      key={job?.id}
                      job={job}
                      onSave={handleSaveJob}
                      onApply={handleApply}
                      onViewDetails={handleViewDetails}
                      isSaved={savedJobs?.has(job?.id)}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Icon
                    name="Search"
                    size={48}
                    className="text-muted-foreground mx-auto mb-4"
                  />
                  <h3 className="text-lg font-medium text-foreground mb-2">
                    No jobs found
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your search criteria or filters
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setFilters({});
                      setSearchQuery("");
                      setSearchLocation("");
                    }}
                  >
                    Clear All Filters
                  </Button>
                </div>
              )}

              {/* Load More */}
              {filteredJobs?.length > 0 && (
                <div className="text-center mt-8">
                  <Button variant="outline" size="lg">
                    Load More Jobs
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      {/* Modals */}
      <JobDetailsModal
        job={selectedJob}
        isOpen={showJobDetails}
        onClose={() => setShowJobDetails(false)}
        onApply={handleApply}
        onSave={handleSaveJob}
        isSaved={selectedJob && savedJobs?.has(selectedJob?.id)}
      />
      <ApplicationModal
        job={selectedJob}
        isOpen={showApplication}
        onClose={() => setShowApplication(false)}
        onSubmit={handleApplicationSubmit}
      />
      <JobAlerts
        isOpen={showJobAlerts}
        onClose={() => setShowJobAlerts(false)}
        onSave={handleJobAlertSave}
      />
    </div>
  );
};

export default JobSearchAndApplicationPortal;