
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import Navbar from "../admin/components/Navbar";
import Footer from "../admin/components/Footer";
import { supabase } from "../lib/supabase";

interface PengurusData {
  id: number;
  nama: string;
  jabatan: string;
  foto: string | null;
}

export default function PengurusPage() {
  const [pengurus, setPengurus] = useState<PengurusData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPengurus();
  }, []);

  async function getPengurus() {
    setLoading(true);

    const { data, error } = await supabase
      .from("pengurus")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      console.log(error);
      setLoading(false);
      return;
    }

    setPengurus(data || []);
    setLoading(false);
  }

  return (
    <main className="min-h-screen flex flex-col bg-[#0F2D1F] text-white">
      <Navbar />

      {/* HERO */}
      <section
        className="
          relative
          overflow-hidden
          border-b
          border-white/10
          bg-gradient-to-r
          from-[#0F2D1F]
          via-[#163826]
          to-[#0F2D1F]
        "
      >
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top,#ffffff_1px,transparent_1px)] bg-[length:22px_22px]" />

        <div className="relative max-w-7xl mx-auto px-4 py-4 text-center">
          <h1 className="mt-3 text-[30px] font-extrabold !text-[#F8F3EE]">
            Info Pengurus
          </h1>

          <div className="mt-3 mx-auto w-28 h-[3px] rounded-full bg-[#B86F52]" />
        </div>
      </section>

      {/* CONTENT */}
      <section className="flex-1 py-6">
        <div className="max-w-5xl mx-auto px-8">

          {/* LOADING */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
              {[...Array(6)].map((_, index) => (
                <div
                  key={index}
                  className="
                    animate-pulse
                    w-full
                    max-w-[280px]
                    rounded-2xl
                    overflow-hidden
                    border
                    border-[#E5D5CC]
                    bg-[#F8F3EE]
                  "
                >
                  <div className="h-[190px] bg-[#EDE2D9]" />

                  <div className="p-5">
                    <div className="h-5 w-32 rounded bg-[#E5D5CC] mx-auto" />
                    <div className="mt-4 h-4 w-20 rounded-full bg-[#E5D5CC] mx-auto" />
                  </div>
                </div>
              ))}
            </div>
          ) : pengurus.length === 0 ? (

            /* EMPTY STATE */
            <div className="h-[420px] flex flex-col justify-center items-center">
              <div className="text-8xl">👥</div>

              <h2 className="mt-6 text-2xl font-bold text-white">
                Belum Ada Pengurus
              </h2>

              <p className="mt-4 text-gray-300 text-center">
                Data pengurus akan muncul setelah ditambahkan admin.
              </p>
            </div>
          ) : (

            /* PENGURUS CARDS */
            <div
              className="
                grid
                grid-cols-1
                sm:grid-cols-2
                lg:grid-cols-3
                gap-8
                justify-items-center
              "
            >
              {pengurus.map((item) => (
                <div
                  key={item.id}
                  className="
                    group
                    w-full
                    max-w-[280px]
                    rounded-2xl
                    overflow-hidden

                    !bg-[#F8F3EE]
                    border
                    border-[#E5D5CC]

                    shadow-md

                    transition-all
                    duration-300

                    hover:border-[#B86F52]
                    hover:-translate-y-2
                    hover:shadow-xl
                    hover:!bg-white
                  "
                >
                  {/* FOTO */}
                  <div className="flex justify-center pt-6">
                    <div className="relative w-[150px] h-[150px] overflow-hidden rounded-xl bg-[#EDE2D9]">
                      {item.foto ? (
                        <Image
                          src={item.foto}
                          alt={item.nama}
                          fill
                          className="
                            object-cover
                            transition-all
                            duration-300
                            group-hover:scale-105
                          "
                        />
                      ) : (
                        <div className="w-full h-full bg-[#EDE2D9] flex items-center justify-center">
                          <span className="text-5xl">👤</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* NAMA DAN JABATAN */}
                  <div className="pt-3 pb-5 px-4 text-center">
                    <h2 className="text-[18px] font-bold !text-[#49372F] leading-tight">
                      {item.nama}
                    </h2>

                    <div className="mx-auto my-4 h-[2px] w-12 rounded-full bg-[#B86F52]" />

                    <p className="mt-3 !text-[#B86F52] font-semibold text-[15px]">
                      {item.jabatan}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
