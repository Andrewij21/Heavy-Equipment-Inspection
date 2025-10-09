"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import DumpTruckInspectionForm from "./wheel/DumpTruck";
import HeavyDumpTruckInspectionForm from "./wheel/HeavyDumpTruck";
import GraderInspectionForm from "./wheel/Grader";
import CompactorInspectionForm from "./wheel/Compactor";
import type { WheelInspection } from "@/schemas/wheelSchema";

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
      {/* <TabsList className="grid w-full grid-cols-3"> */}
      <TabsList className="w-full flex overflow-x-auto">
        <TabsTrigger value="dump-truck" className="ml-12 sm:ml-0">
          Dump Truck
        </TabsTrigger>
        <TabsTrigger value="heavy-dump-truck">Heavy Dump Truck</TabsTrigger>
        <TabsTrigger value="grader">Grader</TabsTrigger>
        <TabsTrigger value="compactor">Compactor</TabsTrigger>
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
      <TabsContent value="grader" className="mt-6">
        <GraderInspectionForm onSubmit={onSubmit} isSubmitting={isSubmitting} />
      </TabsContent>
      <TabsContent value="compactor" className="mt-6">
        <CompactorInspectionForm
          onSubmit={onSubmit}
          isSubmitting={isSubmitting}
        />
      </TabsContent>
    </Tabs>
  );
}
