import React, { useState } from 'react';

interface FilterDropdownProps {
  label: string;
  options: string[];
  selectedOptions: string[];
  onChange: (selected: string[]) => void;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({ label, options, selectedOptions, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleCheckboxChange = (option: string) => {
    if (selectedOptions.includes(option)) {
      onChange(selectedOptions.filter((item) => item !== option));
    } else {
      onChange([...selectedOptions, option]);
    }
  };

  return (
    <div className="relative">
      {/* Trigger Input */}
      <button
        type="button"
        onClick={toggleDropdown}
        className="w-full bg-gray-800 text-white px-4 py-2 rounded-md focus:outline-none flex justify-between items-center"
      >
        {label}
        <span className="ml-2">{isOpen ? '▲' : '▼'}</span>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute left-0 mt-2 w-full bg-gray-700 text-white rounded-md shadow-lg z-10">
          <ul className="p-2 space-y-2">
            {options.map((option) => (
              <li key={option} className="flex items-center">
                <input
                  type="checkbox"
                  id={option}
                  checked={selectedOptions.includes(option)}
                  onChange={() => handleCheckboxChange(option)}
                  className="w-4 h-4 text-green-500 border-gray-300 rounded focus:ring-green-400"
                />
                <label htmlFor={option} className="ml-2 cursor-pointer">
                  {option}
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;
