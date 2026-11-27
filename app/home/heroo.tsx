
"use client";

import Image from "next/image";
import { MapPin, ArrowUpRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="py-5">
      <div className="grid overflow-hidden rounded-[28px] bg-[#294A35] shadow-xl lg:grid-cols-[0.9fr_1.1fr]">

        {/* LEFT CONTENT */}
        <div className="flex flex-col justify-between p-7 text-white sm:p-10 lg:p-12">

          <div>
            {/* Small label */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2">
              <span className="h-2 w-2 rounded-full bg-[#D9E8B8]" />
              <span className="text-xs font-medium tracking-[0.2em] text-[#D9E8B8]">
                WELCOME TO SINAR
              </span>
            </div>

            {/* Title */}
            <h1 className="max-w-xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-[42px]">
              Selamat Datang
              <br />
              di <span className="text-[#D9E8B8]">SINAR</span>
            </h1>

            <p className="mt-5 max-w-md text-sm leading-7 text-white/75 sm:text-base">
              Sistem Informasi, Ngaji dan Administrasi Rumah Ibadah.
              Mendukung pengelolaan kegiatan dan administrasi
              yayasan secara lebih teratur.
            </p>
          </div>

          {/* Location Information */}
          <div className="mt-8 rounded-2xl border border-white/15 bg-white/10 p-4 sm:p-5">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#D9E8B8] text-[#294A35]">
                <MapPin size={20} />
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#D9E8B8]">
                  Lokasi Yayasan
                </p>

                <p className="mt-2 text-sm leading-6 text-white/90">
                  Perumahan Jl. Bumi Waringin Indah
                  2 No.1 Blok B1,
                  Waringinjaya, Kedungwaringin,
                  Bekasi, Jawa Barat 17540,
                  Indonesia
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Label */}
          <div className="mt-7 flex items-center justify-between border-t border-white/20 pt-5">
            <p className="text-xs tracking-wide text-white/60">
              Sistem Informasi Rumah Ibadah
            </p>

            <ArrowUpRight
              size={20}
              className="text-[#D9E8B8]"
            />
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative min-h-[280px] sm:min-h-[360px] lg:min-h-[500px]">

          <Image
            src="/image/gedung1.jpeg"
            alt="Gedung Yayasan SINAR"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 55vw"
            className="object-cover object-center"
          />

          {/* Image Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#183522]/40 via-transparent to-transparent" />

          {/* Image Label */}
          <div className="absolute bottom-5 left-5 rounded-xl border border-white/30 bg-black/20 px-4 py-3 text-white backdrop-blur-md sm:bottom-7 sm:left-7">
            <p className="text-xs font-medium tracking-wider">
              YAYASAN SINAR
            </p>
            <p className="mt-1 text-sm text-white/80">
              Our place, our community
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
