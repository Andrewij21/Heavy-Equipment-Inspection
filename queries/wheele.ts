// src/queries/wheel.ts

import { apiClient } from "@/lib/api";
import type { ApiResponse } from "@/lib/type";
import type { WheelInspection } from "@/schemas/wheelSchema"; // Import tipe dari skema Wheel
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { inspectionKeys } from "./inspection"; // Menggunakan key inspeksi umum

// Definisikan tipe untuk data yang dikembalikan setelah pembuatan
interface WheelInspectionResponse {
  id: string;
  equipmentId: string;
}

// --- KEYS ---
export const wheelKeys = {
  all: ["wheels"] as const,
  // Anda bisa menambahkan key untuk list atau detail wheel inspection jika diperlukan
};

// --- API FUNCTION ---
const createWheelInspection = async (
  data: WheelInspection
): Promise<ApiResponse<WheelInspectionResponse>> => {
  // Panggil endpoint POST /api/v1/wheels
  // Endpoint ini sudah kita definisikan di wheel.route.ts
  return await apiClient.post("/wheels", data);
};

// --- REACT QUERY HOOK ---
export const useCreateWheelInspection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createWheelInspection,
    onSuccess: () => {
      // Setelah sukses membuat inspeksi wheel, kita invalidasi cache:

      // 1. Invalidasi daftar umum (agar tabel Verifikasi/Dashboard terupdate)
      queryClient.invalidateQueries({ queryKey: inspectionKeys.all });

      // 2. Invalidasi daftar khusus Wheel (jika Anda memiliki daftar Wheel terpisah)
      queryClient.invalidateQueries({ queryKey: wheelKeys.all });
    },
    // Anda bisa menambahkan onError di sini untuk penanganan error global
  });
};
