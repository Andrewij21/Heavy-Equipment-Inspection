"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import { Plus, Search, Eye, Clock } from "lucide-react"; // Tombol Filter dihapus
import Link from "next/link";
import { useRouter } from "next/navigation";
import BackButton from "@/components/BackButton";
import { useAuth } from "@/context/AuthContext";
import { useMemo, useState, useEffect } from "react"; // Impor useEffect
import { useGetGeneralInspections } from "@/queries/inspection";
import clsx from "clsx";

// Hook sederhana untuk debounce
function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

interface Inspection {
  id: string;
  equipmentId: string;
  equipmentType: "track" | "wheel" | "support";
  mechanicName: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  createdAt: string;
  issues?: number;
}

export default function InspectionsPage() {
  const { user } = useAuth();
  const userRole = user?.role;
  const currentUserId = user?.id;
  const router = useRouter();

  // State untuk filter
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  // Debounce search term untuk performa
  const debouncedSearchTerm = useDebounce(searchTerm, 500); // Tunggu 500ms setelah user berhenti mengetik
  // 2. State untuk Paginasi
  const [page, setPage] = useState(1);
  const LIMIT = 10; // Jumlah item per halaman

  // 3. UX Tambahan: Reset ke halaman 1 setiap kali filter berubah
  useEffect(() => {
    setPage(1);
  }, [debouncedSearchTerm, selectedType, selectedStatus]);

  // 4. Tambahkan `page` dan `limit` ke parameter API
  const queryParams = useMemo(() => {
    const params: Record<string, any> = {
      orderBy: "createdAt_desc",
      page: page,
      limit: LIMIT,
    };

    if (userRole === "mechanic" && currentUserId) {
      params.mechanicId = currentUserId;
    }

    if (debouncedSearchTerm) {
      params.q = debouncedSearchTerm;
    }
    if (selectedType !== "all") {
      params.equipmentType = selectedType;
    }
    if (selectedStatus !== "all") {
      params.status = selectedStatus;
    }

    return params;
  }, [
    userRole,
    currentUserId,
    debouncedSearchTerm,
    selectedType,
    selectedStatus,
    page, // Tambahkan `page` sebagai dependency
  ]);

  const {
    data: apiResponse,
    isLoading,
    isError,
  } = useGetGeneralInspections(queryParams);
  // 5. Ekstrak data dan total hitungan dari respons API
  const inspections: Inspection[] = apiResponse?.data || [];
  const totalCount = apiResponse?.count || 0;
  const totalPages = Math.ceil(totalCount / LIMIT);
  // const inspections: Inspection[] = apiResponse?.data || [];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "APPROVED":
        return "bg-green-100 text-green-800";
      case "REJECTED":
        return "bg-red-100 text-red-800";
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getEquipmentTypeLabel = (type: string) => {
    switch (type) {
      case "track":
        return "Peralatan Track";
      case "wheel":
        return "Peralatan Roda";
      case "support":
        return "Peralatan Pendukung";
      default:
        return type;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <BackButton />
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:justify-between items-start gap-4 sm:items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Inspeksi Saya
              </h1>
              <p className="mt-1 text-sm text-gray-600">
                Lihat dan kelola inspeksi peralatan Anda
              </p>
            </div>
            <Link href="/inspections/new" className="self-end">
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Inspeksi Baru
              </Button>
            </Link>
          </div>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Filter</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative md:col-span-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search Equipment ID..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Equipment Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="track">Track Equipment</SelectItem>
                  <SelectItem value="wheel">Wheel Equipment</SelectItem>
                  <SelectItem value="support">Support Equipment</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="PENDING">Pending</SelectItem>
                  <SelectItem value="APPROVED">Approved</SelectItem>
                  <SelectItem value="REJECTED">Rejected</SelectItem>
                </SelectContent>
              </Select>

              {/* Tombol Apply Filters dihapus */}
            </div>
          </CardContent>
        </Card>

        {/* ... sisa kode JSX ... */}
        <div className="space-y-4">
          {isLoading && <p>Loading inspections...</p>}
          {isError && <p>Failed to load inspections.</p>}
          {!isLoading && !isError && inspections.length === 0 && (
            <div className="text-center py-6 text-muted-foreground">
              <Clock className="w-6 h-6 mx-auto mb-2" />
              Tidak ada inspeksi ditemukan.
            </div>
          )}
          {!isLoading &&
            !isError &&
            inspections.map((inspection) => (
              <div
                key={inspection.id}
                className="flex items-center justify-between p-4 border rounded-lg bg-white"
              >
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <div>
                      <p className="font-medium">{inspection.equipmentId}</p>
                      <p className="text-sm text-muted-foreground">
                        {getEquipmentTypeLabel(inspection.equipmentType)}
                      </p>
                    </div>
                    <Badge
                      className={clsx(
                        getStatusColor(inspection.status),
                        "self-start"
                      )}
                    >
                      {inspection.status}
                    </Badge>
                  </div>
                  <div className="mt-2 flex items-center space-x-4 text-sm text-muted-foreground">
                    <span>📅 {formatDate(inspection.createdAt)}</span>
                    <span className="ml-4">👤 {inspection.mechanicName}</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      router.push(
                        userRole === "leader"
                          ? `/verification/${inspection.id}`
                          : `/inspections/${inspection.id}`
                      )
                    }
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    {userRole === "leader" ? "Tinjau" : "Lihat"}
                  </Button>
                </div>
              </div>
            ))}
          {/* 6. Tambahkan Komponen Paginasi di bagian bawah */}
          {totalPages > 1 && (
            <div className="mt-8">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setPage((prev) => Math.max(1, prev - 1));
                      }}
                      aria-disabled={page === 1}
                      className={
                        page === 1 ? "pointer-events-none opacity-50" : ""
                      }
                    />
                  </PaginationItem>

                  {/* Logika sederhana untuk menampilkan nomor halaman */}
                  <PaginationItem>
                    <PaginationLink href="#" isActive>
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                  {page < totalPages && (
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                  )}

                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setPage((prev) => Math.min(totalPages, prev + 1));
                      }}
                      aria-disabled={page === totalPages}
                      className={
                        page === totalPages
                          ? "pointer-events-none opacity-50"
                          : ""
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
              <p className="text-center text-sm text-muted-foreground mt-2">
                Page {page} of {totalPages}
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
