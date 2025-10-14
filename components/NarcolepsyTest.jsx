import { useState } from "react";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function NarcolepsyTest({ patientName, setPatientName }) {
  const questions = [
    {
      id: 1,
      text: "Gülme, sevinç, öfke gibi duygusal durumlarda kaslarda ani bir gevşeme (örneğin baş düşmesi, dizlerin boşalması, konuşmada zorlanma) yaşadınız mı?",
    },
    {
      id: 2,
      text: "Akşamları uykuya dalma süreniz genellikle ne kadar?",
      options: [
        "> 40 dakika",
        "31–40 dakika",
        "21–30 dakika",
        "10–20 dakika",
        "< 10 dakika",
      ],
    },
    {
      id: 3,
      text: "Gündüz saatlerinde istemsiz olarak uyuyakalma eğiliminiz ne sıklıkta oluyor?",
    },
    {
      id: 4,
      text: "Otururken, televizyon izlerken, yemek yerken veya konuşurken uykuya dalma durumunuz oluyor mu?",
    },
  ];

  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);

  const handleSelect = (id, value) => {
    setAnswers({ ...answers, [id]: Number(value) });
  };

  const calculateScore = () => {
    // Check if patient name is provided
    if (!patientName || !patientName.trim()) {
      alert("Lütfen adınızı ve soyadınızı girin.");
      return;
    }

    const total = Object.values(answers).reduce((a, b) => a + b, 0);
    setScore(total);
  };

  // Create WhatsApp message
  const whatsappMessage = encodeURIComponent(
    `Narcolepsi Testi Sonuçları:

Hasta Adı: ${patientName || "Belirtilmemiş"}

${questions
  .map(
    (q) =>
      `${q.id}. ${q.text}: ${
        answers[q.id] !== undefined ? answers[q.id] : "Cevaplanmadı"
      }`
  )
  .join("\n")}\n\nToplam Puan: ${
      score !== null ? score : "Henüz hesaplanmadı"
    } / ${questions.length * 3}`
  );

  return (
    <div className="rounded-2xl p-6 shadow-lg bg-card dark:bg-accent transition-colors border border-border dark:border-cta-active">
      <h3>Ullanlinna Narcolepsy Scale (UNS)</h3>
      <p className="mb-6 text-copy-secondary dark:text-copy-primary">
        Bu test,{" "}
        <strong>Harvard Medical School – Division of Sleep Medicine</strong>
        tarafından referans alınan <em>Ullanlinna Narcolepsy Scale</em>{" "}
        temelinde hazırlanmıştır. Narcolepsi belirtilerini değerlendirmeye
        yardımcı olur fakat tıbbi tanı yerine geçmez.
      </p>

      {questions.map((q) => (
        <div key={q.id} className="mb-6">
          <p className="font-medium mb-4 text-copy-primary dark:text-copy-secondary text-lg">
            {q.id}. {q.text}
          </p>
          <div className="flex flex-wrap gap-3">
            {[0, 1, 2, 3].map((val) => (
              <button
                key={val}
                onClick={() => handleSelect(q.id, val)}
                className={`px-5 py-3 rounded-xl cursor-pointer hover:bg-[#D2C1B6] hover:text-black hover:dark:bg-[#34656D] hover:dark:text-white  hover:shadow-md border transition-all duration-300 ${
                  answers[q.id] === val
                    ? "light:bg-[#D2C1B6] text-black dark:bg-[#34656D] dark:text-white"
                    : "hover:shadow-md"
                }`}
              >
                {val}
              </button>
            ))}
          </div>
        </div>
      ))}

      <p className="text-xs text-[#5A5243] dark:text-[#B6AE9F] opacity-60 mt-8 text-center">
        Kaynak: Harvard Medical School – Division of Sleep Medicine · Ullanlinna
        Narcolepsy Scale
      </p>
    </div>
  );
}
