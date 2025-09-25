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
  wheelInspectionSchema,
  type WheelInspection,
} from "@/schemas/inspectionSchema";
import { useForm } from "react-hook-form";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { InspectionSection } from "../InspectionSections";
// Letakkan ini di file WheelInspectionForm.tsx Anda

interface WheelInspectionFormProps {
  onSubmit: (data: WheelInspection) => void;
  initialData?: Partial<WheelInspection>;
  isSubmitting?: boolean;
}

const formSections = [
  {
    title: "A. Engine",
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
        name: "engineFuelSystem",
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
    title: "B. Transmission & Clutch",
    fields: [
      {
        name: "transmissionOilLevel",
        label: "Check oil level and any leakage",
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
    title: "C. Hydraulic",
    fields: [
      {
        name: "hydraulicOilLevel",
        label: "Check hydraulic oil level",
        type: "select",
      },
      {
        name: "hydraulicCylinder",
        label: "Check hydraulic cylinder & connection condition",
        type: "select",
      },
      {
        name: "hydraulicHoseLeakage",
        label: "Check any leakage from hose / piping",
        type: "select",
      },
      {
        name: "hydraulicPumpLeakage",
        label:
          "Check any leakage from Pump, Motor,PTO, Hose/ piping connection",
        type: "select",
      },
      {
        name: "hydraulicValveLeakage",
        label: "Check leak's from control valve",
        type: "select",
      },
    ],
  },
  {
    title: "D. Cabin & Electric",
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
        name: "cabinSteeringLever",
        label: "Check Transmissi & Steering Control Lever Function",
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
      { name: "cabinAcBlower", label: "Check AC / Blower", type: "select" },
      { name: "cabinMirror", label: "Check mirror condition", type: "select" },
      { name: "cabinSwitch", label: "Check switch function", type: "select" },
      { name: "cabinWiper", label: "Check wiper function", type: "select" },
      { name: "cabinHorn", label: "Check horn function", type: "select" },
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
      { name: "cabinBrake", label: "Check all brake function", type: "select" },
      {
        name: "cabinEmergencyStop",
        label: "Check Emergency Stop function",
        type: "select",
      },
      { name: "cabinApar", label: "Check APAR", type: "select" },
    ],
  },
  {
    title: "E. Axle",
    fields: [
      {
        name: "axleDriveOilLevel",
        label: "Check oil level in the drive axle and any leak",
        type: "select",
      },
      {
        name: "axleWheelHubLevel",
        label: "Check any level in the wheel hub and any leak",
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
    title: "F. Attachment",
    fields: [
      {
        name: "attachmentDrumReduction",
        label: "Check oil level in the drum reduction gear and any leak",
        type: "select",
      },
      {
        name: "attachmentVibrationBearing",
        label: "Check oil level in vibration bearing and any leak",
        type: "select",
      },
    ],
  },
  {
    title: "G. Top Up Lubricant & Coolant",
    fields: [
      {
        name: "topUpEngineOil",
        label: "Engine Oil (SAE 15W-40)",
        type: "select",
      },
      {
        name: "topUpHydraulic",
        label: "Hydraulic (TURALIK 46)",
        type: "select",
      },
      {
        name: "topUpTransmission",
        label: "Transmission (85W-140)",
        type: "select",
      },
      {
        name: "topUpDifferential",
        label: "Differential (85W-140)",
        type: "select",
      },
      {
        name: "topUpFinalDrive",
        label: "Final Drive (85W-140)",
        type: "select",
      },
      {
        name: "topUpWheelMotor",
        label: "Wheel Motor (85W-140)",
        type: "select",
      },
      { name: "topUpVibrator", label: "Vibrator (85W-140)", type: "select" },
      { name: "topUpGrease", label: "Grease (V220)", type: "select" },
      { name: "topUpCoolant", label: "Coolant", type: "select" },
    ],
  },
];

export default function CompactorInspectionForm({
  onSubmit,
  initialData,
  isSubmitting = false,
}: WheelInspectionFormProps) {
  const form = useForm<WheelInspection>({
    resolver: zodResolver(wheelInspectionSchema),
    defaultValues: {
      equipmentType: "wheel",
      equipmentId: "",
      modelUnit: "",
      location: "",
      operatorName: "",
      mechanicName: "",
      inspectionDate: new Date().toISOString().split("T")[0],
      inspectionTime: new Date().toTimeString().slice(0, 5),
      workingHours: 0,
      notes: "",
      // Booleans default to false
      engineOilLeakage: false,
      coolantLeakage: false,
      transmissionLeakage: false,
      hydraulicLeakage: false,
      engineOilTopUp: false,
      transmissionOilTopUp: false,
      hydraulicOilTopUp: false,
      differentialOilTopUp: false,
      steeringFluidTopUp: false,
      greaseTopUp: false,
      coolantTopUp: false,
      ...initialData,
    },
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
              CN Unit, model, location, personnel, date & HM
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="equipmentId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CN Unit</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., WHL-001" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="modelUnit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Model Unit</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., CAT 950H" {...field} />
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
                      <Input placeholder="e.g., Site B, Zone 2" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

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
                name="inspectionTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Time</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="workingHours"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Working Hours (HM)</FormLabel>
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
