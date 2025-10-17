"use client";
import { useState, useMemo, useEffect } from "react"; // 1. Impor useEffect
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button, buttonVariants } from "@/components/ui/button";
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
// 2. Impor komponen Paginasi
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
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
  Eye,
  Search,
  Filter,
  Clock,
  CheckCircle,
  XCircle,
  MoreHorizontal,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Loader2,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import {
  useDeleteInspection,
  useUpdateInspectionStatus,
} from "@/queries/inspection";
import { toast } from "sonner";
import {
  formatDate,
  getEquipmentTypeLabel,
  getStatusColor,
  normalizeStatus,
} from "@/lib/utils";

interface PendingInspection {
  id: string;
  equipmentId: string;
  equipmentType: "track" | "wheel" | "support";
  mechanicName: string;
  leaderName: string;
  status:
    | "PENDING"
    | "APPROVED"
    | "REJECTED"
    | "pending"
    | "approved"
    | "rejected";
  createdAt: string;
  location: string;
  priority: "low" | "medium" | "high";
  issues: number;
}

interface VerificationTableProps {
  data: PendingInspection[];
  statusFilter?: string;
  role: string;
}

type SortField = keyof PendingInspection;
type SortDirection = "asc" | "desc";

export function VerificationTable({
  role,
  data,
  statusFilter = "all",
}: VerificationTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [equipmentTypeFilter, setEquipmentTypeFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [sortField, setSortField] = useState<SortField>("createdAt");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [inspectionToDelete, setInspectionToDelete] = useState<any>(null);
  const ITEMS_PER_PAGE = 10; // Tentukan jumlah item per halaman
  // BARU: Inisialisasi hook mutasi track spesifik
  const updateStatusMutation = useUpdateInspectionStatus();
  useEffect(() => {
    setCurrentPage(1);
  }, [
    searchTerm,
    equipmentTypeFilter,
    priorityFilter,
    sortField,
    sortDirection,
    statusFilter,
  ]);
  const deleteMutation = useDeleteInspection();
  const isDeleting = deleteMutation.isPending;

  const handleOpenDeleteDialog = (inspection: PendingInspection) => {
    setInspectionToDelete(inspection);
    setIsDeleteDialogOpen(true);
  };
  const getStatusIcon = (status: string): React.ReactNode => {
    switch (normalizeStatus(status)) {
      case "APPROVED":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "REJECTED":
        return <XCircle className="w-4 h-4 text-red-600" />;
      case "PENDING":
      default:
        return <Clock className="w-4 h-4 text-yellow-600" />;
    }
  };
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };
  const handleConfirmDelete = () => {
    if (!inspectionToDelete) return;

    const toastId = toast.loading("Menghapus inspeksi...");

    deleteMutation.mutate(inspectionToDelete.id, {
      onSuccess: () => {
        toast.success("Inspeksi berhasil dihapus.", { id: toastId });
      },
      onError: (error) => {
        toast.error("Gagal menghapus inspeksi.", {
          id: toastId,
          description: "Silakan coba lagi.",
        });
        console.error("Delete failed:", error);
      },
      onSettled: () => {
        // Tutup dialog dan reset state setelah selesai
        setIsDeleteDialogOpen(false);
        setInspectionToDelete(null);
      },
    });
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
    // ... (Logika Filtering dan Sorting tetap sama) ...
    const filtered = data.filter((inspection) => {
      // Filter Status
      const matchesStatus =
        statusFilter === "all" ||
        normalizeStatus(inspection.status) === normalizeStatus(statusFilter);

      // Filter Pencarian
      const matchesSearch =
        inspection.equipmentId
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        inspection.mechanicName
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        inspection.location.toLowerCase().includes(searchTerm.toLowerCase());

      // Filter Tipe Peralatan
      const matchesEquipmentType =
        equipmentTypeFilter === "all" ||
        inspection.equipmentType === equipmentTypeFilter;

      // Filter Prioritas
      const matchesPriority =
        priorityFilter === "all" || inspection.priority === priorityFilter;

      return (
        matchesStatus &&
        matchesSearch &&
        matchesEquipmentType &&
        matchesPriority
      );
    });

    // Urutkan data
    filtered.sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];

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
  }, [
    data,
    statusFilter,
    searchTerm,
    equipmentTypeFilter,
    priorityFilter,
    sortField,
    sortDirection,
  ]);

  const totalPages = Math.ceil(filteredAndSortedData.length / ITEMS_PER_PAGE);
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredAndSortedData.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredAndSortedData, currentPage]);

  const clearFilters = () => {
    setSearchTerm("");
    setEquipmentTypeFilter("all");
    setPriorityFilter("all");
  };

  // DIPERBARUI: Tangani Aksi Persetujuan/Penolakan dengan panggilan API kondisional
  const handleStatusAction = (
    id: string,
    status: "APPROVED" | "REJECTED",
    equipmentType: "track" | "wheel" | "support" // Gunakan tipe secara eksplisit
  ) => {
    const actionText = status === "APPROVED" ? "Approving" : "Rejecting";
    const toastId = toast.loading(`${actionText} inspection...`);
    // PANGGIL API YANG TEPAT SECARA KONDISIONAL BERDASARKAN TIPE
    updateStatusMutation.mutate(
      {
        id: id,
        statusData: { status, comments: "" },
      },
      {
        onSuccess: () => {
          toast.success("Status updated successfully!", {
            id: toastId,
          });
          console.log(`Inspeksi ${id} berhasil diperbarui menjadi ${status}`);
          // Invalisadi react-query ditangani oleh hook
        },
        onError: (error) => {
          toast.error("Update Failed", {
            id: toastId,
            description:
              "Could not update the inspection status. Please try again.",
          });
          console.error(`Gagal memperbarui status untuk ${id}:`, error);
          // Tampilkan notifikasi error
        },
      }
    );
  };

  return (
    <div className="space-y-4">
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
                placeholder="Search Equipment ID, mechanic, location..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select
              value={equipmentTypeFilter}
              onValueChange={setEquipmentTypeFilter}
            >
              <SelectTrigger className="w-full sm:w-[180px]">
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
            <Button variant="outline" onClick={clearFilters}>
              <Filter className="w-4 h-4 mr-2" />
              Clear Filters
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
                <TableHead className="w-[120px]">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("equipmentId")}
                    className="h-auto font-semibold"
                  >
                    ID Peralatan
                    {getSortIcon("equipmentId")}
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("equipmentType")}
                    className="h-auto font-semibold"
                  >
                    Tipe
                    {getSortIcon("equipmentType")}
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("mechanicName")}
                    className="h-auto font-semibold"
                  >
                    Mekanik
                    {getSortIcon("mechanicName")}
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("leaderName")}
                    className="h-auto font-semibold"
                  >
                    Leader
                    {getSortIcon("leaderName")}
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("status")}
                    className="h-auto font-semibold"
                  >
                    Status
                    {getSortIcon("status")}
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("createdAt")}
                    className="h-auto font-semibold"
                  >
                    Dibuat
                    {getSortIcon("createdAt")}
                  </Button>
                </TableHead>
                <TableHead className="">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.map((inspection) => {
                const isPending =
                  normalizeStatus(inspection.status) === "PENDING";
                // Periksa apakah baris spesifik ini sedang dimutasi
                const isMutating =
                  updateStatusMutation.isPending &&
                  updateStatusMutation.variables?.id === inspection.id;

                // Tentukan apakah tombol persetujuan harus diaktifkan (hanya untuk Track)
                const isTrack = inspection.equipmentType === "track";
                const canFinalize = isPending;

                return (
                  <TableRow key={inspection.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium px-5">
                      {inspection.equipmentId}
                    </TableCell>
                    <TableCell className="px-5">
                      <Badge variant="outline">
                        {getEquipmentTypeLabel(inspection.equipmentType)}
                      </Badge>
                    </TableCell>
                    <TableCell className="px-5">
                      {inspection.mechanicName}
                    </TableCell>
                    <TableCell className="px-5">
                      {inspection.leaderName}
                    </TableCell>
                    <TableCell className="px-5">
                      <Badge className={getStatusColor(inspection.status)}>
                        {isMutating ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          getStatusIcon(inspection.status)
                        )}
                        <span className="ml-1">
                          {isMutating
                            ? "Memperbarui..."
                            : // Konversi status ke huruf besar di awal
                              inspection.status.charAt(0).toUpperCase() +
                              inspection.status.slice(1)}
                        </span>
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {formatDate(inspection.createdAt)}
                    </TableCell>
                    <TableCell className="">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            className="h-8 w-8 p-0"
                            disabled={isMutating}
                          >
                            <span className="sr-only">Buka menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                          <DropdownMenuItem asChild>
                            {/* Link harus mengarah ke halaman tinjauan spesifik */}
                            <Link href={`/verification/${inspection.id}`}>
                              <Eye className="w-4 h-4 mr-2" />
                              Tinjau Detail
                            </Link>
                          </DropdownMenuItem>

                          <DropdownMenuSeparator />

                          {canFinalize ? (
                            <>
                              <DropdownMenuItem
                                onClick={() =>
                                  handleStatusAction(
                                    inspection.id,
                                    "APPROVED",
                                    inspection.equipmentType
                                  )
                                }
                                disabled={isMutating}
                              >
                                <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                                Setujui
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() =>
                                  handleStatusAction(
                                    inspection.id,
                                    "REJECTED",
                                    inspection.equipmentType
                                  )
                                }
                                disabled={isMutating}
                              >
                                <XCircle className="w-4 h-4 mr-2 text-red-600" />
                                Tolak
                              </DropdownMenuItem>
                            </>
                          ) : isPending && !isTrack ? (
                            <DropdownMenuItem disabled>
                              <Clock className="w-4 h-4 mr-2" />
                              Status API Hilang (
                              {getEquipmentTypeLabel(inspection.equipmentType)})
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem disabled>
                              <Clock className="w-4 h-4 mr-2" />
                              Sudah Diselesaikan
                            </DropdownMenuItem>
                          )}
                          {role === "admin" && (
                            <>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={() =>
                                  handleOpenDeleteDialog(inspection)
                                }
                                className="text-destructive"
                                disabled={isDeleting}
                              >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Hapus Inspeksi
                              </DropdownMenuItem>
                            </>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          {filteredAndSortedData.length === 0 && (
            <div className="text-center py-12">
              <Clock className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium">
                Tidak ada inspeksi ditemukan
              </h3>
              <p className="text-sm text-muted-foreground">
                Tidak ada inspeksi yang cocok dengan filter Anda saat ini. Coba
                sesuaikan kriteria pencarian Anda.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Anda yakin ingin menghapus?</AlertDialogTitle>
            <AlertDialogDescription>
              Tindakan ini tidak dapat dibatalkan. Ini akan menghapus data
              inspeksi untuk unit{" "}
              <span className="font-semibold">
                {inspectionToDelete?.equipmentId}
              </span>{" "}
              secara permanen.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Batal</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              disabled={isDeleting}
              className={buttonVariants({ variant: "destructive" })}
            >
              {isDeleting ? "Menghapus..." : "Ya, Hapus"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground w-full">
            Page {currentPage} of {totalPages}
          </p>
          <Pagination className="justify-end">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage((prev) => Math.max(1, prev - 1));
                  }}
                  aria-disabled={currentPage === 1}
                  className={
                    currentPage === 1
                      ? "pointer-events-none opacity-50"
                      : undefined
                  }
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  {currentPage}
                </PaginationLink>
              </PaginationItem>
              {currentPage < totalPages && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage((prev) => Math.min(totalPages, prev + 1));
                  }}
                  aria-disabled={currentPage === totalPages}
                  className={
                    currentPage === totalPages
                      ? "pointer-events-none opacity-50"
                      : undefined
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}
