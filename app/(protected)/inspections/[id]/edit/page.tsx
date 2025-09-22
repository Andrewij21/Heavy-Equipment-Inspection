"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Save } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";

export default function EditInspectionPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    equipmentId: "",
    location: "",
    engineOilLevel: "",
    coolantLevel: "",
    trackTension: "",
    hydraulicPressure: "",
    fuelLevel: "",
    batteryVoltage: "",
    operatingHours: "",
    engineTemp: "",
    hydraulicTemp: "",
    comments: "",
  });

  useEffect(() => {
    // Mock data loading - replace with actual API call
    setTimeout(() => {
      setFormData({
        equipmentId: "TRK-001",
        location: "Site A - Zone 1",
        engineOilLevel: "Good",
        coolantLevel: "Good",
        trackTension: "85",
        hydraulicPressure: "2400",
        fuelLevel: "75",
        batteryVoltage: "12.6",
        operatingHours: "1250",
        engineTemp: "85",
        hydraulicTemp: "65",
        comments:
          "All systems operating within normal parameters. Minor adjustment needed on track tension.",
      });
      setLoading(false);
    }, 500);
  }, [params.id]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // Mock API call - replace with actual API
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success("Inspection updated successfully");

      router.push(`/inspections/${params.id}`);
    } catch (error) {
      toast.error("Failed to update inspection");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.back()}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back</span>
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Edit Inspection</h1>
            <p className="text-gray-600">ID: {params.id}</p>
          </div>
        </div>
        <Button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center space-x-2"
        >
          <Save className="h-4 w-4" />
          <span>{saving ? "Saving..." : "Save Changes"}</span>
        </Button>
      </div>

      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="equipmentId">Equipment ID</Label>
            <Input
              id="equipmentId"
              value={formData.equipmentId}
              onChange={(e) => handleInputChange("equipmentId", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => handleInputChange("location", e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Inspection Data */}
      <Card>
        <CardHeader>
          <CardTitle>Inspection Results</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="engineOilLevel">Engine Oil Level</Label>
            <Input
              id="engineOilLevel"
              value={formData.engineOilLevel}
              onChange={(e) =>
                handleInputChange("engineOilLevel", e.target.value)
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="coolantLevel">Coolant Level</Label>
            <Input
              id="coolantLevel"
              value={formData.coolantLevel}
              onChange={(e) =>
                handleInputChange("coolantLevel", e.target.value)
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="trackTension">Track Tension (%)</Label>
            <Input
              id="trackTension"
              type="number"
              value={formData.trackTension}
              onChange={(e) =>
                handleInputChange("trackTension", e.target.value)
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="hydraulicPressure">Hydraulic Pressure (PSI)</Label>
            <Input
              id="hydraulicPressure"
              type="number"
              value={formData.hydraulicPressure}
              onChange={(e) =>
                handleInputChange("hydraulicPressure", e.target.value)
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="fuelLevel">Fuel Level (%)</Label>
            <Input
              id="fuelLevel"
              type="number"
              value={formData.fuelLevel}
              onChange={(e) => handleInputChange("fuelLevel", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="batteryVoltage">Battery Voltage (V)</Label>
            <Input
              id="batteryVoltage"
              type="number"
              step="0.1"
              value={formData.batteryVoltage}
              onChange={(e) =>
                handleInputChange("batteryVoltage", e.target.value)
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="operatingHours">Operating Hours</Label>
            <Input
              id="operatingHours"
              type="number"
              value={formData.operatingHours}
              onChange={(e) =>
                handleInputChange("operatingHours", e.target.value)
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="engineTemp">Engine Temperature (°C)</Label>
            <Input
              id="engineTemp"
              type="number"
              value={formData.engineTemp}
              onChange={(e) => handleInputChange("engineTemp", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="hydraulicTemp">Hydraulic Temperature (°C)</Label>
            <Input
              id="hydraulicTemp"
              type="number"
              value={formData.hydraulicTemp}
              onChange={(e) =>
                handleInputChange("hydraulicTemp", e.target.value)
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* Comments */}
      <Card>
        <CardHeader>
          <CardTitle>Comments</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={formData.comments}
            onChange={(e) => handleInputChange("comments", e.target.value)}
            placeholder="Add any additional comments or observations..."
            rows={4}
          />
        </CardContent>
      </Card>
    </div>
  );
}
