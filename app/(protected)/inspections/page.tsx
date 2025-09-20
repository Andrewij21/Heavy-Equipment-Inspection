"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Search, Eye, Edit, Filter, FileText } from "lucide-react";
import Link from "next/link";

export default function InspectionsPage() {
  // Mock data - replace with real data from API
  const mockInspections = [
    {
      id: "1",
      equipmentId: "EXC-001",
      equipmentType: "track",
      status: "pending",
      createdAt: "2024-01-15T10:30:00Z",
      location: "Site A, Zone 1",
      issues: 2,
    },
    {
      id: "2",
      equipmentId: "WHL-002",
      equipmentType: "wheel",
      status: "approved",
      createdAt: "2024-01-15T09:15:00Z",
      location: "Site B, Zone 2",
      issues: 0,
    },
    {
      id: "3",
      equipmentId: "SUP-003",
      equipmentType: "support",
      status: "rejected",
      createdAt: "2024-01-14T16:45:00Z",
      location: "Site C, Zone 3",
      issues: 5,
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
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                My Inspections
              </h1>
              <p className="mt-1 text-sm text-gray-600">
                View and manage your equipment inspections
              </p>
            </div>
            <Link href="/inspections/new">
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                New Inspection
              </Button>
            </Link>
          </div>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search equipment ID..." className="pl-10" />
              </div>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Equipment Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="track">Track Equipment</SelectItem>
                  <SelectItem value="wheel">Wheel Equipment</SelectItem>
                  <SelectItem value="support">Support Equipment</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Apply Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Inspections List */}
        <div className="space-y-4">
          {mockInspections.map((inspection) => (
            <Card key={inspection.id}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4">
                      <div>
                        <h3 className="text-lg font-semibold">
                          {inspection.equipmentId}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {getEquipmentTypeLabel(inspection.equipmentType)}
                        </p>
                      </div>
                      <Badge className={getStatusColor(inspection.status)}>
                        {inspection.status.charAt(0).toUpperCase() +
                          inspection.status.slice(1)}
                      </Badge>
                    </div>
                    <div className="mt-2 flex items-center space-x-6 text-sm text-muted-foreground">
                      <span>📍 {inspection.location}</span>
                      <span>📅 {formatDate(inspection.createdAt)}</span>
                      {inspection.issues > 0 && (
                        <span className="text-orange-600">
                          ⚠️ {inspection.issues} issue
                          {inspection.issues > 1 ? "s" : ""}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                    {inspection.status === "rejected" && (
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {mockInspections.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <div className="text-muted-foreground mb-4">
                <FileText className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-lg font-medium">No inspections found</h3>
                <p className="text-sm">
                  Start by creating your first equipment inspection.
                </p>
              </div>
              <Link href="/inspections/new">
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Create First Inspection
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
