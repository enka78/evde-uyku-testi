"use client";
import WhatsAppButton from "@/components/WhatsAppButton";
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
    <section className="pt-28 pb-16 container mx-auto max-w-2xl px-4">
      <h1 className="text-3xl font-bold mb-8 text-center text-foreground">Uyku Apnesi Testi</h1>

      {questions.map((q, i) => (
        <div
          key={i}
          className="p-4 border rounded-lg bg-card-bg shadow-sm mb-4 border-border"
        >
          <p className="font-medium mb-2 text-card-foreground">{q}</p>
          <div className="flex space-x-4">
            {["Evet", "Hayır"].map((option) => (
              <label key={option} className="flex items-center space-x-2 text-foreground">
                <input
                  type="radio"
                  name={`q${i}`}
                  value={option}
                  checked={answers[i] === option}
                  onChange={(e) => handleAnswer(i, e.target.value)}
                  className="accent-primary"
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        </div>
      ))}

      <div className="text-center mt-6">
        <button
          onClick={handleSubmit}
          className="bg-primary hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold"
        >
          Sonucu Gör
        </button>
      </div>

      {result && (
        <>
          <div className="mt-8 p-6 bg-blue-50 dark:bg-gray-800 border-l-4 border-primary rounded-lg text-center text-lg text-foreground">
            {result}
          </div>

          <WhatsAppButton
            phone="905123456789"
            text="Sonucu Uzmanımıza Gönder"
            className="mt-4"
            message={whatsappMessage}
          />
        </>
      )}
    </section>
  );
}