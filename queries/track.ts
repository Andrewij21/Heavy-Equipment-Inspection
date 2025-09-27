// src/lib/api/track.ts
import { apiClient } from "@/lib/api";
import type { ApiResponse } from "@/lib/type";
import type {
  TrackInspection,
  InspectionFormData, // Keep InspectionFormData for generic type safety
} from "@/schemas/inspectionSchema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { inspect } from "util";
import { inspectionKeys } from "./inspection";

// --- TYPES ---
// Define the structure for the payload needed to update the status
interface StatusUpdatePayload {
  status: "APPROVED" | "REJECTED";
}

// --- KEYS ---
export const trackKeys = {
  all: ["track-inspections"] as const,
  lists: (params: Record<string, any> = {}) =>
    [...trackKeys.all, "list", params] as const,
  detail: (id: string) => [...trackKeys.all, "detail", id] as const,
};

// --- API FUNCTIONS ---

// 1. GET ALL
const getTrackInspections = async (
  params: Record<string, any>
): Promise<ApiResponse<TrackInspection[]>> => {
  return await apiClient.get("/tracks");
};

// 2. GET BY ID
const getTrackInspectionById = async (
  id: string
): Promise<ApiResponse<TrackInspection>> => {
  if (!id) throw new Error("Inspection ID is required");
  return await apiClient.get(`/tracks/${id}`);
};

// 3. CREATE
const createTrackInspection = async (
  data: TrackInspection
): Promise<ApiResponse<TrackInspection>> => {
  return await apiClient.post("/tracks", data);
};

// 4. UPDATE STATUS (LEADER/ADMIN action)
const updateTrackStatus = async ({
  id,
  statusData,
}: {
  id: string;
  statusData: StatusUpdatePayload;
}): Promise<ApiResponse<TrackInspection>> => {
  // Uses the dedicated status route: PATCH /tracks/:id/status
  return await apiClient.patch(`/tracks/${id}/status`, statusData);
};

// 5. DELETE
const deleteTrackInspection = async (id: string): Promise<ApiResponse<any>> => {
  return await apiClient.delete(`/tracks/${id}`);
};

// --- REACT QUERY HOOKS (READ) ---

export const useGetTrackInspections = (params: Record<string, any>) => {
  return useQuery({
    queryKey: trackKeys.lists(params),
    queryFn: () => getTrackInspections(params),
  });
};

export const useGetTrackInspection = (id: string) => {
  return useQuery({
    queryKey: trackKeys.detail(id),
    queryFn: () => getTrackInspectionById(id),
    enabled: !!id, // Only run the query if the ID is available
  });
};

// --- REACT QUERY HOOKS (MUTATE) ---

export const useCreateTrackInspection = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createTrackInspection,
    onSuccess: () => {
      // Invalidate the list query to show the new record
      queryClient.invalidateQueries({ queryKey: trackKeys.lists() });
    },
  });
};

export const useUpdateTrackStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateTrackStatus,
    onSuccess: (data, variables) => {
      // 1. Invalidate the list query
      queryClient.invalidateQueries({ queryKey: trackKeys.lists() });
      queryClient.invalidateQueries({ queryKey: inspectionKeys.lists() });
      // 2. Optimistically update the single detail view
      queryClient.setQueryData(
        trackKeys.detail(variables.id),
        (oldData: any) => {
          // Assuming 'data' contains the new approved status object from the API response
          if (oldData) {
            return {
              ...oldData,
              data: {
                ...oldData.data,
                status: data.data.status,
                approverId: data.data.approverId,
                approvalDate: data.data.approvalDate,
              },
            };
          }
          return oldData;
        }
      );
    },
  });
};

export const useDeleteTrackInspection = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteTrackInspection,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: trackKeys.lists() });
      // Optionally, navigate away from the detail page if a successful delete occurs
    },
  });
};
