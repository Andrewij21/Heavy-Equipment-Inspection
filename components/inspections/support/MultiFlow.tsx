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
// Gunakan konstanta ini untuk form inspeksi baru Anda
// Gunakan konstanta ini untuk form inspeksi baru Anda
export const formSections = [
  {
    title: "A. Engine",
    fields: [
      {
        name: "engineOilLevel",
        label: "Periksa level oil engine",
        type: "select",
      },
      {
        name: "engineCoolantLevel",
        label: "Periksa level air pendingin",
        type: "select",
      },
      {
        name: "engineVisual",
        label:
          "Pengamatan secara visual area engine dari kebocoran, baut hilang dll",
        type: "select",
      },
      {
        name: "engineAirFilter",
        label: "Periksa kondisi filter udara",
        type: "select",
      },
      {
        name: "engineLeaks",
        label: "Periksa kebocoron oil, kebocoran air pendingin",
        type: "select",
      },
      {
        name: "engineFanBelt",
        label: "Periksa tegangan fan belt",
        type: "select",
      },
      {
        name: "engineHose",
        label: "Periksa hose dari kebocoran",
        type: "select",
      },
    ],
  },
  {
    title: "B. Ponton, Frame, & Pump",
    fields: [
      {
        name: "pontonCondition",
        label: "Periksa pontoon dari keretakan atau keasan",
        type: "select",
      },
      {
        name: "pumpCondition",
        label: "Periksa pompa dari kerusakan",
        type: "select",
      },
      {
        name: "pumpMounting",
        label: "Periksa mounting pompa dari kehilangan atau kerusakan",
        type: "select",
      },
      {
        name: "boltTightness",
        label: "Periksa semua kekencangan baut",
        type: "select",
      },
      {
        name: "suctionDischargeHose",
        label: "Periksa hose pengisap (suctions) hose keluran (discarge)",
        type: "select",
      },
    ],
  },
  {
    title: "C. Electric",
    fields: [
      {
        name: "electricTerminals",
        label: "Periksa terminal atau kabel dari indikasi kerusakan",
        type: "select",
      },
      {
        name: "electricBattery",
        label:
          "Periksa level air battery, kutub positif atau negatif battery dan kabel battery",
        type: "select",
      },
      {
        name: "electricIndicators",
        label: "Periksa semua indikator dan gauge pada konrol panel",
        type: "select",
      },
    ],
  },
  {
    title: "D. Opsional",
    fields: [{ name: "optionalApar", label: "Check APAR", type: "select" }],
  },
  {
    title: "E. Top Up Lubricant & Coolant",
    fields: [
      {
        name: "topUpEngineOil",
        label: "Engine Oil (SAE 15W-40)",
        type: "select",
      },
      { name: "topUpHydraulic", label: "Hydraulic (TO 10)", type: "select" },
      { name: "topUpGrease", label: "Grease (EP NLGI-2)", type: "select" },
      { name: "topUpCoolant", label: "Coolant (CAT)", type: "select" },
    ],
  },
];
export default function MultiFlowInspectionForm({
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
