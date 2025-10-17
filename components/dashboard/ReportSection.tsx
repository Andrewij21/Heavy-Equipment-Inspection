// src/app/ReportsPage.tsx
"use client";

import { useState, useMemo, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
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
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ExportDialog } from "@/components/dialogs/ExportDialog";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  FileSpreadsheet,
  TrendingUp,
  Users,
  Calendar,
  Download,
  BarChart3,
  Search,
  Loader2,
  FileText,
  Trash2,
  EllipsisVertical,
} from "lucide-react";
import {
  type ExportFilters,
  type ExportInspection,
  generateCSVContent, // Tetap untuk format CSV
  downloadCSV, // Tetap untuk format CSV
  generateReportSummary,
} from "@/lib/exportUtils";
import { toast } from "sonner";
// API Imports
import {
  useDeleteInspection,
  useGetGeneralInspections,
} from "@/queries/inspection";
import { downloadInspectionReport } from "@/queries/report"; // Asumsi utility ini diimpor/didefinisikan
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDashboardSummary } from "@/queries/dashboard";
import { formatDate, getStatusColor } from "@/lib/utils";

function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}
// Struktur Data Mock (seperti yang didefinisikan sebelumnya)
interface FilterableInspection extends ExportInspection {
  equipmentType: "track" | "wheel" | "support";
  status: "approved" | "rejected" | "pending";
  approver?: { username: string; id: string };
}
const mapApiToFilterStatus = (status: string) =>
  status.toLowerCase() as "approved" | "rejected" | "pending";

