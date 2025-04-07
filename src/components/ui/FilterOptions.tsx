import React from 'react';
import { VideoLocale, VideoResolution } from '../../types/video.types';

interface FilterOption {
  value: string;
  label: string;
}

interface FilterOptionsProps {
  selectedLocale?: VideoLocale;
  selectedResolution?: VideoResolution;
  onLocaleChange: (locale: VideoLocale | undefined) => void;
  onResolutionChange: (resolution: VideoResolution | undefined) => void;
}

const localeOptions: FilterOption[] = [
  { value: 'es-ES', label: 'Espanha' },
  { value: 'it-IT', label: 'Itália' },
  { value: 'ja-JP', label: 'Japão' }
];

const resolutionOptions: FilterOption[] = [
  { value: 'hd', label: 'HD' },
  { value: 'sd', label: 'SD' },
];

const FilterOptions: React.FC<FilterOptionsProps> = ({
  selectedLocale,
  selectedResolution,
  onLocaleChange,
  onResolutionChange
}) => {
  return (
    <div className="bg-gray-200 rounded p-4 my-4">
      <div className="mb-4">
        <h3 className="font-bold mb-2">Localidades</h3>
        <div className="flex flex-wrap gap-2">
          {localeOptions.map((option) => (
            <button
              key={option.value}
              className={`px-4 py-2 rounded ${
                selectedLocale === option.value 
                  ? 'bg-pexels-green text-white' 
                  : 'bg-gray-300 text-gray-700'
              }`}
              onClick={() => onLocaleChange(
                selectedLocale === option.value as VideoLocale 
                  ? undefined 
                  : option.value as VideoLocale
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
      
      <div>
        <h3 className="font-bold mb-2">Resoluções</h3>
        <div className="flex flex-wrap gap-2">
          {resolutionOptions.map((option) => (
            <button
              key={option.value}
              className={`px-4 py-2 rounded ${
                selectedResolution === option.value 
                  ? 'bg-pexels-green text-white' 
                  : 'bg-gray-300 text-gray-700'
              }`}
              onClick={() => onResolutionChange(
                selectedResolution === option.value as VideoResolution 
                  ? undefined 
                  : option.value as VideoResolution
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterOptions;
