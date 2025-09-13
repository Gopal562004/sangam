import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BreadcrumbTrail from '../../../components/ui/BreadcrumbTrail';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import CampaignCard from './components/CampaignCard';
import DonationTabs from './components/DonationTabs';
import DonorRecognition from './components/DonorRecognition';
import QuickDonation from './components/QuickDonation';
import CampaignProgress from './components/CampaignProgress';
import DonationStats from './components/DonationStats';
import CreateCampaignModal from "./components/CreateCampaignModal";

const Donation = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [activeTab, setActiveTab] = useState('active');
  const [isCreateCampaignModalOpen, setIsCreateCampaignModalOpen] =
    useState(false);

  // Mock user data
  useEffect(() => {
    const mockUser = {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.j@email.com",
      role: "alumni",
      avatar: "https://randomuser.me/api/portraits/women/32.jpg"
    };
    setUser(mockUser);
  }, []);

  // Mock campaign data
  const campaignsData = [
    {
      id: 1,
      title: "Annual Scholarship Fund",
      description: "Supporting deserving students with educational scholarships to achieve their academic dreams.",
      targetAmount: 100000,
      raisedAmount: 67500,
      donorCount: 152,
      daysRemaining: 25,
      category: "Education",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=300&h=200&fit=crop",
      featured: true,
      status: "active"
    },
    {
      id: 2,
      title: "New Library Construction",
      description: "Building a state-of-the-art library facility to enhance learning resources for students.",
      targetAmount: 500000,
      raisedAmount: 325000,
      donorCount: 89,
      daysRemaining: 45,
      category: "Infrastructure",
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=200&fit=crop",
      featured: true,
      status: "active"
    },
    {
      id: 3,
      title: "Emergency Student Relief",
      description: "Providing immediate financial assistance to students facing unexpected hardships.",
      targetAmount: 50000,
      raisedAmount: 48200,
      donorCount: 203,
      daysRemaining: 12,
      category: "Emergency",
      image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=300&h=200&fit=crop",
      featured: false,
      status: "active"
    },
    {
      id: 4,
      title: "Alumni Mentorship Program",
      description: "Expanding our mentorship program to connect more students with successful alumni.",
      targetAmount: 25000,
      raisedAmount: 18750,
      donorCount: 67,
      daysRemaining: 30,
      category: "Programs",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=300&h=200&fit=crop",
      featured: false,
      status: "active"
    }
  ];

  // Mock donation stats
  const donationStatsData = {
    totalRaised: "$892,450",
    totalDonors: 1247,
    activeCampaigns: 8,
    completedCampaigns: 24,
    averageDonation: "$156",
    topCategory: "Education"
  };

  // Mock donor recognition data
  const topDonorsData = [
    {
      id: 1,
      name: "John & Maria Thompson",
      amount: "$15,000",
      image: "https://randomuser.me/api/portraits/men/45.jpg",
      level: "Platinum"
    },
    {
      id: 2,
      name: "David Chen",
      amount: "$8,500",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      level: "Gold"
    },
    {
      id: 3,
      name: "Lisa Rodriguez",
      amount: "$5,200",
      image: "https://randomuser.me/api/portraits/women/28.jpg",
      level: "Silver"
    },
    {
      id: 4,
      name: "Michael Park",
      amount: "$3,750",
      image: "https://randomuser.me/api/portraits/men/52.jpg",
      level: "Silver"
    }
  ];

  // Mock donation history data
  const donationHistoryData = [
    {
      id: 1,
      campaign: "Annual Scholarship Fund",
      amount: "$500",
      date: "2024-08-15",
      status: "completed",
      receipt: "RC-2024-001"
    },
    {
      id: 2,
      campaign: "Emergency Student Relief",
      amount: "$250",
      date: "2024-07-20",
      status: "completed",
      receipt: "RC-2024-002"
    },
    {
      id: 3,
      campaign: "New Library Construction",
      amount: "$1,000",
      date: "2024-06-10",
      status: "completed",
      receipt: "RC-2024-003"
    }
  ];

  // Helper functions for campaign data
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const calculateProgress = (raised, target) => {
    return Math.round((raised / target) * 100);
  };

  // Filter campaigns based on active tab
  const filteredCampaigns = campaignsData?.filter(campaign => {
    switch (activeTab) {
      case 'featured':
        return campaign?.featured;
      case 'education':
        return campaign?.category === 'Education';
      case 'infrastructure':
        return campaign?.category === 'Infrastructure';
      default:
        return campaign?.status === 'active';
    }
  });

  // Event handlers
  const handleDonate = (campaignId, amount) => {
    setSelectedCampaign(campaignId);
    console.log(`Donating $${amount} to campaign ${campaignId}`);
    // Here you would typically integrate with payment processing
  };

  const handleQuickDonation = (amount, type) => {
    console.log(`Quick donation: $${amount} for ${type}`);
    // Handle quick donation logic
  };

