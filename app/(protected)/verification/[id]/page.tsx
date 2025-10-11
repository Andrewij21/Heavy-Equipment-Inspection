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
    const toastId = toast.loading("Approving inspection...");
    try {
      updateStatusMutation.mutate(
        {
          id: id,
          statusData: { status },
        },
        {
          onSuccess: () => {
            console.log(`Inspeksi ${id} berhasil diperbarui menjadi ${status}`);
            // Invalisadi react-query ditangani oleh hook
          },
          onError: (error) => {
            console.error(`Gagal memperbarui status track untuk ${id}:`, error);
            // Tampilkan notifikasi error
          },
        }
      );

      router.push("/verification");
    } catch (error) {
      console.error("Failed to approve inspection:", error);
      toast.error("Approval Failed", {
        id: toastId,
        description: "Failed to approve the inspection. Please try again.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
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
        </div>
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
