"use client";
import { type TrackInspection } from "@/schemas/inspectionSchema"; // Pastikan path ini benar
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { BigDiggerInspectionForm } from "./track/BigDigger";
import { SmallPCInspectionForm } from "./track/SmallPC";
import { BullDozerInspectionForm } from "./track/Bulldozer";

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
          Big Digger
        </TabsTrigger>
        <TabsTrigger value="small-pc">Small PC</TabsTrigger>
        <TabsTrigger value="bulldozer">Bulldozer</TabsTrigger>
      </TabsList>
      <TabsContent value="big-digger" className="mt-6">
        <BigDiggerInspectionForm
          onSubmit={onSubmit}
          isSubmitting={isSubmitting}
        />
      </TabsContent>
      <TabsContent value="small-pc" className="mt-6">
        <SmallPCInspectionForm
          onSubmit={onSubmit}
          isSubmitting={isSubmitting}
        />
      </TabsContent>
      <TabsContent value="bulldozer" className="mt-6">
        <BullDozerInspectionForm
          onSubmit={onSubmit}
          isSubmitting={isSubmitting}
        />
      </TabsContent>
    </Tabs>
  );
}
