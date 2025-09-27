// src/app/verification/page.tsx
"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, CheckCircle, XCircle, Loader2 } from "lucide-react";
import { VerificationTable } from "@/components/tables/VerificationTable";
// NEW IMPORT: Import the general inspection hook
import { useGetGeneralInspections } from "@/queries/inspection";

// Define the shape of the data that comes from the API (Inspection model + approver)
interface InspectionListItem {
  id: string;
  equipmentId: string;
  equipmentType: "track" | "wheel" | "support";
  mechanicName: string;
  approver?: { username: string; id: string };
  status: "PENDING" | "APPROVED" | "REJECTED";
  createdAt: string;
  location: string;
}

// Interface for the data format required by the VerificationTable
interface TableData extends InspectionListItem {
  leaderName: string;
  priority: "low" | "medium" | "high"; // Placeholder required by table
  issues: number; // Placeholder required by table
  status: "PENDING" | "APPROVED" | "REJECTED"; // Table uses lowercase
}

export default function VerificationPage() {
  // Use Prisma status values (uppercase) for the API filter and tab state
  const [activeTab, setActiveTab] = useState<
    "PENDING" | "APPROVED" | "REJECTED" | "ALL"
  >("PENDING");

  // Define base filters/pagination parameters
  const [filters, setFilters] = useState({
    page: 1,
    limit: 50,
    q: "",
  });

  // Fetch the data based on current status filter
  const apiFilters = {
    ...filters,
    // Pass the status filter to the API unless the tab is 'ALL'
    status: activeTab !== "ALL" ? activeTab : undefined,
  };

  const { data, isLoading, isError } = useGetGeneralInspections(apiFilters);

  // Map API data to the table's required structure and calculate counts
  const { tableData, counts } = useMemo(() => {
    const rawData = data?.data || [];
    const mappedData: TableData[] = [];
    let pendingCount = 0;
    let approvedCount = 0;
    let rejectedCount = 0;

    rawData.forEach((item: any) => {
      const status = item.status as "PENDING" | "APPROVED" | "REJECTED";

      // Calculate counts
      if (status === "PENDING") pendingCount++;
      else if (status === "APPROVED") approvedCount++;
      else if (status === "REJECTED") rejectedCount++;

      // Map to TableData format
      mappedData.push({
        id: item.id,
        equipmentId: item.equipmentId,
        equipmentType: item.equipmentType.toLowerCase(),
        mechanicName: item.mechanicName,
        leaderName: item.approver?.username || "N/A",
        status: status.toLowerCase() as "PENDING" | "APPROVED" | "REJECTED", // Convert for table
        createdAt: item.createdAt,
        location: item.location,
        // Mocked fields the table expects
        priority: "medium",
        issues: 0,
      });
    });

    return {
      tableData: mappedData,
      counts: { pendingCount, approvedCount, rejectedCount },
    };
  }, [data]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        <p className="ml-3 text-lg text-gray-600">
          Loading verification data...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-red-600 text-center mt-10">
        Error loading inspections. Please check the network connection.
      </div>
    );
  }

  const totalCount =
    counts.pendingCount + counts.approvedCount + counts.rejectedCount;

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
              <div className="text-2xl font-bold">{counts.pendingCount}</div>
              <p className="text-xs text-muted-foreground">
                Awaiting verification
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Approved</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{counts.approvedCount}</div>
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
              <div className="text-2xl font-bold">{counts.rejectedCount}</div>
              <p className="text-xs text-muted-foreground">
                Requiring revision
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={(value) =>
            setActiveTab(value as "PENDING" | "APPROVED" | "REJECTED" | "ALL")
          }
        >
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="PENDING">
              Pending ({counts.pendingCount})
            </TabsTrigger>
            <TabsTrigger value="APPROVED">
              Approved ({counts.approvedCount})
            </TabsTrigger>
            <TabsTrigger value="REJECTED">
              Rejected ({counts.rejectedCount})
            </TabsTrigger>
            <TabsTrigger value="ALL">All ({totalCount})</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-6">
            <VerificationTable
              // Pass the data received from the API endpoint
              data={tableData}
              // Pass the active tab status (lowercase) for internal filtering/display
              statusFilter={activeTab.toLowerCase()}
            />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
