import React from 'react';
import Icon from '../../../../AppIcon';
import Image from '../../../../AppImage';
import Button from '../../../../ui/Button';

const ResourceCard = ({ resource }) => {
  const getFileIcon = (type) => {
    const icons = {
      'pdf': 'FileText',
      'doc': 'FileText',
      'docx': 'FileText',
      'ppt': 'Presentation',
      'pptx': 'Presentation',
      'xls': 'Sheet',
      'xlsx': 'Sheet',
      'video': 'Play',
      'link': 'ExternalLink',
      'image': 'Image'
    };
    return icons?.[type] || 'File';
  };

  const getFileColor = (type) => {
    const colors = {
      'pdf': 'text-red-500',
      'doc': 'text-blue-500',
      'docx': 'text-blue-500',
      'ppt': 'text-orange-500',
      'pptx': 'text-orange-500',
      'xls': 'text-green-500',
      'xlsx': 'text-green-500',
      'video': 'text-purple-500',
      'link': 'text-primary',
      'image': 'text-pink-500'
    };
    return colors?.[type] || 'text-gray-500';
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(2)) + ' ' + sizes?.[i];
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="Star"
        size={12}
        className={`${
          index < Math.floor(rating)
            ? 'text-accent fill-accent' :'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 hover:shadow-elevation-2 transition-smooth">
      <div className="flex items-start space-x-3">
        <div className={`w-12 h-12 rounded-lg bg-muted flex items-center justify-center flex-shrink-0 ${getFileColor(resource?.type)}`}>
          <Icon name={getFileIcon(resource?.type)} size={24} />
        </div>

        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-card-foreground mb-1 line-clamp-2">
            {resource?.title}
          </h4>
          
          <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
            {resource?.description}
          </p>

          <div className="flex items-center space-x-4 text-xs text-muted-foreground mb-3">
            <div className="flex items-center space-x-1">
              <Image
                src={resource?.author?.avatar}
                alt={resource?.author?.name}
                className="w-4 h-4 rounded-full object-cover"
              />
              <span>{resource?.author?.name}</span>
            </div>
            {resource?.fileSize && (
              <>
                <span>•</span>
                <span>{formatFileSize(resource?.fileSize)}</span>
              </>
            )}
            <span>•</span>
            <span>{resource?.uploadDate}</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 text-xs text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Icon name="Download" size={12} />
                <span>{resource?.downloads}</span>
              </div>
              <div className="flex items-center space-x-1">
                {renderStars(resource?.rating)}
                <span className="ml-1">({resource?.ratingCount})</span>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="xs"
                iconName="Heart"
                onClick={() => console.log('Like resource:', resource?.id)}
              >
                {resource?.likes}
              </Button>
              <Button
                variant="outline"
                size="xs"
                iconName={resource?.type === 'link' ? 'ExternalLink' : 'Download'}
                onClick={() => console.log('Download/Open resource:', resource?.id)}
              >
                {resource?.type === 'link' ? 'Open' : 'Download'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceCard;