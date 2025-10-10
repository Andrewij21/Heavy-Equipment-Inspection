"use client";

import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { InspectionSection } from "../InspectionSections";
import { useAuth } from "@/context/AuthContext";
import {
  TrackInspectionSchema,
  type TrackInspection,
} from "@/schemas/trackSchema";
// Di atas komponen TrackInspectionForm Anda
// Letakkan ini di file form Anda, di atas komponen utama

export const trackFormSections = [
  {
    title: "Pemeriksaan Area Rangka Bawah",
    fields: [
      {
        name: "lowerLockOutSwitch",
        label: "Periksa Lock Out Switch",
        type: "select",
      },
      {
        name: "lowerTrackLinkTension",
        label: "Periksa Ketegangan Track Link Kanan (RH) & Kiri (LH)",
        type: "select",
      },
      {
        name: "lowerTrackShoeBolt",
        label: "Periksa Baut Track Shoe Kanan (RH) & Kiri (LH)",
        type: "select",
      },
      {
        name: "lowerIdlerRollerGuard",
        label: "Periksa Kondisi Idler, Roller & Wear Guard",
        type: "select",
      },
      {
        name: "lowerUnderGuard",
        label: "Periksa kondisi under guard, cover & counter weight",
        type: "select",
      },
      {
        name: "lowerFinalDriveSprocket",
        label: "Periksa Kondisi Final Drive & Gigi Sprocket",
        type: "select",
      },
      {
        name: "lowerSwingCircle",
        label: "Periksa Kondisi Swing Circle",
        type: "select",
      },
      {
        name: "lowerAttachmentCondition",
        label: "Periksa Boom, Arm Stick, Link Bucket & Bucket",
        type: "select",
      },
      {
        name: "lowerDrainWaterSediment",
        label: "Kuras endapan air dari tangki bahan bakar & water separator",
        type: "select",
      },
      {
        name: "lowerHydraulicOilLevel",
        label: "Periksa level oli Hidraulik (tambahkan jika perlu)",
        type: "select",
      },
    ],
  },
  {
    title: "Pemeriksaan Area Rangka Atas",
    fields: [
      {
        name: "upperEngineOilLevel",
        label: "Periksa level oli mesin (Tambahkan jika perlu)",
        type: "select",
      },
      {
        name: "upperEngineVisual",
        label:
          "Pemeriksaan Visual kondisi mesin dari: kebocoran, baut hilang, dll",
        type: "select",
      },
      {
        name: "upperCoolantLevel",
        label: "Periksa Level Coolant",
        type: "select",
      },
      {
        name: "upperRadiator",
        label: "Periksa Radiator, Aftercooler, Hdy oil cooler & koneksi",
        type: "select",
      },
      {
        name: "upperTurboInlet",
        label: "Periksa Kondisi siku inlet turbo",
        type: "select",
      },
      {
        name: "upperAirCleaner",
        label: "Periksa Air Cleaner (Tambahkan jika perlu)",
        type: "select",
      },
      {
        name: "upperCompartmentLeaks",
        label:
          "Periksa Kebocoran Oli, Kebocoran Coolant & Kebocoran Gas pada area kompartemen mesin atas",
        type: "select",
      },
      {
        name: "upperHydraulicPump",
        label: "Periksa Kondisi Pompa Hidraulik & Saluran",
        type: "select",
      },
      {
        name: "upperControlValve",
        label: "Periksa Kondisi Control Valve & Saluran",
        type: "select",
      },
      {
        name: "upperSwingMachineOil",
        label: "Periksa level oli Swing Machine",
        type: "select",
      },
      {
        name: "upperElectricWiring",
        label: "Periksa Pengkabelan Listrik",
        type: "select",
      },
      {
        name: "upperBatteryElectrolyte",
        label: "Periksa level Elektrolit Baterai",
        type: "select",
      },
      {
        name: "upperFanBelts",
        label: "Periksa Fan Belt, & AC Compresor Belt",
        type: "select",
      },
      {
        name: "upperCylinderLeaks",
        label: "Periksa Semua Silinder dari Kebocoran Oli",
        type: "select",
      },
      {
        name: "upperCoverHandRail",
        label: "Periksa Semua Cover & Hand Rail",
        type: "select",
      },
    ],
  },
  {
    title: "Pengukuran Temperatur Silinder",
    fields: [
      {
        name: "tempCylBoom",
        label: "Silinder Boom",
        type: "select",
      },
      {
        name: "tempCylBoomRh",
        label: "Silinder Boom Kanan (RH)",
        type: "temp",
      },
      { name: "tempCylBoomLh", label: "Silinder Boom Kiri (LH)", type: "temp" },
      {
        name: "deltaTCylBoom",
        label: "Perbedaan Suhu Silinder Boom (\u0394T)",
        type: "temp",
      },
    ],
  },
  {
    title: "Kondisi Grease Pada",
    fields: [
      {
        name: "greaseBoomCylFoot",
        label: "Pin Kaki Silinder Boom (2 Titik)",
        type: "select",
      },
      {
        name: "greaseBoomFootPin",
        label: "Pin Kaki Boom (2 Titik)",
        type: "select",
      },
      {
        name: "greaseBoomCylRod",
        label: "Ujung Rod Silinder Boom (2 Titik)",
        type: "select",
      },
      {
        name: "greaseArmCylFoot",
        label: "Pin Kaki Silinder Arm (1 Titik)",
        type: "select",
      },
      {
        name: "greaseBoomArmCoupling",
        label: "Pin Kopling Boom Arm (1 Titik)",
        type: "select",
      },
      {
        name: "greaseArmCylRod",
        label: "Ujung Rod Silinder Arm (1 Titik)",
        type: "select",
      },
      {
        name: "greaseBucketCylFoot",
        label: "Pin Kaki Silinder Bucket (1 Titik)",
        type: "select",
      },
      {
        name: "greaseArmLinkCoupling",
        label: "Pin Kopling Arm & Link (1 Titik)",
        type: "select",
      },
      {
        name: "greaseArmBucketCoupling",
        label: "Pin Kopling Arm & Bucket (1 Titik)",
        type: "select",
      },
      {
        name: "greaseLinkCoupling",
        label: "Pin Kopling Link (2 Titik)",
        type: "select",
      },
      {
        name: "greaseBucketCylRod",
        label: "Ujung Rod Silinder Bucket (1 Titik)",
        type: "select",
      },
      {
        name: "greaseBucketLinkCoupling",
        label: "Pin Kopling Bucket & Link (1 Titik)",
        type: "select",
      },
    ],
  },
  {
    title: "Pemeriksaan Kabin",
    fields: [
      { name: "cabinMonitorPanel", label: "Monitor Panel", type: "select" },
      { name: "cabinSwitches", label: "Saklar (Switches)", type: "select" },
      { name: "cabinGauge", label: "Jarum Penunjuk (Gauge)", type: "select" },
      {
        name: "cabinControlLever",
        label: "Tuas Kontrol & Pedal Kontrol",
        type: "select",
      },
      { name: "cabinRadioComm", label: "Radio Komunikasi", type: "select" },
      { name: "cabinFmRadio", label: "Radio FM", type: "select" },
      { name: "cabinWorkLamp", label: "Lampu Kerja", type: "select" },
      { name: "cabinTravelAlarm", label: "Travel Alarm", type: "select" },
      { name: "cabinHorn", label: "Klakson (Horn)", type: "select" },
      { name: "cabinMirror", label: "Cermin & Braket", type: "select" },
      {
        name: "cabinRotaryLamp",
        label: "Lampu Putar (Rotary Lamp)",
        type: "select",
      },
      { name: "cabinWiper", label: "Wiper & Bilah Kaca", type: "select" },
      { name: "cabinWindowWasher", label: "Pencuci Jendela", type: "select" },
      {
        name: "cabinAcFunction",
        label: "Fungsi AC & Level Gas",
        type: "select",
      },
      {
        name: "cabinFuseRelay",
        label: "Periksa Sekering, Relay & Level Gas",
        type: "select",
      },
      {
        name: "cabinOperatorSeat",
        label: "Periksa Kondisi Kursi Operator",
        type: "select",
      },
    ],
  },
  {
    title: "Pemeriksaan Alat Keselamatan",
    fields: [
      {
        name: "safetyFireExtinguisher",
        label: "Periksa Alat Pemadam Api Ringan (APAR)",
        type: "select",
      },
      {
        name: "safetyEmergencyStop",
        label: "Periksa Fungsi Tombol Emergency Stop",
        type: "select",
      },
      {
        name: "safetyCabinRops",
        label: "Periksa Kondisi Cabin & ROPS",
        type: "select",
      },
      {
        name: "safetyBelt",
        label: "Periksa Kondisi Safety Belt",
        type: "select",
      },
    ],
  },
  {
    title: "Penambahan Pelumas & Coolant",
    fields: [
      {
        name: "topUpCoolant",
        label: "Coolant",
        type: "qty",
      },
      {
        name: "topUpEngine",
        label: "Mesin (15W-40)",
        type: "qty",
      },
      {
        name: "topUpHydraulic",
        label: "Hidraulik (TURALIK 46)",
        type: "qty",
      },
      {
        name: "topUpSwingMachinery",
        label: "Mekanisme Putar (Swing Machinary) (HD 30)",
        type: "qty",
      },
      {
        name: "topUpFinalDrive",
        label: "Final Drive (HD 30)",
        type: "qty",
      },
    ],
  },
];
// Letakkan ini di atas komponen form Anda

