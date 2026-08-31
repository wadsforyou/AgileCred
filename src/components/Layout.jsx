import React from "react";
import { Outlet } from "react-router-dom";
import SiteHeader from "@/components/SiteHeader";
import FloatingNav from "@/components/FloatingNav";
import SiteFooter from "@/components/SiteFooter";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      <main className="flex-1 pt-16 md:pt-28 pb-24 md:pb-0">
        <Outlet />
      </main>
      <SiteFooter />
      <FloatingNav />
    </div>
  );
}