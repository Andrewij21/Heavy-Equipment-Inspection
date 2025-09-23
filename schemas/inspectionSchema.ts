import { z } from "zod";

// Common fields for all inspection types
const baseInspectionSchema = z.object({
  equipmentId: z.string().min(1, "Equipment ID is required"),
  modelUnit: z.string().min(1, "Model unit is required"),
  location: z.string().min(1, "Location is required"),
  operatorName: z.string().min(1, "Operator name is required"),
  inspectionDate: z.string().min(1, "Inspection date is required"),
  inspectionTime: z.string().min(1, "Inspection time is required"),
  workingHours: z.number().min(0, "Working hours must be positive"),
  notes: z.string().optional(),
  mechanicName: z.string().min(1, "Mechanic name is required"),
  groupLeaderName: z.string().optional(),
});

export const trackInspectionSchema = baseInspectionSchema.extend({
  equipmentType: z.literal("track"),

  // Engine checks
  engineOilLevel: z.enum(["good", "low", "empty"], {
    message: "Engine oil level is required",
  }),
  engineOilLeakage: z.boolean(),
  engineMounting: z.enum(["good", "loose", "damaged"], {
    message: "Engine mounting condition is required",
  }),
  coolantLevel: z.enum(["good", "low", "empty"], {
    message: "Coolant level is required",
  }),
  coolantLeakage: z.boolean(),
  fuelSystemCondition: z.enum(["good", "leak", "damaged"], {
    message: "Fuel system condition is required",
  }),
  beltTension: z.enum(["proper", "loose", "tight"], {
    message: "Belt tension is required",
  }),
  airIntakeCondition: z.enum(["clean", "dirty", "blocked"], {
    message: "Air intake condition is required",
  }),

  // Transmission & Clutch
  transmissionOilLevel: z.enum(["adequate", "low", "empty"], {
    message: "Transmission oil level is required",
  }),
  transmissionLeakage: z.boolean(),
  clutchFunction: z.enum(["good", "slipping", "damaged"], {
    message: "Clutch function is required",
  }),
  clutchPadWear: z.enum(["good", "worn", "replace"], {
    message: "Clutch pad wear is required",
  }),
  universalJoint: z.enum(["good", "worn", "damaged"], {
    message: "Universal joint condition is required",
  }),

  // Hydraulic System
  hydraulicOilLevel: z.enum(["adequate", "low", "empty"], {
    message: "Hydraulic oil level is required",
  }),
  hydraulicLeakage: z.boolean(),
  hydraulicPumpCondition: z.enum(["good", "noisy", "damaged"], {
    message: "Hydraulic pump condition is required",
  }),
  controlValveCondition: z.enum(["good", "sticky", "damaged"], {
    message: "Control valve condition is required",
  }),

  // Track System
  trackTension: z.enum(["proper", "loose", "tight"], {
    message: "Track tension is required",
  }),
  trackShoeCondition: z.enum(["good", "worn", "damaged"], {
    message: "Track shoe condition is required",
  }),
  sprocketCondition: z.enum(["good", "worn", "damaged"], {
    message: "Sprocket condition is required",
  }),
  idlerCondition: z.enum(["good", "worn", "damaged"], {
    message: "Idler condition is required",
  }),
  rollerCondition: z.enum(["good", "worn", "damaged"], {
    message: "Roller condition is required",
  }),
  trackPadWear: z
    .number()
    .min(0)
    .max(100, "Track pad wear must be between 0-100%"),

  // Cabin & Electric
  cabinCondition: z.enum(["clean", "dirty", "damaged"], {
    message: "Cabin condition is required",
  }),
  panelFunction: z.enum(["all_working", "some_issues", "major_issues"], {
    message: "Panel function is required",
  }),
  controlLeverFunction: z.enum(["smooth", "sticky", "damaged"], {
    message: "Control lever function is required",
  }),
  lampFunction: z.enum(["all_working", "some_out", "major_issues"], {
    message: "Lamp function is required",
  }),
  batteryCondition: z.enum(["good", "weak", "replace"], {
    message: "Battery condition is required",
  }),
  safetyBelt: z.enum(["good", "worn", "missing"], {
    message: "Safety belt condition is required",
  }),

  // Measurements
  cylinderTempDelta: z.number().optional(),
  hydraulicPressure: z.number().optional(),

  // Top-up requirements
  engineOilTopUp: z.boolean(),
  hydraulicOilTopUp: z.boolean(),
  coolantTopUp: z.boolean(),
  greaseTopUp: z.boolean(),
});

