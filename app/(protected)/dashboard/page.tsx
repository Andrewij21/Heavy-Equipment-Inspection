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
          <div className="lg:col-span-2">
            <RecentInspections userRole={user.role} />
          </div>

          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white p-6 rounded-lg border">
              <h3 className="text-lg font-medium mb-4">Quick Actions</h3>
              <div className="space-y-3">
                {user.role === "mechanic" && (
                  <>
                    <Link href="/inspections/new" className="block">
                      <Button
                        variant="outline"
                        className="w-full justify-start bg-transparent"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Start New Inspection
                      </Button>
                    </Link>
                    <Link href="/inspections" className="block">
                      <Button
                        variant="outline"
                        className="w-full justify-start bg-transparent"
                      >
                        <FileText className="w-4 h-4 mr-2" />
                        View My Inspections
                      </Button>
                    </Link>
                  </>
                )}

                {user.role === "leader" && (
                  <>
                    <Link href="/verification" className="block">
                      <Button
                        variant="outline"
                        className="w-full justify-start bg-transparent"
                      >
                        <FileText className="w-4 h-4 mr-2" />
                        Review Pending
                      </Button>
                    </Link>
                    <Link href="/team" className="block">
                      <Button
                        variant="outline"
                        className="w-full justify-start bg-transparent"
                      >
                        <Users className="w-4 h-4 mr-2" />
                        Team Overview
                      </Button>
                    </Link>
                  </>
                )}

                {user.role === "admin" && (
                  <>
                    <Link href="/users/new" className="block">
                      <Button
                        variant="outline"
                        className="w-full justify-start bg-transparent"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add New User
                      </Button>
                    </Link>
                    <Link href="/reports/export" className="block">
                      <Button
                        variant="outline"
                        className="w-full justify-start bg-transparent"
                      >
                        <BarChart3 className="w-4 h-4 mr-2" />
                        Export Data
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>

            {/* System Status */}
            {/* <div className="bg-white p-6 rounded-lg border">
              <h3 className="text-lg font-medium mb-4">System Status</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Database</span>
                  <span className="text-sm text-green-600 font-medium">
                    Online
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Last Backup</span>
                  <span className="text-sm text-gray-900">2 hours ago</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Active Users</span>
                  <span className="text-sm text-gray-900">12</span>
                </div>
              </div> 
            </div> */}
          </div>
        </div>
      </main>
    </div>
  );
}
