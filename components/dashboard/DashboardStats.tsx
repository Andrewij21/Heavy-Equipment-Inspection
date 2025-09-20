"use client";

import type React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, CheckCircle, Clock, AlertTriangle } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

function StatsCard({ title, value, description, icon, trend }: StatsCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
        {trend && (
          <div
            className={`text-xs ${
              trend.isPositive ? "text-green-600" : "text-red-600"
            } mt-1`}
          >
            {trend.isPositive ? "+" : ""}
            {trend.value}% from last month
          </div>
        )}
      </CardContent>
    </Card>
  );
}

interface DashboardStatsProps {
  userRole: "mechanic" | "leader" | "admin";
}

export function DashboardStats({ userRole }: DashboardStatsProps) {
  // Mock data - replace with real data from API
  const getStatsForRole = () => {
    switch (userRole) {
      case "mechanic":
        return [
          {
            title: "Total Inspections",
            value: 24,
            description: "Completed this month",
            icon: <FileText className="h-4 w-4 text-muted-foreground" />,
            trend: { value: 12, isPositive: true },
          },
          {
            title: "Pending Review",
            value: 3,
            description: "Awaiting leader approval",
            icon: <Clock className="h-4 w-4 text-muted-foreground" />,
          },
          {
            title: "Approved",
            value: 21,
            description: "Successfully verified",
            icon: <CheckCircle className="h-4 w-4 text-muted-foreground" />,
            trend: { value: 8, isPositive: true },
          },
          {
            title: "Issues Found",
            value: 5,
            description: "Equipment requiring attention",
            icon: <AlertTriangle className="h-4 w-4 text-muted-foreground" />,
          },
        ];

      case "leader":
        return [
          {
            title: "Pending Reviews",
            value: 12,
            description: "Inspections awaiting verification",
            icon: <Clock className="h-4 w-4 text-muted-foreground" />,
          },
          {
            title: "Reviewed Today",
            value: 8,
            description: "Inspections processed",
            icon: <CheckCircle className="h-4 w-4 text-muted-foreground" />,
          },
          {
            title: "Team Inspections",
            value: 156,
            description: "Total this month",
            icon: <FileText className="h-4 w-4 text-muted-foreground" />,
            trend: { value: 15, isPositive: true },
          },
          {
            title: "Critical Issues",
            value: 3,
            description: "Requiring immediate attention",
            icon: <AlertTriangle className="h-4 w-4 text-muted-foreground" />,
          },
        ];

      case "admin":
        return [
          {
            title: "Total Inspections",
            value: 1247,
            description: "All time completed",
            icon: <FileText className="h-4 w-4 text-muted-foreground" />,
            trend: { value: 18, isPositive: true },
          },
          {
            title: "Active Users",
            value: 45,
            description: "Mechanics and leaders",
            icon: <CheckCircle className="h-4 w-4 text-muted-foreground" />,
          },
          {
            title: "This Month",
            value: 234,
            description: "Inspections completed",
            icon: <Clock className="h-4 w-4 text-muted-foreground" />,
            trend: { value: 22, isPositive: true },
          },
          {
            title: "Equipment Issues",
            value: 18,
            description: "Requiring maintenance",
            icon: <AlertTriangle className="h-4 w-4 text-muted-foreground" />,
          },
        ];
    }
  };

  const stats = getStatsForRole();

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <StatsCard key={index} {...stat} />
      ))}
    </div>
  );
}
