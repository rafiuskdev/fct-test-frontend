export interface Video {
  id: number;
  width: number;
  height: number;
  duration: number;
  full_res: null;
  tags: string[];
  url: string;
  image: string;
  user_name: string;
  avg_color: string | null;
  user: {
    id: number;
    name: string;
    url: string;
  };
  video_files: {
    id: number;
    quality: string;
    file_type: string;
    width: number;
    height: number;
    fps: number;
    link: string;
    size: number | string;
  }[];
  video_pictures?: {
    id: number;
    picture: string;
    nr: number;
  }[];
}

export interface VideoListResponse {
  items: Video[];
  page: number;
  per_page: number;
  total_pages: number;
}

export interface PexelsResponse {
  page: number;
  per_page: number;
  total_results: number;
  videos: Video[];
}

export type VideoResolution = 'hd' | 'sd';
export type VideoLocale = 'es-ES' | 'it-IT' | 'ja-JP'; 
