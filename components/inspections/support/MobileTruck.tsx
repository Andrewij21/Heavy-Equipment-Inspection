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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFieldArray, useForm } from "react-hook-form";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { InspectionSection } from "../InspectionSections";
import { useAuth } from "@/context/AuthContext";
import {
  SupportInspectionSchema,
  type SupportInspection,
} from "@/schemas/supportSchema";
import { Trash2 } from "lucide-react";
// Letakkan ini di file WheelInspectionForm.tsx Anda

interface SupportInspectionFormProps {
  onSubmit: (data: SupportInspection) => void;
  initialData?: Partial<SupportInspection>;
  isSubmitting?: boolean;
}

const formSections = [
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
        label: "Periksa dudukan mesin",
        type: "select",
      },
      {
        name: "engineCoolantLevel",
        label: "Periksa level air coolant & kebocoran",
        type: "select",
      },
      {
        name: "engineFuelSystem",
        label: "Periksa sistem bahan bakar & kebocoran",
        type: "select",
      },
      {
        name: "engineBeltTension",
        label: "Periksa ketegangan semua belt & komponen terkait",
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
        label: "Periksa level oli & kebocoran",
        type: "select",
      },
      {
        name: "transmissionClutch",
        label: "Periksa fungsi kopling & keausan kampas kopling",
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
        label: "Periksa kunci kabin & pengunci kemiringan kabin",
        type: "select",
      },
      {
        name: "cabinSteeringLever",
        label: "Periksa fungsi tuas transmisi & kemudi",
        type: "select",
      },
      {
        name: "cabinAttachmentLever",
        label: "Periksa tuas kontrol attachment",
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
    title: "E. As Roda Depan, Belakang & Rem",
    fields: [
      {
        name: "axleDifferentialOil",
        label: "Periksa level oli diferensial & kebocoran",
        type: "select",
      },
      {
        name: "axleLockCabin",
        label: "Periksa kunci kabin & pengunci kemiringan kabin",
        type: "select",
      },
      {
        name: "axlePinSpring",
        label: "Periksa & lumasi pin per, linkage kemudi & trunion",
        type: "select",
      },
      {
        name: "axleTorqueRod",
        label: "Periksa dudukan & karet torque rod",
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
    title: "F. Attachment",
    fields: [
      {
        name: "attachmentTankLeakage",
        label: "Periksa bodi & kebocoran tangki WT - LT - FT",
        type: "select",
      },
      {
        name: "attachmentBallValve",
        label: "Periksa ball valve, selang, pipa & gun WT - LT - FT",
        type: "select",
      },
      {
        name: "attachmentAirCompressor",
        label: "Periksa kompresor udara LT",
        type: "select",
      },
      {
        name: "attachmentAirPump",
        label: "Periksa semua pompa udara & tekanan manometer LT",
        type: "select",
      },
      {
        name: "attachmentWaterSprayer",
        label: "Periksa sprayer air & water canon WT",
        type: "select",
      },
      {
        name: "attachmentDriveCoupling",
        label: "Periksa drive coupling WT",
        type: "select",
      },
      {
        name: "attachmentWaterPump",
        label: "Periksa pompa air & tekanan manometer WT",
        type: "select",
      },
      {
        name: "attachmentFuelPump",
        label: "Periksa pompa bahan bakar & tekanan manometer FT",
        type: "select",
      },
      {
        name: "attachmentCouplingJointer",
        label: "Periksa coupling jointer FT & LT",
        type: "select",
      },
    ],
  },
  {
    title: "G. Penambahan Pelumas & Pendingin",
    fields: [
      {
        name: "topUpEngineOil",
        label: "Oli Mesin (SAE 15W-40)",
        type: "qty",
      },
      {
        name: "topUpTransmission",
        label: "Oli Transmisi (80W-90)",
        type: "qty",
      },
      {
        name: "topUpHydraulic",
        label: "Oli Hidrolik (TELLUS 46)",
        type: "qty",
      },
      {
        name: "topUpDifferential",
        label: "Oli Diferensial (85W-140)",
        type: "qty",
      },
      {
        name: "topUpSteering",
        label: "Oli Power Steering (ATF 220)",
        type: "qty",
      },
      {
        name: "topUpClutchFluid",
        label: "Minyak Kopling (DOT 3)",
        type: "qty",
      },
      { name: "topUpGrease", label: "Grease (EP NLGI-2)", type: "qty" },
      { name: "topUpCoolant", label: "Coolant (VCS)", type: "qty" },
    ],
  },
];

export default function MobileTruckInspectionForm({
  onSubmit,
  initialData,
  isSubmitting = false,
}: SupportInspectionFormProps) {
  const { user } = useAuth();
  const form = useForm<SupportInspection>({
    resolver: zodResolver(SupportInspectionSchema),
    defaultValues: {
      equipmentType: "support",
      supportGeneralType: "Mobile",
      equipmentId: "",
      modelUnit: "",
      location: "",
      operatorName: user?.username || "",
      mechanicName: user?.username || "",
      inspectionDate: new Date().toISOString().split("T")[0],
      inspectionTime: new Date().toTimeString().slice(0, 5),
      workingHours: 0,
      notes: "",
      // Booleans default to false
      findings: [{ description: "", status: "open" }],
      ...initialData,
    },
  });
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "findings",
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
                name="equipmentId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nomor Unit</FormLabel>
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
                name="smr" // Pastikan ini ditambahkan ke defaultValues
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>SMR (Pembacaan Meter Servis)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="0"
                        {...field}
                        // 1. KONTROL TAMPILAN:
                        // Jika field.value adalah 0, tampilkan string kosong ("").
                        // Jika tidak, tampilkan nilai sebenarnya.
                        value={field.value === 0 ? "" : field.value}
                        // 2. KONTROL PERUBAHAN:
                        // Jika input kosong (e.target.value === ""), kirim 0 ke useForm.
                        // Jika ada nilai, kirim nilai numeriknya.
                        onChange={(e) => {
                          const rawValue = e.target.value;
                          const numericValue = Number.parseFloat(rawValue);

                          // Kirim 0 jika string kosong, jika tidak kirim nilai numerik (atau NaN jika tidak valid)
                          field.onChange(rawValue === "" ? 0 : numericValue);
                        }}
                      />
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
                name="shift" // Pastikan ini ditambahkan ke defaultValues
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Shift</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="w-full">
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih Shift" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="day">Siang</SelectItem>
                        <SelectItem value="night">Malam</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="timeDown" // Pastikan ini ditambahkan ke defaultValues
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Waktu Turun (Time Down)</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="timeOut" // Pastikan ini ditambahkan ke defaultValues
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Waktu Keluar (Time Out)</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
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
        <Card>
          <CardHeader>
            <CardTitle>Finding Inspection Unit (Temuan Inspeksi)</CardTitle>
            <CardDescription>
              Catat kerusakan atau temuan lain di sini.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80%]">Finding Description</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {fields.map((field, index) => (
                  <TableRow key={field.id}>
                    <TableCell>
                      <FormField
                        control={form.control}
                        name={`findings.${index}.description`}
                        render={({ field }) => (
                          <Input placeholder="Deskripsi temuan..." {...field} />
                        )}
                      />
                    </TableCell>
                    <TableCell>
                      <FormField
                        control={form.control}
                        name={`findings.${index}.status`}
                        render={({ field }) => (
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="open">Open</SelectItem>
                              <SelectItem value="close">Close</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        onClick={() => remove(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="mt-4"
              onClick={() => append({ description: "", status: "open" })}
            >
              + Add Finding
            </Button>
          </CardContent>
        </Card>
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
