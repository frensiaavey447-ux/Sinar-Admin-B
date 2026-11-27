
"use client";

import { Mail, Phone } from "lucide-react";

export default function LoginFooter() {
  return (
    <footer className="w-full border-t border-[#e2e8dc] bg-[#e8eee3] text-[#304536]">
      <div className="mx-auto max-w-7xl px-4 py-5">
        <div className="grid grid-cols-1 items-center gap-5 text-xs sm:text-sm md:grid-cols-3">

          {/* Email */}
          <a
            href="mailto:yayasan@ypinurulilmi.sch.id"
            className="flex items-center justify-center gap-2 transition hover:text-[#789579] md:justify-start"
          >
            <Mail size={17} className="shrink-0 text-[#66866a]" />
            <span>yayasan@ypinurulilmi.sch.id</span>
          </a>

          {/* Hanim */}
          <a
            href="https://wa.me/6281316853255"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 transition hover:text-[#789579]"
          >
            <Phone size={17} className="shrink-0 text-[#66866a]" />
            <span>Ibu Hanim : 081316853255</span>
          </a>

          {/* Ida */}
          <a
            href="tel:081282307424"
            className="flex items-center justify-center gap-2 transition hover:text-[#789579] md:justify-end"
          >
            <Phone size={17} className="shrink-0 text-[#66866a]" />
            <span>Ibu Ida : 081282307424</span>
          </a>

        </div>
      </div>

      <div className="border-t border-[#d5dfd1]">
        <p className="py-3 text-center text-[10px] text-[#718071] md:text-[11px]">
          Powered by MIS Class 3 - 2025 Group 1
        </p>
      </div>
    </footer>
  );
}
