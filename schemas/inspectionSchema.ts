import { z } from "zod";
// Common fields for all inspection types
const baseInspectionSchema = z.object({
  equipmentId: z.string().min(1, "Unit No is required"),
  modelUnit: z.string().min(1, "Model unit is required"),
  location: z.string().min(1, "Location is required"),
  operatorName: z.string().min(1, "Operator name is required"),
  inspectionDate: z.string().min(1, "Inspection date is required"),
  inspectionTime: z.string().min(1, "Inspection time is required"),
  // Keep workingHours required with a min value
  workingHours: z.number().min(0, "Working hours must be positive"),
  notes: z.string().optional(),
  mechanicName: z.string().min(1, "Mechanic name is required"),
  groupLeaderName: z.string().optional(),

  // --- NEW FIELDS MADE REQUIRED ---
  // SMR must be a number, making it required will force a value greater than -1
  smr: z
    .number({
      error: "SMR must be a number",
    })
    .min(0, "SMR must be a positive number"),
  timeDown: z.string().min(1, "Time Down is required"),
  timeOut: z.string().min(1, "Time Out is required"),
  // Shift is an enum, making it required by not using .optional()
  shift: z.enum(["day", "night"], {
    message: "Shift is required",
  }),
});

// The result enum for inspection results (naturally optional)
const resultEnum = z.enum(["ok", "failure"]).optional();

// The quantity field for top-up is a number (naturally optional)
const quantityField = z.number().optional();

// The temperature field is a number (naturally optional)
const tempField = z.number().optional();

// A generic optional number field for grease/qty/temp
const optionalNumber = z.number().optional();

