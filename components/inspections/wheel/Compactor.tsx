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

export const formSections = [
  {
    title: "Engine",
    fields: [
      {
        name: "engineOilLevel",
        label: "Check engine oil level & leakage",
        type: "select",
      },
      {
        name: "engineMounting",
        label: "Check engine mounting & fitting parts",
        type: "select",
      },
      {
        name: "engineCoolantLevel",
        label: "Check coolant level & leakage",
        type: "select",
      },
      {
        name: "engineFuelSystem",
        label: "Check fuel system & leakage",
        type: "select",
      },
      {
        name: "engineBeltTension",
        label: "Check all belt tension & related parts",
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
        name: "transmissionOilLevel",
        label: "Check oil level and leakage",
        type: "select",
      },
      {
        name: "transmissionClutch",
        label: "Check Clutch Function & Wear Pad Clutch",
        type: "select",
      },
      {
        name: "transmissionUniversalJoint",
        label: "Check Universal Joint & Lubricate",
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
        name: "hydraulicCylinder",
        label: "Check hydraulic cylinder condition & connection",
        type: "select",
      },
      {
        name: "hydraulicHoseLeakage",
        label: "Check for leaks from hose / piping",
        type: "select",
      },
      {
        name: "hydraulicPumpLeakage",
        label: "Check for leaks from Pump, Motor, PTO, Hose/piping connection",
        type: "select",
      },
      {
        name: "hydraulicValveLeakage",
        label: "Check for leaks from control valve",
        type: "select",
      },
    ],
  },
  {
    title: "Cabin & Electric",
    fields: [
      {
        name: "cabinCleaning",
        label: "Clean cabin & check panel Function",
        type: "select",
      },
      {
        name: "cabinLock",
        label: "Check cabin lock & tilt cabin lock",
        type: "select",
      },
      {
        name: "cabinSeatBelt",
        label: "Check Seat & Safety Belt",
        type: "select",
      },
      {
        name: "cabinSteeringLever",
        label: "Check Transmission & Steering Control Lever Function",
        type: "select",
      },
      {
        name: "cabinAttachmentLever",
        label: "Check Attachment Control Lever",
        type: "select",
      },
      {
        name: "cabinTravelControl",
        label: "Check Travel control",
        type: "select",
      },
      {
        name: "cabinAcBlower",
        label: "Check AC / Blower",
        type: "select",
      },
      {
        name: "cabinMirror",
        label: "Check mirror condition",
        type: "select",
      },
      {
        name: "cabinSwitch",
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
        name: "cabinBattery",
        label: "Check Battery & connection condition",
        type: "select",
      },
      {
        name: "cabinRadio",
        label: "Check Radio Communication",
        type: "select",
      },
      {
        name: "cabinBrake",
        label: "Check all brake function",
        type: "select",
      },
      {
        name: "cabinEmergencyStop",
        label: "Check Emergency Stop function",
        type: "select",
      },
      {
        name: "cabinApar",
        label: "Check Fire Extinguisher (APAR)",
        type: "select",
      },
    ],
  },
  {
    title: "Axle",
    fields: [
      {
        name: "axleDriveOilLevel",
        label: "Check oil level in the drive axle and any leak",
        type: "select",
      },
      {
        name: "axleWheelHubLevel",
        label: "Check level in the wheel hub and any leak",
        type: "select",
      },
      {
        name: "axleReducingGear",
        label: "Check in the axle reducing gear and any leak",
        type: "select",
      },
      {
        name: "axleNutWheel",
        label: "Check nut wheel (550Nm) and tyre pressure",
        type: "select",
      },
    ],
  },
  {
    title: "Attachment",
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
    title: "Lubricant & Coolant Top-Up",
    fields: [
      {
        name: "topUpCoolant",
        label: "Coolant",
        type: "qty",
      },
      {
        name: "topUpEngineOil",
        label: "Engine Oil (15W-40)",
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
      {
        name: "topUpFinalDrive",
        label: "Final Drive (85W-140)",
        type: "qty",
      },
      {
        name: "topUpWheelMotor",
        label: "Wheel Motor (85W-140)",
        type: "qty",
      },
      {
        name: "topUpVibrator",
        label: "Vibrator (85W-140)",
        type: "qty",
      },
      {
        name: "topUpHydraulic",
        label: "Hydraulic (TURALIX 46)",
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
      timeDown: "",
      timeOut: "",
      findings: [{ description: "", status: "open" }],
      timeStop: "",
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
                    <FormLabel>Time Start</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="timeStop"
                render={({ field }) => (
                  <FormItem>
                    {/* <FormLabel>Time Down</FormLabel> */}
                    <FormLabel>Time Stop</FormLabel>
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
                        type="text"
                        inputMode="decimal" // Tampilkan keyboard desimal (termasuk titik) di mobile
                        placeholder="0"
                        {...field}
                        onChange={(e) => {
                          const inputValue = e.target.value;
                          // Regex diubah untuk memperbolehkan satu titik (.)
                          if (
                            inputValue === "" ||
                            /^[0-9]*(\.[0-9]*)?$/.test(inputValue)
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
                name="timeOut"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>HM RFU</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        inputMode="decimal"
                        placeholder="0"
                        {...field}
                        onChange={(e) => {
                          const inputValue = e.target.value;
                          // Regex yang sama untuk memperbolehkan satu titik (.)
                          if (
                            inputValue === "" ||
                            /^[0-9]*(\.[0-9]*)?$/.test(inputValue)
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
