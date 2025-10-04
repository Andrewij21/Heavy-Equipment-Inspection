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
        name: "engineOilLevel",
        label: "Oli Mesin (Periksa Level / Tambah Oli)",
        type: "select",
      },
      {
        name: "engineOilFilter",
        label: "Filter Oli (Periksa)",
        type: "select",
      },
      {
        name: "engineFuelFilter",
        label: "Filter Bahan Bakar (Periksa)",
        type: "select",
      },
      {
        name: "engineAirCleaner",
        label: "Saringan Udara (Periksa & Bersihkan)",
        type: "select",
      },
      {
        name: "engineRadiatorCoolant",
        label: "Air Pendingin Radiator (Periksa)",
        type: "select",
      },
      {
        name: "engineRubberMounting",
        label: "Karet Dudukan Mesin (Periksa & Kencangkan Ulang)",
        type: "select",
      },
      {
        name: "engineFanBelt",
        label: "Tali Kipas (Fan Belt) (Periksa & Sesuaikan)",
        type: "select",
      },
      {
        name: "engineVisualCheck",
        label: "Pemeriksaan Visual Unit Lengkap",
        type: "select",
      },
      {
        name: "engineLeaks",
        label: "Kebocoran (Oli vakum, udara & konektor air)",
        type: "select",
      },
      {
        name: "engineBearing",
        label: "Bearing (Periksa Visual & Ganti bila perlu)",
        type: "select",
      },
      {
        name: "engineBoltTightening",
        label:
          "Pengencangan Baut (Mesin & Dudukan Genset) (Periksa & Kencangkan Ulang)",
        type: "select",
      },
    ],
  },
  {
    title: "B. Kelistrikan",
    fields: [
      {
        name: "electricStartingCharging",
        label: "Sistem Starter & Pengisian (Periksa)",
        type: "select",
      },
      {
        name: "electricStartingMotor",
        label: "Motor Starter (Periksa / Ganti)",
        type: "select",
      },
      {
        name: "electricBattery",
        label: "Aki (Elektrolit & Terminal) (Periksa / Ganti)",
        type: "select",
      },
      {
        name: "electricStartingSwitch",
        label: "Saklar Starter (Periksa / Ganti)",
        type: "select",
      },
      {
        name: "electricAlternator",
        label: "Alternator (Periksa / Ganti)",
        type: "select",
      },
      {
        name: "electricWiringHarness",
        label: "Kabel Harness & Panel Monitor (Periksa)",
        type: "select",
      },
      {
        name: "electricMcb",
        label: "Semua MCB (Periksa / Ganti)",
        type: "select",
      },
      {
        name: "electricMeters",
        label: "Ampere Meter & Frequency Meter (Hz) (Periksa)",
        type: "select",
      },
      {
        name: "electricSelectorSwitch",
        label: "Saklar Selektor (Periksa / Ganti)",
        type: "select",
      },
      {
        name: "electricPowerCouple",
        label: "Kabel Power & Coupling (Periksa)",
        type: "select",
      },
      { name: "electricAvr", label: "AVR (Bersihkan)", type: "select" },
      {
        name: "electricGeneratorSet",
        label: "Genset (Pemeriksaan Visual)",
        type: "select",
      },
      {
        name: "electricGrounding",
        label: "Grounding (Tes Pentanahan)",
        type: "select",
      },
      {
        name: "electricLightningArrester",
        label: "Penyalur Petir (Tes Pentanahan)",
        type: "select",
      },
      {
        name: "electricGuarding",
        label: "Pelindung (Periksa)",
        type: "select",
      },
    ],
  },
  {
    title: "C. Opsional",
    fields: [{ name: "optionalApar", label: "APAR (Periksa)", type: "select" }],
  },
  {
    title: "D. Pengisian Pelumas & Pendingin",
    fields: [
      {
        name: "topUpEngineOil",
        label: "Oli Mesin (SAE 15W-40) (Isi Ulang)",
        type: "select",
      },
      {
        name: "topUpCoolant",
        label: "Air Pendingin (Isi Ulang)",
        type: "select",
      },
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
