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
  supportInspectionSchema,
  type SupportInspection,
} from "@/schemas/inspectionSchema";
import { useForm } from "react-hook-form";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { InspectionSection } from "../InspectionSections";
// Letakkan ini di file WheelInspectionForm.tsx Anda

interface SupportInspectionFormProps {
  onSubmit: (data: SupportInspection) => void;
  initialData?: Partial<SupportInspection>;
  isSubmitting?: boolean;
}

// Gunakan konstanta ini untuk form inspeksi baru Anda
export const formSections = [
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
        label: "Check engine mounting",
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
        label: "Check Universal Joint",
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
        name: "cabinBallJointTieRod",
        label: "Check ball joint tie rod",
        type: "select",
      },
      {
        name: "cabinBallJointDrakLink",
        label: "Check ball joint drak link",
        type: "select",
      },
      { name: "cabinAcBlower", label: "Check AC / Blower", type: "select" },
      {
        name: "cabinSwitchFunction",
        label: "Check switch function",
        type: "select",
      },
      {
        name: "cabinLampFunction",
        label: "Check all lamp function & Rotary lamp",
        type: "select",
      },
      {
        name: "cabinBattery",
        label: "Check Battery & connection condition",
        type: "select",
      },
      { name: "cabinSafetyBelt", label: "Check Safety Belt", type: "select" },
      { name: "cabinApar", label: "Check APAR", type: "select" },
    ],
  },
  {
    title: "E. Front Axle, Rear Axle & Brake",
    fields: [
      {
        name: "axleDifferentialOil",
        label: "Check Oil Level of Differential & any leakage",
        type: "select",
      },
      {
        name: "axleLockCabin",
        label: "Check lock cabin & lock tilt cabin",
        type: "select",
      },
      {
        name: "axlePinSpring",
        label: "Check & lubricate Pin Spring, Steering likage & Trunion",
        type: "select",
      },
      {
        name: "axleTorqueRod",
        label: "Check Mounting & Rubber Torque Rod",
        type: "select",
      },
      {
        name: "axleTyreBrake",
        label: "Check Tyre & Brake function",
        type: "select",
      },
      {
        name: "axleSpringUBolt",
        label: "Check Spring & U Bolt",
        type: "select",
      },
      {
        name: "axleBallJointTieRod",
        label: "Check ball joint tie rod",
        type: "select",
      },
      {
        name: "axleBallJointDrakLink",
        label: "Check ball joint drak link",
        type: "select",
      },
      {
        name: "axleShockAbsorber",
        label: "Check Shock Absorber",
        type: "select",
      },
      { name: "axleBoltTyre", label: "Check Bolt Tyre", type: "select" },
      {
        name: "axleHollowSpring",
        label: "Check Rubber Hollow spring",
        type: "select",
      },
    ],
  },
  {
    title: "F. Crane Compartment",
    fields: [
      {
        name: "craneShackleRope",
        label: "Keausan shacle rope",
        type: "select",
      },
      { name: "craneRopeWire", label: "Rope wire", type: "select" },
      {
        name: "craneSafetyDevice",
        label: "Safety device rope wire",
        type: "select",
      },
      {
        name: "craneWireTerminal",
        label: "Wire rope terminal fitting",
        type: "select",
      },
      { name: "craneRopeStretch", label: "Rope wire strech", type: "select" },
      { name: "craneHookBlock", label: "Hook dan block hooks", type: "select" },
    ],
  },
  {
    title: "G. Opsional",
    fields: [{ name: "optionalApar", label: "Check APAR", type: "select" }],
  },
  {
    title: "H. Top Up Lubricant & Coolant",
    fields: [
      {
        name: "topUpEngineOil",
        label: "Engine Oil (SAE 15W-40)",
        type: "select",
      },
      {
        name: "topUpTransmission",
        label: "Transmissi (80W-90)",
        type: "select",
      },
      {
        name: "topUpHydraulic",
        label: "Hydraulic (TELLUS 46)",
        type: "select",
      },
      {
        name: "topUpDifferential",
        label: "Differential (85W-140)",
        type: "select",
      },
      { name: "topUpSteering", label: "Steering (ATF 220)", type: "select" },
      {
        name: "topUpClutchFluid",
        label: "Clutch Fluid (DOT 3)",
        type: "select",
      },
      { name: "topUpGrease", label: "Grease (EP NLGI-2)", type: "select" },
      { name: "topUpCoolant", label: "Coolant (VCS)", type: "select" },
    ],
  },
];

export default function CraneTruckInspectionForm({
  onSubmit,
  initialData,
  isSubmitting = false,
}: SupportInspectionFormProps) {
  const form = useForm<SupportInspection>({
    resolver: zodResolver(supportInspectionSchema),
    defaultValues: {
      equipmentType: "support",
      equipmentId: "",
      modelUnit: "",
      location: "",
      operatorName: "",
      mechanicName: "",
      inspectionDate: new Date().toISOString().split("T")[0],
      inspectionTime: new Date().toTimeString().slice(0, 5),
      workingHours: 0,
      loadCapacity: 0,
      engineOilLeakage: false,
      coolantLeakage: false,
      hydraulicLeakage: false,
      engineOilTopUp: false,
      hydraulicOilTopUp: false,
      coolantTopUp: false,
      greaseTopUp: false,
      notes: "",
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
