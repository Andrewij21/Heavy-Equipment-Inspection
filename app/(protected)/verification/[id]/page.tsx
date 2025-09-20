"use client";
import { useParams, useRouter } from "next/navigation";
import { InspectionDetailView } from "@/components/inspections/InspectionDetailView";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";

interface PageProps {
  params: {
    id: string;
  };
}

export default function VerificationDetailPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  // Mock data - replace with real data from API
  const mockInspection = {
    id: params.id,
    equipmentId: "EXC-001",
    equipmentType: "track" as const,
    mechanicName: "John Mechanic",
    status: "pending" as const,
    createdAt: "2024-01-15T10:30:00Z",
    location: "Site A, Zone 1",
    operatorName: "Mike Operator",
    workingHours: 8.5,
    notes:
      "Equipment showing signs of wear on track pads. Hydraulic system appears to be functioning normally. Recommend monitoring track pad wear closely.",
    // Track specific fields
    trackCondition: "fair",
    trackTension: "proper",
    sprocketWear: "moderate",
    idlerCondition: "good",
    rollerCondition: "good",
    trackPadWear: 65,
    hydraulicLeaks: false,
    greaseLevels: "adequate",
  };

  const handleApprove = async (id: string, comments: string) => {
    const toastId = toast.loading("Approving inspection...");
    try {
      // Mock API call - replace with actual API endpoint
      console.log("Approving inspection:", { id, comments });

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success("Inspection Approved", {
        id: toastId,
        description: "The inspection has been successfully approved.",
      });

      router.push("/verification");
    } catch (error) {
      console.error("Failed to approve inspection:", error);
      toast.error("Approval Failed", {
        id: toastId,
        description: "Failed to approve the inspection. Please try again.",
      });
    }
  };

  const handleReject = async (id: string, comments: string) => {
    const toastId = toast.loading("Rejecting inspection...");

    try {
      // Mock API call - replace with actual API endpoint
      console.log("Rejecting inspection:", { id, comments });

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success("Inspection Rejected", {
        id: toastId,
        description: "The inspection has been sent back for revision.",
      });

      router.push("/verification");
    } catch (error) {
      console.error("Failed to reject inspection:", error);
      toast.error("Rejection Failed", {
        id: toastId,
        description: "Failed to reject the inspection. Please try again.",
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

        <InspectionDetailView
          inspection={mockInspection}
          onApprove={handleApprove}
          onReject={handleReject}
          showActions={true}
        />
      </main>
    </div>
  );
}
