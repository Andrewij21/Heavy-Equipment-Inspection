"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Edit,
  FileText,
  Calendar,
  User,
  MapPin,
  Clock,
  AlertCircle,
  GaugeCircle,
  Tag,
  Truck,
  SunMoon,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
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

export interface FormField {
  name: string;
  label: string;
  type: "select" | "qty" | "temp"; // Tambahkan tipe lain jika ada
}

export interface FormSection {
  title: string;
  fields: FormField[];
}
const inspectionFormMap: Record<string, any[]> = {
  // Track Types
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
  // ... properti lainnya
}
const getInspectionFormStructure = (inspection: Inspection): FormSection[] => {
  let generalTypeKey: string | null | undefined = null;

  // 1. Tentukan *GeneralType mana yang akan digunakan berdasarkan equipmentType
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
      return []; // Kembalikan array kosong jika tipe tidak dikenali
  }

  // 2. Jika key valid, cari di map. Jika tidak, kembalikan array kosong.
  if (generalTypeKey && inspectionFormMap[generalTypeKey]) {
    return inspectionFormMap[generalTypeKey];
  }

  // Fallback jika general type tidak ada di map
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

export default function InspectionDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();

  // Pastikan ID adalah string, jika tidak, jangan jalankan query
  const id = typeof params.id === "string" ? params.id : "";
  console.log({ id });
  // 2. Gunakan hook untuk fetch data, gantikan useState dan useEffect
  const { data, isLoading, isError, error } = useGetInspection(id);

  // 3. Handle loading state dari React Query
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

  // 4. Handle error state dari React Query (termasuk jika data tidak ditemukan)
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
  let inspectionDetails = [];
  if (inspection.equipmentType === "track") {
    inspectionDetails = inspection.trackDetails;
  } else if (inspection.equipmentType === "wheel") {
    inspectionDetails = inspection.wheelDetails;
  } else if (inspection.equipmentType === "support") {
    inspectionDetails = inspection.supportDetails;
  }
  // console.log({ data, inspection });
  const formStructure = getInspectionFormStructure(inspection);
  // Jika loading selesai dan tidak error, tapi data tidak ada (kasus jarang terjadi jika API konsisten)
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
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.back()}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back</span>
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Inspection Details</h1>
            <p className="text-gray-600">ID: {inspection.id}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Badge className={getStatusColor(inspection.status)}>
            {inspection.status.charAt(0).toUpperCase() +
              inspection.status.slice(1)}
          </Badge>
          {user?.role === "mechanic" && inspection.status === "pending" && (
            <Button
              onClick={() => router.push(`/inspections/${inspection.id}/edit`)}
              className="flex items-center space-x-2"
            >
              <Edit className="h-4 w-4" />
              <span>Edit</span>
            </Button>
          )}
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
            {/* --- Data dari Inspection --- */}
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

            {/* --- Data Waktu --- */}
            <InfoItem
              icon={<Clock />}
              label="Time Down"
              value={inspection.timeDown}
            />
            <InfoItem
              icon={<Clock />}
              label="Time Out"
              value={inspection.timeOut}
            />

            {/* --- Data Peralatan --- */}
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
            <InfoItem
              icon={<GaugeCircle />}
              label="SMR (Service Meter Reading)"
              value={inspection.smr}
            />
          </div>
        </CardContent>
      </Card>
      {/* Equipment Information */}
      <Card>
        <CardHeader>
          <CardTitle>Equipment Information</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Equipment Type</p>
            <p className="font-medium">{inspection.equipmentType}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Equipment ID</p>
            <p className="font-medium">{inspection.equipmentId}</p>
          </div>
        </CardContent>
      </Card>

      {/* Inspection Data - INI BAGIAN YANG DIUBAH */}
      <Card>
        <CardHeader>
          <CardTitle>Inspection Results</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Cek jika struktur ditemukan */}
          {formStructure.length > 0 ? (
            // 1. Loop pertama untuk setiap SEKSI (e.g., "Lower Frame Area Inspection")
            formStructure.map((section, sectionIndex) => (
              <div
                key={sectionIndex}
                className="border-b pb-4 last:border-b-0 last:pb-0"
              >
                <h3 className="text-lg font-semibold mb-3 text-gray-800">
                  {section.title}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
                  {/* 2. Loop kedua untuk setiap FIELD di dalam seksi tersebut */}
                  {section.fields.map((field) => (
                    <div key={field.name}>
                      <p className="text-sm text-gray-500">{field.label}</p>
                      <p className="font-medium">
                        {/* Ambil data dari inspection.data menggunakan 'name' dari field */}
                        {inspectionDetails[field.name] || (
                          <span className="text-gray-400">N/A</span>
                        )}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            // Tampilkan pesan jika tidak ada struktur form yang cocok
            <p className="text-gray-500">
              No inspection form structure found for this equipment type (
              {inspection.equipmentGeneralType || "N/A"}).
            </p>
          )}
        </CardContent>
      </Card>

      {/* Comments */}
      {inspection.comments && (
        <Card>
          <CardHeader>
            <CardTitle>Comments</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">{inspection.comments}</p>
          </CardContent>
        </Card>
      )}

      {/* Verification Information */}
      {inspection.verifiedBy && (
        <Card>
          <CardHeader>
            <CardTitle>Verification Details</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Verified By</p>
              <p className="font-medium">{inspection.verifiedBy}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Verified At</p>
              <p className="font-medium">{inspection.verifiedAt}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