export const trackInspectionSchema = baseInspectionSchema.extend({
  equipmentType: z.literal("track"),

  // Field baru untuk pemilihan tipe model
  equipmentGeneralType: z.enum(["Big Digger", "Small PC", "Bulldozer"], {
    message: "Equipment type is required",
  }),

  // Lower Frame Area Check
  lowerLockOutSwitch: resultEnum,
  lowerTrackLinkTension: resultEnum,
  lowerTrackShoeBolt: resultEnum,
  lowerIdlerRollerGuard: resultEnum,
  lowerUnderGuard: resultEnum,
  lowerFinalDriveSprocket: resultEnum,
  lowerSwingCircle: resultEnum,
  lowerAttachmentCondition: resultEnum,
  lowerDrainWaterSediment: resultEnum,
  lowerHydraulicOilLevel: resultEnum,

  // Upper Structure Area Check (Simplified to show the pattern)
  upperEngineOilLevel: resultEnum,
  upperEngineVisual: resultEnum,
  upperCoolantLevel: resultEnum,
  // Note: Check if the name in SmallPC/BigDigger (upperRadiator) is the same as schema (upperRadiatorEtc)
  upperRadiator: resultEnum.optional().or(resultEnum), // Handles both upperRadiator and upperRadiatorEtc
  upperRadiatorEtc: resultEnum,
  upperTurboInlet: resultEnum,
  upperAirCleaner: resultEnum,
  upperCompartmentLeaks: resultEnum,
  upperHydraulicPump: resultEnum,
  upperControlValve: resultEnum,
  upperSwingMachineOil: resultEnum,
  upperElectricWiring: resultEnum,
  upperBatteryElectrolyte: resultEnum,
  upperFanBelts: resultEnum,
  upperCylinderLeaks: resultEnum,
  upperCoverHandRail: resultEnum,

  // Measure Cylinder Temperature
  tempCylBoomRh: tempField,
  tempCylBoomLh: tempField,
  tempCylArmRh: tempField,
  tempCylArmLh: tempField,
  tempCylBucketRh: tempField,
  tempCylBucketLh: tempField,

  // Grease Condition (Using optionalNumber for consistency with SmallPC.tsx which uses type "grease")
  greaseBoomCylFoot: resultEnum,
  greaseBoomFootPin: resultEnum,
  greaseBoomCylRod: resultEnum,
  greaseArmCylFoot: resultEnum,
  greaseBoomArmCoupling: resultEnum,
  greaseArmCylRod: resultEnum,
  greaseBucketCylFoot: resultEnum,
  greaseArmLinkCoupling: resultEnum,
  greaseArmBucketCoupling: resultEnum,
  greaseLinkCoupling: resultEnum,
  greaseBucketCylRod: resultEnum,
  greaseBucketLinkCoupling: resultEnum,

  // Inside Cabin Check
  cabinMonitorPanel: resultEnum,
  cabinSwitches: resultEnum,
  cabinGauge: resultEnum,
  cabinControlLever: resultEnum,
  cabinRadioComm: resultEnum,
  cabinFmRadio: resultEnum,
  cabinWorkLamp: resultEnum,
  cabinTravelAlarm: resultEnum,
  cabinHorn: resultEnum,
  cabinMirror: resultEnum,
  cabinRotaryLamp: resultEnum,
  cabinWiper: resultEnum,
  cabinWindowWasher: resultEnum,
  cabinAcFunction: resultEnum,
  cabinFuseRelay: resultEnum,
  cabinOperatorSeat: resultEnum,

  // Safety Function
  safetyFireExtinguisher: resultEnum,
  safetyEmergencyStop: resultEnum,
  safetyCabinRops: resultEnum,
  safetyBelt: resultEnum,

  // Top-Up Lubricant & Coolant (SmallPC.tsx uses this naming, BigDigger/Bulldozer use different naming. We'll use the SmallPC names for simplicity and add the others as optional too.)
  topUpCoolant: quantityField,
  topUpEngine: quantityField,
  topUpHydraulic: quantityField,
  topUpSwingMachinery: quantityField,
  topUpFinalDrive: quantityField,

  // Top-Up Lubricant (BigDigger/Bulldozer-specific fields - need to include them to avoid Zod error)
  topUpCoolantQty: quantityField,
  topUpEngineQty: quantityField,
  topUpHydraulicQty: quantityField,
  topUpSwingMachineryQty: quantityField,
  topUpFinalDriveQty: quantityField,

  // Bulldozer-specific fields (must be optional)
  engineOilLevelLeakage: resultEnum,
  engineCoolantLevelLeakage: resultEnum,
  engineFuelSystemLeakage: resultEnum,
  engineBelts: resultEnum,
  engineIntakeClamps: resultEnum,
  engineExhaustLeakage: resultEnum,
  engineOperationalSound: resultEnum,

  powertrainTransmissionOil: resultEnum,
  powertrainTorqueConverterOil: resultEnum,
  powertrainDifferentialOil: resultEnum,
  powertrainFinalDriveOil: resultEnum,
  powertrainBrakeOperation: resultEnum,
  powertrainPropellerShaft: resultEnum,

  hydraulicOilLevel: resultEnum,
  hydraulicSystemLeakage: resultEnum,
  hydraulicPumpLineLeakage: resultEnum,
  hydraulicHoseCondition: resultEnum,
  hydraulicCylinderLiftBlade: resultEnum,
  hydraulicCylinderTiltBlade: resultEnum,
  hydraulicCylinderLiftRipper: resultEnum,
  hydraulicCylinderTiltRipper: resultEnum,

  structureAutolube: resultEnum,
  structureEqualizerBarSeal: resultEnum,
  structurePivotShaftLeakage: resultEnum,
  structureFrameCracks: resultEnum,
  structureTrackLinkBushing: resultEnum,
  structureUndercarriageBolt: resultEnum,
  structureTrackTension: resultEnum,
  structureRipperFrame: resultEnum,
  structureBogglePivot: resultEnum,
  structureMasterLinkBolt: resultEnum,
  structureIdlerMountingBolt: resultEnum,
  structureEqualizerBarBearing: resultEnum,
  structureBladeMountingPin: resultEnum,
  structureCuttingEdge: resultEnum,
  structureEndBit: resultEnum,
  structureCarrieRoller: resultEnum,
  structureRipperPoint: resultEnum,

  electricalBatteryMounting: resultEnum,
  electricalBatteryElectrolyte: resultEnum,
  electricalTerminalCleaning: resultEnum,
  electricalConnectorCleaning: resultEnum,
  electricalLamps: resultEnum,
  electricalIsolationSwitch: resultEnum,
  electricalGaugePanel: resultEnum,
  electricalBackupAlarm: resultEnum,

  // Finding Inspection (for finding table - already optional)
  findings: z
    .array(
      z.object({
        description: z.string().min(1, "Description is required"),
        status: z.enum(["open", "close"]),
      })
    )
    .optional(),
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
