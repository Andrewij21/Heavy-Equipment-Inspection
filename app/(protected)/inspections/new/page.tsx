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
import type { InspectionFormData } from "@/schemas/inspectionSchema";

type EquipmentType = "track" | "wheel" | "support";

export default function NewInspectionPage() {
  const [selectedType, setSelectedType] = useState<EquipmentType | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

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
    setIsSubmitting(true);
    try {
      // Mock API call - replace with actual API endpoint
      console.log("Submitting inspection:", data);

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Redirect to inspections list
      router.push("/inspections");
    } catch (error) {
      console.error("Failed to submit inspection:", error);
    } finally {
      setIsSubmitting(false);
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
              <p className="mt-1 text-sm text-gray-600">
                {selectedType
                  ? `Complete the ${
                      equipmentTypes.find((t) => t.type === selectedType)?.title
                    } inspection form`
                  : "Select the type of equipment you want to inspect"}
              </p>
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
            <div className="mb-4">
              <Button variant="outline" onClick={() => setSelectedType(null)}>
                Change Equipment Type
              </Button>
            </div>
            {renderForm()}
          </div>
        )}
      </main>
    </div>
  );
}
