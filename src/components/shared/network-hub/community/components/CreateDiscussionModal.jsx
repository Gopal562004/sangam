import React, { useState } from 'react';
import Icon from '../../../../AppIcon';
import Button from '../../../../ui/Button';
import Input from '../../../../ui/Input';

const CreateDiscussionModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'General',
    tags: ''
  });

  const categories = [
    'General',
    'Career Development',
    'Technical Skills',
    'Leadership',
    'Industry Insights',
    'Networking'
  ];

  const handleSubmit = (e) => {
    e?.preventDefault();
    onSubmit(formData);
    setFormData({ title: '', content: '', category: 'General', tags: '' });
    onClose();
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-card-foreground">Start New Discussion</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
          >
            <Icon name="X" size={20} />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <Input
            label="Discussion Title"
            type="text"
            placeholder="What would you like to discuss?"
            value={formData?.title}
            onChange={(e) => handleChange('title', e?.target?.value)}
            required
          />

          <div>
            <label className="block text-sm font-medium text-card-foreground mb-2">
              Category
            </label>
            <select
              value={formData?.category}
              onChange={(e) => handleChange('category', e?.target?.value)}
              className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {categories?.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-card-foreground mb-2">
              Content
            </label>
            <textarea
              value={formData?.content}
              onChange={(e) => handleChange('content', e?.target?.value)}
              placeholder="Share your thoughts, questions, or insights..."
              rows={8}
              className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
              required
            />
          </div>

          <Input
            label="Tags (optional)"
            type="text"
            placeholder="Add tags separated by commas"
            value={formData?.tags}
            onChange={(e) => handleChange('tags', e?.target?.value)}
            description="Help others find your discussion with relevant tags"
          />

          <div className="flex items-center space-x-4 pt-4 border-t border-border">
            <Button
              variant="ghost"
              size="sm"
              iconName="Paperclip"
              onClick={() => console.log('Attach file')}
            >
              Attach File
            </Button>
            <Button
              variant="ghost"
              size="sm"
              iconName="Image"
              onClick={() => console.log('Add image')}
            >
              Add Image
            </Button>
          </div>

          <div className="flex items-center justify-end space-x-3 pt-4">
            <Button
              variant="outline"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="default"
              disabled={!formData?.title?.trim() || !formData?.content?.trim()}
            >
              Start Discussion
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateDiscussionModal;