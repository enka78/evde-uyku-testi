"use client";
import WhatsAppButton from "@/components/WhatsAppButton";
import NarcolepsyTest from "@/components/NarcolepsyTest";
import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function UykuApnesiTesti() {
  const [answers, setAnswers] = useState({});
  const [narcolepsyAnswers, setNarcolepsyAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [narcolepsyScore, setNarcolepsyScore] = useState(null);
  const [patientName, setPatientName] = useState("");
  const [showResults, setShowResults] = useState(false);

  const questions = [
    "Sık sık yüksek sesle horluyor musunuz?",
    "Geceleri nefesinizin durduğunu söyleyen oldu mu?",
    "Sabahları baş ağrısıyla uyanıyor musunuz?",
    "Gündüz aşırı uykulu hissediyor musunuz?",
    "Konsantrasyon sorunları yaşıyor musunuz?",
  ];

  const narcolepsyQuestions = [
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

  const handleAnswer = (id, value) =>
    setAnswers((prev) => ({ ...prev, [id]: value }));

  const handleNarcolepsyAnswer = (id, value) =>
    setNarcolepsyAnswers((prev) => ({ ...prev, [id]: Number(value) }));

  const handleSubmit = () => {
    // Check if patient name is provided
    if (!patientName.trim()) {
      alert("Lütfen adınızı ve soyadınızı girin.");
      return;
    }

    // Check if all sleep apnea questions are answered
    const unansweredSleepApnea = questions.filter((_, i) => !answers[i]);
    if (unansweredSleepApnea.length > 0) {
      alert("Lütfen uyku apnesi testindeki tüm soruları cevaplayınız.");
      return;
    }

    // Check if all narcolepsy questions are answered
    const unansweredNarcolepsy = narcolepsyQuestions.filter(
      (q) => narcolepsyAnswers[q.id] === undefined
    );
    if (unansweredNarcolepsy.length > 0) {
      alert("Lütfen narcolepsi testindeki tüm soruları cevaplayınız.");
      return;
    }

    // Calculate sleep apnea result
    const yesCount = Object.values(answers).filter((a) => a === "Evet").length;
    let sleepApneaResult;
    if (yesCount >= 3)
      sleepApneaResult = "Riskli, uzman değerlendirmesi önerilir.";
    else if (yesCount === 2)
      sleepApneaResult = "Bazı belirtiler var, gözlemleyin.";
    else sleepApneaResult = "Belirgin risk yok, düzenli uyku önemli.";

    // Calculate narcolepsy score
    const total = Object.values(narcolepsyAnswers).reduce((a, b) => a + b, 0);

    setResult(sleepApneaResult);
    setNarcolepsyScore(total);
    setShowResults(true);
  };

  // Dinamik WhatsApp mesajı oluştur
  const whatsappMessage = encodeURIComponent(
    `Uyku Testi Sonuçları:

Hasta Adı: ${patientName || "Belirtilmemiş"}

UYKU APNESİ TESTİ
${questions.map((q, i) => `${q}: ${answers[i] || "Cevaplanmadı"}`).join("\n")}
Sonuç: ${result || "Henüz hesaplanmadı"}

NARCOLEPSİ TESTİ
${narcolepsyQuestions
  .map(
    (q) =>
      `${q.id}. ${q.text}: ${
        narcolepsyAnswers[q.id] !== undefined
          ? narcolepsyAnswers[q.id]
          : "Cevaplanmadı"
      }`
  )
  .join("\n")}
Toplam Puan: ${
      narcolepsyScore !== null ? narcolepsyScore : "Henüz hesaplanmadı"
    } / ${narcolepsyQuestions.length * 3}`
  );

  return (
    <section className="flex flex-col">
      <div className="w-full h-[20rem] overflow-hidden flex justify-center items-center">
        <Image
          className="object-cover object-center"
          src="/img/uyku-1.png"
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
              Uyku Bozuklukları Testi
            </h1>
          </motion.div>
        </div>
      </div>

      <div className="pt-28 pb-16 container mx-auto max-w-6xl px-4">
        {/* Single Patient Name Input */}
        <div className="mb-8 max-w-2xl mx-auto">
          <label className="block text-copy-primary dark:text-copy-secondary mb-2 text-lg font-medium">
            Hasta Adı Soyadı:
          </label>
          <input
            type="text"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            className="w-full p-4 rounded-xl border border-border dark:border-cta-active focus:outline-none focus:ring-2 focus:ring-border dark:focus:ring-cta-active bg-card dark:bg-accent text-copy-secondary dark:text-copy-primary transition-all text-lg"
            placeholder="Adınızı ve soyadınızı girin"
          />
        </div>

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
          </div>

          {/* Narcolepsy Test */}
          <div className="bg-background-light dark:bg-background-dark rounded-2xl shadow-xl p-8 border border-primary-light dark:border-primary-dark">
            <h2 className="text-2xl font-bold mb-6 text-center text-colorFirst-light dark:text-colorFirst-dark border-b border-primary-light dark:border-primary-dark pb-3">
              Narcolepsi Testi
            </h2>

            {/* Narcolepsy Test Description */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-copy-primary dark:text-copy-secondary">
                Ullanlinna Narcolepsy Scale (UNS)
              </h3>
              <p className="mb-4 text-copy-secondary dark:text-copy-primary">
                Bu test,{" "}
                <strong>
                  Harvard Medical School – Division of Sleep Medicine
                </strong>
                tarafından referans alınan <em>Ullanlinna Narcolepsy Scale</em>{" "}
                temelinde hazırlanmıştır. Narcolepsi belirtilerini
                değerlendirmeye yardımcı olur fakat tıbbi tanı yerine geçmez.
              </p>
              <p className="text-xs text-[#5A5243] dark:text-[#B6AE9F] opacity-60">
                Kaynak: Harvard Medical School – Division of Sleep Medicine ·
                Ullanlinna Narcolepsy Scale
              </p>
            </div>

            {narcolepsyQuestions.map((q) => (
              <div key={q.id} className="mb-6">
                <p className="font-medium mb-4 text-copy-primary dark:text-copy-secondary text-lg">
                  {q.id}. {q.text}
                </p>
                <div className="flex flex-wrap gap-3">
                  {[0, 1, 2, 3].map((val) => (
                    <button
                      key={val}
                      onClick={() => handleNarcolepsyAnswer(q.id, val)}
                      className={`px-5 py-3 rounded-xl cursor-pointer hover:bg-[#D2C1B6] hover:text-black hover:dark:bg-[#34656D] hover:dark:text-white  hover:shadow-md border transition-all duration-300 ${
                        narcolepsyAnswers[q.id] === val
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
          </div>
        </div>

        {/* Single Result Button */}
        <div className="text-center mt-10 max-w-2xl mx-auto">
          <button
            onClick={handleSubmit}
            className="button w-full px-8 py-4 rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Test Sonuçlarını Gör
          </button>
        </div>

        {/* Results Section */}
        {showResults && (
          <div className="mt-10 max-w-4xl mx-auto bg-card dark:bg-accent rounded-2xl shadow-xl p-8 border border-border dark:border-cta-active">
            <h2 className="text-2xl font-bold mb-6 text-center text-copy-primary dark:text-copy-secondary">
              Test Sonuçlarınız
            </h2>

            {/* Sleep Apnea Result */}
            <div className="mb-8 p-6 rounded-xl bg-background-light dark:bg-background-dark border border-border dark:border-primary-dark">
              <h3 className="text-xl font-bold mb-4 text-copy-primary dark:text-copy-secondary">
                Uyku Apnesi Testi Sonucu
              </h3>
              <div className="card text-center p-4">{result}</div>
            </div>

            {/* Narcolepsy Result */}
            <div className="mb-8 p-6 rounded-xl bg-background-light dark:bg-background-dark border border-border dark:border-primary-dark">
              <h3 className="text-xl font-bold mb-4 text-copy-primary dark:text-copy-secondary">
                Narcolepsi Testi Sonucu
              </h3>
              <div className="p-5 rounded-xl bg-accent/10 dark:bg-cta-active/10 border border-accent/20 dark:border-cta-active/20 text-copy-primary dark:text-copy-secondary">
                <p className="text-lg font-semibold">
                  Toplam Puanınız: {narcolepsyScore} /{" "}
                  {narcolepsyQuestions.length * 3}
                </p>
                <p className="mt-2">
                  Yüksek puanlar, narcolepsi belirtilerinin daha sık yaşandığını
                  gösterebilir. Tanı için mutlaka bir uyku uzmanına başvurun.
                </p>
              </div>
            </div>

            {/* Single WhatsApp Button */}
            <div className="mt-6 flex justify-center">
              <WhatsAppButton
                phone="905323553622"
                message={whatsappMessage}
                text="Sonuçları Uzmanımıza Gönder"
                conversionId={
                  process.env.NEXT_PUBLIC_AW_CONVERSION ||
                  "AW-17674804846/CONVERSION_LABEL"
                }
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
