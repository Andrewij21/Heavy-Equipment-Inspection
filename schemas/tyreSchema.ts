import { z } from "zod";

const ShiftEnum = z.enum(["day", "night"]);

const TyreDetailsSchema = z.object({
  position: z.string().optional().nullable(),
  serialNumber: z.string().optional().nullable(),
  brand: z.string().optional().nullable(),
  pattern: z.string().optional().nullable(),
  rtd: z.string().optional().nullable(),
  pressure: z.string().optional().nullable(),
  problem: z.string().optional().nullable(),
  action: z.string().optional().nullable(),
  manpower: z.string().optional().nullable(),
});
// --- SKEMA UTAMA UNTUK CREATION (BODY API) ---
export const TyreInspectionSchema = z.object({
  // REQUIRED HEADER FIELDS
  equipmentId: z.string().min(1, "Nomor unit wajib diisi."),
  modelUnit: z.string().min(1, "Model unit wajib diisi."),
  location: z.string().min(1, "Lokasi wajib diisi."),
  operatorName: z.string().min(1, "Nama operator wajib diisi."),
  mechanicName: z.string().min(1, "Nama mekanik wajib diisi."),
  inspectionDate: z.string().min(1, "Tanggal inspeksi wajib diisi."),
  inspectionTime: z.string().min(1, "Waktu inspeksi wajib diisi."),
  workingHours: z.number().nonnegative("Jam kerja tidak valid."),
  smr: z.string().min(1, "SMR wajib diisi."),
  timeDown: z.string().min(1, "Waktu Down wajib diisi."),
  timeOut: z.string().min(1, "Waktu Out wajib diisi."),
  shift: ShiftEnum,
  timeStop: z.string().min(1, "Waktu berhenti wajib di isi"),

  // TYPE DISCRIMINATOR
  equipmentType: z.literal("tyre"),
  tyreDetails: z.array(TyreDetailsSchema).optional(),
  // OPTIONAL HEADER FIELDS
  notes: z.string().optional(),
  groupLeaderName: z.string().optional().nullable(),

  formNumber: z.string().min(1, "Nomor formulir wajib diisi."),
  revision: z.string().min(1, "Revisi wajib diisi."),
  hm: z.string().min(1, "HM wajib diisi."),
  size: z.string().min(1, "Ukuran wajib diisi."),
  dateOfIssue: z.string().min(1, "Tanggal terbit wajib diisi."),
});

export type TyreInspection = z.infer<typeof TyreInspectionSchema>;
