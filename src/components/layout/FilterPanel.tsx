import React from 'react';

interface FilterPanelProps {
  filterRef: React.RefObject<HTMLDivElement | null>;
  selectedLocale: string | null;
  selectedResolution: string | null;
  toggleLocale: (locale: string) => void;
  toggleResolution: (resolution: string) => void;
  onClearAll: () => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ 
  filterRef,
  selectedLocale,
  selectedResolution,
  toggleLocale,
  toggleResolution,
  onClearAll
}) => {
  const locales = ["Espanha", "Itália", "Japão"];
  const resolutions = ["HD", "Full HD", "4K"];
  
  const hasActiveFilters = selectedLocale !== null || selectedResolution !== null;

  return (
    <div
    ref={filterRef}
    className="absolute left-0 right-0 mt-2 bg-gray-800 rounded-lg shadow-xl z-10 p-4 border border-white/10 backdrop-blur-sm animate-fade-in divide-y divide-white/10"
  >
    <div className="pb-4">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-white font-medium flex items-center space-x-2">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
          </svg>
          <span>Localidades</span>
        </h3>
        {hasActiveFilters && (
          <button 
            onClick={onClearAll}
            className="text-xs text-red-400 hover:text-red-300 transition-colors"
            aria-label="Limpar todos os filtros"
          >
            Limpar filtros
          </button>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {locales.map((locale) => (
          <button
            key={locale}
            onClick={() => toggleLocale(locale)}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
              selectedLocale === locale
                ? "bg-pexels-green text-white ring-2 ring-pexels-green/50"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
            aria-pressed={selectedLocale === locale}
          >
            {selectedLocale === locale && (
              <svg
                className="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
              </svg>
            )}
            {locale}
          </button>
        ))}
      </div>
    </div>

    <div className="pt-4">
      <h3 className="text-white font-medium mb-3 flex items-center space-x-2">
        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
        </svg>
        <span>Resoluções</span>
      </h3>
      <div className="flex flex-wrap gap-2">
        {resolutions.map((resolution) => (
          <button
            key={resolution}
            onClick={() => toggleResolution(resolution)}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
              selectedResolution === resolution
                ? "bg-pexels-green text-white ring-2 ring-pexels-green/50"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
            aria-pressed={selectedResolution === resolution}
          >
            {selectedResolution === resolution && (
              <svg
                className="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
              </svg>
            )}
            {resolution}
          </button>
        ))}
      </div>
    </div>
  </div>
  );
};

export default FilterPanel; 