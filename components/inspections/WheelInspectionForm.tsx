"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  wheelInspectionSchema,
  type WheelInspection,
} from "@/schemas/inspectionSchema"; // Pastikan path ini benar
import { Button } from "@/components/ui/button";
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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

// Komponen helper untuk Select agar tidak menulis kode berulang
const ConditionSelect = ({
  field,
  placeholder,
}: {
  field: any;
  placeholder?: string;
}) => (
  <Select onValueChange={field.onChange} defaultValue={field.value}>
    <FormControl className="w-full">
      <SelectTrigger>
        <SelectValue placeholder={placeholder || "Pilih Kondisi"} />
      </SelectTrigger>
    </FormControl>
    <SelectContent>
      <SelectItem value="good">Good / Baik</SelectItem>
      <SelectItem value="repaired">Bad / Repaired required</SelectItem>
      <SelectItem value="bad">Bad / Rusak</SelectItem>
      <SelectItem value="na">N/A (Tidak Tersedia)</SelectItem>
    </SelectContent>
  </Select>
);

interface WheelInspectionFormProps {
  onSubmit: (data: WheelInspection) => void;
  initialData?: Partial<WheelInspection>;
  isSubmitting?: boolean;
}

export function WheelInspectionForm({
  onSubmit,
  initialData,
  isSubmitting = false,
}: WheelInspectionFormProps) {
  const form = useForm<WheelInspection>({
    resolver: zodResolver(wheelInspectionSchema),
    defaultValues: {
      equipmentType: "wheel",
      equipmentId: "",
      modelUnit: "",
      location: "",
      operatorName: "",
      mechanicName: "",
      inspectionDate: new Date().toISOString().split("T")[0],
      inspectionTime: new Date().toTimeString().slice(0, 5),
      workingHours: 0,
      notes: "",
      // Booleans default to false
      engineOilLeakage: false,
      coolantLeakage: false,
      transmissionLeakage: false,
      hydraulicLeakage: false,
      engineOilTopUp: false,
      transmissionOilTopUp: false,
      hydraulicOilTopUp: false,
      differentialOilTopUp: false,
      steeringFluidTopUp: false,
      greaseTopUp: false,
      coolantTopUp: false,
      ...initialData,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* ======================================================================= */}
        {/* HEADER INFORMATION */}
        {/* ======================================================================= */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Header Information
              <Badge variant="outline">Wheel Equipment</Badge>
            </CardTitle>
            <CardDescription>
              CN Unit, model, location, personnel, date & HM
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="equipmentId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CN Unit</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., WHL-001" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="modelUnit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Model Unit</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., CAT 950H" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        {/* ======================================================================= */}
        {/* A. ENGINE SYSTEM */}
        {/* ======================================================================= */}
        <Card>
          <CardHeader>
            <CardTitle>A. Engine System</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="engineOilLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Check engine oil level & any leakage</FormLabel>
                    <ConditionSelect field={field} />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="engineMounting"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Check engine mounting & fitting parts</FormLabel>
                    <ConditionSelect field={field} />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="coolantLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Check water coolant level & any lekage
                    </FormLabel>
                    <ConditionSelect field={field} />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="fuelSystem"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Check fuel system & any leakage</FormLabel>
                    <ConditionSelect field={field} />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="beltTension"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Check all -belt tension & related parts
                    </FormLabel>
                    <ConditionSelect field={field} />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="airIntakeExhaust"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Check air intake & exhaust connection</FormLabel>
                    <ConditionSelect field={field} />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        {/* ======================================================================= */}
        {/* B. POWERTRAIN (TRANSMISSION & AXLE) */}
        {/* ======================================================================= */}
        <Card>
          <CardHeader>
            <CardTitle>B. Powertrain (Transmission & Axle)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="transmissionOilLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Check oil level and any leakage</FormLabel>
                    <ConditionSelect field={field} />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="clutchFunction"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Check Clutch Function & Wear Pad Clutch
                    </FormLabel>
                    <ConditionSelect field={field} />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="universalJoint"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Check Universal Joint</FormLabel>
                    <ConditionSelect field={field} />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        {/* ======================================================================= */}
        {/* C. HYDRAULIC SYSTEM */}
        {/* ======================================================================= */}
        <Card>
          <CardHeader>
            <CardTitle>C. Hydraulic System</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="hydraulicOilLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Check hydraulic oil level</FormLabel>
                    <ConditionSelect field={field} />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="hydraulicCylinder"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Check hydraulic cylinder & connection condition
                    </FormLabel>
                    <ConditionSelect field={field} />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="hydraulicPump"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Check any leakage from Pump, Motor,PTO, Hose/ piping
                      connection
                    </FormLabel>
                    <ConditionSelect field={field} />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="hydraulicControlValve"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Check leak's from control valve</FormLabel>
                    <ConditionSelect field={field} />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        {/* ======================================================================= */}
        {/* F. ATTACHMENT & STRUCTURE */}
        {/* ======================================================================= */}
        <Card>
          <CardHeader>
            <CardTitle>F. Attachment & Structure</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="dumpBody"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Check Dump Body, Pin, Pad, Stabilizer, tail gate & vesel
                    </FormLabel>
                    <ConditionSelect field={field} />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="safetyDumpFunction"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Check Safety Dump Function</FormLabel>
                    <ConditionSelect field={field} />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="centralGrease"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Check Cental Grease</FormLabel>
                    <ConditionSelect field={field} />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="allGreasingPoints"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Check All Greasing Point Area</FormLabel>
                    <ConditionSelect field={field} />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        {/* ======================================================================= */}
        {/* G. TOP-UP CHECKLIST */}
        {/* ======================================================================= */}
        <Card>
          <CardHeader>
            <CardTitle>G. Top-Up Lubricant & Coolant</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="engineOilTopUp"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>Engine Oil (SAE 15W-40)</FormLabel>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="transmissionOilTopUp"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>Transmission (RORED EPA 90)</FormLabel>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="hydraulicOilTopUp"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>Hydraulic (TURALIK 46)</FormLabel>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="differentialOilTopUp"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>Differential (85W-140)</FormLabel>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="steeringFluidTopUp"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>Steering (ATF 220)</FormLabel>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="greaseTopUp"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>Grease (V220)</FormLabel>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="coolantTopUp"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>Coolant</FormLabel>
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>
        {/* ======================================================================= */}
        {/* SUBMIT BUTTONS */}
        {/* ======================================================================= */}
        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline">
            Save as Draft
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Inspection"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
