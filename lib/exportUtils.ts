// Utility functions for data export functionality
export interface ExportInspection {
  id: string;
  equipmentId: string;
  equipmentType: string;
  mechanicName: string;
  status: string;
  createdAt: string;
  location: string;
  operatorName: string;
  workingHours: number;
  verifiedBy?: string;
  verifiedAt?: string;
  notes?: string;
  // Track specific fields
  trackCondition?: string;
  trackTension?: string;
  sprocketWear?: string;
  trackPadWear?: number;
  hydraulicLeaks?: boolean;
  greaseLevels?: string;
  // Wheel specific fields
  tireCondition?: string;
  tirePressure?: number;
  treadDepth?: number;
  wheelAlignment?: string;
  brakeCondition?: string;
  oilLevels?: string;
  // Support specific fields
  structuralIntegrity?: string;
  weldingCondition?: string;
  boltTightness?: string;
  loadCapacity?: number;
  stabilityCheck?: string;
  hydraulicSystems?: boolean;
}

export interface ExportFilters {
  dateFrom?: string;
  dateTo?: string;
  equipmentType?: string;
  status?: string;
  mechanic?: string;
  location?: string;
}

export function generateCSVContent(inspections: ExportInspection[]): string {
  if (inspections.length === 0) return "";

  const headers = [
    "ID",
    "Equipment ID",
    "Type", // was "Equipment Type"
    "Mechanic",
    "Status",
    "Date", // was "Created Date"
    "Location",
    "Operator Name",
    "HM", // was "Working Hours"
    "Verified By",
    "Verified Date",
    "Notes",
    // Track specific
    "Track Condition",
    "Track Tension",
    "Sprocket Wear",
    "Track Pad Wear (%)",
    "Hydraulic Leaks",
    "Grease Levels",
    // Wheel specific
    "Tire Condition",
    "Tire Pressure (PSI)",
    "Tread Depth (mm)",
    "Wheel Alignment",
    "Brake Condition",
    "Oil Levels",
    // Support specific
    "Structural Integrity",
    "Welding Condition",
    "Bolt Tightness",
    "Load Capacity (tons)",
    "Stability Check",
    "Hydraulic Systems Present",
  ];

  const csvRows = [headers.join(",")];

  inspections.forEach((inspection) => {
    const row = [
      inspection.id,
      inspection.equipmentId,
      inspection.equipmentType,
      inspection.mechanicName,
      inspection.status,
      new Date(inspection.createdAt).toLocaleDateString("en-GB"), // dd/mm/yyyy
      inspection.location,
      inspection.operatorName,
      inspection.workingHours ?? "",
      inspection.verifiedBy || "",
      inspection.verifiedAt
        ? new Date(inspection.verifiedAt).toLocaleDateString("en-GB")
        : "",
      inspection.notes || "",
      // Track specific
      inspection.trackCondition || "",
      inspection.trackTension || "",
      inspection.sprocketWear || "",
      inspection.trackPadWear ?? "",
      inspection.hydraulicLeaks ? "Yes" : "No",
      inspection.greaseLevels || "",
      // Wheel specific
      inspection.tireCondition || "",
      inspection.tirePressure ?? "",
      inspection.treadDepth ?? "",
      inspection.wheelAlignment || "",
      inspection.brakeCondition || "",
      inspection.oilLevels || "",
      // Support specific
      inspection.structuralIntegrity || "",
      inspection.weldingCondition || "",
      inspection.boltTightness || "",
      inspection.loadCapacity ?? "",
      inspection.stabilityCheck || "",
      inspection.hydraulicSystems ? "Yes" : "No",
    ];

    const escapedRow = row.map((field) => {
      const stringField = String(field);
      if (
        stringField.includes(",") ||
        stringField.includes('"') ||
        stringField.includes("\n")
      ) {
        return `"${stringField.replace(/"/g, '""')}"`;
      }
      return stringField;
    });

    csvRows.push(escapedRow.join(","));
  });

  return csvRows.join("\n");
}

export function downloadCSV(content: string, filename: string): void {
  const BOM = "\uFEFF";
  const blob = new Blob([BOM + content], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

export function generateReportSummary(inspections: ExportInspection[]) {
  const total = inspections.length;
  const approved = inspections.filter((i) => i.status === "approved").length;
  const rejected = inspections.filter((i) => i.status === "rejected").length;
  const pending = inspections.filter((i) => i.status === "pending").length;

  const byEquipmentType = inspections.reduce((acc, inspection) => {
    acc[inspection.equipmentType] = (acc[inspection.equipmentType] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const byMechanic = inspections.reduce((acc, inspection) => {
    acc[inspection.mechanicName] = (acc[inspection.mechanicName] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return {
    total,
    approved,
    rejected,
    pending,
    approvalRate: total > 0 ? Math.round((approved / total) * 100) : 0,
    byEquipmentType,
    byMechanic,
  };
}
