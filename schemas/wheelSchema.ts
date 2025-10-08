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
  engineFuelSystemLeakage: z.string().optional().nullable(),
  acBlower: z.string().optional().nullable(),
  reverseCamera: z.string().optional().nullable(),
  checkMDVR: z.string().optional().nullable(),
  apar: z.string().optional().nullable(),
  coolant: z.number().optional().nullable(),

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
  attachmentDumpBodyVessel: z.string().optional().nullable(),
  attachmentSafetyDumpFunction: z.string().optional().nullable(),
  greaseCentralGrease: z.string().optional().nullable(),
  greaseAllPointsArea: z.string().optional().nullable(),

  // ==========================================================
  // A. ENGINE SYSTEM
  // ==========================================================
  engineVisualCheck: z.string().optional().nullable(),
  engineUpperLeaks: z.string().optional().nullable(),
  engineFuelLine: z.string().optional().nullable(),
  engineOilLevel: z.string().optional().nullable(),
  engineMounting: z.string().optional().nullable(),
  engineCoolantLevel: z.string().optional().nullable(),
  engineBeltTension: z.string().optional().nullable(),
  engineAirIntake: z.string().optional().nullable(),
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
  powertrainTransmissionOilLevel: z.string().optional().nullable(),
  powertrainClutchFunction: z.string().optional().nullable(),
  powertrainUniversalJoint: z.string().optional().nullable(),
  powertrainDifferentialOil: z.string().optional().nullable(),
  powertrainFinalDriveOil: z.string().optional().nullable(),
  powertrainBrakeOperation: z.string().optional().nullable(),
  powertrainPropellerShaft: z.string().optional().nullable(),

  // ==========================================================
  // C. HYDRAULIC SYSTEM
  // ==========================================================
  hydraulicOilLevel: z.string().optional().nullable(),
  hydraulicSystemLeakage: z.string().optional().nullable(),
  hydraulicPumpLeakage: z.string().optional().nullable(),
  hydraulicControlValveLeakage: z.string().optional().nullable(),
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

  // ==========================================================
  // E. CABIN & SAFETY DEVICE
  // ==========================================================
  cabinCleaning: z.string().optional().nullable(),
  cabinLock: z.string().optional().nullable(),
  cabinSeatBelt: z.string().optional().nullable(),
  cabinControlLever: z.string().optional().nullable(),
  cabinAttachmentLever: z.string().optional().nullable(),
  cabinAcBlower: z.string().optional().nullable(),
  cabinMirror: z.string().optional().nullable(),
  cabinSwitchFunction: z.string().optional().nullable(),
  cabinWiper: z.string().optional().nullable(),
  cabinHorn: z.string().optional().nullable(),
  cabinLamps: z.string().optional().nullable(),
  cabinBatteryConnection: z.string().optional().nullable(),
  cabinRadioComm: z.string().optional().nullable(),
  cabinBrakeFunction: z.string().optional().nullable(),
  cabinEmergencyStop: z.string().optional().nullable(),
  cabinApar: z.string().optional().nullable(),
  cabinReverseCamera: z.string().optional().nullable(),
  cabinMdvr: z.string().optional().nullable(),
  cabinMonitoringSystem: z.string().optional().nullable(),

  // ==========================================================
  // F. TOP-UP QUANTITIES (Angka)
  // ==========================================================
  topUpEngine: z.number().nullable().optional(),
  topUpHydraulic: z.number().nullable().optional(),
  topUpTransmission: z.number().nullable().optional(),
  topUpDifferential: z.number().nullable().optional(),
  topUpFinalDrive: z.number().nullable().optional(),
  topUpWheelMotor: z.number().nullable().optional(),
  topUpVibrator: z.number().nullable().optional(),
  topUpCoolant: z.number().nullable().optional(),
  topUpGrease: z.number().nullable().optional(),
  topUpSteering: z.number().nullable().optional(),
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
