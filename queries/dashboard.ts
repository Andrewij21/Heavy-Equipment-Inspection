// src/lib/api/inspection.ts

import { apiClient } from "@/lib/api";
import type { ApiResponse } from "@/lib/type";
import { useQuery } from "@tanstack/react-query";

// ... (Imports dan InspectionListItem interface tetap sama)

// Definisikan Interface untuk Response Statistik
interface DashboardStatsResponse {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
  reviewedToday?: number; // Ditambahkan untuk Leader
  // ... field agregasi lainnya jika ada
}

// --- KEYS ---
export const inspectionKeys = {
  all: ["inspections"] as const,
  lists: (params: Record<string, any> = {}) =>
    [...inspectionKeys.all, "list", params] as const,
  stats: ["dashboardStats"] as const,
};

// ... (getGeneralInspections dan useGetGeneralInspections tetap sama)

// --- API FUNCTION ---
const getDashboardStats = async (): Promise<
  ApiResponse<DashboardStatsResponse>
> => {
  return await apiClient.get("/dashboard/stats");
};

// --- REACT QUERY HOOK BARU ---
export const useDashboardStats = () => {
  return useQuery({
    queryKey: inspectionKeys.stats,
    queryFn: getDashboardStats,
  });
};
