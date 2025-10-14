"use client";
import { AppSidebar } from "@/components/layouts/AppSidebar";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import AppHeader from "./AppHeader";
import { getBreadcrumbs } from "@/lib/breadcrumb";
import { usePathname } from "next/navigation";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const breadcrumbs = getBreadcrumbs(pathname);
  return (
    <SidebarProvider>
      {/* <AppSidebar /> */}
      <SidebarInset>
        <AppHeader />
        <main className="max-w-7xl sm:min-w-7xl mx-auto">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
