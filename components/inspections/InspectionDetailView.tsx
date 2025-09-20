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
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  CheckCircle,
  XCircle,
  Clock,
  User,
  MapPin,
  Calendar,
  Timer,
} from "lucide-react";
import { useState } from "react";

interface InspectionData {
  id: string;
  equipmentId: string;
  equipmentType: "track" | "wheel" | "support";
  mechanicName: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
  location: string;
  operatorName: string;
  workingHours: number;
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

interface InspectionDetailViewProps {
  inspection: InspectionData;
  onApprove?: (id: string, comments: string) => void;
  onReject?: (id: string, comments: string) => void;
  showActions?: boolean;
}

export function InspectionDetailView({
  inspection,
  onApprove,
  onReject,
  showActions = false,
}: InspectionDetailViewProps) {
  const [comments, setComments] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case "rejected":
        return <XCircle className="w-5 h-5 text-red-600" />;
      case "pending":
        return <Clock className="w-5 h-5 text-yellow-600" />;
      default:
        return <Clock className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleApprove = async () => {
    if (!onApprove) return;
    setIsSubmitting(true);
    try {
      await onApprove(inspection.id, comments);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReject = async () => {
    if (!onReject) return;
    setIsSubmitting(true);
    try {
      await onReject(inspection.id, comments);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderTrackDetails = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <Label className="text-sm font-medium text-muted-foreground">
          Track Condition
        </Label>
        <p className="text-sm capitalize">{inspection.trackCondition}</p>
      </div>
      <div>
        <Label className="text-sm font-medium text-muted-foreground">
          Track Tension
        </Label>
        <p className="text-sm capitalize">{inspection.trackTension}</p>
      </div>
      <div>
        <Label className="text-sm font-medium text-muted-foreground">
          Sprocket Wear
        </Label>
        <p className="text-sm capitalize">{inspection.sprocketWear}</p>
      </div>
      <div>
        <Label className="text-sm font-medium text-muted-foreground">
          Track Pad Wear
        </Label>
        <p className="text-sm">{inspection.trackPadWear}%</p>
      </div>
      <div>
        <Label className="text-sm font-medium text-muted-foreground">
          Grease Levels
        </Label>
        <p className="text-sm capitalize">{inspection.greaseLevels}</p>
      </div>
      <div>
        <Label className="text-sm font-medium text-muted-foreground">
          Hydraulic Leaks
        </Label>
        <p className="text-sm">{inspection.hydraulicLeaks ? "Yes" : "No"}</p>
      </div>
    </div>
  );

  const renderWheelDetails = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <Label className="text-sm font-medium text-muted-foreground">
          Tire Condition
        </Label>
        <p className="text-sm capitalize">{inspection.tireCondition}</p>
      </div>
      <div>
        <Label className="text-sm font-medium text-muted-foreground">
          Tire Pressure
        </Label>
        <p className="text-sm">{inspection.tirePressure} PSI</p>
      </div>
      <div>
        <Label className="text-sm font-medium text-muted-foreground">
          Tread Depth
        </Label>
        <p className="text-sm">{inspection.treadDepth} mm</p>
      </div>
      <div>
        <Label className="text-sm font-medium text-muted-foreground">
          Wheel Alignment
        </Label>
        <p className="text-sm capitalize">{inspection.wheelAlignment}</p>
      </div>
      <div>
        <Label className="text-sm font-medium text-muted-foreground">
          Brake Condition
        </Label>
        <p className="text-sm capitalize">{inspection.brakeCondition}</p>
      </div>
      <div>
        <Label className="text-sm font-medium text-muted-foreground">
          Oil Levels
        </Label>
        <p className="text-sm capitalize">{inspection.oilLevels}</p>
      </div>
    </div>
  );

  const renderSupportDetails = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <Label className="text-sm font-medium text-muted-foreground">
          Structural Integrity
        </Label>
        <p className="text-sm capitalize">{inspection.structuralIntegrity}</p>
      </div>
      <div>
        <Label className="text-sm font-medium text-muted-foreground">
          Welding Condition
        </Label>
        <p className="text-sm capitalize">{inspection.weldingCondition}</p>
      </div>
      <div>
        <Label className="text-sm font-medium text-muted-foreground">
          Bolt Tightness
        </Label>
        <p className="text-sm capitalize">{inspection.boltTightness}</p>
      </div>
      <div>
        <Label className="text-sm font-medium text-muted-foreground">
          Load Capacity
        </Label>
        <p className="text-sm">{inspection.loadCapacity} tons</p>
      </div>
      <div>
        <Label className="text-sm font-medium text-muted-foreground">
          Stability Check
        </Label>
        <p className="text-sm capitalize">{inspection.stabilityCheck}</p>
      </div>
      <div>
        <Label className="text-sm font-medium text-muted-foreground">
          Hydraulic Systems
        </Label>
        <p className="text-sm">
          {inspection.hydraulicSystems ? "Present" : "Not Present"}
        </p>
      </div>
    </div>
  );

  const getEquipmentTypeLabel = (type: string) => {
    switch (type) {
      case "track":
        return "Track Equipment";
      case "wheel":
        return "Wheel Equipment";
      case "support":
        return "Support Equipment";
      default:
        return type;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">
                {inspection.equipmentId}
              </CardTitle>
              <CardDescription>
                {getEquipmentTypeLabel(inspection.equipmentType)} Inspection
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              {getStatusIcon(inspection.status)}
              <Badge className={getStatusColor(inspection.status)}>
                {inspection.status.charAt(0).toUpperCase() +
                  inspection.status.slice(1)}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center space-x-2">
              <User className="w-4 h-4 text-muted-foreground" />
              <div>
                <Label className="text-sm font-medium text-muted-foreground">
                  Mechanic
                </Label>
                <p className="text-sm">{inspection.mechanicName}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-muted-foreground" />
              <div>
                <Label className="text-sm font-medium text-muted-foreground">
                  Location
                </Label>
                <p className="text-sm">{inspection.location}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <div>
                <Label className="text-sm font-medium text-muted-foreground">
                  Date
                </Label>
                <p className="text-sm">{formatDate(inspection.createdAt)}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Timer className="w-4 h-4 text-muted-foreground" />
              <div>
                <Label className="text-sm font-medium text-muted-foreground">
                  Working Hours
                </Label>
                <p className="text-sm">{inspection.workingHours}h</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium text-muted-foreground">
                Operator Name
              </Label>
              <p className="text-sm">{inspection.operatorName}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-muted-foreground">
                Equipment Type
              </Label>
              <p className="text-sm">
                {getEquipmentTypeLabel(inspection.equipmentType)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Equipment Specific Details */}
      <Card>
        <CardHeader>
          <CardTitle>Inspection Details</CardTitle>
          <CardDescription>
            Equipment-specific inspection results
          </CardDescription>
        </CardHeader>
        <CardContent>
          {inspection.equipmentType === "track" && renderTrackDetails()}
          {inspection.equipmentType === "wheel" && renderWheelDetails()}
          {inspection.equipmentType === "support" && renderSupportDetails()}
        </CardContent>
      </Card>

      {/* Notes */}
      {inspection.notes && (
        <Card>
          <CardHeader>
            <CardTitle>Additional Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm whitespace-pre-wrap">{inspection.notes}</p>
          </CardContent>
        </Card>
      )}

      {/* Verification Actions */}
      {showActions && inspection.status === "pending" && (
        <Card>
          <CardHeader>
            <CardTitle>Verification</CardTitle>
            <CardDescription>
              Review and approve or reject this inspection
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="comments">Comments</Label>
              <Textarea
                id="comments"
                placeholder="Add your review comments..."
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                className="min-h-[100px]"
              />
            </div>
            <div className="flex space-x-4">
              <Button
                onClick={handleApprove}
                disabled={isSubmitting}
                className="bg-green-600 hover:bg-green-700"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                {isSubmitting ? "Approving..." : "Approve"}
              </Button>
              <Button
                onClick={handleReject}
                disabled={isSubmitting}
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
