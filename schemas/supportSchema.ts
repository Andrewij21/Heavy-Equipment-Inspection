import { z } from "zod";
const SupportGeneralTypeEnum = z.enum(["Mobile"]);
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
