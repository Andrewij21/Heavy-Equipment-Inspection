"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { useFieldArray, useForm } from "react-hook-form";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  SupportInspectionSchema,
  type SupportInspection,
} from "@/schemas/supportSchema";
import { Input } from "@/components/ui/input";
import { InspectionSection } from "../InspectionSections";
import { useAuth } from "@/context/AuthContext";
import { Trash2 } from "lucide-react";
// Letakkan ini di file WheelInspectionForm.tsx Anda

interface SupportInspectionFormProps {
  onSubmit: (data: SupportInspection) => void;
  initialData?: Partial<SupportInspection>;
  isSubmitting?: boolean;
}

// Gunakan konstanta ini untuk form inspeksi baru Anda
// Gunakan konstanta ini untuk form inspeksi baru Anda
// Gunakan konstanta ini untuk form inspeksi baru Anda
export const formSections = [
  {
    title: "Engine",
    fields: [
      {
        name: "engineOilLevel",
        label: "Check engine oil level & leakage",
        type: "select",
      },
      {
        name: "engineMounting",
        label: "Check engine mounting",
        type: "select",
      },
      {
        name: "engineCoolantLevel",
        label: "Check coolant level & leakage",
        type: "select",
      },
      {
        name: "engineFuelSystem",
        label: "Check fuel system & leakage",
        type: "select",
      },
      {
        name: "engineBeltTension",
        label: "Check all belt tension & related parts",
        type: "select",
      },
      {
        name: "engineFilterConditions",
        label: "Check all filter conditions",
        type: "select",
      },
      {
        name: "engineAirCleaner",
        label: "Check air cleaner (clean if necessary)",
        type: "select",
      },
    ],
  },
  {
    title: "Electric",
    fields: [
      {
        name: "electricTerminals",
        label: "Check terminals and electrode cables",
        type: "select",
      },
      {
        name: "electricIndicators",
        label: "Check all indicators & gauges on the control panel",
        type: "select",
      },
      {
        name: "electricBattery",
        label: "Check battery electrolyte level, terminals & battery cables",
        type: "select",
      },
      {
        name: "electricSwitchMode",
        label: "Check switch modes (off, run, start)",
        type: "select",
      },
      {
        name: "electricBatteryConnection",
        label: "Check battery condition & connection",
        type: "select",
      },
    ],
  },
  {
    title: "Optional",
    fields: [
      {
        name: "optionalApar",
        label: "Check Fire Extinguisher (APAR)",
        type: "select",
      },
    ],
  },
  {
    title: "Add Oil",
    fields: [
      {
        name: "topUpCoolant",
        label: "Coolant",
        type: "qty",
      },
      {
        name: "topUpEngineOil",
        label: "Engine Oil (15W-40)",
        type: "qty",
      },
      {
        name: "topUpCompressor",
        label: "Compressor",
        type: "qty",
      },
    ],
  },
];

export default function CompressorInspectionForm({
  onSubmit,
  initialData,
  isSubmitting = false,
}: SupportInspectionFormProps) {
  const { user } = useAuth();
  const form = useForm<SupportInspection>({
    resolver: zodResolver(SupportInspectionSchema),
    defaultValues: {
      equipmentType: "support",
      supportGeneralType: "Compressor",
      equipmentId: "",
      modelUnit: "",
      location: "",
      operatorName: user?.username || "",
      mechanicName: user?.username || "",
      inspectionDate: new Date().toISOString().split("T")[0],
      inspectionTime: new Date().toTimeString().slice(0, 5),
      workingHours: 0,
      notes: "",
      // Booleans default to false
      findings: [{ description: "", status: "open" }],
      ...initialData,
    },
  });
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "findings",
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Header Information tetap di sini karena strukturnya sedikit berbeda */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Header Information
              <Badge variant="outline">Support Equipment</Badge>
            </CardTitle>
            <CardDescription>
              General equipment and inspection details.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Fields that were already here */}
              <FormField
                control={form.control}
                name="inspectionDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="equipmentId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Unit Number</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., EXC-001" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
             <FormField
                control={form.control}
                name="smr"
                render={({ field }) => (
                  <FormItem>
                    {/* <FormLabel>Time Down</FormLabel> */}
                    <FormLabel>TIME</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Site A" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* ===== NEW FIELDS ADDED HERE ===== */}

              <FormField
                control={form.control}
                name="timeDown"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>HM DOWN</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="timeOut"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>HM RFU</FormLabel>

                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="shift"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Shift</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="w-full">
                        <SelectTrigger>
                          <SelectValue placeholder="Select Shift" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="day">Day</SelectItem>
                        <SelectItem value="night">Night</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="modelUnit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Unit Type</FormLabel>
                    <FormControl>
                      <Input placeholder="CAT 950H" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>
        {/* Me-render semua section secara dinamis */}
        {formSections.map((section) => (
          <InspectionSection
            key={section.title}
            control={form.control}
            title={section.title}
            fields={section.fields}
          />
        ))}
        {/* Tabel untuk Temuan Inspeksi */}
        <Card>
          <CardHeader>
            <CardTitle>Finding Inspection Unit</CardTitle>
            <CardDescription>
              Record any damages or other findings here.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80%]">Finding Description</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {fields.map((field, index) => (
                  <TableRow key={field.id}>
                    <TableCell>
                      <FormField
                        control={form.control}
                        name={`findings.${index}.description`}
                        render={({ field }) => (
                          <Input
                            placeholder="Finding description..."
                            {...field}
                          />
                        )}
                      />
                    </TableCell>
                    <TableCell>
                      <FormField
                        control={form.control}
                        name={`findings.${index}.status`}
                        render={({ field }) => (
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="open">Open</SelectItem>
                              <SelectItem value="close">Close</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        onClick={() => remove(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="mt-4"
              onClick={() => append({ description: "", status: "open" })}
            >
              + Add Finding
            </Button>
          </CardContent>
        </Card>
        {/* Tombol Submit tetap di akhir */}
        <div className="flex justify-end space-x-4">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Inspection"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
