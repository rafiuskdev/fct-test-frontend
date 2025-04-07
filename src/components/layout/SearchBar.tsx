import React, { useState, useRef, useEffect } from "react";
import FilterPanel from "./FilterPanel";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  onFocus: () => void;
  searchInputRef: React.RefObject<HTMLInputElement | null>;
  onFilterChange?: (locale: string | null, resolution: string | null) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  onSubmit,
  onFocus,
  searchInputRef,
  onFilterChange
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedLocale, setSelectedLocale] = useState<string | null>(null);
  const [selectedResolution, setSelectedResolution] = useState<string | null>(null);
  const filterRef = useRef<HTMLDivElement>(null);
  const filterButtonRef = useRef<HTMLButtonElement>(null);

  const totalActiveFilters = (selectedLocale ? 1 : 0) + (selectedResolution ? 1 : 0);

  const toggleLocale = (locale: string) => {
    const newLocale = selectedLocale === locale ? null : locale;
    setSelectedLocale(newLocale);
    onFilterChange?.(newLocale, selectedResolution);
  };

  const toggleResolution = (resolution: string) => {
    const newResolution = selectedResolution === resolution ? null : resolution;
    setSelectedResolution(newResolution);
    onFilterChange?.(selectedLocale, newResolution);
  };

  const clearAllFilters = () => {
    setSelectedLocale(null);
    setSelectedResolution(null);
    onFilterChange?.(null, null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  const toggleFilterPanel = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isFilterOpen && 
        filterRef.current && 
        !filterRef.current.contains(event.target as Node) &&
        filterButtonRef.current &&
        !filterButtonRef.current.contains(event.target as Node)
      ) {
        setIsFilterOpen(false);
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (isFilterOpen && event.key === 'Escape') {
        setIsFilterOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscapeKey);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isFilterOpen]);

  return (
    <>
      <form onSubmit={handleSubmit} className="w-full">
        <div className="relative group flex items-center gap-2">
          <div className="relative flex-1">
            <input
              ref={searchInputRef}
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onFocus={onFocus}
              placeholder="Pesquisar vídeos..."
              className="w-full bg-gray-800 text-white placeholder-gray-400 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-pexels-green/50 transition-all"
              aria-label="Campo de pesquisa"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-400 group-focus-within:text-pexels-green transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            {value && (
              <button
                type="button"
                onClick={() => onChange('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white transition-colors"
                aria-label="Limpar pesquisa"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
          <button
            type="submit"
            className="bg-pexels-green p-2 rounded-lg hover:bg-pexels-green/90 transition-colors"
            title="Buscar"
            aria-label="Buscar"
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          <div className="relative">
            <button
              ref={filterButtonRef}
              type="button"
              onClick={toggleFilterPanel}
              className={`relative bg-gray-700 p-2 rounded-lg transition-colors ${
                isFilterOpen ? 'bg-pexels-green hover:bg-pexels-green/90' : 
                  totalActiveFilters > 0 ? 'bg-pexels-green/80 hover:bg-pexels-green/90' : 'hover:bg-gray-600'
              }`}
              title="Filtrar"
              aria-label="Abrir filtros"
              aria-expanded={isFilterOpen}
              aria-haspopup="true"
            >
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              
              {totalActiveFilters > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {totalActiveFilters}
                </span>
              )}
            </button>
          </div>
        </div>
      </form>

      {isFilterOpen && (
        <FilterPanel 
          filterRef={filterRef}
          selectedLocale={selectedLocale}
          selectedResolution={selectedResolution}
          toggleLocale={toggleLocale}
          toggleResolution={toggleResolution}
          onClearAll={clearAllFilters}
        />
      )}
    </>
  );
};

export default SearchBar; 