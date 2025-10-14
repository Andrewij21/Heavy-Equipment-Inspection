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
import { LogOut, User, Settings, FileText, Download, Menu } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLogout } from "@/queries/auth";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { getRoleColor } from "@/lib/utils";

export default function Navigation() {
  const { mutate: logout } = useLogout();
  const { user } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  if (!user) return null;

  return (
    <nav className="border-b bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-0">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            {/* START: BRANDING - Mengganti 'Equipment Inspector' dengan nama perusahaan */}
            <Link
              href="/dashboard"
              // Tambahkan h-full untuk centering vertikal stabil di dalam h-16
              className="items-center space-x-3 h-full hidden sm:flex"
            >
              {/* Image diletakkan langsung, tanpa div yang bermasalah */}
              {/* <Image
                src="/logo.png"
                alt="ANTARJAYA MAHAJDA MAKMUR Logo"
                width={32}
                height={32}
                className="rounded-full flex-shrink-0"
              /> */}
              <span className="font-bold text-lg text-gray-900 whitespace-nowrap">
                PT. Antareja Mahada Makmur{" "}
              </span>
            </Link>
            {/* END: BRANDING */}
            {/* Tampilan Mobile: Tampil di layar kecil, tersembunyi di layar medium ke atas */}
            <div className="md:hidden ml-auto">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right">
                  <SheetHeader>
                    <SheetTitle>PT. Antareja Mahada Makmur</SheetTitle>
                  </SheetHeader>
                  <div className="flex flex-col border-t border-gray-200 pt-4 space-y-1">
                    {/* The border-t and pt-4 create a clean separator above the links */}

                    <SheetClose asChild>
                      <Link
                        href="/dashboard"
                        // Added py-2 for vertical padding, rounded-md for soft corners
                        className="text-lg font-medium text-gray-700 py-2 px-3 rounded-md transition duration-150 ease-in-out hover:bg-gray-50 hover:text-primary"
                      >
                        Dashboard
                      </Link>
                    </SheetClose>

                    {user.role === "mechanic" && (
                      <SheetClose asChild>
                        <Link
                          href="/inspections"
                          className="text-lg font-medium text-gray-700 py-2 px-3 rounded-md transition duration-150 ease-in-out hover:bg-gray-50 hover:text-primary"
                        >
                          Inspeksi Saya
                        </Link>
                      </SheetClose>
                    )}

                    {user.role === "mechanic" && (
                      <SheetClose asChild>
                        <Link
                          href="/schedule"
                          className="text-lg font-medium text-gray-700 py-2 px-3 rounded-md transition duration-150 ease-in-out hover:bg-gray-50 hover:text-primary"
                        >
                          Jadwal
                        </Link>
                      </SheetClose>
                    )}

                    {(user.role === "leader" || user.role === "admin") && (
                      <SheetClose asChild>
                        <Link
                          href="/verification"
                          className="text-lg font-medium text-gray-700 py-2 px-3 rounded-md transition duration-150 ease-in-out hover:bg-gray-50 hover:text-primary"
                        >
                          Verifikasi
                        </Link>
                      </SheetClose>
                    )}

                    {user.role === "admin" && (
                      <SheetClose asChild>
                        <Link
                          href="/users"
                          className="text-lg font-medium text-gray-700 py-2 px-3 rounded-md transition duration-150 ease-in-out hover:bg-gray-50 hover:text-primary"
                        >
                          Pengguna
                        </Link>
                      </SheetClose>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
            <div className="hidden md:flex ml-10 space-x-8">
              <Link
                href="/dashboard"
                className="text-gray-900 hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
              >
                Dashboard
              </Link>

              {/* My Inspections (Mechanic Only) */}
              {user.role === "mechanic" && (
                <Link
                  href="/inspections"
                  className="text-gray-900 hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
                >
                  My Inspections
                </Link>
              )}
              {user.role === "mechanic" && (
                <Link
                  href="/schedule"
                  className="text-gray-900 hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
                >
                  Schedule
                </Link>
              )}

              {/* Verification (Leader & Admin) */}
              {(user.role === "leader" || user.role === "admin") && (
                <Link
                  href="/verification"
                  className="text-gray-900 hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
                >
                  Verification
                </Link>
              )}

              {/* Users (Admin Only) */}
              {user.role === "admin" && (
                <>
                  <Link
                    href="/users"
                    className="text-gray-900 hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Users
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
                      {user.username
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
                    <p className="font-medium">{user.username}</p>
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
                  <span>Keluar</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
}
