"use client";

import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  TrackInspectionSchema,
  type TrackInspection,
} from "@/schemas/trackSchema";
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
import { useAuth } from "@/context/AuthContext";
// Di atas komponen TrackInspectionForm Anda
// Letakkan ini di file form Anda, di atas komponen utama

export const trackFormSections = [
  {
    title: "Engine",
    fields: [
      {
        name: "engineOilLevelLeakage",
        label: "Check Engine Oil Level & Leakage",
        type: "select",
      },
      {
        name: "engineCoolantLevelLeakage",
        label: "Check Radiator Coolant Level & Cooling System Leakage",
        type: "select",
      },
      {
        name: "engineFuelSystemLeakage",
        label: "Check for Leakage in the Fuel System",
        type: "select",
      },
      {
        name: "engineBelts",
        label: "Check Condition of Alternator, AC & Fan Belts",
        type: "select",
      },
      {
        name: "engineIntakeClamps",
        label: "Check All Intake System Clamps and Hoses (Loose Clamps)",
        type: "select",
      },
      {
        name: "engineExhaustLeakage",
        label: "Check for Leakage on Exhaust Manifold and Muffler",
        type: "select",
      },
      {
        name: "engineOperationalSound",
        label: "Check Engine Operation for Unusual Sounds and Low Power",
        type: "select",
      },
    ],
  },
  {
    title: "Power Train",
    fields: [
      {
        name: "powertrainTransmissionOil",
        label: "Check Transmission Oil Level and Leakage",
        type: "select",
      },
      {
        name: "powertrainTorqueConverterOil",
        label: "Check Torque Converter Oil Level and Leakage",
        type: "select",
      },
      {
        name: "powertrainDifferentialOil",
        label: "Check Differential Oil Level and Leakage",
        type: "select",
      },
      {
        name: "powertrainFinalDriveOil",
        label: "Check Final Drive Level and Leakage",
        type: "select",
      },
      {
        name: "powertrainBrakeOperation",
        label: "Check Brake Operation and Pressure",
        type: "select",
      },
      {
        name: "powertrainPropellerShaft",
        label: "Check Main and Additional Propeller Shaft",
        type: "select",
      },
    ],
  },
  {
    title: "Hydraulic System",
    fields: [
      {
        name: "hydraulicOilLevel",
        label: "Check Hydraulic Oil Level",
        type: "select",
      },
      {
        name: "hydraulicSystemLeakage",
        label: "Check Hydraulic System and Control Valve for Leakage",
        type: "select",
      },
      {
        name: "hydraulicPumpLineLeakage",
        label: "Check All Hydraulic Pump Lines for Leakage",
        type: "select",
      },
      {
        name: "hydraulicHoseCondition",
        label: "Check All Hose Conditions & for Friction if Rubbing Occurs",
        type: "select",
      },
      {
        name: "hydraulicCylinderLiftBlade",
        label:
          "Check Blade Lift Cylinder Condition for Leaks, Damage, Pin & Bearing Wear",
        type: "select",
      },
      {
        name: "hydraulicCylinderTiltBlade",
        label:
          "Check Blade Tilt Cylinder Condition for Leaks, Damage, Pin & Bearing Wear",
        type: "select",
      },
      {
        name: "hydraulicCylinderLiftRipper",
        label:
          "Check Ripper Lift Cylinder Condition for Leaks, Damage, Pin & Bearing Wear",
        type: "select",
      },
      {
        name: "hydraulicCylinderTiltRipper",
        label:
          "Check Ripper Tilt Cylinder Condition for Leaks, Damage, Pin & Bearing Wear",
        type: "select",
      },
    ],
  },
  {
    title: "Structure/Frame/Autolube",
    fields: [
      {
        name: "structureAutolube",
        label: "Check All Grease Points Condition in Autolube System",
        type: "select",
      },
      {
        name: "structureEqualizerBarSeal",
        label: "Check Equalizer Bar Seal",
        type: "select",
      },
      {
        name: "structurePivotShaftLeakage",
        label: "Check Pivot Shaft Oil Leakage",
        type: "select",
      },
      {
        name: "structureFrameCracks",
        label: "Check All Frame Parts for Cracks",
        type: "select",
      },
      {
        name: "structureTrackLinkBushing",
        label: "Check Track Link Bushing",
        type: "select",
      },
      {
        name: "structureUndercarriageBolt",
        label: "Check Undercarriage Bolt",
        type: "select",
      },
      {
        name: "structureTrackTension",
        label: "Check Track Tension",
        type: "select",
      },
      {
        name: "structureRipperFrame",
        label: "Check Ripper Frame and Mounting",
        type: "select",
      },
      {
        name: "structureBogglePivot",
        label: "Check Boggle Pivot Pin and Pads for Damage",
        type: "select",
      },
      {
        name: "structureMasterLinkBolt",
        label: "Check Master Link Bolt",
        type: "select",
      },
      {
        name: "structureIdlerMountingBolt",
        label: "Check Idler Mounting Bolt",
        type: "select",
      },
      {
        name: "structureEqualizerBarBearing",
        label: "Check Equalizer Bar Bearing",
        type: "select",
      },
      {
        name: "structureBladeMountingPin",
        label: "Check Blade Mounting Pin and Retainer",
        type: "select",
      },
      {
        name: "structureCuttingEdge",
        label: "Check Cutting Edge Condition",
        type: "select",
      },
      {
        name: "structureEndBit",
        label: "Check End Bit Condition",
        type: "select",
      },
      {
        name: "structureCarrieRoller",
        label: "Check Carrier Roller",
        type: "select",
      },
      {
        name: "structureRipperPoint",
        label: "Check Ripper Point Condition",
        type: "select",
      },
    ],
  },
  {
    title: "Electrical System",
    fields: [
      {
        name: "electricalBatteryMounting",
        label: "Check Battery Mounting",
        type: "select",
      },
      {
        name: "electricalBatteryElectrolyte",
        label: "Check Battery Electrolyte Level",
        type: "select",
      },
      {
        name: "electricalTerminalCleaning",
        label: "Check & Clean Battery Terminal with Corrosion Remover",
        type: "select",
      },
      {
        name: "electricalConnectorCleaning",
        label: "Check & Clean Battery Cable Connector with Corrosion Remover",
        type: "select",
      },
      {
        name: "electricalLamps",
        label: "Check All Lights are Functioning Properly",
        type: "select",
      },
      {
        name: "electricalIsolationSwitch",
        label: "Check Isolation Switch & Emergency Stop",
        type: "select",
      },
      {
        name: "electricalGaugePanel",
        label: "Check All Gauges and Indicators on Control Panel",
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
        name: "topUpTransmission",
        label: "Transmission (HD 30)",
        type: "qty",
      },
      {
        name: "topUpFinalDrive",
        label: "Final Drive (HD 30)",
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
  const { user } = useAuth();
  const form = useForm<TrackInspection>({
    resolver: zodResolver(TrackInspectionSchema),
    defaultValues: {
      equipmentType: "track",
      // Add 'Big Digger' to match the new required schema field 'equipmentGeneralType'
      equipmentGeneralType: "Bulldozer",
      equipmentId: "",
      modelUnit: "",
      location: "",
      workingHours: 0,
      operatorName: user?.username || "",
      mechanicName: user?.username || "",
      inspectionDate: new Date().toISOString().split("T")[0],
      inspectionTime: new Date().toTimeString().slice(0, 5),
      findings: [{ description: "", status: "open" }],
      timeDown: new Date().toTimeString().slice(0, 5),
      timeOut: new Date().toTimeString().slice(0, 5),
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
