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
        name: "engineVisualCheck",
        label: "Visual check engine condition form : leaks, lose bolt & etc",
        type: "select",
      },
      {
        name: "engineUpperLeaks",
        label:
          "Check oil leak, coolant leak dan gas leak at upper engine compartment area",
        type: "select",
      },
      {
        name: "engineFuelLine",
        label: "Check all fuel line for tighneass, wear dan leakage",
        type: "select",
      },
      {
        name: "engineOilLevel",
        label: "Check Engine oil level (add if necessary)",
        type: "select",
      },
      {
        name: "engineCoolantLevel",
        label: "Check Coolant level (add if necessary)",
        type: "select",
      },
      {
        name: "engineHydraulicPump",
        label: "Check Hydraulic Pump & Line condition",
        type: "select",
      },
      {
        name: "engineElectricalHarness",
        label: "Check electrical harness for damage dan positionin",
        type: "select",
      },
      {
        name: "engineBatteryElectrolyte",
        label: "Check batteray electrolit level",
        type: "select",
      },
      {
        name: "engineBelts",
        label: "Check all belt for tighness dan wear",
        type: "select",
      },
      {
        name: "engineCoverHandRail",
        label: "Check all cover and hand rail",
        type: "select",
      },
      {
        name: "engineAlternator",
        label: "Check Alternator mounting and connector",
        type: "select",
      },
      {
        name: "engineTransmissionLeaks",
        label: "Check transmision for leaks",
        type: "select",
      },
    ],
  },
  {
    title: "B. Cooling System",
    fields: [
      {
        name: "coolingRadiator",
        label: "Check Check Radiator, Aftercooler, Hyd oil cooler & connection",
        type: "select",
      },
      {
        name: "coolingFanGuard",
        label: "Check Fan quard condition",
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
    title: "C. Hydraulic System",
    fields: [
      {
        name: "hydraulicWheelLeanCylinder",
        label: "Check wheel lean cylinder dan mounting",
        type: "select",
      },
      {
        name: "hydraulicSteeringCylinder",
        label: "Check streering cylinder dan mounting",
        type: "select",
      },
      {
        name: "hydraulicBladeLiftCylinder",
        label: "Check blade lift cylinder dan mounting",
        type: "select",
      },
      {
        name: "hydraulicSideShiftCylinder",
        label: "Check side shift cylinder dan mounting",
        type: "select",
      },
      {
        name: "hydraulicCenterShiftCylinder",
        label: "Check center shift cylinder dan mounting",
        type: "select",
      },
      {
        name: "hydraulicRipperCylinder",
        label: "Check ripper cylinder dan mounting",
        type: "select",
      },
      {
        name: "hydraulicArticulationCylinder",
        label: "Check articulation cylinder dan mounting",
        type: "select",
      },
      {
        name: "hydraulicOilLevel",
        label: "Check hydraulic oil level (add it necessary)",
        type: "select",
      },
    ],
  },
  {
    title: "D. LH - RH Side of Machine Check",
    fields: [
      {
        name: "sideMachineFrame",
        label: "Check entire Machine frame, chasis body for cracks",
        type: "select",
      },
      {
        name: "sideBladeGet",
        label: "Check condition of blade & G.E.T for missing bolts dan wear",
        type: "select",
      },
      {
        name: "sideStapeLadder",
        label: "Check Stape Ladder & hands hold condition",
        type: "select",
      },
      {
        name: "sideTandemHousing",
        label: "Check LH/RH Tandem housing for leaks",
        type: "select",
      },
      {
        name: "sideCoverGuards",
        label: "Check Cover & Guards condition",
        type: "select",
      },
      {
        name: "sideWheelSpindle",
        label: "Check all wheel spindle bearing for leaks",
        type: "select",
      },
      {
        name: "sideFuelTank",
        label: "Check Fuel tank for damage & leak",
        type: "select",
      },
      {
        name: "sideCircleDrive",
        label: "Check circle drive for leaks",
        type: "select",
      },
      {
        name: "sideArticulationArea",
        label: "Check articulation area for dirt buld up",
        type: "select",
      },
      {
        name: "sideHydraulicTank",
        label: "Check hydraulic oil tank for damage & leaks",
        type: "select",
      },
    ],
  },
  {
    title: "G. Cabin - Electric - & Safety Device",
    fields: [
      {
        name: "cabinGlass",
        label: "Check cabin Glass Condition",
        type: "select",
      },
      {
        name: "cabinRops",
        label: "Check Condition of cabin & ROPS",
        type: "select",
      },
      {
        name: "cabinSeatBelt",
        label: "Check Seat & Safety belt condition",
        type: "select",
      },
      { name: "cabinDoorLock", label: "Check Door & Lock", type: "select" },
      {
        name: "cabinTransmissionSteeringLever",
        label: "Check Transmissi & Steering Control Lever Function",
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
      { name: "cabinMdvr", label: "Check MDVR", type: "select" },
      { name: "cabinAcBlower", label: "Check AC / Blower", type: "select" },
      { name: "cabinMirror", label: "Check Mirror condidtion", type: "select" },
      {
        name: "cabinWiper",
        label: "Check wiper condition & function",
        type: "select",
      },
      { name: "cabinHorn", label: "Check horn function", type: "select" },
      {
        name: "cabinMonitoringSystem",
        label: "Check monitoring system condition",
        type: "select",
      },
      {
        name: "cabinSwitch",
        label: "Check all switch function",
        type: "select",
      },
      {
        name: "cabinLamps",
        label: "Check all lamp function & Rotary lamp",
        type: "select",
      },
      {
        name: "cabinEmergencyStop",
        label: "Check Function Emergency Stop",
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
      { name: "cabinBrake", label: "Check all Brake function", type: "select" },
      {
        name: "cabinParkingBrake",
        label: "Chek Parking Brake Control",
        type: "select",
      },
      {
        name: "cabinFireExtinguisher",
        label: "Check Fire Extinghuiser",
        type: "select",
      },
    ],
  },
  {
    title: "I. Top Up Lubricant & Coolant",
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
      { name: "topUpCircle", label: "Circle (TURALIK 46)", type: "select" },
      {
        name: "topUpTransmission",
        label: "Transmission (SAE-30)",
        type: "select",
      },
      { name: "topUpTandem", label: "Tandem (SAE-30)", type: "select" },
      {
        name: "topUpFinalDrive",
        label: "Final Drive (SAE-30)",
        type: "select",
      },
      {
        name: "topUpFrontWheelHub",
        label: "Front Wheel Hub (SAE-30)",
        type: "select",
      },
      { name: "topUpSteering", label: "Steering", type: "select" },
      { name: "topUpGrease", label: "Grease (V220)", type: "select" },
      { name: "topUpCoolant", label: "Coolant", type: "select" },
    ],
  },
];

export default function GraderInspectionForm({
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
