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
import { Eye, Edit } from "lucide-react";

interface Inspection {
  id: string;
  equipmentId: string;
  equipmentType: "track" | "wheel" | "support";
  mechanicName: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
  issues: number;
}

interface RecentInspectionsProps {
  userRole: "mechanic" | "leader" | "admin";
}

export function RecentInspections({ userRole }: RecentInspectionsProps) {
  // Mock data - replace with real data from API
  const mockInspections: Inspection[] = [
    {
      id: "1",
      equipmentId: "EXC-001",
      equipmentType: "track",
      mechanicName: "John Mechanic",
      status: "pending",
      createdAt: "2024-01-15T10:30:00Z",
      issues: 2,
    },
    {
      id: "2",
      equipmentId: "WHL-002",
      equipmentType: "wheel",
      mechanicName: "Jane Smith",
      status: "approved",
      createdAt: "2024-01-15T09:15:00Z",
      issues: 0,
    },
    {
      id: "3",
      equipmentId: "SUP-003",
      equipmentType: "support",
      mechanicName: "Bob Wilson",
      status: "rejected",
      createdAt: "2024-01-14T16:45:00Z",
      issues: 5,
    },
    {
      id: "4",
      equipmentId: "EXC-004",
      equipmentType: "track",
      mechanicName: "Alice Johnson",
      status: "approved",
      createdAt: "2024-01-14T14:20:00Z",
      issues: 1,
    },
  ];

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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Inspections</CardTitle>
        <CardDescription>
          {userRole === "mechanic"
            ? "Your latest inspection submissions"
            : userRole === "leader"
            ? "Inspections requiring your review"
            : "Latest system activity"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockInspections.map((inspection) => (
            <div
              key={inspection.id}
              className="flex items-center justify-between p-4 border rounded-lg"
            >
              <div className="flex-1">
                <div className="flex items-center space-x-3">
                  <div>
                    <p className="font-medium">{inspection.equipmentId}</p>
                    <p className="text-sm text-muted-foreground">
                      {getEquipmentTypeLabel(inspection.equipmentType)}
                    </p>
                  </div>
                  <Badge className={getStatusColor(inspection.status)}>
                    {inspection.status.charAt(0).toUpperCase() +
                      inspection.status.slice(1)}
                  </Badge>
                </div>
                <div className="mt-2 flex items-center space-x-4 text-sm text-muted-foreground">
                  <span>By {inspection.mechanicName}</span>
                  <span>{formatDate(inspection.createdAt)}</span>
                  {/* {inspection.issues > 0 && (
                    <span className="text-orange-600">
                      {inspection.issues} issue
                      {inspection.issues > 1 ? "s" : ""}
                    </span>
                  )} */}
                </div>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Eye className="w-4 h-4 mr-1" />
                  View
                </Button>
                {userRole === "mechanic" &&
                  inspection.status === "rejected" && (
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                  )}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 text-center">
          <Button variant="outline">View All Inspections</Button>
        </div>
      </CardContent>
    </Card>
  );
}
