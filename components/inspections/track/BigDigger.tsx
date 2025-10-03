"use client";

import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  trackInspectionSchema,
  type TrackInspection,
} from "@/schemas/inspectionSchema";
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
// Di atas komponen TrackInspectionForm Anda
// Letakkan ini di file form Anda, di atas komponen utama

export const trackFormSections = [
  {
    title: "Pemeriksaan Area Rangka Bawah",
    fields: [
      {
        name: "lowerLockOutSwitch",
        label: "Periksa Saklar Lock Out",
        type: "result",
      },
      {
        name: "lowerTrackLinkTension",
        label: "Periksa Ketegangan Track Link Kanan & Kiri",
        type: "result",
      },
      {
        name: "lowerTrackShoeBolt",
        label: "Periksa Baut Track Shoe Kanan & Kiri",
        type: "result",
      },
      {
        name: "lowerIdlerRollerGuard",
        label: "Periksa Kondisi Idler, Roller & Wear Guard",
        type: "result",
      },
      {
        name: "lowerUnderGuard",
        label: "Periksa kondisi under guard, cover & counter weight",
        type: "result",
      },
      {
        name: "lowerFinalDriveSprocket",
        label: "Periksa Kondisi Final Drive & Gigi Sprocket",
        type: "result",
      },
      {
        name: "lowerSwingCircle",
        label: "Periksa Kondisi Swing Circle",
        type: "result",
      },
      {
        name: "lowerAttachmentCondition",
        label: "Periksa Boom, Arm Stick, Link Bucket & Bucket",
        type: "result",
      },
      {
        name: "lowerDrainWaterSediment",
        label: "Kuras endapan air dari tangki bahan bakar & water separator",
        type: "result",
      },
      {
        name: "lowerHydraulicOilLevel",
        label: "Periksa level oli Hidraulik (tambahkan jika perlu)",
        type: "result",
      },
    ],
  },
  {
    title: "Pemeriksaan Area Rangka Atas",
    fields: [
      {
        name: "upperEngineOilLevel",
        label: "Periksa level oli mesin (Tambahkan jika perlu)",
        type: "result",
      },
      {
        name: "upperEngineVisual",
        label:
          "Pemeriksaan Visual kondisi mesin dari kebocoran, baut hilang, dll",
        type: "result",
      },
      {
        name: "upperCoolantLevel",
        label: "Periksa Level Coolant",
        type: "result",
      },
      {
        name: "upperRadiatorEtc",
        label: "Periksa Radiator, Aftercooler, Hdy oil cooler & koneksi",
        type: "result",
      },
      {
        name: "upperTurboInlet",
        label: "Periksa Kondisi siku inlet turbo",
        type: "result",
      },
      {
        name: "upperAirCleaner",
        label: "Periksa Air Cleaner (Tambahkan jika perlu)",
        type: "result",
      },
      {
        name: "upperCompartmentLeaks",
        label:
          "Periksa Kebocoran Oli, Kebocoran Coolant & Kebocoran Gas pada area kompartemen mesin atas",
        type: "result",
      },
      {
        name: "upperHydraulicPump",
        label: "Periksa Kondisi Pompa Hidraulik & Saluran",
        type: "result",
      },
      {
        name: "upperControlValve",
        label: "Periksa Kondisi Control Valve & Saluran",
        type: "result",
      },
      {
        name: "upperSwingMachineOil",
        label: "Periksa level oli Swing Machine",
        type: "result",
      },
      {
        name: "upperElectricWiring",
        label: "Periksa Pengkabelan Listrik",
        type: "result",
      },
      {
        name: "upperBatteryElectrolyte",
        label: "Periksa level Elektrolit Baterai",
        type: "result",
      },
      {
        name: "upperFanBelts",
        label: "Periksa Fan Belt, & AC Compresor Belt",
        type: "result",
      },
      {
        name: "upperCylinderLeaks",
        label: "Periksa Semua Silinder dari Kebocoran Oli",
        type: "result",
      },
      {
        name: "upperCoverHandRail",
        label: "Periksa Semua Cover & Hand Rail",
        type: "result",
      },
    ],
  },
  {
    title: "Pengukuran Temperatur Silinder",
    fields: [
      {
        name: "tempCylBoomRh",
        label: "Silinder Boom Kanan (RH)",
        type: "temp",
      },
      { name: "tempCylBoomLh", label: "Silinder Boom Kiri (LH)", type: "temp" },
      { name: "tempCylArmRh", label: "Silinder Arm Kanan (RH)", type: "temp" },
      { name: "tempCylArmLh", label: "Silinder Arm Kiri (LH)", type: "temp" },
      {
        name: "tempCylBucketRh",
        label: "Silinder Bucket Kanan (RH)",
        type: "temp",
      },
      {
        name: "tempCylBucketLh",
        label: "Silinder Bucket Kiri (LH)",
        type: "temp",
      },
    ],
  },
  {
    title: "Periksa Kondisi Grease Pada",
    fields: [
      {
        name: "greaseBoomCylFoot",
        label: "Pin Kaki Silinder Boom (2 Titik)",
        type: "result",
      },
      {
        name: "greaseBoomFootPin",
        label: "Pin Kaki Boom (2 Titik)",
        type: "result",
      },
      {
        name: "greaseBoomCylRod",
        label: "Ujung Rod Silinder Boom (2 Titik)",
        type: "result",
      },
      {
        name: "greaseArmCylFoot",
        label: "Pin Kaki Silinder Arm (1 Titik)",
        type: "result",
      },
      {
        name: "greaseBoomArmCoupling",
        label: "Pin Kopling Boom Arm (1 Titik)",
        type: "result",
      },
      {
        name: "greaseArmCylRod",
        label: "Ujung Rod Silinder Arm (1 Titik)",
        type: "result",
      },
      {
        name: "greaseBucketCylFoot",
        label: "Pin Kaki Silinder Bucket (1 Titik)",
        type: "result",
      },
      {
        name: "greaseArmLinkCoupling",
        label: "Pin Kopling Arm & Link (1 Titik)",
        type: "result",
      },
      {
        name: "greaseArmBucketCoupling",
        label: "Pin Kopling Arm & Bucket (1 Titik)",
        type: "result",
      },
      {
        name: "greaseLinkCoupling",
        label: "Pin Kopling Link (2 Titik)",
        type: "result",
      },
      {
        name: "greaseBucketCylRod",
        label: "Ujung Rod Silinder Bucket (1 Titik)",
        type: "result",
      },
      {
        name: "greaseBucketLinkCoupling",
        label: "Pin Kopling Bucket & Link (1 Titik)",
        type: "result",
      },
    ],
  },
  {
    title: "Pemeriksaan Cabin",
    fields: [
      { name: "cabinMonitorPanel", label: "Monitor Panel", type: "result" },
      { name: "cabinSwitches", label: "Saklar", type: "result" },
      { name: "cabinGauge", label: "Gauge (Pengukur)", type: "result" },
      {
        name: "cabinControlLever",
        label: "Tuas Kontrol & Pedal Kontrol",
        type: "result",
      },
      { name: "cabinRadioComm", label: "Radio Komunikasi", type: "result" },
      { name: "cabinFmRadio", label: "Radio FM", type: "result" },
      { name: "cabinWorkLamp", label: "Lampu Kerja", type: "result" },
      { name: "cabinTravelAlarm", label: "Travel Alarm", type: "result" },
      { name: "cabinHorn", label: "Klakson", type: "result" },
      { name: "cabinMirror", label: "Cermin & Braket", type: "result" },
      {
        name: "cabinRotaryLamp",
        label: "Lampu Putar (Rotary Lamp)",
        type: "result",
      },
      { name: "cabinWiper", label: "Wiper & Bilah Kaca", type: "result" },
      { name: "cabinWindowWasher", label: "Pencuci Jendela", type: "result" },
      {
        name: "cabinAcFunction",
        label: "Fungsi AC & Level Gas",
        type: "result",
      },
      {
        name: "cabinFuseRelay",
        label: "Periksa Sekering, Relay & Level Gas",
        type: "result",
      },
      {
        name: "cabinOperatorSeat",
        label: "Periksa Kondisi Kursi Operator",
        type: "result",
      },
    ],
  },
  {
    title: "Pemeriksaan Alat Keselamatan",
    fields: [
      {
        name: "safetyFireExtinguisher",
        label: "Periksa Alat Pemadam Api Ringan (APAR)",
        type: "result",
      },
      {
        name: "safetyEmergencyStop",
        label: "Periksa Fungsi Tombol Emergency Stop",
        type: "result",
      },
      {
        name: "safetyCabinRops",
        label: "Periksa Kondisi Cabin & ROPS",
        type: "result",
      },
      {
        name: "safetyBelt",
        label: "Periksa Kondisi Safety Belt",
        type: "result",
      },
    ],
  },
  {
    title: "Penambahan Oli",
    fields: [
      {
        name: "topUpCoolant",
        label: "Coolant",
        subLabel: "",
        type: "qty",
      },
      {
        name: "topUpEngine",
        label: "Mesin (15W-40)",
        subLabel: "",
        type: "qty",
      },
      {
        name: "topUpHydraulic",
        label: "Hidraulik (TURALIX 46)",
        subLabel: "",
        type: "qty",
      },
      {
        name: "topUpSwingMachinery",
        label: "Mekanisme Putar (Swing Machinary) (HD 50 / HD 30)",
        subLabel: "",
        type: "qty",
      },
      {
        name: "topUpFinalDrive",
        label: "Final Drive (HD 50 / HD 30)",
        subLabel: "",
        type: "qty",
      },
    ],
  },
];
// Letakkan ini di atas komponen form Anda

