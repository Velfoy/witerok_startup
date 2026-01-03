import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "../hooks/useLanguage.js";

export function FAQSection() {
  const { lang } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: {
        uk: "Де я можу знайти більше інформації про цю техніку?",
        en: "Where can I find more information about this technology?",
      },
      answer: {
        uk: 'Ви можете знайти усю необхідну інформацію за посиланням на нашому сайті в розділі "Документація" або зв\'язатися з нашою командою.',
        en: "You can find all necessary information via the link on our website in the Documentation section or contact our team.",
      },
    },
    {
      question: {
        uk: "Це краще, ніж звичайні вітряні турбіни?",
        en: "Is this better than conventional wind turbines?",
      },
      answer: {
        uk: "Ні, ми не пропонуємо альтернативне джерело енергії для повного чи часткового забезпечення електроенергією користувача. Результатом цього є технологія, яка має інші плюси та мінуси, ніж звичайна вітроелектростанція, але не обов'язково краща для всіх застосувань і випадків.",
        en: "No, we don't offer an alternative energy source for full or partial electricity supply to the user. The result is a technology that has different pros and cons than conventional wind power plants, but is not necessarily better for all applications and cases.",
      },
    },
    {
      question: {
        uk: "Чи є WITERoK у продажу?",
        en: "Is WITERoK available for sale?",
      },
      answer: {
        uk: "Ні це не так. Як і будь-яка нова технологія, існує багато кроків і етапів від ідеї до кінцевого продукту. Наш не є винятком, і ми не можемо гарантувати дату випуску або якщо він взагалі досягне деяких ринків, особливо споживчих ринків, які регулюються для вітрових машин.",
        en: "No, it is not. Like any new technology, there are many steps and stages from idea to final product. Ours is no exception, and we cannot guarantee a release date or if it will reach certain markets at all, especially consumer markets that are regulated for wind machines.",
      },
    },
    {
      question: {
        uk: "Де я можу побачити його в роботі?",
        en: "Where can I see it in action?",
      },
      answer: {
        uk: "Слідкуйте за нашими оновленнями в соц. мережах та сайтом в розділі новини. Шукайте за тегом #startup_witerok.",
        en: "Follow our updates on social media and the website in the news section. Search for the tag #startup_witerok.",
      },
    },
    {
      question: {
        uk: "Коли ця техніка буде закінчена?",
        en: "When will this technology be finished?",
      },
      answer: {
        uk: "Зрілість є важливим фактором для технологій, і у нас ще є роки попереду розвитку та оптимізації, перш ніж вони стануть широко поширеними. Як це трапляється з будь-яким розслідуванням, ми не можемо гарантувати дату наступного досягнення, але ми продовжуємо розвиватися.",
        en: "Maturity is an important factor for technologies, and we still have years ahead of development and optimization before they become widespread. As with any research, we cannot guarantee a date for the next milestone, but we continue to develop.",
      },
    },
    {
      question: {
        uk: "Чи можу я використати ваші фотографії чи інформацію для статті/огляду?",
        en: "Can I use your photos or information for an article/review?",
      },
      answer: {
        uk: "Звісно! Ви можете вільно використовувати будь-яке зображення, завантажене на наш веб-сайт або в репозиторій. Знайдіть усе необхідно у нашій галереї.",
        en: "Of course! You can freely use any image uploaded to our website or repository. Find everything you need in our gallery.",
      },
    },
    {
      question: {
        uk: "Чи можу я якось підтримати WITERoK?",
        en: "Can I support WITERoK somehow?",
      },
      answer: {
        uk: "Ви можете підтримати нас за посиланням на нашому сайті.",
        en: "You can support us via the link on our website.",
      },
    },
  ];

  return (
    <section
      id="faq"
      className="relative py-24 bg-gradient-to-b from-white via-[#f7fbff] to-white overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.08),transparent_36%),radial-gradient(circle_at_80%_30%,rgba(59,130,246,0.08),transparent_34%),radial-gradient(circle_at_50%_80%,rgba(14,165,233,0.05),transparent_32%)]" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-white/60 via-transparent to-white/70" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl text-[#144073] font-semibold mt-4 mb-3">
            {lang === "uk" ? "Часті питання" : "FAQ"}
          </h2>
          <p className="text-l text-slate-600 max-w-3xl mx-auto">
            {lang === "uk"
              ? "Все, що вам потрібно знати про WITERoK"
              : "Everything you need to know about WITERoK"}
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className="group rounded-2xl bg-white border border-slate-200 shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_14px_36px_rgba(26,109,204,0.18)] transition overflow-hidden"
              >
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-slate-50/50 transition"
                >
                  <span className="text-lg text-[#144073] font-semibold pr-4">
                    {lang === "uk" ? item.question.uk : item.question.en}
                  </span>
                  <ChevronDown
                    size={24}
                    className={`text-[#1A6DCC] flex-shrink-0 transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 py-4 bg-slate-50/30 border-t border-slate-200">
                    <p className="text-slate-700 leading-relaxed">
                      {lang === "uk" ? item.answer.uk : item.answer.en}
                    </p>
                  </div>
                )}
                <div
                  className="h-1 mt-auto opacity-70 group-hover:opacity-100 transition"
                  style={{
                    background:
                      "linear-gradient(90deg, #144073, #1A6DCC, #144073)",
                  }}
                />
              </div>
            );
          })}
        </div>

        <div
          className="mt-16 rounded-2xl p-8 md:p-12 text-center text-white"
          style={{
            background: "linear-gradient(135deg, #144073, #1A6DCC)",
          }}
        >
          <h3 className="text-2xl md:text-3xl font-semibold mb-4">
            {lang === "uk" ? "Не знайшли відповідь?" : "Didn't find an answer?"}
          </h3>
          <p className="mb-6 text-white/90 max-w-2xl mx-auto">
            {lang === "uk"
              ? "Наша команда готова відповісти на будь-які ваші питання"
              : "Our team is ready to answer any questions"}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:witerokgreenenergy@gmail.com"
              className="inline-block px-8 py-3 bg-white text-[#144073] rounded-full hover:bg-gray-100 transition-colors font-medium"
            >
              {lang === "uk" ? "Надіслати питання" : "Send a question"}
            </a>
            <a
              href="#contact"
              className="inline-block px-8 py-3 border-2 border-white text-white rounded-full hover:bg-white/10 transition-colors font-medium"
            >
              {lang === "uk" ? "Запланувати дзвінок" : "Schedule a call"}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
