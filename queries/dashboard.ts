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
interface DashboardSummaryResponse {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
  approvalRate: number;
  user: number; // Ditambahkan untuk Leader
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
const getDashboardSummary = async (
  params: Record<string, any>
): Promise<ApiResponse<DashboardSummaryResponse>> => {
  return await apiClient.get("/dashboard/summary", params);
};

// --- REACT QUERY HOOK BARU ---
export const useDashboardStats = () => {
  return useQuery({
    queryKey: inspectionKeys.stats,
    queryFn: getDashboardStats,
  });
};

export const useDashboardSummary = (params: {
  dateFrom?: string;
  dateTo?: string;
}) => {
  return useQuery({
    // Gunakan query key yang berbeda untuk memisahkannya dari data tabel
    queryKey: inspectionKeys.lists({ ...params, scope: "summary" }),
    queryFn: () => getDashboardSummary(params),
    // Data ini tidak perlu placeholder karena biasanya dimuat di latar belakang
  });
};
