"use client";
import WhatsAppButton from "@/components/WhatsAppButton";
import NarcolepsyTest from "@/components/NarcolepsyTest";
import { useState } from "react";

export default function UykuApnesiTesti() {
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  const questions = [
    "Sık sık yüksek sesle horluyor musunuz?",
    "Geceleri nefesinizin durduğunu söyleyen oldu mu?",
    "Sabahları baş ağrısıyla uyanıyor musunuz?",
    "Gündüz aşırı uykulu hissediyor musunuz?",
    "Konsantrasyon sorunları yaşıyor musunuz?",
  ];

  const handleAnswer = (id, value) =>
    setAnswers((prev) => ({ ...prev, [id]: value }));

  const handleSubmit = () => {
    const yesCount = Object.values(answers).filter((a) => a === "Evet").length;
    if (yesCount >= 3) setResult("Riskli, uzman değerlendirmesi önerilir.");
    else if (yesCount === 2) setResult("Bazı belirtiler var, gözlemleyin.");
    else setResult("Belirgin risk yok, düzenli uyku önemli.");
  };

  // Dinamik WhatsApp mesajı oluştur
  const whatsappMessage = encodeURIComponent(
    `Uyku Testi Sonuçları:\n\n${questions
      .map((q, i) => `${q}: ${answers[i] || "Cevaplanmadı"}`)
      .join("\n")}\n\nSonuç: ${result || "Henüz hesaplanmadı"}`
  );

  return (
    <section className="pt-28 pb-16 container mx-auto max-w-6xl px-4">
      <h1 className="text-3xl font-bold mb-8 text-center text-copy-primary dark:text-copy-secondary">
        Uyku Bozuklukları Testi
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Sleep Apnea Test */}
        <div className="bg-background dark:bg-card rounded-2xl shadow-xl p-8 border border-border dark:border-cta-active">
          <h2 className="text-2xl font-bold mb-6 text-center border-b border-border text-copy-primary pb-3">
            Uyku Apnesi Testi
          </h2>

          {questions.map((q, i) => (
            <div
              key={i}
              className="p-6 border rounded-xl bg-card dark:bg-accent shadow-sm mb-5 border-border dark:border-cta-active hover:border-border/70 dark:hover:border-cta-active/70 transition-colors"
            >
              <p className="font-medium mb-4 text-copy-primary dark:text-copy-secondary text-lg">
                {q}
              </p>
              <div className="flex space-x-6">
                {["Evet", "Hayır"].map((option) => (
                  <label
                    key={option}
                    className="flex items-center space-x-2 text-colorSecond-light dark:text-colorSecond-dark cursor-pointer"
                  >
                    <input
                      type="radio"
                      name={`q${i}`}
                      value={option}
                      checked={answers[i] === option}
                      onChange={(e) => handleAnswer(i, e.target.value)}
                      className="accent-accent dark:accent-cta w-5 h-5"
                    />
                    <span className="text-lg">{option}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}

          <div className="text-center mt-8">
            <button
              onClick={handleSubmit}
              className="button w-full px-8 py-4 rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Sonucu Gör
            </button>
          </div>

          {result && (
            <>
              <div className="mt-8 card text-center ">
                {result}
              </div>

              <div className="mt-6 flex justify-center">
                <WhatsAppButton
                  phone="905123456789"
                  message={whatsappMessage}
                  text="Sonucu Uzmanımıza Gönder"
                />
              </div>
            </>
          )}
        </div>

        {/* Narcolepsy Test */}
        <div className="bg-background-light dark:bg-background-dark rounded-2xl shadow-xl p-8 border border-primary-light dark:border-primary-dark">
          <h2 className="text-2xl font-bold mb-6 text-center text-colorFirst-light dark:text-colorFirst-dark border-b border-primary-light dark:border-primary-dark pb-3">
            Narcolepsi Testi
          </h2>
          <NarcolepsyTest />
        </div>
      </div>
    </section>
  );
}
