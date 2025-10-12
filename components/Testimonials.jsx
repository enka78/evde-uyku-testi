"use client";
import { motion } from "framer-motion";

const testimonials = [
  { name: "Ahmet K.", text: "Uyku testini evde yapmak çok kolaydı. Çok memnun kaldım!" },
  { name: "Elif T.", text: "Sonuçlar hızlı geldi ve doktorum yönlendirdi." },
  { name: "Merve Y.", text: "Evde testi yaparken konforlu hissettim. Tavsiye ederim." },
];

export default function Testimonials() {
  return (
    <section className="bg-card-bg py-16">
      <div className="container mx-auto px-4 max-w-3xl text-center">
        <h2 className="text-3xl font-bold mb-12 text-foreground">Hasta Yorumları</h2>
        <div className="space-y-8">
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-6 bg-background rounded-2xl shadow-lg border border-border"
            >
              <p className="italic mb-4 text-foreground">"{t.text}"</p>
              <span className="font-semibold text-primary">– {t.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}