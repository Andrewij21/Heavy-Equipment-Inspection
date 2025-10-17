"use client";

import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
import { InspectionSection } from "../InspectionSections";
import { useAuth } from "@/context/AuthContext";
import {
  TrackInspectionSchema,
  type TrackInspection,
} from "@/schemas/trackSchema";
// Di atas komponen TrackInspectionForm Anda
// Letakkan ini di file form Anda, di atas komponen utama

export const trackFormSections = [
  {
    title: "Lower Frame Area Inspection",
    fields: [
      {
        name: "lowerLockOutSwitch",
        label: "Check Lock Out Switch",
        type: "select",
      },
      {
        name: "lowerTrackLinkTension",
        label: "Check Track Link Tension (RH & LH)",
        type: "select",
      },
      {
        name: "lowerTrackShoeBolt",
        label: "Check Track Shoe Bolt (RH & LH)",
        type: "select",
      },
      {
        name: "lowerIdlerRollerGuard",
        label: "Check Condition of Idler, Roller & Wear Guard",
        type: "select",
      },
      {
        name: "lowerUnderGuard",
        label: "Check condition of under guard, cover & counter weight",
        type: "select",
      },
      {
        name: "lowerFinalDriveSprocket",
        label: "Check Condition of Final Drive & Sprocket",
        type: "select",
      },
      {
        name: "lowerSwingCircle",
        label: "Check Swing Circle Condition",
        type: "select",
      },
      {
        name: "lowerAttachmentCondition",
        label: "Check Boom, Arm Stick, Link Bucket & Bucket",
        type: "select",
      },
      {
        name: "lowerDrainWaterSediment",
        label: "Drain water sediment from fuel tank & water separator",
        type: "select",
      },
      {
        name: "lowerHydraulicOilLevel",
        label: "Check Hydraulic oil level (top up if needed)",
        type: "select",
      },
    ],
  },
  {
    title: "Upper Frame Area Inspection",
    fields: [
      {
        name: "upperEngineOilLevel",
        label: "Check engine oil level (Top up if needed)",
        type: "select",
      },
      {
        name: "upperEngineVisual",
        label:
          "Visual inspection of engine condition for leaks, missing bolts, etc.",
        type: "select",
      },
      {
        name: "upperCoolantLevel",
        label: "Check Coolant Level",
        type: "select",
      },
      {
        name: "upperRadiatorEtc",
        label: "Check Radiator, Aftercooler, Hyd oil cooler & connections",
        type: "select",
      },
      {
        name: "upperTurboInlet",
        label: "Check Turbo inlet elbow condition",
        type: "select",
      },
      {
        name: "upperAirCleaner",
        label: "Check Air Cleaner (Top up if needed)",
        type: "select",
      },
      {
        name: "upperCompartmentLeaks",
        label:
          "Check for Oil Leaks, Coolant Leaks & Gas Leaks in the upper engine compartment area",
        type: "select",
      },
      {
        name: "upperHydraulicPump",
        label: "Check Hydraulic Pump & Lines Condition",
        type: "select",
      },
      {
        name: "upperControlValve",
        label: "Check Control Valve & Lines Condition",
        type: "select",
      },
      {
        name: "upperSwingMachineOil",
        label: "Check Swing Machine oil level",
        type: "select",
      },
      {
        name: "upperElectricWiring",
        label: "Check Electrical Wiring",
        type: "select",
      },
      {
        name: "upperBatteryElectrolyte",
        label: "Check Battery Electrolyte level",
        type: "select",
      },
      {
        name: "upperFanBelts",
        label: "Check Fan Belt & AC Compressor Belt",
        type: "select",
      },
      {
        name: "upperCylinderLeaks",
        label: "Check All Cylinders for Oil Leaks",
        type: "select",
      },
      {
        name: "upperCoverHandRail",
        label: "Check All Covers & Hand Rail",
        type: "select",
      },
    ],
  },
  {
    title: "Cylinder Temperature Measurement",
    fields: [
      {
        name: "tempCylBoom",
        label: "Cylinder Boom",
        type: "select",
      },
      {
        name: "tempCylBoomRh",
        label: "Cylinder Boom Right (RH)",
        type: "temp",
      },
      {
        name: "tempCylBoomLh",
        label: "Cylinder Boom Left (LH)",
        type: "temp",
      },
      {
        name: "deltaTCylBoom",
        label: "Cylinder Boom Temperature Difference (ΔT)",
        type: "temp",
      },
      {
        name: "tempCylArm",
        label: "Cylinder Arm",
        type: "select",
      },
      {
        name: "tempCylArmRh",
        label: "Cylinder Arm Right (RH)",
        type: "temp",
      },
      {
        name: "tempCylArmLh",
        label: "Cylinder Arm Left (LH)",
        type: "temp",
      },
      {
        name: "deltaTCylArm",
        label: "Cylinder Arm Temperature Difference (ΔT)",
        type: "temp",
      },
      {
        name: "tempCylBucket",
        label: "Cylinder Bucket",
        type: "select",
      },
      {
        name: "tempCylBucketRh",
        label: "Cylinder Bucket Right (RH)",
        type: "temp",
      },
      {
        name: "tempCylBucketLh",
        label: "Cylinder Bucket Left (LH)",
        type: "temp",
      },
      {
        name: "deltaTCylBucket",
        label: "Cylinder Bucket Temperature Difference (ΔT)",
        type: "temp",
      },
    ],
  },
  {
    title: "Check Grease Condition On",
    fields: [
      {
        name: "greaseBoomCylFoot",
        label: "Boom Cylinder Foot Pin (2 Points)",
        type: "select",
      },
      {
        name: "greaseBoomFootPin",
        label: "Boom Foot Pin (2 Points)",
        type: "select",
      },
      {
        name: "greaseBoomCylRod",
        label: "Boom Cylinder Rod End (2 Points)",
        type: "select",
      },
      {
        name: "greaseArmCylFoot",
        label: "Arm Cylinder Foot Pin (1 Point)",
        type: "select",
      },
      {
        name: "greaseBoomArmCoupling",
        label: "Boom Arm Coupling Pin (1 Point)",
        type: "select",
      },
      {
        name: "greaseArmCylRod",
        label: "Arm Cylinder Rod End (1 Point)",
        type: "select",
      },
      {
        name: "greaseBucketCylFoot",
        label: "Bucket Cylinder Foot Pin (1 Point)",
        type: "select",
      },
      {
        name: "greaseArmLinkCoupling",
        label: "Arm & Link Coupling Pin (1 Point)",
        type: "select",
      },
      {
        name: "greaseArmBucketCoupling",
        label: "Arm & Bucket Coupling Pin (1 Point)",
        type: "select",
      },
      {
        name: "greaseLinkCoupling",
        label: "Link Coupling Pin (2 Points)",
        type: "select",
      },
      {
        name: "greaseBucketCylRod",
        label: "Bucket Cylinder Rod End (1 Point)",
        type: "select",
      },
      {
        name: "greaseBucketLinkCoupling",
        label: "Bucket & Link Coupling Pin (1 Point)",
        type: "select",
      },
    ],
  },
  {
    title: "Cabin Inspection",
    fields: [
      {
        name: "cabinMonitorPanel",
        label: "Monitor Panel",
        type: "select",
      },
      {
        name: "cabinSwitches",
        label: "Switches",
        type: "select",
      },
      {
        name: "cabinGauge",
        label: "Gauge",
        type: "select",
      },
      {
        name: "cabinControlLever",
        label: "Control Lever & Control Pedal",
        type: "select",
      },
      {
        name: "cabinRadioComm",
        label: "Radio Communication",
        type: "select",
      },
      {
        name: "cabinFmRadio",
        label: "FM Radio",
        type: "select",
      },
      {
        name: "cabinWorkLamp",
        label: "Work Lamp",
        type: "select",
      },
      {
        name: "cabinTravelAlarm",
        label: "Travel Alarm",
        type: "select",
      },
      {
        name: "cabinHorn",
        label: "Horn",
        type: "select",
      },
      {
        name: "cabinMirror",
        label: "Mirror & Bracket",
        type: "select",
      },
      {
        name: "cabinRotaryLamp",
        label: "Rotary Lamp",
        type: "select",
      },
      {
        name: "cabinWiper",
        label: "Wiper & Wiper Blade",
        type: "select",
      },
      {
        name: "cabinWindowWasher",
        label: "Window Washer",
        type: "select",
      },
      {
        name: "cabinAcFunction",
        label: "AC Function & Gas Level",
        type: "select",
      },
      {
        name: "cabinFuseRelay",
        label: "Check Fuse, Relay & Gas Level",
        type: "select",
      },
      {
        name: "cabinOperatorSeat",
        label: "Check Operator Seat Condition",
        type: "select",
      },
    ],
  },
  {
    title: "Safety Equipment Inspection",
    fields: [
      {
        name: "safetyFireExtinguisher",
        label: "Check Fire Extinguisher",
        type: "select",
      },
      {
        name: "safetyEmergencyStop",
        label: "Check Emergency Stop Button Function",
        type: "select",
      },
      {
        name: "safetyCabinRops",
        label: "Check Cabin & ROPS Condition",
        type: "select",
      },
      {
        name: "safetyBelt",
        label: "Check Safety Belt Condition",
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
        name: "topUpEngine",
        label: "Engine (15W-40)",
        type: "qty",
      },
      {
        name: "topUpHydraulic",
        label: "Hydraulic (TURALIK 46)",
        type: "qty",
      },
      {
        name: "topUpSwingMachinery",
        label: "Swing Machinery (HD 50 / HD 30)",
        type: "qty",
      },
      {
        name: "topUpFinalDrive",
        label: "Final Drive (HD 50 / HD 30)",
        type: "qty",
      },
    ],
  },
];
// Letakkan ini di atas komponen form Anda

