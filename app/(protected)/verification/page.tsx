// src/app/verification/page.tsx
"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, CheckCircle, XCircle, Loader2 } from "lucide-react";
import { VerificationTable } from "@/components/tables/VerificationTable";
import { useGetGeneralInspections } from "@/queries/inspection";

// ... (Interface tidak berubah)
interface InspectionListItem {
  id: string;
  equipmentId: string;
  equipmentType: "track" | "wheel" | "support";
  mechanicName: string;
  approver?: { username: string; id: string };
  status: "PENDING" | "APPROVED" | "REJECTED";
  createdAt: string;
  location: string;
}

interface TableData extends InspectionListItem {
  leaderName: string;
  priority: "low" | "medium" | "high";
  issues: number;
  status: "PENDING" | "APPROVED" | "REJECTED";
}

export default function VerificationPage() {
  const [activeTab, setActiveTab] = useState<
    "PENDING" | "APPROVED" | "REJECTED" | "ALL"
  >("PENDING");

  const [filters, setFilters] = useState({
    page: 1,
    limit: 100, // Ambil lebih banyak data sekaligus untuk di-filter di klien
    q: "",
  });

  // 1. Ambil SEMUA data inspeksi tanpa filter status.
  // Ini akan menjadi sumber data utama kita.
  const {
    data: allInspectionsResponse,
    isLoading,
    isError,
  } = useGetGeneralInspections(filters);

  // 2. Hitung total (counts) dari SEMUA data yang diambil.
  // useMemo ini hanya akan berjalan ulang jika data dari API berubah.
  const counts = useMemo(() => {
    const rawData = allInspectionsResponse?.data || [];
    let pendingCount = 0;
    let approvedCount = 0;
    let rejectedCount = 0;

    rawData.forEach((item: any) => {
      const status = item.status as "PENDING" | "APPROVED" | "REJECTED";
      if (status === "PENDING") pendingCount++;
      else if (status === "APPROVED") approvedCount++;
      else if (status === "REJECTED") rejectedCount++;
    });

    return { pendingCount, approvedCount, rejectedCount };
  }, [allInspectionsResponse]);

  // 3. Filter dan petakan data untuk tabel berdasarkan TAB AKTIF.
  // useMemo ini akan berjalan ulang jika data API atau activeTab berubah.
  const tableData = useMemo(() => {
    const rawData = allInspectionsResponse?.data || [];

    // Filter data berdasarkan tab yang aktif
    const filteredData =
      activeTab === "ALL"
        ? rawData
        : rawData.filter((item: any) => item.status === activeTab);

    // Petakan data yang sudah difilter ke format yang dibutuhkan tabel
    return filteredData.map(
      (item: any): TableData => ({
        id: item.id,
        equipmentId: item.equipmentId,
        equipmentType: item.equipmentType.toLowerCase(),
        mechanicName: item.mechanicName,
        leaderName: item.approver?.username || "N/A",
        status: item.status.toLowerCase(), // Konversi untuk tabel
        createdAt: item.createdAt,
        location: item.location,
        priority: "medium", // Bidang mock
        issues: 0, // Bidang mock
      })
    );
  }, [allInspectionsResponse, activeTab]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        <p className="ml-3 text-lg text-gray-600">Memuat data verifikasi...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-red-600 text-center mt-10">
        Kesalahan memuat inspeksi. Harap periksa koneksi jaringan.
      </div>
    );
  }

  const totalCount =
    counts.pendingCount + counts.approvedCount + counts.rejectedCount;

  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">
            Verifikasi Inspeksi
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Tinjau dan verifikasi inspeksi peralatan yang diserahkan oleh
            mekanik
          </p>
        </div>

        {/* Kartu Statistik - sekarang nilainya konsisten */}
        <div className="grid gap-4 md:grid-cols-3 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Menunggu Tinjauan
              </CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{counts.pendingCount}</div>
              <p className="text-xs text-muted-foreground">
                Menunggu verifikasi
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Disetujui</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{counts.approvedCount}</div>
              <p className="text-xs text-muted-foreground">
                Berhasil diverifikasi
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ditolak</CardTitle>
              <XCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{counts.rejectedCount}</div>
              <p className="text-xs text-muted-foreground">Memerlukan revisi</p>
            </CardContent>
          </Card>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={(value) =>
            setActiveTab(value as "PENDING" | "APPROVED" | "REJECTED" | "ALL")
          }
        >
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="PENDING">
              Menunggu ({counts.pendingCount})
            </TabsTrigger>
            <TabsTrigger value="APPROVED">
              Disetujui ({counts.approvedCount})
            </TabsTrigger>
            <TabsTrigger value="REJECTED">
              Ditolak ({counts.rejectedCount})
            </TabsTrigger>
            <TabsTrigger value="ALL">Semua ({totalCount})</TabsTrigger>
          </TabsList>

          {/* Gunakan TabsContent yang berbeda untuk setiap tab agar React dapat mengelolanya dengan benar */}
          <TabsContent value="PENDING">
            <VerificationTable data={tableData} />
          </TabsContent>
          <TabsContent value="APPROVED">
            <VerificationTable data={tableData} />
          </TabsContent>
          <TabsContent value="REJECTED">
            <VerificationTable data={tableData} />
          </TabsContent>
          <TabsContent value="ALL">
            <VerificationTable data={tableData} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
