"use client";

import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { RecentInspections } from "@/components/dashboard/RecentInspactions";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { Plus, FileText, Users, BarChart3 } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col gap-4 sm:gap-0 sm:flex-row justify-center sm:justify-between items-end sm:items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome back, {user.email.split(" ")[0]}!
              </h1>
              <p className="mt-1 text-sm text-gray-600">
                {user.role === "mechanic" &&
                  "Ready to perform your next equipment inspection?"}
                {user.role === "leader" &&
                  "Review pending inspections and manage your team."}
                {user.role === "admin" &&
                  "Monitor system activity and manage users."}
              </p>
            </div>

            <div className="flex space-x-3">
              {user.role === "mechanic" && (
                <Link href="/inspections/new">
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    New Inspection
                  </Button>
                </Link>
              )}

              {user.role === "leader" && (
                <Link href="/verification">
                  <Button>
                    <FileText className="w-4 h-4 mr-2" />
                    Review Inspections
                  </Button>
                </Link>
              )}

              {user.role === "admin" && (
                <div className="flex space-x-2">
                  <Link href="/users">
                    <Button variant="outline">
                      <Users className="w-4 h-4 mr-2" />
                      Manage Users
                    </Button>
                  </Link>
                  <Link href="/reports">
                    <Button>
                      <BarChart3 className="w-4 h-4 mr-2" />
                      View Reports
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mb-8">
          <DashboardStats userRole={user.role} />
        </div>

        {/* Recent Activity */}
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-3">
            <RecentInspections userRole={user.role} />
          </div>
        </div>
      </main>
    </div>
  );
}
