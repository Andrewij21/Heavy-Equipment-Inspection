"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Loader2 } from "lucide-react"; // Tambahkan Loader2
import { useRouter } from "next/navigation";
import { UsersTable } from "@/components/tables/UserTable";
import BackButton from "@/components/BackButton";
import { toast } from "sonner"; // Tambahkan import toast

import { useDeleteUser, useGetUsers } from "@/queries/user";

export default function UsersPage() {
  const router = useRouter();
  const { data, isLoading, isError, refetch } = useGetUsers();
  const deleteMutation = useDeleteUser();
  const isDeleting = deleteMutation.isPending;
  const users = data?.data || [];

  const handleDeleteUser = (userId: string) => {
    const toastId = toast.loading("Menghapus pengguna...");

    // Panggil mutasi
    deleteMutation.mutate(userId, {
      onSuccess: () => {
        // queryClient.invalidateQueries sudah ditangani di hook useDeleteUser
        toast.success("Pengguna berhasil dihapus", { id: toastId });
      },
      onError: (error) => {
        console.error("Delete Error:", error);
        toast.error("Gagal menghapus pengguna", {
          id: toastId,
          description: "Terjadi kesalahan saat menghapus data.",
        });
      },
    });
  };

  const handleEditUser = (userId: string) => {
    router.push(`/users/${userId}/edit`);
  };

  const handleCreateUser = () => {
    router.push("/users/create");
  };

  // --- Tampilan Loading dan Error ---
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
        <p className="ml-3 text-lg text-gray-600">Memuat data pengguna...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-red-600 text-center mt-10">
        Kesalahan memuat data pengguna. Harap coba muat ulang halaman.
      </div>
    );
  }
  // ---------------------------------

  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <BackButton />
        <div className="flex justify-between items-start sm:items-center mb-8 flex-col gap-4 sm:flex-row">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Manajemen Pengguna
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Kelola pengguna sistem dan hak akses mereka
            </p>
          </div>
          <Button onClick={handleCreateUser} className="self-end">
            <Plus className="w-4 h-4 mr-2" />
            Tambah Pengguna
          </Button>
        </div>

        {/* 3. Gunakan data yang sudah dimuat */}
        <UsersTable
          data={users}
          onEditUser={handleEditUser}
          onDeleteUser={handleDeleteUser}
          isDeleting={isDeleting}
        />
      </main>
    </div>
  );
}
