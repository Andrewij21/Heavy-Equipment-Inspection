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
// Gunakan konstanta ini untuk form inspeksi baru Anda
export const formSections = [
  {
    title: "A. Engine",
    fields: [
      {
        name: "engineOilLevel",
        label: "Engine Oil (Check Level or Add oil)",
        type: "select",
      },
      { name: "engineOilFilter", label: "Oil Filter (Check)", type: "select" },
      {
        name: "engineFuelFilter",
        label: "Fuel Filter (Check)",
        type: "select",
      },
      {
        name: "engineAirCleaner",
        label: "Air Cleaner (Check & Clean)",
        type: "select",
      },
      {
        name: "engineRadiatorCoolant",
        label: "Radiator Coolant (Check)",
        type: "select",
      },
      {
        name: "engineRubberMounting",
        label: "Engine Rubber Mounting (Check & retighten)",
        type: "select",
      },
      {
        name: "engineFanBelt",
        label: "Fan Belt Tension (Check & Adjust)",
        type: "select",
      },
      {
        name: "engineVisualCheck",
        label: "Complete Visual Check of Unit (Inspect)",
        type: "select",
      },
      {
        name: "engineLeaks",
        label: "Check Leaks (Vacum oil, air & water connector)",
        type: "select",
      },
      {
        name: "engineBearing",
        label: "Bearing (Visual Check & Replace)",
        type: "select",
      },
      {
        name: "engineBoltTightening",
        label: "Bolt Thigtening (Eng & Gen Mounting) (Check & Retorque)",
        type: "select",
      },
    ],
  },
  {
    title: "B. Electric",
    fields: [
      {
        name: "electricStartingCharging",
        label: "Starting & Charging System (check)",
        type: "select",
      },
      {
        name: "electricStartingMotor",
        label: "Starting Motor (check or replace)",
        type: "select",
      },
      {
        name: "electricBattery",
        label: "Battery Electrolite & Terminal (Check or Replace)",
        type: "select",
      },
      {
        name: "electricStartingSwitch",
        label: "Starting Switch (Check Or Replace)",
        type: "select",
      },
      {
        name: "electricAlternator",
        label: "Alternator (Check or Replace)",
        type: "select",
      },
      {
        name: "electricWiringHarness",
        label: "Wiring Harness & Monitor Panel (Check)",
        type: "select",
      },
      {
        name: "electricMcb",
        label: "All MCB (Check or Replace)",
        type: "select",
      },
      {
        name: "electricMeters",
        label: "Ampere Meter, Freq MTR(Hz) (check)",
        type: "select",
      },
      {
        name: "electricSelectorSwitch",
        label: "Selector Switch (Check & replace)",
        type: "select",
      },
      {
        name: "electricPowerCouple",
        label: "Cables Power Couple (check)",
        type: "select",
      },
      { name: "electricAvr", label: "AVR (clean)", type: "select" },
      {
        name: "electricGeneratorSet",
        label: "Generator Set (Visual Check)",
        type: "select",
      },
      {
        name: "electricGrounding",
        label: "Grounding (Earth tester)",
        type: "select",
      },
      {
        name: "electricLightningArrester",
        label: "Penyalur Petir (Earth Tester)",
        type: "select",
      },
      { name: "electricGuarding", label: "Guarding (Check)", type: "select" },
    ],
  },
  {
    title: "C. Opsional",
    fields: [{ name: "optionalApar", label: "Check APAR", type: "select" }],
  },
  {
    title: "D. Top Up Lubricant & Coolant",
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
export default function GensetInspectionForm({
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
