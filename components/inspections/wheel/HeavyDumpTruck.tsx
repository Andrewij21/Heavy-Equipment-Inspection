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
        name: "engineVisual",
        label:
          "Pemeriksaan visual kondisi mesin dari: kebocoran, baut kendor & lain-lain",
        type: "select",
      },
      {
        name: "upperEngineLeaks",
        label:
          "Periksa kebocoran oli, kebocoran coolant dan kebocoran gas di area kompartemen mesin atas",
        type: "select",
      },
      {
        name: "fuelLine",
        label:
          "Periksa semua saluran bahan bakar (fuel line) dari kekencangan, keausan dan kebocoran",
        type: "select",
      },
      {
        name: "unusualSound",
        label: "Periksa bunyi/suara yang tidak biasa",
        type: "select",
      },
      {
        name: "alternatorCondition",
        label: "Periksa kondisi alternator",
        type: "select",
      },
      {
        name: "starterMotorCondition",
        label: "Periksa kondisi starter motor",
        type: "select",
      },
      {
        name: "acCompressorCondition",
        label: "Periksa kondisi kompresor AC",
        type: "select",
      },
      {
        name: "turbochargerCondition",
        label: "Periksa Turbocharger Kanan (RH)/Kiri (LH)",
        type: "select",
      },
      {
        name: "waterPumpCondition",
        label: "Periksa kondisi Water Pump",
        type: "select",
      },
    ],
  },
  {
    title: "B. Sistem Pendingin (Cooling System)",
    fields: [
      {
        name: "radiatorConnection",
        label: "Periksa Radiator & koneksi",
        type: "select",
      },
      {
        name: "fanGuardCondition",
        label: "Periksa kondisi pelindung Kipas (Fan guard)",
        type: "select",
      },
      { name: "beltTension", label: "Periksa Ketegangan Belt", type: "select" },
    ],
  },
  {
    title: "C. Pemeriksaan Sisi Kiri (LH) Mesin",
    fields: [
      {
        name: "leftFrontWheel",
        label: "Periksa tekanan & pengencang roda depan kiri",
        type: "select",
      },
      {
        name: "ropsMounting",
        label: "Periksa dudukan kabin ROPS",
        type: "select",
      },
      {
        name: "steeringLinkage",
        label: "Periksa Sambungan Kemudi (Steering Linkage)",
        type: "select",
      },
      {
        name: "frontSuspension",
        label: "Periksa silinder & dudukan Suspensi Depan",
        type: "select",
      },
      {
        name: "rearSuspension",
        label: "Periksa silinder & dudukan Suspensi Belakang",
        type: "select",
      },
      {
        name: "hydraulicTank",
        label: "Periksa tangki Hidraulik",
        type: "select",
      },
      { name: "tankMounting", label: "Periksa Dudukan Tangki", type: "select" },
      {
        name: "chassisMainFrame",
        label: "Periksa Chassis/Main Frame",
        type: "select",
      },
      {
        name: "hoistCylinder",
        label: "Periksa Silinder Hoist & dudukan",
        type: "select",
      },
      {
        name: "leftRearWheel",
        label: "Periksa Roda Belakang Kiri",
        type: "select",
      },
      {
        name: "leftRearFinalDrive",
        label: "Periksa Final Drive belakang kiri",
        type: "select",
      },
      { name: "dumpBody", label: "Periksa Dump Body", type: "select" },
      {
        name: "greaseLine",
        label: "Periksa Saluran Gemuk (Grease Line)",
        type: "select",
      },
      {
        name: "hydraulicLine",
        label: "Periksa Saluran Hidraulik",
        type: "select",
      },
      {
        name: "airCleaner",
        label: "Periksa kondisi Filter Udara (Air Cleaner)",
        type: "select",
      },
      {
        name: "steeringOilTank",
        label: "Periksa Tangki Oli Kemudi",
        type: "select",
      },
      {
        name: "greaseSystem",
        label: "Periksa Sistem Gemuk (Grease System)",
        type: "select",
      },
      {
        name: "batteryElectrolyte",
        label: "Periksa Level Elektrolit Baterai",
        type: "select",
      },
      {
        name: "handRail",
        label: "Periksa kondisi Pegangan Tangan (Hand Rail)",
        type: "select",
      },
      { name: "walkways", label: "Periksa kondisi Walkways", type: "select" },
    ],
  },
  {
    title: "D. Pemeriksaan Sisi Kanan (RH) Mesin",
    fields: [
      {
        name: "rightRearWheel",
        label: "Periksa tekanan & pengencang roda belakang kanan",
        type: "select",
      },
      {
        name: "rhFinalDrive",
        label: "Periksa kondisi Final Drive Kanan (RH)",
        type: "select",
      },
      {
        name: "rhRearSuspension",
        label: "Periksa Silinder & Dudukan Suspensi Belakang",
        type: "select",
      },
      {
        name: "fuelTankMounting",
        label: "Periksa Tangki Bahan Bakar & Dudukan",
        type: "select",
      },
      {
        name: "fuelLineCondition",
        label: "Periksa kondisi Saluran Bahan Bakar",
        type: "select",
      },
      {
        name: "rhChassisMounting",
        label: "Periksa Chassis & Dudukan",
        type: "select",
      },
      {
        name: "rhFrontSuspension",
        label: "Periksa Silinder & Dudukan Suspensi Depan",
        type: "select",
      },
      {
        name: "rhSteeringLinkage",
        label: "Periksa Sambungan Kemudi (Steering Linkage)",
        type: "select",
      },
      {
        name: "rhDumpBodyCondition",
        label: "Periksa kondisi dump body",
        type: "select",
      },
    ],
  },
  {
    title: "E. Rakitan Axle Belakang (Rear Axle Assembly)",
    fields: [
      {
        name: "rearAxleLooseBolts",
        label: "Periksa Baut Kendor",
        type: "select",
      },
      {
        name: "rearAxleOilLeaks",
        label: "Periksa Kebocoran Oli",
        type: "select",
      },
    ],
  },
  {
    title: "F. Power Train",
    fields: [
      {
        name: "differentialCondition",
        label: "Periksa Kondisi Differensial",
        type: "select",
      },
      {
        name: "transmissionCondition",
        label: "Periksa kondisi transmisi",
        type: "select",
      },
      {
        name: "powerTrainLine",
        label: "Periksa kondisi Saluran Power Train",
        type: "select",
      },
      {
        name: "torqueConverter",
        label: "Periksa kondisi Torque Converter",
        type: "select",
      },
      {
        name: "driveShaftJoint",
        label: "Periksa kondisi sambungan Drive Shaft",
        type: "select",
      },
    ],
  },
  {
    title: "G. Kabin & Perangkat Keselamatan",
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
        name: "seatSafetyBelt",
        label: "Periksa kondisi Kursi & Sabuk Pengaman",
        type: "select",
      },
      { name: "wiperFunction", label: "Periksa fungsi Wiper", type: "select" },
      { name: "hornFunction", label: "Periksa fungsi Klakson", type: "select" },
      {
        name: "radioCommunication",
        label: "Periksa Komunikasi Radio",
        type: "select",
      },
      { name: "reverseCamera", label: "Periksa Kamera Mundur", type: "select" },
      { name: "mdvr", label: "Periksa MDVR", type: "select" },
      {
        name: "mirrorCondition",
        label: "Periksa kondisi Kaca Spion",
        type: "select",
      },
      { name: "doorLock", label: "Periksa Pintu & Kunci", type: "select" },
      {
        name: "monitoringSystem",
        label: "Periksa kondisi sistem pemantauan",
        type: "select",
      },
      {
        name: "secondarySteering",
        label: "Periksa Kemudi Sekunder",
        type: "select",
      },
      {
        name: "allBrakeFunction",
        label: "Periksa semua fungsi Rem",
        type: "select",
      },
      {
        name: "parkingBrakeControl",
        label: "Periksa Kontrol Rem Parkir",
        type: "select",
      },
      {
        name: "emergencyStop",
        label: "Periksa Fungsi Emergency Stop",
        type: "select",
      },
      {
        name: "fireExtinguisher",
        label: "Periksa Alat Pemadam Api Ringan (APAR)",
        type: "select",
      },
    ],
  },
  {
    title: "I. Penambahan Pelumas & Coolant",
    description: "Pilih kondisi untuk setiap item pelumas dan pendingin.",
    fields: [
      {
        name: "conditionEngineOil",
        label: "Oli Mesin (SAE 15W-40)",
        type: "select",
      },
      {
        name: "conditionHydraulic",
        label: "Hidraulik (TURALIK 46)",
        type: "select",
      },
      {
        name: "conditionFrontSuspension",
        label: "Suspensi Depan (TURALIK 46)",
        type: "select",
      },
      {
        name: "conditionRearSuspension",
        label: "Suspensi Belakang (TURALIK 46)",
        type: "select",
      },
      {
        name: "conditionTransmission",
        label: "Transmisi (SAE-30)",
        type: "select",
      },
      {
        name: "conditionDifferential",
        label: "Differensial (SAE-30)",
        type: "select",
      },
      {
        name: "conditionFinalDrive",
        label: "Final Drive (SAE-30)",
        type: "select",
      },
      { name: "conditionBrakeFluid", label: "Rem (SAE-30)", type: "select" },
      { name: "conditionSteering", label: "Kemudi (Steering)", type: "select" },
      {
        name: "conditionGrease",
        label: "Gemuk (Grease) (V220)",
        type: "select",
      },
      { name: "conditionCoolant", label: "Coolant", type: "select" },
    ],
  },
];

export default function HeavyDumpTruckInspectionForm({
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
