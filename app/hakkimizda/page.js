"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import WhatsAppButton from "@/components/WhatsAppButton";
import Image from "next/image";

const teamMembers = [
  { name: "Metin İlkılıç", role: "Uyku Teknisyeni" },
  { name: "İbrahim Kayalı", role: "Cihaz ve Uyku Danışmanı" },
];

export default function Hakkimizda() {
  const [form, setForm] = useState({ name: "", message: "" });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section className="flex flex-col">
      <div className="w-full h-[20rem] overflow-hidden flex justify-center items-center">
        <Image
          className="object-cover object-center"
          src="/img/uyku-3.png"
          alt="evde uyku testi"
          width={1520}
          height={1011}
        />

        <div className="hidden md:flex absolute inset-0 z-10 items-center justify-center text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="flex flex-col items-center"
          >
            <h1 className="text-3xl font-bold text-center text-copy-primary dark:text-copy-secondary">
              Hakkımızda
            </h1>
          </motion.div>
        </div>
      </div>
      <div className="pt-28 pb-20 container mx-auto px-4">
        <p className="text-center text-lg mb-12 text-copy-secondary dark:text-copy-primary max-w-3xl mx-auto">
          Evde uyku testi hizmetiyle sağlığınızı korumanıza yardımcı oluyoruz.
        </p>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {teamMembers.map((member, idx) => (
            <motion.div
              key={idx}
              className="p-6 bg-card dark:bg-accent rounded-2xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-1 border border-border dark:border-cta-active hover:border-border/70 dark:hover:border-cta-active/70"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-semibold text-center text-copy-primary dark:text-copy-secondary">
                {member.name}
              </h3>
              <p className="text-center text-copy-secondary dark:text-copy-primary">
                {member.role}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Cihaz Satış ve Teknik Servis Formu */}
        <div className="mt-16 max-w-2xl mx-auto">
          <motion.div
            className="p-6 bg-card dark:bg-accent rounded-2xl shadow-lg border border-border dark:border-cta-active"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-4 text-center text-copy-primary dark:text-copy-secondary">
              Cihaz Satış ve Teknik Servis
            </h3>
            <p className="text-center mb-6 text-copy-secondary dark:text-copy-primary">
              Cihaz satın almak veya teknik servis için bilgi almak istiyorsanız
              aşağıdaki formu doldurun.
            </p>

            <form className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Adınız Soyadınız"
                value={form.name}
                onChange={handleChange}
                className="w-full p-3 rounded-xl border border-border dark:border-cta-active focus:outline-none focus:ring-2 focus:ring-border dark:focus:ring-cta-active bg-card dark:bg-accent text-copy-secondary dark:text-copy-primary transition-all"
                required
              />
              <textarea
                name="message"
                placeholder="Mesajınız"
                value={form.message}
                onChange={handleChange}
                rows="4"
                className="w-full p-3 rounded-xl border border-border dark:border-cta-active focus:outline-none focus:ring-2 focus:ring-border dark:focus:ring-cta-active bg-card dark:bg-accent text-copy-secondary dark:text-copy-primary transition-all"
                required
              />
              {/* Using WhatsAppButton component instead of custom button */}
              <div className="w-full">
                <WhatsAppButton
                  phone="905532808273"
                  text="WhatsApp ile Gönder"
                  message={`Cihaz Satış ve Teknik Servis Talebi:%0AAd Soyad: ${form.name}%0AMesaj: ${form.message}`}
                  className="w-full"
                />
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
