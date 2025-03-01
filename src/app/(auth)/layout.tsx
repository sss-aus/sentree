import type { Metadata } from "next";

import "../globals.css";
import Navbar from "../components/Navbar/page";
import Footer from "../components/Footer/page";

export const metadata: Metadata = {
  title: "Auth",
  description: "Get started today",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
