import { z } from "zod";
const SupportGeneralTypeEnum = z.enum([
  "Mobile",
  "Crane",
  "Towerlamp",
  "Genset",
  "WeldingMachine",
  "Compressor",
  "MultiFlow",
  "TyreHandler",
]);
const ShiftEnum = z.enum(["day", "night"]);

// --- ZOD SCHEMA UNTUK DETAIL PEMERIKSAAN (WHEEL INSPECTION DETAILS) ---
// Semua field detail dianggap opsional/nullable karena form tidak selalu mengisi semuanya
const supportDetailsSchema = z.object({
  // DYNAMIC/UNSTRUCTURED DATA
  findings: z
    .array(
      z.object({ description: z.string(), status: z.enum(["open", "close"]) })
    )
    .optional()
    .nullable(),

  // ==========================================================
  // A. ENGINE SYSTEM (String Status)
  // ==========================================================
  engineOilLevel: z.string().optional().nullable(),
  engineMounting: z.string().optional().nullable(),
  engineCoolantLevel: z.string().optional().nullable(),
  engineFuelSystem: z.string().optional().nullable(),
  engineBeltTension: z.string().optional().nullable(),
  engineAirIntake: z.string().optional().nullable(),

  // ==========================================================
  // B. TRANSMISSION & CLUTCH (String Status)
  // ==========================================================
  transmissionOilLevel: z.string().optional().nullable(),
  transmissionClutch: z.string().optional().nullable(),
  transmissionUniversalJoint: z.string().optional().nullable(),

  // ==========================================================
  // C. HYDRAULIC SYSTEM (String Status)
  // ==========================================================
  hydraulicOilLevel: z.string().optional().nullable(),
  hydraulicPumpLeakage: z.string().optional().nullable(),
  hydraulicValveLeakage: z.string().optional().nullable(),

  // ==========================================================
  // D. CABIN CONTROLS (String Status)
  // ==========================================================
  cabinCleaning: z.string().optional().nullable(),
  cabinLock: z.string().optional().nullable(),
  cabinSteeringLever: z.string().optional().nullable(),
  cabinAttachmentLever: z.string().optional().nullable(),
  cabinBallJointTieRod: z.string().optional().nullable(),
  cabinBallJointDrakLink: z.string().optional().nullable(),
  cabinAcBlower: z.string().optional().nullable(),
  cabinSwitchFunction: z.string().optional().nullable(),
  cabinLampFunction: z.string().optional().nullable(),
  cabinBattery: z.string().optional().nullable(),
  cabinSafetyBelt: z.string().optional().nullable(),
  cabinApar: z.string().optional().nullable(),

  // ==========================================================
  // E. AXLE & BRAKES (String Status)
  // ==========================================================
  axleDifferentialOil: z.string().optional().nullable(),
  axleLockCabin: z.string().optional().nullable(),
  axlePinSpring: z.string().optional().nullable(),
  axleTorqueRod: z.string().optional().nullable(),
  axleTyreBrake: z.string().optional().nullable(),
  axleSpringUBolt: z.string().optional().nullable(),
  axleBallJointTieRod: z.string().optional().nullable(),
  axleBallJointDrakLink: z.string().optional().nullable(),
  axleShockAbsorber: z.string().optional().nullable(),
  axleBoltTyre: z.string().optional().nullable(),
  axleHollowSpring: z.string().optional().nullable(),

  // ==========================================================
  // F. ATTACHMENT (String Status)
  // ==========================================================
  attachmentTankLeakage: z.string().optional().nullable(),
  attachmentBallValve: z.string().optional().nullable(),
  attachmentAirCompressor: z.string().optional().nullable(),
  attachmentAirPump: z.string().optional().nullable(),
  attachmentWaterSprayer: z.string().optional().nullable(),
  attachmentDriveCoupling: z.string().optional().nullable(),
  attachmentWaterPump: z.string().optional().nullable(),
  attachmentFuelPump: z.string().optional().nullable(),
  attachmentCouplingJointer: z.string().optional().nullable(),

  // ==========================================================
  // G. TOP UP QUANTITIES (DIUBAH MENJADI NUMBER)
  // ==========================================================
  topUpEngineOil: z.number().nullable().optional(),
  topUpTransmission: z.number().nullable().optional(),
  topUpHydraulic: z.number().nullable().optional(),
  topUpDifferential: z.number().nullable().optional(),
  topUpSteering: z.number().nullable().optional(),
  topUpClutchFluid: z.number().nullable().optional(),
  topUpGrease: z.number().nullable().optional(),
  topUpCoolant: z.number().nullable().optional(),

  // Crane
  craneShackleRope: z.string().optional().nullable(),
  craneRopeWire: z.string().optional().nullable(),
  craneSafetyDevice: z.string().optional().nullable(),
  craneWireTerminal: z.string().optional().nullable(),
  craneRopeStretch: z.string().optional().nullable(),
  craneHookBlock: z.string().optional().nullable(),

  // Towerlamp
  hydraulicWireRope: z.string().optional().nullable(),
  hydraulicTelescopicTower: z.string().optional().nullable(),

  electricWorkLamp: z.string().optional().nullable(),
  electricSwitchLamp: z.string().optional().nullable(),
  electricPanelMonitor: z.string().optional().nullable(),
  electricGeneratorConnection: z.string().optional().nullable(),
  electricBattery: z.string().optional().nullable(),
  electricGeneratorVoltage: z.string().optional().nullable(),
  electricBreakerCurrent: z.string().optional().nullable(),
  electricFrequency: z.string().optional().nullable(),

  optionalVisualSkidding: z.string().optional().nullable(),
  optionalApar: z.string().optional().nullable(),

  // Genset
  // ==========================================================
  // ENGINE SYSTEM (STATUS)
  // ==========================================================
  engineOilFilter: z.string().optional().nullable(),
  engineFuelFilter: z.string().optional().nullable(),
  engineAirCleaner: z.string().optional().nullable(),
  engineRadiatorCoolant: z.string().optional().nullable(),
  engineRubberMounting: z.string().optional().nullable(),
  engineFanBelt: z.string().optional().nullable(),
  engineVisualCheck: z.string().optional().nullable(),
  engineLeaks: z.string().optional().nullable(),
  engineBearing: z.string().optional().nullable(),
  engineBoltTightening: z.string().optional().nullable(),

  // ==========================================================
  // ELECTRICAL & GENERATOR SYSTEM (STATUS)
  // ==========================================================
  electricStartingCharging: z.string().optional().nullable(),
  electricStartingMotor: z.string().optional().nullable(),
  electricStartingSwitch: z.string().optional().nullable(),
  electricAlternator: z.string().optional().nullable(),
  electricWiringHarness: z.string().optional().nullable(),
  electricMcb: z.string().optional().nullable(),
  electricMeters: z.string().optional().nullable(),
  electricSelectorSwitch: z.string().optional().nullable(),
  electricPowerCouple: z.string().optional().nullable(),
  electricAvr: z.string().optional().nullable(),
  electricGeneratorSet: z.string().optional().nullable(),
  electricGrounding: z.string().optional().nullable(),
  electricLightningArrester: z.string().optional().nullable(),
  electricGuarding: z.string().optional().nullable(),

  // welding machine
  engineFan: z.string().optional().nullable(),
  engineCoolantSystem: z.string().optional().nullable(),
  engineRadiatorLevel: z.string().optional().nullable(),
  engineBreather: z.string().optional().nullable(),
  engineFuelTank: z.string().optional().nullable(),
  engineExhaustPipe: z.string().optional().nullable(),
  engineTurbocharger: z.string().optional().nullable(),
  engineFloorCleanliness: z.string().optional().nullable(),

  // ==========================================================
  // ELECTRICAL SYSTEM (STATUS)
  // ==========================================================
  electricTerminals: z.string().optional().nullable(),
  electricIndicators: z.string().optional().nullable(),
  electricSwitchMode: z.string().optional().nullable(),
  electricBatteryConnection: z.string().optional().nullable(),

  // Comressor
  engineFilterConditions: z.string().optional().nullable(),
  topUpCompressor: z.number().nullable().optional(),

  // MultiFlow
  engineVisual: z.string().optional().nullable(),
  engineAirFilter: z.string().optional().nullable(),
  engineHose: z.string().optional().nullable(),

  // ==========================================================
  // PONTON, FRAME, & PUMP
  // ==========================================================
  pontonCondition: z.string().optional().nullable(),
  pumpCondition: z.string().optional().nullable(),
  pumpMounting: z.string().optional().nullable(),
  boltTightness: z.string().optional().nullable(),
  suctionDischargeHose: z.string().optional().nullable(),

  // daici
  engineRadiator: z.string().optional().nullable(),
  engineFanGuard: z.string().optional().nullable(),
  engineUnusualSound: z.string().optional().nullable(),
  engineAlternator: z.string().optional().nullable(),
  engineStarterMotor: z.string().optional().nullable(),
  engineWaterPump: z.string().optional().nullable(),
  engineLeftFrontWheel: z.string().optional().nullable(),
  engineRopsCabin: z.string().optional().nullable(),
  engineSteeringLinkage: z.string().optional().nullable(),
  engineFrontSuspension: z.string().optional().nullable(),
  engineRearSuspension: z.string().optional().nullable(),
  engineBrakeSystem: z.string().optional().nullable(),
  engineHydraulicTank: z.string().optional().nullable(),
  engineBrazeForkLifting: z.string().optional().nullable(),
  engineChassisFrame: z.string().optional().nullable(),
  engineHoistCylinder: z.string().optional().nullable(),
  engineLeftRearWheel: z.string().optional().nullable(),
  engineLeftRearFinalDrive: z.string().optional().nullable(),
  engineGreaseLine: z.string().optional().nullable(),
  engineHydraulicLine: z.string().optional().nullable(),
  engineDifferential: z.string().optional().nullable(),
  engineTransmission: z.string().optional().nullable(),
  enginePowerTrainLine: z.string().optional().nullable(),
  engineDriveShaft: z.string().optional().nullable(),
  engineFrontSuspensionGrease: z.string().optional().nullable(),
  engineSteeringCylinderGrease: z.string().optional().nullable(),
  engineSpiderJointGrease: z.string().optional().nullable(),
  engineRearSuspensionGrease: z.string().optional().nullable(),
  engineFrontRearAxleGrease: z.string().optional().nullable(),
  enginePinForkLiftingGrease: z.string().optional().nullable(),
  engineParkingBrake: z.string().optional().nullable(),
  engineSteeringOilTank: z.string().optional().nullable(),
  engineTankMounting: z.string().optional().nullable(),
  engineGreaseSystem: z.string().optional().nullable(),
  engineRightRearWheel: z.string().optional().nullable(),
  engineRhFinalDrive: z.string().optional().nullable(),
  engineBrakeSystem2: z.string().optional().nullable(),
  engineRearSuspension2: z.string().optional().nullable(),
  engineFuelLine: z.string().optional().nullable(),
  engineChassisMounting: z.string().optional().nullable(),
  engineFrontSuspension2: z.string().optional().nullable(),
  engineSteeringLinkage2: z.string().optional().nullable(),

  // ==========================================================
  // CABIN & KELISTRIKAN (Status)
  // ==========================================================
  cabinRops: z.string().optional().nullable(),
  cabinWheelChock: z.string().optional().nullable(),
  cabinEmergencyStop: z.string().optional().nullable(),
});

