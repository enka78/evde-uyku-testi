"use client";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqItems = [
  {
    question: "Uyku Apnesi Nedir?",
    answer:
      "Uyku apnesi, uyku sırasında solunum yollarındaki kasların gevşemesi ve akciğerlere hava akışının engellenmesi sonucu solunumun tekrar tekrar durup başladığı bir uyku bozukluğudur. Üst solunum yolunun açık kalmasını sağlayan kaslarda yaşanan gevşeme ile dil kökü veya yumuşak damağın veya aşırı büyümüş bademciklerin hava yolunu tıkaması sonucunda en az 10 saniye nefes alamamak uyku apnesi olarak adlandırılır.",
  },
  {
    question: "Uyku Apnesi Neden Olur?",
    answer:
      "Uyku apnesinin nedeni, boğazdaki kasların havanın geçeceği alanı kapatacak şekilde gevşemesidir. Üst solunum yolundaki darlıklar çocukluktan itibaren, solunum yolunun yıpranmasına sebep olabilir ve bu da uyku apne sendromuna neden olabilir. İşte uyku apnesinin yaygın nedenleri:\n\n• Fazla kilo (obezite)\n• Burun tıkanıklığı\n• Büyük bademciklere ve geniz etine sahip olmak\n• Boyun çevresi kalın olan kişilerin hava yollarının dar olması\n• Yaşlılık\n• Cinsiyet (erkeklerde uyku apnesi olasığı 2-3 kat daha fazladır)\n• Genetik yatkınlık\n• Yüksek tansiyon ve diyabet gibi tıbbi sorunlar\n• Alkol kullanmak\n• Sigara içmek uyku apnesi nedenleri arasında gösterilebilir.\n\nUyku apne sendromu olan kişide horlama, 3-4 kat daha fazla, çok kaba ve gürültülü şekilde gerçekleşir. Horlamanın yanı sıra nefes darlığı, sık sık iç çekme, el kol hareketleriyle çırpınarak uyanmaya çalışma, sık ve uzun süreli solunum durmaları, sabah yorgun uyanmak da uyku apne sendromu yaşayan kişilerde görülür. Uyku apnesinin tam nedeni sayılmasa da, uyku apne sendromlu hastaların %30-50'sinde hipertansiyon görülmektedir.",
  },
  {
    question: "Uyku Apnesi Nelere Sebep Olur?",
    answer:
      "Uykuda solunum durmaları; kalp atımında düzensizlik ve ileri yaşlarda ritim bozukluğuna bağlı olarak uykuda ani ölümlere neden olmaktadır. Bununla birlikte;\n\n• Geceleri sık idrara çıkma\n• Gece aşırı terleme,\n• Sabah yorgun ve uykulu uyanma,\n• Gündüz isteksizlik,\n• Sıkıntı ve gerginliğe yol açmaktadır.\n\nGündüz uykulu hal, trafik kazalarına yol açmaktadır. Uzun dönemde uyku apne sendromu; yüksek tansiyon, kalp krizi, beyin damar tıkanıklığı sonucu felçler gibi ciddi problemleri de ortaya çıkarmaktadır. Uykuda solunum durması olan hastalarda gece boyunca ortaya çıkan düşük oksijen düzeyi, hastanın kalp ve damar sisteminde yüklenmeye yol açmakta, hastaların yarıya yakınında zaman içinde kalp büyümesine ve hipertansiyona sebep olmaktadır.\n\nHipertansiyonun, bu hastalarda %30-40 oranlarında ve hatta bazı çalışmalarda %50'ye varan oranlarda görüldüğü bilinmektedir. Hastaların kalp ritimleri incelendiğinde apne sırasında oluşan bradikardiyi uyanıklık sırasında taşikardi izlemektedir. Bradi-taşi-aritmi denen bu ritim bozukluğuna bazen daha değişik ritim bozuklukları da eklenebilmektedir. Kalp ritmindeki bozukluklar, bazen hastanın uykuda kaybedilmesine dahi sebep olmaktadır.",
  },
  {
    question: "Uyku Apnesi Tanısı Nasıl Konulur?",
    answer:
      'Uyku apnesi testi, hastalığın tespiti ve tedavisi sürecinde en önemli aşamadır. "Polisomnografi" denilen uyku apnesi testi tüm gece boyunca beyin aktivitesinin ve solunumsal olayların kaydedildiği bir testtir. Bu testle birlikte elektroensefalografi (EEG), elektrookülografi (EOG), elektrokardiyografi (EKG), elektromiyografi (EMG), göğüs ve karın hareketleri kaydını içeren solunum eforu, burun ve ağızdan hava akımı kaydı, oksijen satürasyonu, vücut pozisyonu gibi 8 parametrenin gece boyunca 7 saat süre ile takibi sağlanmaktadır.\n\nUyku apnesi testi olan Polisomnografi yani uyku testi, uyku sırasında beyin dalgaları, göz hareketleri, ağız ve burundan hava akımı, horlama, kalp hızı, bacak hareketleri ve oksijen seviyelerinin ölçümü esasına dayanır. Uyku apnesi testini yaptırabilmek için hastaların bir gece uyku odasında kalmaları gerekir. Test sırasında vücudun çeşitli noktalarına bağlanan kablolarla alınan sinyaller odanın dışındaki bilgisayara aktarılır. Sabaha kadar alınan bu kayıtların incelenmesiyle, uyku süresince solunumun kaç defa durduğu, ne kadar süre ile durduğu, durduğunda oksijen değerlerinin ve kalp hızının nasıl etkilendiği ve derin uykuya dalınıp dalınmadığı gibi birçok parametreye bakılabilir.',
  },
];

