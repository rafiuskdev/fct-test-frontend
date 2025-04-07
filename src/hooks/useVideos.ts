import { useState, useEffect, useCallback } from 'react';
import { VideoService } from '../api/endpoints';
import { Video, VideoLocale, VideoResolution, PaginatedResponse } from '../types/video.types';

type VideoState = 
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success', data: PaginatedResponse<Video> }
  | { status: 'error', error: string };

interface UseVideosOptions {
  initialQuery?: string;
  initialPage?: number;
  initialPerPage?: number;
  initialLocale?: VideoLocale;
  initialSize?: VideoResolution;
}
export function useVideos({
  initialQuery = '',
  initialPage = 1,
  initialPerPage = 16,
  initialLocale,
  initialSize
}: UseVideosOptions = {}) {
  const [query, setQuery] = useState(initialQuery);
  const [page, setPage] = useState(initialPage);
  const [perPage, setPerPage] = useState(initialPerPage);
  const [locale, setLocale] = useState<VideoLocale | undefined>(initialLocale);
  const [size, setSize] = useState<VideoResolution | undefined>(initialSize);
  
  const [state, setState] = useState<VideoState>({ status: 'idle' });

  const fetchVideos = useCallback(async () => {
    if (!query) {
      setState({ status: 'idle' });
      return;
    }
    
    setState({ status: 'loading' });
    
    try {
      const response = await VideoService.search({
        query,
        page,
        per_page: perPage,
        locale,
        size
      });
      
      setState({ status: 'success', data: response });
    } catch (error) {
      setState({ status: 'error', error: 'Falha ao carregar vídeos' });
    }
  }, [query, page, perPage, locale, size]);
  
  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);
  
  return {
    videos: state.status === 'success' ? state.data.data : [],
    totalResults: state.status === 'success' ? state.data.total_results : 0,
    isLoading: state.status === 'loading',
    error: state.status === 'error' ? state.error : null,
    query,
    setQuery,
    page, 
    setPage,
    perPage,
    setPerPage,
    locale,
    setLocale,
    size,
    setSize,
    refresh: fetchVideos
  };
}
