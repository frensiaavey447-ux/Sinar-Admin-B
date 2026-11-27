
"use client";

import Link from "next/link";
import { X } from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function Sidebar({ open, onClose }: Props) {
  const menus = [
    { name: "Home", href: "/home" },
    { name: "Profile", href: "/profile" },
    { name: "Jadwal Kegiatan", href: "/jadwal" },
    { name: "Pengurus", href: "/pengurus" },
    { name: "Laporan Keuangan", href: "/laporan" },
    { name: "Inventaris", href: "/inventaris" },
  ];

  return (
    <>
      {/* OVERLAY */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-[#26352C]/30 transition-all duration-300 ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      />

      {/* SIDEBAR */}
      <aside
        className={`fixed left-0 top-0 z-50 h-screen w-72 bg-[#F8F7F2] shadow-2xl transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between border-b border-[#E2E8DC] p-5">
          <h2 className="text-xl font-bold text-[#304536]">
            Menu
          </h2>

          <button
            onClick={onClose}
            className="text-[#304536]"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        {/* MENU */}
        <nav className="flex flex-col gap-2 p-5">
          {menus.map((menu) => (
            <Link
              key={menu.href}
              href={menu.href}
              onClick={onClose}
              className="rounded-lg px-3 py-3 font-semibold text-[#304536] transition hover:bg-[#E8EEE3]"
            >
              {menu.name}
            </Link>
          ))}

          <Link href="/login" onClick={onClose}>
            <button className="mt-6 w-full rounded-xl bg-[#526F55] py-3 font-bold text-white transition hover:bg-[#405C45]">
              Login
            </button>
          </Link>
        </nav>
      </aside>
    </>
  );
}
