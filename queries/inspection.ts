// src/lib/api/inspection.ts
import { apiClient } from "@/lib/api";
import type { ApiResponse } from "@/lib/type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Define the shape of the data returned by the general list API
// This will include base fields + the nested approver details
interface InspectionListItem {
  id: string;
  equipmentId: string;
  equipmentType: "track" | "wheel" | "support";
  equipmentGeneralType: string;
  location: string;
  mechanicName: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  createdAt: string;
  approver?: {
    username: string;
    id: string;
  };
}
interface StatusUpdatePayload {
  status: "APPROVED" | "REJECTED";
  comments: string;
}
// --- KEYS ---
export const inspectionKeys = {
  all: ["inspections"] as const,
  lists: (params: Record<string, any> = {}) =>
    [...inspectionKeys.all, "list", params] as const,
  detail: (id: string) => [...inspectionKeys.all, "detail", id] as const,
};

// --- API FUNCTION ---
const getGeneralInspections = async (
  params: Record<string, any>
): Promise<ApiResponse<InspectionListItem[]>> => {
  // Calls the new general API endpoint for all inspection types
  return await apiClient.get("/inspections", params);
};

const getInspectionById = async (id: string): Promise<ApiResponse<any>> => {
  if (!id) throw new Error("Inspection ID is required");
  return await apiClient.get(`/inspections/${id}`);
};

const updateInspectionStatus = async ({
  id,
  statusData,
}: {
  id: string;
  statusData: StatusUpdatePayload;
}): Promise<ApiResponse<any>> => {
  // Uses the dedicated status route: PATCH /tracks/:id/status
  return await apiClient.patch(`/inspections/${id}/status`, statusData);
};

const deleteInspection = async (
  inspectionId: string
): Promise<ApiResponse<InspectionListItem[]>> => {
  return await apiClient.delete(`/inspections/${inspectionId}`);
};
// --- REACT QUERY HOOK ---
export const useGetGeneralInspections = (params: Record<string, any> = {}) => {
  return useQuery({
    queryKey: inspectionKeys.lists(params),
    queryFn: () => getGeneralInspections(params),
    placeholderData: (previousData) => previousData, // Keep previous data visible while fetching
  });
};

export const useGetInspection = (id: string) => {
  return useQuery({
    queryKey: inspectionKeys.detail(id),
    queryFn: () => getInspectionById(id),
    enabled: !!id, // Only run the query if the ID is available
  });
};

export const useUpdateInspectionStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateInspectionStatus,
    onSuccess: (data, variables) => {
      // 1. Invalidate the list query
      queryClient.invalidateQueries({ queryKey: inspectionKeys.lists() });
      queryClient.invalidateQueries({ queryKey: inspectionKeys.lists() });
      // 2. Optimistically update the single detail view
      queryClient.setQueryData(
        inspectionKeys.detail(variables.id),
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

export const useDeleteInspection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (inspectionId: string) => deleteInspection(inspectionId),
    onSuccess: () => {
      // Invalidate semua query list inspeksi agar UI otomatis diperbarui
      queryClient.invalidateQueries({ queryKey: inspectionKeys.lists() });
    },
    // Penanganan error akan kita lakukan di komponen dengan toast
  });
};
