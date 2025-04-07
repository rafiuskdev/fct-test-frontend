import React from "react";
import Logo from "./Logo";
import SearchBar from "./SearchBar";

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSearch: () => void;
  searchInputRef: React.RefObject<HTMLInputElement>;
  onFilterChange?: (locale: string | null, resolution: string | null) => void;
}

const Header: React.FC<HeaderProps> = ({
  searchQuery,
  onSearchChange,
  onSearch,
  searchInputRef,
  onFilterChange
}) => {
  return (
    <header className="sticky top-0 z-50 bg-black/95 backdrop-blur-sm border-b border-white/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Logo />
          </div>
          
          <div className="flex-1 max-w-2xl mx-4 relative">
            <SearchBar
              value={searchQuery}
              onChange={onSearchChange}
              onSubmit={onSearch}
              onFocus={() => {}}
              searchInputRef={searchInputRef}
              onFilterChange={onFilterChange}
            />
          </div>
          <div className="hidden sm:flex items-center space-x-4"/>
        </div>
      </div>
    </header>
  );
};

export default Header;
