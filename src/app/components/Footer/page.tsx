"use client";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-[#202020] text-white py-8">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        {/* Brand Section */}
        <div className="mb-4 md:mb-0">
          <h3 className="text-xl font-bold">Sentree</h3>
          <p className="text-gray-400 text-sm">
            Empowering your digital presence.
          </p>
        </div>
        {/* Navigation Links */}
        <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
          <Link href="/about" className="hover:text-[#316ffe]">
            About
          </Link>
          <Link href="/contact" className="hover:text-[#316ffe]">
            Contact
          </Link>
          <Link href="/privacy" className="hover:text-[#316ffe]">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-[#316ffe]">
            Terms of Service
          </Link>
        </div>
      </div>
      <div className="mt-4 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Sentree. All rights reserved.
      </div>
    </footer>
  );
}
