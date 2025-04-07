import React from "react";

interface CardViewsProps {
  isGridView: boolean;
  setIsGridView: (isGridView: boolean) => void;
}

const CardViews: React.FC<CardViewsProps> = ({ isGridView, setIsGridView }) => {
  return (
    <div className="flex justify-end mb-4">
      <div className="flex overflow-hidden rounded">
        <button
          className={`p-2 ${
            isGridView
              ? "bg-pexels-green text-white"
              : "bg-gray-700 text-gray-300"
          }`}
          onClick={() => setIsGridView(true)}
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M4 4h4v4H4V4zm6 0h4v4h-4V4zm6 0h4v4h-4V4zm-12 6h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4zm-12 6h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4z" />
          </svg>
        </button>
        <button
          className={`p-2 ${
            !isGridView
              ? "bg-pexels-green text-white"
              : "bg-gray-700 text-gray-300"
          }`}
          onClick={() => setIsGridView(false)}
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h16v2H4v-2z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CardViews;
