"use client";

import React from "react"; // Import useState

import type { TyreInspection } from "@/schemas/tyreSchema";
import TyreDetailsInspectionForm from "./tyre/TyreDetailsInspectionForm";

interface SupportInspectionFormProps {
  onSubmit: (data: any) => void;
  initialData?: Partial<TyreInspection>;
  isSubmitting?: boolean;
}

export function TyreInspectionForm({
  onSubmit,
  initialData,
  isSubmitting = false,
}: SupportInspectionFormProps) {
  return (
    <div className="w-full space-y-6">
      <TyreDetailsInspectionForm
        onSubmit={onSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
