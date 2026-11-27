
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const login = localStorage.getItem("isLogin") === "true";
    setIsLogin(login);
  }, []);

  function handleLogout() {
    localStorage.removeItem("isLogin");
    setIsLogin(false);
    router.push("/home");
  }

  const homeLink = "/home";
  const profileLink = isLogin ? "/admin/profile" : "/profile";
  const jadwalLink = isLogin ? "/admin/jadwal" : "/jadwal";
  const pengurusLink = isLogin ? "/admin/pengurus" : "/pengurus";
  const laporanLink = isLogin ? "/admin/laporan" : "/laporan";
  const inventarisLink = isLogin ? "/admin/inventaris" : "/inventaris";

  const menus = [
    { name: "Home", href: homeLink },
    { name: "Profile", href: profileLink },
    { name: "Jadwal Kegiatan", href: jadwalLink },
    { name: "Pengurus", href: pengurusLink },
    { name: "Laporan Keuangan", href: laporanLink },
    { name: "Inventaris", href: inventarisLink },
  ];

  return (
    <>
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 border-b border-[#DDE5D8] bg-[#E8EEE3] shadow-sm">
        <div className="mx-auto max-w-[1500px] px-4 lg:px-8">

          {/* MOBILE NAVBAR */}
          <div className="flex h-16 items-center justify-between lg:hidden">
            <button
              onClick={() => setOpen(true)}
              className="bg-transparent text-[#304536]"
              aria-label="Open menu"
            >
              <Menu size={28} />
            </button>

            <div className="flex items-center gap-2">
              <Image
                src="/image/logo2 - Edited2.png"
                alt="SINAR"
                width={42}
                height={42}
                priority
              />

              <Image
                src="/image/logo111.png"
                alt="Logo YPI"
                width={42}
                height={42}
                priority
              />
            </div>
          </div>

          {/* DESKTOP NAVBAR */}
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
              {menus.map((menu) => (
                <Link
                  key={menu.href}
                  href={menu.href}
                  className="whitespace-nowrap text-sm font-semibold text-[#304536] transition hover:text-[#B86F52]"
                >
                  {menu.name}
                </Link>
              ))}
            </nav>

            {/* LOGIN / LOGOUT DESKTOP */}
            {isLogin ? (
              <button
                onClick={handleLogout}
                className="rounded-full !bg-[#B86F52] px-8 py-3 font-semibold !text-white transition hover:!bg-[#9D563D]"
              >
                Log Out
              </button>
            ) : (
              <Link
                href="/login"
                className="rounded-full !bg-[#B86F52] px-8 py-3 font-semibold !text-white transition hover:!bg-[#9D563D]"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* MOBILE OVERLAY */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-40 bg-[#26352C]/30 transition-all duration-300 lg:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      />

      {/* MOBILE SIDEBAR */}
      <aside
        className={`fixed left-0 top-0 z-50 h-screen w-72 bg-[#F8F7F2] shadow-2xl transition-transform duration-300 lg:hidden ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* SIDEBAR HEADER */}
        <div className="flex h-16 items-center justify-between border-b border-[#E2E8DC] px-5">
          <span className="font-semibold text-[#304536]">
            SINAR Menu
          </span>

          <button
            onClick={() => setOpen(false)}
            className="bg-transparent text-[#304536]"
            aria-label="Close menu"
          >
            <X size={28} />
          </button>
        </div>

        {/* SIDEBAR CONTENT */}
        <div className="flex h-[calc(100%-64px)] flex-col">
          <nav className="flex flex-1 flex-col font-semibold text-[#304536]">
            {menus.map((menu) => (
              <Link
                key={menu.href}
                href={menu.href}
                onClick={() => setOpen(false)}
                className="border-b border-[#E2E8DC] px-6 py-4 transition hover:bg-[#E8EEE3]"
              >
                {menu.name}
              </Link>
            ))}
          </nav>

          {/* SIDEBAR LOGIN / LOGOUT */}
          <div className="p-6">
            {isLogin ? (
              <button
                onClick={() => {
                  setOpen(false);
                  handleLogout();
                }}
                className="w-full rounded-xl !bg-[#B86F52] py-3 text-lg font-semibold !text-white shadow-sm transition duration-200 hover:!bg-[#9D563D] hover:shadow-md"
              >
                Log Out
              </button>
            ) : (
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="block w-full rounded-xl !bg-[#B86F52] py-3 text-center text-lg font-semibold !text-white shadow-sm transition duration-200 hover:!bg-[#9D563D] hover:shadow-md"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
