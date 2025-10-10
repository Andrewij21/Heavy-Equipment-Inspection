import { z } from "zod";
const TrackGeneralTypeEnum = z.enum(["BigDigger", "SmallPC", "Bulldozer"]);
const ShiftEnum = z.enum(["day", "night"]);

// --- ZOD SCHEMA UNTUK DETAIL PEMERIKSAAN (WHEEL INSPECTION DETAILS) ---
// Semua field detail dianggap opsional/nullable karena form tidak selalu mengisi semuanya
const trackDetailsSchema = z.object({
  // DYNAMIC/UNSTRUCTURED DATA
  findings: z
    .array(
      z.object({ description: z.string(), status: z.enum(["open", "close"]) })
    )
    .optional()
    .nullable(),

  // Big digger
  // Lower Structure Fields
  lowerLockOutSwitch: z.string().optional().nullable(),
  lowerTrackLinkTension: z.string().optional().nullable(),
  lowerTrackShoeBolt: z.string().optional().nullable(),
  lowerIdlerRollerGuard: z.string().optional().nullable(),
  lowerUnderGuard: z.string().optional().nullable(),
  lowerFinalDriveSprocket: z.string().optional().nullable(),
  lowerSwingCircle: z.string().optional().nullable(),
  lowerAttachmentCondition: z.string().optional().nullable(),
  lowerDrainWaterSediment: z.string().optional().nullable(),
  lowerHydraulicOilLevel: z.string().optional().nullable(),

  // Upper Structure Fields
  upperEngineOilLevel: z.string().optional().nullable(),
  upperEngineVisual: z.string().optional().nullable(),
  upperCoolantLevel: z.string().optional().nullable(),
  upperRadiatorEtc: z.string().optional().nullable(),
  upperTurboInlet: z.string().optional().nullable(),
  upperAirCleaner: z.string().optional().nullable(),
  upperCompartmentLeaks: z.string().optional().nullable(),
  upperHydraulicPump: z.string().optional().nullable(),
  upperControlValve: z.string().optional().nullable(),
  upperSwingMachineOil: z.string().optional().nullable(),
  upperElectricWiring: z.string().optional().nullable(),
  upperBatteryElectrolyte: z.string().optional().nullable(),
  upperFanBelts: z.string().optional().nullable(),
  upperCylinderLeaks: z.string().optional().nullable(),
  upperCoverHandRail: z.string().optional().nullable(),

  // Temperature - Cylinder Boom
  tempCylBoom: z.string().optional().nullable(),
  tempCylBoomRh: z.number().optional().nullable(),
  tempCylBoomLh: z.number().optional().nullable(),
  deltaTCylBoom: z.number().optional().nullable(),

  // Temperature - Cylinder Arm
  tempCylArm: z.string().optional().nullable(),
  tempCylArmRh: z.number().optional().nullable(),
  tempCylArmLh: z.number().optional().nullable(),
  deltaTCylArm: z.number().optional().nullable(),

  // Temperature - Cylinder Bucket
  tempCylBucket: z.string().optional().nullable(),
  tempCylBucketRh: z.number().optional().nullable(),
  tempCylBucketLh: z.number().optional().nullable(),
  deltaTCylBucket: z.number().optional().nullable(),

  // Grease Points
  greaseBoomCylFoot: z.string().optional().nullable(),
  greaseBoomFootPin: z.string().optional().nullable(),
  greaseBoomCylRod: z.string().optional().nullable(),
  greaseArmCylFoot: z.string().optional().nullable(),
  greaseBoomArmCoupling: z.string().optional().nullable(),
  greaseArmCylRod: z.string().optional().nullable(),
  greaseBucketCylFoot: z.string().optional().nullable(),
  greaseArmLinkCoupling: z.string().optional().nullable(),
  greaseArmBucketCoupling: z.string().optional().nullable(),
  greaseLinkCoupling: z.string().optional().nullable(),
  greaseBucketCylRod: z.string().optional().nullable(),
  greaseBucketLinkCoupling: z.string().optional().nullable(),

  // Cabin Inspection
  cabinMonitorPanel: z.string().optional().nullable(),
  cabinSwitches: z.string().optional().nullable(),
  cabinGauge: z.string().optional().nullable(),
  cabinControlLever: z.string().optional().nullable(),
  cabinRadioComm: z.string().optional().nullable(),
  cabinFmRadio: z.string().optional().nullable(),
  cabinWorkLamp: z.string().optional().nullable(),
  cabinTravelAlarm: z.string().optional().nullable(),
  cabinHorn: z.string().optional().nullable(),
  cabinMirror: z.string().optional().nullable(),
  cabinRotaryLamp: z.string().optional().nullable(),
  cabinWiper: z.string().optional().nullable(),
  cabinWindowWasher: z.string().optional().nullable(),
  cabinAcFunction: z.string().optional().nullable(),
  cabinFuseRelay: z.string().optional().nullable(),
  cabinOperatorSeat: z.string().optional().nullable(),

  // Safety Equipment Inspection
  safetyFireExtinguisher: z.string().optional().nullable(),
  safetyEmergencyStop: z.string().optional().nullable(),
  safetyCabinRops: z.string().optional().nullable(),
  safetyBelt: z.string().optional().nullable(),

  // Oil Top-Up
  topUpCoolant: z.number().default(0),
  topUpEngine: z.number().default(0),
  topUpHydraulic: z.number().default(0),
  topUpSwingMachinery: z.number().default(0),
  topUpFinalDrive: z.number().default(0),

  upperRadiator: z.string().optional().nullable(),

  // Bulldozer
  // Top-Up Quantities
  topUpCoolantQty: z.number().optional().nullable(),
  topUpEngineQty: z.number().optional().nullable(),
  topUpHydraulicQty: z.number().optional().nullable(),
  topUpSwingMachineryQty: z.number().optional().nullable(),
  topUpFinalDriveQty: z.number().optional().nullable(),
  topUpTransmission: z.number().optional().nullable(),

  // Hydraulic System
  hydraulicOilLevel: z.string().optional().nullable(),
  hydraulicSystemLeakage: z.string().optional().nullable(),
  hydraulicPumpLineLeakage: z.string().optional().nullable(),
  hydraulicHoseCondition: z.string().optional().nullable(),
  hydraulicCylinderLiftBlade: z.string().optional().nullable(),
  hydraulicCylinderTiltBlade: z.string().optional().nullable(),
  hydraulicCylinderLiftRipper: z.string().optional().nullable(),
  hydraulicCylinderTiltRipper: z.string().optional().nullable(),

  // Structure/Frame/Autolube
  structureAutolube: z.string().optional().nullable(),
  structureEqualizerBarSeal: z.string().optional().nullable(),
  structurePivotShaftLeakage: z.string().optional().nullable(),
  structureFrameCracks: z.string().optional().nullable(),
  structureTrackLinkBushing: z.string().optional().nullable(),
  structureUndercarriageBolt: z.string().optional().nullable(),
  structureTrackTension: z.string().optional().nullable(),
  structureRipperFrame: z.string().optional().nullable(),
  structureBogglePivot: z.string().optional().nullable(),
  structureMasterLinkBolt: z.string().optional().nullable(),
  structureIdlerMountingBolt: z.string().optional().nullable(),
  structureEqualizerBarBearing: z.string().optional().nullable(),
  structureBladeMountingPin: z.string().optional().nullable(),
  structureCuttingEdge: z.string().optional().nullable(),
  structureEndBit: z.string().optional().nullable(),
  structureCarrieRoller: z.string().optional().nullable(),
  structureRipperPoint: z.string().optional().nullable(),

  // Electrical System
  electricalBatteryMounting: z.string().optional().nullable(),
  electricalBatteryElectrolyte: z.string().optional().nullable(),
  electricalTerminalCleaning: z.string().optional().nullable(),
  electricalConnectorCleaning: z.string().optional().nullable(),
  electricalLamps: z.string().optional().nullable(),
  electricalIsolationSwitch: z.string().optional().nullable(),
  electricalGaugePanel: z.string().optional().nullable(),
  electricalBackupAlarm: z.string().optional().nullable(),

  // Engine
  engineOilLevelLeakage: z.string().optional().nullable(),
  engineCoolantLevelLeakage: z.string().optional().nullable(),
  engineFuelSystemLeakage: z.string().optional().nullable(),
  engineBelts: z.string().optional().nullable(),
  engineIntakeClamps: z.string().optional().nullable(),
  engineExhaustLeakage: z.string().optional().nullable(),
  engineOperationalSound: z.string().optional().nullable(),

  // Power Train
  powertrainTransmissionOil: z.string().optional().nullable(),
  powertrainTorqueConverterOil: z.string().optional().nullable(),
  powertrainDifferentialOil: z.string().optional().nullable(),
  powertrainFinalDriveOil: z.string().optional().nullable(),
  powertrainBrakeOperation: z.string().optional().nullable(),
  powertrainPropellerShaft: z.string().optional().nullable(),
});

// --- SKEMA UTAMA UNTUK CREATION (BODY API) ---
export const TrackInspectionSchema = z
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
    equipmentType: z.literal("track"),
    equipmentGeneralType: TrackGeneralTypeEnum,

    // OPTIONAL HEADER FIELDS
    notes: z.string().optional(),
    groupLeaderName: z.string().optional().nullable(),
  })
  .merge(trackDetailsSchema.partial()); // Gabungkan dengan semua field detail

export type TrackInspection = z.infer<typeof TrackInspectionSchema>;
