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
          "Check for oil, coolant, and gas leaks in the upper engine compartment area",
        type: "select",
      },
      {
        name: "engineFuelLine",
        label: "Check all fuel lines for tightness, wear, and leaks",
        type: "select",
      },
      {
        name: "engineOilLevel",
        label: "Check engine oil level (top up if needed)",
        type: "select",
      },
      {
        name: "engineCoolantLevel",
        label: "Check Coolant level (top up if needed)",
        type: "select",
      },
      {
        name: "engineHydraulicPump",
        label: "Check Hydraulic Pump & Lines Condition",
        type: "select",
      },
      {
        name: "engineElectricalHarness",
        label: "Check electrical wiring harness for damage and position",
        type: "select",
      },
      {
        name: "engineBatteryElectrolyte",
        label: "Check battery electrolyte level",
        type: "select",
      },
      {
        name: "engineBelts",
        label: "Check all belts for tension and wear",
        type: "select",
      },
      {
        name: "engineCoverHandRail",
        label: "Check all covers and hand rail",
        type: "select",
      },
      {
        name: "engineAlternator",
        label: "Check Alternator mounting and connector",
        type: "select",
      },
      {
        name: "engineTransmissionLeaks",
        label: "Check transmission for leaks",
        type: "select",
      },
    ],
  },
  {
    title: "Cooling System",
    fields: [
      {
        name: "coolingRadiator",
        label: "Check Radiator, Aftercooler, Hyd oil cooler & connections",
        type: "select",
      },
      {
        name: "coolingFanGuard",
        label: "Check Fan guard condition",
        type: "select",
      },
      {
        name: "coolingBeltTension",
        label: "Check Belt Tension",
        type: "select",
      },
    ],
  },
  {
    title: "Hydraulic System",
    fields: [
      {
        name: "hydraulicWheelLeanCylinder",
        label: "Check wheel lean cylinder and its mounting",
        type: "select",
      },
      {
        name: "hydraulicSteeringCylinder",
        label: "Check steering cylinder and its mounting",
        type: "select",
      },
      {
        name: "hydraulicBladeLiftCylinder",
        label: "Check blade lift cylinder and its mounting",
        type: "select",
      },
      {
        name: "hydraulicSideShiftCylinder",
        label: "Check side shift cylinder and its mounting",
        type: "select",
      },
      {
        name: "hydraulicCenterShiftCylinder",
        label: "Check center shift cylinder and its mounting",
        type: "select",
      },
      {
        name: "hydraulicRipperCylinder",
        label: "Check ripper cylinder and its mounting",
        type: "select",
      },
      {
        name: "hydraulicArticulationCylinder",
        label: "Check articulation cylinder and its mounting",
        type: "select",
      },
      {
        name: "hydraulicOilLevel",
        label: "Check hydraulic oil level (top up if needed)",
        type: "select",
      },
    ],
  },
  {
    title: "Cabin, Electrical & Safety Devices",
    fields: [
      {
        name: "cabinGlass",
        label: "Check Cabin Glass Condition",
        type: "select",
      },
      {
        name: "cabinRops",
        label: "Check Cabin & ROPS Condition",
        type: "select",
      },
      {
        name: "cabinSeatBelt",
        label: "Check Seat & Safety Belt condition",
        type: "select",
      },
      {
        name: "cabinDoorLock",
        label: "Check Door & Lock",
        type: "select",
      },
      {
        name: "cabinTransmissionSteeringLever",
        label: "Check Transmission & Steering Control Lever Function",
        type: "select",
      },
      {
        name: "cabinAttachmentLever",
        label: "Check Attachment Control Lever",
        type: "select",
      },
      {
        name: "cabinReverseCamera",
        label: "Check Reverse Camera function",
        type: "select",
      },
      {
        name: "cabinMdvr",
        label: "Check MDVR",
        type: "select",
      },
      {
        name: "cabinAcBlower",
        label: "Check AC / Blower",
        type: "select",
      },
      {
        name: "cabinMirror",
        label: "Check Mirror condition",
        type: "select",
      },
      {
        name: "cabinWiper",
        label: "Check wiper condition & function",
        type: "select",
      },
      {
        name: "cabinHorn",
        label: "Check horn function",
        type: "select",
      },
      {
        name: "cabinMonitoringSystem",
        label: "Check monitoring system condition",
        type: "select",
      },
      {
        name: "cabinSwitch",
        label: "Check all switch functions",
        type: "select",
      },
      {
        name: "cabinLamps",
        label: "Check all lamp functions & Rotary lamp",
        type: "select",
      },
      {
        name: "cabinEmergencyStop",
        label: "Check Emergency Stop Button Function",
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
        label: "Check all Brake functions",
        type: "select",
      },
      {
        name: "cabinParkingBrake",
        label: "Check Parking Brake Control",
        type: "select",
      },
      {
        name: "cabinFireExtinguisher",
        label: "Check Fire Extinguisher (APAR)",
        type: "select",
      },
    ],
  },
  {
    title: "Rear Axle",
    fields: [
      {
        name: "structureFrameCracks",
        label: "Check entire Machine frame, chassis, and body for cracks",
        type: "select",
      },
      {
        name: "structureBladeGETCondition",
        label: "Check condition of blade & G.E.T for missing bolts and wear",
        type: "select",
      },
      {
        name: "structureStepLadderCondition",
        label: "Check Step Ladder & hand hold condition",
        type: "select",
      },
      {
        name: "structureTandemHousingLeaks",
        label: "Check LH/RH Tandem housing for leaks",
        type: "select",
      },
      {
        name: "structureCoverGuards",
        label: "Check Cover & Guards condition",
        type: "select",
      },
      {
        name: "structureWheelSpindleLeaks",
        label: "Check all wheel spindle bearings for leaks",
        type: "select",
      },
      {
        name: "fuelTankDamageLeaks",
        label: "Check Fuel tank for damage & leaks",
        type: "select",
      },
      {
        name: "structureCircleDriveLeaks",
        label: "Check circle drive for leaks",
        type: "select",
      },
      {
        name: "structureArticulationCleanliness",
        label: "Check articulation area for dirt build-up",
        type: "select",
      },
      {
        name: "hydraulicTankDamageLeaks",
        label: "Check hydraulic oil tank for damage & leaks",
        type: "select",
      },
    ],
  },
  {
    title: "Add Oil",
    fields: [
      {
        name: "topUpCoolant",
        label: "Coolant",
        type: "qty",
      },
      {
        name: "topUpEngineOil",
        label: "Engine Oil (SAE 15W-40)",
        type: "qty",
      },
      {
        name: "topUpTransmission",
        label: "Transmission (SAE-30)",
        type: "qty",
      },
      {
        name: "topUpTandem",
        label: "Tandem (SAE-30)",
        type: "qty",
      },
      {
        name: "topUpFinalDrive",
        label: "Final Drive (SAE-30)",
        type: "qty",
      },
      {
        name: "topUpBreak",
        label: "Brake (HD-30)",
        type: "qty",
      },
      {
        name: "topUpCircle",
        label: "Circle (TURALIK 46)",
        type: "qty",
      },
      {
        name: "topUpHydraulic",
        label: "Hydraulic (TURALIK 46)",
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
