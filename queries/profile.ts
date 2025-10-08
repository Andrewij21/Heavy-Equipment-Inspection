// src/queries/profile.ts

import { apiClient } from "@/lib/api";
import type { ApiResponse } from "@/lib/type";
import type { User, UpdateUserSchema } from "@/schemas/userSchema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Definisikan tipe untuk data yang dikembalikan oleh endpoint GET /profile
// Kita asumsikan endpoint ini mengembalikan objek User yang sudah difilter (tanpa password)
interface ProfileData extends Omit<User, "password"> {}

// --- KEYS ---
export const profileKeys = {
  detail: ["profileDetail"] as const,
};

// --- API FUNCTIONS ---
const getProfile = async (): Promise<ApiResponse<ProfileData>> => {
  // Memanggil endpoint GET /api/v1/profile
  return await apiClient.get("/profile");
};

const updateProfile = async (
  userData: UpdateUserSchema
): Promise<ApiResponse<ProfileData>> => {
  // Memanggil endpoint PATCH /api/v1/profile
  return await apiClient.patch("/profile", userData);
};

// --- REACT QUERY HOOKS ---

export const useGetProfile = () => {
  return useQuery({
    queryKey: profileKeys.detail,
    queryFn: getProfile,
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateProfile,
    onSuccess: (response) => {
      // Invalidate queries agar halaman profile me-refetch data baru
      queryClient.invalidateQueries({ queryKey: profileKeys.detail });

      // Opsional: Set data baru secara langsung ke cache
      queryClient.setQueryData(profileKeys.detail, response);
    },
  });
};
