"use client";
import { useState } from "react";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Iletisim() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const message = encodeURIComponent(
      `İletişim Formu:\nAd: ${form.name}\nE-posta: ${form.email}\nMesaj: ${form.message}`
    );
    window.open(`https://wa.me/905123456789?text=${message}`, "_blank");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section className="pt-28 pb-20 container mx-auto max-w-xl px-4">
      <h1 className="text-3xl font-bold mb-8 text-center text-foreground">İletişim</h1>
      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-card-bg p-6 rounded-2xl shadow-lg border border-border"
      >
        <input
          type="text"
          name="name"
          placeholder="Adınız"
          value={form.name}
          onChange={handleChange}
          className="w-full p-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary bg-card-bg text-card-foreground"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="E-posta"
          value={form.email}
          onChange={handleChange}
          className="w-full p-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary bg-card-bg text-card-foreground"
          required
        />
        <textarea
          name="message"
          placeholder="Mesajınız"
          value={form.message}
          onChange={handleChange}
          className="w-full p-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary bg-card-bg text-card-foreground"
          required
        />
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-500 text-white px-6 py-3 rounded-lg font-semibold w-full cursor-pointer"
        >
          Whatsapp ile gönder
        </button>
      </form>

      {submitted && (
        <p className="mt-6 text-green-600 text-center font-semibold">
          Mesajınız gönderildi! En kısa sürede dönüş yapılacaktır.
        </p>
      )}

    </section>
  );
}