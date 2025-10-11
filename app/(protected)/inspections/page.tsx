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
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import BackButton from "@/components/BackButton";

export default function InspectionsPage() {
  // Data contoh - ganti dengan data dari API
  const mockInspections = [
    {
      id: "1",
      equipmentId: "EXC-001",
      equipmentType: "track",
      status: "pending",
      createdAt: "2024-01-15T10:30:00Z",
      location: "Site A, Zone 1",
      issues: 2,
    },
    {
      id: "2",
      equipmentId: "WHL-002",
      equipmentType: "wheel",
      status: "approved",
      createdAt: "2024-01-15T09:15:00Z",
      location: "Site B, Zone 2",
      issues: 0,
    },
    {
      id: "3",
      equipmentId: "SUP-003",
      equipmentType: "support",
      status: "rejected",
      createdAt: "2024-01-14T16:45:00Z",
      location: "Site C, Zone 3",
      issues: 5,
    },
  ];

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
          {mockInspections.map((inspection) => (
            <Card key={inspection.id}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4">
                      <div>
                        <h3 className="text-lg font-semibold">
                          {inspection.equipmentId}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {getEquipmentTypeLabel(inspection.equipmentType)}
                        </p>
                      </div>
                      <Badge className={getStatusColor(inspection.status)}>
                        {inspection.status === "pending"
                          ? "Menunggu"
                          : inspection.status === "approved"
                          ? "Disetujui"
                          : "Ditolak"}
                      </Badge>
                    </div>
                    <div className="mt-2 flex items-center space-x-6 text-sm text-muted-foreground">
                      <span>📅 {formatDate(inspection.createdAt)}</span>
                    </div>
                  </div>

                  {/* Tombol Aksi */}
                  <div className="flex gap-2 flex-col sm:flex-row space-x-2">
                    <Button
                      className="w-full sm:w-fit"
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        router.push(`/inspections/${inspection.id}`)
                      }
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      <span className="hidden sm:block">Lihat</span>
                    </Button>
                    {/* {inspection.status === "rejected" && (
                      <Button
                        className="w-full sm:w-fit"
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          router.push(`/inspections/${inspection.id}/edit`)
                        }
                      >
                        <Edit className="w-4 h-4 mr-1" />
                        <span className="hidden sm:block">Ubah</span>
                      </Button>
                    )} */}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Jika Tidak Ada Data */}
        {mockInspections.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <div className="text-muted-foreground mb-4">
                <FileText className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-lg font-medium">Tidak ada inspeksi</h3>
                <p className="text-sm">
                  Mulailah dengan membuat inspeksi peralatan pertama Anda.
                </p>
              </div>
              <Link href="/inspections/new">
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Buat Inspeksi Pertama
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
