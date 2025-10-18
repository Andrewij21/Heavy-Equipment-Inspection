"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  XCircle,
  Clock,
  User,
  MapPin,
  Calendar,
  ArrowLeft,
  FileText,
  AlertCircle,
  GaugeCircle,
  Tag,
  Truck,
  SunMoon,
  MessageSquare,
} from "lucide-react";
import { Textarea } from "@/components/ui/textarea"; // 1. Import Textarea
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useGetInspection } from "@/queries/inspection";
import { trackFormSections as BigDiggerForm } from "@/components/inspections/track/BigDigger";
import { trackFormSections as SmallPCForm } from "@/components/inspections/track/SmallPC";
import { trackFormSections as BulldozerForm } from "@/components/inspections/track/Bulldozer";
import { formSections as DumpTruckForm } from "@/components/inspections/wheel/DumpTruck";
import { formSections as HeavyDumpTruckForm } from "@/components/inspections/wheel/HeavyDumpTruck";
import { formSections as GraderForm } from "@/components/inspections/wheel/Grader";
import { formSections as CompactorForm } from "@/components/inspections/wheel/Compactor";
import { formSections as MobileForm } from "@/components/inspections/support/MobileTruck";
import { formSections as CraneForm } from "@/components/inspections/support/CraneTruck";
import { formSections as TowerLampForm } from "@/components/inspections/support/TowerLamp";
import { formSections as GensetForm } from "@/components/inspections/support/Genset";
import { formSections as WeldingMachineForm } from "@/components/inspections/support/WeldingMechine";
import { formSections as CompressorForm } from "@/components/inspections/support/Compressor";
import { formSections as MultiFlowForm } from "@/components/inspections/support/MultiFlow";
import { formSections as TyreHandlerForm } from "@/components/inspections/support/TyreHandler";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

// Interface dan helper tetap sama
export interface FormField {
  name: string;
  label: string;
  type: "select" | "qty" | "temp";
}
export interface FormSection {
  title: string;
  fields: FormField[];
}
const inspectionFormMap: Record<string, any[]> = {
  BigDigger: BigDiggerForm,
  SmallPC: SmallPCForm,
  Bulldozer: BulldozerForm,
  DumpTruck: DumpTruckForm,
  HeavyDumpTruck: HeavyDumpTruckForm,
  Grader: GraderForm,
  Compactor: CompactorForm,
  Mobile: MobileForm,
  Crane: CraneForm,
  Towerlamp: TowerLampForm,
  Genset: GensetForm,
  WeldingMachine: WeldingMachineForm,
  Compressor: CompressorForm,
  MultiFlow: MultiFlowForm,
  TyreHandler: TyreHandlerForm,
};
interface Inspection {
  equipmentType: "track" | "wheel" | "support";
  equipmentGeneralType?: string | null;
  wheelGeneralType?: string | null;
  supportGeneralType?: string | null;
}
export const getInspectionFormStructure = (
  inspection: Inspection
): FormSection[] => {
  let generalTypeKey: string | null | undefined = null;
  switch (inspection.equipmentType) {
    case "track":
      generalTypeKey = inspection.equipmentGeneralType;
      break;
    case "wheel":
      generalTypeKey = inspection.wheelGeneralType;
      break;
    case "support":
      generalTypeKey = inspection.supportGeneralType;
      break;
    default:
      return [];
  }
  if (generalTypeKey && inspectionFormMap[generalTypeKey]) {
    return inspectionFormMap[generalTypeKey];
  }
  return [];
};
const InfoItem = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number | undefined;
}) => (
  <div className="flex items-start space-x-3">
    <div className="mt-1 h-4 w-4 text-gray-500 flex-shrink-0">{icon}</div>
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-medium break-words">{value || "N/A"}</p>
    </div>
  </div>
);
interface InspectionDetailViewProps {
  id: string;
  handleStatusHandler?: (
    id: string,
    status: "APPROVED" | "REJECTED",
    comments: string
  ) => void;
  onReject?: (id: string, comments: string) => void;
  showActions?: boolean;
}

