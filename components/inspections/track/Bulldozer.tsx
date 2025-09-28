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
    title: "Engine",
    fields: [
      {
        name: "engineOilLevelLeakage",
        label: "Check Level & Kebocoran Oil Engine",
        type: "result",
      },
      {
        name: "engineCoolantLevelLeakage",
        label: "Check Level Coolant Radiator & Kebocoran Cooling System",
        type: "result",
      },
      {
        name: "engineFuelSystemLeakage",
        label: "Check Kebocoran Pada Fuel System",
        type: "result",
      },
      {
        name: "engineBelts",
        label: "Check Condition Belt Alternator, AC & Fan Belt",
        type: "result",
      },
      {
        name: "engineIntakeClamps",
        label: "Check All Clamp dan Hose Intake System (Clamp Kendor)",
        type: "result",
      },
      {
        name: "engineExhaustLeakage",
        label: "Check Kebocoran pada Exhaust Manifold dan Mufler",
        type: "result",
      },
      {
        name: "engineOperationalSound",
        label: "Check Operasional Engine dari Kelainan Bunyi dan Low Power",
        type: "result",
      },
    ],
  },
  {
    title: "Power Train",
    fields: [
      {
        name: "powertrainTransmissionOil",
        label: "Check Level dan Kebocoran Oil Transmisi",
        type: "result",
      },
      {
        name: "powertrainTorqueConverterOil",
        label: "Check Level dan Kebocoran Oil Torque Converter",
        type: "result",
      },
      {
        name: "powertrainDifferentialOil",
        label: "Check Level dan Kebocoran Oil Differensial",
        type: "result",
      },
      {
        name: "powertrainFinalDriveOil",
        label: "Check Level dan Kebocoran Final Drive",
        type: "result",
      },
      {
        name: "powertrainBrakeOperation",
        label: "Check Pengoperasian dan Brake Pressure",
        type: "result",
      },
      {
        name: "powertrainPropellerShaft",
        label: "Check Propeller Shaft Utama dan Tambahan",
        type: "result",
      },
    ],
  },
  {
    title: "Hydraulic System",
    fields: [
      {
        name: "hydraulicOilLevel",
        label: "Check Level Oil Hydraulic",
        type: "result",
      },
      {
        name: "hydraulicSystemLeakage",
        label: "Check Kebocoran Hydraulic System dan Control Valve",
        type: "result",
      },
      {
        name: "hydraulicPumpLineLeakage",
        label: "Check Kebocoran All Hydraulic Pump Line",
        type: "result",
      },
      {
        name: "hydraulicHoseCondition",
        label: "Check All Condition Hose & Rubbing bila Ada yang Bergesekan",
        type: "result",
      },
      {
        name: "hydraulicCylinderLiftBlade",
        label:
          "Check Condition Cylinder Lift Blade dari Kebocoran, Kerusakan, Keausan Pin & Bearing",
        type: "result",
      },
      {
        name: "hydraulicCylinderTiltBlade",
        label:
          "Check Condition Cylinder Tilt Blade dari Kebocoran, Kerusakan, Keausan Pin & Bearing",
        type: "result",
      },
      {
        name: "hydraulicCylinderLiftRipper",
        label:
          "Check Condition Cylinder Lift Ripper dari Kebocoran, Kerusakan, Keausan Pin & Bearing",
        type: "result",
      },
      {
        name: "hydraulicCylinderTiltRipper",
        label:
          "Check Condition Cylinder Tilt Ripper dari Kebocoran, Kerusakan, Keausan Pin & Bearing",
        type: "result",
      },
    ],
  },
  {
    title: "Structure/Frame/Autolube",
    fields: [
      {
        name: "structureAutolube",
        label: "Check All Condition Point Grease pada Autolube System",
        type: "result",
      },
      {
        name: "structureEqualizerBarSeal",
        label: "Check Seal Equalizer Bar",
        type: "result",
      },
      {
        name: "structurePivotShaftLeakage",
        label: "Check Kebocoran Oli Pivot Shaft",
        type: "result",
      },
      {
        name: "structureFrameCracks",
        label: "Check All Bagian Frame dari Keretakan",
        type: "result",
      },
      {
        name: "structureTrackLinkBushing",
        label: "Check Bushing Track Link",
        type: "result",
      },
      {
        name: "structureUndercarriageBolt",
        label: "Check Bolt Undercarriage",
        type: "result",
      },
      {
        name: "structureTrackTension",
        label: "Check Kekencangan Track",
        type: "result",
      },
      {
        name: "structureRipperFrame",
        label: "Check Frame dan Tempat Dudukan Ripper",
        type: "result",
      },
      {
        name: "structureBogglePivot",
        label: "Check Boggle Pivot Pin dan Pads dari Kerusakan",
        type: "result",
      },
      {
        name: "structureMasterLinkBolt",
        label: "Check Periksa Bolt Master Link",
        type: "result",
      },
      {
        name: "structureIdlerMountingBolt",
        label: "Check Bolt Dudukan Idler",
        type: "result",
      },
      {
        name: "structureEqualizerBarBearing",
        label: "Check Equalizer Bar Bearing",
        type: "result",
      },
      {
        name: "structureBladeMountingPin",
        label: "Check Blade Mounting Pin dan Retainer",
        type: "result",
      },
      {
        name: "structureCuttingEdge",
        label: "Check Condition Cutting Edge",
        type: "result",
      },
      {
        name: "structureEndBit",
        label: "Check Condition End Bit",
        type: "result",
      },
      {
        name: "structureCarrieRoller",
        label: "Check Carrie Roller",
        type: "result",
      },
      {
        name: "structureRipperPoint",
        label: "Check Condition Point Ripper",
        type: "result",
      },
    ],
  },
  {
    title: "Electrical System",
    fields: [
      {
        name: "electricalBatteryMounting",
        label: "Check Mountung Battery",
        type: "result",
      },
      {
        name: "electricalBatteryElectrolyte",
        label: "Check Level Air Elektrolit Battery",
        type: "result",
      },
      {
        name: "electricalTerminalCleaning",
        label: "Check & Cleaning Terminal Battery dengan Corrosion Remover",
        type: "result",
      },
      {
        name: "electricalConnectorCleaning",
        label:
          "Check & Cleaning Cable Connector Battery dengan Corrosion Remover",
        type: "result",
      },
      {
        name: "electricalLamps",
        label: "Check All Lamp Penerangan Berfungsi dengan Baik",
        type: "result",
      },
      {
        name: "electricalIsolationSwitch",
        label: "Check Isolation Switch & Emergancy Stop",
        type: "result",
      },
      {
        name: "electricalGaugePanel",
        label: "Check All Gauge dan Control Panel Indicator",
        type: "result",
      },
      {
        name: "electricalBackupAlarm",
        label: "Check Back Up Alarm",
        type: "result",
      },
    ],
  },
  {
    title: "Add Oil",
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

const equipmentModels = ["D85", "D155", "D375"];

interface TrackInspectionFormProps {
  onSubmit: (data: TrackInspection) => void;
  initialData?: Partial<TrackInspection>;
  isSubmitting?: boolean;
}

export function BullDozerInspectionForm({
  onSubmit,
  initialData,
  isSubmitting = false,
}: TrackInspectionFormProps) {
  const form = useForm<TrackInspection>({
    resolver: zodResolver(trackInspectionSchema),
    defaultValues: {
      equipmentType: "track",
      // Add 'Bulldozer' to match the new required schema field 'equipmentGeneralType'
      equipmentGeneralType: "Bulldozer",
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
      timeDown: new Date().toTimeString().slice(0, 5),
      timeOut: new Date().toTimeString().slice(0, 5),
      shift: undefined,
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
