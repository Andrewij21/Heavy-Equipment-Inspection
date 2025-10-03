"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { UsersTable } from "@/components/tables/UserTable";
import BackButton from "@/components/BackButton";

export default function UsersPage() {
  const router = useRouter();

  // Data Pengguna Mock (Teks diubah ke Bahasa Indonesia di label/judul)
  const [users, setUsers] = useState([
    {
      id: "1",
      username: "mekanik1",
      email: "mekanik@perusahaan.com",
      fullName: "Jono Mekanik",
      role: "mechanic",
      status: "active",
      createdAt: "2024-01-10T10:00:00Z",
      lastLogin: "2024-01-15T09:30:00Z",
    },
    {
      id: "2",
      username: "leader1",
      email: "leader@perusahaan.com",
      fullName: "Ani Leader",
      role: "leader",
      status: "active",
      createdAt: "2024-01-08T14:00:00Z",
      lastLogin: "2024-01-15T11:45:00Z",
    },
    {
      id: "3",
      username: "admin1",
      email: "admin@perusahaan.com",
      fullName: "Pengguna Admin",
      role: "admin",
      status: "active",
      createdAt: "2024-01-01T08:00:00Z",
      lastLogin: "2024-01-15T08:15:00Z",
    },
    {
      id: "4",
      username: "mekanik2",
      email: "mekanik2@perusahaan.com",
      fullName: "Budi Santoso",
      role: "mechanic",
      status: "inactive",
      createdAt: "2024-01-05T12:00:00Z",
      lastLogin: "2024-01-10T16:20:00Z",
    },
    {
      id: "5",
      username: "leader2",
      email: "leader2@perusahaan.com",
      fullName: "Sari Dewi",
      role: "leader",
      status: "active",
      createdAt: "2023-12-20T09:00:00Z",
      lastLogin: "2024-01-14T13:15:00Z",
    },
  ]);

  const handleDeleteUser = (userId: string) => {
    // Menghapus pengguna dari state
    setUsers((prev) => prev.filter((user) => user.id !== userId));
  };

  const handleEditUser = (userId: string) => {
    // Navigasi ke halaman edit
    router.push(`/users/${userId}/edit`);
  };

  const handleCreateUser = () => {
    // Navigasi ke halaman buat pengguna baru
    router.push("/users/create");
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <BackButton />
        <div className="flex justify-between items-center mb-8 flex-col gap-4 sm:flex-row">
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

        <UsersTable
          data={users}
          onEditUser={handleEditUser}
          onDeleteUser={handleDeleteUser}
        />
      </main>
    </div>
  );
}
