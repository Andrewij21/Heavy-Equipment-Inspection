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
import {
  WheelInspectionSchema,
  type WheelInspection,
} from "@/schemas/wheelSchema";
import { useAuth } from "@/context/AuthContext";
import { Trash2 } from "lucide-react";
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
    title: "D. Kabin - Kelistrikan - & Perangkat Keselamatan",
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
    title: "E. Rear Axle & Structure Details",
    fields: [
      {
        name: "structureFrameCracks",
        label:
          "Check entire Machine frame, chasis body for cracks (Periksa frame engine, chasis dan body)",
        type: "select",
      },
      {
        name: "structureBladeGETCondition", // Field baru untuk Blade & GET
        label:
          "Check condition of blade & G.E.T for missing bolts dan wear (Periksa kondisi blade, dan G.E.T terhadap keausan)",
        type: "select",
      },
      {
        name: "structureStepLadderCondition", // Field baru untuk Step Ladder
        label:
          "Check Stape Ladder & hands hold condition (Periksa kondisi Step Ladder)",
        type: "select",
      },
      {
        name: "structureTandemHousingLeaks",
        label:
          "Check LH/RH Tandem housing for leaks (Periksa kebocoran pada Tandem LH/RH)",
        type: "select",
      },
      {
        name: "structureCoverGuards",
        label: "Check Cover & Guards condition (Periksa kondisi cover & Guard)",
        type: "select",
      },
      {
        name: "structureWheelSpindleLeaks",
        label:
          "Check all wheel spindle bearing for leaks (periksa kebocoran pada Spindle bearing)",
        type: "select",
      },
      {
        name: "fuelTankDamageLeaks",
        label:
          "Check Fuel tank for damage & leak (Periksa kerusakan & kebocoran pada fuel tank)",
        type: "select",
      },
      {
        name: "structureCircleDriveLeaks",
        label:
          "Check circle drive for leaks (Periksa kebocoran pada circle drive)",
        type: "select",
      },
      {
        name: "structureArticulationCleanliness",
        label:
          "Check articulation area for dirt buld up (Periksa kebersihan pada ariculation)",
        type: "select",
      },
      {
        name: "hydraulicTankDamageLeaks",
        label:
          "Check hydraulic oil tank for damage & leaks (Perikisa kerusakan pada tanki hydrauic)",
        type: "select",
      },
    ],
  },
  {
    title: "F. Penambahan Pelumas & Coolant",
    fields: [
      { name: "topUpCoolant", label: "Coolant", type: "qty" },

      {
        name: "topUpEngineOil",
        label: "Oli Mesin (SAE 15W-40)",
        type: "qty",
      },

      {
        name: "topUpTransmission",
        label: "Transmisi (SAE-30)",
        type: "qty",
      },
      { name: "topUpTandem", label: "Tandem (SAE-30)", type: "qty" },
      {
        name: "topUpFinalDrive",
        label: "Final Drive (SAE-30)",
        type: "qty",
      },
      {
        name: "topUpBreak",
        label: "Break (HD-30)",
        type: "qty",
      },
      { name: "topUpCircle", label: "Circle (TURALIK 46)", type: "qty" },

      {
        name: "topUpHydraulic",
        label: "Hidraulik (TURALIK 46)",
        type: "qty",
      },
    ],
  },
];

export default function GraderInspectionForm({
  onSubmit,
  initialData,
  isSubmitting = false,
}: WheelInspectionFormProps) {
  const { user } = useAuth();
  const form = useForm<WheelInspection>({
    resolver: zodResolver(WheelInspectionSchema),
    defaultValues: {
      equipmentType: "wheel",
      wheelGeneralType: "Grader",
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
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Inspection"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
