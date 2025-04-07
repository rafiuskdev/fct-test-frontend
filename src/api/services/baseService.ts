import api from '../config';
import { PaginatedResponse, ApiQueryParams } from '../types/common';

export const baseService = <T>({ endpoint }: { endpoint: string }) => {
  return {
    getAll: async (params?: ApiQueryParams): Promise<PaginatedResponse<T>> => {
      const response = await api.get<PaginatedResponse<T>>(endpoint, { params });
      return response.data;
    },
  };
};