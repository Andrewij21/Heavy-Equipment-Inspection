"use client";

import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  TrackInspectionSchema,
  type TrackInspection,
} from "@/schemas/trackSchema";
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
// Di atas komponen TrackInspectionForm Anda
// Letakkan ini di file form Anda, di atas komponen utama

export const trackFormSections = [
  {
    title: "Mesin (Engine)",
    fields: [
      {
        name: "engineOilLevelLeakage",
        label: "Periksa Level & Kebocoran Oli Mesin",
        type: "select",
      },
      {
        name: "engineCoolantLevelLeakage",
        label: "Periksa Level Coolant Radiator & Kebocoran Cooling System",
        type: "select",
      },
      {
        name: "engineFuelSystemLeakage",
        label: "Periksa Kebocoran Pada Sistem Bahan Bakar",
        type: "select",
      },
      {
        name: "engineBelts",
        label: "Periksa Kondisi Belt Alternator, AC & Fan Belt",
        type: "select",
      },
      {
        name: "engineIntakeClamps",
        label: "Periksa Semua Clamp dan Hose Intake System (Clamp Kendor)",
        type: "select",
      },
      {
        name: "engineExhaustLeakage",
        label: "Periksa Kebocoran pada Exhaust Manifold dan Mufler",
        type: "select",
      },
      {
        name: "engineOperationalSound",
        label: "Periksa Operasional Mesin dari Kelainan Bunyi dan Daya Rendah",
        type: "select",
      },
    ],
  },
  {
    title: "Power Train",
    fields: [
      {
        name: "powertrainTransmissionOil",
        label: "Periksa Level dan Kebocoran Oli Transmisi",
        type: "select",
      },
      {
        name: "powertrainTorqueConverterOil",
        label: "Periksa Level dan Kebocoran Oli Torque Converter",
        type: "select",
      },
      {
        name: "powertrainDifferentialOil",
        label: "Periksa Level dan Kebocoran Oli Differensial",
        type: "select",
      },
      {
        name: "powertrainFinalDriveOil",
        label: "Periksa Level dan Kebocoran Final Drive",
        type: "select",
      },
      {
        name: "powertrainBrakeOperation",
        label: "Periksa Pengoperasian dan Tekanan Rem (Brake Pressure)",
        type: "select",
      },
      {
        name: "powertrainPropellerShaft",
        label: "Periksa Propeller Shaft Utama dan Tambahan",
        type: "select",
      },
    ],
  },
  {
    title: "Sistem Hidraulik",
    fields: [
      {
        name: "hydraulicOilLevel",
        label: "Periksa Level Oli Hidraulik",
        type: "select",
      },
      {
        name: "hydraulicSystemLeakage",
        label: "Periksa Kebocoran Sistem Hidraulik dan Control Valve",
        type: "select",
      },
      {
        name: "hydraulicPumpLineLeakage",
        label: "Periksa Kebocoran Semua Saluran Pompa Hidraulik",
        type: "select",
      },
      {
        name: "hydraulicHoseCondition",
        label: "Periksa Semua Kondisi Hose & Gesekan bila Ada yang Bergesekan",
        type: "select",
      },
      {
        name: "hydraulicCylinderLiftBlade",
        label:
          "Periksa Kondisi Silinder Pengangkat Blade dari Kebocoran, Kerusakan, Keausan Pin & Bearing",
        type: "select",
      },
      {
        name: "hydraulicCylinderTiltBlade",
        label:
          "Periksa Kondisi Silinder Pemiring Blade dari Kebocoran, Kerusakan, Keausan Pin & Bearing",
        type: "select",
      },
      {
        name: "hydraulicCylinderLiftRipper",
        label:
          "Periksa Kondisi Silinder Pengangkat Ripper dari Kebocoran, Kerusakan, Keausan Pin & Bearing",
        type: "select",
      },
      {
        name: "hydraulicCylinderTiltRipper",
        label:
          "Periksa Kondisi Silinder Pemiring Ripper dari Kebocoran, Kerusakan, Keausan Pin & Bearing",
        type: "select",
      },
    ],
  },
  {
    title: "Struktur/Rangka/Autolube",
    fields: [
      {
        name: "structureAutolube",
        label: "Periksa Semua Kondisi Titik Grease pada Sistem Autolube",
        type: "select",
      },
      {
        name: "structureEqualizerBarSeal",
        label: "Periksa Seal Equalizer Bar",
        type: "select",
      },
      {
        name: "structurePivotShaftLeakage",
        label: "Periksa Kebocoran Oli Pivot Shaft",
        type: "select",
      },
      {
        name: "structureFrameCracks",
        label: "Periksa Semua Bagian Rangka dari Keretakan",
        type: "select",
      },
      {
        name: "structureTrackLinkBushing",
        label: "Periksa Bushing Track Link",
        type: "select",
      },
      {
        name: "structureUndercarriageBolt",
        label: "Periksa Baut Undercarriage",
        type: "select",
      },
      {
        name: "structureTrackTension",
        label: "Periksa Kekencangan Track",
        type: "select",
      },
      {
        name: "structureRipperFrame",
        label: "Periksa Rangka dan Tempat Dudukan Ripper",
        type: "select",
      },
      {
        name: "structureBogglePivot",
        label: "Periksa Boggle Pivot Pin dan Pads dari Kerusakan",
        type: "select",
      },
      {
        name: "structureMasterLinkBolt",
        label: "Periksa Baut Master Link",
        type: "select",
      },
      {
        name: "structureIdlerMountingBolt",
        label: "Periksa Baut Dudukan Idler",
        type: "select",
      },
      {
        name: "structureEqualizerBarBearing",
        label: "Periksa Bearing Equalizer Bar",
        type: "select",
      },
      {
        name: "structureBladeMountingPin",
        label: "Periksa Pin Pemasangan Blade dan Retainer",
        type: "select",
      },
      {
        name: "structureCuttingEdge",
        label: "Periksa Kondisi Cutting Edge",
        type: "select",
      },
      {
        name: "structureEndBit",
        label: "Periksa Kondisi End Bit",
        type: "select",
      },
      {
        name: "structureCarrieRoller",
        label: "Periksa Carrie Roller",
        type: "select",
      },
      {
        name: "structureRipperPoint",
        label: "Periksa Kondisi Point Ripper",
        type: "select",
      },
    ],
  },
  {
    title: "Sistem Kelistrikan",
    fields: [
      {
        name: "electricalBatteryMounting",
        label: "Periksa Pemasangan Baterai (Battery Mounting)",
        type: "select",
      },
      {
        name: "electricalBatteryElectrolyte",
        label: "Periksa Level Air Elektrolit Baterai",
        type: "select",
      },
      {
        name: "electricalTerminalCleaning",
        label: "Periksa & Bersihkan Terminal Baterai dengan Corrosion Remover",
        type: "select",
      },
      {
        name: "electricalConnectorCleaning",
        label:
          "Periksa & Bersihkan Konektor Kabel Baterai dengan Corrosion Remover",
        type: "select",
      },
      {
        name: "electricalLamps",
        label: "Periksa Semua Lampu Penerangan Berfungsi dengan Baik",
        type: "select",
      },
      {
        name: "electricalIsolationSwitch",
        label: "Periksa Isolation Switch & Emergancy Stop",
        type: "select",
      },
      {
        name: "electricalGaugePanel",
        label: "Periksa Semua Gauge dan Indikator Control Panel",
        type: "select",
      },
      {
        name: "electricalBackupAlarm",
        label: "Periksa Alarm Mundur (Back Up Alarm)",
        type: "select",
      },
    ],
  },
  {
    title: "Penambahan Oli",
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
        name: "topUpTransmission",
        label: "Transmisi (HD 30)",
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

const equipmentModels = ["D85", "D155", "D375"];

interface TrackInspectionFormProps {
  onSubmit: (data: TrackInspection) => void;
  initialData?: Partial<TrackInspection>;
  isSubmitting?: boolean;
}

export function BullDozerInspectionForm({
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
      equipmentGeneralType: "Bulldozer",
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
