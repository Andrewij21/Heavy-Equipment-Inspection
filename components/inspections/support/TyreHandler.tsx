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
import {
  SupportInspectionSchema,
  type SupportInspection,
} from "@/schemas/supportSchema";
import { useFieldArray, useForm } from "react-hook-form";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { InspectionSection } from "../InspectionSections";
import { useAuth } from "@/context/AuthContext";
import { Trash2 } from "lucide-react";
// Letakkan ini di file WheelInspectionForm.tsx Anda

interface SupportInspectionFormProps {
  onSubmit: (data: SupportInspection) => void;
  initialData?: Partial<SupportInspection>;
  isSubmitting?: boolean;
}

// Gunakan konstanta ini untuk form inspeksi baru Anda
// Gunakan konstanta ini untuk form inspeksi baru Anda
// Gunakan konstanta ini untuk form inspeksi baru Anda
export const formSections = [
  {
    title: "Engine & All Area",
    fields: [
      {
        name: "engineRadiator",
        label: "Check radiator condition",
        type: "select",
      },
      {
        name: "engineFanGuard",
        label: "Check fan guard condition",
        type: "select",
      },
      {
        name: "engineBeltTension",
        label: "Check belt tension",
        type: "select",
      },
      {
        name: "engineVisualCheck",
        label: "Visual inspection of engine (leaks, loose bolts, etc.)",
        type: "select",
      },
      {
        name: "engineUnusualSound",
        label: "Check for unusual sounds",
        type: "select",
      },
      {
        name: "engineAlternator",
        label: "Check alternator condition",
        type: "select",
      },
      {
        name: "engineStarterMotor",
        label: "Check starter motor condition",
        type: "select",
      },
      {
        name: "engineTurbocharger",
        label: "Check turbocharger RH/LH",
        type: "select",
      },
      {
        name: "engineWaterPump",
        label: "Check water pump condition",
        type: "select",
      },
      {
        name: "engineLeftFrontWheel",
        label: "Check pressure & bolts of left front wheel",
        type: "select",
      },
      {
        name: "engineRopsCabin",
        label: "Check ROPS cabin mounting",
        type: "select",
      },
      {
        name: "engineSteeringLinkage",
        label: "Check steering linkage",
        type: "select",
      },
      {
        name: "engineFrontSuspension",
        label: "Check front suspension cylinder & mounting",
        type: "select",
      },
      {
        name: "engineRearSuspension",
        label: "Check rear suspension cylinder & mounting",
        type: "select",
      },
      {
        name: "engineBrakeSystem",
        label: "Check brake system",
        type: "select",
      },
      {
        name: "engineHydraulicTank",
        label: "Check hydraulic tank",
        type: "select",
      },
      {
        name: "engineBrazeForkLifting",
        label: "Check braze fork lifting",
        type: "select",
      },
      {
        name: "engineChassisFrame",
        label: "Check main chassis/frame",
        type: "select",
      },
      {
        name: "engineHoistCylinder",
        label: "Check hoist cylinder & mounting",
        type: "select",
      },
      {
        name: "engineLeftRearWheel",
        label: "Check left rear wheel",
        type: "select",
      },
      {
        name: "engineLeftRearFinalDrive",
        label: "Check left rear final drive",
        type: "select",
      },
      {
        name: "engineGreaseLine",
        label: "Check grease line",
        type: "select",
      },
      {
        name: "engineHydraulicLine",
        label: "Check hydraulic line",
        type: "select",
      },
      {
        name: "engineDifferential",
        label: "Check differential condition",
        type: "select",
      },
      {
        name: "engineTransmission",
        label: "Check transmission condition",
        type: "select",
      },
      {
        name: "enginePowerTrainLine",
        label: "Check power train line",
        type: "select",
      },
      {
        name: "engineDriveShaft",
        label: "Check drive shaft joint condition",
        type: "select",
      },
      {
        name: "engineFrontSuspensionGrease",
        label: "Front suspension RH/LH (check grease)",
        type: "select",
      },
      {
        name: "engineSteeringCylinderGrease",
        label: "Steering cylinder (check grease)",
        type: "select",
      },
      {
        name: "engineSpiderJointGrease",
        label: "Spider joint (check grease)",
        type: "select",
      },
      {
        name: "engineRearSuspensionGrease",
        label: "Rear suspension RH/LH (check grease)",
        type: "select",
      },
      {
        name: "engineFrontRearAxleGrease",
        label: "Front & rear axle tie rod (check grease)",
        type: "select",
      },
      {
        name: "enginePinForkLiftingGrease",
        label: "Fork lifting pin (check grease)",
        type: "select",
      },
      {
        name: "engineParkingBrake",
        label: "Check parking brake control",
        type: "select",
      },
      {
        name: "engineAirCleaner",
        label: "Check air cleaner condition",
        type: "select",
      },
      {
        name: "engineSteeringOilTank",
        label: "Check steering oil tank",
        type: "select",
      },
      {
        name: "engineTankMounting",
        label: "Check tank mounting",
        type: "select",
      },
      {
        name: "engineGreaseSystem",
        label: "Check grease system",
        type: "select",
      },
      {
        name: "engineRightRearWheel",
        label: "Check pressure & bolts of right rear wheel",
        type: "select",
      },
      {
        name: "engineRhFinalDrive",
        label: "Check right (RH) final drive condition",
        type: "select",
      },
      {
        name: "engineBrakeSystem2",
        label: "Check brake system",
        type: "select",
      },
      {
        name: "engineRearSuspension2",
        label: "Check rear suspension cylinder & mounting",
        type: "select",
      },
      {
        name: "engineFuelTank",
        label: "Check fuel tank & mounting",
        type: "select",
      },
      {
        name: "engineFuelLine",
        label: "Check fuel line condition",
        type: "select",
      },
      {
        name: "engineChassisMounting",
        label: "Check frame & mounting",
        type: "select",
      },
      {
        name: "engineFrontSuspension2",
        label: "Check front suspension cylinder & mounting",
        type: "select",
      },
      {
        name: "engineSteeringLinkage2",
        label: "Check steering linkage",
        type: "select",
      },
    ],
  },
  {
    title: "Cabin & Electric",
    fields: [
      {
        name: "cabinRops",
        label: "Check cabin & ROPS condition",
        type: "select",
      },
      {
        name: "cabinCleaning",
        label: "Clean cabin & check panel function",
        type: "select",
      },
      {
        name: "cabinLock",
        label: "Check cabin lock & tilt lock",
        type: "select",
      },
      {
        name: "cabinAcBlower",
        label: "Check AC / Blower",
        type: "select",
      },
      {
        name: "cabinSafetyBelt",
        label: "Check safety belt",
        type: "select",
      },
      {
        name: "cabinApar",
        label: "Check Fire Extinguisher (APAR)",
        type: "select",
      },
      {
        name: "cabinWheelChock",
        label: "Check wheel chock & safety cone",
        type: "select",
      },
      {
        name: "cabinEmergencyStop",
        label: "Check Emergency Stop button function",
        type: "select",
      },
      {
        name: "cabinSwitchFunction",
        label: "Check switch function",
        type: "select",
      },
      {
        name: "cabinLampFunction",
        label: "Check all lamps & rotary lamp",
        type: "select",
      },
      {
        name: "cabinBattery",
        label: "Check battery, connection condition, & electrolyte level",
        type: "select",
      },
    ],
  },
  {
    title: "Optional",
    fields: [
      {
        name: "optionalApar",
        label: "Check Fire Extinguisher (APAR)",
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
        label: "Engine Oil (15W-40)",
        type: "qty",
      },
      {
        name: "topUpHydraulic",
        label: "Hydraulic",
        type: "qty",
      },
    ],
  },
];

export default function DeiciInspectionForm({
  onSubmit,
  initialData,
  isSubmitting = false,
}: SupportInspectionFormProps) {
  const { user } = useAuth();
  const form = useForm<SupportInspection>({
    resolver: zodResolver(SupportInspectionSchema),
    defaultValues: {
      equipmentType: "support",
      supportGeneralType: "TyreHandler",
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
              <Badge variant="outline">Support Equipment</Badge>
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
                    <FormLabel>SMR (Service Meter Reading)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="0"
                        {...field}
                        value={field.value === 0 ? "" : field.value}
                        onChange={(e) => {
                          const rawValue = e.target.value;
                          const numericValue = Number.parseFloat(rawValue);
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
                    <FormLabel>Time Down</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
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
                    <FormLabel>Time Out</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
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
