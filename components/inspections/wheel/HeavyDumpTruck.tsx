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
import { useFieldArray, useForm } from "react-hook-form";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { InspectionSection } from "../InspectionSections";
import { useAuth } from "@/context/AuthContext";
import {
  WheelInspectionSchema,
  type WheelInspection,
} from "@/schemas/wheelSchema";
// Letakkan ini di file WheelInspectionForm.tsx Anda
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
import { Trash2 } from "lucide-react";
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
          "Periksa kebocoran oli, kebocoran coolant dan kebocoran gas di area kompartemen mesin atas",
        type: "select",
      },
      {
        name: "engineFuelLine",
        label:
          "Periksa semua saluran bahan bakar (fuel line) dari kekencangan, keausan dan kebocoran",
        type: "select",
      },
      {
        name: "engineUnusualSound",
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
      { name: "conditionCoolant", label: "Coolant", type: "qty" },

      {
        name: "conditionEngineOil",
        label: "Oli Mesin (15W-40)",
        type: "qty",
      },
      {
        name: "conditionTransmission",
        label: "Transmisi (HD-30)",
        type: "qty",
      },
      {
        name: "conditionDifferential",
        label: "Differensial (HD-30)",
        type: "qty",
      },
      {
        name: "conditionFinalDrive",
        label: "Final Drive (HD-30)",
        type: "qty",
      },
      { name: "conditionBrakeFluid", label: "Rem (HD-30)", type: "qty" },
      {
        name: "conditionSuspension",
        label: "Suspensi (TURALIK 46)",
        type: "qty",
      },
      {
        name: "conditionHydraulic",
        label: "Hidraulik (TURALIK 46)",
        type: "qty",
      },
    ],
  },
];

export default function HeavyDumpTruckInspectionForm({
  onSubmit,
  initialData,
  isSubmitting = false,
}: WheelInspectionFormProps) {
  const { user } = useAuth();

  const form = useForm<WheelInspection>({
    resolver: zodResolver(WheelInspectionSchema),
    defaultValues: {
      equipmentType: "wheel",
      wheelGeneralType: "HeavyDumpTruck",
      equipmentId: "",
      modelUnit: "",
      location: "",
      operatorName: user?.username || "",
      mechanicName: user?.username || "",
      inspectionDate: new Date().toISOString().split("T")[0],
      inspectionTime: new Date().toTimeString().slice(0, 5),
      workingHours: 0,
      notes: "",
      findings: [{ description: "", status: "open" }],
      // Booleans default to false
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
        onSubmit={form.handleSubmit(onSubmit, (e) => console.log({ e }))}
        className="space-y-6"
      >
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
