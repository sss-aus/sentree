"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";

const DashboardNavbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Mobile Navbar */}
      <div className="md:hidden bg-white shadow p-4 flex items-center justify-between ">
        <div className="text-2xl font-bold">Sentree</div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow p-4">
          <nav className="flex flex-col space-y-2">
            <Link href="/dashboard">
              <span className="block px-4 py-2 hover:bg-blue-100 rounded">
                Dashboard
              </span>
            </Link>
            <Link href="/profile">
              <span className="block px-4 py-2 hover:bg-blue-100 rounded">
                Profile
              </span>
            </Link>
            <Link href="/products">
              <span className="block px-4 py-2 hover:bg-blue-100 rounded">
                Products
              </span>
            </Link>

            <Link href="/logout">
              <span className="block px-4 py-2 hover:bg-blue-100 rounded">
                Logout
              </span>
            </Link>
          </nav>
        </div>
      )}

      {/* Desktop Sidebar Navbar */}
      <aside className="hidden md:flex md:flex-col md:w-64 md:h-screen md:fixed md:left-0 md:top-0 bg-white shadow p-6 ">
        <div className="mb-8 text-2xl font-bold">Sentree</div>
        <nav className="flex flex-col space-y-4">
          <Link
            href="/dashboard"
            className="block px-4 py-2 hover:bg-blue-100 rounded"
          >
            Dashboard
          </Link>
          <Link
            href="/dashboard/profile"
            className="block px-4 py-2 hover:bg-blue-100 rounded"
          >
            Profile
          </Link>
          <Link
            href="/dashboard/settings"
            className="block px-4 py-2 hover:bg-blue-100 rounded"
          >
            Settings
          </Link>
          <Link
            href="/dashboard/reports"
            className="block px-4 py-2 hover:bg-blue-100 rounded"
          >
            Reports
          </Link>
          <Link
            href="/logout"
            className="block px-4 py-2 hover:bg-blue-100 rounded"
          >
            Logout
          </Link>
        </nav>
      </aside>
    </>
  );
};

export default DashboardNavbar;
