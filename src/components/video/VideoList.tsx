/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SkeletonLoading from '../ui/SkeletonLoading';
import { videoService } from '../../api/services/videoService';

interface ApiResponseVideo {
  id: number;
  width: number;
  height: number;
  duration: number;
  user_name: string;
  video_files: {
    id: number;
    quality: string;
    file_type: string;
    width: number;
    height: number;
    fps: number;
    link: string;
    size: number;
  }[];
  Video_pictures?: {
    id: number;
    picture: string;
    nr: number;
  }[];
  video_pictures?: {
    id: number;
    picture: string;
    nr: number;
  }[];
}

interface ApiResponse {
  items: ApiResponseVideo[];
  page: number;
  per_page: number;
  total_pages: number;
}

interface VideoListProps {
  searchQuery?: string;
  locales?: string[];
  resolutions?: string[];
  triggerSearch?: boolean;
  isGridView?: boolean;
}

const VideoList: React.FC<VideoListProps> = ({
  searchQuery: externalSearchQuery = '',
  locales = [],
  resolutions = [],
  triggerSearch = false,
  isGridView = true
}) => {
  const getLimit = (gridView: boolean) => gridView ? 16 : 10;
  
  const [videos, setVideos] = useState<ApiResponseVideo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: getLimit(isGridView),
    per_page: getLimit(isGridView),
    total: 0,
    total_pages: 1
  });
  const [lastSearchParams, setLastSearchParams] = useState({
    query: '',
    locales: [] as string[],
    resolutions: [] as string[]
  });

  const mapResolutionToApiValue = (resolution: string) => {
    switch(resolution) {
      case 'HD': return 'hd';
      case 'SD': return 'sd';
      default: return resolution.toLowerCase(); 
    }
  };

  const mapLocaleToApiValue = (locale: string) => {
    switch(locale) {
      case 'Espanha': return 'es-ES';
      case 'Itália': return 'it-IT';
      case 'Japão': return 'ja-JP';
      default: return locale; 
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  useEffect(() => {
    if (videos.length > 0 || pagination.page > 1) {
      fetchVideos();
    }
  }, [pagination.page]);

  useEffect(() => {
    if (triggerSearch) {
      const paramsChanged = 
        externalSearchQuery !== lastSearchParams.query ||
        JSON.stringify(locales) !== JSON.stringify(lastSearchParams.locales) ||
        JSON.stringify(resolutions) !== JSON.stringify(lastSearchParams.resolutions);
      
      if (paramsChanged) {
        setPagination(prev => ({
          ...prev, 
          page: 1,
          total_pages: 1 
        }));
        
        setLastSearchParams({
          query: externalSearchQuery,
          locales: [...locales],
          resolutions: [...resolutions]
        });
        
        setTimeout(() => {
          fetchVideos();
        }, 0);
      }
    }
  }, [triggerSearch, externalSearchQuery, locales, resolutions]);

  useEffect(() => {
    const newLimit = getLimit(isGridView);
    setPagination(prev => ({
      ...prev,
      limit: newLimit,
      per_page: newLimit,
      page: 1 
    }));

    if (videos.length > 0) {
      fetchVideos();
    }
  }, [isGridView]);

  const fetchVideos = async () => {
    try {
      setLoading(true);
      
      const currentLimit = getLimit(isGridView);

      const searchQuery = externalSearchQuery.trim() || 'nature';
      
      const localeParam = locales.length > 0 
        ? locales.map(locale => mapLocaleToApiValue(locale)).filter(val => val).join(',') 
        : undefined;
      
      const sizeParam = resolutions.length > 0 
        ? resolutions.map(res => mapResolutionToApiValue(res)).filter(val => val).join(',') 
        : undefined;

      const response = await videoService.getVideos({ 
        page: pagination.page,
        per_page: currentLimit,
        query: searchQuery,
        locale: localeParam,
        size: sizeParam,
        is_popular: 0,
        orientation: 'landscape'
      });
      
      const apiResponse = response as unknown as ApiResponse;
      
      if (apiResponse && Array.isArray(apiResponse.items)) {
        setVideos(apiResponse.items);

        const totalPages = Math.min(apiResponse.total_pages || 1, 20); 
        
        setPagination({
          ...pagination,
          limit: currentLimit,
          per_page: currentLimit,
          total: apiResponse.items.length,
          total_pages: totalPages
        });
      } else {
        console.error('Unexpected API response format:', apiResponse);
        setError('Unexpected API response format');
      }
    } catch (err) {
      setError('Failed to fetch videos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= pagination.total_pages) {
      setPagination({ ...pagination, page: newPage });
    }
  };

  const getPageNumbers = () => {
    const totalPages = pagination.total_pages;
    const currentPage = pagination.page;

    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (currentPage <= 3) {
      return [1, 2, 3, 4, 5];
    }
    
    if (currentPage >= totalPages - 2) {
      return [
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages
      ];
    }
    
    return [
      currentPage - 2,
      currentPage - 1,
      currentPage,
      currentPage + 1,
      currentPage + 2
    ];
  };

  if (loading) {
    return <SkeletonLoading isGridView={isGridView} count={pagination.limit} />;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (videos.length === 0) {
    return (
      <div className="bg-black min-h-screen p-2">
        <div className="container mx-auto">
          <div className="flex flex-col items-center justify-center py-16">
            <svg className="w-20 h-20 text-gray-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            <h3 className="text-xl text-white font-medium mb-2">Nenhum vídeo encontrado</h3>
            <p className="text-gray-400 text-center max-w-md">
              Não foi possível encontrar vídeos com os critérios de busca atuais. Tente utilizar termos diferentes ou remover alguns filtros.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const getThumbnail = (video: ApiResponseVideo) => {
    if (video.Video_pictures && video.Video_pictures.length > 0) {
      return video.Video_pictures[0].picture;
    }
    if (video.video_pictures && video.video_pictures.length > 0) {
      return video.video_pictures[0].picture;
    }
    return '';
  };

  return (
    <div className="bg-black min-h-screen p-2">
      <div className="container mx-auto">
        {isGridView ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {videos.map((video, index) => (
              <Link to={`/video/${video.id}`} key={video.id} className="relative block aspect-video w-full overflow-hidden rounded-lg border border-gray-800 hover:border-gray-600 transition-all">
                <div className="pb-[56.25%] relative"> {/* 56.25% = 9/16 (aspect ratio 16:9) */}
                  <img 
                    src={getThumbnail(video)}
                    alt={`Video ${index + 1}`} 
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <div className="bg-black bg-opacity-50 rounded-full p-3 text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="flex flex-col space-y-4">
            {videos.map((video) => (
              <Link 
                to={`/video/${video.id}`} 
                key={video.id} 
                className="flex items-center bg-black hover:bg-gray-900 transition"
              >
                <div className="w-64 h-36 bg-gray-800 relative flex-shrink-0 mr-4">
                  <img 
                    src={getThumbnail(video)}
                    alt={`Video thumbnail`} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 flex items-center justify-center">
                      <svg className="w-12 h-12 text-black" viewBox="0 0 36 36" fill="currentColor">
                        <circle cx="18" cy="18" r="18" fill="currentColor" fillOpacity="0.5" />
                        <path d="M23 18L15 23V13L23 18Z" fill="white" />
                      </svg>
                    </div>
                  </div>
                </div>
                
                <div className="text-white">
                  <h3 className="text-teal-400 text-lg font-medium mb-1">{video.user_name || 'Nome autor'}</h3>
                  <p className="text-white text-sm">ID: {video.id}</p>
                  <p className="text-white text-sm">Duração: {video.duration} segundos</p>
                </div>
              </Link>
            ))}
          </div>
        )}
        
        <div className="flex justify-center items-center mt-8 text-white">
          {pagination.total_pages > 1 && (
            <div className="flex rounded-md overflow-hidden">
              {pagination.page > 3 && (
                <button
                  onClick={() => handlePageChange(1)}
                  className="bg-gray-800 text-gray-300 hover:bg-gray-700 px-3 py-2"
                >
                  &laquo;
                </button>
              )}
              
              {pagination.page > 1 && (
                <button
                  onClick={() => handlePageChange(pagination.page - 1)}
                  className="bg-gray-800 text-gray-300 hover:bg-gray-700 px-3 py-2"
                >
                  &lsaquo;
                </button>
              )}

              {getPageNumbers().map((pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  className={`px-4 py-2 ${
                    pagination.page === pageNum 
                      ? 'bg-pexels-green text-white' 
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  } transition-colors`}
                >
                  {pageNum}
                </button>
              ))}
              
              {pagination.page < pagination.total_pages && (
                <button
                  onClick={() => handlePageChange(pagination.page + 1)}
                  className="bg-gray-800 text-gray-300 hover:bg-gray-700 px-3 py-2"
                >
                  &rsaquo;
                </button>
              )}

              {pagination.page < pagination.total_pages - 2 && (
                <button
                  onClick={() => handlePageChange(pagination.total_pages)}
                  className="bg-gray-800 text-gray-300 hover:bg-gray-700 px-3 py-2"
                >
                  &raquo;
                </button>
              )}
            </div>
          )}
          <div className="ml-4 text-sm text-gray-400">
            Página {pagination.page} de {pagination.total_pages}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoList; 