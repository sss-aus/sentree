// app/dashboard/page.tsx
"use client";
import React from "react";

export default function DashboardPage() {
  // Dummy data for demonstration:
  const isActive = true;
  const username = "JohnDoe";
  const pageSpeed = "1.2s";

  // Subscription data
  const subscriptionPlan = "Basic";
  const expiryDate = "2025-01-01";
  const subscriptionActive = true;

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-blue-50 p-6 rounded-lg shadow-md mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome to Sentree Dashboard
        </h1>
        <p className="text-gray-600">
          Manage your personalized link page and track your performance with
          real-time analytics.
        </p>
      </section>

      {/* Analytics Section */}
      <section className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Analytics</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile Visits */}
          <div className="border p-4 rounded shadow-sm">
            <h3 className="text-xl font-bold text-gray-700 mb-2">
              Profile Visits
            </h3>
            <p className="text-3xl font-bold text-blue-600">1,234</p>
            <p className="text-sm text-gray-500">
              Total visits to your profile
            </p>
          </div>
          {/* Clicks */}
          <div className="border p-4 rounded shadow-sm">
            <h3 className="text-xl font-bold text-gray-700 mb-2">Clicks</h3>
            <p className="text-3xl font-bold text-blue-600">567</p>
            <p className="text-sm text-gray-500">Link clicks on your page</p>
          </div>
          {/* Conversions */}
          <div className="border p-4 rounded shadow-sm">
            <h3 className="text-xl font-bold text-gray-700 mb-2">
              Conversions
            </h3>
            <p className="text-3xl font-bold text-blue-600">89</p>
            <p className="text-sm text-gray-500">Actions taken by visitors</p>
          </div>
        </div>
      </section>

      {/* Page Information Section */}
      <section className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Page Information
        </h2>
        <div className="flex items-center justify-between flex-wrap">
          <div className="flex items-center">
            {/* Status Indicator */}
            <span
              className={`w-4 h-4 rounded-full mr-3 ${
                isActive ? "bg-green-500" : "bg-red-500"
              }`}
            ></span>
            <div>
              <p className="text-lg font-bold text-gray-700">
                {username}&apos;s Page
              </p>
              <p className="text-sm text-gray-500">Page Speed: {pageSpeed}</p>
            </div>
          </div>
          {/* Action Buttons */}
          <div className="mt-4 md:mt-0 flex space-x-4">
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200">
              Visit Page
            </button>
            <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition duration-200">
              Share
            </button>
            <button className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition duration-200">
              Generate QR Code
            </button>
          </div>
        </div>
      </section>

      {/* Subscription Information Section */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Subscription Information
        </h2>
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <p className="text-lg text-gray-700">
              <span className="font-bold">Plan:</span> {subscriptionPlan}
            </p>
            <p className="text-lg text-gray-700">
              <span className="font-bold">Expiry Date:</span> {expiryDate}
            </p>
            <p className="text-lg text-gray-700">
              <span className="font-bold">Status:</span>{" "}
              {subscriptionActive ? (
                <span className="text-green-600">Active</span>
              ) : (
                <span className="text-red-600">Inactive</span>
              )}
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <button className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200">
              Upgrade Plan
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
