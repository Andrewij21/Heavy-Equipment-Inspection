"use client";

import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { RecentInspections } from "@/components/dashboard/RecentInspactions";
import ReportsPage from "@/components/dashboard/ReportSection";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { Plus, FileText, Users } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="min-h-screen">
      <main className="py-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col gap-4 sm:gap-0 sm:flex-row justify-center sm:justify-between items-end sm:items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Selamat datang kembali, {user.username}!
              </h1>
              <p className="mt-1 text-sm text-gray-600">
                {user.role === "mechanic" &&
                  "Siap untuk melakukan inspeksi peralatan berikutnya?"}
                {user.role === "leader" &&
                  "Tinjau inspeksi yang tertunda dan kelola tim Anda."}
                {user.role === "admin" &&
                  "Pantau aktivitas sistem dan kelola pengguna."}
              </p>
            </div>

            <div className="flex space-x-3">
              {user.role === "mechanic" && (
                <Link href="/inspections/new">
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Inspeksi Baru
                  </Button>
                </Link>
              )}

              {user.role === "leader" && (
                <Link href="/verification">
                  <Button>
                    <FileText className="w-4 h-4 mr-2" />
                    Tinjau Inspeksi
                  </Button>
                </Link>
              )}

              {user.role === "admin" && (
                <div className="flex space-x-2">
                  <Link href="/users">
                    <Button variant="outline">
                      <Users className="w-4 h-4 mr-2" />
                      Kelola Pengguna
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className={`${user.role !== "admin" && "mb-8"}`}>
          <DashboardStats userRole={user.role} />
        </div>

        {/* Recent Activity */}
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-3">
            {user.role === "admin" || user.role === "leader" ? (
              <ReportsPage role={user.role} />
            ) : (
              <RecentInspections userRole={user.role} />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
