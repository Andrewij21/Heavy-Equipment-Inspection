"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { LogOut, User, Settings, FileText } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLogout } from "@/queries/auth";
import { useAuth } from "@/context/AuthContext";

export default function Navigation() {
  const { mutate: logout } = useLogout();
  const { user } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  if (!user) return null;

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-red-100 text-red-800";
      case "leader":
        return "bg-blue-100 text-blue-800";
      case "mechanic":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <nav className="border-b bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/dashboard" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-lg">Equipment Inspector</span>
            </Link>

            <div className="hidden md:flex ml-10 space-x-8">
              <Link
                href="/dashboard"
                className="text-gray-900 hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
              >
                Dashboard
              </Link>

              {user.role === "mechanic" && (
                <Link
                  href="/inspections"
                  className="text-gray-900 hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
                >
                  My Inspections
                </Link>
              )}

              {(user.role === "leader" || user.role === "admin") && (
                <Link
                  href="/verification"
                  className="text-gray-900 hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
                >
                  Verification
                </Link>
              )}

              {user.role === "admin" && (
                <>
                  <Link
                    href="/users"
                    className="text-gray-900 hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Users
                  </Link>
                  <Link
                    href="/reports"
                    className="text-gray-900 hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Reports
                  </Link>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Badge className={getRoleColor(user.role)}>
              {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
            </Badge>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>
                      {user.email
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    <p className="font-medium">{user.email}</p>
                    <p className="w-[200px] truncate text-sm text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </div>
                <DropdownMenuItem onClick={() => router.push("/profile")}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
}
