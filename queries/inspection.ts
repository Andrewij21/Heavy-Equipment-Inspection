// src/lib/api/inspection.ts
import { apiClient } from "@/lib/api";
import type { ApiResponse } from "@/lib/type";
import { useQuery } from "@tanstack/react-query";

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

// --- KEYS ---
export const inspectionKeys = {
  all: ["inspections"] as const,
  lists: (params: Record<string, any> = {}) =>
    [...inspectionKeys.all, "list", params] as const,
};

// --- API FUNCTION ---
const getGeneralInspections = async (
  params: Record<string, any>
): Promise<ApiResponse<InspectionListItem[]>> => {
  // Calls the new general API endpoint for all inspection types
  return await apiClient.get("/inspections");
};

// --- REACT QUERY HOOK ---
export const useGetGeneralInspections = (params: Record<string, any> = {}) => {
  return useQuery({
    queryKey: inspectionKeys.lists(params),
    queryFn: () => getGeneralInspections(params),
    placeholderData: (previousData) => previousData, // Keep previous data visible while fetching
  });
};
