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
  trackCondition: z.enum(["excellent", "good", "fair", "poor"], {
    message: "Track condition is required",
  }),
  sprocketWear: z.enum(["good", "worn", "replace"], {
    message: "Sprocket wear is required",
  }),
  hydraulicLeaks: z.boolean(),
  greaseLevels: z.enum(["adequate", "low", "empty"], {
    message: "Grease levels are required",
  }),
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

// Pilihan kondisi standar untuk sebagian besar item
const conditionEnum = z.enum(["good", "bad", "na"]).optional();

// Skema Roda (Wheel) yang sudah lengkap
export const wheelInspectionSchema = baseInspectionSchema.extend({
  equipmentType: z.literal("wheel"),

  // A. Engine
  engineOilLevel: conditionEnum,
  engineMounting: conditionEnum,
  coolantLevel: conditionEnum,
  fuelSystem: conditionEnum,
  beltTension: conditionEnum,
  airIntakeExhaust: conditionEnum,
  unusualSound: conditionEnum,
  alternator: conditionEnum,
  starterMotor: conditionEnum,
  acCompressor: conditionEnum,
  turbocharger: conditionEnum,
  waterPump: conditionEnum,
  engineOilLeakage: z.boolean().optional(),
  coolantLeakage: z.boolean().optional(),

  // B. Powertrain (Transmission, Clutch, Axle)
  transmissionOilLevel: conditionEnum,
  clutchFunction: conditionEnum,
  universalJoint: conditionEnum,
  differentialOilLevel: conditionEnum,
  driveShaft: conditionEnum,
  transmissionLeakage: z.boolean().optional(),

  // C. Hydraulic System
  hydraulicOilLevel: conditionEnum,
  hydraulicCylinder: conditionEnum,
  hydraulicPump: conditionEnum,
  hydraulicMotor: conditionEnum,
  hydraulicControlValve: conditionEnum,
  hydraulicLeakage: z.boolean().optional(),

  // D. Brake & Suspension System
  brakeFunction: conditionEnum,
  brakePadCondition: conditionEnum,
  brakeFluidLevel: conditionEnum,
  frontSuspension: conditionEnum,
  rearSuspension: conditionEnum,
  shockAbsorber: conditionEnum,
  hollowSpring: conditionEnum,

  // E. Wheel & Tire System
  tirePressureFrontLeft: z.number().optional(),
  tirePressureFrontRight: z.number().optional(),
  tirePressureRearLeft: z.number().optional(),
  tirePressureRearRight: z.number().optional(),
  tireConditionFront: conditionEnum,
  tireConditionRear: conditionEnum,
  wheelBoltTightness: conditionEnum,
  wheelAlignment: conditionEnum,

  // F. Steering System
  steeringFunction: conditionEnum,
  steeringFluidLevel: conditionEnum,
  ballJointTieRod: conditionEnum,
  ballJointDrakLink: conditionEnum,

  // G. Cabin, Electrical & Safety
  cabinCleanliness: conditionEnum,
  panelFunction: conditionEnum,
  cabinLock: conditionEnum,
  seatAndSeatbelt: conditionEnum,
  controlLevers: conditionEnum,
  acBlower: conditionEnum,
  mirrorCondition: conditionEnum,
  switchFunction: conditionEnum,
  wiperFunction: conditionEnum,
  hornFunction: conditionEnum,
  allLamps: conditionEnum,
  battery: conditionEnum,
  radioCommunication: conditionEnum,
  emergencyStop: conditionEnum,
  reverseCamera: conditionEnum,
  mdvr: conditionEnum,
  apar: conditionEnum, // Fire Extinguisher

  // H. Attachment & Structure
  dumpBody: conditionEnum,
  safetyDumpFunction: conditionEnum,
  centralGrease: conditionEnum,
  allGreasingPoints: conditionEnum,
  chassisFrame: conditionEnum,

  // I. Top-Up Checklist
  engineOilTopUp: z.boolean().optional(),
  transmissionOilTopUp: z.boolean().optional(),
  hydraulicOilTopUp: z.boolean().optional(),
  differentialOilTopUp: z.boolean().optional(),
  steeringFluidTopUp: z.boolean().optional(),
  greaseTopUp: z.boolean().optional(),
  coolantTopUp: z.boolean().optional(),
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
