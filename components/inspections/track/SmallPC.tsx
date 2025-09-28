"use client";

import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  trackInspectionSchema,
  type TrackInspection,
} from "@/schemas/inspectionSchema";
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
import { useState } from "react";
import { InspectionSection } from "../InspectionSections";
// Di atas komponen TrackInspectionForm Anda
// Letakkan ini di file form Anda, di atas komponen utama

export const trackFormSections = [
  {
    title: "Lower Frame Area Check (Pemeriksaan Area Rangka Bawah)",
    fields: [
      {
        name: "lowerLockOutSwitch",
        label: "Check Lock Out Switch",
        type: "result",
      },
      {
        name: "lowerTrackLinkTension",
        label: "Check RH & LH Track Link Tension",
        type: "result",
      },
      {
        name: "lowerTrackShoeBolt",
        label: "Check RH & LH Track Shoe Bolt",
        type: "result",
      },
      {
        name: "lowerIdlerRollerGuard",
        label: "Check Condition of idler, Roller & Wear Guard",
        type: "result",
      },
      {
        name: "lowerUnderGuard",
        label: "Check condition under guard, cover & counter weight",
        type: "result",
      },
      {
        name: "lowerFinalDriveSprocket",
        label: "Check Final Drive & Teeth Sprocket condition",
        type: "result",
      },
      {
        name: "lowerSwingCircle",
        label: "Check Swing Circle condition",
        type: "result",
      },
      {
        name: "lowerAttachmentCondition",
        label: "Check Boom, Arm Stick, Link Bucket & Bucket",
        type: "result",
      },
      {
        name: "lowerDrainWaterSediment",
        label: "Drain water sediment from fuel tank & water separator",
        type: "result",
      },
      {
        name: "lowerHydraulicOilLevel",
        label: "Check Hydraulic oil level (add if necessary)",
        type: "result",
      },
    ],
  },
  {
    title: "Upper Structure Area Check (Pemeriksaan Area Rangka Atas)",
    fields: [
      {
        name: "upperEngineOilLevel",
        label: "Check engine oil level (Add if necessary)",
        type: "result",
      },
      {
        name: "upperEngineVisual",
        label: "Visual Check engine condition from: leak, Lost bolt, etc",
        type: "result",
      },
      {
        name: "upperCoolantLevel",
        label: "Check Coolant Level",
        type: "result",
      },
      {
        name: "upperRadiator",
        label: "Check Radiator, Aftercooler, Hdy oil cooler & connection",
        type: "result",
      },
      {
        name: "upperTurboInlet",
        label: "Check Condition of turbo inlet elbow",
        type: "result",
      },
      {
        name: "upperAirCleaner",
        label: "Check Air Cleaner (add if necessary)",
        type: "result",
      },
      {
        name: "upperCompartmentLeaks",
        label:
          "Check Oil Leaks, Coolant Leak & Gas leak at upper engine compartment area",
        type: "result",
      },
      {
        name: "upperHydraulicPump",
        label: "Check Hydraulic Pump & Line Condition",
        type: "result",
      },
      {
        name: "upperControlValve",
        label: "Check Control Valve & Line Condition",
        type: "result",
      },
      {
        name: "upperSwingMachineOil",
        label: "Check Swing Machine oil level",
        type: "result",
      },
      {
        name: "upperElectricWiring",
        label: "Check Elektrik Wiring",
        type: "result",
      },
      {
        name: "upperBatteryElectrolyte",
        label: "Check Battery Electrolit level",
        type: "result",
      },
      {
        name: "upperFanBelts",
        label: "Check fan Belt, & AC Compresor Belt",
        type: "result",
      },
      {
        name: "upperCylinderLeaks",
        label: "Check All Cylinder For Oil Leaks",
        type: "result",
      },
      {
        name: "upperCoverHandRail",
        label: "Check All Cover & Hand Rail",
        type: "result",
      },
    ],
  },
  {
    title: "Measure Cylinder Temperature",
    fields: [
      { name: "tempCylBoomRh", label: "Boom Cyl RH", type: "temp" },
      { name: "tempCylBoomLh", label: "Boom Cyl LH", type: "temp" },
      { name: "tempCylArmRh", label: "Arm Cyl RH", type: "temp" },
      { name: "tempCylArmLh", label: "Arm Cyl LH", type: "temp" },
      { name: "tempCylBucketRh", label: "Bucket Cyl RH", type: "temp" },
      { name: "tempCylBucketLh", label: "Bucket Cyl LH", type: "temp" },
    ],
  },
  {
    title: "Grease Condition at (Periksa Kondisi Grease Pada)",
    fields: [
      {
        name: "greaseBoomCylFoot",
        label: "Boom Cylinder Foot Pin (2 Point)",
        type: "result",
      },
      {
        name: "greaseBoomFootPin",
        label: "Boom Foot Pin (2 Point)",
        type: "result",
      },
      {
        name: "greaseBoomCylRod",
        label: "Boom Cylinder Rod End (2 Point)",
        type: "result",
      },
      {
        name: "greaseArmCylFoot",
        label: "Arm Cylinder Foot Pin (1 Point)",
        type: "result",
      },
      {
        name: "greaseBoomArmCoupling",
        label: "Boom Arm Coupling Pin (1 Point)",
        type: "result",
      },
      {
        name: "greaseArmCylRod",
        label: "Arm Cylinder Rod End (1 Point)",
        type: "result",
      },
      {
        name: "greaseBucketCylFoot",
        label: "Bucket Cylinder Foot Pin (1 Point)",
        type: "result",
      },
      {
        name: "greaseArmLinkCoupling",
        label: "Arm & Link Coupling Pin (1 Point)",
        type: "result",
      },
      {
        name: "greaseArmBucketCoupling",
        label: "Arm & Bucket Coupling Pin (1 Point)",
        type: "result",
      },
      {
        name: "greaseLinkCoupling",
        label: "Link Coupling Pin (2 Point)",
        type: "result",
      },
      {
        name: "greaseBucketCylRod",
        label: "Bucket Cylinder Rod End (1 Point)",
        type: "result",
      },
      {
        name: "greaseBucketLinkCoupling",
        label: "Bucket & Link Copling Pin (1 Point)",
        type: "result",
      },
    ],
  },
  {
    title: "Inside Cabin Check (Pemeriksaan Kabin)",
    fields: [
      { name: "cabinMonitorPanel", label: "Monitor Panel", type: "result" },
      { name: "cabinSwitches", label: "Switches", type: "result" },
      { name: "cabinGauge", label: "Gauge (Jarum Penunjuk)", type: "result" },
      {
        name: "cabinControlLever",
        label: "Control Lever & Control Pedal",
        type: "result",
      },
      { name: "cabinRadioComm", label: "Radio Communication", type: "result" },
      { name: "cabinFmRadio", label: "FM Radio", type: "result" },
      { name: "cabinWorkLamp", label: "Work Lamp", type: "result" },
      { name: "cabinTravelAlarm", label: "Travel alarm", type: "result" },
      { name: "cabinHorn", label: "Horn", type: "result" },
      { name: "cabinMirror", label: "Mirror & Bracket", type: "result" },
      { name: "cabinRotaryLamp", label: "Rotary Lamp", type: "result" },
      { name: "cabinWiper", label: "Wiper & Blade", type: "result" },
      { name: "cabinWindowWasher", label: "Window Washer", type: "result" },
      {
        name: "cabinAcFunction",
        label: "Air Conditoner Function & Gas Level",
        type: "result",
      },
      {
        name: "cabinFuseRelay",
        label: "Check Fuse, Relay & Gas Level",
        type: "result",
      },
      {
        name: "cabinOperatorSeat",
        label: "Check Operator Seat Condition",
        type: "result",
      },
    ],
  },
  {
    title: "Safety Function (Pemeriksaan Alat Keselamatan)",
    fields: [
      {
        name: "safetyFireExtinguisher",
        label: "Check Fire Extinghuiser",
        type: "result",
      },
      {
        name: "safetyEmergencyStop",
        label: "Check Function Emergancy Stop",
        type: "result",
      },
      {
        name: "safetyCabinRops",
        label: "Check Condition of cabin & ROPS",
        type: "result",
      },
      {
        name: "safetyBelt",
        label: "Check Safety Belt condition",
        type: "result",
      },
    ],
  },
  {
    title: "Top-Up Lubricant & Coolant",
    fields: [
      {
        name: "topUpCoolant",
        label: "Coolant (AF-NACDM)",
        subLabel: "",
        type: "qty",
      },
      {
        name: "topUpEngine",
        label: "Engine (15W-40)",
        subLabel: "",
        type: "qty",
      },
      {
        name: "topUpHydraulic",
        label: "Hydraulic (TURALIK 46)",
        subLabel: "",
        type: "qty",
      },
      {
        name: "topUpSwingMachinery",
        label: "Swing Machinary (HD 30)",
        subLabel: "",
        type: "qty",
      },
      {
        name: "topUpFinalDrive",
        label: "Final Drive (HD 30)",
        subLabel: "",
        type: "qty",
      },
    ],
  },
];
// Letakkan ini di atas komponen form Anda