export default function SleepApneaInfo() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="container mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-center mb-12 text-copy-primary dark:text-copy-secondary">
        Uyku Apnesi Hakkında Detaylı Bilgi
      </h2>

      <div className="space-y-6">
        {faqItems.map((item, index) => (
          <div
            key={index}
            className="border border-border dark:border-cta-active rounded-xl overflow-hidden bg-card dark:bg-accent"
          >
            <button
              className="w-full flex justify-between items-center p-6 text-left bg-card dark:bg-accent hover:bg-opacity-80 transition"
              onClick={() => toggleFAQ(index)}
            >
              <h3 className="text-xl font-semibold text-copy-primary dark:text-copy-secondary">
                {item.question}
              </h3>
              {openIndex === index ? (
                <ChevronUp className="text-border dark:text-cta-active w-6 h-6" />
              ) : (
                <ChevronDown className="text-border dark:text-cta-active w-6 h-6" />
              )}
            </button>

            {openIndex === index && (
              <div className="p-6 pt-0 text-copy-secondary dark:text-copy-primary">
                <p className="whitespace-pre-line">{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-12 p-6 bg-card rounded-xl border border-border dark:border-cta-active">
        <h3 className="text-xl font-semibold mb-4 text-copy-primary dark:text-copy-secondary">
          İlgili Tıbbi Birimler
        </h3>
        <ul className="list-disc pl-6 space-y-2 text-copy-secondary dark:text-copy-primary">
          <li>Kulak Burun Boğaz Hastalıkları</li>
          <li>Nöroloji</li>
        </ul>
        <div className="mt-4 text-sm text-copy-secondary dark:text-copy-primary">
          <p>
            Uyku apnesi, üst solunum yolunu içeren hava yollarının tıkanması
            nedeniyle horlamanın yaşandığı, uyku sırasında solunumun tekrar
            tekrar kesilip geri başladığı solunum bozukluğudur. En yaygın türü
            obstrüktif uyku apnesidir. Sabahları yorgun uyanma, dikkatsizlik
            gibi sorunlara neden olabilen uyku apnesi tedavi edilmediği takdirde
            felç, kalp krizi ve ölüme yol açabilir.
          </p>
        </div>
      </div>
    </section>
  );
}
