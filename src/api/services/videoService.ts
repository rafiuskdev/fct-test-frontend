import api from '../config';
import { Video, VideoListResponse } from '../types';
import { ApiQueryParams } from '../types/common';

export const videoService = {
  getVideos: async (params?: ApiQueryParams): Promise<VideoListResponse> => {
    const response = await api.get<VideoListResponse>('/videos', { params });
    return response.data;
  },
  
  getVideoById: async (id: number): Promise<Video> => {
    const response = await api.get<Video>(`/videos/${id}`);
    return response.data;
  }
}; 