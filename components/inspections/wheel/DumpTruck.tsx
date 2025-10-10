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
import { Input } from "@/components/ui/input";
import { InspectionSection } from "../InspectionSections";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  WheelInspectionSchema,
  type WheelInspection,
} from "@/schemas/wheelSchema";
import { Trash2 } from "lucide-react";
import { use } from "react";
import { useAuth } from "@/context/AuthContext";
// Letakkan ini di file WheelInspectionForm.tsx Anda

interface WheelInspectionFormProps {
  onSubmit: (data: WheelInspection) => void;
  initialData?: Partial<WheelInspection>;
  isSubmitting?: boolean;
}

const formSections = [
  {
    title: "A. Engine System", // Item 1-6
    fields: [
      {
        name: "engineOilLevel",
        label: "Check engine oil level & any leakage",
        type: "result",
      },
      {
        name: "engineMounting",
        label: "Check engine mounting & fitting parts",
        type: "result",
      },
      {
        name: "engineCoolantLevel",
        label: "Check water coolant level & any lekage",
        type: "result",
      },
      {
        name: "engineFuelSystemLeakage",
        label: "Check fuel system & any leakage",
        type: "result",
      },
      {
        name: "engineBeltTension",
        label: "Check all -belt tension & related parts",
        type: "result",
      },
      {
        name: "engineAirIntake",
        label: "Check air intake & exhaust connection",
        type: "result",
      },
    ],
  },
  {
    title: "B. Transmission & Clutch", // Item 7-9
    fields: [
      {
        name: "powertrainTransmissionOilLevel",
        label: "Check transmission oil level and any leakage",
        type: "result",
      },
      {
        name: "powertrainClutchFunction",
        label: "Check Clutch Function & Wear Pad Clutch",
        type: "result",
      },
      {
        name: "powertrainUniversalJoint",
        label: "Check Universal Joint & Lubricate",
        type: "result",
      },
    ],
  },
  {
    title: "C. Hydraulic System", // Item 10-14
    fields: [
      {
        name: "hydraulicOilLevel",
        label: "Check hydraulic oil level",
        type: "result",
      },
      {
        name: "hydraulicSystemLeakage",
        label: "Check hydraulic cylinder & connection condition",
        type: "result",
      }, // Di sini diberi label umum
      {
        name: "hydraulicPumpLeakage",
        label:
          "Check any leakage from Pump, Motor, PTO, Hose/ piping connection",
        type: "result",
      },
      {
        name: "hydraulicControlValveLeakage",
        label: "Check leak's from control valve",
        type: "result",
      },
    ],
  },
  {
    title: "D. Cabin & Electric", // Item 15-28
    fields: [
      {
        name: "cabinCleaning",
        label: "Cleaning cabin & check panel Function",
        type: "result",
      }, // 15
      {
        name: "cabinLock",
        label: "Check lock cabin & lock tilt cabin",
        type: "result",
      }, // 16
      {
        name: "cabinSeatBelt",
        label: "Check Seat & Safety Belt",
        type: "result",
      }, // 17
      {
        name: "cabinControlLever",
        label: "Check Transmissi & Steering/Travel Control Lever Function",
        type: "result",
      }, // 18
      {
        name: "cabinAttachmentLever",
        label: "Check Attachment Control Lever",
        type: "result",
      }, // 19
      { name: "acBlower", label: "Check AC / Blower", type: "result" }, // 20
      { name: "cabinMirror", label: "Check mirror condition", type: "result" }, // 20
      {
        name: "cabinSwitchFunction",
        label: "Check switch function",
        type: "result",
      }, // 21
      { name: "cabinWiper", label: "Check wiper function", type: "result" }, // 22
      { name: "cabinHorn", label: "Check horn function", type: "result" }, // 23
      {
        name: "cabinLamps",
        label: "Check all lamp function & Rotary lamp",
        type: "result",
      }, // 24
      {
        name: "cabinBatteryConnection",
        label: "Check Battery & connection condition",
        type: "result",
      }, // 25
      {
        name: "cabinRadioComm",
        label: "Check Radio Communication",
        type: "result",
      }, // 26
      {
        name: "cabinBrakeFunction",
        label: "Check all brake function",
        type: "result",
      }, // 27
      {
        name: "cabinEmergencyStop",
        label: "Check Emergency Stop function",
        type: "result",
      }, // 28
      {
        name: "reverseCamera",
        label: "Check Reverse Camera",
        type: "result",
      }, // 28
      {
        name: "checkMDVR",
        label: "Check MDVR",
        type: "result",
      }, // 28
      {
        name: "apar",
        label: "Check APAR",
        type: "result",
      }, // 28
    ],
  },
  {
    title: "E. Front Axle, Rear Axle & Brakes", // Item 29-37
    fields: [
      {
        name: "structureDriveAxleOilLevel",
        label: "Check oil level in the drive axle and any leak",
        type: "result",
      }, // 29
      {
        name: "structurePinSpringSteeringTrunion", // Diambil dari label: Pin Spring, Steering linkage & Trunion
        label: "Check & lubricate Pin Spring, Steering likage & Trunion",
        type: "result",
      }, // 30
      {
        name: "structureMountingRubberTorqueRod", // Diambil dari label: Mounting & Rubber Torque Rod
        label: "Check Mounting & Rubber Torque Rod",
        type: "result",
      }, // 31
      {
        name: "structureSpringUBolt", // Diambil dari label: Spring & U Bolt
        label: "Check Spring & U Bolt",
        type: "result",
      }, // 32
      {
        name: "structureVStayFrontRear",
        label: "Check V Stay Front & Rear",
        type: "result",
      }, // 33
      {
        name: "structureBallJointTieRod", // Diambil dari label: ball joint tie rod
        label: "Check ball joint tie rod",
        type: "result",
      }, // 34
      {
        name: "structureBallJointDragLink", // Diambil dari label: ball joint drag link
        label: "Check ball joint drag link",
        type: "result",
      }, // 35
      {
        name: "structureShockAbsorber", // Diambil dari label: Shock Absorber
        label: "Check Shock Absorber",
        type: "result",
      }, // 36
      {
        name: "structureTyreBoltPressure", // Diambil dari label: Tyre, Bolt Tyre & Tyre Pressure
        label: "Check Tyre, Bolt Tyre & Tyre Pressure",
        type: "result",
      }, // 37
      {
        name: "structureRubberHollowspring", // Diambil dari label: Rubber Hollowspring
        label: "Check Rubber Hollowspring",
        type: "result",
      },
      // NOTE: Item berikut adalah bagian dari Attachment, Cabin, atau Grease.
      // Field names yang baru dibuat agar tidak tumpang tindih.
      {
        name: "electricalBackupAlarm", // Check Back Up Alarm (Lebih baik ada di Electrical)
        label: "Check Back Up Alarm",
        type: "result",
      },
    ],
  },
  {
    title: "Attachment",
    fields: [
      {
        name: "attachmentDumpBodyVessel", // Check Dump Body, Pin, Pad, Stabilizer, tail gate & vesel
        label: "Check Dump Body, Pin, Pad, Stabilizer, tail gate & vesel",
        type: "result",
      },
      {
        name: "attachmentSafetyDumpFunction", // Check Safety Dump Function
        label: "Check Safety Dump Function",
        type: "result",
      },
      {
        name: "greaseCentralGrease", // Check Cental Grease
        label: "Check Cental Grease",
        type: "result",
      },
      {
        name: "greaseAllPointsArea", // Check All Greasing Point Area
        label: "Check All Greasing Point Area",
        type: "result",
      },
    ],
  },
  {
    title: "F. Top-Up Lubricant & Coolant", // Item Add Oil
    fields: [
      { name: "coolant", label: "coolant", type: "qty" },
      { name: "topUpEngine", label: "Engine (15W-40)", type: "qty" },
      { name: "topUpHydraulic", label: "Hydraulic (TURALIX 46)", type: "qty" },
      {
        name: "topUpTransmission",
        label: "Transmission (85W-140)",
        type: "qty",
      },
      {
        name: "topUpDifferential",
        label: "Differential (85W-140)",
        type: "qty",
      },
    ],
  },
];

export default function DumpTruckInspectionForm({
  onSubmit,
  initialData,
  isSubmitting = false,
}: WheelInspectionFormProps) {
  const { user } = useAuth();
  const form = useForm<WheelInspection>({
    resolver: zodResolver(WheelInspectionSchema),
    defaultValues: {
      equipmentType: "wheel",
      wheelGeneralType: "DumpTruck",
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
