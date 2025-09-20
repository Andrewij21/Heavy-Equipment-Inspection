"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Eye,
  Search,
  Filter,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
} from "lucide-react";
import Link from "next/link";

interface PendingInspection {
  id: string;
  equipmentId: string;
  equipmentType: "track" | "wheel" | "support";
  mechanicName: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
  location: string;
  priority: "low" | "medium" | "high";
  issues: number;
}

export default function VerificationPage() {
  const [activeTab, setActiveTab] = useState("pending");

  // Mock data - replace with real data from API
  const mockInspections: PendingInspection[] = [
    {
      id: "1",
      equipmentId: "EXC-001",
      equipmentType: "track",
      mechanicName: "John Mechanic",
      status: "pending",
      createdAt: "2024-01-15T10:30:00Z",
      location: "Site A, Zone 1",
      priority: "high",
      issues: 3,
    },
    {
      id: "2",
      equipmentId: "WHL-002",
      equipmentType: "wheel",
      mechanicName: "Jane Smith",
      status: "pending",
      createdAt: "2024-01-15T09:15:00Z",
      location: "Site B, Zone 2",
      priority: "medium",
      issues: 1,
    },
    {
      id: "3",
      equipmentId: "SUP-003",
      equipmentType: "support",
      mechanicName: "Bob Wilson",
      status: "approved",
      createdAt: "2024-01-14T16:45:00Z",
      location: "Site C, Zone 3",
      priority: "low",
      issues: 0,
    },
    {
      id: "4",
      equipmentId: "EXC-004",
      equipmentType: "track",
      mechanicName: "Alice Johnson",
      status: "rejected",
      createdAt: "2024-01-14T14:20:00Z",
      location: "Site A, Zone 2",
      priority: "medium",
      issues: 5,
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "rejected":
        return <XCircle className="w-4 h-4 text-red-600" />;
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-600" />;
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

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
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

  const filterInspections = (status: string) => {
    if (status === "all") return mockInspections;
    return mockInspections.filter((inspection) => inspection.status === status);
  };

  const pendingCount = mockInspections.filter(
    (i) => i.status === "pending"
  ).length;
  const approvedCount = mockInspections.filter(
    (i) => i.status === "approved"
  ).length;
  const rejectedCount = mockInspections.filter(
    (i) => i.status === "rejected"
  ).length;

  const renderInspectionCard = (inspection: PendingInspection) => (
    <Card key={inspection.id} className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <h3 className="text-lg font-semibold">
                {inspection.equipmentId}
              </h3>
              <Badge className={getStatusColor(inspection.status)}>
                {getStatusIcon(inspection.status)}
                <span className="ml-1">
                  {inspection.status.charAt(0).toUpperCase() +
                    inspection.status.slice(1)}
                </span>
              </Badge>
              <Badge className={getPriorityColor(inspection.priority)}>
                {inspection.priority.charAt(0).toUpperCase() +
                  inspection.priority.slice(1)}{" "}
                Priority
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-2">
              {getEquipmentTypeLabel(inspection.equipmentType)}
            </p>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <span>👤 {inspection.mechanicName}</span>
              <span>📍 {inspection.location}</span>
              <span>📅 {formatDate(inspection.createdAt)}</span>
              {inspection.issues > 0 && (
                <span className="text-orange-600 flex items-center">
                  <AlertTriangle className="w-3 h-3 mr-1" />
                  {inspection.issues} issue{inspection.issues > 1 ? "s" : ""}
                </span>
              )}
            </div>
          </div>
          <div className="flex space-x-2">
            <Link href={`/verification/${inspection.id}`}>
              <Button variant="outline" size="sm">
                <Eye className="w-4 h-4 mr-1" />
                Review
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Inspection Verification
          </h1>
          <p className="mt-1 text-sm text-gray-600">
            Review and verify equipment inspections submitted by mechanics
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-3 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Pending Review
              </CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingCount}</div>
              <p className="text-xs text-muted-foreground">
                Awaiting verification
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Approved Today
              </CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{approvedCount}</div>
              <p className="text-xs text-muted-foreground">
                Successfully verified
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rejected</CardTitle>
              <XCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{rejectedCount}</div>
              <p className="text-xs text-muted-foreground">
                Requiring revision
              </p>
            </CardContent>
          </Card>
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
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priorities</SelectItem>
                  <SelectItem value="high">High Priority</SelectItem>
                  <SelectItem value="medium">Medium Priority</SelectItem>
                  <SelectItem value="low">Low Priority</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Apply Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Inspections Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="pending">Pending ({pendingCount})</TabsTrigger>
            <TabsTrigger value="approved">
              Approved ({approvedCount})
            </TabsTrigger>
            <TabsTrigger value="rejected">
              Rejected ({rejectedCount})
            </TabsTrigger>
            <TabsTrigger value="all">
              All ({mockInspections.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="space-y-4 mt-6">
            {filterInspections("pending").map(renderInspectionCard)}
            {filterInspections("pending").length === 0 && (
              <Card>
                <CardContent className="text-center py-12">
                  <Clock className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-medium">
                    No pending inspections
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    All inspections have been reviewed.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="approved" className="space-y-4 mt-6">
            {filterInspections("approved").map(renderInspectionCard)}
          </TabsContent>

          <TabsContent value="rejected" className="space-y-4 mt-6">
            {filterInspections("rejected").map(renderInspectionCard)}
          </TabsContent>

          <TabsContent value="all" className="space-y-4 mt-6">
            {filterInspections("all").map(renderInspectionCard)}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
