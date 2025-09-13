import React, { useState } from 'react';
import { format } from 'date-fns';
import Button from '../../../../components/ui/Button';

const AchievementsSection = ({ achievements, isEditing, isOwner, onUpdate }) => {
  const [editAchievements, setEditAchievements] = useState(achievements || []);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingIndex, setEditingIndex] = useState(-1);

  const [newAchievement, setNewAchievement] = useState({
    title: '',
    date: '',
    description: '',
    category: 'Award'
  });

  const achievementCategories = [
    { value: 'Award', label: 'Award', icon: '🏆' },
    { value: 'Competition', label: 'Competition', icon: '🥇' },
    { value: 'Certification', label: 'Certification', icon: '📜' },
    { value: 'Program', label: 'Program', icon: '🎯' },
    { value: 'Publication', label: 'Publication', icon: '📚' },
    { value: 'Project', label: 'Project', icon: '🚀' },
    { value: 'Recognition', label: 'Recognition', icon: '⭐' },
    { value: 'Other', label: 'Other', icon: '💫' }
  ];

  const getCategoryIcon = (category) => {
    const cat = achievementCategories?.find(c => c?.value === category);
    return cat?.icon || '💫';
  };

  const handleAddAchievement = () => {
    const achievementToAdd = {
      ...newAchievement,
      id: Date.now()
    };
    
    const updated = [...editAchievements, achievementToAdd];
    setEditAchievements(updated);
    onUpdate(updated);
    setNewAchievement({
      title: '',
      date: '',
      description: '',
      category: 'Award'
    });
    setShowAddForm(false);
  };

  const handleUpdateAchievement = (index, updatedAchievement) => {
    const updated = [...editAchievements];
    updated[index] = updatedAchievement;
    setEditAchievements(updated);
    onUpdate(updated);
    setEditingIndex(-1);
  };

  const handleDeleteAchievement = (index) => {
    const updated = editAchievements?.filter((_, i) => i !== index);
    setEditAchievements(updated);
    onUpdate(updated);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return format(new Date(dateString), 'MMM yyyy');
  };

  const AchievementForm = ({ achievement, onSave, onCancel, isNew = false }) => {
    const [formData, setFormData] = useState(achievement);

    return (
      <div className="bg-muted rounded-lg p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-text-primary mb-1">
              Achievement Title
            </label>
            <input
              type="text"
              value={formData?.title || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e?.target?.value }))}
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              placeholder="e.g., First Place - University Hackathon 2024"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">
              Category
            </label>
            <select
              value={formData?.category || 'Award'}
              onChange={(e) => setFormData(prev => ({ ...prev, category: e?.target?.value }))}
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            >
              {achievementCategories?.map(category => (
                <option key={category?.value} value={category?.value}>
                  {category?.icon} {category?.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">
              Date
            </label>
            <input
              type="date"
              value={formData?.date || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, date: e?.target?.value }))}
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-text-primary mb-1">
              Description
            </label>
            <textarea
              value={formData?.description || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e?.target?.value }))}
              rows={3}
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
              placeholder="Describe your achievement, what it involved, and why it's significant..."
            />
          </div>
        </div>
        <div className="flex justify-end space-x-2 pt-4">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={() => onSave(formData)}>
            {isNew ? 'Add Achievement' : 'Save Changes'}
          </Button>
        </div>
      </div>
    );
  };

  if (isEditing && isOwner) {
    return (
      <div className="bg-card rounded-lg elevation-2 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-text-primary">Achievements & Awards</h2>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowAddForm(true)}
            iconName="Plus"
            iconPosition="left"
          >
            Add Achievement
          </Button>
        </div>

        <div className="space-y-6">
          {showAddForm && (
            <AchievementForm
              achievement={newAchievement}
              onSave={handleAddAchievement}
              onCancel={() => setShowAddForm(false)}
              isNew
            />
          )}

          {editAchievements?.map((achievement, index) => (
            <div key={achievement?.id} className="border border-border rounded-lg p-4">
              {editingIndex === index ? (
                <AchievementForm
                  achievement={achievement}
                  onSave={(data) => handleUpdateAchievement(index, data)}
                  onCancel={() => setEditingIndex(-1)}
                />
              ) : (
                <div>
                  <div className="flex items-start justify-between">
                    <div className="flex gap-3 flex-1">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <span className="text-lg">
                            {getCategoryIcon(achievement?.category)}
                          </span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-text-primary">
                          {achievement?.title}
                        </h3>
                        <p className="text-sm text-text-secondary">
                          {achievement?.category} • {formatDate(achievement?.date)}
                        </p>
                        {achievement?.description && (
                          <p className="text-text-primary mt-2 text-sm leading-relaxed">
                            {achievement?.description}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="xs"
                        onClick={() => setEditingIndex(index)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="xs"
                        onClick={() => handleDeleteAchievement(index)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg elevation-2 p-6">
      <h2 className="text-xl font-semibold text-text-primary mb-6">Achievements & Awards</h2>
      
      {achievements?.length > 0 ? (
        <div className="space-y-6">
          {achievements?.map((achievement) => (
            <div key={achievement?.id} className="flex gap-4 p-4 hover:bg-muted/50 rounded-lg transition-colors">
              {/* Achievement Icon */}
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">
                    {getCategoryIcon(achievement?.category)}
                  </span>
                </div>
              </div>

              {/* Achievement Details */}
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium text-text-primary">
                      {achievement?.title}
                    </h3>
                    <p className="text-sm text-text-secondary">
                      {achievement?.category} • {formatDate(achievement?.date)}
                    </p>
                  </div>
                </div>

                {achievement?.description && (
                  <p className="text-text-primary mt-2 text-sm leading-relaxed">
                    {achievement?.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <div className="text-4xl mb-4">🏆</div>
          <p className="text-text-secondary">
            {isOwner ? 'Add your achievements and awards to showcase your accomplishments' : 'No achievements information available'}
          </p>
          {isOwner && (
            <Button
              variant="outline"
              size="sm"
              className="mt-4"
              onClick={() => {/* Handle edit mode activation */}}
            >
              Add Achievement
            </Button>
          )}
        </div>
      )}

      {/* Achievement Categories Summary */}
      {achievements?.length > 0 && (
        <div className="mt-8 pt-6 border-t border-border">
          <h3 className="text-lg font-medium text-text-primary mb-4">Achievement Categories</h3>
          <div className="flex flex-wrap gap-3">
            {achievementCategories?.map(category => {
              const count = achievements?.filter(achievement => achievement?.category === category?.value)?.length || 0;
              if (count === 0) return null;
              
              return (
                <div key={category?.value} className="flex items-center gap-2 px-3 py-2 bg-muted rounded-lg">
                  <span className="text-lg">{category?.icon}</span>
                  <span className="text-sm font-medium text-text-primary">{category?.label}</span>
                  <span className="text-xs bg-primary text-primary-foreground rounded-full px-2 py-1">
                    {count}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default AchievementsSection;