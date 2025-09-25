"use client";
import { type TrackInspection } from "@/schemas/inspectionSchema"; // Pastikan path ini benar
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { BigDiggerInspectionForm } from "./track/BigDigger";

// 3. Komponen untuk input pengukuran temperatur silinder

interface TrackInspectionFormProps {
  onSubmit: (data: TrackInspection) => void;
  initialData?: Partial<TrackInspection>;
  isSubmitting?: boolean;
}

export function TrackInspectionForm({
  onSubmit,
  initialData,
  isSubmitting = false,
}: TrackInspectionFormProps) {
  return (
    <Tabs defaultValue="big-digger" className="w-full">
      {/* <TabsList className="grid w-full grid-cols-3"> */}
      <TabsList className="w-full flex overflow-x-auto">
        <TabsTrigger value="big-digger" className="ml-12 sm:ml-0">
          Dump Truck
        </TabsTrigger>
        <TabsTrigger value="heavy-big-digger">Heavy Dump Truck</TabsTrigger>
        <TabsTrigger value="grader">Grader</TabsTrigger>
      </TabsList>
      <TabsContent value="big-digger" className="mt-6">
        <BigDiggerInspectionForm
          onSubmit={onSubmit}
          isSubmitting={isSubmitting}
        />
      </TabsContent>
    </Tabs>
  );
}
