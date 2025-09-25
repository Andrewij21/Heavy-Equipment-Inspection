"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { UsersTable } from "@/components/tables/UserTable";

export default function UsersPage() {
  const router = useRouter();

  const [users, setUsers] = useState([
    {
      id: "1",
      username: "mechanic1",
      email: "mechanic@company.com",
      fullName: "John Mechanic",
      role: "mechanic",
      status: "active",
      createdAt: "2024-01-10T10:00:00Z",
      lastLogin: "2024-01-15T09:30:00Z",
    },
    {
      id: "2",
      username: "leader1",
      email: "leader@company.com",
      fullName: "Jane Leader",
      role: "leader",
      status: "active",
      createdAt: "2024-01-08T14:00:00Z",
      lastLogin: "2024-01-15T11:45:00Z",
    },
    {
      id: "3",
      username: "admin1",
      email: "admin@company.com",
      fullName: "Admin User",
      role: "admin",
      status: "active",
      createdAt: "2024-01-01T08:00:00Z",
      lastLogin: "2024-01-15T08:15:00Z",
    },
    {
      id: "4",
      username: "mechanic2",
      email: "mechanic2@company.com",
      fullName: "Mike Davis",
      role: "mechanic",
      status: "inactive",
      createdAt: "2024-01-05T12:00:00Z",
      lastLogin: "2024-01-10T16:20:00Z",
    },
    {
      id: "5",
      username: "leader2",
      email: "leader2@company.com",
      fullName: "Sarah Brown",
      role: "leader",
      status: "active",
      createdAt: "2023-12-20T09:00:00Z",
      lastLogin: "2024-01-14T13:15:00Z",
    },
  ]);

  const handleDeleteUser = (userId: string) => {
    setUsers((prev) => prev.filter((user) => user.id !== userId));
  };

  const handleEditUser = (userId: string) => {
    router.push(`/users/${userId}/edit`);
  };

  const handleCreateUser = () => {
    router.push("/users/create");
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                User Management
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Manage system users and their permissions
              </p>
            </div>
            <Button onClick={handleCreateUser}>
              <Plus className="w-4 h-4 mr-2" />
              Add User
            </Button>
          </div>
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
