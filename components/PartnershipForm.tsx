"use client";

import type { ChangeEvent, FormEvent } from "react";
import { useState } from "react";
import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";

const collaborationTypes = [
  "Kolaborasi Program",
  "Media Partner",
  "Sponsorship",
  "Dukungan Pendidikan",
  "Volunteering",
  "Lainnya",
];

const initialForm = {
  name: "",
  organization: "",
  email: "",
  whatsapp: "",
  collaborationType: "Kolaborasi Program",
  title: "",
  description: "",
  targetDate: "",
  note: "",
  website: "",
};

export default function PartnershipForm() {
  const [form, setForm] = useState(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function updateField(
    event:
      | ChangeEvent<HTMLInputElement>
      | ChangeEvent<HTMLTextAreaElement>
      | ChangeEvent<HTMLSelectElement>,
  ) {
    const { name, value } = event.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsSubmitting(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response = await fetch("/api/partnership", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Pengajuan gagal dikirim.");
      }

      setSuccessMessage(result.message || "Pengajuan berhasil dikirim.");
      setForm(initialForm);
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Terjadi kesalahan saat mengirim pengajuan.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[2rem] border border-[#d9d9f5] bg-white p-5 shadow-sm md:p-7"
    >
      <input
        type="text"
        name="website"
        value={form.website}
        onChange={updateField}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
      />

      <div className="border-b border-[#d9d9f5] pb-5">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#006399]">
          Detail Pengajuan
        </p>

        <h2 className="mt-3 text-2xl font-bold text-[#000767]">
          Ceritakan rencana kolaborasi kamu.
        </h2>

        <p className="mt-3 text-sm leading-7 text-[#3f4851]">
          Field bertanda bintang wajib diisi. Gunakan informasi yang jelas agar
          tim YOLO lebih mudah meninjau pengajuan.
        </p>
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <FormField label="Nama Lengkap" htmlFor="name" required>
          <input
            id="name"
            name="name"
            type="text"
            value={form.name}
            onChange={updateField}
            required
            placeholder="Nama lengkap"
            className={inputClassName}
          />
        </FormField>

        <FormField
          label="Instansi / Komunitas / Brand"
          htmlFor="organization"
          required
        >
          <input
            id="organization"
            name="organization"
            type="text"
            value={form.organization}
            onChange={updateField}
            required
            placeholder="Nama instansi atau komunitas"
            className={inputClassName}
          />
        </FormField>

        <FormField label="Email" htmlFor="email" required>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={updateField}
            required
            placeholder="nama@email.com"
            className={inputClassName}
          />
        </FormField>

        <FormField label="Nomor WhatsApp" htmlFor="whatsapp" required>
          <input
            id="whatsapp"
            name="whatsapp"
            type="tel"
            value={form.whatsapp}
            onChange={updateField}
            required
            placeholder="08xxxxxxxxxx"
            className={inputClassName}
          />
        </FormField>

        <FormField
          label="Jenis Kolaborasi"
          htmlFor="collaborationType"
          required
        >
          <select
            id="collaborationType"
            name="collaborationType"
            value={form.collaborationType}
            onChange={updateField}
            required
            className={inputClassName}
          >
            {collaborationTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </FormField>

        <FormField label="Target Waktu Kegiatan" htmlFor="targetDate">
          <input
            id="targetDate"
            name="targetDate"
            type="date"
            value={form.targetDate}
            onChange={updateField}
            className={inputClassName}
          />
        </FormField>
      </div>

      <div className="mt-5">
        <FormField label="Judul / Ide Kolaborasi" htmlFor="title" required>
          <input
            id="title"
            name="title"
            type="text"
            value={form.title}
            onChange={updateField}
            required
            placeholder="Contoh: Kolaborasi Kelas Tumbuh bersama YOLO"
            className={inputClassName}
          />
        </FormField>
      </div>

      <div className="mt-5">
        <FormField label="Deskripsi Singkat" htmlFor="description" required>
          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={updateField}
            required
            rows={5}
            placeholder="Ceritakan konsep, tujuan, target peserta, bentuk kerja sama, dan kebutuhan kegiatan."
            className={inputClassName}
          />
        </FormField>
      </div>

      <div className="mt-5">
        <FormField label="Catatan Tambahan" htmlFor="note">
          <textarea
            id="note"
            name="note"
            value={form.note}
            onChange={updateField}
            rows={3}
            placeholder="Opsional. Contoh: kebutuhan tempat, media partner, proposal, konsumsi, atau detail lainnya."
            className={inputClassName}
          />
        </FormField>
      </div>

      {successMessage ? (
        <div className="mt-5 flex gap-3 rounded-2xl border border-green-200 bg-green-50 p-4 text-sm font-semibold text-green-700">
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
          <p>{successMessage}</p>
        </div>
      ) : null}

      {errorMessage ? (
        <div className="mt-5 flex gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
          <p>{errorMessage}</p>
        </div>
      ) : null}

      <div className="mt-7 flex flex-col gap-4 border-t border-[#d9d9f5] pt-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-6 text-[#3f4851]">
          Dengan mengirim form, pengajuan akan masuk ke database partnership
          YOLO untuk ditinjau.
        </p>

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-[#006399] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#1da1f2] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Mengirim...
            </>
          ) : (
            <>
              <Send className="h-4 w-4" />
              Kirim Pengajuan
            </>
          )}
        </button>
      </div>
    </form>
  );
}

function FormField({
  label,
  htmlFor,
  required = false,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className="block">
      <span className="mb-2 block text-sm font-bold text-[#000767]">
        {label}
        {required ? <span className="text-[#df8400]"> *</span> : null}
      </span>

      {children}
    </label>
  );
}

const inputClassName =
  "w-full rounded-2xl border border-[#d9d9f5] bg-[#fbf8ff] px-4 py-3 text-sm font-semibold text-[#000767] outline-none transition placeholder:text-[#8a97a5] focus:border-[#006399] focus:bg-white focus:ring-4 focus:ring-[#cde5ff]";
