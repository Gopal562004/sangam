import React, { useState } from 'react';
import Button from '../../../../components/ui/Button';

const AboutSection = ({ data, isEditing, isOwner, onUpdate, onUpdatePosition }) => {
  const [editData, setEditData] = useState({
    bio: data?.bio || '',
    currentPosition: data?.currentPosition || '',
    company: data?.company || ''
  });

  const handleSave = () => {
    onUpdate({ bio: editData?.bio });
    onUpdatePosition({
      currentPosition: editData?.currentPosition,
      company: editData?.company
    });
  };

  const handleCancel = () => {
    setEditData({
      bio: data?.bio || '',
      currentPosition: data?.currentPosition || '',
      company: data?.company || ''
    });
  };

  if (isEditing && isOwner) {
    return (
      <div className="bg-card rounded-lg elevation-2 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-text-primary">About</h2>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={handleCancel}>
              Cancel
            </Button>
            <Button size="sm" onClick={handleSave}>
              Save
            </Button>
          </div>
        </div>
        <div className="space-y-6">
          {/* Current Position */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Current Position
            </label>
            <input
              type="text"
              value={editData?.currentPosition}
              onChange={(e) => setEditData(prev => ({ ...prev, currentPosition: e?.target?.value }))}
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              placeholder="e.g., Software Engineer"
            />
          </div>

          {/* Company */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Company/Organization
            </label>
            <input
              type="text"
              value={editData?.company}
              onChange={(e) => setEditData(prev => ({ ...prev, company: e?.target?.value }))}
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              placeholder="e.g., Google"
            />
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Bio
            </label>
            <textarea
              value={editData?.bio}
              onChange={(e) => setEditData(prev => ({ ...prev, bio: e?.target?.value }))}
              rows={6}
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
              placeholder="Tell us about yourself, your interests, and career goals..."
            />
            <p className="text-xs text-text-secondary mt-1">
              {editData?.bio?.length || 0} / 500 characters
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg elevation-2 p-6">
      <h2 className="text-xl font-semibold text-text-primary mb-6">About</h2>
      
      {data?.bio ? (
        <div className="prose prose-gray max-w-none">
          <p className="text-text-primary leading-relaxed">
            {data?.bio}
          </p>
        </div>
      ) : (
        <div className="text-center py-8">
          <div className="text-4xl mb-4">📝</div>
          <p className="text-text-secondary">
            {isOwner ? 'Add a bio to tell others about yourself' : 'No bio available'}
          </p>
          {isOwner && (
            <Button
              variant="outline"
              size="sm"
              className="mt-4"
              onClick={() => {/* Handle edit mode activation */}}
            >
              Add Bio
            </Button>
          )}
        </div>
      )}

      {/* Professional Interests */}
      {data?.bio && (
        <div className="mt-8 pt-6 border-t border-border">
          <h3 className="text-lg font-medium text-text-primary mb-4">Professional Focus</h3>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
              Software Engineering
            </span>
            <span className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm">
              Machine Learning
            </span>
            <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm">
              Sustainable Technology
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default AboutSection;