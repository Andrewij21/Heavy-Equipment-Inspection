"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Download, FileSpreadsheet, Filter } from "lucide-react";
import type { ExportFilters } from "@/lib/exportUtils";

interface ExportDialogProps {
  onExport: (filters: ExportFilters, format: "csv" | "excel") => void;
  isExporting?: boolean;
}

export function ExportDialog({
  onExport,
  isExporting = false,
}: ExportDialogProps) {
  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useState<ExportFilters>({});
  const [format, setFormat] = useState<"csv" | "excel">("csv");
  const [includeAll, setIncludeAll] = useState(true);

  const handleExport = () => {
    onExport(includeAll ? {} : filters, format);
    setOpen(false);
  };

  const resetFilters = () => {
    setFilters({});
    setIncludeAll(true);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Download className="w-4 h-4 mr-2" />
          Export Data
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Export Inspection Data</DialogTitle>
          <DialogDescription>
            Configure your export settings and download inspection data for
            analysis.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Export Format */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Export Format</CardTitle>
              <CardDescription>
                Choose the format for your exported data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    format === "csv"
                      ? "border-primary bg-primary/5"
                      : "border-border hover:bg-muted/50"
                  }`}
                  onClick={() => setFormat("csv")}
                >
                  <div className="flex items-center space-x-3">
                    <FileSpreadsheet className="w-6 h-6" />
                    <div>
                      <h3 className="font-medium">CSV File</h3>
                      <p className="text-sm text-muted-foreground">
                        Compatible with Excel and other tools
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    format === "excel"
                      ? "border-primary bg-primary/5"
                      : "border-border hover:bg-muted/50"
                  }`}
                  onClick={() => setFormat("excel")}
                >
                  <div className="flex items-center space-x-3">
                    <FileSpreadsheet className="w-6 h-6" />
                    <div>
                      <h3 className="font-medium">Excel File</h3>
                      <p className="text-sm text-muted-foreground">
                        Native Excel format with formatting
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Data Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Data Selection</CardTitle>
              <CardDescription>
                Choose which inspections to include
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="include-all"
                  checked={includeAll}
                  onCheckedChange={(checked) =>
                    setIncludeAll(checked as boolean)
                  }
                />
                <Label htmlFor="include-all">Include all inspections</Label>
              </div>

              {!includeAll && (
                <div className="space-y-4 pl-6 border-l-2 border-muted">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Filter className="w-4 h-4" />
                    <span>Apply filters to customize your export</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="date-from">Date From</Label>
                      <Input
                        id="date-from"
                        type="date"
                        value={filters.dateFrom || ""}
                        onChange={(e) =>
                          setFilters({ ...filters, dateFrom: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="date-to">Date To</Label>
                      <Input
                        id="date-to"
                        type="date"
                        value={filters.dateTo || ""}
                        onChange={(e) =>
                          setFilters({ ...filters, dateTo: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="equipment-type">Equipment Type</Label>
                      <Select
                        value={filters.equipmentType || "all"}
                        onValueChange={(value) =>
                          setFilters({
                            ...filters,
                            equipmentType: value || undefined,
                          })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="All types" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All types</SelectItem>
                          <SelectItem value="track">Track Equipment</SelectItem>
                          <SelectItem value="wheel">Wheel Equipment</SelectItem>
                          <SelectItem value="support">
                            Support Equipment
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="status">Status</Label>
                      <Select
                        value={filters.status || "all"}
                        onValueChange={(value) =>
                          setFilters({ ...filters, status: value || undefined })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="All statuses" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All statuses</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="approved">Approved</SelectItem>
                          <SelectItem value="rejected">Rejected</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="mechanic">Mechanic</Label>
                      <Input
                        id="mechanic"
                        placeholder="Filter by mechanic name"
                        value={filters.mechanic || ""}
                        onChange={(e) =>
                          setFilters({
                            ...filters,
                            mechanic: e.target.value || undefined,
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        placeholder="Filter by location"
                        value={filters.location || ""}
                        onChange={(e) =>
                          setFilters({
                            ...filters,
                            location: e.target.value || undefined,
                          })
                        }
                      />
                    </div>
                  </div>

                  <Button variant="outline" size="sm" onClick={resetFilters}>
                    Clear Filters
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleExport} disabled={isExporting}>
            {isExporting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary mr-2"></div>
                Exporting...
              </>
            ) : (
              <>
                <Download className="w-4 h-4 mr-2" />
                Export {format.toUpperCase()}
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
