import React, { useState } from 'react';
import Button from '../../../../components/ui/Button';

const SkillsSection = ({ skills, isEditing, isOwner, onUpdate, onEndorse }) => {
  const [editSkills, setEditSkills] = useState(skills || []);
  const [newSkill, setNewSkill] = useState({ name: '', level: 'Beginner' });
  const [showAddForm, setShowAddForm] = useState(false);

  const skillLevels = [
    { value: 'Beginner', label: 'Beginner', color: 'bg-gray-200' },
    { value: 'Intermediate', label: 'Intermediate', color: 'bg-warning' },
    { value: 'Advanced', label: 'Advanced', color: 'bg-success' },
    { value: 'Expert', label: 'Expert', color: 'bg-primary' }
  ];

  const getSkillLevelColor = (level) => {
    const skillLevel = skillLevels?.find(sl => sl?.value === level);
    return skillLevel?.color || 'bg-gray-200';
  };

  const handleAddSkill = () => {
    if (!newSkill?.name?.trim()) return;
    
    const skillToAdd = {
      ...newSkill,
      id: Date.now(),
      endorsements: 0
    };
    
    const updated = [...editSkills, skillToAdd];
    setEditSkills(updated);
    onUpdate(updated);
    setNewSkill({ name: '', level: 'Beginner' });
    setShowAddForm(false);
  };

  const handleUpdateSkill = (index, updatedSkill) => {
    const updated = [...editSkills];
    updated[index] = updatedSkill;
    setEditSkills(updated);
    onUpdate(updated);
  };

  const handleDeleteSkill = (index) => {
    const updated = editSkills?.filter((_, i) => i !== index);
    setEditSkills(updated);
    onUpdate(updated);
  };

  const handleEndorse = (skillName) => {
    if (isOwner) return; // Can't endorse your own skills
    onEndorse(skillName);
  };

  if (isEditing && isOwner) {
    return (
      <div className="bg-card rounded-lg elevation-2 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-text-primary">Skills & Expertise</h2>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowAddForm(true)}
            iconName="Plus"
            iconPosition="left"
          >
            Add Skill
          </Button>
        </div>
        <div className="space-y-6">
          {/* Add New Skill Form */}
          {showAddForm && (
            <div className="bg-muted rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">
                    Skill Name
                  </label>
                  <input
                    type="text"
                    value={newSkill?.name}
                    onChange={(e) => setNewSkill(prev => ({ ...prev, name: e?.target?.value }))}
                    className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    placeholder="e.g., React, Python, Project Management"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">
                    Proficiency Level
                  </label>
                  <select
                    value={newSkill?.level}
                    onChange={(e) => setNewSkill(prev => ({ ...prev, level: e?.target?.value }))}
                    className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  >
                    {skillLevels?.map(level => (
                      <option key={level?.value} value={level?.value}>
                        {level?.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex justify-end space-x-2 mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowAddForm(false)}
                >
                  Cancel
                </Button>
                <Button
                  size="sm"
                  onClick={handleAddSkill}
                >
                  Add Skill
                </Button>
              </div>
            </div>
          )}

          {/* Existing Skills */}
          {editSkills?.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {editSkills?.map((skill, index) => (
                <div key={skill?.id || index} className="border border-border rounded-lg p-4 relative group">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium text-text-primary">
                        {skill?.name}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`inline-block w-3 h-3 rounded-full ${getSkillLevelColor(skill?.level)}`}></span>
                        <span className="text-sm text-text-secondary">
                          {skill?.level}
                        </span>
                      </div>
                      <p className="text-xs text-text-secondary mt-1">
                        {skill?.endorsements || 0} endorsements
                      </p>
                    </div>
                    
                    <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <select
                        value={skill?.level}
                        onChange={(e) => handleUpdateSkill(index, { ...skill, level: e?.target?.value })}
                        className="text-xs px-2 py-1 border border-border rounded"
                      >
                        {skillLevels?.map(level => (
                          <option key={level?.value} value={level?.value}>
                            {level?.label}
                          </option>
                        ))}
                      </select>
                      <Button
                        variant="outline"
                        size="xs"
                        onClick={() => handleDeleteSkill(index)}
                      >
                        ✕
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg elevation-2 p-6">
      <h2 className="text-xl font-semibold text-text-primary mb-6">Skills & Expertise</h2>
      
      {skills?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {skills?.map((skill) => (
            <div key={skill?.id || skill?.name} className="border border-border rounded-lg p-4 hover:border-primary/30 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-medium text-text-primary mb-1">
                    {skill?.name}
                  </h3>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`inline-block w-3 h-3 rounded-full ${getSkillLevelColor(skill?.level)}`}></span>
                    <span className="text-sm text-text-secondary">
                      {skill?.level}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-text-secondary">
                      {skill?.endorsements || 0} endorsements
                    </p>
                    {!isOwner && (
                      <Button
                        variant="outline"
                        size="xs"
                        onClick={() => handleEndorse(skill?.name)}
                        className="hover:bg-primary hover:text-primary-foreground"
                      >
                        👍 Endorse
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <div className="text-4xl mb-4">🎯</div>
          <p className="text-text-secondary">
            {isOwner ? 'Add your skills to showcase your expertise' : 'No skills information available'}
          </p>
          {isOwner && (
            <Button
              variant="outline"
              size="sm"
              className="mt-4"
              onClick={() => {/* Handle edit mode activation */}}
            >
              Add Skills
            </Button>
          )}
        </div>
      )}

      {/* Skills Categories */}
      {skills?.length > 0 && (
        <div className="mt-8 pt-6 border-t border-border">
          <h3 className="text-lg font-medium text-text-primary mb-4">Skill Distribution</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {skillLevels?.map(level => {
              const count = skills?.filter(skill => skill?.level === level?.value)?.length || 0;
              return (
                <div key={level?.value} className="text-center">
                  <div className={`w-8 h-8 ${level?.color} rounded-full mx-auto mb-2 flex items-center justify-center text-white text-sm font-bold`}>
                    {count}
                  </div>
                  <p className="text-xs text-text-secondary">{level?.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillsSection;