// src/queries/support.ts

import { apiClient } from "@/lib/api";
import type { ApiResponse } from "@/lib/type";
import type { SupportInspection } from "@/schemas/supportSchema"; // Import tipe dari skema Wheel
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { inspectionKeys } from "./inspection"; // Menggunakan key inspeksi umum

// Definisikan tipe untuk data yang dikembalikan setelah pembuatan
interface WheelInspectionResponse {
  id: string;
  equipmentId: string;
}

// --- KEYS ---
export const supportKeys = {
  all: ["supports"] as const,
  // Anda bisa menambahkan key untuk list atau detail support inspection jika diperlukan
};

// --- API FUNCTION ---
const createSupportInspection = async (
  data: SupportInspection
): Promise<ApiResponse<WheelInspectionResponse>> => {
  // Panggil endpoint POST /api/v1/wheels
  // Endpoint ini sudah kita definisikan di support.route.ts
  return await apiClient.post("/supports", data);
};

// --- REACT QUERY HOOK ---
export const useCreateSupportInspection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createSupportInspection,
    onSuccess: () => {
      // Setelah sukses membuat inspeksi support, kita invalidasi cache:

      // 1. Invalidasi daftar umum (agar tabel Verifikasi/Dashboard terupdate)
      queryClient.invalidateQueries({ queryKey: inspectionKeys.all });

      // 2. Invalidasi daftar khusus Wheel (jika Anda memiliki daftar Wheel terpisah)
      queryClient.invalidateQueries({ queryKey: supportKeys.all });
    },
    // Anda bisa menambahkan onError di sini untuk penanganan error global
  });
};