const equipmentModels = ["PC500", "PC400", "PC300"];
type EquipmentType = keyof typeof equipmentModels;
// 3. Komponen untuk input pengukuran temperatur silinder

interface TrackInspectionFormProps {
  onSubmit: (data: TrackInspection) => void;
  initialData?: Partial<TrackInspection>;
  isSubmitting?: boolean;
}

export function SmallPCInspectionForm({
  onSubmit,
  initialData,
  isSubmitting = false,
}: TrackInspectionFormProps) {
  const [selectedType, setSelectedType] = useState<EquipmentType | "">("");
  const form = useForm<TrackInspection>({
    resolver: zodResolver(trackInspectionSchema),
    defaultValues: {
      equipmentType: "track",
      // Add 'Small PC' to match the new required schema field 'equipmentGeneralType'
      equipmentGeneralType: "SmallPC",
      equipmentId: "",
      modelUnit: "",
      location: "",
      operatorName: "john",
      mechanicName: "john", // Added default value
      inspectionDate: new Date().toISOString().split("T")[0],
      inspectionTime: new Date().toTimeString().slice(0, 5),
      workingHours: 0,
      notes: "",
      findings: [{ description: "", status: "open" }],
      // Add default values for new required fields
      smr: 0,
      timeDown: new Date().toTimeString().slice(0, 5), // Default to current time or empty string
      timeOut: new Date().toTimeString().slice(0, 5), // Default to current time or empty string
      shift: undefined, // Must be undefined/null to show Zod error if not selected
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
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Header Information
              <Badge variant="outline">Track Equipment</Badge>
            </CardTitle>
            <CardDescription>
              General equipment and inspection details
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Ganti grid lama dengan yang ini */}
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
                    <FormLabel>Unit No</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., EXC-001" {...field} />
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
                    <FormLabel>SMR (Service Meter Reading)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="0"
                        {...field}
                        onChange={(e) =>
                          field.onChange(Number.parseFloat(e.target.value) || 0)
                        }
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

              {/* ===== FIELD BARU DITAMBAHKAN DI SINI ===== */}

              <FormField
                control={form.control}
                name="timeDown" // Pastikan ini ditambahkan ke defaultValues
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
                name="timeOut" // Pastikan ini ditambahkan ke defaultValues
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
              {/* ===== FIELD MODEL UNIT YANG SUDAH DINAMIS ===== */}
              <FormField
                control={form.control}
                name="modelUnit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Model Unit</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value} // Gunakan value agar bisa di-reset
                    >
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

              {/* ... (Lanjutkan dengan field header lainnya: location, operatorName, dll.) ... */}
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