// --- SKEMA UTAMA UNTUK CREATION (BODY API) ---
export const SupportInspectionSchema = z
  .object({
    // REQUIRED HEADER FIELDS
    equipmentId: z.string().min(1, "Nomor unit wajib diisi."),
    modelUnit: z.string().min(1, "Model unit wajib diisi."),
    location: z.string().min(1, "Lokasi wajib diisi."),
    operatorName: z.string().min(1, "Nama operator wajib diisi."),
    mechanicName: z.string().min(1, "Nama mekanik wajib diisi."),
    inspectionDate: z.string().min(1, "Tanggal inspeksi wajib diisi."),
    inspectionTime: z.string().min(1, "Waktu inspeksi wajib diisi."),
    workingHours: z.number().nonnegative("Jam kerja tidak valid."),
    smr: z.number().nonnegative("SMR tidak valid."),
    timeDown: z.string().min(1, "Waktu Down wajib diisi."),
    timeOut: z.string().min(1, "Waktu Out wajib diisi."),
    shift: ShiftEnum,

    // TYPE DISCRIMINATOR
    equipmentType: z.literal("support"),
    supportGeneralType: SupportGeneralTypeEnum,

    // OPTIONAL HEADER FIELDS
    notes: z.string().optional(),
    groupLeaderName: z.string().optional().nullable(),
  })
  .merge(supportDetailsSchema.partial()); // Gabungkan dengan semua field detail

export type SupportInspection = z.infer<typeof SupportInspectionSchema>;
