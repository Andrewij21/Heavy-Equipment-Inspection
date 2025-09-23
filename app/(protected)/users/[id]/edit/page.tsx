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
export default function EditUserPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);

  // Mocked dataset — in real app, replace with API fetch by id
  const mockUsers = useMemo(
    () => [
      {
        id: "1",
        username: "mechanic1",
        email: "mechanic@company.com",
        fullName: "John Mechanic",
        role: "mechanic",
        status: "active",
      },
      {
        id: "2",
        username: "leader1",
        email: "leader@company.com",
        fullName: "Jane Leader",
        role: "leader",
        status: "active",
      },
      {
        id: "3",
        username: "admin1",
        email: "admin@company.com",
        fullName: "Admin User",
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

    // 2. Show a loading toast and get its ID
    const toastId = toast.loading("Saving user data...");

    try {
      // In a real app, call your API to update here.
      await new Promise((r) => setTimeout(r, 800));

      // 3. Update the toast to a success message
      toast.success("User updated", {
        id: toastId,
        description: `Changes saved for ${form.fullName}`,
      });

      router.push("/users");
    } catch (e) {
      // 4. Update the toast to an error message
      toast.error("Update failed", {
        id: toastId,
        description: "Please try again.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-3xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Edit User</h1>
          <p className="text-sm text-gray-600 mt-1">
            Update profile and permissions for this user
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>User Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  value={form.fullName}
                  onChange={(e) => onChange("fullName", e.target.value)}
                  placeholder="Full name"
                />
              </div>
              <div>
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  value={form.username}
                  onChange={(e) => onChange("username", e.target.value)}
                  placeholder="Username"
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => onChange("email", e.target.value)}
                  placeholder="user@company.com"
                />
              </div>
              <div>
                <Label>Role</Label>
                <Select
                  value={form.role}
                  onValueChange={(v) => onChange("role", v)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="leader">Leader</SelectItem>
                    <SelectItem value="mechanic">Mechanic</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Status</Label>
                <Select
                  value={form.status}
                  onValueChange={(v) => onChange("status", v)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => router.push("/users")}>
                Cancel
              </Button>
              <Button onClick={onSave} disabled={isSaving}>
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
