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
// Note: Assuming you have a separate utility to show toasts/notifications

type EquipmentType = "track" | "wheel" | "support";

export default function NewInspectionPage() {
  const [selectedType, setSelectedType] = useState<EquipmentType | null>(null);
  const router = useRouter();

  // Initialize mutation hooks
  const trackMutation = useCreateTrackInspection();
  // const wheelMutation = useCreateWheelInspection(); // Placeholder
  // const supportMutation = useCreateSupportInspection(); // Placeholder

  // Determine the overall submitting state
  const isSubmitting = trackMutation.isPending;
  // || wheelMutation.isPending || supportMutation.isPending;

  const equipmentTypes = [
    {
      type: "track" as const,
      title: "Track Equipment",
      description: "Excavators, bulldozers, and other tracked machinery",
      icon: <Settings className="w-8 h-8" />,
      color: "bg-blue-50 border-blue-200 hover:bg-blue-100",
    },
    {
      type: "wheel" as const,
      title: "Wheel Equipment",
      description: "Loaders, dump trucks, and other wheeled machinery",
      icon: <Wrench className="w-8 h-8" />,
      color: "bg-green-50 border-green-200 hover:bg-green-100",
    },
    {
      type: "support" as const,
      title: "Support Equipment",
      description: "Cranes, scaffolding, and other support structures",
      icon: <FileText className="w-8 h-8" />,
      color: "bg-orange-50 border-orange-200 hover:bg-orange-100",
    },
  ];

  const handleSubmit = async (data: InspectionFormData) => {
    // Note: The isSubmitting state is now managed by the react-query hook (trackMutation.isPending)
    try {
      if (data.equipmentType === "track") {
        // Use mutateAsync to await the API call
        await trackMutation.mutateAsync(data as TrackInspection);

        // Success notification and redirection
        console.log("Track inspection submitted successfully.");
        // showSuccessToast("Track inspection created successfully!"); // Placeholder for toast
        router.push("/inspections");
      } else if (data.equipmentType === "wheel") {
        // await wheelMutation.mutateAsync(data as WheelInspection);
        // router.push("/inspections");
      } else if (data.equipmentType === "support") {
        // await supportMutation.mutateAsync(data as SupportInspection);
        // router.push("/inspections");
      }
    } catch (error) {
      // Error handling from the API response
      console.error("Failed to submit inspection:", error);
      // showErrorToast("Submission failed: " + error.message); // Placeholder for toast
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
      default:
        return null;
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
            Back
          </Button>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                New Inspection
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
                    Select
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div>
            <div className="mb-4"></div>
            {renderForm()}
          </div>
        )}
      </main>
    </div>
  );
}
