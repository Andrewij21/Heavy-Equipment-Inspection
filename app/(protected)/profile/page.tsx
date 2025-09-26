"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { User, MapPin, Calendar, Edit, Save, X, Mail } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: user?.username || "",
    email: user?.email || "",
    contact: user?.contact || "",
    bio: "Experienced heavy equipment mechanic with 8+ years in the field.",
    employeeId: "EMP-001",
    department: "Maintenance",
    joinDate: "2020-03-15",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      // Mock API call - replace with actual API
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success("Profile updated successfully");

      setIsEditing(false);
    } catch (error) {
      toast.error("Failed to update profile");
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-purple-100 text-purple-800";
      case "leader":
        return "bg-blue-100 text-blue-800";
      case "mechanic":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getRoleStats = () => {
    switch (user?.role) {
      case "mechanic":
        return [
          { label: "Inspections Completed", value: "127" },
          { label: "This Month", value: "18" },
          { label: "Approval Rate", value: "94%" },
          { label: "Average Time", value: "45 min" },
        ];
      case "leader":
        return [
          { label: "Inspections Reviewed", value: "89" },
          { label: "Pending Review", value: "12" },
          { label: "Team Members", value: "8" },
          { label: "Approval Rate", value: "87%" },
        ];
      case "admin":
        return [
          { label: "Total Users", value: "45" },
          { label: "Active Inspections", value: "23" },
          { label: "System Uptime", value: "99.9%" },
          { label: "Reports Generated", value: "156" },
        ];
      default:
        return [];
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Profile</h1>
        <div className="flex items-center space-x-2">
          {isEditing ? (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditing(false)}
                className="flex items-center space-x-2"
              >
                <X className="h-4 w-4" />
                <span>Cancel</span>
              </Button>
              <Button
                size="sm"
                onClick={handleSave}
                className="flex items-center space-x-2"
              >
                <Save className="h-4 w-4" />
                <span>Save</span>
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                {/* <Avatar className="h-24 w-24">
                  <AvatarImage src={""} />
                  <AvatarFallback className="text-3xl">
                    {user?.username
                      ?.split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar> */}

                {/* Informasi Pengguna */}
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
                    <p>User ID: {user?.id}</p>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Full Name</Label>
                  {isEditing ? (
                    <Input
                      id="username"
                      value={formData.username}
                      onChange={(e) =>
                        handleInputChange("username", e.target.value)
                      }
                    />
                  ) : (
                    <p className="p-2 bg-gray-50 rounded">
                      {formData.username}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  {isEditing ? (
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                    />
                  ) : (
                    <p className="p-2 bg-gray-50 rounded">{formData.email}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact">Phone</Label>
                  {isEditing ? (
                    <Input
                      id="contact"
                      value={formData.contact}
                      onChange={(e) =>
                        handleInputChange("contact", e.target.value)
                      }
                    />
                  ) : (
                    <p className="p-2 bg-gray-50 rounded">{formData.contact}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Work Information */}
        </div>

        {/* Statistics */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {user?.role === "mechanic" && (
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
              {user?.role === "leader" && (
                <>
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-transparent"
                    onClick={() => router.push("/veriication")}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Review Inspections
                  </Button>
                </>
              )}
              {user?.role === "admin" && (
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
    </div>
  );
}
