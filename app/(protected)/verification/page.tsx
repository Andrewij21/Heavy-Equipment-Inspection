"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, CheckCircle, XCircle } from "lucide-react";
import { VerificationTable } from "@/components/tables/VerificationTable";

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
    {
      id: "5",
      equipmentId: "WHL-005",
      equipmentType: "wheel",
      mechanicName: "Mike Davis",
      status: "pending",
      createdAt: "2024-01-13T11:00:00Z",
      location: "Site D, Zone 1",
      priority: "low",
      issues: 0,
    },
    {
      id: "6",
      equipmentId: "SUP-006",
      equipmentType: "support",
      mechanicName: "Sarah Brown",
      status: "approved",
      createdAt: "2024-01-12T15:30:00Z",
      location: "Site B, Zone 3",
      priority: "high",
      issues: 2,
    },
  ];

  const pendingCount = mockInspections.filter(
    (i) => i.status === "pending"
  ).length;
  const approvedCount = mockInspections.filter(
    (i) => i.status === "approved"
  ).length;
  const rejectedCount = mockInspections.filter(
    (i) => i.status === "rejected"
  ).length;

  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">
            Inspection Verification
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
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

          <TabsContent value="pending" className="mt-6">
            <VerificationTable data={mockInspections} statusFilter="pending" />
          </TabsContent>

          <TabsContent value="approved" className="mt-6">
            <VerificationTable data={mockInspections} statusFilter="approved" />
          </TabsContent>

          <TabsContent value="rejected" className="mt-6">
            <VerificationTable data={mockInspections} statusFilter="rejected" />
          </TabsContent>

          <TabsContent value="all" className="mt-6">
            <VerificationTable data={mockInspections} statusFilter="all" />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
