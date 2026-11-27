
"use client";

import { useState } from "react";
import Image from "next/image";
import { Menu } from "lucide-react";
import Sidebar from "./Sidebar";

export default function MobileNavbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="flex h-16 items-center justify-between bg-[#E8EEE3] px-4 shadow-sm lg:hidden">
        <button
          onClick={() => setOpen(true)}
          className="text-[#304536]"
          aria-label="Open menu"
        >
          <Menu size={28} />
        </button>

        <div className="flex items-center gap-2">
          <Image
            src="/image/logo22.png"
            alt="SINAR"
            width={38}
            height={38}
          />

          <Image
            src="/image/logo111.png"
            alt="Logo YPI"
            width={34}
            height={34}
          />
        </div>
      </header>

      <Sidebar
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}