export const wheelInspectionSchema = baseInspectionSchema.extend({
  equipmentType: z.literal("wheel"),

  // Tire & Wheel Inspection
  tirePressureFrontLeft: z.number().min(0, "Tire pressure must be positive"),
  tirePressureFrontRight: z.number().min(0, "Tire pressure must be positive"),
  tirePressureRearLeft: z.number().min(0, "Tire pressure must be positive"),
  tirePressureRearRight: z.number().min(0, "Tire pressure must be positive"),
  tireConditionFront: z.enum(["good", "worn", "damaged"], {
    message: "Front tire condition is required",
  }),
  tireConditionRear: z.enum(["good", "worn", "damaged"], {
    message: "Rear tire condition is required",
  }),
  wheelBoltTightness: z.enum(["proper", "loose", "missing"], {
    message: "Wheel bolt tightness is required",
  }),
  wheelAlignment: z.enum(["proper", "misaligned"], {
    message: "Wheel alignment is required",
  }),

  // Brake System
  brakeFunction: z.enum(["good", "weak", "failed"], {
    message: "Brake function is required",
  }),
  brakePadCondition: z.enum(["good", "worn", "replace"], {
    message: "Brake pad condition is required",
  }),
  brakeFluidLevel: z.enum(["adequate", "low", "empty"], {
    message: "Brake fluid level is required",
  }),

  // Suspension
  frontSuspension: z.enum(["good", "worn", "damaged"], {
    message: "Front suspension condition is required",
  }),
  rearSuspension: z.enum(["good", "worn", "damaged"], {
    message: "Rear suspension condition is required",
  }),
  shockAbsorber: z.enum(["good", "worn", "leaking"], {
    message: "Shock absorber condition is required",
  }),

  // Leak Checks (Booleans)
  engineOilLeakage: z.boolean(),
  coolantLeakage: z.boolean(),
  transmissionLeakage: z.boolean(),
  hydraulicLeakage: z.boolean(),

  // Top-up requirements (Booleans)
  engineOilTopUp: z.boolean(),
  hydraulicOilTopUp: z.boolean(),
  coolantTopUp: z.boolean(),
  greaseTopUp: z.boolean(),
  brakeFluidTopUp: z.boolean(),
  steeringFluidTopUp: z.boolean(),
});

export const supportInspectionSchema = baseInspectionSchema.extend({
  equipmentType: z.literal("support"),
  coolantLeakage: z.boolean(),
  // Engine checks (for powered support equipment)
  engineOilLevel: z.enum(["good", "low", "empty"], {
    message: "Engine oil level is required",
  }),
  engineOilLeakage: z.boolean(),
  coolantLevel: z.enum(["good", "low", "empty"], {
    message: "Coolant level is required",
  }),
  fuelSystemCondition: z.enum(["good", "leak", "damaged"], {
    message: "Fuel system condition is required",
  }),
  beltTension: z.enum(["proper", "loose", "tight"], {
    message: "Belt tension is required",
  }),

  // Hydraulic System (for hydraulic support equipment)
  hydraulicOilLevel: z.enum(["adequate", "low", "empty"], {
    message: "Hydraulic oil level is required",
  }),
  hydraulicLeakage: z.boolean(),
  hydraulicPumpCondition: z.enum(["good", "noisy", "damaged"], {
    message: "Hydraulic pump condition is required",
  }),
  hydraulicPressure: z.number().optional(),

  // Structural Integrity
  structuralIntegrity: z.enum(["excellent", "good", "fair", "poor"], {
    message: "Structural integrity is required",
  }),
  weldingCondition: z.enum(["excellent", "good", "fair", "poor"], {
    message: "Welding condition is required",
  }),
  frameCondition: z.enum(["good", "cracked", "damaged"], {
    message: "Frame condition is required",
  }),
  boltTightness: z.enum(["proper", "loose", "missing"], {
    message: "Bolt tightness is required",
  }),

  // Safety Features
  safetyDevices: z.enum(["functional", "damaged", "missing"], {
    message: "Safety devices condition is required",
  }),
  emergencyStop: z.enum(["working", "not_working"], {
    message: "Emergency stop function is required",
  }),
  fireExtinguisher: z.enum(["present", "expired", "missing"], {
    message: "Fire extinguisher status is required",
  }),
  safetyBelt: z.enum(["good", "worn", "missing"], {
    message: "Safety belt condition is required",
  }),

  // Electrical System
  batteryCondition: z.enum(["good", "weak", "replace"], {
    message: "Battery condition is required",
  }),
  wiringCondition: z.enum(["good", "damaged", "exposed"], {
    message: "Wiring condition is required",
  }),
  lampFunction: z.enum(["all_working", "some_out", "major_issues"], {
    message: "Lamp function is required",
  }),
  controlPanelFunction: z.enum(["all_working", "some_issues", "major_issues"], {
    message: "Control panel function is required",
  }),

  // Specific Support Equipment Checks
  loadCapacity: z.number().min(0, "Load capacity must be positive"),
  stabilityCheck: z.enum(["stable", "unstable"], {
    message: "Stability check is required",
  }),
  outriggerCondition: z.enum(["good", "damaged", "not_applicable"], {
    message: "Outrigger condition is required",
  }),

  // Crane-specific (if applicable)
  wireRopeCondition: z.enum(["good", "frayed", "damaged", "not_applicable"], {
    message: "Wire rope condition is required",
  }),
  hookCondition: z.enum(["good", "worn", "damaged", "not_applicable"], {
    message: "Hook condition is required",
  }),
  blockCondition: z.enum(["good", "worn", "damaged", "not_applicable"], {
    message: "Block condition is required",
  }),

  // Environmental
  paintCondition: z.enum(["excellent", "good", "fair", "poor"], {
    message: "Paint condition is required",
  }),
  corrosionLevel: z.enum(["none", "light", "moderate", "severe"], {
    message: "Corrosion level is required",
  }),

  // Top-up requirements
  engineOilTopUp: z.boolean(),
  hydraulicOilTopUp: z.boolean(),
  coolantTopUp: z.boolean(),
  greaseTopUp: z.boolean(),
});

export type TrackInspection = z.infer<typeof trackInspectionSchema>;
export type WheelInspection = z.infer<typeof wheelInspectionSchema>;
export type SupportInspection = z.infer<typeof supportInspectionSchema>;

export type InspectionFormData =
  | TrackInspection
  | WheelInspection
  | SupportInspection;
