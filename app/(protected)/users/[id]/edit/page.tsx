// "use client" since we're using client-side hooks and navigation
"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
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

export default function EditUserPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);

  // Dataset Mock - dalam aplikasi nyata, ganti dengan pengambilan API berdasarkan id
  const mockUsers = useMemo(
    () => [
      {
        id: "1",
        username: "mekanik1",
        email: "mekanik@perusahaan.com",
        fullName: "Jono Mekanik",
        role: "mechanic",
        status: "active",
      },
      {
        id: "2",
        username: "leader1",
        email: "leader@perusahaan.com",
        fullName: "Ani Leader",
        role: "leader",
        status: "active",
      },
      {
        id: "3",
        username: "admin1",
        email: "admin@perusahaan.com",
        fullName: "Pengguna Admin",
        role: "admin",
        status: "active",
      },
    ],
    []
  );

  const [form, setForm] = useState({
    username: "",
    email: "",
    fullName: "",
    role: "mechanic",
    status: "active",
  });

  useEffect(() => {
    const found = mockUsers.find((u) => u.id === id);
    if (found) {
      setForm({
        username: found.username,
        email: found.email,
        fullName: found.fullName,
        role: found.role,
        status: found.status,
      });
    }
  }, [id, mockUsers]);

  const onChange = (key: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const onSave = async () => {
    setIsSaving(true);

    // 2. Tampilkan toast loading dan dapatkan ID-nya
    const toastId = toast.loading("Menyimpan data pengguna...");

    try {
      // Dalam aplikasi nyata, panggil API Anda untuk memperbarui di sini.
      await new Promise((r) => setTimeout(r, 800));

      // 3. Perbarui toast menjadi pesan sukses
      toast.success("Pengguna diperbarui", {
        id: toastId,
        description: `Perubahan disimpan untuk ${form.fullName}`,
      });

      router.push("/users");
    } catch (e) {
      // 4. Perbarui toast menjadi pesan error
      toast.error("Gagal memperbarui", {
        id: toastId,
        description: "Silakan coba lagi.",
      });
    } finally {
      setIsSaving(false);
    }
  };

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
        <Card>
          <CardHeader>
            <CardTitle>Detail Pengguna</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="mb-1" htmlFor="fullName">
                  Nama Lengkap
                </Label>
                <Input
                  id="fullName"
                  value={form.fullName}
                  onChange={(e) => onChange("fullName", e.target.value)}
                  placeholder="Nama lengkap"
                />
              </div>
              <div>
                <Label className="mb-1" htmlFor="username">
                  Username
                </Label>
                <Input
                  id="username"
                  value={form.username}
                  onChange={(e) => onChange("username", e.target.value)}
                  placeholder="Username"
                />
              </div>
              <div>
                <Label className="mb-1" htmlFor="email">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => onChange("email", e.target.value)}
                  placeholder="pengguna@perusahaan.com"
                />
              </div>
              <div>
                <Label className="mb-1">Peran (Role)</Label>
                <Select
                  value={form.role}
                  onValueChange={(v) => onChange("role", v)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih peran" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="leader">Leader</SelectItem>
                    <SelectItem value="mechanic">Mekanik</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="mb-1">Status</Label>
                <Select
                  value={form.status}
                  onValueChange={(v) => onChange("status", v)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Aktif</SelectItem>
                    <SelectItem value="inactive">Nonaktif</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => router.push("/users")}>
                Batal
              </Button>
              <Button onClick={onSave} disabled={isSaving}>
                {isSaving ? "Menyimpan..." : "Simpan Perubahan"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
