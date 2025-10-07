// src/components/dashboard/DashboardStats.tsx
"use client";

import type React from "react";
import { useMemo } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FileText,
  CheckCircle,
  Clock,
  AlertTriangle,
  Loader2,
  Users,
} from "lucide-react";

// NEW IMPORT: Import the general inspection hook
import { useGetGeneralInspections } from "@/queries/inspection"; // Menggunakan path yang disediakan
import { useDashboardStats } from "@/queries/dashboard";

// Definisikan struktur data yang diharapkan dari API untuk memudahkan penghitungan
interface InspectionItem {
  status: "PENDING" | "APPROVED" | "REJECTED";
  // ... fields lain yang diperlukan untuk filtering jika ada
}

interface StatsCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

function StatsCard({ title, value, description, icon, trend }: StatsCardProps) {
  return (
    <Card className="gap-3">
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent className="">
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
        {trend && (
          <div
            className={`text-xs ${
              trend.isPositive ? "text-green-600" : "text-red-600"
            } mt-1`}
          ></div>
        )}
      </CardContent>
    </Card>
  );
}

interface DashboardStatsProps {
  userRole: "mechanic" | "leader" | "admin";
}

export function DashboardStats({ userRole }: DashboardStatsProps) {
  // 1. Panggil hook API baru
  const { data: apiResponse, isLoading, isError } = useDashboardStats();
  const statsData = apiResponse?.data;

  // 2. Map data API yang sudah difilter server ke format StatsCard
  const stats = useMemo(() => {
    // Jika data belum tersedia, kembalikan array kosong
    if (!statsData) return [];

    // Ambil field utama (sudah difilter oleh server berdasarkan userRole)
    const { total, pending, approved, rejected, reviewedToday } = statsData;

    // --- LOGIC MAPPING BERDASARKAN PERAN ---
    switch (userRole) {
      case "mechanic":
        return [
          {
            title: "Total Inspeksi Anda", // Berdasarkan filter server (mechanicId)
            value: total,
            description: "Total yang telah Anda serahkan",
            icon: <FileText className="h-4 w-4 text-muted-foreground" />,
          },
          {
            title: "Menunggu Tinjauan",
            value: pending,
            description: "Menunggu persetujuan leader",
            icon: <Clock className="h-4 w-4 text-muted-foreground" />,
          },
          {
            title: "Disetujui",
            value: approved,
            description: "Inspeksi berhasil diverifikasi",
            icon: <CheckCircle className="h-4 w-4 text-muted-foreground" />,
          },
          {
            title: "Ditolak",
            value: rejected,
            description: "Memerlukan revisi/perhatian",
            icon: <AlertTriangle className="h-4 w-4 text-muted-foreground" />,
          },
        ];

      case "leader":
        return [
          {
            title: "Tinjauan Tertunda", // Global Pending
            value: pending,
            description: "Inspeksi menunggu verifikasi",
            icon: <Clock className="h-4 w-4 text-muted-foreground" />,
          },
          {
            title: "Ditinjau Hari Ini", // Data tambahan dari server
            value: reviewedToday || 0,
            description: "Inspeksi yang Anda setujui/tolak",
            icon: <CheckCircle className="h-4 w-4 text-muted-foreground" />,
          },
          {
            title: "Total Disetujui",
            value: approved,
            description: "Total persetujuan (Global)",
            icon: <FileText className="h-4 w-4 text-muted-foreground" />,
          },
          {
            title: "Total Ditolak",
            value: rejected,
            description: "Total penolakan (Global)",
            icon: <AlertTriangle className="h-4 w-4 text-muted-foreground" />,
          },
        ];

      case "admin":
        return [];
      default:
        return [];
    }
  }, [statsData, userRole]);

  // 3. Tampilan Loading dan Error (Sama seperti sebelumnya)
  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="h-4 w-3/4 rounded bg-gray-200"></div>
              <Loader2 className="h-4 w-4 text-gray-300 animate-spin" />
            </CardHeader>
            <CardContent>
              <div className="h-8 w-1/2 rounded bg-gray-300 mb-2"></div>
              <div className="h-3 w-full rounded bg-gray-200"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-red-600 text-center p-4 col-span-full">
        Gagal memuat statistik dashboard.
      </div>
    );
  }

  // 5. Render Kartu
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <StatsCard key={index} {...stat} />
      ))}
    </div>
  );
}
