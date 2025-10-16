"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrackInspectionForm } from "@/components/inspections/TrackInspectionForm";
import { WheelInspectionForm } from "@/components/inspections/WheelInspectionForm";
import { SupportInspectionForm } from "@/components/inspections/SupportInspectionForm";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, FileText, Settings, Wrench } from "lucide-react";
import type {
  InspectionFormData,
  TrackInspection,
  WheelInspection,
  SupportInspection,
} from "@/schemas/inspectionSchema";

// NEW IMPORT: Import the track mutation hook
import { useCreateTrackInspection } from "@/queries/track";
import BackButton from "@/components/BackButton";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { useCreateWheelInspection } from "@/queries/wheele";
import { useCreateSupportInspection } from "@/queries/support";
import TyreInspectionForm from "@/components/inspections/tyre/TyreDetailsInspectionForm";
import { useCreateTyreInspection } from "@/queries/tyre";
// Note: Assuming you have a separate utility to show toasts/notifications

type EquipmentType = "track" | "wheel" | "support" | "tyre";

export default function NewInspectionPage() {
  const [selectedType, setSelectedType] = useState<EquipmentType | null>(null);
  const router = useRouter();
  const { user } = useAuth();

  const userId = user?.id;

  // Initialize mutation hooks
  const trackMutation = useCreateTrackInspection();
  const wheelMutation = useCreateWheelInspection();
  const supportMutation = useCreateSupportInspection();
  const tyreMutation = useCreateTyreInspection();
  // const wheelMutation = useCreateWheelInspection(); // Placeholder
  // const supportMutation = useCreateSupportInspection(); // Placeholder

  // Determine the overall submitting state
  const isSubmitting = trackMutation.isPending;

  const equipmentTypes = [
    {
      type: "track" as const,
      title: "Section Track", // Tetap dalam Bahasa Inggris
      description: "Ekskavator, buldozer, dan unit track lain nya", // Diubah ke Bahasa Indonesia
      icon: <Settings className="w-8 h-8" />,
      color: "bg-blue-50 border-blue-200 hover:bg-blue-100",
    },
    {
      type: "wheel" as const,
      title: "Section Wheel", // Tetap dalam Bahasa Inggris
      description: "Loader, dump truck, dan mesin beroda lainnya", // Diubah ke Bahasa Indonesia
      icon: <Wrench className="w-8 h-8" />,
      color: "bg-green-50 border-green-200 hover:bg-green-100",
    },
    {
      type: "support" as const,
      title: "Section Support", // Tetap dalam Bahasa Inggris
      description: "Generator, Tower Lamp dan struktur pendukung lainya", // Diubah ke Bahasa Indonesia
      icon: <FileText className="w-8 h-8" />,
      color: "bg-orange-50 border-orange-200 hover:bg-orange-100",
    },
    {
      type: "tyre" as const,
      title: "Section Tyre",
      description:
        "Pemeriksaan ban, termasuk posisi, tekanan, dan kondisi fisik.",
      icon: <Wrench className="w-8 h-8" />, // Icon changed to a wrench
      color: "bg-slate-50 border-slate-200 hover:bg-slate-100", // Color changed to gray/slate
    },
  ];

  const handleSubmit = async (data: any) => {
    // Pastikan ID mekanik tersedia
    if (!userId) {
      console.error("User ID not found. Cannot submit inspection.");
      toast.error("User session required.");
      return;
    }

    // Objek data yang siap dikirim
    const payload = {
      ...data,
      mechanicId: userId,
    };
    console.log({ payload });
    try {
      if (data.equipmentType === "track") {
        await trackMutation.mutateAsync(payload as TrackInspection);

        console.log("Pemeriksaan Track berhasil diserahkan."); // Diubah ke Bahasa Indonesia
        toast.success("Pemeriksaan Berhasil Dibuat", {
          description:
            "Pemeriksaan track telah berhasil diserahkan dan menunggu tinjauan.",
          duration: 3000,
        });
        router.push("/inspections");
      } else if (data.equipmentType === "wheel") {
        await wheelMutation.mutateAsync(payload as any);
        console.log("Pemeriksaan Wheel berhasil diserahkan.");
        toast.success("Pemeriksaan Berhasil Dibuat", {
          description:
            "Pemeriksaan wheel telah berhasil diserahkan dan menunggu tinjauan.",
          duration: 3000,
        });
        router.push("/inspections");
        // --- AKHIR LOGIC WHEEL INSPECTION ---
      } else if (data.equipmentType === "support") {
        await supportMutation.mutateAsync(payload as any);
        toast.success("Pemeriksaan Berhasil Dibuat", {
          description:
            "Pemeriksaan support telah berhasil diserahkan dan menunggu tinjauan.",
          duration: 3000,
        });
        router.push("/inspections");
      } else if (data.equipmentType === "tyre") {
        await tyreMutation.mutateAsync(payload as any);
        toast.success("Pemeriksaan Berhasil Dibuat", {
          description:
            "Pemeriksaan tyre telah berhasil diserahkan dan menunggu tinjauan.",
          duration: 3000,
        });
        router.push("/inspections");
      }
    } catch (error) {
      console.error("Gagal mengirimkan pemeriksaan:", error); // Diubah ke Bahasa Indonesia
      // Menampilkan pesan error spesifik dari server jika ada
      const errorMessage =
        (error as any)?.response?.data?.message ||
        "Submission failed: Terjadi kesalahan saat mengirim data.";
      toast.error(errorMessage);
    }
  };

  const renderForm = () => {
    switch (selectedType) {
      case "track":
        return (
          <TrackInspectionForm
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        );
      case "wheel":
        return (
          <WheelInspectionForm
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        );
      case "support":
        return (
          <SupportInspectionForm
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        );
      case "tyre":
        return (
          <TyreInspectionForm
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen">
      <main className="max-w-4xl mx-auto py-6">
        <div className="mb-6">
          <BackButton />

          <div className="flex items-center justify-between">
            <div>
              {/* Judul utama tetap dalam Bahasa Inggris */}
              <h1 className="text-3xl font-bold text-gray-900">
                Inspeksi Baru
              </h1>
            </div>
            {selectedType && (
              <Badge variant="outline" className="text-sm">
                {equipmentTypes.find((t) => t.type === selectedType)?.title}
              </Badge>
            )}
          </div>
        </div>

        {!selectedType ? (
          <div className="grid gap-6 md:grid-cols-3">
            {equipmentTypes.map((equipment) => (
              <Card
                key={equipment.type}
                className={`cursor-pointer transition-colors ${equipment.color}`}
                onClick={() => setSelectedType(equipment.type)}
              >
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 text-gray-600">
                    {equipment.icon}
                  </div>
                  <CardTitle className="text-lg">{equipment.title}</CardTitle>
                  <CardDescription className="text-sm">
                    {equipment.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <Button variant="outline" className="w-full bg-transparent">
                    Pilih {/* Diubah ke Bahasa Indonesia */}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div>{renderForm()}</div>
        )}
      </main>
    </div>
  );
}
