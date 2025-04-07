export interface VideoFile {
  id: number;
  quality: string;
  file_type: string;
  width: number;
  height: number;
  link: string;
  size: number;
  fps: number;
}

export interface VideoAuthor {
  id: number;
  name: string;
  url: string;
}

export interface Video {
  id: number;
  width: number;
  height: number;
  url?: string;
  image?: string; 
  duration: number;
  user_name: string;
  user?: VideoAuthor;
  video_files: VideoFile[];
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

export interface PaginatedResponse<T> {
  page: number;
  per_page: number;
  total_results: number;
  next_page: string;
  prev_page: string;
  data: T[];
}

export type VideoResolution = 'hd' | 'full_hd' | '4k';
export type VideoLocale = 'es-ES' | 'it-IT' | 'ja-JP';

export interface VideoSearchParams {
  query: string;
  page?: number;
  per_page?: number;
  locale?: VideoLocale;
  size?: VideoResolution;
}
