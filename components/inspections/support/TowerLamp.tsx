"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  supportInspectionSchema,
  type SupportInspection,
} from "@/schemas/inspectionSchema";
import { useForm } from "react-hook-form";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { InspectionSection } from "../InspectionSections";
// Letakkan ini di file WheelInspectionForm.tsx Anda

interface SupportInspectionFormProps {
  onSubmit: (data: SupportInspection) => void;
  initialData?: Partial<SupportInspection>;
  isSubmitting?: boolean;
}

// Gunakan konstanta ini untuk form inspeksi baru Anda
export const formSections = [
  {
    title: "A. Engine",
    fields: [
      {
        name: "engineOilLevel",
        label: "Check engine oil level & any leakage",
        type: "select",
      },
      {
        name: "engineMounting",
        label: "Check engine mounting",
        type: "select",
      },
      {
        name: "engineCoolantLevel",
        label: "Check water coolant level & any lekage",
        type: "select",
      },
      {
        name: "engineFuelSystem",
        label: "Check fuel system & any leakage",
        type: "select",
      },
      {
        name: "engineBeltTension",
        label: "Check all -belt tension & related parts",
        type: "select",
      },
      {
        name: "engineAirIntake",
        label: "Check air intake & exhaust connection",
        type: "select",
      },
    ],
  },
  {
    title: "B. Hydraulic",
    fields: [
      {
        name: "hydraulicOilLevel",
        label: "Check hydraulic oil level",
        type: "select",
      },
      {
        name: "hydraulicPumpLeakage",
        label:
          "Check any leakage from Pump, Motor,PTO, Hose/ piping connection",
        type: "select",
      },
      {
        name: "hydraulicValveLeakage",
        label: "Check leak's from control valve",
        type: "select",
      },
      { name: "hydraulicWireRope", label: "Check wire rope", type: "select" },
      {
        name: "hydraulicTelescopicTower",
        label: "Check telescopic tower",
        type: "select",
      },
    ],
  },
  {
    title: "C. Electric",
    fields: [
      {
        name: "electricWorkLamp",
        label: "Check all work lamp",
        type: "select",
      },
      {
        name: "electricSwitchLamp",
        label: "Check all switch lamp",
        type: "select",
      },
      {
        name: "electricPanelMonitor",
        label: "Check fungsion panel monitor",
        type: "select",
      },
      {
        name: "electricGeneratorConnection",
        label: "Check Generator conection",
        type: "select",
      },
      {
        name: "electricBattery",
        label: "Check Battery & connection condition",
        type: "select",
      },
      {
        name: "electricGeneratorVoltage",
        label: "Check Tegangan Output Generator",
        type: "select",
      },
      {
        name: "electricBreakerCurrent",
        label: "Check Arus Output Breker",
        type: "select",
      },
      { name: "electricFrequency", label: "Check Frekuensi", type: "select" },
    ],
  },
  {
    title: "D. Opsional",
    fields: [
      {
        name: "optionalVisualSkidding",
        label: "Check visual Skiding",
        type: "select",
      },
      { name: "optionalApar", label: "Check APAR", type: "select" },
    ],
  },
  {
    title: "E. Top Up Lubricant & Coolant",
    fields: [
      {
        name: "topUpEngineOil",
        label: "Engine Oil (SAE 15W-40)",
        type: "select",
      },
      { name: "topUpCoolant", label: "Coolant", type: "select" },
    ],
  },
];
export default function TowerLampInspectionForm({
  onSubmit,
  initialData,
  isSubmitting = false,
}: SupportInspectionFormProps) {
  const form = useForm<SupportInspection>({
    resolver: zodResolver(supportInspectionSchema),
    defaultValues: {
      equipmentType: "support",
      equipmentId: "",
      modelUnit: "",
      location: "",
      operatorName: "",
      mechanicName: "",
      inspectionDate: new Date().toISOString().split("T")[0],
      inspectionTime: new Date().toTimeString().slice(0, 5),
      workingHours: 0,
      loadCapacity: 0,
      engineOilLeakage: false,
      coolantLeakage: false,
      hydraulicLeakage: false,
      engineOilTopUp: false,
      hydraulicOilTopUp: false,
      coolantTopUp: false,
      greaseTopUp: false,
      notes: "",
      ...initialData,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Header Information tetap di sini karena strukturnya sedikit berbeda */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Header Information
              <Badge variant="outline">Wheel Equipment</Badge>
            </CardTitle>
            <CardDescription>
              CN Unit, model, location, personnel, date & HM
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="equipmentId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CN Unit</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., WHL-001" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="modelUnit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Model Unit</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., CAT 950H" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Site B, Zone 2" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="inspectionDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="inspectionTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Time</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="workingHours"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Working Hours (HM)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="0"
                        {...field}
                        onChange={(e) =>
                          field.onChange(Number.parseFloat(e.target.value) || 0)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>
        {/* Me-render semua section secara dinamis */}
        {formSections.map((section) => (
          <InspectionSection
            key={section.title}
            control={form.control}
            title={section.title}
            fields={section.fields}
          />
        ))}

        {/* Tombol Submit tetap di akhir */}
        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline">
            Save as Draft
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Inspection"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
