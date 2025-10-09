"use client";

import React, { useState } from "react"; // Import useState
import { type SupportInspection } from "@/schemas/inspectionSchema"; // Pastikan path ini benar

// Import components for the dropdown
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

// Import your individual form components
import MobileTruckInspectionForm from "./support/MobileTruck";
import CraneTruckInspectionForm from "./support/CraneTruck";
import TowerLampInspectionForm from "./support/TowerLamp";
import GensetInspectionForm from "./support/Genset";
import WeldingMechineInspectionForm from "./support/WeldingMechine";
import CompressorInspectionForm from "./support/Compressor";
import MultiFlowInspectionForm from "./support/MultiFlow";
import DeiciInspectionForm from "./support/Deici";

interface SupportInspectionFormProps {
  onSubmit: (data: any) => void;
  initialData?: Partial<SupportInspection>;
  isSubmitting?: boolean;
}

// Define the types for our dropdown options for better type safety
type SupportFormType =
  | "mobile-truck"
  | "crane-truck"
  | "tower-lamp"
  | "genset"
  | "welding-mechine"
  | "compressor"
  | "multi-flow"
  | "deici";

export function SupportInspectionForm({
  onSubmit,
  initialData,
  isSubmitting = false,
}: SupportInspectionFormProps) {
  // State to manage which form is currently visible
  const [activeForm, setActiveForm] = useState<SupportFormType>("mobile-truck");

  // A helper function to render the correct form based on the state
  const renderActiveForm = () => {
    switch (activeForm) {
      case "mobile-truck":
        return (
          <MobileTruckInspectionForm
            onSubmit={onSubmit}
            isSubmitting={isSubmitting}
          />
        );
      case "crane-truck":
        return (
          <CraneTruckInspectionForm
            onSubmit={onSubmit}
            isSubmitting={isSubmitting}
          />
        );
      case "tower-lamp":
        return (
          <TowerLampInspectionForm
            onSubmit={onSubmit}
            isSubmitting={isSubmitting}
          />
        );
      case "genset":
        return (
          <GensetInspectionForm
            onSubmit={onSubmit}
            isSubmitting={isSubmitting}
          />
        );
      case "welding-mechine":
        return (
          <WeldingMechineInspectionForm
            onSubmit={onSubmit}
            isSubmitting={isSubmitting}
          />
        );
      case "compressor":
        return (
          <CompressorInspectionForm
            onSubmit={onSubmit}
            isSubmitting={isSubmitting}
          />
        );
      case "multi-flow":
        return (
          <MultiFlowInspectionForm
            onSubmit={onSubmit}
            isSubmitting={isSubmitting}
          />
        );
      case "deici":
        return (
          <DeiciInspectionForm
            onSubmit={onSubmit}
            isSubmitting={isSubmitting}
          />
        );
      default:
        return (
          <MobileTruckInspectionForm
            onSubmit={onSubmit}
            isSubmitting={isSubmitting}
          />
        );
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Dropdown for Form Selection */}
      <div className="space-y-2 max-w-sm">
        <Label htmlFor="form-selector">Select Equipment Type</Label>
        <Select
          value={activeForm}
          onValueChange={(value: SupportFormType) => setActiveForm(value)}
        >
          <SelectTrigger id="form-selector">
            <SelectValue placeholder="Select a form..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="mobile-truck">Mobile Truck</SelectItem>
            <SelectItem value="crane-truck">Crane Truck</SelectItem>
            <SelectItem value="tower-lamp">Tower Lamp</SelectItem>
            <SelectItem value="genset">Genset</SelectItem>
            <SelectItem value="welding-mechine">Welding Machine</SelectItem>
            <SelectItem value="compressor">Compressor</SelectItem>
            <SelectItem value="multi-flow">Multi Flow</SelectItem>
            <SelectItem value="deici">Deici</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Render the active form below the dropdown */}
      <div className="mt-6">{renderActiveForm()}</div>
    </div>
  );
}
