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

export const formSections = [
  {
    title: "Engine",
    fields: [
      {
        name: "engineVisualCheck",
        label:
          "Visual inspection of engine condition for leaks, loose bolts, etc.",
        type: "select",
      },
      {
        name: "engineUpperLeaks",
        label:
          "Check for oil, coolant, and gas leaks in the upper engine compartment",
        type: "select",
      },
      {
        name: "engineFuelLine",
        label: "Check all fuel lines for tightness, wear, and leaks",
        type: "select",
      },
      {
        name: "engineUnusualSound",
        label: "Check for unusual sounds",
        type: "select",
      },
      {
        name: "alternatorCondition",
        label: "Check alternator condition",
        type: "select",
      },
      {
        name: "starterMotorCondition",
        label: "Check starter motor condition",
        type: "select",
      },
      {
        name: "acCompressorCondition",
        label: "Check AC compressor condition",
        type: "select",
      },
      {
        name: "turbochargerCondition",
        label: "Check Turbocharger Right (RH)/Left (LH)",
        type: "select",
      },
      {
        name: "waterPumpCondition",
        label: "Check Water Pump condition",
        type: "select",
      },
    ],
  },
  {
    title: "Cooling System",
    fields: [
      {
        name: "radiatorConnection",
        label: "Check Radiator & connections",
        type: "select",
      },
      {
        name: "fanGuardCondition",
        label: "Check Fan guard condition",
        type: "select",
      },
      {
        name: "beltTension",
        label: "Check Belt Tension",
        type: "select",
      },
    ],
  },
  {
    title: "Left Side (LH) Inspection",
    fields: [
      {
        name: "leftFrontWheel",
        label: "Check left front wheel pressure & fasteners",
        type: "select",
      },
      {
        name: "ropsMounting",
        label: "Check ROPS cabin mounting",
        type: "select",
      },
      {
        name: "steeringLinkage",
        label: "Check Steering Linkage",
        type: "select",
      },
      {
        name: "frontSuspension",
        label: "Check Front Suspension cylinder & mounting",
        type: "select",
      },
      {
        name: "rearSuspension",
        label: "Check Rear Suspension cylinder & mounting",
        type: "select",
      },
      {
        name: "hydraulicTank",
        label: "Check Hydraulic tank",
        type: "select",
      },
      {
        name: "tankMounting",
        label: "Check Tank Mounting",
        type: "select",
      },
      {
        name: "chassisMainFrame",
        label: "Check Chassis/Main Frame",
        type: "select",
      },
      {
        name: "hoistCylinder",
        label: "Check Hoist Cylinder & mounting",
        type: "select",
      },
      {
        name: "leftRearWheel",
        label: "Check Left Rear Wheel",
        type: "select",
      },
      {
        name: "leftRearFinalDrive",
        label: "Check left rear Final Drive",
        type: "select",
      },
      {
        name: "dumpBody",
        label: "Check Dump Body",
        type: "select",
      },
      {
        name: "greaseLine",
        label: "Check Grease Line",
        type: "select",
      },
      {
        name: "hydraulicLine",
        label: "Check Hydraulic Line",
        type: "select",
      },
      {
        name: "airCleaner",
        label: "Check Air Cleaner condition",
        type: "select",
      },
      {
        name: "steeringOilTank",
        label: "Check Steering Oil Tank",
        type: "select",
      },
      {
        name: "greaseSystem",
        label: "Check Grease System",
        type: "select",
      },
      {
        name: "batteryElectrolyte",
        label: "Check Battery Electrolyte Level",
        type: "select",
      },
      {
        name: "handRail",
        label: "Check Hand Rail condition",
        type: "select",
      },
      {
        name: "walkways",
        label: "Check Walkways condition",
        type: "select",
      },
    ],
  },
  {
    title: "Right Side (RH) Inspection",
    fields: [
      {
        name: "rightRearWheel",
        label: "Check right rear wheel pressure & fasteners",
        type: "select",
      },
      {
        name: "rhFinalDrive",
        label: "Check Right (RH) Final Drive condition",
        type: "select",
      },
      {
        name: "rhRearSuspension",
        label: "Check Rear Suspension Cylinder & Mounting",
        type: "select",
      },
      {
        name: "fuelTankMounting",
        label: "Check Fuel Tank & Mounting",
        type: "select",
      },
      {
        name: "fuelLineCondition",
        label: "Check Fuel Line condition",
        type: "select",
      },
      {
        name: "rhChassisMounting",
        label: "Check Chassis & Mounting",
        type: "select",
      },
      {
        name: "rhFrontSuspension",
        label: "Check Front Suspension Cylinder & Mounting",
        type: "select",
      },
      {
        name: "rhSteeringLinkage",
        label: "Check Steering Linkage",
        type: "select",
      },
      {
        name: "rhDumpBodyCondition",
        label: "Check dump body condition",
        type: "select",
      },
    ],
  },
  {
    title: "Rear Axle Assembly",
    fields: [
      {
        name: "rearAxleLooseBolts",
        label: "Check for Loose Bolts",
        type: "select",
      },
      {
        name: "rearAxleOilLeaks",
        label: "Check for Oil Leaks",
        type: "select",
      },
    ],
  },
  {
    title: "Power Train",
    fields: [
      {
        name: "differentialCondition",
        label: "Check Differential Condition",
        type: "select",
      },
      {
        name: "transmissionCondition",
        label: "Check transmission condition",
        type: "select",
      },
      {
        name: "powerTrainLine",
        label: "Check Power Train Line condition",
        type: "select",
      },
      {
        name: "torqueConverter",
        label: "Check Torque Converter condition",
        type: "select",
      },
      {
        name: "driveShaftJoint",
        label: "Check Drive Shaft joint condition",
        type: "select",
      },
    ],
  },
  {
    title: "Cabin & Safety Devices",
    fields: [
      {
        name: "cabinGlass",
        label: "Check Cabin Glass Condition",
        type: "select",
      },
      {
        name: "cabinRops",
        label: "Check cabin & ROPS Condition",
        type: "select",
      },
      {
        name: "seatSafetyBelt",
        label: "Check Seat & Safety Belt condition",
        type: "select",
      },
      {
        name: "wiperFunction",
        label: "Check Wiper function",
        type: "select",
      },
      {
        name: "hornFunction",
        label: "Check Horn function",
        type: "select",
      },
      {
        name: "radioCommunication",
        label: "Check Radio Communication",
        type: "select",
      },
      {
        name: "reverseCamera",
        label: "Check Reverse Camera",
        type: "select",
      },
      {
        name: "mdvr",
        label: "Check MDVR",
        type: "select",
      },
      {
        name: "mirrorCondition",
        label: "Check Mirror condition",
        type: "select",
      },
      {
        name: "doorLock",
        label: "Check Door & Lock",
        type: "select",
      },
      {
        name: "monitoringSystem",
        label: "Check monitoring system condition",
        type: "select",
      },
      {
        name: "secondarySteering",
        label: "Check Secondary Steering",
        type: "select",
      },
      {
        name: "allBrakeFunction",
        label: "Check all Brake functions",
        type: "select",
      },
      {
        name: "parkingBrakeControl",
        label: "Check Parking Brake Control",
        type: "select",
      },
      {
        name: "emergencyStop",
        label: "Check Emergency Stop Function",
        type: "select",
      },
      {
        name: "fireExtinguisher",
        label: "Check Fire Extinguisher (APAR)",
        type: "select",
      },
    ],
  },
  {
    title: "Add Oil",
    description: "Select the condition for each lubricant and coolant item.",
    fields: [
      {
        name: "conditionCoolant",
        label: "Coolant",
        type: "qty",
      },

      {
        name: "conditionEngineOil",
        label: "Engine Oil (15W-40)",
        type: "qty",
      },
      {
        name: "conditionTransmission",
        label: "Transmission (HD-30)",
        type: "qty",
      },
      {
        name: "conditionDifferential",
        label: "Differential (HD-30)",
        type: "qty",
      },
      {
        name: "conditionFinalDrive",
        label: "Final Drive (HD-30)",
        type: "qty",
      },
      {
        name: "conditionBrakeFluid",
        label: "Brake (HD-30)",
        type: "qty",
      },
      {
        name: "conditionSuspension",
        label: "Suspension (TURALIK 46)",
        type: "qty",
      },
      {
        name: "conditionHydraulic",
        label: "Hydraulic (TURALIK 46)",
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
      timeDown: "",
      timeOut: "",
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
