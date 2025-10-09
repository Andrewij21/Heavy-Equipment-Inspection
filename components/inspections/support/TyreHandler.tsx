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
import {
  SupportInspectionSchema,
  type SupportInspection,
} from "@/schemas/supportSchema";
import { useFieldArray, useForm } from "react-hook-form";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { InspectionSection } from "../InspectionSections";
import { useAuth } from "@/context/AuthContext";
import { Trash2 } from "lucide-react";
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
    title: "D. Opsional",
    fields: [{ name: "optionalApar", label: "Check APAR", type: "select" }],
  },
  {
    title: "E. Top Up Lubricant & Coolant",
    fields: [
      { name: "topUpCoolant", label: "Coolant", type: "qty" },
      {
        name: "topUpEngineOil",
        label: "Engine Oil (SAE 15W-40)",
        type: "qty",
      },
      { name: "topUpHydraulic", label: "Hydraulic)", type: "qty" },
    ],
  },
];

export default function DeiciInspectionForm({
  onSubmit,
  initialData,
  isSubmitting = false,
}: SupportInspectionFormProps) {
  const { user } = useAuth();
  const form = useForm<SupportInspection>({
    resolver: zodResolver(SupportInspectionSchema),
    defaultValues: {
      equipmentType: "support",
      supportGeneralType: "TyreHandler",
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
