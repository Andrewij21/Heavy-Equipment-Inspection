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
        name: "engineVisualCheck",
        label:
          "Pemeriksaan visual kondisi mesin dari: kebocoran, baut kendor & lain-lain",
        type: "select",
      },
      {
        name: "engineUpperLeaks",
        label:
          "Periksa kebocoran oli, kebocoran coolant, dan kebocoran gas di area kompartemen mesin atas",
        type: "select",
      },
      {
        name: "engineFuelLine",
        label:
          "Periksa semua saluran bahan bakar dari kekencangan, keausan, dan kebocoran",
        type: "select",
      },
      {
        name: "engineOilLevel",
        label: "Periksa level oli mesin (tambahkan jika perlu)",
        type: "select",
      },
      {
        name: "engineCoolantLevel",
        label: "Periksa level Coolant (tambahkan jika perlu)",
        type: "select",
      },
      {
        name: "engineHydraulicPump",
        label: "Periksa kondisi Pompa Hidraulik & Saluran",
        type: "select",
      },
      {
        name: "engineElectricalHarness",
        label: "Periksa wiring harness listrik dari kerusakan dan posisi",
        type: "select",
      },
      {
        name: "engineBatteryElectrolyte",
        label: "Periksa level elektrolit baterai",
        type: "select",
      },
      {
        name: "engineBelts",
        label: "Periksa semua belt dari kekencangan dan keausan",
        type: "select",
      },
      {
        name: "engineCoverHandRail",
        label: "Periksa semua cover dan pegangan tangan (hand rail)",
        type: "select",
      },
      {
        name: "engineAlternator",
        label: "Periksa dudukan dan konektor Alternator",
        type: "select",
      },
      {
        name: "engineTransmissionLeaks",
        label: "Periksa transmisi dari kebocoran",
        type: "select",
      },
    ],
  },
  {
    title: "B. Sistem Pendingin (Cooling System)",
    fields: [
      {
        name: "coolingRadiator",
        label: "Periksa Radiator, Aftercooler, Hyd oil cooler & koneksi",
        type: "select",
      },
      {
        name: "coolingFanGuard",
        label: "Periksa kondisi pelindung Kipas (Fan guard)",
        type: "select",
      },
      {
        name: "coolingBeltTension",
        label: "Periksa Ketegangan Belt",
        type: "select",
      },
    ],
  },
  {
    title: "C. Sistem Hidraulik",
    fields: [
      {
        name: "hydraulicWheelLeanCylinder",
        label:
          "Periksa silinder kemiringan roda (wheel lean cylinder) dan dudukannya",
        type: "select",
      },
      {
        name: "hydraulicSteeringCylinder",
        label: "Periksa silinder kemudi (steering cylinder) dan dudukannya",
        type: "select",
      },
      {
        name: "hydraulicBladeLiftCylinder",
        label: "Periksa silinder pengangkat blade dan dudukannya",
        type: "select",
      },
      {
        name: "hydraulicSideShiftCylinder",
        label:
          "Periksa silinder pergeseran samping (side shift cylinder) dan dudukannya",
        type: "select",
      },
      {
        name: "hydraulicCenterShiftCylinder",
        label:
          "Periksa silinder pergeseran tengah (center shift cylinder) dan dudukannya",
        type: "select",
      },
      {
        name: "hydraulicRipperCylinder",
        label: "Periksa silinder ripper dan dudukannya",
        type: "select",
      },
      {
        name: "hydraulicArticulationCylinder",
        label: "Periksa silinder artikulasi dan dudukannya",
        type: "select",
      },
      {
        name: "hydraulicOilLevel",
        label: "Periksa level oli hidraulik (tambahkan jika perlu)",
        type: "select",
      },
    ],
  },
  {
    title: "D. Pemeriksaan Sisi Kiri (LH) - Kanan (RH) Mesin",
    fields: [
      {
        name: "sideMachineFrame",
        label: "Periksa seluruh rangka mesin, badan chassis dari keretakan",
        type: "select",
      },
      {
        name: "sideBladeGet",
        label:
          "Periksa kondisi blade & G.E.T (Ground Engaging Tools) dari baut hilang dan keausan",
        type: "select",
      },
      {
        name: "sideStapeLadder",
        label: "Periksa kondisi Tangga & pegangan tangan",
        type: "select",
      },
      {
        name: "sideTandemHousing",
        label: "Periksa rumah Tandem Kiri/Kanan dari kebocoran",
        type: "select",
      },
      {
        name: "sideCoverGuards",
        label: "Periksa kondisi Cover & Pelindung",
        type: "select",
      },
      {
        name: "sideWheelSpindle",
        label: "Periksa semua bearing spindle roda dari kebocoran",
        type: "select",
      },
      {
        name: "sideFuelTank",
        label: "Periksa tangki bahan bakar dari kerusakan & kebocoran",
        type: "select",
      },
      {
        name: "sideCircleDrive",
        label: "Periksa penggerak lingkaran (circle drive) dari kebocoran",
        type: "select",
      },
      {
        name: "sideArticulationArea",
        label: "Periksa area artikulasi dari penumpukan kotoran",
        type: "select",
      },
      {
        name: "sideHydraulicTank",
        label: "Periksa tangki oli hidraulik dari kerusakan & kebocoran",
        type: "select",
      },
    ],
  },
  {
    title: "G. Kabin - Kelistrikan - & Perangkat Keselamatan",
    fields: [
      {
        name: "cabinGlass",
        label: "Periksa Kondisi Kaca Kabin",
        type: "select",
      },
      {
        name: "cabinRops",
        label: "Periksa Kondisi kabin & ROPS",
        type: "select",
      },
      {
        name: "cabinSeatBelt",
        label: "Periksa kondisi Kursi & Sabuk Pengaman",
        type: "select",
      },
      { name: "cabinDoorLock", label: "Periksa Pintu & Kunci", type: "select" },
      {
        name: "cabinTransmissionSteeringLever",
        label: "Periksa Fungsi Tuas Transmisi & Kontrol Kemudi",
        type: "select",
      },
      {
        name: "cabinAttachmentLever",
        label: "Periksa Tuas Kontrol Attachment",
        type: "select",
      },
      {
        name: "cabinReverseCamera",
        label: "Periksa fungsi Kamera Mundur",
        type: "select",
      },
      { name: "cabinMdvr", label: "Periksa MDVR", type: "select" },
      { name: "cabinAcBlower", label: "Periksa AC / Blower", type: "select" },
      {
        name: "cabinMirror",
        label: "Periksa kondisi Kaca Spion",
        type: "select",
      },
      {
        name: "cabinWiper",
        label: "Periksa kondisi & fungsi wiper",
        type: "select",
      },
      { name: "cabinHorn", label: "Periksa fungsi klakson", type: "select" },
      {
        name: "cabinMonitoringSystem",
        label: "Periksa kondisi sistem pemantauan",
        type: "select",
      },
      {
        name: "cabinSwitch",
        label: "Periksa semua fungsi saklar",
        type: "select",
      },
      {
        name: "cabinLamps",
        label: "Periksa semua fungsi lampu & Rotary lamp",
        type: "select",
      },
      {
        name: "cabinEmergencyStop",
        label: "Periksa Fungsi Tombol Emergency Stop",
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
      { name: "cabinBrake", label: "Periksa semua fungsi Rem", type: "select" },
      {
        name: "cabinParkingBrake",
        label: "Periksa Kontrol Rem Parkir",
        type: "select",
      },
      {
        name: "cabinFireExtinguisher",
        label: "Periksa Alat Pemadam Api Ringan (APAR)",
        type: "select",
      },
    ],
  },
  {
    title: "I. Penambahan Pelumas & Coolant",
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
      { name: "topUpCircle", label: "Circle (TURALIK 46)", type: "select" },
      {
        name: "topUpTransmission",
        label: "Transmisi (SAE-30)",
        type: "select",
      },
      { name: "topUpTandem", label: "Tandem (SAE-30)", type: "select" },
      {
        name: "topUpFinalDrive",
        label: "Final Drive (SAE-30)",
        type: "select",
      },
      {
        name: "topUpFrontWheelHub",
        label: "Hub Roda Depan (Front Wheel Hub) (SAE-30)",
        type: "select",
      },
      { name: "topUpSteering", label: "Kemudi (Steering)", type: "select" },
      { name: "topUpGrease", label: "Gemuk (Grease) (V220)", type: "select" },
      { name: "topUpCoolant", label: "Coolant", type: "select" },
    ],
  },
];

export default function GraderInspectionForm({
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
