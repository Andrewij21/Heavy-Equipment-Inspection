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
export const formSections = [
  {
    title: "A. Mesin",
    fields: [
      {
        name: "engineOilLevel",
        label: "Periksa level oli mesin & kebocoran",
        type: "select",
      },
      {
        name: "engineMounting",
        label: "Periksa mounting mesin",
        type: "select",
      },
      {
        name: "engineCoolantLevel",
        label: "Periksa level air pendingin & kebocoran",
        type: "select",
      },
      {
        name: "engineFuelSystem",
        label: "Periksa sistem bahan bakar & kebocoran",
        type: "select",
      },
      {
        name: "engineBeltTension",
        label: "Periksa ketegangan sabuk & komponen terkait",
        type: "select",
      },
      {
        name: "engineAirIntake",
        label: "Periksa saluran udara & sambungan knalpot",
        type: "select",
      },
    ],
  },
  {
    title: "B. Transmisi & Kopling",
    fields: [
      {
        name: "transmissionOilLevel",
        label: "Periksa level oli transmisi & kebocoran",
        type: "select",
      },
      {
        name: "transmissionClutch",
        label: "Periksa fungsi kopling & keausan pelat kopling",
        type: "select",
      },
      {
        name: "transmissionUniversalJoint",
        label: "Periksa universal joint",
        type: "select",
      },
    ],
  },
  {
    title: "C. Hidrolik",
    fields: [
      {
        name: "hydraulicOilLevel",
        label: "Periksa level oli hidrolik",
        type: "select",
      },
      {
        name: "hydraulicPumpLeakage",
        label: "Periksa kebocoran pada pompa, motor, PTO, selang/pipa",
        type: "select",
      },
      {
        name: "hydraulicValveLeakage",
        label: "Periksa kebocoran pada control valve",
        type: "select",
      },
    ],
  },
  {
    title: "D. Kabin & Kelistrikan",
    fields: [
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
      {
        name: "cabinSteeringLever",
        label: "Periksa tuas transmisi & kemudi",
        type: "select",
      },
      {
        name: "cabinAttachmentLever",
        label: "Periksa tuas kendali attachment",
        type: "select",
      },
      {
        name: "cabinBallJointTieRod",
        label: "Periksa ball joint tie rod",
        type: "select",
      },
      {
        name: "cabinBallJointDrakLink",
        label: "Periksa ball joint drag link",
        type: "select",
      },
      { name: "cabinAcBlower", label: "Periksa AC / Blower", type: "select" },
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
        label: "Periksa aki & kondisi koneksi",
        type: "select",
      },
      {
        name: "cabinSafetyBelt",
        label: "Periksa sabuk pengaman",
        type: "select",
      },
      { name: "cabinApar", label: "Periksa APAR", type: "select" },
    ],
  },
  {
    title: "E. As Depan, As Belakang & Rem",
    fields: [
      {
        name: "axleDifferentialOil",
        label: "Periksa level oli differential & kebocoran",
        type: "select",
      },
      {
        name: "axleLockCabin",
        label: "Periksa kunci kabin & kunci kemiringan kabin",
        type: "select",
      },
      {
        name: "axlePinSpring",
        label: "Periksa & lumasi pin per, linkage kemudi & trunion",
        type: "select",
      },
      {
        name: "axleTorqueRod",
        label: "Periksa mounting & karet torque rod",
        type: "select",
      },
      {
        name: "axleTyreBrake",
        label: "Periksa ban & fungsi rem",
        type: "select",
      },
      {
        name: "axleSpringUBolt",
        label: "Periksa per & U-Bolt",
        type: "select",
      },
      {
        name: "axleBallJointTieRod",
        label: "Periksa ball joint tie rod",
        type: "select",
      },
      {
        name: "axleBallJointDrakLink",
        label: "Periksa ball joint drag link",
        type: "select",
      },
      {
        name: "axleShockAbsorber",
        label: "Periksa shock absorber",
        type: "select",
      },
      { name: "axleBoltTyre", label: "Periksa baut roda", type: "select" },
      {
        name: "axleHollowSpring",
        label: "Periksa karet hollow spring",
        type: "select",
      },
    ],
  },
  {
    title: "F. Kompartemen Crane",
    fields: [
      {
        name: "craneShackleRope",
        label: "Periksa keausan shackle rope",
        type: "select",
      },
      { name: "craneRopeWire", label: "Periksa kawat sling", type: "select" },
      {
        name: "craneSafetyDevice",
        label: "Periksa safety device kawat sling",
        type: "select",
      },
      {
        name: "craneWireTerminal",
        label: "Periksa terminal fitting kawat sling",
        type: "select",
      },
      {
        name: "craneRopeStretch",
        label: "Periksa kawat sling yang melar",
        type: "select",
      },
      { name: "craneHookBlock", label: "Periksa hook & block", type: "select" },
    ],
  },
  {
    title: "G. Opsional",
    fields: [{ name: "optionalApar", label: "Periksa APAR", type: "select" }],
  },
  {
    title: "H. Tambah Oli & Pendingin",
    fields: [
      {
        name: "topUpEngineOil",
        label: "Oli Mesin (SAE 15W-40)",
        type: "select",
      },
      {
        name: "topUpTransmission",
        label: "Oli Transmisi (80W-90)",
        type: "select",
      },
      {
        name: "topUpHydraulic",
        label: "Oli Hidrolik (TELLUS 46)",
        type: "select",
      },
      {
        name: "topUpDifferential",
        label: "Oli Differential (85W-140)",
        type: "select",
      },
      { name: "topUpSteering", label: "Oli Kemudi (ATF 220)", type: "select" },
      {
        name: "topUpClutchFluid",
        label: "Minyak Kopling (DOT 3)",
        type: "select",
      },
      { name: "topUpGrease", label: "Gemuk (EP NLGI-2)", type: "select" },
      { name: "topUpCoolant", label: "Cairan Pendingin (VCS)", type: "select" },
    ],
  },
];

export default function CraneTruckInspectionForm({
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
