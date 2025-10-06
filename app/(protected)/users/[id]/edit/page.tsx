// "use client" since we're using client-side hooks and navigation
"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

// NEW IMPORTS: React Hook Form and Zod
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import BackButton from "@/components/BackButton";
import { Loader2 } from "lucide-react";

// Import komponen Form Field dari shadcn/ui
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// Import Hooks dari API
import { useGetUser, useUpdateUser } from "@/queries/user";
import {
  updateUserSchema,
  type UpdateUserSchema,
  type User,
} from "@/schemas/userSchema"; // Asumsi path schema

export default function EditUserPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  // 2. Fetch data pengguna yang ada
  const {
    data: userData,
    isLoading: isFetching,
    isError: isFetchError,
  } = useGetUser(id);
  console.log({ userData });
  const user: User | undefined = userData?.data; // Asumsi API mengembalikan array

  // 3. Inisialisasi useForm
  const form = useForm<UpdateUserSchema>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      username: "",
      email: "",
      role: user?.role || "mechanic",
      employeeId: "",
      contact: null,
      department: user?.department || "track",
    },
    // Mode re-validate untuk form edit
    // mode: "onBlur",
  });

  // 4. Sinkronisasi data yang diambil ke form (setelah loading selesai)
  useEffect(() => {
    if (user) {
      setTimeout(() => {
        form.reset({
          username: user.username,
          email: user.email,
          role: user.role,
          employeeId: user.employeeId,
          contact: user.contact || "",
          department: user.department || null,
        });
      }, 500);
    }
  }, [user, form]);

  // 5. Inisialisasi hook mutasi update
  const updateMutation = useUpdateUser();
  const isSaving = updateMutation.isPending;

  // 6. Ambil nilai role saat ini untuk rendering kondisional
  const currentRole = form.watch("role");

  // 7. Handler Submit
  const onSubmit = (data: UpdateUserSchema) => {
    const toastId = toast.loading("Menyimpan data pengguna...");

    // Buat payload bersih: hanya sertakan fields yang diubah atau fields wajib
    const payload: UpdateUserSchema = {};

    // Map fields dari form data ke payload API, hanya jika ada perubahan atau diisi
    if (data.username) payload.username = data.username;
    if (data.email) payload.email = data.email;
    if (data.role) payload.role = data.role;
    if (data.employeeId) payload.employeeId = data.employeeId;

    // Perlakuan khusus untuk password
    if (data.password && data.password.length >= 6) {
      payload.password = data.password;
    }

    // Perlakuan khusus untuk department (set null jika bukan leader atau jika string kosong)
    if (data.role === "leader") {
      payload.department = data.department || null;
    } else {
      payload.department = null; // Hapus department jika bukan leader
    }

    // Perlakuan khusus untuk contact (set null jika string kosong)
    payload.contact = data?.contact || "";
    console.log({ payload });
    // Panggil mutasi
    updateMutation.mutate(
      { userId: id, userData: payload },
      {
        onSuccess: () => {
          toast.success("Pengguna diperbarui", {
            id: toastId,
            description: `Perubahan disimpan untuk ${data.username}`,
          });
          router.push("/users");
        },
        onError: (error) => {
          console.error("Update Error:", error);
          toast.error("Gagal memperbarui", {
            id: toastId,
            description: "Terjadi kesalahan saat menyimpan data.",
          });
        },
      }
    );
  };

  // Tampilan Loading/Error
  if (isFetching) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
        <p className="ml-3 text-lg text-gray-600">Memuat detail pengguna...</p>
      </div>
    );
  }

  if (isFetchError || !user) {
    return (
      <div className="text-red-600 text-center mt-10">
        Kesalahan memuat data pengguna, atau pengguna tidak ditemukan.
      </div>
    );
  }

  // Tampilan Form
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-3xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-x-4">
          <BackButton />
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Edit Pengguna</h1>
            <p className="text-sm text-gray-600 mt-1">
              Perbarui profil dan izin untuk pengguna ini
            </p>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Card>
              <CardHeader>
                <CardTitle>Detail Pengguna</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Field: Username */}
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username *</FormLabel>
                        <FormControl>
                          <Input placeholder="Username" {...field} />
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
                      <FormItem>
                        <FormLabel>Email *</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="pengguna@perusahaan.com"
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
                      <FormItem>
                        <FormLabel>ID Karyawan *</FormLabel>
                        <FormControl>
                          <Input placeholder="Contoh: MECH-001" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Field: Kontak */}
                  <FormField
                    control={form.control}
                    name="contact"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Telepon</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Contoh: 08123..."
                            {...field}
                            value={field.value || ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Field: Peran (Role) */}
                  <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Peran (Role)</FormLabel>
                        <Select
                          // PASTIKAN {...field} ADA DI SINI
                          {...field}
                          onValueChange={field.onChange} // Redundant, tapi lebih aman jika bingung
                          value={field.value} // Redundant, tapi lebih aman jika bingung
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Pilih peran" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="admin">Admin</SelectItem>
                            <SelectItem value="leader">Leader</SelectItem>
                            <SelectItem value="mechanic">Mekanik</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Field: Status
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Pilih status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="active">Aktif</SelectItem>
                            <SelectItem value="inactive">Nonaktif</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  /> */}

                  {/* Field Kondisional: Departemen */}
                  {currentRole === "leader" && (
                    <FormField
                      control={form.control}
                      name="department"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Departemen</FormLabel>
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

                  {/* Field: Password Baru (Opsional) */}
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="password">
                          Password Baru (Opsional)
                        </FormLabel>
                        <FormControl>
                          <Input
                            id="password"
                            type="password"
                            placeholder="Kosongkan jika tidak ingin diubah"
                            {...field}
                            value={field.value || ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex justify-end gap-3">
                  <Button
                    variant="outline"
                    onClick={() => router.push("/users")}
                    disabled={isSaving}
                  >
                    Batal
                  </Button>
                  <Button type="submit" disabled={isSaving}>
                    {isSaving ? "Menyimpan..." : "Simpan Perubahan"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </form>
        </Form>
      </main>
    </div>
  );
}
