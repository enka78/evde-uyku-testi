"use client";
import { motion } from "framer-motion";

const teamMembers = [
  { name: "Metin İlkılıç", role: "Uyku Teknisyeni" },
  { name: "İbrahim Kayalı", role: "Uyku Danışmanı" },
];

export default function Hakkimizda() {
  return (
    <section className="pt-28 pb-20 container mx-auto px-4">
      <motion.h1
        className="text-3xl md:text-4xl font-bold mb-10 text-center text-copy-primary dark:text-copy-secondary"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Hakkımızda
      </motion.h1>
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
    </section>
  );
}
