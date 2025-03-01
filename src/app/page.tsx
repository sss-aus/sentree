"use client";
import Link from "next/link";
import {
  FaShoppingCart,
  FaShareAlt,
  FaChartLine,
  FaUser,
  FaCogs,
  FaThLarge,
} from "react-icons/fa";
import Navbar from "./components/Navbar/page";
import Footer from "./components/Footer/page";

export default function Home() {
  const services = [
    {
      title: "List your products",
      subheading: "Sell your products and post affiliated products",
      icon: <FaShoppingCart className="text-4xl mb-2" />,
      link: "/products",
      bgColor: "bg-blue-100",
    },
    {
      title: "Your socials",
      subheading: "All your socials in one place",
      icon: <FaShareAlt className="text-4xl mb-2" />,
      link: "/socials",
      bgColor: "bg-green-100",
    },
    {
      title: "Analytics insights",
      subheading: "Track your sales, conversion and popularity",
      icon: <FaChartLine className="text-4xl mb-2" />,
      link: "/analytics",
      bgColor: "bg-yellow-100",
    },
    {
      title: "Profile",
      subheading: "List your hobbies, skills and education",
      icon: <FaUser className="text-4xl mb-2" />,
      link: "/profile",
      bgColor: "bg-purple-100",
    },
    {
      title: "Customize",
      subheading: "Create your own sections and show what you want",
      icon: <FaCogs className="text-4xl mb-2" />,
      link: "/customize",
      bgColor: "bg-red-100",
    },
    {
      title: "Templates",
      subheading: "Choose from many prebuilt templates",
      icon: <FaThLarge className="text-4xl mb-2" />,
      link: "/templates",
      bgColor: "bg-pink-100",
    },
  ];

  return (
    <div className="hide-scrollbar">
      {/* Home Section */}
      <Navbar />
      <div className="w-full h-screen bg-[#34617f] flex items-center justify-center">
        <section className="p-4 text-center">
          <h1 className="text-white text-4xl font-bold mb-4">
            Boost your career with Sentree today
          </h1>
          <p className="text-gray-300 text-lg mb-8">
            Helping local businesses and influencers grow their business.
          </p>
          <Link
            href="/get-started"
            className="inline-block bg-[#316ffe] hover:bg-blue-500 text-white font-semibold py-3 px-6 rounded-full transition duration-300"
          >
            Get Started
          </Link>
        </section>
      </div>

      {/* Templates Section */}
      <div className="w-full h-screen bg-gray-100 flex items-center justify-center">
        <section className="p-4 text-center">
          <h2 className="text-black text-3xl font-bold mb-4">Templates</h2>
          <p className="text-gray-700 text-lg mb-8">
            Explore various types of templates fit for your business and
            profile.
          </p>
          <Link
            href="/templates"
            className="inline-block bg-[#316ffe] hover:bg-blue-500 text-white font-semibold py-3 px-6 rounded-full transition duration-300"
          >
            Get Started
          </Link>
        </section>
      </div>

      {/* Services Section */}
      <div className="w-full  py-12">
        <section className="max-w-6xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-8 text-[#316ffe]">
            Our Services
          </h2>

          {/* Mobile: Horizontally Scrollable Cards */}
          <div className="flex md:hidden overflow-x-auto space-x-4 px-4 p-2">
            {services.map((service, index) => (
              <div
                key={index}
                className={`${service.bgColor} inline-block  rounded-lg p-6 shadow-md flex flex-col items-center`}
              >
                {service.icon}
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-700">{service.subheading}</p>
              </div>
            ))}
          </div>

          {/* Desktop: Grid Layout */}
          <div className="hidden md:grid grid-cols-3 gap-8 px-4">
            {services.map((service, index) => (
              <div
                key={index}
                className={`${service.bgColor} rounded-lg p-6 shadow-md flex flex-col items-center`}
              >
                {service.icon}
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-700">{service.subheading}</p>
              </div>
            ))}
          </div>
        </section>
        <Footer />
      </div>

      <style jsx global>{`
        .hide-scrollbar {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none; /* Chrome, Safari, Opera */
        }
      `}</style>
    </div>
  );
}
