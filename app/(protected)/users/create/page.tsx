// src/app/verification/page.tsx
"use client";

import type React from "react";
// NEW IMPORTS: React Hook Form and Zod
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Save } from "lucide-react";
import { toast } from "sonner";
import BackButton from "@/components/BackButton";
import { useCreateUser } from "@/queries/user";
// Import komponen Form Field dari shadcn/ui
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { createUserSchema, type CreateUserSchema } from "@/schemas/userSchema";

export default function CreateUserPage() {
  const router = useRouter();

  // 2. Inisialisasi useForm
  const form = useForm<CreateUserSchema>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      role: "mechanic",
      employeeId: "",
      contact: "",
      department: null,
    },
  });

  const createUserMutation = useCreateUser();
  const loading = createUserMutation.isPending;

  // Ambil nilai role saat ini untuk rendering kondisional
  const currentRole = form.watch("role");

  // 3. Ganti handleSubmit lama dengan fungsi onSubmit dari useForm
  const onSubmit = (data: CreateUserSchema) => {
    // Pastikan data yang dikirim sesuai dengan skema API
    const userPayload = {
      ...data,
      // Jika departemen kosong (string ""), kirim null ke backend
      department: data.department === "" ? null : data.department,
    };

    // Panggil mutasi
    createUserMutation.mutate(userPayload as any, {
      onSuccess: () => {
        toast.success("Pengguna berhasil dibuat");
        router.push("/users");
      },
      onError: (error) => {
        console.error("Creation Error:", error);
        toast.error("Gagal membuat pengguna", {
          description: "Terjadi kesalahan saat menghubungi server.",
        });
      },
    });
  };

  return (
    <div className="container mx-auto p-6 pt-12 space-y-6 max-w-5xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-x-4">
          <BackButton />
          <h1 className="text-2xl font-bold">Buat Pengguna Baru</h1>
        </div>
      </div>

      {/* 4. Bungkus form dengan komponen Form dari shadcn/ui */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, (e) => console.log({ e }))}
          className=""
        >
          <Card>
            <CardHeader>
              <CardTitle>Informasi Pengguna</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Field: Username */}
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel htmlFor="username">Username *</FormLabel>
                      <FormControl>
                        <Input
                          id="username"
                          placeholder="Contoh: budi_s"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Field: Email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel htmlFor="email">Email *</FormLabel>
                      <FormControl>
                        <Input
                          id="email"
                          type="email"
                          placeholder="Contoh: budi.santoso@example.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Field: Password */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel htmlFor="password">Password *</FormLabel>
                      <FormControl>
                        <Input
                          id="password"
                          type="password"
                          placeholder="Masukkan kata sandi"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Field: ID Karyawan */}
                <FormField
                  control={form.control}
                  name="employeeId"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel htmlFor="employeeId">ID Karyawan *</FormLabel>
                      <FormControl>
                        <Input
                          id="employeeId"
                          placeholder="Contoh: 123456789"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Field: Role (Jabatan) */}
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel htmlFor="role">Jabatan (Role) *</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Pilih peran" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="mechanic">Mekanik</SelectItem>
                          <SelectItem value="leader">Leader</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Field: Kontak */}
                <FormField
                  control={form.control}
                  name="contact"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel htmlFor="contact">Telepon</FormLabel>
                      <FormControl>
                        <Input
                          id="contact"
                          placeholder="Contoh: 081234567890"
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Field Kondisional: Departemen (Hanya untuk Leader) */}
                {currentRole === "leader" && (
                  <FormField
                    control={form.control}
                    name="department"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel htmlFor="department">Departemen *</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value || ""}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Pilih departemen" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="wheel">Roda</SelectItem>
                            <SelectItem value="track">Track</SelectItem>
                            <SelectItem value="support">Dukungan</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                  disabled={loading}
                >
                  Batal
                </Button>
                <Button
                  type="submit"
                  disabled={loading} // useForm menangani validasi wajib
                  className="flex items-center space-x-2"
                >
                  <Save className="h-4 w-4" />
                  <span>{loading ? "Membuat..." : "Buat Pengguna"}</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </Form>
    </div>
  );
}
