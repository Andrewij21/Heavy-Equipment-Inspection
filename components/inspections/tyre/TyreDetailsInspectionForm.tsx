"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2 } from "lucide-react";
import {
  TyreInspectionSchema,
  type TyreInspection,
} from "@/schemas/tyreSchema";
import { useAuth } from "@/context/AuthContext";

interface TyreInspectionFormProps {
  onSubmit: (data: any) => void;
  initialData?: Partial<TyreInspection>;
  isSubmitting?: boolean;
}
export default function TyreDetailsInspectionForm({
  onSubmit,
  initialData,
  isSubmitting = false,
}: TyreInspectionFormProps) {
  const { user } = useAuth();

  const form = useForm<TyreInspection>({
    resolver: zodResolver(TyreInspectionSchema),
    defaultValues: {
      equipmentId: "-",
      modelUnit: "-",
      location: "-",
      operatorName: user?.username || "",
      mechanicName: user?.username || "",
      inspectionDate: new Date().toISOString().split("T")[0],
      inspectionTime: new Date().toTimeString().slice(0, 5),
      smr: "-",
      timeDown: "-",
      timeOut: "-",
      shift: "day",
      // Inisialisasi 'tyreDetails' sebagai array kosong
      tyreDetails: [
        {
          position: "",
          serialNumber: "",
          brand: "",
          pattern: "",
          rtd: "",
          pressure: "",
          problem: "",
          action: "",
          manpower: "",
        },
      ],
      // Inisialisasi field lain dari Zod
      equipmentType: "tyre",
      workingHours: 0,
      formNumber: "",
      revision: "",
      hm: "",
      size: "",
      dateOfIssue: "",
    },
  });

  // 3. Gunakan `useFieldArray` untuk mengelola field dinamis
  const {
    fields: tyreFields,
    append: appendTyre,
    remove: removeTyre,
  } = useFieldArray({
    control: form.control,
    name: "tyreDetails", // Nama field array di Zod schema
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, (e) => console.log({ e }))}
        className="space-y-6"
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Header Information
              <Badge variant="outline">Tyre Inspection</Badge>
            </CardTitle>
            <CardDescription>
              General equipment and inspection details.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <FormField
                name="inspectionDate"
                control={form.control}
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
                name="equipmentId"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Unit Number</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., HD-785" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="hm"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>HM (Hour Meter)</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="e.g., 12345" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="size"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Size</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 27.00 R49" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="formNumber"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>No Formulir</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="e.g., FM-MTC-01"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="revision"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Revisi</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="e.g., 00" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="dateOfIssue"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tanggal Terbit</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>
        {tyreFields.map((item, index) => (
          <Card key={item.id}>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Tyre Record #{index + 1}</CardTitle>
                <CardDescription>
                  Details for one specific tyre.
                </CardDescription>
              </div>
              <Button
                type="button"
                variant="destructive"
                size="icon"
                disabled={tyreFields.length === 1}
                onClick={() => removeTyre(index)}
              >
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Remove Tyre Record</span>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name={`tyreDetails.${index}.position`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Position</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., Front Left"
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`tyreDetails.${index}.serialNumber`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Serial Number (SN)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Serial Number"
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`tyreDetails.${index}.brand`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Brand</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Tyre Brand"
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`tyreDetails.${index}.pattern`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pattern</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Tyre Pattern"
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`tyreDetails.${index}.rtd`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>RTD</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Remaining Tread Depth"
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`tyreDetails.${index}.pressure`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pressure</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., 100 PSI"
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`tyreDetails.${index}.problem`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Problem</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Describe the problem"
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`tyreDetails.${index}.action`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Action</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Action taken"
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`tyreDetails.${index}.manpower`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Manpower</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Mechanic name"
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Tombol untuk menambah card baru */}
        <Button
          type="button"
          variant="outline"
          onClick={() =>
            appendTyre({
              position: "",
              serialNumber: "",
              brand: "",
              pattern: "",
              rtd: "",
              pressure: "",
              problem: "",
              action: "",
              manpower: "",
            })
          }
        >
          + Add Tyre Record
        </Button>

        {/* Tombol Submit Utama */}
        <div className="flex justify-end">
          <Button type="submit">Submit Inspection</Button>
        </div>
      </form>
    </Form>
  );
}
