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
        name: "engineVisual",
        label: "Visual check engine condition form : leaks, lose bolt & etc",
        type: "select",
      },
      {
        name: "upperEngineLeaks",
        label:
          "Check oil leak, coolant leak dan gas leak at upper engine compartment area",
        type: "select",
      },
      {
        name: "fuelLine",
        label: "Check all fuel line for tighneass, wear dan leakage",
        type: "select",
      },
      {
        name: "unusualSound",
        label: "Check unusualy sound/noise",
        type: "select",
      },
      {
        name: "alternatorCondition",
        label: "Check alternator condition",
        type: "select",
      },
      {
        name: "starterMotorCondition",
        label: "Check starter motor condition",
        type: "select",
      },
      {
        name: "acCompressorCondition",
        label: "Check AC compresor condition",
        type: "select",
      },
      {
        name: "turbochargerCondition",
        label: "Check Turbocharger RH/LH",
        type: "select",
      },
      {
        name: "waterPumpCondition",
        label: "Check Water Pump condition",
        type: "select",
      },
    ],
  },
  {
    title: "B. Cooling System",
    fields: [
      {
        name: "radiatorConnection",
        label: "Check Radiator & connection",
        type: "select",
      },
      {
        name: "fanGuardCondition",
        label: "Check Fan quard condition",
        type: "select",
      },
      { name: "beltTension", label: "Check Belt Tension", type: "select" },
    ],
  },
  {
    title: "C. LH Side of Machine Check",
    fields: [
      {
        name: "leftFrontWheel",
        label: "Check left front wheel pressure & fastener",
        type: "select",
      },
      {
        name: "ropsMounting",
        label: "Check ROPS cabin mounting",
        type: "select",
      },
      {
        name: "steeringLinkage",
        label: "Check Steering Link Age",
        type: "select",
      },
      {
        name: "frontSuspension",
        label: "Check Front Suspension cylinder & Mounting",
        type: "select",
      },
      {
        name: "rearSuspension",
        label: "Check Rear Suspension cylinder & Mounting",
        type: "select",
      },
      { name: "hydraulicTank", label: "Check Hydraulic tank", type: "select" },
      { name: "tankMounting", label: "Check tank Mounting", type: "select" },
      {
        name: "chassisMainFrame",
        label: "Check Chasis/Main Frame",
        type: "select",
      },
      {
        name: "hoistCylinder",
        label: "Check Hoist Cylinder & mounting",
        type: "select",
      },
      { name: "leftRearWheel", label: "Check left Rear Wheel", type: "select" },
      {
        name: "leftRearFinalDrive",
        label: "Check left rear Final Drive",
        type: "select",
      },
      { name: "dumpBody", label: "Check Dump Body", type: "select" },
      { name: "greaseLine", label: "Check Grease Line", type: "select" },
      { name: "hydraulicLine", label: "Check Hydraulic Line", type: "select" },
      {
        name: "airCleaner",
        label: "Check Air Cleaner condition",
        type: "select",
      },
      {
        name: "steeringOilTank",
        label: "Check Steering Oil Tank",
        type: "select",
      },
      { name: "greaseSystem", label: "Check Grease System", type: "select" },
      {
        name: "batteryElectrolyte",
        label: "Check Battery Electrolit Level",
        type: "select",
      },
      { name: "handRail", label: "Check Hand Rail condition", type: "select" },
      { name: "walkways", label: "Chek Walkways condition", type: "select" },
    ],
  },
  {
    title: "D. RH Side of Machine Check",
    fields: [
      {
        name: "rightRearWheel",
        label: "Check Right Rear wheel pressure & fastener",
        type: "select",
      },
      {
        name: "rhFinalDrive",
        label: "Check RH Final Drive considitin",
        type: "select",
      },
      {
        name: "rhRearSuspension",
        label: "Check Rear Suspensison Cylinder & Mounting",
        type: "select",
      },
      {
        name: "fuelTankMounting",
        label: "Check Fuel Tank & Mounting",
        type: "select",
      },
      {
        name: "fuelLineCondition",
        label: "Check fuel Line condition",
        type: "select",
      },
      {
        name: "rhChassisMounting",
        label: "Check Chasis & Mounting",
        type: "select",
      },
      {
        name: "rhFrontSuspension",
        label: "Check Front Suspension Cylinder & Mounting",
        type: "select",
      },
      {
        name: "rhSteeringLinkage",
        label: "Check Steering Linkage",
        type: "select",
      },
      {
        name: "rhDumpBodyCondition",
        label: "Check dump body condition",
        type: "select",
      },
    ],
  },
  {
    title: "E. Rear Axle Assembly",
    fields: [
      {
        name: "rearAxleLooseBolts",
        label: "Check Lose bolt's",
        type: "select",
      },
      { name: "rearAxleOilLeaks", label: "Check Oil leaks", type: "select" },
    ],
  },
  {
    title: "F. Power Train",
    fields: [
      {
        name: "differentialCondition",
        label: "Check Differential Condition",
        type: "select",
      },
      {
        name: "transmissionCondition",
        label: "Check transmission condition",
        type: "select",
      },
      {
        name: "powerTrainLine",
        label: "Chek Power Train line condition",
        type: "select",
      },
      {
        name: "torqueConverter",
        label: "Check Torque conveter concondition",
        type: "select",
      },
      {
        name: "driveShaftJoint",
        label: "Check Drive Shaft joint condidtion",
        type: "select",
      },
    ],
  },
  {
    title: "G. Cabin & Safety Device",
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
        name: "seatSafetyBelt",
        label: "Check Seat & Safety belt condition",
        type: "select",
      },
      { name: "wiperFunction", label: "Check Wiper function", type: "select" },
      { name: "hornFunction", label: "Check Horn function", type: "select" },
      {
        name: "radioCommunication",
        label: "Check Radio Communication",
        type: "select",
      },
      { name: "reverseCamera", label: "Check Reverse Camera", type: "select" },
      { name: "mdvr", label: "Check MDVR", type: "select" },
      {
        name: "mirrorCondition",
        label: "Check Mirror condidtion",
        type: "select",
      },
      { name: "doorLock", label: "Check Door & Lock", type: "select" },
      {
        name: "monitoringSystem",
        label: "Check monitoring system condition",
        type: "select",
      },
      {
        name: "secondarySteering",
        label: "Check Secondary Steering",
        type: "select",
      },
      {
        name: "allBrakeFunction",
        label: "Check all Brake function",
        type: "select",
      },
      {
        name: "parkingBrakeControl",
        label: "Chek Parking Brake Control",
        type: "select",
      },
      {
        name: "emergencyStop",
        label: "Check Function Emergency Stop",
        type: "select",
      },
      {
        name: "fireExtinguisher",
        label: "Check Fire Extinghuiser",
        type: "select",
      },
    ],
  },
  // This is the updated section for your heavyDumpTruckFormSections array.
  {
    title: "I. Top Up Lubricant & Coolant",
    description: "Pilih kondisi untuk setiap item pelumas dan pendingin.",
    fields: [
      {
        name: "conditionEngineOil",
        label: "Engine Oil (SAE 15W-40)",
        type: "select",
      },
      {
        name: "conditionHydraulic",
        label: "Hydraulic (TURALIK 46)",
        type: "select",
      },
      {
        name: "conditionFrontSuspension",
        label: "Front Suspension (TURALIK 46)",
        type: "select",
      },
      {
        name: "conditionRearSuspension",
        label: "Rear Suspension (TURALIK 46)",
        type: "select",
      },
      {
        name: "conditionTransmission",
        label: "Transmission (SAE-30)",
        type: "select",
      },
      {
        name: "conditionDifferential",
        label: "Differential (SAE-30)",
        type: "select",
      },
      {
        name: "conditionFinalDrive",
        label: "Final Drive (SAE-30)",
        type: "select",
      },
      { name: "conditionBrakeFluid", label: "Brake (SAE-30)", type: "select" },
      { name: "conditionSteering", label: "Steering", type: "select" },
      { name: "conditionGrease", label: "Grease (V220)", type: "select" },
      { name: "conditionCoolant", label: "Coolant", type: "select" },
    ],
  },
];

export default function HeavyDumpTruckInspectionForm({
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
          <CardContent className="space-y-4">
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
