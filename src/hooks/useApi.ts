/**
 * Custom hooks for API calls using React Query
 * These hooks provide caching, loading states, and error handling
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import type { UserProfile, DataItem } from '@/types';

/**
 * Hook to fetch current user profile
 */
export function useProfile() {
  return useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const response = await api.user.getMe();
      return response.data;
    },
  });
}

/**
 * Hook to update user profile
 */
export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      userId,
      data,
    }: {
      userId: string;
      data: Partial<UserProfile>;
    }) => {
      const response = await api.user.updateProfile(userId, data);
      return response.data;
    },
    onSuccess: () => {
      // Invalidate and refetch profile data
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });
}

/**
 * Hook to fetch paginated data items
 */
export function useDataList(params?: {
  page?: number;
  pageSize?: number;
  search?: string;
}) {
  return useQuery({
    queryKey: ['data', 'list', params],
    queryFn: async () => {
      const response = await api.data.list(params);
      return response.data;
    },
  });
}

/**
 * Hook to fetch a single data item
 */
export function useDataItem(id: string) {
  return useQuery({
    queryKey: ['data', id],
    queryFn: async () => {
      const response = await api.data.get(id);
      return response.data;
    },
    enabled: !!id, // Only run if ID is provided
  });
}

/**
 * Hook to create a new data item
 */
export function useCreateData() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Omit<DataItem, 'id' | 'createdAt' | 'updatedAt'>) => {
      const response = await api.data.create(data);
      return response.data;
    },
    onSuccess: () => {
      // Invalidate data list to refetch with new item
      queryClient.invalidateQueries({ queryKey: ['data', 'list'] });
    },
  });
}

/**
 * Hook to update a data item
 */
export function useUpdateData() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<DataItem> }) => {
      const response = await api.data.update(id, data);
      return response.data;
    },
    onSuccess: (_, variables) => {
      // Invalidate specific item and list
      queryClient.invalidateQueries({ queryKey: ['data', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['data', 'list'] });
    },
  });
}

/**
 * Hook to delete a data item
 */
export function useDeleteData() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await api.data.delete(id);
      return id;
    },
    onSuccess: (id) => {
      // Remove from cache and refetch list
      queryClient.removeQueries({ queryKey: ['data', id] });
      queryClient.invalidateQueries({ queryKey: ['data', 'list'] });
    },
  });
}
