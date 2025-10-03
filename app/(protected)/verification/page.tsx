// src/app/verification/page.tsx
"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, CheckCircle, XCircle, Loader2 } from "lucide-react";
import { VerificationTable } from "@/components/tables/VerificationTable";
// NEW IMPORT: Import the general inspection hook
import { useGetGeneralInspections } from "@/queries/inspection";

// Definisikan bentuk data yang berasal dari API (model Inspeksi + approver)
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

// Interface untuk format data yang dibutuhkan oleh VerificationTable
interface TableData extends InspectionListItem {
  leaderName: string;
  priority: "low" | "medium" | "high"; // Placeholder yang dibutuhkan oleh tabel
  issues: number; // Placeholder yang dibutuhkan oleh tabel
  status: "PENDING" | "APPROVED" | "REJECTED"; // Tabel menggunakan huruf kecil
}

export default function VerificationPage() {
  // Gunakan nilai status Prisma (huruf besar) untuk filter API dan state tab
  const [activeTab, setActiveTab] = useState<
    "PENDING" | "APPROVED" | "REJECTED" | "ALL"
  >("PENDING");

  // Definisikan parameter filter/paginasi dasar
  const [filters, setFilters] = useState({
    page: 1,
    limit: 50,
    q: "",
  });

  // Ambil data berdasarkan filter status saat ini
  const apiFilters = {
    ...filters,
    // Teruskan filter status ke API kecuali jika tab adalah 'ALL'
    status: activeTab !== "ALL" ? activeTab : undefined,
  };

  const { data, isLoading, isError } = useGetGeneralInspections(apiFilters);

  // Petakan data API ke struktur yang dibutuhkan tabel dan hitung jumlahnya
  const { tableData, counts } = useMemo(() => {
    const rawData = data?.data || [];
    const mappedData: TableData[] = [];
    let pendingCount = 0;
    let approvedCount = 0;
    let rejectedCount = 0;

    rawData.forEach((item: any) => {
      const status = item.status as "PENDING" | "APPROVED" | "REJECTED";

      // Hitung jumlah
      if (status === "PENDING") pendingCount++;
      else if (status === "APPROVED") approvedCount++;
      else if (status === "REJECTED") rejectedCount++;

      // Petakan ke format TableData
      mappedData.push({
        id: item.id,
        equipmentId: item.equipmentId,
        equipmentType: item.equipmentType.toLowerCase(),
        mechanicName: item.mechanicName,
        leaderName: item.approver?.username || "N/A",
        status: status.toLowerCase() as "PENDING" | "APPROVED" | "REJECTED", // Konversi untuk tabel
        createdAt: item.createdAt,
        location: item.location,
        // Bidang mock yang diharapkan tabel
        priority: "medium",
        issues: 0,
      });
    });

    return {
      tableData: mappedData,
      counts: { pendingCount, approvedCount, rejectedCount },
    };
  }, [data]);

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

        {/* Kartu Statistik */}
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

          <TabsContent value={activeTab} className="mt-6">
            <VerificationTable
              // Teruskan data yang diterima dari endpoint API
              data={tableData}
              // Teruskan status filter aktif (huruf kecil) untuk filtering/tampilan internal
              statusFilter={activeTab.toLowerCase()}
            />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
