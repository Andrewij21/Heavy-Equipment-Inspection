"use client";
import { type WheelInspection } from "@/schemas/inspectionSchema"; // Pastikan path ini benar
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import DumpTruckInspectionForm from "./wheel/DumpTruck";
import HeavyDumpTruckInspectionForm from "./wheel/HeavyDumpTruck";

interface WheelInspectionFormProps {
  onSubmit: (data: WheelInspection) => void;
  initialData?: Partial<WheelInspection>;
  isSubmitting?: boolean;
}

export function WheelInspectionForm({
  onSubmit,
  initialData,
  isSubmitting = false,
}: WheelInspectionFormProps) {
  return (
    <Tabs defaultValue="dump-truck" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="dump-truck">Dump Truck</TabsTrigger>
        <TabsTrigger value="heavy-dump-truck">Heavy Dump Truck</TabsTrigger>
      </TabsList>
      <TabsContent value="dump-truck" className="mt-6">
        <DumpTruckInspectionForm
          onSubmit={onSubmit}
          isSubmitting={isSubmitting}
        />
      </TabsContent>
      <TabsContent value="heavy-dump-truck" className="mt-6">
        <HeavyDumpTruckInspectionForm
          onSubmit={onSubmit}
          isSubmitting={isSubmitting}
        />
      </TabsContent>
    </Tabs>
  );
}
