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
    title: "A. Mesin (Engine)",
    fields: [
      {
        name: "engineOilLevel",
        label: "Periksa level & kebocoran oli mesin",
        type: "select",
      },
      {
        name: "engineMounting",
        label: "Periksa dudukan mesin & bagian fitting",
        type: "select",
      },
      {
        name: "engineCoolantLevel",
        label: "Periksa level air pendingin (coolant) & kebocoran",
        type: "select",
      },
      {
        name: "engineFuelSystem",
        label: "Periksa sistem bahan bakar & kebocoran",
        type: "select",
      },
      {
        name: "engineBeltTension",
        label: "Periksa semua ketegangan belt & bagian terkait",
        type: "select",
      },
      {
        name: "engineAirIntake",
        label: "Periksa koneksi saluran masuk udara (air intake) & knalpot",
        type: "select",
      },
    ],
  },
  {
    title: "B. Transmisi & Kopling (Clutch)",
    fields: [
      {
        name: "transmissionOilLevel",
        label: "Periksa level oli dan kebocoran",
        type: "select",
      },
      {
        name: "transmissionClutch",
        label: "Periksa Fungsi Kopling & Keausan Pad Kopling",
        type: "select",
      },
      {
        name: "transmissionUniversalJoint",
        label: "Periksa Universal Joint & Beri Pelumas (Lubricate)",
        type: "select",
      },
    ],
  },
  {
    title: "C. Hidraulik",
    fields: [
      {
        name: "hydraulicOilLevel",
        label: "Periksa level oli hidraulik",
        type: "select",
      },
      {
        name: "hydraulicCylinder",
        label: "Periksa kondisi silinder hidraulik & sambungan",
        type: "select",
      },
      {
        name: "hydraulicHoseLeakage",
        label: "Periksa kebocoran dari selang (hose) / perpipaan",
        type: "select",
      },
      {
        name: "hydraulicPumpLeakage",
        label:
          "Periksa kebocoran dari Pompa, Motor, PTO, Sambungan Selang/perpipaan",
        type: "select",
      },
      {
        name: "hydraulicValveLeakage",
        label: "Periksa kebocoran dari control valve",
        type: "select",
      },
    ],
  },
  {
    title: "D. Kabin & Kelistrikan",
    fields: [
      {
        name: "cabinCleaning",
        label: "Bersihkan kabin & periksa Fungsi panel",
        type: "select",
      },
      {
        name: "cabinLock",
        label: "Periksa kunci kabin & kunci kemiringan (tilt) kabin",
        type: "select",
      },
      {
        name: "cabinSeatBelt",
        label: "Periksa Kursi & Sabuk Pengaman",
        type: "select",
      },
      {
        name: "cabinSteeringLever",
        label: "Periksa Fungsi Tuas Transmisi & Kontrol Kemudi",
        type: "select",
      },
      {
        name: "cabinAttachmentLever",
        label: "Periksa Tuas Kontrol Attachment",
        type: "select",
      },
      {
        name: "cabinTravelControl",
        label: "Periksa Kontrol Gerak (Travel control)",
        type: "select",
      },
      { name: "cabinAcBlower", label: "Periksa AC / Blower", type: "select" },
      {
        name: "cabinMirror",
        label: "Periksa kondisi kaca spion",
        type: "select",
      },
      { name: "cabinSwitch", label: "Periksa fungsi saklar", type: "select" },
      { name: "cabinWiper", label: "Periksa fungsi wiper", type: "select" },
      { name: "cabinHorn", label: "Periksa fungsi klakson", type: "select" },
      {
        name: "cabinLamps",
        label: "Periksa fungsi semua lampu & Rotary lamp",
        type: "select",
      },
      {
        name: "cabinBattery",
        label: "Periksa Baterai & kondisi sambungan",
        type: "select",
      },
      {
        name: "cabinRadio",
        label: "Periksa Komunikasi Radio",
        type: "select",
      },
      { name: "cabinBrake", label: "Periksa semua fungsi rem", type: "select" },
      {
        name: "cabinEmergencyStop",
        label: "Periksa fungsi Emergency Stop",
        type: "select",
      },
      { name: "cabinApar", label: "Periksa APAR", type: "select" },
    ],
  },
  {
    title: "E. Axle",
    fields: [
      {
        name: "axleDriveOilLevel",
        label: "Periksa level oli di drive axle dan kebocoran",
        type: "select",
      },
      {
        name: "axleWheelHubLevel",
        label: "Periksa level di hub roda dan kebocoran",
        type: "select",
      },
      {
        name: "axleReducingGear",
        label: "Periksa di axle reducing gear dan kebocoran",
        type: "select",
      },
      {
        name: "axleNutWheel",
        label: "Periksa mur roda (550Nm) dan tekanan ban",
        type: "select",
      },
    ],
  },
  {
    title: "F. Attachment",
    fields: [
      {
        name: "attachmentDrumReduction",
        label: "Periksa level oli di drum reduction gear dan kebocoran",
        type: "select",
      },
      {
        name: "attachmentVibrationBearing",
        label: "Periksa level oli di bearing vibrasi dan kebocoran",
        type: "select",
      },
    ],
  },
  {
    title: "G. Penambahan Pelumas & Coolant",
    fields: [
      {
        name: "topUpEngineOil",
        label: "Oli Mesin (SAE 15W-40)",
        type: "select",
      },
      {
        name: "topUpHydraulic",
        label: "Hidraulik (TURALIK 46)",
        type: "select",
      },
      {
        name: "topUpTransmission",
        label: "Transmisi (85W-140)",
        type: "select",
      },
      {
        name: "topUpDifferential",
        label: "Differensial (85W-140)",
        type: "select",
      },
      {
        name: "topUpFinalDrive",
        label: "Final Drive (85W-140)",
        type: "select",
      },
      {
        name: "topUpWheelMotor",
        label: "Motor Roda (85W-140)",
        type: "select",
      },
      { name: "topUpVibrator", label: "Vibrator (85W-140)", type: "select" },
      { name: "topUpGrease", label: "Grease (V220)", type: "select" },
      { name: "topUpCoolant", label: "Coolant", type: "select" },
    ],
  },
];

export default function CompactorInspectionForm({
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
