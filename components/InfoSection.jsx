"use client";
import { CheckCircle } from "lucide-react";

const infoItems = [
  {
    title: "Uyku Testi Nedir?",
    description:
      "Evde yapılan uyku testi, horlama ve apne belirtilerini ölçmenizi sağlar.",
  },
  {
    title: "Kimler Yaptırmalı?",
    description: "Uyku bozukluğu şüphesi olan herkes testi yaptırabilir.",
  },
  {
    title: "Neden Önemli?",
    description:
      "Erken teşhis, sağlık sorunlarını önler ve yaşam kalitesini artırır.",
  },
];

export default function InfoSection() {
  return (
    <section className="container mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-center mb-12 text-colorFirst-light dark:text-colorFirst-dark">
        Uyku Testi Hakkında
      </h2>
      <div className="grid md:grid-cols-3 gap-8">
        {infoItems.map((item, idx) => (
          <div
            key={idx}
            className="p-6 bg-background dark:bg-card rounded-2xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-1 border border-border dark:border-cta-active hover:border-border/70 dark:hover:border-cta-active/70"
          >
            <CheckCircle className="text-accent dark:text-cta-active mb-4 w-10 h-10" />
            <h3 className="text-xl font-semibold mb-2 text-copy-primary dark:text-copy-secondary">
              {item.title}
            </h3>
            <p className="text-copy-secondary dark:text-copy-primary">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
