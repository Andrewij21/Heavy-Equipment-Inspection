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
    status: "APPROVED" | "REJECTED"
  ) => {
    // 1. Buat pesan dinamis berdasarkan aksi
    const actionText = status === "APPROVED" ? "Approving" : "Rejecting";
    const toastId = toast.loading(`${actionText} inspection...`);

    updateStatusMutation.mutate(
      {
        id: id,
        statusData: { status },
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
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Verification
          </Button>

          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Inspection Review
            </h1>
            <p className="mt-1 text-sm text-gray-600">
              Review the inspection details and provide verification
            </p>
          </div>
        </div> */}
        <VerificationDetailView
          id={params.id}
          handleStatusHandler={handleStatusHandler}
          showActions={true}
        />
        {/* <InspectionDetailView
          inspection={mockInspection}
          onApprove={handleApprove}
          onReject={handleReject}
          showActions={true}
        /> */}
      </main>
    </div>
  );
}
