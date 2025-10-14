"use client";

import { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Search,
  Filter,
  MoreHorizontal,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Edit,
  Trash2,
  Users,
  UserCheck,
  UserX,
} from "lucide-react";
import type { User } from "@/schemas/userSchema";
import { formatDate, getRoleColor } from "@/lib/utils";
import clsx from "clsx";

interface UsersTableProps {
  data: User[];
  onEditUser: (userId: string) => void;
  onDeleteUser: (userId: string) => void;
  isDeleting: boolean;
}

type SortField = keyof User;
type SortDirection = "asc" | "desc";

export function UsersTable({
  data,
  onEditUser,
  onDeleteUser,
  isDeleting,
}: UsersTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortField, setSortField] = useState<SortField>("createdAt");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return <ArrowUpDown className="w-4 h-4" />;
    }
    return sortDirection === "asc" ? (
      <ArrowUp className="w-4 h-4" />
    ) : (
      <ArrowDown className="w-4 h-4" />
    );
  };

  const filteredAndSortedData = useMemo(() => {
    const filtered = data.filter((user) => {
      // Filter Pencarian
      const matchesSearch =
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase());

      // Filter Peran (Role)
      const matchesRole = roleFilter === "all" || user.role === roleFilter;

      // Filter Status
      const matchesStatus =
        statusFilter === "all" || user.role === statusFilter;

      return matchesSearch && matchesRole && matchesStatus;
    });

    // Urutkan data
    filtered.sort((a, b) => {
      let aValue = a[sortField] as any;
      let bValue = b[sortField] as any;

      // Penanganan pengurutan tanggal
      if (sortField === "createdAt") {
        aValue = new Date(aValue as string).getTime();
        bValue = new Date(bValue as string).getTime();
      }

      // Penanganan pengurutan string
      if (typeof aValue === "string" && typeof bValue === "string") {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (aValue < bValue) {
        return sortDirection === "asc" ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortDirection === "asc" ? 1 : -1;
      }
      return 0;
    });

    return filtered;
  }, [data, searchTerm, roleFilter, statusFilter, sortField, sortDirection]);

  const clearFilters = () => {
    setSearchTerm("");
    setRoleFilter("all");
    setStatusFilter("all");
  };

  // Perhitungan Statistik
  const totalUsers = data.length;
  // const activeUsers = data.filter((u) => u.status === "active").length;
  const filteredCount = filteredAndSortedData.length;

  return (
    <div className="space-y-4">
      {/* Statistik */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 gap-2">
            <CardTitle className="text-sm font-medium">
              Total Pengguna
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUsers}</div>
            <p className="text-xs text-muted-foreground">Terdaftar di sistem</p>
          </CardContent>
        </Card>
        {/* <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 gap-2">
            <CardTitle className="text-sm font-medium">
              Pengguna Aktif
            </CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeUsers}</div>
            <p className="text-xs text-muted-foreground">Saat ini aktif</p>
          </CardContent>
        </Card> */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 gap-2">
            <CardTitle className="text-sm font-medium">Hasil Filter</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{filteredCount}</div>
            <p className="text-xs text-muted-foreground">
              Sesuai dengan filter saat ini
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filter</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 flex-wrap">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Cari pengguna..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-full sm:w-[140px]">
                <SelectValue placeholder="Peran" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="leader">Leader</SelectItem>
                <SelectItem value="mechanic">Mechanic</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={clearFilters}>
              <Filter className="w-4 h-4 mr-2" />
              Clear Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tabel */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("username")}
                    className="h-auto font-semibold"
                  >
                    Nama
                    {getSortIcon("username")}
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("email")}
                    className="h-auto font-semibold"
                  >
                    Email
                    {getSortIcon("email")}
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("role")}
                    className="h-auto font-semibold"
                  >
                    Peran
                    {getSortIcon("role")}
                  </Button>
                </TableHead>
                {/* <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("status")}
                    className="h-auto font-semibold"
                  >
                    Status
                    {getSortIcon("status")}
                  </Button>
                </TableHead> */}
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("createdAt")}
                    className="h-auto font-semibold"
                  >
                    Bergabung
                    {getSortIcon("createdAt")}
                  </Button>
                </TableHead>
                <TableHead className="">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAndSortedData.map((user) => (
                <TableRow key={user.id} className="hover:bg-muted/50">
                  <TableCell className="font-medium px-5">
                    {user.username}
                  </TableCell>
                  <TableCell className="text-muted-foreground px-5">
                    {user.email}
                  </TableCell>
                  <TableCell>
                    <Badge className={clsx(getRoleColor(user.role), "px-5")}>
                      {/* Kapitalisasi huruf pertama */}
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </Badge>
                  </TableCell>
                  {/* <TableCell>
                    <Badge className={getStatusColor(user.status)}>
                      {user.status.charAt(0).toUpperCase() +
                        user.status.slice(1)}
                    </Badge>
                  </TableCell> */}
                  <TableCell className="text-sm text-muted-foreground px-5">
                    {formatDate(user.createdAt)}
                  </TableCell>
                  <TableCell className="">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          disabled={isDeleting}
                          className="h-8 w-8 p-0"
                        >
                          <span className="sr-only">Buka menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => onEditUser(user.id)}>
                          <Edit className="w-4 h-4 mr-2" />
                          Edit Pengguna
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => onDeleteUser(user.id)}
                          className="text-destructive"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Hapus Pengguna
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {filteredAndSortedData.length === 0 && (
            <div className="text-center py-12">
              <Users className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium">
                Tidak ada pengguna ditemukan
              </h3>
              <p className="text-sm text-muted-foreground">
                Tidak ada pengguna yang cocok dengan kriteria pencarian Anda
                saat ini. Coba sesuaikan filter Anda.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
