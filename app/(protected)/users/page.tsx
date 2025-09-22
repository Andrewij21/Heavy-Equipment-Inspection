"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Users,
  UserCheck,
  UserX,
} from "lucide-react";
import Link from "next/link";

export default function UsersPage() {
  // Mock data - replace with real data from API
  const mockUsers = [
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
  ];

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-red-100 text-red-800";
      case "leader":
        return "bg-blue-100 text-blue-800";
      case "mechanic":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const activeUsers = mockUsers.filter((u) => u.status === "active").length;
  const totalUsers = mockUsers.length;

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                User Management
              </h1>
              <p className="mt-1 text-sm text-gray-600">
                Manage system users and their permissions
              </p>
            </div>
            <Link href="/users/create">
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add User
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-3 mb-6">
          <Card className="gap-4">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalUsers}</div>
              <p className="text-xs text-muted-foreground">
                Registered in system
              </p>
            </CardContent>
          </Card>
          <Card className="gap-4">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium">
                Active Users
              </CardTitle>
              <UserCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeUsers}</div>
              <p className="text-xs text-muted-foreground">Currently active</p>
            </CardContent>
          </Card>
          <Card className="gap-4">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium">
                Inactive Users
              </CardTitle>
              <UserX className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {totalUsers - activeUsers}
              </div>
              <p className="text-xs text-muted-foreground">
                Deactivated accounts
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search users..." className="pl-10" />
              </div>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="leader">Leader</SelectItem>
                  <SelectItem value="mechanic">Mechanic</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">Apply Filters</Button>
            </div>
          </CardContent>
        </Card>

        {/* Users List */}
        <div className="space-y-4">
          {mockUsers.map((user) => (
            <Card key={user.id}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4">
                      <div>
                        <h3 className="text-lg font-semibold">
                          {user.fullName}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          @{user.username}
                        </p>
                      </div>
                      <Badge className={getRoleColor(user.role)}>
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </Badge>
                      <Badge className={getStatusColor(user.status)}>
                        {user.status.charAt(0).toUpperCase() +
                          user.status.slice(1)}
                      </Badge>
                    </div>
                    <div className="mt-2 flex items-center space-x-6 text-sm text-muted-foreground">
                      <span>📧 {user.email}</span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-600 hover:text-red-700 bg-transparent"
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
