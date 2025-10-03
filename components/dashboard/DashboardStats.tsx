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
    <Card className="gap-3">
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent className="">
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
        {trend && (
          <div
            className={`text-xs ${
              trend.isPositive ? "text-green-600" : "text-red-600"
            } mt-1`}
          ></div>
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
            title: "Total Inspeksi",
            value: 24,
            description: "Selesai bulan ini",
            icon: <FileText className="h-4 w-4 text-muted-foreground" />,
            trend: { value: 12, isPositive: true },
          },
          {
            title: "Menunggu Tinjauan",
            value: 3,
            description: "Menunggu persetujuan leader",
            icon: <Clock className="h-4 w-4 text-muted-foreground" />,
          },
          {
            title: "Disetujui",
            value: 21,
            description: "Berhasil diverifikasi",
            icon: <CheckCircle className="h-4 w-4 text-muted-foreground" />,
            trend: { value: 8, isPositive: true },
          },
          {
            title: "Ditolak",
            value: 5,
            description: "Alat memerlukan perhatian",
            icon: <AlertTriangle className="h-4 w-4 text-muted-foreground" />,
          },
        ];

      case "leader":
        return [
          {
            title: "Tinjauan Tertunda",
            value: 12,
            description: "Inspeksi menunggu verifikasi",
            icon: <Clock className="h-4 w-4 text-muted-foreground" />,
          },
          {
            title: "Ditinjau Hari Ini",
            value: 8,
            description: "Inspeksi telah diproses",
            icon: <CheckCircle className="h-4 w-4 text-muted-foreground" />,
          },
          // {
          //   title: "Inspeksi Tim",
          //   value: 156,
          //   description: "Total bulan ini",
          //   icon: <FileText className="h-4 w-4 text-muted-foreground" />,
          //   trend: { value: 15, isPositive: true },
          // },
          // {
          //   title: "Masalah Kritis",
          //   value: 3,
          //   description: "Memerlukan perhatian segera",
          //   icon: <AlertTriangle className="h-4 w-4 text-muted-foreground" />,
          // },
        ];

      case "admin":
        return [];
      //     {
      //       title: "Total Inspections",
      //       value: 1247,
      //       description: "All time completed",
      //       icon: <FileText className="h-4 w-4 text-muted-foreground" />,
      //       trend: { value: 18, isPositive: true },
      //     },
      //     {
      //       title: "Active Users",
      //       value: 45,
      //       description: "Mechanics and leaders",
      //       icon: <CheckCircle className="h-4 w-4 text-muted-foreground" />,
      //     },
      //     {
      //       title: "This Month",
      //       value: 234,
      //       description: "Inspections completed",
      //       icon: <Clock className="h-4 w-4 text-muted-foreground" />,
      //       trend: { value: 22, isPositive: true },
      //     },
      // {
      //   title: "Equipment Issues",
      //   value: 18,
      //   description: "Requiring maintenance",
      //   icon: <AlertTriangle className="h-4 w-4 text-muted-foreground" />,
      // },
      // ];
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
