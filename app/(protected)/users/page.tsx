"use client";

import { useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button"; // 1. Impor buttonVariants
import { Plus, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { UsersTable } from "@/components/tables/UserTable";
import BackButton from "@/components/BackButton";
import { toast } from "sonner";

// 2. Impor komponen AlertDialog
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { useDeleteUser, useGetUsers } from "@/queries/user";

export default function UsersPage() {
  const router = useRouter();
  const { data, isLoading, isError } = useGetUsers();
  const deleteMutation = useDeleteUser();
  const isDeleting = deleteMutation.isPending;
  const users = data?.data || [];

  // 3. State untuk mengontrol dialog dan menyimpan ID pengguna yang akan dihapus
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [userToDeleteId, setUserToDeleteId] = useState<string | null>(null);

  // 4. Modifikasi handler untuk HANYA MENGGUNAKAN ID dari state
  const handleDeleteUser = () => {
    if (!userToDeleteId) return; // Pengaman jika ID tidak ada

    const toastId = toast.loading("Menghapus pengguna...");

    deleteMutation.mutate(userToDeleteId, {
      onSuccess: () => {
        toast.success("Pengguna berhasil dihapus", { id: toastId });
      },
      onError: (error) => {
        console.error("Delete Error:", error);
        toast.error("Gagal menghapus pengguna", {
          id: toastId,
          description: "Terjadi kesalahan saat menghapus data.",
        });
      },
      // 5. Tutup dialog setelah selesai, baik sukses maupun gagal
      onSettled: () => {
        setIsAlertOpen(false);
        setUserToDeleteId(null); // Bersihkan ID setelah selesai
      },
    });
  };

  // 6. Buat fungsi baru untuk MEMICU dialog
  const promptDeleteUser = (userId: string) => {
    setUserToDeleteId(userId); // Simpan ID pengguna yang akan dihapus
    setIsAlertOpen(true); // Buka dialog
  };

  const handleEditUser = (userId: string) => {
    router.push(`/users/${userId}/edit`);
  };

  const handleCreateUser = () => {
    router.push("/users/create");
  };

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

  return (
    <div className="min-h-screen py-6">
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

      {/* 7. Kirim fungsi `promptDeleteUser` ke tabel */}
      <UsersTable
        data={users}
        onEditUser={handleEditUser}
        onDeleteUser={promptDeleteUser}
        isDeleting={isDeleting}
      />

      {/* 8. Tambahkan komponen AlertDialog di sini */}
      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Anda yakin ingin melanjutkan?</AlertDialogTitle>
            <AlertDialogDescription>
              Tindakan ini akan menandai pengguna sebagai **nonaktif**. Mereka
              tidak akan bisa login kembali, namun data historis seperti
              inspeksi akan tetap tersimpan.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Batal</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteUser}
              disabled={isDeleting}
              className={buttonVariants({ variant: "destructive" })}
            >
              {isDeleting ? "Menghapus..." : "Ya, Hapus Pengguna"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
