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
import { Button } from "@/components/ui/button";
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
import { useGetGeneralInspections } from "@/queries/inspection";
import { downloadInspectionReport } from "@/queries/report"; // Asumsi utility ini diimpor/didefinisikan
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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

  // Sinkronkan variabel state untuk akses mudah di input dan filter
  const dateFrom = apiFilters.dateFrom;
  const dateTo = apiFilters.dateTo;

  // Ambil data menggunakan hook
  const { data, isLoading, isError } = useGetGeneralInspections({
    status: apiFilters.status === "ALL" ? undefined : apiFilters.status,
    dateFrom: apiFilters.dateFrom,
    dateTo: apiFilters.dateTo,
  });

  // Petakan dan normalisasi data API sekali (useMemo tetap sama)
  const allInspections: FilterableInspection[] = useMemo(() => {
    if (!data?.data) return [];

    return data.data.map((item: any) => ({
      id: item.id,
      equipmentId: item.equipmentId,
      equipmentType: item.equipmentType.toLowerCase(),
      mechanicName: item.mechanicName,
      status: mapApiToFilterStatus(item.status),
      createdAt: item.createdAt,
      location: item.location,
      verifiedBy: item.approver?.username || "N/A",
      verifiedAt: item.approvalDate,
      trackCondition: item.trackCondition || "N/A",
      trackTension: item.trackTension || "N/A",
      sprocketWear: item.sprocketWear || "N/A",
      trackPadWear: item.trackPadWear || 0,
      hydraulicLeaks: item.hydraulicLeaks || false,
      greaseLevels: item.greaseLevels || "N/A",
      notes: item.notes || "",
      tireCondition: item.tireCondition || "N/A",
      structuralIntegrity: item.structuralIntegrity || "N/A",
    })) as FilterableInspection[];
  }, [data]);

  // Data yang Difilter Sisi Klien (untuk tabel yang terlihat)
  const filteredInspections = useMemo(() => {
    const filtered = allInspections.filter((inspection) => {
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
    allInspections,
    searchTerm,
    typeFilter,
    statusFilter,
    dateFilter,
    dateFrom,
    dateTo,
  ]);

  const summary = generateReportSummary(allInspections);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString: string) => {
    // Format tanggal ke format Indonesia
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // BARU: Handler Ekspor INTI diperbarui untuk memanggil API backend untuk PDF/Excel
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

        // 2. PERBAIKAN PENTING EKSTENSI FRONTEND
        let finalFilename = apiFilename;
        if (format === "excel") {
          // Pastikan nama file diakhiri dengan .xlsx untuk memenuhi browser/OS,
          // menimpa ekstensi perantara yang salah seperti '.excel' atau '.xls'
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

  const handleInlineDownload = (inspection: FilterableInspection) => {
    // Unduh satu inspeksi sebagai PDF/Formulir
    // Catatan: Backend hanya membutuhkan satu ID untuk pembuatan formulir PDF
    handleExport([inspection], "pdf");
  };

  const handleDialogExport = (
    filters: ExportFilters,
    format: "csv" | "excel" | "pdf"
  ) => {
    // Untuk ekspor massal dari dialog, gunakan data yang sedang difilter
    handleExport(filteredInspections, format);
  };

  // Jika memuat, tampilkan spinner
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
      </div>
    );
  }

  // Pengaturan data grafik
  const statusData = [
    { name: "Disetujui", value: summary.approved, color: "#10b981" },
    { name: "Ditolak", value: summary.rejected, color: "#ef4444" },
    { name: "Menunggu", value: summary.pending, color: "#f59e0b" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto pb-6">
        {/* Judul Halaman - Tambahkan di sini jika diperlukan, tapi mengasumsikan komponen utama */}
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
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
                  <div className="text-2xl font-bold">{summary.total}</div>
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
                    {summary.approvalRate}%
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {summary.approved} dari {summary.total} disetujui
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
                    {Object.keys(summary.byMechanic).length}
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
                  <div className="text-2xl font-bold">{summary.pending}</div>
                  <p className="text-xs text-muted-foreground">
                    Menunggu tinjauan leader
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Tabel Data Inspeksi */}
        <Card className="mb-8 max-w-screen">
          <CardHeader>
            <CardTitle>Data Inspeksi</CardTitle>
            <CardDescription>
              Tampilan detail semua inspeksi dengan kemampuan filter
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Filter */}
            <div className="flex items-center sm:justify-between gap-4 mb-6 flex-wrap">
              <div className="relative w-full sm:w-fit">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Cari inspeksi..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-full sm:w-fit">
                  <SelectValue placeholder="Tipe Peralatan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Tipe</SelectItem>
                  <SelectItem value="track">Track</SelectItem>
                  <SelectItem value="wheel">Roda</SelectItem>
                  <SelectItem value="support">Pendukung</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-fit">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Status</SelectItem>
                  <SelectItem value="approved">Disetujui</SelectItem>
                  <SelectItem value="rejected">Ditolak</SelectItem>
                  <SelectItem value="pending">Menunggu</SelectItem>
                </SelectContent>
              </Select>
              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger className="w-full sm:w-fit">
                  <SelectValue placeholder="Filter Cepat Tanggal" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Sepanjang Waktu</SelectItem>
                  <SelectItem value="today">Hari Ini</SelectItem>
                  <SelectItem value="week">7 Hari Terakhir</SelectItem>
                  <SelectItem value="month">30 Hari Terakhir</SelectItem>
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
                aria-label="Dari tanggal"
                className="w-full sm:w-fit"
              />
              <div className="flex items-center gap-2">
                <Input
                  type="date"
                  value={dateTo}
                  onChange={(e) =>
                    setApiFilters((prev) => ({
                      ...prev,
                      dateTo: e.target.value,
                    }))
                  }
                  className="w-full sm:w-fit"
                  aria-label="Sampai tanggal"
                />
              </div>
            </div>

            {/* Tabel */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 font-medium">ID Peralatan</th>
                    <th className="text-left p-3 font-medium">Tipe</th>
                    <th className="text-left p-3 font-medium">Mekanik</th>
                    <th className="text-left p-3 font-medium">Status</th>
                    <th className="text-left p-3 font-medium">Lokasi</th>
                    <th className="text-left p-3 font-medium">Tanggal</th>
                    <th className="text-left p-3 font-medium">Unduh</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredInspections.map((inspection) => (
                    <tr
                      key={inspection.id}
                      className="border-b hover:bg-gray-50"
                    >
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
                      <td className="p-3 text-sm">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="default" disabled={isExporting}>
                              <Download className="w-4 h-4 mr-2" />
                              Unduh
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Pilih Format</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => handleExport([inspection], "pdf")}
                              disabled={isExporting}
                            >
                              <FileText className="w-4 h-4 mr-2" />
                              Formulir Inspeksi (PDF)
                            </DropdownMenuItem>
                            {role === "admin" && (
                              <DropdownMenuItem
                                onClick={() =>
                                  handleExport([inspection], "excel")
                                }
                                disabled={isExporting}
                              >
                                <FileSpreadsheet className="w-4 h-4 mr-2" />
                                Data Mentah (Excel)
                              </DropdownMenuItem>
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

            <div className="mt-4 text-sm text-muted-foreground">
              Menampilkan {filteredInspections.length} dari{" "}
              {allInspections.length} inspeksi
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
