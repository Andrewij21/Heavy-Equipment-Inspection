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

export const formSections = [
  {
    title: "Engine",
    fields: [
      {
        name: "engineOilLevel",
        label: "Check engine oil level & any leakage",
        type: "select",
      },
      {
        name: "engineMounting",
        label: "Check engine mounting & fitting parts",
        type: "select",
      },
      {
        name: "engineCoolantLevel",
        label: "Check water coolant level & any lekage",
        type: "select",
      },
      {
        name: "engineFuelSystemLeakage",
        label: "Check fuel system & any leakage",
        type: "select",
      },
      {
        name: "engineBeltTension",
        label: "Check all -belt tension & related parts",
        type: "select",
      },
      {
        name: "engineAirIntake",
        label: "Check air intake & exhaust connection",
        type: "select",
      },
    ],
  },
  {
    title: "Transmission & Clutch",
    fields: [
      {
        name: "powertrainTransmissionOilLevel",
        label: "Check transmission oil level and any leakage",
        type: "select",
      },
      {
        name: "powertrainClutchFunction",
        label: "Check Clutch Function & Wear Pad Clutch",
        type: "select",
      },
      {
        name: "powertrainUniversalJoint",
        label: "Check Universal Joint",
        type: "select",
      },
    ],
  },
  {
    title: "Hydraulic System",
    fields: [
      {
        name: "hydraulicOilLevel",
        label: "Check hydraulic oil level",
        type: "select",
      },
      {
        name: "hydraulicSystemLeakage",
        label: "Check hydraulic cylinder & connection condition",
        type: "select",
      },
      {
        name: "hydraulicPumpLeakage",
        label:
          "Check any leakage from Pump, Motor, PTO, Hose/ piping connection",
        type: "select",
      },
      {
        name: "hydraulicControlValveLeakage",
        label: "Check leak's from control valve",
        type: "select",
      },
    ],
  },
  {
    title: "Cabin & Electric",
    fields: [
      {
        name: "cabinCleaning",
        label: "Cleaning cabin & check panel Function",
        type: "select",
      },
      {
        name: "cabinLock",
        label: "Check lock cabin & lock tilt cabin",
        type: "select",
      },
      {
        name: "cabinSeatBelt",
        label: "Check Seat & Safety Belt",
        type: "select",
      },
      {
        name: "cabinControlLever",
        label: "Check Transmissi & Steering/Travel Control Lever Function",
        type: "select",
      },
      {
        name: "cabinAttachmentLever",
        label: "Check Attachment Control Lever",
        type: "select",
      },
      {
        name: "acBlower",
        label: "Check AC / Blower",
        type: "select",
      },
      {
        name: "cabinMirror",
        label: "Check mirror condition",
        type: "select",
      },
      {
        name: "cabinSwitchFunction",
        label: "Check switch function",
        type: "select",
      },
      {
        name: "cabinWiper",
        label: "Check wiper function",
        type: "select",
      },
      {
        name: "cabinHorn",
        label: "Check horn function",
        type: "select",
      },
      {
        name: "cabinLamps",
        label: "Check all lamp function & Rotary lamp",
        type: "select",
      },
      {
        name: "cabinBatteryConnection",
        label: "Check Battery & connection condition",
        type: "select",
      },
      {
        name: "cabinRadioComm",
        label: "Check Radio Communication",
        type: "select",
      },
      {
        name: "cabinBrakeFunction",
        label: "Check all brake function",
        type: "select",
      },
      {
        name: "cabinEmergencyStop",
        label: "Check Emergency Stop function",
        type: "select",
      },
      {
        name: "reverseCamera",
        label: "Check Reverse Camera",
        type: "select",
      },
      {
        name: "checkMDVR",
        label: "Check MDVR",
        type: "select",
      },
      {
        name: "apar",
        label: "Check APAR",
        type: "select",
      },
    ],
  },
  {
    title: "Front Axle, Rear Axle & Brakes",
    fields: [
      {
        name: "structureDriveAxleOilLevel",
        label: "Check oil level in the drive axle and any leak",
        type: "select",
      },
      {
        name: "structurePinSpringSteeringTrunion",
        label: "Check & lubricate Pin Spring, Steering likage & Trunion",
        type: "select",
      },
      {
        name: "structureMountingRubberTorqueRod",
        label: "Check Mounting & Rubber Torque Rod",
        type: "select",
      },
      {
        name: "structureSpringUBolt",
        label: "Check Spring & U Bolt",
        type: "select",
      },
      {
        name: "structureVStayFrontRear",
        label: "Check V Stay Front & Rear",
        type: "select",
      },
      {
        name: "structureBallJointTieRod",
        label: "Check ball joint tie rod",
        type: "select",
      },
      {
        name: "structureBallJointDragLink",
        label: "Check ball joint drag link",
        type: "select",
      },
      {
        name: "structureShockAbsorber",
        label: "Check Shock Absorber",
        type: "select",
      },
      {
        name: "structureTyreBoltPressure",
        label: "Check Tyre, Bolt Tyre & Tyre Pressure",
        type: "select",
      },
      {
        name: "structureRubberHollowspring",
        label: "Check Rubber Hollowspring",
        type: "select",
      },
      {
        name: "electricalBackupAlarm",
        label: "Check Back Up Alarm",
        type: "select",
      },
    ],
  },
  {
    title: "Attachment",
    fields: [
      {
        name: "attachmentDumpBodyVessel",
        label: "Check Dump Body, Pin, Pad, Stabilizer, tail gate & vesel",
        type: "select",
      },
      {
        name: "attachmentSafetyDumpFunction",
        label: "Check Safety Dump Function",
        type: "select",
      },
      {
        name: "greaseCentralGrease",
        label: "Check Cental Grease",
        type: "select",
      },
      {
        name: "greaseAllPointsArea",
        label: "Check All Greasing Point Area",
        type: "select",
      },
    ],
  },
  {
    title: "Add Oil",
    fields: [
      {
        name: "coolant",
        label: "coolant",
        type: "qty",
      },
      {
        name: "topUpEngine",
        label: "Engine (15W-40)",
        type: "qty",
      },
      {
        name: "topUpHydraulic",
        label: "Hydraulic (TURALIX 46)",
        type: "qty",
      },
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
      timeDown: "",
      timeOut: "",
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
              Header Information
              <Badge variant="outline">Wheel Equipment</Badge>
            </CardTitle>
            <CardDescription>
              General equipment and inspection details.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Fields that were already here */}
              <FormField
                control={form.control}
                name="inspectionDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date</FormLabel>
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
                    <FormLabel>Unit Number</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., EXC-001" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="smr"
                render={({ field }) => (
                  <FormItem>
                    {/* <FormLabel>Time Down</FormLabel> */}
                    <FormLabel>TIME</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
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
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Site A" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* ===== NEW FIELDS ADDED HERE ===== */}

              <FormField
                control={form.control}
                name="timeDown"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>HM DOWN</FormLabel>
                    <FormControl>
                      <Input
                        type="text" // 1. Ubah tipe menjadi "text"
                        inputMode="numeric" // 2. Tampilkan keyboard numerik di perangkat mobile
                        placeholder="0"
                        {...field} // Sebarkan properti field dari react-hook-form
                        onChange={(e) => {
                          // 3. Handler untuk memvalidasi input
                          const inputValue = e.target.value;
                          // Hanya izinkan string kosong atau string yang berisi angka
                          if (
                            inputValue === "" ||
                            /^[0-9]+$/.test(inputValue)
                          ) {
                            field.onChange(inputValue); // Perbarui nilai form jika valid
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="timeOut"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>HM RFU</FormLabel>
                    <FormControl>
                      <Input
                        type="text" // 1. Ubah tipe menjadi "text"
                        inputMode="numeric" // 2. Tampilkan keyboard numerik di perangkat mobile
                        placeholder="0"
                        {...field}
                        onChange={(e) => {
                          // 3. Handler yang sama untuk validasi
                          const inputValue = e.target.value;
                          if (
                            inputValue === "" ||
                            /^[0-9]+$/.test(inputValue)
                          ) {
                            field.onChange(inputValue);
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="shift"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Shift</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="w-full">
                        <SelectTrigger>
                          <SelectValue placeholder="Select Shift" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="day">Day</SelectItem>
                        <SelectItem value="night">Night</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="modelUnit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Unit Type</FormLabel>
                    <FormControl>
                      <Input placeholder="CAT 950H" {...field} />
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
        {/* Tabel untuk Temuan Inspeksi */}
        <Card>
          <CardHeader>
            <CardTitle>Finding Inspection Unit</CardTitle>
            <CardDescription>
              Record any damages or other findings here.
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
                          <Input
                            placeholder="Finding description..."
                            {...field}
                          />
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
