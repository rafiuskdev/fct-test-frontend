import React from 'react';

interface SkeletonLoadingProps {
  isGridView?: boolean;
  count?: number;
}

const SkeletonLoading: React.FC<SkeletonLoadingProps> = ({ 
  isGridView = true, 
  count = 12 
}) => {
  const items = Array.from({ length: count });

  if (isGridView) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="bg-gray-700 rounded-lg h-48 w-full"></div>
            <div className="mt-2">
              <div className="h-4 bg-gray-700 rounded w-3/4"></div>
              <div className="h-4 bg-gray-700 rounded w-1/2 mt-2"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {items.map((_, index) => (
        <div key={index} className="animate-pulse flex space-x-4">
          <div className="bg-gray-700 rounded-lg h-24 w-40"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-700 rounded w-3/4"></div>
            <div className="h-4 bg-gray-700 rounded w-1/2"></div>
            <div className="h-4 bg-gray-700 rounded w-1/4"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoading; 