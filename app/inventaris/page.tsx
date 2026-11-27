
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import Navbar from "../admin/components/Navbar";
import Footer from "../admin/components/Footer";
import { supabase } from "../lib/supabase";

interface InventarisData {
  id: number;
  nama_alat: string;
  jumlah: number;
  foto: string | null;
}

export default function InventarisPage() {
  const [inventaris, setInventaris] = useState<InventarisData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getInventaris();
  }, []);

  async function getInventaris() {
    setLoading(true);

    const { data, error } = await supabase
      .from("inventaris")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      console.log(error);
      setLoading(false);
      return;
    }

    setInventaris(data ?? []);
    setLoading(false);
  }

  return (
    <main className="min-h-screen flex flex-col text-white bg-gradient-to-br from-[#0F2D1F] via-[#173826] to-[#214B35]">
      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top,#ffffff_1px,transparent_1px)] bg-[length:22px_22px]" />

        <div className="relative max-w-[1400px] mx-auto px-6 py-8 text-center">
          <h1 className="text-[30px] font-bold !text-[#F8F3EE]">
            Inventaris Masjid
          </h1>

          <div className="mx-auto mt-4 w-24 h-[3px] rounded-full bg-[#B86F52]" />
        </div>
      </section>

      {/* CONTENT */}
      <section className="flex-1 py-10">
        <div className="max-w-[1400px] mx-auto px-6">

          {/* LOADING */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
              {[...Array(6)].map((_, index) => (
                <div
                  key={index}
                  className="
                    w-full
                    max-w-[320px]
                    min-h-[320px]
                    rounded-[28px]
                    animate-pulse
                    bg-[#F8F3EE]
                    border
                    border-[#E5D5CC]
                  "
                />
              ))}
            </div>
          ) : inventaris.length === 0 ? (

            /* EMPTY STATE */
            <div className="h-[420px] flex flex-col items-center justify-center">
              <div className="text-8xl">📦</div>

              <h2 className="mt-6 text-2xl font-bold text-white">
                Belum Ada Inventaris
              </h2>

              <p className="mt-3 text-gray-300">
                Data inventaris akan tampil di sini.
              </p>
            </div>
          ) : (

            /* INVENTARIS CARDS */
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
              {inventaris.map((item) => (
                <div
                  key={item.id}
                  className="
                    group
                    relative

                    w-full
                    max-w-[320px]
                    min-h-[320px]

                    rounded-[28px]
                    overflow-hidden

                    !bg-[#F8F3EE]
                    border
                    border-[#E5D5CC]

                    shadow-lg

                    transition-all
                    duration-300

                    hover:-translate-y-2
                    hover:shadow-2xl
                    hover:border-[#B86F52]
                    hover:!bg-white
                  "
                >
                  {/* BADGE JUMLAH */}
                  <div
                    className="
                      absolute
                      top-4
                      right-5
                      z-20

                      flex
                      items-center
                      justify-center

                      min-w-[90px]
                      h-[42px]

                      rounded-full

                      bg-[#B86F52]

                      text-white
                      text-[17px]
                      font-bold

                      shadow-md
                    "
                  >
                    {item.jumlah} pcs
                  </div>

                  {/* FOTO */}
                  <div className="flex justify-center pt-8">
                    <div className="relative w-[200px] h-[200px] rounded-2xl overflow-hidden bg-[#EDE2D9]">
                      {item.foto ? (
                        <Image
                          src={item.foto}
                          alt={item.nama_alat}
                          fill
                          className="
                            object-cover
                            transition-all
                            duration-300
                            group-hover:scale-105
                          "
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-5xl">📦</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* NAMA BARANG */}
                  <div className="px-7 pt-6 pb-5 text-center">
                    <h2 className="text-[20px] font-bold !text-[#49372F] leading-tight">
                      {item.nama_alat}
                    </h2>

                    <div className="mx-auto mt-4 mb-2 w-14 h-[2px] rounded-full bg-[#B86F52]" />
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
