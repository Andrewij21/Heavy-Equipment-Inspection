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
    title: "A. Mesin",
    fields: [
      {
        name: "engineFan",
        label: "Perbaiki/ganti bila kipas rusak",
        type: "select",
      },
      {
        name: "engineCoolantSystem",
        label: "Periksa sistem pendingin (coolant system)",
        type: "select",
      },
      {
        name: "engineRadiatorLevel",
        label: "Periksa level air radiator",
        type: "select",
      },
      {
        name: "engineBreather",
        label: "Periksa dan bersihkan breather mesin",
        type: "select",
      },
      {
        name: "engineFuelTank",
        label:
          "Periksa tutup tangki solar, jalur bahan bakar & sambungan. Cek juga kebocoran tangki",
        type: "select",
      },
      {
        name: "engineExhaustPipe",
        label:
          "Periksa/perbaiki pipa knalpot (muffler) dari kebocoran dan kerusakan",
        type: "select",
      },
      {
        name: "engineTurbocharger",
        label: "Periksa kondisi turbocharger dari kebocoran dan kerusakan",
        type: "select",
      },
      {
        name: "engineFloorCleanliness",
        label: "Periksa kebersihan lantai mesin / bersihkan bila kotor",
        type: "select",
      },
    ],
  },
  {
    title: "B. Kelistrikan",
    fields: [
      {
        name: "electricTerminals",
        label: "Periksa terminal & kabel elektroda",
        type: "select",
      },
      {
        name: "electricIndicators",
        label: "Periksa semua indikator & pengukur di panel kontrol",
        type: "select",
      },
      {
        name: "electricBattery",
        label: "Periksa level elektrolit aki, terminal, dan kabel aki",
        type: "select",
      },
      {
        name: "electricSwitchMode",
        label: "Periksa mode saklar (Off, Run, Start)",
        type: "select",
      },
      {
        name: "electricBatteryConnection",
        label: "Periksa aki & kondisi sambungannya",
        type: "select",
      },
    ],
  },
  {
    title: "C. Opsional",
    fields: [{ name: "optionalApar", label: "Periksa APAR", type: "select" }],
  },
  {
    title: "D. Penambahan Pelumas & Pendingin",
    fields: [
      {
        name: "topUpEngineOil",
        label: "Oli Mesin (SAE 15W-40)",
        type: "select",
      },
      {
        name: "topUpCompressor",
        label: "Oli Kompresor (CORENA S4)",
        type: "select",
      },
      { name: "topUpHydraulic", label: "Oli Hidrolik (TO 10)", type: "select" },
      { name: "topUpGrease", label: "Grease (EP NLGI-2)", type: "select" },
      {
        name: "topUpCoolant",
        label: "Cairan Pendingin (Coolant)",
        type: "select",
      },
    ],
  },
];

export default function WeldingMechineInspectionForm({
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
