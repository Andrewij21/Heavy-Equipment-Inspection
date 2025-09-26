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
// Gunakan konstanta ini untuk form inspeksi baru Anda
// Gunakan konstanta ini untuk form inspeksi baru Anda
export const formSections = [
  {
    title: "A. Engine",
    fields: [
      {
        name: "engineRadiator",
        label: "Check Radiator condition",
        type: "select",
      },
      {
        name: "engineFanGuard",
        label: "Check Fan quard condition",
        type: "select",
      },
      {
        name: "engineBeltTension",
        label: "Check Belt Tension",
        type: "select",
      },
      {
        name: "engineVisualCheck",
        label: "Visual check engine condition form : leaks, lose bolt & etc",
        type: "select",
      },
      {
        name: "engineUnusualSound",
        label: "Check unusualy sound/noise",
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
        label: "Check Turbocharger RH/LH",
        type: "select",
      },
      {
        name: "engineWaterPump",
        label: "Check Water Pump condition",
        type: "select",
      },
      {
        name: "engineLeftFrontWheel",
        label: "Check left front wheel pressure & fastener",
        type: "select",
      },
      {
        name: "engineRopsCabin",
        label: "Check ROPS cabin mounting",
        type: "select",
      },
      {
        name: "engineSteeringLinkage",
        label: "Check Steering Link Age",
        type: "select",
      },
      {
        name: "engineFrontSuspension",
        label: "Check Front Suspension cylinder & Mounting",
        type: "select",
      },
      {
        name: "engineRearSuspension",
        label: "Check Rear Suspension cylinder & Mounting",
        type: "select",
      },
      {
        name: "engineBrakeSystem",
        label: "Check Brake System",
        type: "select",
      },
      {
        name: "engineHydraulicTank",
        label: "Check Hydraulic tank",
        type: "select",
      },
      {
        name: "engineBrazeForkLifting",
        label: "Check Braze Fork lifting",
        type: "select",
      },
      {
        name: "engineChassisFrame",
        label: "Check Chasis/Min Frame",
        type: "select",
      },
      {
        name: "engineHoistCylinder",
        label: "Check Hoist Cylinder & mounting",
        type: "select",
      },
      {
        name: "engineLeftRearWheel",
        label: "Check left Rear Wheel",
        type: "select",
      },
      {
        name: "engineLeftRearFinalDrive",
        label: "Check left rear Final Drive",
        type: "select",
      },
      { name: "engineGreaseLine", label: "Check Grease Line", type: "select" },
      {
        name: "engineHydraulicLine",
        label: "Check Hydraulic Line",
        type: "select",
      },
      {
        name: "engineDifferential",
        label: "Check Differential Condition",
        type: "select",
      },
      {
        name: "engineTransmission",
        label: "Check Transmission condition",
        type: "select",
      },
      {
        name: "enginePowerTrainLine",
        label: "Chek Power Train line condition",
        type: "select",
      },
      {
        name: "engineDriveShaft",
        label: "Check Drive Shaft joint condidtion",
        type: "select",
      },
      {
        name: "engineFrontSuspensionGrease",
        label: "Fornt suspension RH / LH (check grease)",
        type: "select",
      },
      {
        name: "engineSteeringCylinderGrease",
        label: "Steering cylinder (check grease)",
        type: "select",
      },
      {
        name: "engineSpiderJointGrease",
        label: "Spider Joint (check grease)",
        type: "select",
      },
      {
        name: "engineRearSuspensionGrease",
        label: "Rear suspension RH / LH (check grease)",
        type: "select",
      },
      {
        name: "engineFrontRearAxleGrease",
        label: "Fornt & Rear Axle Tie Rod (check grease)",
        type: "select",
      },
      {
        name: "enginePinForkLiftingGrease",
        label: "PIN Fork Lifting (check grease)",
        type: "select",
      },
      {
        name: "engineParkingBrake",
        label: "Chek Parking Brake Control",
        type: "select",
      },
      {
        name: "engineAirCleaner",
        label: "Check Air Cleaner condition",
        type: "select",
      },
      {
        name: "engineSteeringOilTank",
        label: "Check Steering Oil Tank",
        type: "select",
      },
      {
        name: "engineTankMounting",
        label: "Check Tank Mounting",
        type: "select",
      },
      {
        name: "engineGreaseSystem",
        label: "Check Grease System",
        type: "select",
      },
      {
        name: "engineRightRearWheel",
        label: "Check Right Rear wheel pressure & fastener",
        type: "select",
      },
      {
        name: "engineRhFinalDrive",
        label: "Check RH Final Drive condition",
        type: "select",
      },
      {
        name: "engineBrakeSystem2",
        label: "Check Brake System",
        type: "select",
      },
      {
        name: "engineRearSuspension2",
        label: "Check Rear Suspensison Cylinder & Mounting",
        type: "select",
      },
      {
        name: "engineFuelTank",
        label: "Check Fuel Tank & Mounting",
        type: "select",
      },
      {
        name: "engineFuelLine",
        label: "Check fuel Line condition",
        type: "select",
      },
      {
        name: "engineChassisMounting",
        label: "Check Chasis & Mounting",
        type: "select",
      },
      {
        name: "engineFrontSuspension2",
        label: "Check Front Suspension Cylinder & Mounting",
        type: "select",
      },
      {
        name: "engineSteeringLinkage2",
        label: "Check Steering Linkage",
        type: "select",
      },
    ],
  },
  {
    title: "B. Cabin & Electric",
    fields: [
      {
        name: "cabinRops",
        label: "Check Condition of cabin & ROPS",
        type: "select",
      },
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
      { name: "cabinAcBlower", label: "Check AC / Blower", type: "select" },
      { name: "cabinSafetyBelt", label: "Check Safety Belt", type: "select" },
      { name: "cabinApar", label: "Check APAR", type: "select" },
      {
        name: "cabinWheelChock",
        label: "Check Wheel chock and safety cone",
        type: "select",
      },
      {
        name: "cabinEmergencyStop",
        label: "Check Emergency Stop function",
        type: "select",
      },
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
        label: "Check Battery, connection condition, and electrolit level",
        type: "select",
      },
    ],
  },
  {
    title: "C. Top Up Lubricant & Coolant",
    fields: [
      {
        name: "topUpEngineOil",
        label: "Engine Oil (SAE 15W-40)",
        type: "select",
      },
      { name: "topUpHydraulic", label: "Hydraulic (TO 10)", type: "select" },
      { name: "topUpGrease", label: "Grease (EP NLGI-2)", type: "select" },
      { name: "topUpCoolant", label: "Coolant (VCS)", type: "select" },
    ],
  },
];
export default function DeiciInspectionForm({
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
