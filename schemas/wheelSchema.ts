// src/schemas/wheelInspectionSchema.ts

import { z } from "zod";

// --- ENUMS ---
// Asumsi Enums ini sudah didefinisikan di suatu tempat atau kita definisikan di sini:
const EquipmentTypeEnum = z.enum(["track", "wheel", "support"]);
const WheelGeneralTypeEnum = z.enum([
  "DumpTruck",
  "HeavyDumpTruck",
  "Grader",
  "Compactor",
]);
const InspectionStatusEnum = z.enum(["PENDING", "APPROVED", "REJECTED"]);
const ShiftEnum = z.enum(["day", "night"]);

// --- ZOD SCHEMA UNTUK DETAIL PEMERIKSAAN (WHEEL INSPECTION DETAILS) ---
// Semua field detail dianggap opsional/nullable karena form tidak selalu mengisi semuanya
const wheelDetailsSchema = z.object({
  // DYNAMIC/UNSTRUCTURED DATA
  findings: z
    .array(
      z.object({ description: z.string(), status: z.enum(["open", "close"]) })
    )
    .optional()
    .nullable(),

  //Dumptruck
  engineOilLevel: z.string().optional().nullable(),
  engineMounting: z.string().optional().nullable(),
  engineCoolantLevel: z.string().optional().nullable(),
  engineFuelSystemLeakage: z.string().optional().nullable(),
  engineBeltTension: z.string().optional().nullable(),
  engineAirIntake: z.string().optional().nullable(),

  // Powertrain Fields
  powertrainTransmissionOilLevel: z.string().optional().nullable(),
  powertrainClutchFunction: z.string().optional().nullable(),
  powertrainUniversalJoint: z.string().optional().nullable(),

  // Hydraulic System Fields
  hydraulicOilLevel: z.string().optional().nullable(),
  hydraulicSystemLeakage: z.string().optional().nullable(),
  hydraulicPumpLeakage: z.string().optional().nullable(),
  hydraulicControlValveLeakage: z.string().optional().nullable(),

  // Cabin Fields
  cabinCleaning: z.string().optional().nullable(),
  cabinLock: z.string().optional().nullable(),
  cabinSeatBelt: z.string().optional().nullable(),
  cabinControlLever: z.string().optional().nullable(),
  cabinAttachmentLever: z.string().optional().nullable(),
  acBlower: z.string().optional().nullable(),
  cabinMirror: z.string().optional().nullable(),
  cabinSwitchFunction: z.string().optional().nullable(),
  cabinWiper: z.string().optional().nullable(),
  cabinHorn: z.string().optional().nullable(),
  cabinLamps: z.string().optional().nullable(),
  cabinBatteryConnection: z.string().optional().nullable(),
  cabinRadioComm: z.string().optional().nullable(),
  cabinBrakeFunction: z.string().optional().nullable(),
  cabinEmergencyStop: z.string().optional().nullable(),
  reverseCamera: z.string().optional().nullable(),
  checkMDVR: z.string().optional().nullable(),
  apar: z.string().optional().nullable(),

  // Structure & Electrical Fields
  structureDriveAxleOilLevel: z.string().optional().nullable(),
  structurePinSpringSteeringTrunion: z.string().optional().nullable(),
  structureMountingRubberTorqueRod: z.string().optional().nullable(),
  structureSpringUBolt: z.string().optional().nullable(),
  structureVStayFrontRear: z.string().optional().nullable(),
  structureBallJointTieRod: z.string().optional().nullable(),
  structureBallJointDragLink: z.string().optional().nullable(),
  structureShockAbsorber: z.string().optional().nullable(),
  structureTyreBoltPressure: z.string().optional().nullable(),
  structureRubberHollowspring: z.string().optional().nullable(),
  electricalBackupAlarm: z.string().optional().nullable(),

  // Attachment & Grease Fields
  attachmentDumpBodyVessel: z.string().optional().nullable(),
  attachmentSafetyDumpFunction: z.string().optional().nullable(),
  greaseCentralGrease: z.string().optional().nullable(),
  greaseAllPointsArea: z.string().optional().nullable(),

  // Top-Up Lubricant & Coolant Fields
  coolant: z.number().default(0),
  topUpEngine: z.number().default(0),
  topUpHydraulic: z.number().default(0),
  topUpTransmission: z.number().default(0),
  topUpDifferential: z.number().default(0),
  topUpFinalDrive: z.number().default(0),
  topUpCoolant: z.number().default(0),

  // HeavyDumpTruck

  // Engine System
  engineVisualCheck: z.string().optional().nullable(),
  engineUpperLeaks: z.string().optional().nullable(),
  engineFuelLine: z.string().optional().nullable(),
  engineUnusualSound: z.string().optional().nullable(),
  alternatorCondition: z.string().optional().nullable(),
  starterMotorCondition: z.string().optional().nullable(),
  acCompressorCondition: z.string().optional().nullable(),
  turbochargerCondition: z.string().optional().nullable(),
  waterPumpCondition: z.string().optional().nullable(),

  // Cooling System
  radiatorConnection: z.string().optional().nullable(),
  fanGuardCondition: z.string().optional().nullable(),
  beltTension: z.string().optional().nullable(),

  // General Structure & Walkaround (Left Side)
  leftFrontWheel: z.string().optional().nullable(),
  ropsMounting: z.string().optional().nullable(),
  steeringLinkage: z.string().optional().nullable(),
  frontSuspension: z.string().optional().nullable(),
  rearSuspension: z.string().optional().nullable(),
  hydraulicTank: z.string().optional().nullable(),
  tankMounting: z.string().optional().nullable(),
  chassisMainFrame: z.string().optional().nullable(),
  hoistCylinder: z.string().optional().nullable(),
  leftRearWheel: z.string().optional().nullable(),
  leftRearFinalDrive: z.string().optional().nullable(),
  dumpBody: z.string().optional().nullable(),
  greaseLine: z.string().optional().nullable(),
  hydraulicLine: z.string().optional().nullable(),
  airCleaner: z.string().optional().nullable(),
  steeringOilTank: z.string().optional().nullable(),
  greaseSystem: z.string().optional().nullable(),
  batteryElectrolyte: z.string().optional().nullable(),
  handRail: z.string().optional().nullable(),
  walkways: z.string().optional().nullable(),

  // Right Side Checks
  rightRearWheel: z.string().optional().nullable(),
  rhFinalDrive: z.string().optional().nullable(),
  rhRearSuspension: z.string().optional().nullable(),
  fuelTankMounting: z.string().optional().nullable(),
  fuelLineCondition: z.string().optional().nullable(),
  rhChassisMounting: z.string().optional().nullable(),
  rhFrontSuspension: z.string().optional().nullable(),
  rhSteeringLinkage: z.string().optional().nullable(),
  rhDumpBodyCondition: z.string().optional().nullable(),

  // Rear Axle Assembly
  rearAxleLooseBolts: z.string().optional().nullable(),
  rearAxleOilLeaks: z.string().optional().nullable(),

  // Power Train (lanjutan)
  differentialCondition: z.string().optional().nullable(),
  transmissionCondition: z.string().optional().nullable(),
  powerTrainLine: z.string().optional().nullable(),
  torqueConverter: z.string().optional().nullable(),
  driveShaftJoint: z.string().optional().nullable(),

  // Cabin & Safety Devices
  cabinGlass: z.string().optional().nullable(),
  cabinRops: z.string().optional().nullable(),
  seatSafetyBelt: z.string().optional().nullable(),
  wiperFunction: z.string().optional().nullable(),
  hornFunction: z.string().optional().nullable(),
  radioCommunication: z.string().optional().nullable(),
  mdvr: z.string().optional().nullable(),
  mirrorCondition: z.string().optional().nullable(),
  doorLock: z.string().optional().nullable(),
  monitoringSystem: z.string().optional().nullable(),
  secondarySteering: z.string().optional().nullable(),
  allBrakeFunction: z.string().optional().nullable(),
  parkingBrakeControl: z.string().optional().nullable(),
  emergencyStop: z.string().optional().nullable(),
  fireExtinguisher: z.string().optional().nullable(),

  // Lubricant & Coolant Conditions
  conditionCoolant: z.number().optional().nullable(),
  conditionEngineOil: z.number().optional().nullable(),
  conditionTransmission: z.number().optional().nullable(),
  conditionDifferential: z.number().optional().nullable(),
  conditionFinalDrive: z.number().optional().nullable(),
  conditionBrakeFluid: z.number().optional().nullable(),
  conditionSuspension: z.number().optional().nullable(),
  conditionHydraulic: z.number().optional().nullable(),

  engineExhaustLeakage: z.string().optional().nullable(),
  engineOperationalSound: z.string().optional().nullable(),
  engineAlternator: z.string().optional().nullable(),
  engineStarterMotor: z.string().optional().nullable(),
  engineAcCompressor: z.string().optional().nullable(),
  engineWaterPump: z.string().optional().nullable(),
  engineTurbocharger: z.string().optional().nullable(),

  // ==========================================================
  // B. POWER TRAIN
  // ==========================================================
  powertrainDifferentialOil: z.string().optional().nullable(),
  powertrainFinalDriveOil: z.string().optional().nullable(),
  powertrainBrakeOperation: z.string().optional().nullable(),
  powertrainPropellerShaft: z.string().optional().nullable(),

  // ==========================================================
  // C. HYDRAULIC SYSTEM
  // ==========================================================
  hydraulicWheelLeanCylinder: z.string().optional().nullable(),
  hydraulicSteeringCylinder: z.string().optional().nullable(),
  hydraulicBladeLiftCylinder: z.string().optional().nullable(),
  hydraulicSideShiftCylinder: z.string().optional().nullable(),
  hydraulicCenterShiftCylinder: z.string().optional().nullable(),
  hydraulicArticulationCylinder: z.string().optional().nullable(),
  hydraulicHoseCondition: z.string().optional().nullable(),

  // ==========================================================
  // D. WHEEL / AXLE / STRUCTURE
  // ==========================================================
  structureFrontAxleOilLevel: z.string().optional().nullable(),
  structureWheelHubLevel: z.string().optional().nullable(),
  structureReducingGearLevel: z.string().optional().nullable(),
  structureNutWheelTirePressure: z.string().optional().nullable(),
  structureTireCondition: z.string().optional().nullable(),
  structureDumpBodyPin: z.string().optional().nullable(),
  structureFrameCracks: z.string().optional().nullable(),
  structureRipperAssembly: z.string().optional().nullable(),
  structureTandemHousing: z.string().optional().nullable(),
  structureWheelSpindle: z.string().optional().nullable(),
  structureCircleDrive: z.string().optional().nullable(),
  structureOscillationArea: z.string().optional().nullable(),
  structureDrumReduction: z.string().optional().nullable(),
  structureVibrationBearing: z.string().optional().nullable(),
  cabinAcBlower: z.string().optional().nullable(),
  cabinApar: z.string().optional().nullable(),
  cabinReverseCamera: z.string().optional().nullable(),
  cabinMdvr: z.string().optional().nullable(),
  cabinMonitoringSystem: z.string().optional().nullable(),
  topUpWheelMotor: z.number().nullable().optional(),
  topUpVibrator: z.number().nullable().optional(),
  topUpGrease: z.number().nullable().optional(),
  topUpSteering: z.number().nullable().optional(),
  unusualSound: z.string().optional().nullable(),
  conditionFrontSuspension: z.string().optional().nullable(),
  conditionRearSuspension: z.string().optional().nullable(),
  conditionSteering: z.string().optional().nullable(),
  conditionGrease: z.string().optional().nullable(),

  // GRADER
  // ==========================================================
  // A. ENGINE SYSTEM
  // ==========================================================
  engineHydraulicPump: z.string().optional().nullable(),
  engineElectricalHarness: z.string().optional().nullable(),
  engineBatteryElectrolyte: z.string().optional().nullable(),
  engineBelts: z.string().optional().nullable(),
  engineCoverHandRail: z.string().optional().nullable(),
  engineTransmissionLeaks: z.string().optional().nullable(),

  // ==========================================================
  // B. COOLING SYSTEM
  // ==========================================================
  coolingRadiator: z.string().optional().nullable(),
  coolingFanGuard: z.string().optional().nullable(),
  coolingBeltTension: z.string().optional().nullable(),

  // ==========================================================
  // C. HYDRAULIC SYSTEM
  // ==========================================================
  hydraulicRipperCylinder: z.string().optional().nullable(),

  // ==========================================================
  // D. MACHINE SIDE CHECK (SIDE)
  // ==========================================================
  sideMachineFrame: z.string().optional().nullable(),
  sideBladeGet: z.string().optional().nullable(),
  sideStapeLadder: z.string().optional().nullable(),
  sideTandemHousing: z.string().optional().nullable(),
  sideCoverGuards: z.string().optional().nullable(),
  sideWheelSpindle: z.string().optional().nullable(),
  sideFuelTank: z.string().optional().nullable(),
  sideCircleDrive: z.string().optional().nullable(),
  sideArticulationArea: z.string().optional().nullable(),
  sideHydraulicTank: z.string().optional().nullable(),

  // ==========================================================
  // E. CABIN & SAFETY DEVICE
  // ==========================================================
  cabinDoorLock: z.string().optional().nullable(),
  cabinTransmissionSteeringLever: z.string().optional().nullable(),
  cabinSwitch: z.string().optional().nullable(),
  cabinBattery: z.string().optional().nullable(),
  cabinRadio: z.string().optional().nullable(),
  cabinBrake: z.string().optional().nullable(),
  cabinParkingBrake: z.string().optional().nullable(),
  cabinFireExtinguisher: z.string().optional().nullable(),

  // ==========================================================
  // F. TOP-UP (Result Status, bukan Quantity)
  // ==========================================================
  topUpEngineOil: z.number().optional().nullable(),
  topUpCircle: z.number().optional().nullable(),
  topUpTandem: z.number().optional().nullable(),
  topUpFrontWheelHub: z.number().optional().nullable(),
  topUpBreak: z.number().optional().nullable(),
  // ==========================================================
  // G. GENERAL STRUCTURE (Tambahan yang Anda sediakan)
  // ==========================================================
  structureBladeGETCondition: z.string().optional().nullable(),
  structureStepLadderCondition: z.string().optional().nullable(),
  structureTandemHousingLeaks: z.string().optional().nullable(),
  structureCoverGuards: z.string().optional().nullable(),
  structureWheelSpindleLeaks: z.string().optional().nullable(),
  fuelTankDamageLeaks: z.string().optional().nullable(),
  structureCircleDriveLeaks: z.string().optional().nullable(),
  structureArticulationCleanliness: z.string().optional().nullable(),
  hydraulicTankDamageLeaks: z.string().optional().nullable(),

  // Compactor

  // ==========================================================
  // ENGINE & TRANSMISSION
  // ==========================================================
  engineFuelSystem: z.string().optional().nullable(),
  transmissionOilLevel: z.string().optional().nullable(),
  transmissionClutch: z.string().optional().nullable(),
  transmissionUniversalJoint: z.string().optional().nullable(),

  // ==========================================================
  // HYDRAULIC SYSTEM
  // ==========================================================
  hydraulicCylinder: z.string().optional().nullable(),
  hydraulicHoseLeakage: z.string().optional().nullable(),
  hydraulicValveLeakage: z.string().optional().nullable(),

  // ==========================================================
  // CABIN CONTROLS
  // ==========================================================
  cabinSteeringLever: z.string().optional().nullable(),
  cabinTravelControl: z.string().optional().nullable(),

  // ==========================================================
  // AXLE & WHEEL HUB (Menggabungkan semua variasi axle)
  // ==========================================================
  axleDriveOilLevel: z.string().optional().nullable(), // Dari axleDriveOilLevel dan axleDriveAxleOilLevel
  axleWheelHubLevel: z.string().optional().nullable(),
  axleReducingGear: z.string().optional().nullable(), // Dari axleReducingGear
  axleNutWheel: z.string().optional().nullable(), // Dari axleNutWheel

  // Catatan: Jika ada dua field yang secara fungsional berbeda (misalnya level oli vs. seal)
  // tetapi namanya mirip, Anda harus memastikan nama uniknya digunakan di sini.

  // Kami hanya mengambil satu nama untuk setiap fungsi:
  axleReducingGearLevel: z.string().optional().nullable(), // Dari axleReducingGearLevel
  axleNutWheelTyrePressure: z.string().optional().nullable(), // Dari axleNutWheelTyrePressure
});

// --- SKEMA UTAMA UNTUK CREATION (BODY API) ---
export const WheelInspectionSchema = z
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
    // mechanicId: z.string().min(1, "ID Mekanik wajib disertakan."), // Relasi Wajib

    // TYPE DISCRIMINATOR
    equipmentType: z.literal("wheel"),
    wheelGeneralType: WheelGeneralTypeEnum,

    // OPTIONAL HEADER FIELDS
    notes: z.string().optional(),
    groupLeaderName: z.string().optional().nullable(),
  })
  .merge(wheelDetailsSchema.partial()); // Gabungkan dengan semua field detail

export type WheelInspection = z.infer<typeof WheelInspectionSchema>;
