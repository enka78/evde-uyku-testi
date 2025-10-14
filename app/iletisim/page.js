"use client";
import { useState } from "react";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Iletisim() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  return (
    <section className="pt-28 pb-20 container mx-auto max-w-xl px-4">
      <h1 className="text-3xl font-bold mb-8 text-center text-copy-primary dark:text-copy-secondary">
        İletişim
      </h1>
      <form className="space-y-6 bg-card dark:bg-accent p-8 rounded-2xl shadow-xl border border-border dark:border-cta-active">
        <input
          type="text"
          name="name"
          placeholder="Adınız"
          value={form.name}
          onChange={handleChange}
          className="w-full p-4 rounded-xl border border-border dark:border-cta-active focus:outline-none focus:ring-2 focus:ring-border dark:focus:ring-cta-active bg-card dark:bg-accent text-copy-secondary dark:text-copy-primary transition-all"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="E-posta"
          value={form.email}
          onChange={handleChange}
          className="w-full p-4 rounded-xl border border-border dark:border-cta-active focus:outline-none focus:ring-2 focus:ring-border dark:focus:ring-cta-active bg-card dark:bg-accent text-copy-secondary dark:text-copy-primary transition-all"
          required
        />
        <textarea
          name="message"
          placeholder="Mesajınız"
          value={form.message}
          onChange={handleChange}
          rows="5"
          className="w-full p-4 rounded-xl border border-border dark:border-cta-active focus:outline-none focus:ring-2 focus:ring-border dark:focus:ring-cta-active bg-card dark:bg-accent text-copy-secondary dark:text-copy-primary transition-all"
          required
        />
        {/* Using WhatsAppButton component instead of custom button */}
        <div className="w-full">
          <WhatsAppButton
            phone="905323553622"
            text="Whatsapp ile gönder"
            message={`İletişim Formu (uykubilimlerimerkezi.com):%0AAd: ${form.name}%0AE-posta: ${form.email}%0AMesaj: ${form.message}`}
            className="flex items-center justify-center w-full gap-2"
          />
        </div>
      </form>

      <p className="mt-4 text-center text-sm text-copy-secondary dark:text-copy-primary">
        Bu form uykubilimlerimerkezi.com üzerinden gönderilmiştir.
      </p>
    </section>
  );
}
