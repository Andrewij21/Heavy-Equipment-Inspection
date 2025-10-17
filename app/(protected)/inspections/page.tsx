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
import { Plus, Search, Eye, Clock, FilterX } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import BackButton from "@/components/BackButton";
import { useAuth } from "@/context/AuthContext";
import { useMemo, useState, useEffect } from "react";
import { useGetGeneralInspections } from "@/queries/inspection";
import clsx from "clsx";
import { formatDate, getEquipmentTypeLabel, getStatusColor } from "@/lib/utils";
import { useDebounce } from "@/hooks/useDebounce";

export default function InspectionsPage() {
  const { user } = useAuth();
  const userRole = user?.role;
  const currentUserId = user?.id;
  const router = useRouter();

  // State untuk filter
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  // Debounce search term untuk performa
  const debouncedSearchTerm = useDebounce(searchTerm, 500); // Tunggu 500ms setelah user berhenti mengetik
  // 2. State untuk Paginasi
  const [page, setPage] = useState(1);
  const LIMIT = 10; // Jumlah item per halaman

  useEffect(() => {
    setPage(1);
  }, [debouncedSearchTerm, selectedType, selectedStatus, dateFrom, dateTo]);

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
    // Tambahkan parameter tanggal jika ada nilainya
    if (dateFrom) {
      params.dateFrom = dateFrom;
    }
    if (dateTo) {
      params.dateTo = dateTo;
    }

    return params;
  }, [
    userRole,
    currentUserId,
    debouncedSearchTerm,
    selectedType,
    selectedStatus,
    dateFrom, // Tambahkan sebagai dependency
    dateTo, // Tambahkan sebagai dependency
    page,
  ]);

  const {
    data: apiResponse,
    isLoading,
    isError,
  } = useGetGeneralInspections(queryParams);
  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedType("all");
    setSelectedStatus("all");
    setDateFrom("");
    setDateTo("");
  };
  const inspections = apiResponse?.data || [];
  const totalCount = apiResponse?.count || 0;
  const totalPages = Math.ceil(totalCount / LIMIT);

  return (
    <div className="min-h-screen py-6">
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:justify-between items-start gap-4 sm:items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Inspeksi Saya</h1>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 items-end">
            <div className="relative lg:col-span-2">
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
                <SelectItem value="tyre">Tyre</SelectItem>
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

            {/* 7. Tambahkan input tanggal */}
            <Input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              aria-label="From date"
            />
            <Input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              aria-label="To date"
            />
          </div>
          {/* 8. Tambahkan tombol Clear Filters */}
          <div className="mt-4 flex justify-end">
            <Button variant="ghost" onClick={handleClearFilters}>
              <FilterX className="w-4 h-4 mr-2" />
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>
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
        {totalPages > 1 && (
          <div className="mt-8 flex items-center justify-between">
            <p className="text-sm text-muted-foreground mt-2 w-full">
              Page {page} of {totalPages}
            </p>
            <Pagination className="justify-end">
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
          </div>
        )}
      </div>
    </div>
  );
}