const equipmentModels = ["PC 1250", "PC2000", "395", "6015"];

type EquipmentType = keyof typeof equipmentModels;

interface TrackInspectionFormProps {
  onSubmit: (data: TrackInspection) => void;
  initialData?: Partial<TrackInspection>;
  isSubmitting?: boolean;
}

export function BigDiggerInspectionForm({
  onSubmit,
  initialData,
  isSubmitting = false,
}: TrackInspectionFormProps) {
  const [selectedType, setSelectedType] = useState<EquipmentType | "">("");
  const form = useForm<TrackInspection>({
    resolver: zodResolver(trackInspectionSchema),
    defaultValues: {
      equipmentType: "track",
      // Add 'Big Digger' to match the new required schema field 'equipmentGeneralType'
      equipmentGeneralType: "BigDigger",
      equipmentId: "",
      modelUnit: "",
      location: "",
      operatorName: "john",
      mechanicName: "john", // Added default value
      inspectionDate: new Date().toISOString().split("T")[0],
      inspectionTime: new Date().toTimeString().slice(0, 5),
      workingHours: 0,
      notes: "",
      findings: [{ description: "", status: "open" }],
      // Add default values for new required fields
      smr: 0,
      timeDown: new Date().toTimeString().slice(0, 5),
      timeOut: new Date().toTimeString().slice(0, 5),
      shift: undefined,
      ...initialData,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "findings",
  });
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, (ERR) => console.log(ERR))}
        className="space-y-6"
      >
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
                        onChange={(e) =>
                          field.onChange(Number.parseFloat(e.target.value) || 0)
                        }
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
