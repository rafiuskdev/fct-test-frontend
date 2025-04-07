import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/layout/Header';
import VideoDetail from '../components/video/VideoDetail';

const VideoDetailPage: React.FC = () => {
  const searchInputRef = useRef<HTMLInputElement>(null) as React.RefObject<HTMLInputElement>;
  
  return (
    <div className="min-h-screen bg-black">
      <Header
        searchQuery={""}
        onSearchChange={() => {}}
        onSearch={() => {}}
        searchInputRef={searchInputRef}
      />
      
      <main className="max-w-6xl mx-auto px-4 py-6">
        <Link to="/" className="text-pexels-green mb-4 inline-block hover:underline">
          &larr; Voltar para galeria
        </Link>
        
        <VideoDetail />
      </main>
    </div>
  );
};

export default VideoDetailPage;
