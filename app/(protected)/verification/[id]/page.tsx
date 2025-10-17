"use client";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { VerificationDetailView } from "@/components/inspections/VerificationDetailView";
import { useUpdateTrackStatus } from "@/queries/track";
import { useUpdateInspectionStatus } from "@/queries/inspection";

export default function VerificationDetailPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const updateStatusMutation = useUpdateInspectionStatus();

  const handleStatusHandler = async (
    id: string,
    status: "APPROVED" | "REJECTED",
    comments: string
  ) => {
    // 1. Buat pesan dinamis berdasarkan aksi
    const actionText = status === "APPROVED" ? "Approving" : "Rejecting";
    const toastId = toast.loading(`${actionText} inspection...`);
    updateStatusMutation.mutate(
      {
        id: id,
        statusData: { status, comments },
      },
      {
        onSuccess: () => {
          // 2. Tampilkan toast SUKSES di sini
          toast.success(`Inspection has been ${status.toLowerCase()}!`, {
            id: toastId,
          });
          console.log(`Inspeksi ${id} berhasil diperbarui menjadi ${status}`);

          // 3. Pindahkan navigasi ke sini agar hanya terjadi setelah sukses
          router.push("/verification");
        },
        onError: (error) => {
          // 4. Tampilkan toast ERROR di sini
          toast.error("Update Failed", {
            id: toastId,
            description:
              "Could not update the inspection status. Please try again.",
          });
          console.error(`Gagal memperbarui status untuk ${id}:`, error);
        },
      }
    );
  };

  return (
    <div className="min-h-screen py-6">
      <VerificationDetailView
        id={params.id}
        handleStatusHandler={handleStatusHandler}
        showActions={true}
      />
    </div>
  );
}
