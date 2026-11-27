
"use client";

import { Mail, Phone } from "lucide-react";

export default function LoginFooter() {
  return (
    <footer className="w-full border-t border-[#D5DFD1] bg-[#E8EEE3] text-[#304536]">
      <div className="mx-auto max-w-7xl px-4 py-5">
        <div className="grid grid-cols-1 items-center gap-5 text-xs md:grid-cols-3 md:text-sm">
          <a
            href="mailto:yayasan@ypinurulilmi.sch.id"
            className="flex items-center justify-center gap-2 transition hover:text-[#789579] md:justify-start"
          >
            <Mail size={16} className="text-[#66866A]" />
            <span>yayasan@ypinurulilmi.sch.id</span>
          </a>

          <a
            href="https://wa.me/6281316853255"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 transition hover:text-[#789579]"
          >
            <Phone size={16} className="text-[#66866A]" />
            <span>Ibu Hanim : 081316853255</span>
          </a>

          <a
            href="tel:081282307424"
            className="flex items-center justify-center gap-2 transition hover:text-[#789579] md:justify-end"
          >
            <Phone size={16} className="text-[#66866A]" />
            <span>Ibu Ida : 081282307424</span>
          </a>
        </div>
      </div>

      <div className="border-t border-[#D5DFD1]">
        <p className="py-3 text-center text-[10px] text-[#718071] md:text-[11px]">
          Powered by MIS Class 3 - 2025 Group 1
        </p>
      </div>
    </footer>
  );
}
