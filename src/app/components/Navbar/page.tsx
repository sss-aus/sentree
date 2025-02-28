"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const pathname = usePathname();

  const links = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "About", path: "/about" },
    { name: "Login", path: "/login" },
  ];

  return (
    <div>
      <div className="sticky top-0 z-50 flex flex-col md:flex-row bg-[#e9edf5] p-2 rounded-bl-[20px] rounded-br-[20px] shadow-md">
        {/* Navbar Brand */}
        <div className="flex justify-center items-center md:justify-start md:flex-1">
          <h1 className="text-[#316ffe] text-xl font-bold">Sencorp</h1>
        </div>
        {/* Desktop Navigation */}
        <div className="hidden md:flex justify-end md:flex-1">
          <ul className="flex md:flex-row items-center md:w-full space-x-2">
            {links.map((link, index) => (
              <li
                key={index}
                className={`md:flex-1 md:w-full text-white hover:bg-[#316ffe] rounded-[20px] p-2 text-center ${
                  pathname === link.path ? "bg-[#316ffe]" : "bg-[#303030]"
                }`}
              >
                <Link href={link.path} className="block w-full">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {/* Mobile Hamburger Icon */}
        <div className="flex md:hidden justify-end md:flex-1">
          <button onClick={() => setIsDrawerOpen(true)}>
            <FaBars className="text-2xl text-[#303030]" />
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black opacity-50"
            onClick={() => setIsDrawerOpen(false)}
          ></div>
          {/* Drawer */}
          <div className="absolute top-0 left-0 w-3/4 max-w-xs bg-[#e9edf5] h-full p-4 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-[#316ffe]">Menu</h2>
              <button onClick={() => setIsDrawerOpen(false)}>
                <FaTimes className="text-2xl text-[#303030]" />
              </button>
            </div>
            <ul className="space-y-4">
              {links.map((link, index) => (
                <li
                  key={index}
                  className={`text-white hover:bg-[#316ffe] rounded-[20px] p-2 text-center ${
                    pathname === link.path ? "bg-[#316ffe]" : "bg-[#303030]"
                  }`}
                >
                  <Link
                    href={link.path}
                    onClick={() => setIsDrawerOpen(false)}
                    className="block w-full"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