const equipmentModels = ["PC500", "PC400", "PC300", "PC210"];

interface TrackInspectionFormProps {
  onSubmit: (data: TrackInspection) => void;
  initialData?: Partial<TrackInspection>;
  isSubmitting?: boolean;
}

export function SmallPCInspectionForm({
  onSubmit,
  initialData,
  isSubmitting = false,
}: TrackInspectionFormProps) {
  const { user } = useAuth();
  const form = useForm<TrackInspection>({
    resolver: zodResolver(TrackInspectionSchema),
    defaultValues: {
      equipmentType: "track",
      // Add 'Big Digger' to match the new required schema field 'equipmentGeneralType'
      equipmentGeneralType: "SmallPC",
      equipmentId: "",
      modelUnit: "",
      location: "",
      workingHours: 0,
      operatorName: user?.username || "",
      mechanicName: user?.username || "",
      inspectionDate: new Date().toISOString().split("T")[0],
      inspectionTime: new Date().toTimeString().slice(0, 5),
      findings: [{ description: "", status: "open" }],
      timeDown: new Date().toTimeString().slice(0, 5),
      timeOut: new Date().toTimeString().slice(0, 5),
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
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Informasi Header
              <Badge variant="outline">Peralatan Track</Badge>
            </CardTitle>
            <CardDescription>
              Detail umum peralatan dan pemeriksaan
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Ganti grid lama dengan yang ini */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Fields that were already here */}
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
                      <Input placeholder="contoh: EXC-001" {...field} />
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
                      <Input placeholder="contoh: Site A" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* ===== FIELD BARU DITAMBAHKAN DI SINI ===== */}

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
              {/* ===== FIELD MODEL UNIT YANG SUDAH DINAMIS ===== */}
              <FormField
                control={form.control}
                name="modelUnit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Model Unit</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value} // Gunakan value agar bisa di-reset
                    >
                      <FormControl className="w-full">
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih Model" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {equipmentModels.map((model) => (
                          <SelectItem key={model} value={model}>
                            {model}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* ... (Lanjutkan dengan field header lainnya: location, operatorName, dll.) ... */}
            </div>
          </CardContent>
        </Card>
        {trackFormSections.map((section) => (
          <InspectionSection
            key={section.title}
            control={form.control}
            title={section.title}
            fields={section.fields}
          />
        ))}

        {/* Tabel untuk Temuan Inspeksi */}
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

        {/* Tombol Submit */}
        <div className="flex justify-end space-x-4">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Inspection"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
