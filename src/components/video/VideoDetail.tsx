import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { videoService } from '../../api/services/videoService';
import SkeletonLoading from '../ui/SkeletonLoading';
import { VideoFile, Video } from '../../types/video.types';

type VideoDetailParams = {
  id: string;
};

interface ApiResponse {
  items?: Video[];
  page?: number;
  per_page?: number;
  total_pages?: number;
}

const VideoDetail: React.FC = () => {
  const { id } = useParams<VideoDetailParams>();
  const [video, setVideo] = useState<Video | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedQuality, setSelectedQuality] = useState<string>('');

  useEffect(() => {
    fetchVideoDetails();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchVideoDetails = async () => {
    if (!id) return;
    
    try {
      setLoading(true);
      const response = await videoService.getVideoById(parseInt(id)) as ApiResponse | Video;
      
      const data = 'items' in response && response.items ? response.items[0] : response as Video;
      
      setVideo(data);
      
      if (data.video_files && data.video_files.length > 0) {
        const highestQuality = data.video_files.reduce((prev: VideoFile, current: VideoFile) => 
          (current.height > prev.height) ? current : prev
        );
        setSelectedQuality(highestQuality.id.toString());
      }
    } catch (err) {
      setError('Failed to fetch video details');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getSelectedVideoFile = () => {
    if (!video || !video.video_files || !video.video_files.length) return null;
    return video.video_files.find(file => file.id.toString() === selectedQuality);
  };

  const getPosterImage = () => {
    if (!video) return '';
    
    if (video.Video_pictures && video.Video_pictures.length > 0) {
      return video.Video_pictures[0].picture;
    }
    
    if (video.video_pictures && video.video_pictures.length > 0) {
      return video.video_pictures[0].picture;
    }
    
    return '';
  };

  if (loading) {
    return <SkeletonLoading isGridView={false} count={1} />;
  }

  if (error || !video) {
    return <div className="text-red-500">{error || 'Video not found'}</div>;
  }

  const selectedFile = getSelectedVideoFile();

  return (
    <div className=" text-white">
      <div className="container mx-auto p-0">
     
        
        <div className="bg-black overflow-hidden">
          {selectedFile && (
            <video 
              className="w-full" 
              controls 
              poster={getPosterImage()}
            >
              <source src={selectedFile.link} type={selectedFile.file_type} />
              Your browser does not support the video tag.
            </video>
          )}
        </div>
        
        <div className="p-4">
          <h2 className="text-xl text-blue-400 font-bold mb-2">{video.user_name}</h2>
          <p>ID: {video.id}</p>
          <p>Resolução: {video.width}x{video.height}</p>
          <p>Duração: {video.duration} segundos</p>
        </div>
      </div>
    </div>
  );
};

export default VideoDetail; 