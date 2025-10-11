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
  Plus,
  Search,
  Eye,
  Edit,
  Filter,
  FileText,
  ArrowLeft,
  Clock,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import BackButton from "@/components/BackButton";
import { useAuth } from "@/context/AuthContext";
import { useMemo } from "react";
import { useGetGeneralInspections } from "@/queries/inspection";
import clsx from "clsx";
interface RecentInspectionsProps {
  userRole: "mechanic" | "leader" | "admin"; // Admin seharusnya tidak masuk ke sini
}
interface Inspection {
  id: string;
  equipmentId: string;
  equipmentType: "track" | "wheel" | "support";
  mechanicName: string;
  status: "PENDING" | "APPROVED" | "REJECTED"; // Gunakan status uppercase dari API
  createdAt: string;
  issues?: number; // Opsional
}
export default function InspectionsPage() {
  // Data contoh - ganti dengan data dari API

  const { user } = useAuth(); // Ambil user ID dan role dari AuthContext
  const userRole = user?.role;
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

  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <BackButton />
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row  sm:justify-between items-start gap-4 sm:items-center">
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

        {/* Filter */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Filter</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              {/* Pencarian */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Cari ID peralatan..." className="pl-10" />
              </div>

              {/* Jenis Peralatan */}
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Jenis Peralatan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Jenis</SelectItem>
                  <SelectItem value="track">Peralatan Track</SelectItem>
                  <SelectItem value="wheel">Peralatan Roda</SelectItem>
                  <SelectItem value="support">Peralatan Pendukung</SelectItem>
                </SelectContent>
              </Select>

              {/* Status */}
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Status</SelectItem>
                  <SelectItem value="pending">Menunggu</SelectItem>
                  <SelectItem value="approved">Disetujui</SelectItem>
                  <SelectItem value="rejected">Ditolak</SelectItem>
                </SelectContent>
              </Select>

              {/* Tombol Terapkan */}
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Terapkan Filter
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Daftar Inspeksi */}
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
                {/* {inspection.status === "REJECTED" &&
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
                  )} */}
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
      </main>
    </div>
  );
}
