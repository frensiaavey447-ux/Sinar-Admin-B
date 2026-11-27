
"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import InventarisTable from "./InventarisTable";
import InventarisPopup from "./InventarisPopup";

import { supabase } from "../../lib/supabase";
import type { InventarisData } from "./types";

export default function InventarisPage() {
  const emptyForm: InventarisData = {
    id: 0,
    nama_alat: "",
    jumlah: 0,
    foto: "",
  };

  const [form, setForm] = useState<InventarisData>(emptyForm);
  const [data, setData] = useState<InventarisData[]>([]);
  const [selectedData, setSelectedData] =
    useState<InventarisData | null>(null);
  const [openPopup, setOpenPopup] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  // ================= GET DATA =================

  async function getData() {
    const { data, error } = await supabase
      .from("inventaris")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      console.error("Gagal mengambil data:", error.message);
      alert("Gagal mengambil data inventaris: " + error.message);
      return;
    }

    setData(data ?? []);
  }

  // ================= RESET FORM =================

  function resetForm() {
    setForm({
      id: 0,
      nama_alat: "",
      jumlah: 0,
      foto: "",
    });
  }

  // ================= TAMBAH =================

  function handleTambah() {
    setSelectedData(null);
    resetForm();
    setOpenPopup(true);
  }

  // ================= EDIT =================

  function handleEdit(item: InventarisData) {
    setSelectedData(item);
    setForm({ ...item });
    setOpenPopup(true);
  }

  // ================= CLOSE =================

  function handleClose() {
    setSelectedData(null);
    resetForm();
    setOpenPopup(false);
  }

  // ================= UPLOAD FOTO =================

  async function uploadFoto(foto: string): Promise<string> {
    // Jika foto sudah berupa URL permanen, gunakan langsung.
    if (foto.startsWith("https://") || foto.startsWith("http://")) {
      return foto;
    }

    // Foto dari URL.createObjectURL(file) berupa blob:
    if (!foto.startsWith("blob:")) {
      throw new Error("Foto tidak valid. Silakan upload ulang foto.");
    }

    // Ambil file dari blob URL
    const response = await fetch(foto);

    if (!response.ok) {
      throw new Error("Gagal membaca foto. Silakan upload ulang.");
    }

    const blob = await response.blob();

    // Tentukan ekstensi file
    const extension =
      blob.type === "image/png"
        ? "png"
        : blob.type === "image/webp"
        ? "webp"
        : blob.type === "image/gif"
        ? "gif"
        : "jpg";

    // Nama file unik
    const fileName = `inventaris-${Date.now()}-${Math.random()
      .toString(36)
      .substring(2)}.${extension}`;

    const filePath = fileName;

    // Upload ke Supabase Storage bucket inventaris
    const { error: uploadError } = await supabase.storage
      .from("inventaris")
      .upload(filePath, blob, {
        contentType: blob.type || "image/jpeg",
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) {
      throw new Error("Gagal upload foto: " + uploadError.message);
    }

    // Ambil URL publik
    const { data: publicUrlData } = supabase.storage
      .from("inventaris")
      .getPublicUrl(filePath);

    return publicUrlData.publicUrl;
  }

  // ================= SIMPAN =================

  async function simpanData() {
    if (!form.nama_alat.trim() || form.jumlah <= 0 || !form.foto) {
      alert("Lengkapi nama alat, jumlah, dan foto.");
      return;
    }

    try {
      setLoading(true);

      const fotoUrl = await uploadFoto(form.foto);

      const { error } = await supabase
        .from("inventaris")
        .insert({
          nama_alat: form.nama_alat.trim(),
          jumlah: form.jumlah,
          foto: fotoUrl,
        });

      if (error) {
        alert("Gagal menyimpan data: " + error.message);
        return;
      }

      alert("Data inventaris berhasil ditambahkan!");

      await getData();
      handleClose();
    } catch (error) {
      console.error(error);
      alert(
        error instanceof Error
          ? error.message
          : "Terjadi kesalahan saat menyimpan data."
      );
    } finally {
      setLoading(false);
    }
  }

  // ================= UPDATE =================

  async function updateData() {
    if (!selectedData) {
      alert("Pilih data yang akan diupdate.");
      return;
    }

    if (!form.nama_alat.trim() || form.jumlah <= 0 || !form.foto) {
      alert("Lengkapi nama alat, jumlah, dan foto.");
      return;
    }

    try {
      setLoading(true);

      const fotoUrl = await uploadFoto(form.foto);

      const { error } = await supabase
        .from("inventaris")
        .update({
          nama_alat: form.nama_alat.trim(),
          jumlah: form.jumlah,
          foto: fotoUrl,
        })
        .eq("id", selectedData.id);

      if (error) {
        alert("Gagal mengupdate data: " + error.message);
        return;
      }

      alert("Data inventaris berhasil diupdate!");

      await getData();
      handleClose();
    } catch (error) {
      console.error(error);
      alert(
        error instanceof Error
          ? error.message
          : "Terjadi kesalahan saat mengupdate data."
      );
    } finally {
      setLoading(false);
    }
  }

  // ================= HAPUS =================

  async function hapusData() {
    if (!selectedData) {
      alert("Pilih data yang akan dihapus.");
      return;
    }

    const konfirmasi = confirm(
      "Yakin ingin menghapus data inventaris ini?"
    );

    if (!konfirmasi) return;

    try {
      setLoading(true);

      const { error } = await supabase
        .from("inventaris")
        .delete()
        .eq("id", selectedData.id);

      if (error) {
        alert("Gagal menghapus data: " + error.message);
        return;
      }

      alert("Data inventaris berhasil dihapus!");

      await getData();
      handleClose();
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan saat menghapus data.");
    } finally {
      setLoading(false);
    }
  }

  // ================= TAMPILAN =================

  return (
    <main className="min-h-screen bg-[#16240D] text-white flex flex-col">
      <Navbar />

      <section
        className="
          flex-1
          w-full
          max-w-6xl
          mx-auto
          px-3
          md:px-7
          py-4
          pb-18
        "
      >
        {/* Header */}
        <div
          className="
            flex
            flex-col
            lg:flex-row
            lg:items-center
            lg:justify-between
            gap-6
            mb-6
          "
        >
          <h1 className="text-[38px] font-bold text-white">
            Inventaris
          </h1>

          <button
            type="button"
            onClick={handleTambah}
            disabled={loading}
            className="
              flex
              items-center
              justify-center
              gap-2
              bg-[#4D7B38]
              hover:bg-[#3F662E]
              text-white
              font-semibold
              px-3
              py-3
              text-[14px]
              rounded-2xl
              shadow-lg
              transition-all
              duration-300
              hover:scale-105
              w-full
              lg:w-auto
              disabled:opacity-50
              disabled:cursor-not-allowed
            "
          >
            <Plus size={20} />
            Tambah Inventaris
          </button>
        </div>

        {/* Card */}
        <div className="bg-white text-gray-900 rounded-3xl shadow-xl p-5 md:p-6">
          <div className="mb-4">
            <h2 className="text-[30px] font-bold text-gray-800">
              Daftar Inventaris
            </h2>
          </div>

          <InventarisTable
            data={data}
            onSelect={handleEdit}
          />
        </div>

        {/* Popup */}
        <InventarisPopup
          open={openPopup}
          selected={selectedData}
          form={form}
          setForm={setForm}
          onClose={handleClose}
          onSave={simpanData}
          onEdit={() => {}}
          onUpdate={updateData}
          onDelete={hapusData}
        />

        {loading && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/30">
            <div className="rounded-2xl bg-white px-8 py-5 text-gray-800 shadow-xl">
              <p className="font-semibold">
                Sedang memproses...
              </p>
            </div>
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}
