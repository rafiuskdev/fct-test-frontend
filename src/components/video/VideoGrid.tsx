import React from 'react';
import { Link } from 'react-router-dom';
import { Video } from '../../types/video.types';
import SkeletonLoading from '../ui/SkeletonLoading';

interface VideoGridProps {
  videos: Video[];
  isGridView: boolean;
  isLoading?: boolean;
}

const formatDuration = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

const VideoGrid: React.FC<VideoGridProps> = ({ videos, isGridView, isLoading = false }) => {
  if (isLoading) {
    return <SkeletonLoading isGridView={isGridView} count={8} />;
  }

  if (videos.length === 0) {
    return (
      <div className="text-center py-10 text-white">
        Nenhum vídeo encontrado. Tente outra pesquisa.
      </div>
    );
  }

  return (
    <div className={`
      ${isGridView 
        ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4' 
        : 'flex flex-col'}
    `}>
      {videos.map((video) => (
        <Link 
          key={video.id} 
          to={`/video/${video.id}`}
          className={`block ${!isGridView ? 'flex py-4 border-b border-gray-800' : 'bg-pexels-gray rounded overflow-hidden'}`}
        >
          {!isGridView ? (
            <>
              <div className="w-52 h-24 mr-4 relative bg-gray-800 flex items-center justify-center">
                <img 
                  src={video.image} 
                  alt={`Vídeo por ${video.user_name}`}
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 bg-black bg-opacity-60 rounded-full flex items-center justify-center">
                    <div className="w-0 h-0 border-t-6 border-b-6 border-l-8 border-t-transparent border-b-transparent border-l-white ml-1"></div>
                  </div>
                </div>
              </div>
              <div className="text-white">
                <div className="text-teal-400 text-lg">Nome autor</div>
                <div className="text-sm mt-1 text-gray-200">ID:</div>
                <div className="text-sm text-gray-200">Duração:</div>
              </div>
            </>
          ) : (
            <div className="relative">
              <div className="aspect-w-16 aspect-h-9 bg-gray-800">
                <img 
                  src={video.image} 
                  alt={`Vídeo por ${video.user_name}`}
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-black bg-opacity-60 rounded-full flex items-center justify-center">
                    <div className="w-0 h-0 border-t-8 border-b-8 border-l-12 border-t-transparent border-b-transparent border-l-white ml-1"></div>
                  </div>
                </div>
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                  {formatDuration(video.duration)}
                </div>
              </div>
            </div>
          )}
        </Link>
      ))}
    </div>
  );
};

export default VideoGrid;