export default function ReportsPage({ role }: { role: string }) {
  const [isExporting, setIsExporting] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  // States untuk filtering API (Sumber Data)
  const [apiFilters, setApiFilters] = useState({
    status: "ALL",
    dateFrom: "",
    dateTo: "",
  });

  // States untuk filtering sisi klien (Tampilan Tabel)
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;
  const dateFrom = apiFilters.dateFrom;
  const dateTo = apiFilters.dateTo;
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [inspectionToDelete, setInspectionToDelete] =
    useState<FilterableInspection | null>(null);
  useEffect(() => {
    setCurrentPage(1);
  }, [
    debouncedSearchTerm,
    typeFilter,
    statusFilter,
    dateFilter,
    dateFrom,
    dateTo,
  ]);

  // 1. Gabungkan SEMUA filter menjadi satu objek untuk dikirim ke API
  const queryParams = useMemo(() => {
    const params: Record<string, any> = {
      page: currentPage,
      limit: ITEMS_PER_PAGE,
    };

    if (debouncedSearchTerm) params.q = debouncedSearchTerm;
    if (typeFilter !== "all") params.equipmentType = typeFilter;
    if (statusFilter !== "all") params.status = statusFilter.toUpperCase();

    // Logika untuk filter tanggal
    let finalDateFrom = dateFrom;
    let finalDateTo = dateTo;

    if (dateFilter !== "all") {
      const now = new Date();
      let startDate: Date | null = null;
      if (dateFilter === "today") {
        startDate = new Date(now.setHours(0, 0, 0, 0));
      } else if (dateFilter === "week") {
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      } else if (dateFilter === "month") {
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      }
      if (startDate) {
        finalDateFrom = startDate.toISOString().split("T")[0];
        finalDateTo = new Date().toISOString().split("T")[0];
      }
    }

    if (finalDateFrom) params.dateFrom = finalDateFrom;
    if (finalDateTo) params.dateTo = finalDateTo;

    return params;
  }, [
    currentPage,
    debouncedSearchTerm,
    typeFilter,
    statusFilter,
    dateFilter,
    dateFrom,
    dateTo,
  ]);
  const {
    data: apiResponse,
    isLoading,
    isError,
  } = useGetGeneralInspections(queryParams);
  const { data: dashboardSummary, isLoading: dashboardSummaryLoading } =
    useDashboardSummary(queryParams);

  const deleteMutation = useDeleteInspection();
  const isDeleting = deleteMutation.isPending;

  const handleOpenDeleteDialog = (inspection: FilterableInspection) => {
    setInspectionToDelete(inspection);
    setIsDeleteDialogOpen(true);
  };

  // Petakan dan normalisasi data API sekali (useMemo tetap sama)
  const inspections: FilterableInspection[] = useMemo(() => {
    if (!apiResponse?.data) return [];
    // Mapping tetap diperlukan untuk normalisasi data di frontend
    return apiResponse.data.map((item: any) => ({
      id: item.id,
      equipmentId: item.equipmentId,
      equipmentType: item.equipmentType.toLowerCase(),
      mechanicName: item.mechanicName,
      status: mapApiToFilterStatus(item.status),
      createdAt: item.createdAt,
      location: item.location,
      verifiedBy: item.approver?.username || "N/A",
      verifiedAt: item.approvalDate,
    })) as FilterableInspection[];
  }, [apiResponse?.data]);

  const totalCount = apiResponse?.count || 0;
  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  // Data yang Difilter Sisi Klien (untuk tabel yang terlihat)
  const filteredInspections = useMemo(() => {
    const filtered = inspections.filter((inspection) => {
      const matchesSearch =
        inspection.equipmentId
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        inspection.mechanicName
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        inspection.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType =
        typeFilter === "all" || inspection.equipmentType === typeFilter;
      const matchesStatus =
        statusFilter === "all" || inspection.status === statusFilter;

      const created = new Date(inspection.createdAt);
      let matchesQuickDate = true;

      // Implementasi logika tanggal cepat berdasarkan state dateFilter
      if (dateFilter !== "all") {
        const now = new Date();
        switch (dateFilter) {
          case "today":
            matchesQuickDate = created.toDateString() === now.toDateString();
            break;
          case "week":
            matchesQuickDate =
              created >= new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
            break;
          case "month":
            matchesQuickDate =
              created >= new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
            break;
        }
      }

      let matchesRange = true;
      if (dateFrom)
        matchesRange = matchesRange && created >= new Date(dateFrom);
      if (dateTo) {
        const end = new Date(dateTo);
        end.setHours(23, 59, 59, 999);
        matchesRange = matchesRange && created <= end;
      }

      return (
        matchesSearch &&
        matchesType &&
        matchesStatus &&
        matchesQuickDate &&
        matchesRange
      );
    });
    return filtered;
  }, [
    inspections,
    searchTerm,
    typeFilter,
    statusFilter,
    dateFilter,
    dateFrom,
    dateTo,
  ]);

  //Handler Ekspor INTI diperbarui untuk memanggil API backend untuk PDF/Excel
  const handleExport = async (
    inspectionsToExport: FilterableInspection[],
    format: "csv" | "pdf" | "excel"
  ) => {
    setIsExporting(true);
    const toastId = toast.loading(
      `Mempersiapkan ekspor sebagai ${format.toUpperCase()}...`
    );
    try {
      if (inspectionsToExport.length === 0) {
        toast.warning("Tidak ada data untuk diekspor.", { id: toastId });
        return;
      }

      if (format === "csv") {
        // CSV: Gunakan pembuatan sisi klien (lebih cepat)
        const csvContent = generateCSVContent(inspectionsToExport);
        const timestamp = new Date().toISOString().split("T")[0];
        const filename = `laporan-inspeksi-${timestamp}.csv`;
        downloadCSV(csvContent, filename);
      } else {
        // --- PANGGILAN API UNTUK PEMBUATAN PDF/EXCEL/FORMULIR ---

        const inspectionIds = inspectionsToExport.map((i) => i.id);

        // 1. Dapatkan blob dan nama file dari fungsi API (yang sudah membaca header)
        const { blob, filename: apiFilename } = await downloadInspectionReport({
          inspectionIds: inspectionIds,
          format: format,
        });

        let finalFilename = apiFilename;

        // Periksa apakah backend mengirim file zip
        if (
          inspectionIds.length > 1 &&
          (format === "pdf" || format === "excel")
        ) {
          // Pastikan nama file diakhiri dengan .zip
          const baseName = finalFilename.replace(/\.zip$/i, "");
          finalFilename = `${baseName}.zip`;
        } else if (format === "excel") {
          // Logika lama Anda untuk file excel tunggal
          const baseName = finalFilename.replace(
            /\.(xlsx|xls|excel|bin)?$/i,
            ""
          );
          finalFilename = `${baseName}.xlsx`;
        }

        // 3. Tangani inisiasi unduhan file di browser
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = finalFilename; // Gunakan nama file yang dikoreksi
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
      }

      toast.success("Ekspor Berhasil", {
        id: toastId,
        description: `${inspectionsToExport.length} inspeksi diekspor.`,
      });
    } catch (error) {
      console.error("Kesalahan ekspor:", error);
      toast.error("Ekspor Gagal", {
        id: toastId,
        description: "Ekspor gagal. Periksa konsol untuk detail API.",
      });
    } finally {
      setIsExporting(false);
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

  useEffect(() => {
    setSelectedIds([]);
  }, [queryParams]); // Bergantung pada queryParams yang sudah mencakup semua filter
  const handleSelectRow = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };
  const handleSelectAll = () => {
    // Jika semua item yang difilter sudah dipilih, kosongkan pilihan.
    // Jika tidak, pilih semua item yang difilter.
    if (selectedIds.length === filteredInspections.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredInspections.map((i) => i.id));
    }
  };
  const handleBulkExport = (format: "csv" | "pdf" | "excel") => {
    const inspectionsToExport = filteredInspections.filter((i) =>
      selectedIds.includes(i.id)
    );
    handleExport(inspectionsToExport, format);
  };

  // Jika memuat, tampilkan spinner
  if (isLoading || dashboardSummaryLoading) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
      </div>
    );
  }
  // Pengaturan data grafik
  const statusData = [
    {
      name: "Disetujui",
      value: dashboardSummary?.data.approved,
      color: "#10b981",
    },
    {
      name: "Ditolak",
      value: dashboardSummary?.data.rejected,
      color: "#ef4444",
    },
    {
      name: "Menunggu",
      value: dashboardSummary?.data.pending,
      color: "#f59e0b",
    },
  ];

  return (
    <div className="min-h-screen pb-6 max-w-sm sm:max-w-none">
      {/* Judul Halaman - Tambahkan di sini jika diperlukan, tapi mengasumsikan komponen utama */}
      <h1 className="text-xl font-bold text-gray-900 mb-6">
        Laporan & Analitik Inspeksi
      </h1>

      {/* Grafik dan Kartu Ringkasan */}
      {role === "admin" && (
        <div className="grid gap-6 lg:grid-cols-2 mb-8 max-w-screen">
          {/* Distribusi Status */}
          <Card>
            <CardHeader>
              <CardTitle>Status Inspeksi</CardTitle>
              <CardDescription>
                Status saat ini dari semua inspeksi
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name} ${((percent as number) * 100).toFixed(0)}%`
                    }
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Kartu Ringkasan */}
          <div className="grid gap-4 lg:grid-cols-2 max-w-screen">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Inspeksi
                </CardTitle>
                <FileSpreadsheet className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {dashboardSummary?.data.total}
                </div>
                <p className="text-xs text-muted-foreground">
                  Total catatan ditemukan
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Tingkat Persetujuan
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {dashboardSummary?.data.approvalRate}%
                </div>
                <p className="text-xs text-muted-foreground">
                  {dashboardSummary?.data.approved} dari{" "}
                  {dashboardSummary?.data.total} disetujui
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Pengguna Aktif
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {dashboardSummary?.data.user}
                </div>
                <p className="text-xs text-muted-foreground">
                  Mekanik yang berkontribusi
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Jumlah Menunggu
                </CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {dashboardSummary?.data.pending}
                </div>
                <p className="text-xs text-muted-foreground">
                  Menunggu tinjauan leader
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Tabel Data Inspeksi */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Data Inspeksi</CardTitle>
            <CardDescription>
              Tampilan detail semua inspeksi dengan kemampuan filter
            </CardDescription>
          </div>
          {/* Tombol ini hanya muncul jika ada item yang dipilih */}
          {selectedIds.length > 0 && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button disabled={isExporting}>
                  <Download className="w-4 h-4 mr-2" />
                  Export Selected ({selectedIds.length})
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Pilih Format Ekspor</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleBulkExport("pdf")}>
                  <FileText className="w-4 h-4 mr-2" />
                  Formulir (PDF)
                </DropdownMenuItem>
                {role === "admin" && (
                  <DropdownMenuItem onClick={() => handleBulkExport("excel")}>
                    <FileSpreadsheet className="w-4 h-4 mr-2" />
                    Data Mentah (Excel)
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </CardHeader>
        <CardContent>
          {/* Filter */}
          <div className="flex items-center flex-col sm:flex-row sm:justify-between gap-4 mb-6">
            <div className="relative w-full">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search inspections..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Equipment Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="track">Track</SelectItem>
                <SelectItem value="wheel">Wheel</SelectItem>
                <SelectItem value="support">Support</SelectItem>
                <SelectItem value="tyre">Tyre</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Quick Date Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">Last 7 Days</SelectItem>
                <SelectItem value="month">Last 30 Days</SelectItem>
              </SelectContent>
            </Select>
            <Input
              type="date"
              value={dateFrom}
              onChange={(e) =>
                setApiFilters((prev) => ({
                  ...prev,
                  dateFrom: e.target.value,
                }))
              }
              aria-label="From date"
              className=""
            />
            <Input
              type="date"
              value={dateTo}
              onChange={(e) =>
                setApiFilters((prev) => ({
                  ...prev,
                  dateTo: e.target.value,
                }))
              }
              className=""
              aria-label="To date"
            />
          </div>

          {/* Tabel */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-medium">
                    <Checkbox
                      checked={
                        filteredInspections.length > 0 &&
                        selectedIds.length === filteredInspections.length
                      }
                      onCheckedChange={handleSelectAll}
                      aria-label="Pilih semua"
                    />
                  </th>
                  <th className="text-left p-3 font-medium">ID Peralatan</th>
                  <th className="text-left p-3 font-medium">Tipe</th>
                  <th className="text-left p-3 font-medium">Mekanik</th>
                  <th className="text-left p-3 font-medium">Status</th>
                  <th className="text-left p-3 font-medium">Lokasi</th>
                  <th className="text-left p-3 font-medium">Tanggal</th>
                  {/* <th className="text-left p-3 font-medium">Unduh</th> */}
                  <th className="text-left font-medium">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {inspections.map((inspection) => (
                  <tr key={inspection.id} className="border-b hover:bg-gray-50">
                    <td className="p-3">
                      <Checkbox
                        checked={selectedIds.includes(inspection.id)}
                        onCheckedChange={() => handleSelectRow(inspection.id)}
                        aria-label={`Pilih inspeksi ${inspection.equipmentId}`}
                      />
                    </td>
                    <td className="p-3 font-medium">
                      {inspection.equipmentId}
                    </td>
                    <td className="p-3">
                      <Badge variant="outline">
                        {/* Kapitalisasi huruf pertama */}
                        {inspection.equipmentType.charAt(0).toUpperCase() +
                          inspection.equipmentType.slice(1)}
                      </Badge>
                    </td>
                    <td className="p-3">{inspection.mechanicName}</td>
                    <td className="p-3">
                      <Badge className={getStatusColor(inspection.status)}>
                        {/* Kapitalisasi huruf pertama */}
                        {inspection.status.charAt(0).toUpperCase() +
                          inspection.status.slice(1)}
                      </Badge>
                    </td>
                    <td className="p-3 text-sm text-muted-foreground">
                      {inspection.location}
                    </td>
                    <td className="p-3 text-sm text-muted-foreground">
                      {formatDate(inspection.createdAt)}
                    </td>
                    <td className=" text-sm">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            disabled={isExporting || isDeleting}
                            asChild
                            size={"icon"}
                          >
                            <EllipsisVertical size={4} className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Pilih Aksi</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => handleExport([inspection], "pdf")}
                            disabled={isExporting}
                          >
                            <FileText className="w-4 h-4 mr-2" />
                            Unduh PDF
                          </DropdownMenuItem>
                          {role === "admin" && (
                            <DropdownMenuItem
                              onClick={() =>
                                handleExport([inspection], "excel")
                              }
                              disabled={isExporting}
                            >
                              <FileSpreadsheet className="w-4 h-4 mr-2" />
                              Unduh Excel
                            </DropdownMenuItem>
                          )}
                          {/* 8. Tambahkan Aksi Hapus (hanya untuk Admin) */}
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
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredInspections.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <FileSpreadsheet className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>
                  Tidak ada inspeksi yang cocok dengan filter Anda saat ini.
                </p>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="mt-4 text-sm text-muted-foreground w-full">
              Menampilkan {filteredInspections.length} dari {inspections.length}{" "}
              inspeksi
            </div>
            {totalPages > 1 && (
              <Pagination className="mt-2 justify-end">
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
                        setCurrentPage((prev) =>
                          Math.min(totalPages, prev + 1)
                        );
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
            )}
          </div>
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
    </div>
  );
}
