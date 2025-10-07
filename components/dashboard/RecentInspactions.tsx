"use client";

import { useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Edit, Loader2, Clock } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// ASUMSI: Import hook dan interface dari file API Anda
import { useGetGeneralInspections } from "@/queries/inspection"; // Ganti dengan path hook Anda
import { useAuth } from "@/context/AuthContext"; // ASUMSI: Import AuthContext untuk mendapatkan userId
import clsx from "clsx";

interface Inspection {
  id: string;
  equipmentId: string;
  equipmentType: "track" | "wheel" | "support";
  mechanicName: string;
  status: "PENDING" | "APPROVED" | "REJECTED"; // Gunakan status uppercase dari API
  createdAt: string;
  issues?: number; // Opsional
}

interface RecentInspectionsProps {
  userRole: "mechanic" | "leader" | "admin"; // Admin seharusnya tidak masuk ke sini
}

export function RecentInspections({ userRole }: RecentInspectionsProps) {
  const router = useRouter();
  const { user } = useAuth(); // Ambil user ID dan role dari AuthContext
  const currentUserId = user?.id;

  // 1. Tentukan filter berdasarkan peran
  const queryParams = useMemo(() => {
    // Leader: Lihat semua inspeksi terbaru (dengan limit kecil, misalnya 5)
    if (userRole === "leader") {
      return { limit: 5, orderBy: "createdAt_desc" };
    }
    // Mechanic: Filter hanya inspeksi yang dibuat oleh user ini
    if (userRole === "mechanic" && currentUserId) {
      return { limit: 5, mechanicId: currentUserId, orderBy: "createdAt_desc" };
    }
    return { limit: 5, orderBy: "createdAt_desc" };
  }, [userRole, currentUserId]);

  // 2. Panggil hook API dengan filter yang sesuai
  const {
    data: apiResponse,
    isLoading,
    isError,
  } = useGetGeneralInspections(queryParams);

  const inspections: Inspection[] = apiResponse?.data || [];

  // 3. Logic helper tetap sama
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
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Tampilan Loading
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Inspeksi Terbaru</CardTitle>
          <CardDescription>Memuat aktivitas...</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        </CardContent>
      </Card>
    );
  }

  // Tampilan Error
  if (isError) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Inspeksi Terbaru</CardTitle>
          <CardDescription>Gagal memuat data.</CardDescription>
        </CardHeader>
        <CardContent className="text-red-500 text-center py-6">
          Kesalahan saat mengambil data inspeksi.
        </CardContent>
      </Card>
    );
  }

  // 4. Render Hasil
  return (
    <Card>
      <CardHeader>
        <CardTitle>Inspeksi Terbaru</CardTitle>
        <CardDescription>
          {userRole === "mechanic"
            ? "Laporan inspeksi terakhir Anda"
            : "Inspeksi terbaru dari tim Anda"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {inspections.map((inspection) => (
            <div
              key={inspection.id}
              className="flex items-center justify-between p-4 border rounded-lg"
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
                      getStatusColor(inspection.status), // Kelas dinamis
                      "self-start"
                    )}
                  >
                    {inspection.status.charAt(0).toUpperCase() +
                      inspection.status.slice(1)}
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
                  // Link Review/Lihat
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
                {/* Mechanic hanya bisa mengedit jika statusnya Ditolak atau Pending, 
                    tetapi kita hanya menampilkan tombol View di dashboard */}
                {inspection.status === "REJECTED" &&
                  userRole === "mechanic" && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        router.push(`/inspections/${inspection.id}/edit`)
                      }
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      Ubah
                    </Button>
                  )}
              </div>
            </div>
          ))}
          {inspections.length === 0 && (
            <div className="text-center py-6 text-muted-foreground">
              <Clock className="w-6 h-6 mx-auto mb-2" />
              Tidak ada inspeksi terbaru ditemukan.
            </div>
          )}
        </div>
        <div className="mt-4 text-center">
          <Link
            href={`${
              userRole === "mechanic" ? "/inspections" : "/verification"
            }`}
          >
            <Button variant="outline">Lihat Semua Inspeksi</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
