import React, { useState } from 'react';
import Button from '../../../../components/ui/Button';

const PrivacyControls = ({ 
  settings, 
  mentorshipPreferences, 
  isOwner, 
  onUpdatePrivacy, 
  onUpdateMentorship 
}) => {
  const [privacySettings, setPrivacySettings] = useState(settings || {
    profileVisibility: 'public',
    contactInfoVisible: true,
    experienceVisible: true,
    educationVisible: true,
    skillsVisible: true,
    achievementsVisible: true
  });

  const [mentorshipData, setMentorshipData] = useState(mentorshipPreferences || {
    available: false,
    topics: [],
    meetingFrequency: 'Monthly',
    preferredFormat: 'Virtual'
  });

  const [hasChanges, setHasChanges] = useState(false);

  const visibilityOptions = [
    { value: 'public', label: 'Public', description: 'Anyone can view your profile' },
    { value: 'alumni_only', label: 'Alumni Only', description: 'Only alumni can view your profile' },
    { value: 'private', label: 'Private', description: 'Only you can view your profile' }
  ];

  const meetingFrequencies = ['Weekly', 'Bi-weekly', 'Monthly', 'Quarterly', 'As needed'];
  const meetingFormats = ['Virtual', 'In-person', 'Both'];
  
  const mentorshipTopics = [
    'Career Development',
    'Software Engineering',
    'Data Science',
    'Product Management',
    'Entrepreneurship',
    'Leadership',
    'Networking',
    'Job Search',
    'Interview Preparation',
    'Work-Life Balance',
    'Industry Insights',
    'Skill Development'
  ];

  const handlePrivacyChange = (key, value) => {
    const updated = { ...privacySettings, [key]: value };
    setPrivacySettings(updated);
    setHasChanges(true);
  };

  const handleMentorshipChange = (key, value) => {
    const updated = { ...mentorshipData, [key]: value };
    setMentorshipData(updated);
    setHasChanges(true);
  };

  const handleTopicToggle = (topic) => {
    const currentTopics = mentorshipData?.topics || [];
    const updatedTopics = currentTopics?.includes(topic)
      ? currentTopics?.filter(t => t !== topic)
      : [...currentTopics, topic];
    
    handleMentorshipChange('topics', updatedTopics);
  };

  const handleSaveChanges = () => {
    onUpdatePrivacy(privacySettings);
    onUpdateMentorship(mentorshipData);
    setHasChanges(false);
  };

  const handleResetChanges = () => {
    setPrivacySettings(settings);
    setMentorshipData(mentorshipPreferences);
    setHasChanges(false);
  };

  if (!isOwner) {
    return (
      <div className="bg-card rounded-lg elevation-2 p-6">
        <div className="text-center py-8">
          <div className="text-4xl mb-4">🔒</div>
          <p className="text-text-secondary">
            Privacy settings are only visible to the profile owner.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Privacy Settings */}
      <div className="bg-card rounded-lg elevation-2 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-text-primary">Privacy Settings</h2>
          {hasChanges && (
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleResetChanges}
              >
                Reset
              </Button>
              <Button
                size="sm"
                onClick={handleSaveChanges}
              >
                Save Changes
              </Button>
            </div>
          )}
        </div>

        <div className="space-y-6">
          {/* Profile Visibility */}
          <div>
            <h3 className="text-lg font-medium text-text-primary mb-3">Profile Visibility</h3>
            <div className="space-y-2">
              {visibilityOptions?.map((option) => (
                <label key={option?.value} className="flex items-start space-x-3 p-3 border border-border rounded-lg hover:bg-muted/50 cursor-pointer">
                  <input
                    type="radio"
                    name="profileVisibility"
                    value={option?.value}
                    checked={privacySettings?.profileVisibility === option?.value}
                    onChange={(e) => handlePrivacyChange('profileVisibility', e?.target?.value)}
                    className="mt-1 h-4 w-4 text-primary focus:ring-primary border-border"
                  />
                  <div>
                    <p className="font-medium text-text-primary">{option?.label}</p>
                    <p className="text-sm text-text-secondary">{option?.description}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Section Visibility */}
          <div>
            <h3 className="text-lg font-medium text-text-primary mb-3">Section Visibility</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { key: 'contactInfoVisible', label: 'Contact Information' },
                { key: 'experienceVisible', label: 'Work Experience' },
                { key: 'educationVisible', label: 'Education' },
                { key: 'skillsVisible', label: 'Skills & Expertise' },
                { key: 'achievementsVisible', label: 'Achievements' }
              ]?.map((section) => (
                <label key={section?.key} className="flex items-center space-x-3 p-3 border border-border rounded-lg hover:bg-muted/50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={privacySettings?.[section?.key] || false}
                    onChange={(e) => handlePrivacyChange(section?.key, e?.target?.checked)}
                    className="h-4 w-4 text-primary focus:ring-primary border-border rounded"
                  />
                  <span className="font-medium text-text-primary">{section?.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Mentorship Settings */}
      <div className="bg-card rounded-lg elevation-2 p-6">
        <h2 className="text-xl font-semibold text-text-primary mb-6">Mentorship Preferences</h2>

        <div className="space-y-6">
          {/* Mentorship Availability */}
          <div>
            <div className="flex items-center justify-between p-4 border border-border rounded-lg">
              <div>
                <h3 className="font-medium text-text-primary">Available for Mentorship</h3>
                <p className="text-sm text-text-secondary">
                  Allow other users to request mentorship from you
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={mentorshipData?.available || false}
                  onChange={(e) => handleMentorshipChange('available', e?.target?.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          </div>

          {/* Mentorship Details */}
          {mentorshipData?.available && (
            <>
              {/* Topics */}
              <div>
                <h3 className="text-lg font-medium text-text-primary mb-3">Mentorship Topics</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                  {mentorshipTopics?.map((topic) => (
                    <label key={topic} className="flex items-center space-x-2 p-2 hover:bg-muted/50 rounded cursor-pointer">
                      <input
                        type="checkbox"
                        checked={mentorshipData?.topics?.includes(topic) || false}
                        onChange={() => handleTopicToggle(topic)}
                        className="h-4 w-4 text-primary focus:ring-primary border-border rounded"
                      />
                      <span className="text-sm text-text-primary">{topic}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Meeting Preferences */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-text-primary mb-2">Meeting Frequency</h3>
                  <select
                    value={mentorshipData?.meetingFrequency || 'Monthly'}
                    onChange={(e) => handleMentorshipChange('meetingFrequency', e?.target?.value)}
                    className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  >
                    {meetingFrequencies?.map((frequency) => (
                      <option key={frequency} value={frequency}>
                        {frequency}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <h3 className="font-medium text-text-primary mb-2">Preferred Format</h3>
                  <select
                    value={mentorshipData?.preferredFormat || 'Virtual'}
                    onChange={(e) => handleMentorshipChange('preferredFormat', e?.target?.value)}
                    className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  >
                    {meetingFormats?.map((format) => (
                      <option key={format} value={format}>
                        {format}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      {/* Data Management */}
      <div className="bg-card rounded-lg elevation-2 p-6">
        <h2 className="text-xl font-semibold text-text-primary mb-6">Data Management</h2>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-border rounded-lg">
            <div>
              <h3 className="font-medium text-text-primary">Download Your Data</h3>
              <p className="text-sm text-text-secondary">
                Export all your profile information as JSON
              </p>
            </div>
            <Button variant="outline" size="sm">
              Download
            </Button>
          </div>

          <div className="flex items-center justify-between p-4 border border-error rounded-lg bg-error/5">
            <div>
              <h3 className="font-medium text-error">Delete Account</h3>
              <p className="text-sm text-text-secondary">
                Permanently delete your account and all associated data
              </p>
            </div>
            <Button variant="destructive" size="sm">
              Delete
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyControls;