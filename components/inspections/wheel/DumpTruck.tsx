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
  wheelInspectionSchema,
  type WheelInspection,
} from "@/schemas/inspectionSchema";
import { useForm } from "react-hook-form";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { InspectionSection } from "../InspectionSections";
// Letakkan ini di file WheelInspectionForm.tsx Anda

interface WheelInspectionFormProps {
  onSubmit: (data: WheelInspection) => void;
  initialData?: Partial<WheelInspection>;
  isSubmitting?: boolean;
}

const formSections = [
  {
    title: "A. Engine System",
    fields: [
      {
        name: "engineOilLevel",
        label: "Check engine oil level & any leakage",
        type: "select",
      },
      {
        name: "engineMounting",
        label: "Check engine mounting & fitting parts",
        type: "select",
      },
      {
        name: "coolantLevel",
        label: "Check water coolant level & any lekage",
        type: "select",
      },
      {
        name: "fuelSystem",
        label: "Check fuel system & any leakage",
        type: "select",
      },
      {
        name: "beltTension",
        label: "Check all -belt tension & related parts",
        type: "select",
      },
      {
        name: "airIntakeExhaust",
        label: "Check air intake & exhaust connection",
        type: "select",
      },
    ],
  },
  {
    title: "B. Powertrain (Transmission & Axle)",
    fields: [
      {
        name: "transmissionOilLevel",
        label: "Check oil level and any leakage",
        type: "select",
      },
      {
        name: "clutchFunction",
        label: "Check Clutch Function & Wear Pad Clutch",
        type: "select",
      },
      {
        name: "universalJoint",
        label: "Check Universal Joint",
        type: "select",
      },
    ],
  },
  {
    title: "C. Hydraulic System",
    fields: [
      {
        name: "hydraulicOilLevel",
        label: "Check hydraulic oil level",
        type: "select",
      },
      {
        name: "hydraulicCylinder",
        label: "Check hydraulic cylinder & connection condition",
        type: "select",
      },
      {
        name: "hydraulicPump",
        label:
          "Check any leakage from Pump, Motor, PTO, Hose/ piping connection",
        type: "select",
      },
      {
        name: "hydraulicControlValve",
        label: "Check leak's from control valve",
        type: "select",
      },
    ],
  },
  {
    title: "F. Attachment & Structure",
    fields: [
      {
        name: "dumpBody",
        label: "Check Dump Body, Pin, Pad, Stabilizer, tail gate & vesel",
        type: "select",
      },
      {
        name: "safetyDumpFunction",
        label: "Check Safety Dump Function",
        type: "select",
      },
      { name: "centralGrease", label: "Check Cental Grease", type: "select" },
      {
        name: "allGreasingPoints",
        label: "Check All Greasing Point Area",
        type: "select",
      },
    ],
  },
  {
    title: "G. Top-Up Lubricant & Coolant",
    fields: [
      {
        name: "engineOilTopUp",
        label: "Engine Oil (SAE 15W-40)",
        type: "checkbox",
      },
      {
        name: "transmissionOilTopUp",
        label: "Transmission (RORED EPA 90)",
        type: "checkbox",
      },
      {
        name: "hydraulicOilTopUp",
        label: "Hydraulic (TURALIK 46)",
        type: "checkbox",
      },
      {
        name: "differentialOilTopUp",
        label: "Differential (85W-140)",
        type: "checkbox",
      },
      {
        name: "steeringFluidTopUp",
        label: "Steering (ATF 220)",
        type: "checkbox",
      },
      { name: "greaseTopUp", label: "Grease (V220)", type: "checkbox" },
      { name: "coolantTopUp", label: "Coolant", type: "checkbox" },
    ],
  },
];

export default function DumpTruckInspectionForm({
  onSubmit,
  initialData,
  isSubmitting = false,
}: WheelInspectionFormProps) {
  const form = useForm<WheelInspection>({
    resolver: zodResolver(wheelInspectionSchema),
    defaultValues: {
      equipmentType: "wheel",
      equipmentId: "",
      modelUnit: "",
      location: "",
      operatorName: "",
      mechanicName: "",
      inspectionDate: new Date().toISOString().split("T")[0],
      inspectionTime: new Date().toTimeString().slice(0, 5),
      workingHours: 0,
      notes: "",
      // Booleans default to false
      engineOilLeakage: false,
      coolantLeakage: false,
      transmissionLeakage: false,
      hydraulicLeakage: false,
      engineOilTopUp: false,
      transmissionOilTopUp: false,
      hydraulicOilTopUp: false,
      differentialOilTopUp: false,
      steeringFluidTopUp: false,
      greaseTopUp: false,
      coolantTopUp: false,
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