const handleCreateCampaign = () => {
  setIsCreateCampaignModalOpen(true);
};


  const handleViewCampaign = (campaignId) => {
    console.log(`View campaign ${campaignId}`);
    // Navigate to detailed campaign view
  };

  const handleExportReceipts = () => {
    console.log('Export tax receipts');
    // Handle receipt export
  };

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <BreadcrumbTrail user={user} currentPage="Donation" />
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-text-primary">
                Donation Center
              </h1>
              <p className="mt-2 text-text-secondary">
                Support your alma mater through impactful giving and fundraising
                campaigns
              </p>
            </div>
            <div className="mt-4 sm:mt-0 flex space-x-3">
              <Button
                variant="outline"
                iconName="Download"
                onClick={handleExportReceipts}
              >
                Tax Receipts
              </Button>
              <Button
                variant="default"
                iconName="Plus"
                onClick={handleCreateCampaign}
              >
                Create Campaign
              </Button>

              <CreateCampaignModal
                isOpen={isCreateCampaignModalOpen}
                onClose={() => setIsCreateCampaignModalOpen(false)}
                onSubmit={(formData) => {
                  console.log("Submitted Campaign:", formData);
                  setIsCreateCampaignModalOpen(false);
                  // Save campaign logic here
                }}
              />
            </div>
          </div>
        </div>

        {/* Donation Stats */}
        <div className="mb-8">
          <DonationStats stats={donationStatsData} />
        </div>

        {/* Quick Donation Section */}
        <div className="mb-8">
          <QuickDonation onQuickDonate={handleQuickDonation} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Campaign Filters */}
            <div className="bg-card rounded-lg p-6 border border-border">
              <div className="flex flex-wrap gap-2 mb-6">
                <Button
                  variant={activeTab === "active" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveTab("active")}
                >
                  Active Campaigns
                </Button>
                <Button
                  variant={activeTab === "featured" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveTab("featured")}
                >
                  Featured
                </Button>
                <Button
                  variant={activeTab === "education" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveTab("education")}
                >
                  Education
                </Button>
                <Button
                  variant={
                    activeTab === "infrastructure" ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => setActiveTab("infrastructure")}
                >
                  Infrastructure
                </Button>
              </div>

              {/* Campaign Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredCampaigns?.map((campaign) => (
                  <CampaignCard
                    key={campaign?.id}
                    campaign={campaign}
                    onDonate={handleDonate}
                    onViewDetails={handleViewCampaign}
                    formatCurrency={formatCurrency}
                    calculateProgress={calculateProgress}
                  />
                ))}
              </div>

              {filteredCampaigns?.length === 0 && (
                <div className="text-center py-12">
                  <Icon
                    name="Search"
                    size={48}
                    className="mx-auto text-text-secondary mb-4"
                  />
                  <h3 className="text-lg font-semibold text-text-primary mb-2">
                    No campaigns found
                  </h3>
                  <p className="text-text-secondary">
                    Try adjusting your filters or check back later for new
                    campaigns.
                  </p>
                </div>
              )}
            </div>

            {/* Campaign Progress Overview */}
            <CampaignProgress campaigns={campaignsData} />

            {/* Donation Management Tabs */}
            <DonationTabs
              donationHistory={donationHistoryData}
              onExportReceipts={handleExportReceipts}
            />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Donor Recognition */}
            <DonorRecognition donors={topDonorsData} />

            {/* Impact Story Card */}
            <div className="bg-card rounded-lg p-6 border border-border">
              <h3 className="text-lg font-semibold text-text-primary mb-4">
                Impact Story
              </h3>
              <div className="space-y-4">
                <img
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=300&h=150&fit=crop"
                  alt="Student success story"
                  className="w-full h-32 object-cover rounded-lg"
                />
                <div>
                  <h4 className="font-medium text-text-primary mb-2">
                    Maria's Scholarship Success
                  </h4>
                  <p className="text-sm text-text-secondary mb-3">
                    "Thanks to the Annual Scholarship Fund, I was able to
                    complete my Computer Science degree. Now I'm working at a
                    leading tech company and giving back to future students."
                  </p>
                  <Button variant="outline" size="sm" iconName="ArrowRight">
                    Read More Stories
                  </Button>
                </div>
              </div>
            </div>

            {/* Matching Gift Program */}
            <div className="bg-card rounded-lg p-6 border border-border">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center">
                  <Icon name="Gift" size={16} className="text-success" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-text-primary mb-2">
                    Matching Gifts
                  </h3>
                  <p className="text-sm text-text-secondary mb-4">
                    Double your impact! Many employers match charitable
                    contributions. Check if your company participates.
                  </p>
                  <Button variant="outline" size="sm" iconName="ExternalLink">
                    Check Eligibility
                  </Button>
                </div>
              </div>
            </div>

            {/* Memorial Donations */}
            <div className="bg-card rounded-lg p-6 border border-border">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Icon name="Heart" size={16} className="text-accent" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-text-primary mb-2">
                    Memorial & Tribute Gifts
                  </h3>
                  <p className="text-sm text-text-secondary mb-4">
                    Honor a loved one or celebrate a special occasion with a
                    meaningful donation.
                  </p>
                  <Button variant="outline" size="sm" iconName="Plus">
                    Make Tribute Gift
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Donation;