export function VerificationDetailView({
  id,
  handleStatusHandler,
  showActions = false,
}: InspectionDetailViewProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [comments, setComments] = useState("");
  const { data, isLoading, isError, error } = useGetInspection(id);

  if (isLoading) {
    return (
      <div className="container mx-auto p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto p-6">
        <Card>
          <CardContent className="p-6 text-center flex flex-col items-center space-y-2">
            <AlertCircle className="h-8 w-8 text-red-500" />
            <p className="text-red-600 font-semibold">
              Failed to load inspection details
            </p>
            <p className="text-sm text-gray-500">
              {error instanceof Error
                ? error.message
                : "An unknown error occurred."}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const inspection = data?.data;
  if (!inspection) {
    return (
      <div className="container mx-auto p-6">
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-gray-500">Inspection not found</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "APPROVED":
        return "bg-green-100 text-green-800";
      case "REJECTED":
        return "bg-red-100 text-red-800";
      case "PENDING":
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  const handleApprove = async (status: "APPROVED" | "REJECTED") => {
    if (!handleStatusHandler) return;
    if (comments.trim() === "") {
      toast.error("Note is required", {
        description: "Please provide a note before approving or rejecting.",
      });
      return;
    }
    setIsSubmitting(true);
    try {
      await handleStatusHandler(inspection.id, status, comments);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Logika untuk mendapatkan detail inspeksi yang benar
  const inspectionDetails =
    inspection.equipmentType === "track"
      ? inspection.trackDetails
      : inspection.equipmentType === "wheel"
      ? inspection.wheelDetails
      : inspection.supportDetails;

  const formStructure = getInspectionFormStructure(inspection);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div>
            <h1 className="text-2xl font-bold">Inspection Details</h1>
            <p className="text-gray-600">ID: {inspection.id}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Badge className={getStatusColor(inspection.status)}>
            {inspection.status}
          </Badge>
        </div>
      </div>

      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5" />
            <span>Inspection Overview</span>
          </CardTitle>
          <CardDescription>
            General equipment and inspection details.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-6">
            <InfoItem
              icon={<Calendar />}
              label="Inspection Date"
              value={
                inspection.inspectionDate
                  ? new Date(inspection.inspectionDate).toLocaleDateString(
                      "id-ID",
                      {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      }
                    )
                  : "N/A"
              }
            />
            <InfoItem
              icon={<User />}
              label="Mechanic"
              value={inspection.mechanicName}
            />
            <InfoItem
              icon={<MapPin />}
              label="Location"
              value={inspection.location}
            />
            <InfoItem
              icon={<SunMoon />}
              label="Shift"
              value={
                inspection.shift
                  ? inspection.shift.charAt(0).toUpperCase() +
                    inspection.shift.slice(1)
                  : "N/A"
              }
            />
            <InfoItem
              icon={<GaugeCircle />}
              label="HM DOWN"
              value={inspection.timeDown}
            />
            <InfoItem
              icon={<GaugeCircle />}
              label="HM RFU"
              value={inspection.timeOut}
            />
            <InfoItem
              icon={<Truck />}
              label="Unit Number"
              value={inspection.equipmentId}
            />
            <InfoItem
              icon={<Tag />}
              label="Unit Model"
              value={inspection.modelUnit}
            />
            <InfoItem icon={<Clock />} label="TIME" value={inspection.smr} />
          </div>
        </CardContent>
      </Card>

      {/* Inspection Results */}
      <Card>
        <CardHeader>
          <CardTitle>Inspection Checklist Results</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {formStructure.length > 0 ? (
            formStructure.map((section, sectionIndex) => (
              <div
                key={sectionIndex}
                className="border-b pb-4 last:border-b-0 last:pb-0"
              >
                <h3 className="text-lg font-semibold mb-3 text-gray-800">
                  {section.title}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
                  {section.fields.map((field) => (
                    <div key={field.name}>
                      <p className="text-sm text-gray-500">{field.label}</p>
                      <p className="font-medium capitalize">
                        {inspectionDetails?.[field.name] || (
                          <span className="text-gray-400">N/A</span>
                        )}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">
              No inspection form structure found for this equipment type.
            </p>
          )}
        </CardContent>
      </Card>

      {/* ========================================================== */}
      {/* BAGIAN BARU UNTUK FINDINGS                  */}
      {/* ========================================================== */}
      {inspectionDetails?.findings && inspectionDetails.findings.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Findings</CardTitle>
            <CardDescription>
              Items that need attention identified during the inspection.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {inspectionDetails.findings.map((finding: any, index: number) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-md border p-3"
                >
                  <p className="text-sm text-foreground">
                    {finding.description}
                  </p>
                  <Badge
                    variant={
                      finding.status === "open" ? "destructive" : "secondary"
                    }
                  >
                    {finding.status.charAt(0).toUpperCase() +
                      finding.status.slice(1)}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {inspection.comments && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              <span>Additional Notes</span>
            </CardTitle>
            <CardDescription>
              Catatan tambahan dari mekanik selama inspeksi.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border bg-slate-50 p-4">
              <p className="text-sm text-slate-700 whitespace-pre-wrap">
                {inspection.comments}
              </p>
            </div>
          </CardContent>
        </Card>
      )}
      {inspection.approver && (
        <Card>
          <CardHeader>
            <CardTitle>Verification Details</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Verified By</p>
              <p className="font-medium">{inspection.approver.username}</p>
            </div>
          </CardContent>
        </Card>
      )}
      {/* Verification Actions */}
      {showActions && inspection.status === "PENDING" && (
        <Card>
          <CardHeader>
            <CardTitle>Verification</CardTitle>
            <CardDescription>
              Review and approve or reject this inspection. A note is required.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* 6. Add the Textarea for notes */}
            <div className="space-y-2">
              <Label htmlFor="comments">Verification Note *</Label>
              <Textarea
                id="comments"
                placeholder="Add your review comments here..."
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                className="min-h-[100px]"
                disabled={isSubmitting}
              />
            </div>
            <div className="flex space-x-4">
              <Button
                onClick={() => handleApprove("APPROVED")}
                disabled={isSubmitting || !comments.trim()}
                className="bg-green-600 hover:bg-green-700"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                {isSubmitting ? "Approving..." : "Approve"}
              </Button>
              <Button
                onClick={() => handleApprove("REJECTED")}
                disabled={isSubmitting || !comments.trim()}
                variant="destructive"
              >
                <XCircle className="w-4 h-4 mr-2" />
                {isSubmitting ? "Rejecting..." : "Reject"}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