const equipmentModels = ["PC 1250", "PC2000", "395", "6015"];

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
  const { user } = useAuth();
  const form = useForm<TrackInspection>({
    resolver: zodResolver(TrackInspectionSchema),
    defaultValues: {
      equipmentType: "track",
      // Add 'Big Digger' to match the new required schema field 'equipmentGeneralType'
      equipmentGeneralType: "BigDigger",
      equipmentId: "",
      modelUnit: "",
      location: "",
      workingHours: 0,
      operatorName: user?.username || "",
      mechanicName: user?.username || "",
      inspectionDate: new Date().toISOString().split("T")[0],
      inspectionTime: new Date().toTimeString().slice(0, 5),
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
        onSubmit={form.handleSubmit(onSubmit, (ERR) => console.log(ERR))}
        className="space-y-6"
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Header Information
              <Badge variant="outline">Tracked Equipment</Badge>
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
              {/* <FormField
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
              /> */}
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

              {/* <FormField
                control={form.control}
                name="timeDown"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>HM DOWN</FormLabel>
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
                    <FormLabel>HM RFU</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}
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

              {/* ===== DYNAMIC UNIT MODEL FIELD ===== */}
              <FormField
                control={form.control}
                name="modelUnit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Unit Model</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl className="w-full">
                        <SelectTrigger>
                          <SelectValue placeholder="Select Model" />
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

              {/* ... (Continue with other header fields: location, operatorName, etc.) ... */}
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
