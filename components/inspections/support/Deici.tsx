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
export const formSections = [
  {
    title: "A. Mesin",
    fields: [
      {
        name: "engineRadiator",
        label: "Periksa kondisi radiator",
        type: "select",
      },
      {
        name: "engineFanGuard",
        label: "Periksa kondisi pelindung kipas (fan guard)",
        type: "select",
      },
      {
        name: "engineBeltTension",
        label: "Periksa ketegangan sabuk (belt)",
        type: "select",
      },
      {
        name: "engineVisualCheck",
        label: "Pemeriksaan visual mesin (kebocoran, baut kendor, dll.)",
        type: "select",
      },
      {
        name: "engineUnusualSound",
        label: "Periksa suara/bunyi tidak normal",
        type: "select",
      },
      {
        name: "engineAlternator",
        label: "Periksa kondisi alternator",
        type: "select",
      },
      {
        name: "engineStarterMotor",
        label: "Periksa kondisi motor starter",
        type: "select",
      },
      {
        name: "engineTurbocharger",
        label: "Periksa turbocharger RH/LH",
        type: "select",
      },
      {
        name: "engineWaterPump",
        label: "Periksa kondisi pompa air",
        type: "select",
      },
      {
        name: "engineLeftFrontWheel",
        label: "Periksa tekanan & baut roda depan kiri",
        type: "select",
      },
      {
        name: "engineRopsCabin",
        label: "Periksa mounting kabin ROPS",
        type: "select",
      },
      {
        name: "engineSteeringLinkage",
        label: "Periksa linkage kemudi",
        type: "select",
      },
      {
        name: "engineFrontSuspension",
        label: "Periksa silinder & mounting suspensi depan",
        type: "select",
      },
      {
        name: "engineRearSuspension",
        label: "Periksa silinder & mounting suspensi belakang",
        type: "select",
      },
      {
        name: "engineBrakeSystem",
        label: "Periksa sistem rem",
        type: "select",
      },
      {
        name: "engineHydraulicTank",
        label: "Periksa tangki hidrolik",
        type: "select",
      },
      {
        name: "engineBrazeForkLifting",
        label: "Periksa braze fork lifting",
        type: "select",
      },
      {
        name: "engineChassisFrame",
        label: "Periksa rangka/chassis utama",
        type: "select",
      },
      {
        name: "engineHoistCylinder",
        label: "Periksa silinder hoist & mounting",
        type: "select",
      },
      {
        name: "engineLeftRearWheel",
        label: "Periksa roda belakang kiri",
        type: "select",
      },
      {
        name: "engineLeftRearFinalDrive",
        label: "Periksa final drive belakang kiri",
        type: "select",
      },
      {
        name: "engineGreaseLine",
        label: "Periksa saluran grease",
        type: "select",
      },
      {
        name: "engineHydraulicLine",
        label: "Periksa saluran hidrolik",
        type: "select",
      },
      {
        name: "engineDifferential",
        label: "Periksa kondisi differential",
        type: "select",
      },
      {
        name: "engineTransmission",
        label: "Periksa kondisi transmisi",
        type: "select",
      },
      {
        name: "enginePowerTrainLine",
        label: "Periksa saluran power train",
        type: "select",
      },
      {
        name: "engineDriveShaft",
        label: "Periksa kondisi joint drive shaft",
        type: "select",
      },
      {
        name: "engineFrontSuspensionGrease",
        label: "Suspensi depan RH/LH (periksa grease)",
        type: "select",
      },
      {
        name: "engineSteeringCylinderGrease",
        label: "Silinder kemudi (periksa grease)",
        type: "select",
      },
      {
        name: "engineSpiderJointGrease",
        label: "Spider joint (periksa grease)",
        type: "select",
      },
      {
        name: "engineRearSuspensionGrease",
        label: "Suspensi belakang RH/LH (periksa grease)",
        type: "select",
      },
      {
        name: "engineFrontRearAxleGrease",
        label: "Tie rod as depan & belakang (periksa grease)",
        type: "select",
      },
      {
        name: "enginePinForkLiftingGrease",
        label: "Pin fork lifting (periksa grease)",
        type: "select",
      },
      {
        name: "engineParkingBrake",
        label: "Periksa kontrol rem parkir",
        type: "select",
      },
      {
        name: "engineAirCleaner",
        label: "Periksa kondisi saringan udara",
        type: "select",
      },
      {
        name: "engineSteeringOilTank",
        label: "Periksa tangki oli kemudi",
        type: "select",
      },
      {
        name: "engineTankMounting",
        label: "Periksa mounting tangki",
        type: "select",
      },
      {
        name: "engineGreaseSystem",
        label: "Periksa sistem grease",
        type: "select",
      },
      {
        name: "engineRightRearWheel",
        label: "Periksa tekanan & baut roda belakang kanan",
        type: "select",
      },
      {
        name: "engineRhFinalDrive",
        label: "Periksa kondisi final drive kanan (RH)",
        type: "select",
      },
      {
        name: "engineBrakeSystem2",
        label: "Periksa sistem rem",
        type: "select",
      },
      {
        name: "engineRearSuspension2",
        label: "Periksa silinder & mounting suspensi belakang",
        type: "select",
      },
      {
        name: "engineFuelTank",
        label: "Periksa tangki & mounting bahan bakar",
        type: "select",
      },
      {
        name: "engineFuelLine",
        label: "Periksa kondisi saluran bahan bakar",
        type: "select",
      },
      {
        name: "engineChassisMounting",
        label: "Periksa rangka & mounting",
        type: "select",
      },
      {
        name: "engineFrontSuspension2",
        label: "Periksa silinder & mounting suspensi depan",
        type: "select",
      },
      {
        name: "engineSteeringLinkage2",
        label: "Periksa linkage kemudi",
        type: "select",
      },
    ],
  },
  {
    title: "B. Kabin & Kelistrikan",
    fields: [
      {
        name: "cabinRops",
        label: "Periksa kondisi kabin & ROPS",
        type: "select",
      },
      {
        name: "cabinCleaning",
        label: "Bersihkan kabin & periksa fungsi panel",
        type: "select",
      },
      {
        name: "cabinLock",
        label: "Periksa kunci kabin & kunci kemiringan kabin",
        type: "select",
      },
      { name: "cabinAcBlower", label: "Periksa AC / Blower", type: "select" },
      {
        name: "cabinSafetyBelt",
        label: "Periksa sabuk pengaman",
        type: "select",
      },
      { name: "cabinApar", label: "Periksa APAR", type: "select" },
      {
        name: "cabinWheelChock",
        label: "Periksa wheel chock & safety cone",
        type: "select",
      },
      {
        name: "cabinEmergencyStop",
        label: "Periksa fungsi tombol darurat (Emergency Stop)",
        type: "select",
      },
      {
        name: "cabinSwitchFunction",
        label: "Periksa fungsi switch",
        type: "select",
      },
      {
        name: "cabinLampFunction",
        label: "Periksa semua lampu & lampu rotary",
        type: "select",
      },
      {
        name: "cabinBattery",
        label: "Periksa aki, kondisi koneksi, & level elektrolit",
        type: "select",
      },
    ],
  },
  {
    title: "C. Penambahan Oli & Pendingin",
    fields: [
      {
        name: "topUpEngineOil",
        label: "Oli Mesin (SAE 15W-40)",
        type: "select",
      },
      { name: "topUpHydraulic", label: "Oli Hidrolik (TO 10)", type: "select" },
      { name: "topUpGrease", label: "Gemuk (EP NLGI-2)", type: "select" },
      { name: "topUpCoolant", label: "Cairan Pendingin (VCS)", type: "select" },
    ],
  },
];

export default function DeiciInspectionForm({
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
