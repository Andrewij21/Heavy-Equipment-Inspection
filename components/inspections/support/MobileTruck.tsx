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
import { useAuth } from "@/context/AuthContext";
import {
  SupportInspectionSchema,
  type SupportInspection,
} from "@/schemas/supportSchema";
import { Trash2 } from "lucide-react";
// Letakkan ini di file WheelInspectionForm.tsx Anda

interface SupportInspectionFormProps {
  onSubmit: (data: SupportInspection) => void;
  initialData?: Partial<SupportInspection>;
  isSubmitting?: boolean;
}

const formSections = [
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
        label: "Check engine mounting",
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
        label: "Check all belt tension & related components",
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
        label: "Check oil level & leakage",
        type: "select",
      },
      {
        name: "transmissionClutch",
        label: "Check clutch function & clutch pad wear",
        type: "select",
      },
      {
        name: "transmissionUniversalJoint",
        label: "Check universal joint",
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
        name: "hydraulicPumpLeakage",
        label: "Check for leaks on pump, motor, PTO, hose/pipe",
        type: "select",
      },
      {
        name: "hydraulicValveLeakage",
        label: "Check for leaks on control valve",
        type: "select",
      },
    ],
  },
  {
    title: "Cabin & Electric",
    fields: [
      {
        name: "cabinCleaning",
        label: "Clean cabin & check panel function",
        type: "select",
      },
      {
        name: "cabinLock",
        label: "Check cabin lock & cabin tilt lock",
        type: "select",
      },
      {
        name: "cabinSteeringLever",
        label: "Check transmission & steering lever function",
        type: "select",
      },
      {
        name: "cabinAttachmentLever",
        label: "Check attachment control lever",
        type: "select",
      },
      {
        name: "cabinBallJointTieRod",
        label: "Check ball joint tie rod",
        type: "select",
      },
      {
        name: "cabinBallJointDrakLink",
        label: "Check ball joint drag link",
        type: "select",
      },
      {
        name: "cabinAcBlower",
        label: "Check AC / Blower",
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
        label: "Check battery & connection condition",
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
    ],
  },
  {
    title: "Front Axle, Rear Axle & Brakes",
    fields: [
      {
        name: "axleDifferentialOil",
        label: "Check differential oil level & leakage",
        type: "select",
      },
      {
        name: "axleLockCabin",
        label: "Check cabin lock & cabin tilt lock",
        type: "select",
      },
      {
        name: "axlePinSpring",
        label: "Check & lubricate spring pin, steering linkage & trunnion",
        type: "select",
      },
      {
        name: "axleTorqueRod",
        label: "Check mounting & rubber torque rod",
        type: "select",
      },
      {
        name: "axleTyreBrake",
        label: "Check tires & brake function",
        type: "select",
      },
      {
        name: "axleSpringUBolt",
        label: "Check spring & U-Bolt",
        type: "select",
      },
      {
        name: "axleBallJointTieRod",
        label: "Check ball joint tie rod",
        type: "select",
      },
      {
        name: "axleBallJointDrakLink",
        label: "Check ball joint drag link",
        type: "select",
      },
      {
        name: "axleShockAbsorber",
        label: "Check shock absorber",
        type: "select",
      },
      {
        name: "axleBoltTyre",
        label: "Check wheel bolts",
        type: "select",
      },
      {
        name: "axleHollowSpring",
        label: "Check rubber hollow spring",
        type: "select",
      },
    ],
  },
  {
    title: "Attachment",
    fields: [
      {
        name: "attachmentTankLeakage",
        label: "Check body & tank leakage WT - LT - FT",
        type: "select",
      },
      {
        name: "attachmentBallValve",
        label: "Check ball valve, hose, pipe & gun WT - LT - FT",
        type: "select",
      },
      {
        name: "attachmentAirCompressor",
        label: "Check air compressor LT",
        type: "select",
      },
      {
        name: "attachmentAirPump",
        label: "Check all air pumps & pressure gauge LT",
        type: "select",
      },
      {
        name: "attachmentWaterSprayer",
        label: "Check water sprayer & water cannon WT",
        type: "select",
      },
      {
        name: "attachmentDriveCoupling",
        label: "Check drive coupling WT",
        type: "select",
      },
      {
        name: "attachmentWaterPump",
        label: "Check water pump & pressure gauge WT",
        type: "select",
      },
      {
        name: "attachmentFuelPump",
        label: "Check fuel pump & pressure gauge FT",
        type: "select",
      },
      {
        name: "attachmentCouplingJointer",
        label: "Check coupling jointer FT & LT",
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
        label: "Engine Oil (5W-40)",
        type: "qty",
      },
      {
        name: "topUpTransmission",
        label: "Transmission Oil (80W-90)",
        type: "qty",
      },
      {
        name: "topUpDifferential",
        label: "Differential Oil (85W-140)",
        type: "qty",
      },
      {
        name: "topUpSteering",
        label: "Power Steering Oil (ATF 220)",
        type: "qty",
      },
      {
        name: "topUpHydraulic",
        label: "Hydraulic Oil (TELLUS 46)",
        type: "qty",
      },
    ],
  },
];

export default function MobileTruckInspectionForm({
  onSubmit,
  initialData,
  isSubmitting = false,
}: SupportInspectionFormProps) {
  const { user } = useAuth();
  const form = useForm<SupportInspection>({
    resolver: zodResolver(SupportInspectionSchema),
    defaultValues: {
      equipmentType: "support",
      supportGeneralType: "Mobile",
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
          <Button type="button" variant="outline">
            Save as Draft
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Inspection"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
