import { useState } from "react";

export default function NarcolepsyTest() {
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
    const total = Object.values(answers).reduce((a, b) => a + b, 0);
    setScore(total);
  };

  return (
    <div className="rounded-2xl p-6 shadow-lg bg-card dark:bg-accent transition-colors border border-border dark:border-cta-active">
      <h3>
        Ullanlinna Narcolepsy Scale (UNS)
      </h3>
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

      <button
        onClick={calculateScore}
        className="button w-full mt-6 py-4 rounded-xl  font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 hover:bg-accent/70 dark:hover:bg-cta-active/70"
      >
        Sonucu Göster
      </button>

      {score !== null && (
        <div className="mt-6 p-5 rounded-xl bg-accent/10 dark:bg-cta-active/10 border border-accent/20 dark:border-cta-active/20 text-copy-primary dark:text-copy-secondary">
          <p className="text-lg font-semibold">
            Toplam Puanınız: {score} / {questions.length * 3}
          </p>
          <p className="mt-2">
            Yüksek puanlar, narcolepsi belirtilerinin daha sık yaşandığını
            gösterebilir. Tanı için mutlaka bir uyku uzmanına başvurun.
          </p>
        </div>
      )}

      <p className="text-xs text-[#5A5243] dark:text-[#B6AE9F] opacity-60 mt-8 text-center">
        Kaynak: Harvard Medical School – Division of Sleep Medicine · Ullanlinna
        Narcolepsy Scale
      </p>
    </div>
  );
}
