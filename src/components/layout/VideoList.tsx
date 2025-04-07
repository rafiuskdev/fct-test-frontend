import React from 'react';
import { Link } from 'react-router-dom';

interface Video {
  id: number;
  image: string;
  user: { name: string };
  duration: number;
}

interface VideoListProps {
  videos: Video[];
  isGridView: boolean;
}

const VideoList: React.FC<VideoListProps> = ({ videos, isGridView }) => {
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' + secs : secs}`;
  };

  if (videos.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-xl text-gray-400">Nenhum vídeo encontrado. Tente outra pesquisa.</p>
      </div>
    );
  }

  return (
    <div className={isGridView 
      ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" 
      : "flex flex-col space-y-4"
    }>
      {videos.map((video) => (
        <Link 
          key={video.id} 
          to={`/video/${video.id}`}
          className={`block bg-gray-900 rounded overflow-hidden ${!isGridView && 'flex items-center'}`}
        >
          <div className={`relative ${isGridView ? 'w-full aspect-video' : 'w-44 h-32'} bg-gray-800 flex-shrink-0`}>
            <img 
              src={video.image} 
              alt={`Vídeo por ${video.user.name}`}
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-black bg-opacity-50 flex items-center justify-center">
                <div className="w-0 h-0 border-t-8 border-b-8 border-l-12 border-t-transparent border-b-transparent border-l-white ml-1"></div>
              </div>
            </div>
          </div>
          
          <div className={`p-3 ${!isGridView && 'flex-1'}`}>
            <h3 className="text-pexels-green font-medium">Nome autor</h3>
            <p className="text-gray-400 text-sm">ID: {video.id}</p>
            <p className="text-gray-400 text-sm">Duração: {formatDuration(video.duration)}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default VideoList;
