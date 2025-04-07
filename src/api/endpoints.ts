import api from './config';
import { PaginatedResponse, Video, VideoSearchParams } from '../types/video.types';

export const VideoService = {
  search: async (params: VideoSearchParams): Promise<PaginatedResponse<Video>> => {
    const response = await api.get<PaginatedResponse<Video>>('/videos/search', { params });
    return response.data;
  },
  
  getById: async (id: number): Promise<Video> => {
    const response = await api.get<Video>(`/videos/${id}`);
    return response.data;
  }
};
