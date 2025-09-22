"use client";

import { useState } from "react";
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
  Filter,
} from "lucide-react";
import {
  type ExportFilters,
  type ExportInspection,
  generateCSVContent,
  downloadCSV,
  generateReportSummary,
} from "@/lib/exportUtils";
import { toast } from "sonner";
export default function ReportsPage() {
  const [isExporting, setIsExporting] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");

  // Mock data - replace with real data from API
  const mockInspections: ExportInspection[] = [
    {
      id: "1",
      equipmentId: "EXC-001",
      equipmentType: "track",
      mechanicName: "John Mechanic",
      status: "approved",
      createdAt: "2024-01-15T10:30:00Z",
      location: "Site A, Zone 1",
      operatorName: "Mike Operator",
      workingHours: 8.5,
      verifiedBy: "Jane Leader",
      verifiedAt: "2024-01-15T14:30:00Z",
      notes: "Equipment in good condition",
      trackCondition: "good",
      trackTension: "proper",
      sprocketWear: "light",
      trackPadWear: 25,
      hydraulicLeaks: false,
      greaseLevels: "adequate",
    },
    {
      id: "2",
      equipmentId: "WHL-002",
      equipmentType: "wheel",
      mechanicName: "Jane Smith",
      status: "approved",
      createdAt: "2024-01-14T09:15:00Z",
      location: "Site B, Zone 2",
      operatorName: "Tom Driver",
      workingHours: 7.0,
      verifiedBy: "Jane Leader",
      verifiedAt: "2024-01-14T16:15:00Z",
      tireCondition: "excellent",
      tirePressure: 35,
      treadDepth: 8.5,
      wheelAlignment: "proper",
      brakeCondition: "good",
      oilLevels: "adequate",
    },
    {
      id: "3",
      equipmentId: "SUP-003",
      equipmentType: "support",
      mechanicName: "Bob Wilson",
      status: "rejected",
      createdAt: "2024-01-13T16:45:00Z",
      location: "Site C, Zone 3",
      operatorName: "Sam Worker",
      workingHours: 6.5,
      verifiedBy: "Jane Leader",
      verifiedAt: "2024-01-14T10:45:00Z",
      notes: "Structural issues found",
      structuralIntegrity: "poor",
      weldingCondition: "fair",
      boltTightness: "loose",
      loadCapacity: 5.0,
      stabilityCheck: "unstable",
      hydraulicSystems: true,
    },
    {
      id: "4",
      equipmentId: "TRK-004",
      equipmentType: "track",
      mechanicName: "Alice Johnson",
      status: "pending",
      createdAt: "2024-01-16T08:00:00Z",
      location: "Site D, Zone 1",
      operatorName: "Chris Operator",
      workingHours: 9.0,
      notes: "Routine maintenance check",
      trackCondition: "fair",
      trackTension: "needs_adjustment",
      sprocketWear: "moderate",
      trackPadWear: 45,
      hydraulicLeaks: true,
      greaseLevels: "low",
    },
  ];

  const filteredInspections = mockInspections.filter((inspection) => {
    const matchesSearch =
      inspection.equipmentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inspection.mechanicName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      inspection.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType =
      typeFilter === "all" || inspection.equipmentType === typeFilter;
    const matchesStatus =
      statusFilter === "all" || inspection.status === statusFilter;

    let matchesDate = true;
    if (dateFilter !== "all") {
      const inspectionDate = new Date(inspection.createdAt);
      const now = new Date();

      switch (dateFilter) {
        case "today":
          matchesDate = inspectionDate.toDateString() === now.toDateString();
          break;
        case "week":
          const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          matchesDate = inspectionDate >= weekAgo;
          break;
        case "month":
          const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
          matchesDate = inspectionDate >= monthAgo;
          break;
      }
    }

    return matchesSearch && matchesType && matchesStatus && matchesDate;
  });

  const summary = generateReportSummary(mockInspections);

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

  const handleExport = async (
    filters: ExportFilters,
    format: "csv" | "excel"
  ) => {
    setIsExporting(true);
    try {
      // Apply filters to mock data
      let filteredInspections = mockInspections;

      if (filters.dateFrom) {
        filteredInspections = filteredInspections.filter(
          (i) => new Date(i.createdAt) >= new Date(filters.dateFrom!)
        );
      }
      if (filters.dateTo) {
        filteredInspections = filteredInspections.filter(
          (i) => new Date(i.createdAt) <= new Date(filters.dateTo!)
        );
      }
      if (filters.equipmentType) {
        filteredInspections = filteredInspections.filter(
          (i) => i.equipmentType === filters.equipmentType
        );
      }
      if (filters.status) {
        filteredInspections = filteredInspections.filter(
          (i) => i.status === filters.status
        );
      }
      if (filters.mechanic) {
        filteredInspections = filteredInspections.filter((i) =>
          i.mechanicName.toLowerCase().includes(filters.mechanic!.toLowerCase())
        );
      }
      if (filters.location) {
        filteredInspections = filteredInspections.filter((i) =>
          i.location.toLowerCase().includes(filters.location!.toLowerCase())
        );
      }

      // Generate export content
      const csvContent = generateCSVContent(filteredInspections);
      const timestamp = new Date().toISOString().split("T")[0];
      const filename = `equipment-inspections-${timestamp}.${format}`;

      // Download file
      downloadCSV(csvContent, filename);

      toast.success(
        `${filteredInspections.length} inspections exported to ${filename}`
      );
    } catch (error) {
      console.error("Export error:", error);
      toast.error("There was an error exporting the data. Please try again.");
    } finally {
      setIsExporting(false);
    }
  };

  // Chart data
  const equipmentTypeData = Object.entries(summary.byEquipmentType).map(
    ([type, count]) => ({
      name: type.charAt(0).toUpperCase() + type.slice(1),
      value: count,
    })
  );

  const statusData = [
    { name: "Approved", value: summary.approved, color: "#10b981" },
    { name: "Rejected", value: summary.rejected, color: "#ef4444" },
    { name: "Pending", value: summary.pending, color: "#f59e0b" },
  ];

  const mechanicData = Object.entries(summary.byMechanic).map(
    ([mechanic, count]) => ({
      name: mechanic.split(" ")[0], // First name only for chart
      inspections: count,
    })
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Reports & Analytics
              </h1>
              <p className="mt-1 text-sm text-gray-600">
                View inspection statistics and export data for analysis
              </p>
            </div>
            <div className="flex space-x-3">
              <ExportDialog onExport={handleExport} isExporting={isExporting} />
              <Button variant="outline">
                <BarChart3 className="w-4 h-4 mr-2" />
                Generate Report
              </Button>
            </div>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Inspections
              </CardTitle>
              <FileSpreadsheet className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{summary.total}</div>
              <p className="text-xs text-muted-foreground">All time</p>
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
              <div className="text-2xl font-bold">{summary.approvalRate}%</div>
              <p className="text-xs text-muted-foreground">
                {summary.approved} of {summary.total} approved
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Mechanics
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Object.keys(summary.byMechanic).length}
              </div>
              <p className="text-xs text-muted-foreground">
                Contributing to inspections
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">This Month</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{summary.total}</div>
              <p className="text-xs text-muted-foreground">
                Inspections completed
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid gap-6 lg:grid-cols-2 mb-8">
          {/* Equipment Type Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Equipment Type Distribution</CardTitle>
              <CardDescription>
                Breakdown of inspections by equipment type
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={equipmentTypeData}
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
                    {equipmentTypeData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={["#0088FE", "#00C49F", "#FFBB28"][index % 3]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

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
        </div>

        {/* Mechanic Performance */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Mechanic Performance</CardTitle>
            <CardDescription>
              Number of inspections completed by each mechanic
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={mechanicData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="inspections" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Inspection Data</CardTitle>
            <CardDescription>
              Detailed view of all inspections with filtering capabilities
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
              <div className="relative">
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
                  <SelectValue placeholder="Date Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">Last 7 Days</SelectItem>
                  <SelectItem value="month">Last 30 Days</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("");
                  setTypeFilter("all");
                  setStatusFilter("all");
                  setDateFilter("all");
                }}
              >
                <Filter className="w-4 h-4 mr-2" />
                Clear
              </Button>
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
                    <th className="text-left p-3 font-medium">Working Hours</th>
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
                        {inspection.workingHours}h
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
              Showing {filteredInspections.length} of {mockInspections.length}{" "}
              inspections
            </div>
          </CardContent>
        </Card>

        {/* Export Options */}
        <Card>
          <CardHeader>
            <CardTitle>Data Export</CardTitle>
            <CardDescription>
              Export inspection data for external analysis
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="p-4 border rounded-lg">
                <div className="flex items-center space-x-3 mb-2">
                  <FileSpreadsheet className="w-6 h-6 text-blue-600" />
                  <h3 className="font-medium">CSV Export</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Export all inspection data in CSV format for use in Excel or
                  other analysis tools.
                </p>
                <ExportDialog
                  onExport={handleExport}
                  isExporting={isExporting}
                />
              </div>
              <div className="p-4 border rounded-lg">
                <div className="flex items-center space-x-3 mb-2">
                  <BarChart3 className="w-6 h-6 text-green-600" />
                  <h3 className="font-medium">Summary Report</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Generate a comprehensive summary report with charts and
                  statistics.
                </p>
                <Button variant="outline" disabled>
                  <Download className="w-4 h-4 mr-2" />
                  Coming Soon
                </Button>
              </div>
              <div className="p-4 border rounded-lg">
                <div className="flex items-center space-x-3 mb-2">
                  <Calendar className="w-6 h-6 text-purple-600" />
                  <h3 className="font-medium">Scheduled Reports</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Set up automated reports to be sent via email on a regular
                  schedule.
                </p>
                <Button variant="outline" disabled>
                  <Calendar className="w-4 h-4 mr-2" />
                  Coming Soon
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
