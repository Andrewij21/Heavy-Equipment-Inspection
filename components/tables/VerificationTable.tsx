"use client";

import { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Eye,
  Search,
  Filter,
  Clock,
  CheckCircle,
  XCircle,
  MoreHorizontal,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Loader2,
} from "lucide-react";
import Link from "next/link";
// CRITICAL: Use the specific track mutation hook directly
import { useUpdateTrackStatus } from "@/queries/track"; // Assuming path is now lib/api/track

interface PendingInspection {
  id: string;
  equipmentId: string;
  equipmentType: "track" | "wheel" | "support";
  mechanicName: string;
  leaderName: string;
  status:
    | "PENDING"
    | "APPROVED"
    | "REJECTED"
    | "pending"
    | "approved"
    | "rejected";
  createdAt: string;
  location: string;
  priority: "low" | "medium" | "high";
  issues: number;
}

interface VerificationTableProps {
  data: PendingInspection[];
  statusFilter?: string;
}

type SortField = keyof PendingInspection;
type SortDirection = "asc" | "desc";

export function VerificationTable({
  data,
  statusFilter = "all",
}: VerificationTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [equipmentTypeFilter, setEquipmentTypeFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [sortField, setSortField] = useState<SortField>("createdAt");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  // NEW: Initialize the specific track mutation hook
  const updateStatusMutation = useUpdateTrackStatus();

  // Helper functions (normalizeStatus, getStatusIcon, getStatusColor, etc. remain the same)
  const normalizeStatus = (
    status: string
  ): "PENDING" | "APPROVED" | "REJECTED" => {
    const upper = status.toUpperCase();
    if (upper === "PENDING" || upper === "APPROVED" || upper === "REJECTED") {
      return upper as "PENDING" | "APPROVED" | "REJECTED";
    }
    return "PENDING";
  };

  const getStatusIcon = (status: string) => {
    switch (normalizeStatus(status)) {
      case "APPROVED":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "REJECTED":
        return <XCircle className="w-4 h-4 text-red-600" />;
      case "PENDING":
      default:
        return <Clock className="w-4 h-4 text-yellow-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (normalizeStatus(status)) {
      case "APPROVED":
        return "bg-green-100 text-green-800 hover:bg-green-200";
      case "REJECTED":
        return "bg-red-100 text-red-800 hover:bg-red-200";
      case "PENDING":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 hover:bg-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
      case "low":
        return "bg-green-100 text-green-800 hover:bg-green-200";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  };

  const getEquipmentTypeLabel = (type: string) => {
    switch (type) {
      case "track":
        return "Track";
      case "wheel":
        return "Wheel";
      case "support":
        return "Support";
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

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return <ArrowUpDown className="w-4 h-4" />;
    }
    return sortDirection === "asc" ? (
      <ArrowUp className="w-4 h-4" />
    ) : (
      <ArrowDown className="w-4 h-4" />
    );
  };

  const filteredAndSortedData = useMemo(() => {
    // ... (Filtering and sorting logic remains the same) ...
    const filtered = data.filter((inspection) => {
      // Status filter
      const matchesStatus =
        statusFilter === "all" ||
        normalizeStatus(inspection.status) === normalizeStatus(statusFilter);

      // Search filter
      const matchesSearch =
        inspection.equipmentId
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        inspection.mechanicName
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        inspection.location.toLowerCase().includes(searchTerm.toLowerCase());

      // Equipment type filter
      const matchesEquipmentType =
        equipmentTypeFilter === "all" ||
        inspection.equipmentType === equipmentTypeFilter;

      // Priority filter
      const matchesPriority =
        priorityFilter === "all" || inspection.priority === priorityFilter;

      return (
        matchesStatus &&
        matchesSearch &&
        matchesEquipmentType &&
        matchesPriority
      );
    });

    // Sort data
    filtered.sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];

      // Handle date sorting
      if (sortField === "createdAt") {
        aValue = new Date(aValue as string).getTime();
        bValue = new Date(bValue as string).getTime();
      }

      // Handle string sorting
      if (typeof aValue === "string" && typeof bValue === "string") {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (aValue < bValue) {
        return sortDirection === "asc" ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortDirection === "asc" ? 1 : -1;
      }
      return 0;
    });

    return filtered;
  }, [
    data,
    statusFilter,
    searchTerm,
    equipmentTypeFilter,
    priorityFilter,
    sortField,
    sortDirection,
  ]);

  const clearFilters = () => {
    setSearchTerm("");
    setEquipmentTypeFilter("all");
    setPriorityFilter("all");
  };

  // UPDATED: Handle Approval/Rejection Action with conditional API call
  const handleStatusAction = (
    id: string,
    status: "APPROVED" | "REJECTED",
    equipmentType: "track" | "wheel" | "support" // Explicitly use type
  ) => {
    // CONDITIONALLY CALL THE CORRECT API BASED ON TYPE
    if (equipmentType === "track") {
      updateStatusMutation.mutate(
        {
          id: id,
          statusData: { status },
        },
        {
          onSuccess: () => {
            console.log(
              `Track Inspection ${id} successfully updated to ${status}`
            );
            // react-query invalidation handled by hook
          },
          onError: (error) => {
            console.error(`Failed to update track status for ${id}:`, error);
            // Show error notification
          },
        }
      );
    } else {
      // Placeholder for wheel and support: log a warning
      console.warn(
        `Status update for ${equipmentType} (ID: ${id}) is not yet implemented. Action ignored.`
      );
      // You could show an alert/toast to the user here.
    }
  };

  return (
    <div className="space-y-4">
      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 flex-wrap">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search equipment ID, mechanic, location..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select
              value={equipmentTypeFilter}
              onValueChange={setEquipmentTypeFilter}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Equipment Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="track">Track Equipment</SelectItem>
                <SelectItem value="wheel">Wheel Equipment</SelectItem>
                <SelectItem value="support">Support Equipment</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={clearFilters}>
              <Filter className="w-4 h-4 mr-2" />
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[120px]">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("equipmentId")}
                    className="h-auto p-0 font-semibold"
                  >
                    Equipment ID
                    {getSortIcon("equipmentId")}
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("equipmentType")}
                    className="h-auto p-0 font-semibold"
                  >
                    Type
                    {getSortIcon("equipmentType")}
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("mechanicName")}
                    className="h-auto p-0 font-semibold"
                  >
                    Mechanic
                    {getSortIcon("mechanicName")}
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("leaderName")}
                    className="h-auto p-0 font-semibold"
                  >
                    Leader
                    {getSortIcon("leaderName")}
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("status")}
                    className="h-auto p-0 font-semibold"
                  >
                    Status
                    {getSortIcon("status")}
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("createdAt")}
                    className="h-auto p-0 font-semibold"
                  >
                    Created
                    {getSortIcon("createdAt")}
                  </Button>
                </TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAndSortedData.map((inspection) => {
                const isPending =
                  normalizeStatus(inspection.status) === "PENDING";
                // Check if this specific row is the one currently being mutated
                const isMutating =
                  updateStatusMutation.isPending &&
                  updateStatusMutation.variables?.id === inspection.id;

                // Determine if approval buttons should be enabled (only for Track)
                const isTrack = inspection.equipmentType === "track";
                const canFinalize = isPending && isTrack;

                return (
                  <TableRow key={inspection.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium">
                      {inspection.equipmentId}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {getEquipmentTypeLabel(inspection.equipmentType)}
                      </Badge>
                    </TableCell>
                    <TableCell>{inspection.mechanicName}</TableCell>
                    <TableCell>{inspection.leaderName}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(inspection.status)}>
                        {isMutating ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          getStatusIcon(inspection.status)
                        )}
                        <span className="ml-1">
                          {isMutating
                            ? "Updating..."
                            : inspection.status.charAt(0).toUpperCase() +
                              inspection.status.slice(1)}
                        </span>
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {formatDate(inspection.createdAt)}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            className="h-8 w-8 p-0"
                            disabled={isMutating}
                          >
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem asChild>
                            {/* Link should navigate to the specific review page */}
                            <Link href={`/verification/${inspection.id}`}>
                              <Eye className="w-4 h-4 mr-2" />
                              Review Details
                            </Link>
                          </DropdownMenuItem>

                          <DropdownMenuSeparator />

                          {canFinalize ? (
                            <>
                              <DropdownMenuItem
                                onClick={() =>
                                  handleStatusAction(
                                    inspection.id,
                                    "APPROVED",
                                    inspection.equipmentType
                                  )
                                }
                                disabled={isMutating}
                              >
                                <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                                Approve
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() =>
                                  handleStatusAction(
                                    inspection.id,
                                    "REJECTED",
                                    inspection.equipmentType
                                  )
                                }
                                disabled={isMutating}
                              >
                                <XCircle className="w-4 h-4 mr-2 text-red-600" />
                                Reject
                              </DropdownMenuItem>
                            </>
                          ) : isPending && !isTrack ? (
                            <DropdownMenuItem disabled>
                              <Clock className="w-4 h-4 mr-2" />
                              Status API Missing (
                              {getEquipmentTypeLabel(inspection.equipmentType)})
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem disabled>
                              <Clock className="w-4 h-4 mr-2" />
                              Already Finalized
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          {filteredAndSortedData.length === 0 && (
            <div className="text-center py-12">
              <Clock className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium">No inspections found</h3>
              <p className="text-sm text-muted-foreground">
                No inspections match your current filters. Try adjusting your
                search criteria.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
