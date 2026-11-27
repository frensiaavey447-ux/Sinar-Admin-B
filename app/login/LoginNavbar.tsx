
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const menuItems = [
    { name: "Home", href: "/home" },
    { name: "Profile", href: "/profile" },
    { name: "Jadwal Kegiatan", href: "/jadwal" },
    { name: "Pengurus", href: "/pengurus" },
    { name: "Laporan Keuangan", href: "/laporan" },
    { name: "Inventaris", href: "/inventaris" },
  ];

  return (
    <>
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 border-b border-[#e5d5cc] bg-[#f8f3ee] shadow-sm">
        <div className="mx-auto max-w-[1500px] px-4 lg:px-8">

          {/* MOBILE */}
          <div className="flex h-16 items-center justify-between lg:hidden">
            <button
              onClick={() => setOpen(true)}
              className="!bg-transparent !text-[#49372f] !border-transparent"
              aria-label="Open menu"
            >
              <Menu size={27} />
            </button>

            <div className="flex items-center gap-2">
              <Image
                src="/image/logo2 - Edited2.png"
                alt="SINAR"
                width={42}
                height={42}
                priority
                className="object-contain"
              />

              <Image
                src="/image/logo111.png"
                alt="Logo YPI"
                width={42}
                height={42}
                priority
                className="object-contain"
              />
            </div>
          </div>

          {/* DESKTOP */}
          <div className="hidden h-20 items-center justify-between lg:flex">

            {/* LOGO */}
            <div className="flex items-center gap-3">
              <Image
                src="/image/logo2 - Edited2.png"
                alt="SINAR"
                width={60}
                height={60}
                priority
              />

              <Image
                src="/image/logo111.png"
                alt="Logo YPI"
                width={60}
                height={60}
                priority
              />
            </div>

            {/* MENU */}
            <nav className="flex items-center gap-7">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="whitespace-nowrap text-sm font-semibold text-[#49372f] transition hover:text-[#b86f52]"
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* LOGIN DESKTOP */}
            <Link
              href="/login"
              className="rounded-full !bg-[#B86F52] px-8 py-3 font-semibold !text-white transition hover:!bg-[#9D563D]"
            >
              Login
            </Link>
          </div>
        </div>
      </header>

      {/* OVERLAY MOBILE */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-40 bg-[#49372f]/30 transition-all duration-300 lg:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      />

      {/* SIDEBAR MOBILE */}
      <aside
        className={`fixed left-0 top-0 z-50 h-screen w-72 bg-[#f8f3ee] shadow-2xl transition-transform duration-300 lg:hidden ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-[#e5d5cc] px-5">
          <span className="font-semibold text-[#49372f]">
            SINAR Menu
          </span>

          <button
            onClick={() => setOpen(false)}
            className="!bg-transparent !text-[#49372f] !border-transparent"
            aria-label="Close menu"
          >
            <X size={27} />
          </button>
        </div>

        <div className="flex h-[calc(100%-64px)] flex-col">
          <nav className="flex flex-1 flex-col font-semibold text-[#49372f]">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b border-[#e5d5cc] px-6 py-4 transition hover:bg-[#f1ddd3]"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* LOGIN MOBILE */}
          <div className="p-6">
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="block w-full rounded-full !bg-[#B86F52] px-8 py-3 text-center font-semibold !text-white transition hover:!bg-[#9D563D]"
            >
              Login
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}
