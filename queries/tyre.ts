import { apiClient } from "@/lib/api";
import type { ApiResponse } from "@/lib/type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { inspectionKeys } from "./inspection"; // Menggunakan key inspeksi umum
import type { TyreInspection } from "@/schemas/tyreSchema";

export const tyreKeys = {
  all: ["tires"] as const,
};

const createTyreInspection = async (
  data: TyreInspection
): Promise<ApiResponse<TyreInspection>> => {
  return await apiClient.post("/tires", data);
};

// --- REACT QUERY HOOK ---
export const useCreateTyreInspection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTyreInspection,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: inspectionKeys.all });
      queryClient.invalidateQueries({ queryKey: tyreKeys.all });
    },
  });
};
