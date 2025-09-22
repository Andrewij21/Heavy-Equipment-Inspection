"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

interface InspectionDetail {
  id: string;
  equipmentType: string;
  equipmentId: string;
  location: string;
  date: string;
  time: string;
  mechanic: string;
  status: "pending" | "approved" | "rejected";
  data: any;
  comments?: string;
  verifiedBy?: string;
  verifiedAt?: string;
}

export default function InspectionDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const [inspection, setInspection] = useState<InspectionDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data - replace with actual API call
    const mockInspection: InspectionDetail = {
      id: params.id as string,
      equipmentType: "Track Equipment",
      equipmentId: "TRK-001",
      location: "Site A - Zone 1",
      date: "2024-01-15",
      time: "08:30",
      mechanic: "John Smith",
      status: "pending",
      data: {
        engineOilLevel: "Good",
        coolantLevel: "Good",
        trackTension: "85%",
        hydraulicPressure: "2400 PSI",
        fuelLevel: "75%",
        batteryVoltage: "12.6V",
        operatingHours: "1250",
        temperature: {
          engine: "85°C",
          hydraulic: "65°C",
        },
      },
      comments:
        "All systems operating within normal parameters. Minor adjustment needed on track tension.",
    };

    setTimeout(() => {
      setInspection(mockInspection);
      setLoading(false);
    }, 500);
  }, [params.id]);

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

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
      case "approved":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-yellow-100 text-yellow-800";
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
            <span>Basic Information</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-gray-500" />
            <div>
              <p className="text-sm text-gray-500">Date</p>
              <p className="font-medium">{inspection.date}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-gray-500" />
            <div>
              <p className="text-sm text-gray-500">Time</p>
              <p className="font-medium">{inspection.time}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <User className="h-4 w-4 text-gray-500" />
            <div>
              <p className="text-sm text-gray-500">Mechanic</p>
              <p className="font-medium">{inspection.mechanic}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin className="h-4 w-4 text-gray-500" />
            <div>
              <p className="text-sm text-gray-500">Location</p>
              <p className="font-medium">{inspection.location}</p>
            </div>
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

      {/* Inspection Data */}
      <Card>
        <CardHeader>
          <CardTitle>Inspection Results</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(inspection.data).map(([key, value]) => {
              if (typeof value === "object") {
                return (
                  <div key={key} className="space-y-2">
                    <p className="font-medium capitalize">
                      {key.replace(/([A-Z])/g, " $1")}
                    </p>
                    <div className="flex gap-4 items-center">
                      {Object.entries(value as any).map(
                        ([subKey, subValue]) => (
                          <div key={subKey} className="">
                            <p className="text-sm text-gray-500 capitalize">
                              {subKey}
                            </p>
                            <p className="text-sm font-medium">
                              {subValue as string}
                            </p>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                );
              }
              return (
                <div key={key}>
                  <p className="text-sm text-gray-500 capitalize">
                    {key.replace(/([A-Z])/g, " $1")}
                  </p>
                  <p className="font-medium">{value as string}</p>
                </div>
              );
            })}
          </div>
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
