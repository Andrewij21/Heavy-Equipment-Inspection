// src/app/ReportsPage.tsx
"use client";

import { useState, useMemo, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ExportDialog } from "@/components/dialogs/ExportDialog";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  FileSpreadsheet,
  TrendingUp,
  Users,
  Calendar,
  Download,
  BarChart3,
  Search,
  Loader2,
  FileText,
} from "lucide-react";
import {
  type ExportFilters,
  type ExportInspection,
  generateCSVContent, // Keep for CSV format
  downloadCSV, // Keep for CSV format
  generateReportSummary,
} from "@/lib/exportUtils";
import { toast } from "sonner";
// API Imports
import { useGetGeneralInspections } from "@/queries/inspection";
import { downloadInspectionReport } from "@/queries/report"; // Assuming this utility is imported/defined
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock Data structures (as defined previously)
interface FilterableInspection extends ExportInspection {
  equipmentType: "track" | "wheel" | "support";
  status: "approved" | "rejected" | "pending";
  approver?: { username: string; id: string };
}
const mapApiToFilterStatus = (status: string) =>
  status.toLowerCase() as "approved" | "rejected" | "pending";

export default function ReportsPage() {
  const [isExporting, setIsExporting] = useState(false);

  // States for API filtering (Data Source)
  const [apiFilters, setApiFilters] = useState({
    status: "ALL",
    dateFrom: "",
    dateTo: "",
  });

  // States for client-side filtering (Table View)
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");

  // Synchronize state variables for easy access in inputs and filters
  const dateFrom = apiFilters.dateFrom;
  const dateTo = apiFilters.dateTo;

  // Fetch data using the hook
  const { data, isLoading, isError } = useGetGeneralInspections({
    status: apiFilters.status === "ALL" ? undefined : apiFilters.status,
    dateFrom: apiFilters.dateFrom,
    dateTo: apiFilters.dateTo,
  });

  // Map and normalize the API data once (useMemo remains the same)
  const allInspections: FilterableInspection[] = useMemo(() => {
    if (!data?.data) return [];

    return data.data.map((item: any) => ({
      id: item.id,
      equipmentId: item.equipmentId,
      equipmentType: item.equipmentType.toLowerCase(),
      mechanicName: item.mechanicName,
      status: mapApiToFilterStatus(item.status),
      createdAt: item.createdAt,
      location: item.location,
      verifiedBy: item.approver?.username || "N/A",
      verifiedAt: item.approvalDate,
      trackCondition: item.trackCondition || "N/A",
      trackTension: item.trackTension || "N/A",
      sprocketWear: item.sprocketWear || "N/A",
      trackPadWear: item.trackPadWear || 0,
      hydraulicLeaks: item.hydraulicLeaks || false,
      greaseLevels: item.greaseLevels || "N/A",
      notes: item.notes || "",
      tireCondition: item.tireCondition || "N/A",
      structuralIntegrity: item.structuralIntegrity || "N/A",
    })) as FilterableInspection[];
  }, [data]);

  // Client-Side Filtered Data (for the visible table - useMemo remains the same)
  const filteredInspections = useMemo(() => {
    const filtered = allInspections.filter((inspection) => {
      const matchesSearch =
        inspection.equipmentId
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        inspection.mechanicName
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        inspection.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType =
        typeFilter === "all" || inspection.equipmentType === typeFilter;
      const matchesStatus =
        statusFilter === "all" || inspection.status === statusFilter;

      const created = new Date(inspection.createdAt);
      let matchesQuickDate = true;

      // Implement quick date logic based on dateFilter state
      if (dateFilter !== "all") {
        const now = new Date();
        switch (dateFilter) {
          case "today":
            matchesQuickDate = created.toDateString() === now.toDateString();
            break;
          case "week":
            matchesQuickDate =
              created >= new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
            break;
          case "month":
            matchesQuickDate =
              created >= new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
            break;
        }
      }

      let matchesRange = true;
      if (dateFrom)
        matchesRange = matchesRange && created >= new Date(dateFrom);
      if (dateTo) {
        const end = new Date(dateTo);
        end.setHours(23, 59, 59, 999);
        matchesRange = matchesRange && created <= end;
      }

      return (
        matchesSearch &&
        matchesType &&
        matchesStatus &&
        matchesQuickDate &&
        matchesRange
      );
    });
    return filtered;
  }, [
    allInspections,
    searchTerm,
    typeFilter,
    statusFilter,
    dateFilter,
    dateFrom,
    dateTo,
  ]);

  const summary = generateReportSummary(allInspections);

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
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // NEW: CORE Export Handler updated to call backend API for PDF/Excel
  const handleExport = async (
    inspectionsToExport: FilterableInspection[],
    format: "csv" | "pdf" | "excel"
  ) => {
    setIsExporting(true);
    const toastId = toast.loading(
      `Preparing export as ${format.toUpperCase()}...`
    );
    try {
      if (inspectionsToExport.length === 0) {
        toast.warning("No data to export.", { id: toastId });
        return;
      }

      if (format === "csv") {
        // CSV: Use client-side generation (faster)
        const csvContent = generateCSVContent(inspectionsToExport);
        const timestamp = new Date().toISOString().split("T")[0];
        const filename = `inspection-report-${timestamp}.csv`;
        downloadCSV(csvContent, filename);
      } else {
        // --- API CALL FOR PDF/EXCEL/FORM GENERATION ---

        const inspectionIds = inspectionsToExport.map((i) => i.id);

        // 1. Get blob and filename from the API function (which already reads headers)
        const { blob, filename: apiFilename } = await downloadInspectionReport({
          inspectionIds: inspectionIds,
          format: format,
        });

        // 2. CRITICAL FRONTEND EXTENSION FIX
        let finalFilename = apiFilename;
        if (format === "excel") {
          // Ensure the filename ends with .xlsx to satisfy the browser/OS,
          // overriding any incorrect intermediate extension like '.excel' or '.xls'
          const baseName = finalFilename.replace(
            /\.(xlsx|xls|excel|bin)?$/i,
            ""
          );
          finalFilename = `${baseName}.xlsx`;
        }

        // 3. Handle file download initiation in the browser
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = finalFilename; // Use the corrected filename
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
      }

      toast.success("Export Successful", {
        id: toastId,
        description: `${inspectionsToExport.length} inspections exported.`,
      });
    } catch (error) {
      console.error("Export error:", error);
      toast.error("Export Failed", {
        id: toastId,
        description: "Export failed. Check console for API details.",
      });
    } finally {
      setIsExporting(false);
    }
  };

  const handleInlineDownload = (inspection: FilterableInspection) => {
    // Single inspection download as PDF/Form
    // Note: The backend requires only one ID for PDF form generation
    handleExport([inspection], "pdf");
  };

  const handleDialogExport = (
    filters: ExportFilters,
    format: "csv" | "excel" | "pdf"
  ) => {
    // For bulk export from the dialog, use the currently filtered data
    handleExport(filteredInspections, format);
  };

  // If loading, show spinner
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
      </div>
    );
  }

  // Chart data setup
  const statusData = [
    { name: "Approved", value: summary.approved, color: "#10b981" },
    { name: "Rejected", value: summary.rejected, color: "#ef4444" },
    { name: "Pending", value: summary.pending, color: "#f59e0b" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto py-6">
        <div className="text-right mb-6">
          {/* Render the ExportDialog here */}
          {/* <ExportDialog onExport={handleDialogExport} isExporting={isExporting} /> */}
        </div>

        {/* Charts and Summary Cards */}
        <div className="grid gap-6 lg:grid-cols-2 mb-8">
          {/* Status Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Inspection Status</CardTitle>
              <CardDescription>
                Current status of all inspections
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name} ${((percent as number) * 100).toFixed(0)}%`
                    }
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Summary Cards */}
          <div className="grid gap-4 lg:grid-cols-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Inspections
                </CardTitle>
                <FileSpreadsheet className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{summary.total}</div>
                <p className="text-xs text-muted-foreground">
                  Total records found
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Approval Rate
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {summary.approvalRate}%
                </div>
                <p className="text-xs text-muted-foreground">
                  {summary.approved} of {summary.total} approved
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Active Users
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {Object.keys(summary.byMechanic).length}
                </div>
                <p className="text-xs text-muted-foreground">
                  Mechanics contributing
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Pending Count
                </CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{summary.pending}</div>
                <p className="text-xs text-muted-foreground">
                  Awaiting leader review
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Inspection Data Table */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Inspection Data</CardTitle>
            <CardDescription>
              Detailed view of all inspections with filtering capabilities
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Filters */}
            <div className="flex items-center justify-between gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search inspections..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Equipment Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="track">Track</SelectItem>
                  <SelectItem value="wheel">Wheel</SelectItem>
                  <SelectItem value="support">Support</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Quick Date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">Last 7 Days</SelectItem>
                  <SelectItem value="month">Last 30 Days</SelectItem>
                </SelectContent>
              </Select>
              <Input
                type="date"
                value={dateFrom}
                onChange={(e) =>
                  setApiFilters((prev) => ({
                    ...prev,
                    dateFrom: e.target.value,
                  }))
                }
                aria-label="From date"
                className="w-fit"
              />
              <div className="flex items-center gap-2">
                <Input
                  type="date"
                  value={dateTo}
                  onChange={(e) =>
                    setApiFilters((prev) => ({
                      ...prev,
                      dateTo: e.target.value,
                    }))
                  }
                  aria-label="To date"
                />
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 font-medium">Equipment ID</th>
                    <th className="text-left p-3 font-medium">Type</th>
                    <th className="text-left p-3 font-medium">Mechanic</th>
                    <th className="text-left p-3 font-medium">Status</th>
                    <th className="text-left p-3 font-medium">Location</th>
                    <th className="text-left p-3 font-medium">Date</th>
                    <th className="text-left p-3 font-medium">Download</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredInspections.map((inspection) => (
                    <tr
                      key={inspection.id}
                      className="border-b hover:bg-gray-50"
                    >
                      <td className="p-3 font-medium">
                        {inspection.equipmentId}
                      </td>
                      <td className="p-3">
                        <Badge variant="outline">
                          {inspection.equipmentType.charAt(0).toUpperCase() +
                            inspection.equipmentType.slice(1)}
                        </Badge>
                      </td>
                      <td className="p-3">{inspection.mechanicName}</td>
                      <td className="p-3">
                        <Badge className={getStatusColor(inspection.status)}>
                          {inspection.status.charAt(0).toUpperCase() +
                            inspection.status.slice(1)}
                        </Badge>
                      </td>
                      <td className="p-3 text-sm text-muted-foreground">
                        {inspection.location}
                      </td>
                      <td className="p-3 text-sm text-muted-foreground">
                        {formatDate(inspection.createdAt)}
                      </td>
                      <td className="p-3 text-sm">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="default" disabled={isExporting}>
                              <Download className="w-4 h-4 mr-2" />
                              Download
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Select Format</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => handleExport([inspection], "pdf")}
                              disabled={isExporting}
                            >
                              <FileText className="w-4 h-4 mr-2" />
                              Inspection Form (PDF)
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                handleExport([inspection], "excel")
                              }
                              disabled={isExporting}
                            >
                              <FileSpreadsheet className="w-4 h-4 mr-2" />
                              Raw Data (Excel)
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredInspections.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <FileSpreadsheet className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No inspections match your current filters.</p>
                </div>
              )}
            </div>

            <div className="mt-4 text-sm text-muted-foreground">
              Showing {filteredInspections.length} of {allInspections.length}{" "}
              inspections
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
