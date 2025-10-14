"use client";

import { useState, useEffect } from "react";
// NEW IMPORTS: React Hook Form and Zod
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { User, Edit, Save, X, Loader2, FileText } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// IMPORT HOOKS BARU
import { useGetProfile, useUpdateProfile } from "@/queries/profile";
import type { UpdateUserSchema } from "@/schemas/userSchema";
import {
  ProfileFormSchema,
  type ProfileFormData,
} from "@/schemas/profileSchema";
import { getRoleColor } from "@/lib/utils";

export default function ProfilePage() {
  const { user: authUser } = useAuth(); // Data user dari auth (untuk role/id)
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  // 2. Fetch Data Profil
  const { data: profileData, isLoading, isError } = useGetProfile();
  const user = profileData?.data; // Data profile yang sebenarnya

  // 3. Inisialisasi useForm
  const form = useForm<ProfileFormData>({
    resolver: zodResolver(ProfileFormSchema),
    defaultValues: {
      username: user?.username || authUser?.username || "",
      email: user?.email || authUser?.email || "",
      contact: user?.contact || "",
      employeeId: user?.employeeId || authUser?.employeeId || "N/A",
      password: "", // Password selalu kosong saat inisialisasi
    },
    mode: "onBlur",
  });

  // 4. Sinkronisasi data ke form saat fetching selesai
  useEffect(() => {
    if (user) {
      form.reset({
        username: user.username || "",
        email: user.email || "",
        contact: user.contact || "",
        employeeId: user.employeeId || "N/A",
      });
    }
  }, [user, form]);

  // 5. Inisialisasi hook mutasi
  const updateMutation = useUpdateProfile();
  const isSaving = updateMutation.isPending;

  // 6. Handler Submit (RHF)
  const onSubmit = (data: ProfileFormData) => {
    if (!authUser?.id) {
      toast.error("User session not found.");
      return;
    }

    const toastId = toast.loading("Updating profile...");

    // Buat payload update (hanya field yang diizinkan oleh UpdateUserSchema)
    const payload: UpdateUserSchema = {
      username: data.username,
      email: data.email,
      contact: data.contact || null,
      // Field lain seperti role/password/department tidak diizinkan di form ini
    };
    if (data.password && data.password.length >= 6) {
      payload.password = data.password;
    }
    updateMutation.mutate(payload, {
      onSuccess: (response) => {
        toast.success("Profile updated successfully", { id: toastId });
        setIsEditing(false);

        // Perbarui Auth Context secara lokal menggunakan data respons dari API
        // ASUMSI: API mengembalikan objek user yang sudah diupdate
      },
      onError: (error: any) => {
        console.error("Update error:", error);
        toast.error("Failed to update profile", {
          id: toastId,
          description: error.message || "Please check your network.",
        });
      },
    });
  };

  // Tampilan Loading/Error
  if (isLoading || !authUser) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
        <p className="ml-3 text-lg text-gray-600">Memuat data profil...</p>
      </div>
    );
  }

  if (isError || !user) {
    return (
      <div className="text-red-600 text-center mt-10">
        Kesalahan memuat data profil. Silakan coba lagi.
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-0 py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Profile</h1>
        <div className="flex items-center space-x-2">
          {isEditing ? (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setIsEditing(false);
                  form.reset(form.formState.defaultValues); // Reset ke nilai awal
                }}
                className="flex items-center space-x-2"
                disabled={isSaving}
                type="button"
              >
                <X className="h-4 w-4" />
                <span>Cancel</span>
              </Button>
              <Button
                size="sm"
                onClick={form.handleSubmit(onSubmit)}
                className="flex items-center space-x-2"
                disabled={isSaving}
              >
                <Save className="h-4 w-4" />
                <span>{isSaving ? "Saving..." : "Save"}</span>
              </Button>
            </>
          ) : (
            <Button
              size="sm"
              onClick={() => setIsEditing(true)}
              className="flex items-center space-x-2"
            >
              <Edit className="h-4 w-4" />
              <span>Edit Profile</span>
            </Button>
          )}
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Profile Information */}
            <div className="lg:col-span-2 space-y-6">
              {/* Basic Info */}
              <Card>
                {/* <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                </CardHeader> */}
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-grow space-y-2">
                      <div className="flex items-center gap-4">
                        <h1 className="text-2xl font-bold">{user?.username}</h1>
                        <Badge className={getRoleColor(user?.role || "")}>
                          {user?.role &&
                            user?.role.charAt(0).toUpperCase() +
                              user?.role.slice(1)}
                        </Badge>
                      </div>
                      <div className="flex items-center text-muted-foreground text-sm">
                        <p>{user?.email}</p>
                      </div>
                      <div className="flex items-center text-muted-foreground text-sm">
                        <p>Employee ID: {user?.employeeId}</p>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Field: Username */}
                    <FormField
                      control={form.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel htmlFor="username">
                            Full Name (Username)
                          </FormLabel>
                          <FormControl>
                            {isEditing ? (
                              <Input id="username" {...field} />
                            ) : (
                              <p className="p-2 bg-gray-50 rounded">
                                {field.value}
                              </p>
                            )}
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
                          <FormLabel htmlFor="email">Email</FormLabel>
                          <FormControl>
                            {isEditing ? (
                              <Input id="email" type="email" {...field} />
                            ) : (
                              <p className="p-2 bg-gray-50 rounded">
                                {field.value}
                              </p>
                            )}
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Field: Contact / Phone */}
                    <FormField
                      control={form.control}
                      name="contact"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel htmlFor="contact">Phone</FormLabel>
                          <FormControl>
                            {isEditing ? (
                              <Input
                                id="contact"
                                {...field}
                                value={field.value || ""}
                              />
                            ) : (
                              <p className="p-2 bg-gray-50 rounded">
                                {field.value || "N/A"}
                              </p>
                            )}
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel htmlFor="password">
                            New Password (Optional)
                          </FormLabel>
                          <FormControl>
                            {isEditing ? (
                              <Input
                                id="password"
                                type="password"
                                placeholder="Leave blank to keep current password"
                                {...field}
                              />
                            ) : (
                              // Display placeholder when not editing
                              <p className="p-2 bg-gray-50 rounded text-muted-foreground">
                                ********
                              </p>
                            )}
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions (Statistics) */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {authUser?.role === "mechanic" && (
                    <>
                      <Button
                        variant="outline"
                        className="w-full justify-start bg-transparent"
                        onClick={() => router.push("/inspections/new")}
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        New Inspection
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start bg-transparent"
                        onClick={() => router.push("/inspections")}
                      >
                        <User className="h-4 w-4 mr-2" />
                        My Inspections
                      </Button>
                    </>
                  )}
                  {authUser?.role === "leader" && (
                    <>
                      <Button
                        variant="outline"
                        className="w-full justify-start bg-transparent"
                        onClick={() => router.push("/verification")}
                      >
                        <FileText className="h-4 w-4 mr-2" />
                        Review Inspections
                      </Button>
                    </>
                  )}
                  {authUser?.role === "admin" && (
                    <>
                      <Button
                        variant="outline"
                        className="w-full justify-start bg-transparent"
                        onClick={() => router.push("/users")}
                      >
                        <User className="h-4 w-4 mr-2" />
                        User Management
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start bg-transparent"
                        onClick={() => router.push("/reports")}
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        System Reports
                      </Button>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
