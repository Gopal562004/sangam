import React, { useState } from 'react';
import NavigationHeader from '../../../ui/NavigationHeader';
import QuickActionPanel from '../../../ui/QuickActionPanel';
import Icon from '../../../AppIcon';
import Button from '../../../ui/Button';
import DiscussionCard from './components/DiscussionCard';
import ResourceCard from './components/ResourceCard';
import CategoryFilter from './components/CategoryFilter';
import TrendingPanel from './components/TrendingPanel';
import CreateDiscussionModal from './components/CreateDiscussionModal';
import SearchBar from './components/SearchBar';

const Community = () => {
  const [activeTab, setActiveTab] = useState('discussions');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data for discussions
  const discussions = [
    {
      id: 1,
      title:
        "How to transition from software engineering to product management?",
      preview:
        "I've been working as a software engineer for 5 years and I'm interested in moving into product management. What skills should I focus on developing?",
      author: {
        name: "Sarah Chen",
        avatar:
          "https://annemariesegal.com/wp-content/uploads/2017/04/adobestock_86346713-cropped-young-woman-in-suit.jpg?w=840",
        badge: "Senior Engineer",
      },
      category: "Career Development",
      replyCount: 23,
      likes: 45,
      views: 234,
      lastActivity: new Date(Date.now() - 2 * 60 * 60 * 1000),
      isPinned: false,
    },
    {
      id: 2,
      title: "Best practices for remote team leadership in 2024",
      preview:
        "With hybrid work becoming the norm, what are the most effective strategies for leading distributed teams? Looking for practical advice from experienced managers.",
      author: {
        name: "Michael Rodriguez",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
        badge: "Team Lead",
      },
      category: "Leadership",
      replyCount: 18,
      likes: 67,
      views: 456,
      lastActivity: new Date(Date.now() - 4 * 60 * 60 * 1000),
      isPinned: true,
    },
    {
      id: 3,
      title: "AI and Machine Learning career roadmap for beginners",
      preview:
        "Complete guide to starting a career in AI/ML. What programming languages, frameworks, and projects should you focus on in 2024?",
      author: {
        name: "Dr. Emily Watson",
        avatar:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
        badge: "ML Expert",
      },
      category: "Technical Skills",
      replyCount: 34,
      likes: 89,
      views: 678,
      lastActivity: new Date(Date.now() - 6 * 60 * 60 * 1000),
      isPinned: false,
    },
    {
      id: 4,
      title: "Networking strategies that actually work for introverts",
      preview:
        "As an introvert, traditional networking events feel overwhelming. What are some effective alternatives for building professional relationships?",
      author: {
        name: "James Park",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
        badge: "UX Designer",
      },
      category: "Networking",
      replyCount: 15,
      likes: 52,
      views: 289,
      lastActivity: new Date(Date.now() - 8 * 60 * 60 * 1000),
      isPinned: false,
    },
  ];

  // Mock data for featured discussions
  const featuredDiscussions = [
    {
      id: 5,
      title: "Industry Insights: The Future of Work in Tech",
      preview: "Join our monthly discussion about emerging trends, remote work evolution, and the skills that will be most valuable in the next decade.",
      author: {
        name: "Network Mentorship Hub",
        avatar: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=150",
        badge: "Official"
      },
      category: "Industry Insights",
      replyCount: 67,
      likes: 156,
      views: 1234,
      lastActivity: new Date(Date.now() - 1 * 60 * 60 * 1000),
      isPinned: true
    }
  ];

  // Mock data for resources
  const resources = [
    {
      id: 1,
      title: "Complete Guide to Technical Interviews",
      description: "Comprehensive PDF guide covering algorithms, system design, and behavioral questions for software engineering interviews.",
      author: {
        name: "Alex Thompson",
        avatar: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=150"
      },
      type: "pdf",
      fileSize: 2048000,
      downloads: 1247,
      likes: 89,
      rating: 4.8,
      ratingCount: 156,
      uploadDate: "Dec 8, 2024"
    },
    {
      id: 2,
      title: "Leadership Skills Assessment Template",
      description: "Excel template for self-assessment and 360-degree feedback on leadership competencies.",
      author: {
        name: "Maria Garcia",
        avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150"
      },
      type: "xlsx",
      fileSize: 512000,
      downloads: 834,
      likes: 67,
      rating: 4.6,
      ratingCount: 98,
      uploadDate: "Dec 7, 2024"
    },
    {
      id: 3,
      title: "Product Management Framework Presentation",
      description: "Slide deck covering popular PM frameworks including RICE, OKRs, and user story mapping.",
      author: {
        name: "David Kim",
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150"
      },
      type: "pptx",
      fileSize: 1536000,
      downloads: 623,
      likes: 45,
      rating: 4.7,
      ratingCount: 72,
      uploadDate: "Dec 6, 2024"
    },
    {
      id: 4,
      title: "Salary Negotiation Video Course",
      description: "Step-by-step video guide on researching market rates, preparing your case, and negotiating effectively.",
      author: {
        name: "Jennifer Liu",
        avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150"
      },
      type: "video",
      downloads: 456,
      likes: 78,
      rating: 4.9,
      ratingCount: 134,
      uploadDate: "Dec 5, 2024"
    }
  ];

  // Mock data for categories
  const categories = [
    { name: 'Career Development', icon: 'TrendingUp', count: 45 },
    { name: 'Technical Skills', icon: 'Code', count: 32 },
    { name: 'Leadership', icon: 'Users', count: 28 },
    { name: 'Industry Insights', icon: 'Lightbulb', count: 19 },
    { name: 'Networking', icon: 'Globe', count: 15 },
    { name: 'General', icon: 'MessageCircle', count: 67 }
  ];

  // Mock data for trending topics
  const trendingTopics = [
    {
      id: 1,
      title: "Remote work best practices",
      discussionCount: 23,
      engagement: "High"
    },
    {
      id: 2,
      title: "AI impact on careers",
      discussionCount: 18,
      engagement: "Very High"
    },
    {
      id: 3,
      title: "Salary negotiation tips",
      discussionCount: 15,
      engagement: "High"
    },
    {
      id: 4,
      title: "Technical interview prep",
      discussionCount: 12,
      engagement: "Medium"
    },
    {
      id: 5,
      title: "Leadership development",
      discussionCount: 10,
      engagement: "Medium"
    }
  ];

  // Mock data for active contributors
  const activeContributors = [
    {
      id: 1,
      name: "Dr. Emily Watson",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
      badge: "ML Expert",
      contributions: 89,
      helpfulVotes: 234,
    },
    {
      id: 2,
      name: "Michael Rodriguez",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
      badge: "Team Lead",
      contributions: 67,
      helpfulVotes: 189,
    },
    {
      id: 3,
      name: "Sarah Chen",
      avatar:
        "https://annemariesegal.com/wp-content/uploads/2017/04/adobestock_86346713-cropped-young-woman-in-suit.jpg?w=840",
      badge: "Senior Engineer",
      contributions: 54,
      helpfulVotes: 156,
    },
    {
      id: 4,
      name: "Alex Thompson",
      avatar:
        "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=150",
      badge: "Mentor",
      contributions: 43,
      helpfulVotes: 123,
    },
    {
      id: 5,
      name: "Maria Garcia",
      avatar:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150",
      badge: "Product Manager",
      contributions: 38,
      helpfulVotes: 98,
    },
  ];

  const handleSearch = (query) => {
    setSearchQuery(query);
    console.log('Searching for:', query);
  };

  const handleCreateDiscussion = (discussionData) => {
    console.log('Creating discussion:', discussionData);
  };

  const filteredDiscussions = discussions?.filter(discussion => {
    const matchesCategory = selectedCategory === 'All' || discussion?.category === selectedCategory;
    const matchesSearch = !searchQuery || 
      discussion?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
      discussion?.preview?.toLowerCase()?.includes(searchQuery?.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const filteredResources = resources?.filter(resource => {
    const matchesSearch = !searchQuery || 
      resource?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
      resource?.description?.toLowerCase()?.includes(searchQuery?.toLowerCase());
    return matchesSearch;
  });

  const communityActions = [
    {
      id: 'start-discussion',
      label: 'Start Discussion',
      icon: 'MessageSquare',
      variant: 'default',
      onClick: () => setShowCreateModal(true),
    },
    {
      id: 'share-resource',
      label: 'Share Resource',
      icon: 'Upload',
      variant: 'outline',
      onClick: () => console.log('Share resource'),
    },
    {
      id: 'join-group',
      label: 'Join Group',
      icon: 'Users',
      variant: 'outline',
      onClick: () => console.log('Join group'),
    },
    {
      id: 'browse-mentors',
      label: 'Browse Mentors',
      icon: 'Search',
      variant: 'outline',
      onClick: () => console.log('Browse mentors'),
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="pt-16 lg:pt-5">
        <NavigationHeader
          title="Community"
          subtitle="Connect, learn, and grow with fellow professionals"
          actions={[
            {
              label: 'Start Discussion',
              icon: 'Plus',
              variant: 'default',
              onClick: () => setShowCreateModal(true)
            }
          ]}
        />

        <div className="px-4 lg:px-6 py-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Main Content */}
              <div className="lg:col-span-3 space-y-6">
                {/* Search Bar */}
                <SearchBar
                  onSearch={handleSearch}
                  onFilterToggle={() => setShowFilters(!showFilters)}
                  showFilters={showFilters}
                />

                {/* Tab Navigation */}
                <div className="bg-card border border-border rounded-lg">
                  <div className="flex border-b border-border">
                    <button
                      onClick={() => setActiveTab('discussions')}
                      className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium border-b-2 transition-smooth ${
                        activeTab === 'discussions' ?'border-primary text-primary bg-primary/5' :'border-transparent text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      <Icon name="MessageCircle" size={18} />
                      <span>Discussions</span>
                    </button>
                    <button
                      onClick={() => setActiveTab('resources')}
                      className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium border-b-2 transition-smooth ${
                        activeTab === 'resources' ?'border-primary text-primary bg-primary/5' :'border-transparent text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      <Icon name="BookOpen" size={18} />
                      <span>Resources</span>
                    </button>
                  </div>

                  <div className="p-6">
                    {activeTab === 'discussions' && (
                      <div className="space-y-6">
                        {/* Category Filter */}
                        <CategoryFilter
                          categories={categories}
                          selectedCategory={selectedCategory}
                          onCategoryChange={setSelectedCategory}
                        />

                        {/* Featured Discussions */}
                        {selectedCategory === 'All' && (
                          <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-foreground flex items-center space-x-2">
                              <Icon name="Star" size={20} className="text-accent" />
                              <span>Featured Discussions</span>
                            </h3>
                            {featuredDiscussions?.map(discussion => (
                              <DiscussionCard
                                key={discussion?.id}
                                discussion={discussion}
                                featured={true}
                              />
                            ))}
                          </div>
                        )}

                        {/* Regular Discussions */}
                        <div className="space-y-4">
                          {selectedCategory === 'All' && (
                            <h3 className="text-lg font-semibold text-foreground">
                              Recent Discussions
                            </h3>
                          )}
                          {filteredDiscussions?.length > 0 ? (
                            filteredDiscussions?.map(discussion => (
                              <DiscussionCard
                                key={discussion?.id}
                                discussion={discussion}
                              />
                            ))
                          ) : (
                            <div className="text-center py-12">
                              <Icon name="MessageCircle" size={48} className="mx-auto mb-4 text-muted-foreground opacity-50" />
                              <h3 className="text-lg font-medium text-foreground mb-2">No discussions found</h3>
                              <p className="text-muted-foreground mb-4">
                                {searchQuery ? 'Try adjusting your search terms' : 'Be the first to start a discussion in this category'}
                              </p>
                              <Button
                                variant="default"
                                onClick={() => setShowCreateModal(true)}
                                iconName="Plus"
                              >
                                Start Discussion
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {activeTab === 'resources' && (
                      <div className="space-y-4">
                        {filteredResources?.length > 0 ? (
                          filteredResources?.map(resource => (
                            <ResourceCard
                              key={resource?.id}
                              resource={resource}
                            />
                          ))
                        ) : (
                          <div className="text-center py-12">
                            <Icon name="BookOpen" size={48} className="mx-auto mb-4 text-muted-foreground opacity-50" />
                            <h3 className="text-lg font-medium text-foreground mb-2">No resources found</h3>
                            <p className="text-muted-foreground mb-4">
                              {searchQuery ? 'Try adjusting your search terms' : 'No resources available at the moment'}
                            </p>
                            <Button
                              variant="default"
                              onClick={() => console.log('Share resource')}
                              iconName="Upload"
                            >
                              Share Resource
                            </Button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <TrendingPanel
                  trendingTopics={trendingTopics}
                  activeContributors={activeContributors}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Quick Action Panel */}
      <QuickActionPanel
        actions={communityActions}
        position="floating"
        onToggle={() => {}}
      />
      {/* Create Discussion Modal */}
      <CreateDiscussionModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSubmit={handleCreateDiscussion}
      />
      {/* Mobile Bottom Navigation Spacing */}
      <div className="h-20 lg:hidden" />
    </div>
  );
};

export default Community;