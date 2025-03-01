// app/dashboard/layout.tsx
"use client";
import React from "react";
import DashboardNavbar from "../components/DashboardNav/page";
import Footer from "../components/Footer/page";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <body>
      <DashboardNavbar />
      <div className="min-h-screen flex">
        {/* For desktop, add left margin equal to the navbar width */}
        <main className="flex-1 p-8 md:ml-64">{children}</main>
      </div>
    </body>
  );
}
