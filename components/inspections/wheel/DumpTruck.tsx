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
    title: "A. Sistem Mesin (Engine System)",
    fields: [
      {
        name: "engineOilLevel",
        label: "Periksa level oli mesin & kebocoran",
        type: "select",
      },
      {
        name: "engineMounting",
        label: "Periksa dudukan mesin & bagian fitting",
        type: "select",
      },
      {
        name: "coolantLevel",
        label: "Periksa level air pendingin (coolant) & kebocoran",
        type: "select",
      },
      {
        name: "fuelSystem",
        label: "Periksa sistem bahan bakar & kebocoran",
        type: "select",
      },
      {
        name: "beltTension",
        label: "Periksa semua ketegangan belt & bagian terkait",
        type: "select",
      },
      {
        name: "airIntakeExhaust",
        label: "Periksa sambungan saluran masuk udara (air intake) & knalpot",
        type: "select",
      },
    ],
  },
  {
    title: "B. Powertrain (Transmisi & Axle)",
    fields: [
      {
        name: "transmissionOilLevel",
        label: "Periksa level oli dan kebocoran",
        type: "select",
      },
      {
        name: "clutchFunction",
        label: "Periksa Fungsi Kopling & Keausan Pad Kopling",
        type: "select",
      },
      {
        name: "universalJoint",
        label: "Periksa Universal Joint",
        type: "select",
      },
    ],
  },
  {
    title: "C. Sistem Hidraulik",
    fields: [
      {
        name: "hydraulicOilLevel",
        label: "Periksa level oli hidraulik",
        type: "select",
      },
      {
        name: "hydraulicCylinder",
        label: "Periksa silinder hidraulik & kondisi sambungan",
        type: "select",
      },
      {
        name: "hydraulicPump",
        label:
          "Periksa kebocoran dari Pompa, Motor, PTO, Sambungan Selang/perpipaan",
        type: "select",
      },
      {
        name: "hydraulicControlValve",
        label: "Periksa kebocoran dari control valve",
        type: "select",
      },
    ],
  },
  {
    title: "F. Attachment & Struktur",
    fields: [
      {
        name: "dumpBody",
        label: "Periksa Dump Body, Pin, Pad, Stabilizer, tail gate & vessel",
        type: "select",
      },
      {
        name: "safetyDumpFunction",
        label: "Periksa Fungsi Pengaman Dump",
        type: "select",
      },
      {
        name: "centralGrease",
        label: "Periksa Central Grease",
        type: "select",
      },
      {
        name: "allGreasingPoints",
        label: "Periksa Semua Titik Pemberian Gemuk (Greasing Point Area)",
        type: "select",
      },
    ],
  },
  {
    title: "G. Penambahan Pelumas & Coolant",
    fields: [
      {
        name: "engineOilTopUp",
        label: "Oli Mesin (SAE 15W-40)",
        type: "checkbox",
      },
      {
        name: "transmissionOilTopUp",
        label: "Transmisi (RORED EPA 90)",
        type: "checkbox",
      },
      {
        name: "hydraulicOilTopUp",
        label: "Hidraulik (TURALIK 46)",
        type: "checkbox",
      },
      {
        name: "differentialOilTopUp",
        label: "Differensial (85W-140)",
        type: "checkbox",
      },
      {
        name: "steeringFluidTopUp",
        label: "Fluida Kemudi (Steering) (ATF 220)",
        type: "checkbox",
      },
      { name: "greaseTopUp", label: "Gemuk (Grease) (V220)", type: "checkbox" },
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
              Informasi Header
              <Badge variant="outline">Peralatan Roda</Badge>
            </CardTitle>
            <CardDescription>
              Unit CN, model, lokasi, personel, tanggal & HM
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="equipmentId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nomor Unit (CN Unit)</FormLabel>
                    <FormControl>
                      <Input placeholder="Contoh: WHL-001" {...field} />
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
                      <Input placeholder="Contoh: CAT 950H" {...field} />
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
                    <FormLabel>Lokasi</FormLabel>
                    <FormControl>
                      <Input placeholder="Contoh: Site B, Zona 2" {...field} />
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
                    <FormLabel>Tanggal</FormLabel>
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
                    <FormLabel>Waktu</FormLabel>
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
                    <FormLabel>Jam Kerja (HM)</FormLabel>
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
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Inspection"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
