import React, { useState, useRef } from 'react';
import Header from '../components/layout/Header';
import CardViews from '../components/layout/CardViews';
import VideoList from '../components/video/VideoList';

const HomePage: React.FC = () => {
  const [isGridView, setIsGridView] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeLocale, setActiveLocale] = useState<string | null>(null);
  const [activeResolution, setActiveResolution] = useState<string | null>(null);
  const [triggerSearch, setTriggerSearch] = useState<boolean>(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  
  const handleSearch = () => {
    setTriggerSearch(prev => !prev);
  };
  
  const handleFilterChange = (locale: string | null, resolution: string | null) => {
    setActiveLocale(locale);
    setActiveResolution(resolution);
  };

  const getActiveFiltersText = () => {
    const filters = [];
    if (activeLocale) filters.push(activeLocale);
    if (activeResolution) filters.push(activeResolution);
    return filters.join(', ');
  };
  
  return (
    <div className="min-h-screen bg-black text-white">
    <Header
      searchQuery={searchQuery}
      onSearchChange={setSearchQuery}
      onSearch={handleSearch}
      searchInputRef={searchInputRef as React.RefObject<HTMLInputElement>}
      onFilterChange={handleFilterChange}
    />
    
    <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 min-h-[calc(100vh-64px)]">
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center space-x-2">
            {(activeLocale || activeResolution) && (
              <div className="text-sm text-gray-400">
                Filtros ativos: {getActiveFiltersText()}
              </div>
            )}
          </div>
          
          <CardViews
            isGridView={isGridView}
            setIsGridView={setIsGridView}
          />
        </div>
        
        <VideoList 
          searchQuery={searchQuery}
          locales={activeLocale ? [activeLocale] : []}
          resolutions={activeResolution ? [activeResolution] : []}
          triggerSearch={triggerSearch}
          isGridView={isGridView}
        />
      </div>
    </main>
  </div>
  );
};

export default HomePage;
