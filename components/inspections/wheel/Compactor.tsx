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
        name: "engineOilLevel",
        label: "Periksa level & kebocoran oli mesin",
        type: "select",
      },
      {
        name: "engineMounting",
        label: "Periksa dudukan mesin & bagian fitting",
        type: "select",
      },
      {
        name: "engineCoolantLevel",
        label: "Periksa level air pendingin (coolant) & kebocoran",
        type: "select",
      },
      {
        name: "engineFuelSystem",
        label: "Periksa sistem bahan bakar & kebocoran",
        type: "select",
      },
      {
        name: "engineBeltTension",
        label: "Periksa semua ketegangan belt & bagian terkait",
        type: "select",
      },
      {
        name: "engineAirIntake",
        label: "Periksa koneksi saluran masuk udara (air intake) & knalpot",
        type: "select",
      },
    ],
  },
  {
    title: "B. Transmisi & Kopling (Clutch)",
    fields: [
      {
        name: "transmissionOilLevel",
        label: "Periksa level oli dan kebocoran",
        type: "select",
      },
      {
        name: "transmissionClutch",
        label: "Periksa Fungsi Kopling & Keausan Pad Kopling",
        type: "select",
      },
      {
        name: "transmissionUniversalJoint",
        label: "Periksa Universal Joint & Beri Pelumas (Lubricate)",
        type: "select",
      },
    ],
  },
  {
    title: "C. Hidraulik",
    fields: [
      {
        name: "hydraulicOilLevel",
        label: "Periksa level oli hidraulik",
        type: "select",
      },
      {
        name: "hydraulicCylinder",
        label: "Periksa kondisi silinder hidraulik & sambungan",
        type: "select",
      },
      {
        name: "hydraulicHoseLeakage",
        label: "Periksa kebocoran dari selang (hose) / perpipaan",
        type: "select",
      },
      {
        name: "hydraulicPumpLeakage",
        label:
          "Periksa kebocoran dari Pompa, Motor, PTO, Sambungan Selang/perpipaan",
        type: "select",
      },
      {
        name: "hydraulicValveLeakage",
        label: "Periksa kebocoran dari control valve",
        type: "select",
      },
    ],
  },
  {
    title: "D. Kabin & Kelistrikan",
    fields: [
      {
        name: "cabinCleaning",
        label: "Bersihkan kabin & periksa Fungsi panel",
        type: "select",
      },
      {
        name: "cabinLock",
        label: "Periksa kunci kabin & kunci kemiringan (tilt) kabin",
        type: "select",
      },
      {
        name: "cabinSeatBelt",
        label: "Periksa Kursi & Sabuk Pengaman",
        type: "select",
      },
      {
        name: "cabinSteeringLever",
        label: "Periksa Fungsi Tuas Transmisi & Kontrol Kemudi",
        type: "select",
      },
      {
        name: "cabinAttachmentLever",
        label: "Periksa Tuas Kontrol Attachment",
        type: "select",
      },
      {
        name: "cabinTravelControl",
        label: "Periksa Kontrol Gerak (Travel control)",
        type: "select",
      },
      { name: "cabinAcBlower", label: "Periksa AC / Blower", type: "select" },
      {
        name: "cabinMirror",
        label: "Periksa kondisi kaca spion",
        type: "select",
      },
      { name: "cabinSwitch", label: "Periksa fungsi saklar", type: "select" },
      { name: "cabinWiper", label: "Periksa fungsi wiper", type: "select" },
      { name: "cabinHorn", label: "Periksa fungsi klakson", type: "select" },
      {
        name: "cabinLamps",
        label: "Periksa fungsi semua lampu & Rotary lamp",
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
      { name: "cabinBrake", label: "Periksa semua fungsi rem", type: "select" },
      {
        name: "cabinEmergencyStop",
        label: "Periksa fungsi Emergency Stop",
        type: "select",
      },
      { name: "cabinApar", label: "Periksa APAR", type: "select" },
    ],
  },
  {
    title: "E. Axle",
    fields: [
      {
        name: "axleDriveOilLevel",
        label: "Periksa level oli di drive axle dan kebocoran",
        type: "select",
      },
      {
        name: "axleWheelHubLevel",
        label: "Periksa level di hub roda dan kebocoran",
        type: "select",
      },
      {
        name: "axleReducingGear",
        label: "Periksa di axle reducing gear dan kebocoran",
        type: "select",
      },
      {
        name: "axleNutWheel",
        label: "Periksa mur roda (550Nm) dan tekanan ban",
        type: "select",
      },
    ],
  },
  {
    title: "F. Attachment",
    fields: [
      {
        name: "axleDriveAxleOilLevel",
        label: "Check oil level in the drive axle and any leak",
        type: "select",
      },
      {
        name: "axleWheelHubLevel",
        label: "Check any level in the wheel hub and any leak",
        type: "select",
      },
      {
        name: "axleReducingGearLevel",
        label: "Check in the axle reducing gear and any leak",
        type: "select",
      },
      {
        name: "axleNutWheelTyrePressure",
        label: "Check nut wheel (550Nm) and tyre pressure",
        type: "select",
      },
    ],
  },
  {
    title: "G. Penambahan Pelumas & Coolant",
    fields: [
      { name: "topUpCoolant", label: "Coolant", type: "qty" },

      {
        name: "topUpEngineOil",
        label: "Oli Mesin (SAE 15W-40)",
        type: "qty",
      },

      {
        name: "topUpTransmission",
        label: "Transmisi (85W-140)",
        type: "qty",
      },
      {
        name: "topUpDifferential",
        label: "Differensial (85W-140)",
        type: "qty",
      },
      {
        name: "topUpFinalDrive",
        label: "Final Drive (85W-140)",
        type: "qty",
      },
      {
        name: "topUpWheelMotor",
        label: "Motor Roda (85W-140)",
        type: "qty",
      },
      { name: "topUpVibrator", label: "Vibrator (85W-140)", type: "qty" },
      {
        name: "topUpHydraulic",
        label: "Hidraulik (TURALIX 46)",
        type: "qty",
      },
    ],
  },
];

export default function CompactorInspectionForm({
  onSubmit,
  initialData,
  isSubmitting = false,
}: WheelInspectionFormProps) {
  const { user } = useAuth();
  const form = useForm<WheelInspection>({
    resolver: zodResolver(WheelInspectionSchema),
    defaultValues: {
      equipmentType: "wheel",
      wheelGeneralType: "Compactor",
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
