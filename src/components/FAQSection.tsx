import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";

export function FAQSection() {
  const { lang } = useLanguage();
  const [openItems, setOpenItems] = useState<number[]>([0]);

  const toggleItem = (index: number) => {
    setOpenItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const faqs = [
    {
      category: { uk: "Про продукт", en: "About the product" },
      items: [
        {
          question: {
            uk: "Чи подходить WITERoK для мого регіону?",
            en: "Is WITERoK right for my region?",
          },
          answer: {
            uk: "WITERoK розроблений спеціально для України. Він ефективно працює при швидкостях вітру від 3 м/с, що робить його ідеальним для більшості регіонів країни. Мінімальна середньорічна швидкість вітру для окупності - 4-5 м/с.",
            en: "WITERoK is built for Ukraine and performs from 3 m/s wind speed, making it suitable for most regions. The average annual wind speed needed for payback is 4-5 m/s.",
          },
        },
        {
          question: {
            uk: "Який термін служби вітрогенератора?",
            en: "What is the turbine lifespan?",
          },
          answer: {
            uk: "Термін служби WITERoK становить 15-20 років при правильному обслуговуванні. Ми надаємо гарантію 5 років на всі компоненти та безкоштовне обслуговування в цей період.",
            en: "WITERoK lasts 15-20 years with proper maintenance. We provide a 5-year warranty on all components and free service during that period.",
          },
        },
        {
          question: {
            uk: "Наскільки шумним є WITERoK?",
            en: "How noisy is WITERoK?",
          },
          answer: {
            uk: "Рівень шуму складає 35-40 дБ на відстані 300 м, що еквівалентно звуку тихого офісу. Це значно менше, ніж у традиційних горизонтальних вітряків (45-50 дБ).",
            en: "Noise is 35-40 dB at 300 m, similar to a quiet office. That is lower than typical horizontal turbines (45-50 dB).",
          },
        },
        {
          question: {
            uk: "Чи потрібний дозвіл на встановлення?",
            en: "Do I need permits to install?",
          },
          answer: {
            uk: "Так, потрібно. Ми надаємо повну допомогу з отримання дозволів та координацією з місцевими органами влади. Для більшості обсягів встановлення це займає 2-3 тижні.",
            en: "Yes. We help with all permits and coordination with local authorities. Typical timelines are 2-3 weeks for most installations.",
          },
        },
      ],
    },
    {
      category: { uk: "Фінанси та окупність", en: "Finance and payback" },
      items: [
        {
          question: {
            uk: "Яка вартість встановлення?",
            en: "What is the installation cost?",
          },
          answer: {
            uk: "Базова вартість встановлення WITERoK 5-10 кВт становить $10,000-15,000 залежно від місцевості та складності роботи. Це включає доставку, встановлення та налаштування.",
            en: "Baseline install for 5-10 kW is $10,000-15,000 depending on site and complexity. This includes delivery, installation, and commissioning.",
          },
        },
        {
          question: {
            uk: "За скільки років окупиться система?",
            en: "How long is the payback period?",
          },
          answer: {
            uk: "Період окупності зазвичай становить 3-5 років залежно від регіону, тарифів на електроенергію та навичок використання. Ми надаємо безкоштовний розрахунок окупності для вашого об'єкта.",
            en: "Payback is typically 3-5 years depending on region, tariffs, and usage. We provide a free payback calculation for your site.",
          },
        },
        {
          question: {
            uk: "Чи є програми фінансування?",
            en: "Do you offer financing programs?",
          },
          answer: {
            uk: "Так! Ми пропонуємо лізинг, розстрочку та кредитні програми у партнерстві з банками. Також доступні субсидії та грантові програми для бізнесу.",
            en: "Yes. We offer leasing, installment, and loan programs with banks, plus available subsidies and grants for businesses.",
          },
        },
        {
          question: {
            uk: "Які витрати на обслуговування?",
            en: "What are the maintenance costs?",
          },
          answer: {
            uk: "Середні річні витрати на обслуговування - 1-2% від вартості системи. Ми пропонуємо пакетні контракти на технічне обслуговування від $500/рік.",
            en: "Annual maintenance averages 1-2% of system cost. We offer service packages from $500/year.",
          },
        },
      ],
    },
    {
      category: {
        uk: "Встановлення та технічні питання",
        en: "Installation and technical",
      },
      items: [
        {
          question: {
            uk: "Скільки часу займає встановлення?",
            en: "How long does installation take?",
          },
          answer: {
            uk: "Від замовлення до запуску системи займає 2-4 тижні, залежно від дозволів та погодних умов. Само встановлення займає 3-5 днів.",
            en: "From order to go-live: 2-4 weeks depending on permits and weather. Physical installation takes 3-5 days.",
          },
        },
        {
          question: {
            uk: "Чи потрібен спеціальний фундамент?",
            en: "Do I need a special foundation?",
          },
          answer: {
            uk: "WITERoK розроблений для простого встановлення. Потрібен бетонний фундамент глибиною 1,5 м та залізобетонна основа. Ми надаємо всі розрахунки та рекомендації.",
            en: "Designed for simple setup. You need a 1.5 m deep concrete foundation and reinforced base. We supply all calculations and guidelines.",
          },
        },
        {
          question: {
            uk: "Яка мінімальна площа для встановлення?",
            en: "What is the minimum footprint?",
          },
          answer: {
            uk: "Мінімальна площа - 50 м². Вітрогенератор займає вертикальний простір, тому ви можете встановити його на дахі, у дворі або на полі навіть на малій площі.",
            en: "Minimum area is 50 m². The turbine uses vertical space, so you can place it on roofs, yards, or fields even with small footprint.",
          },
        },
        {
          question: {
            uk: "Чи безпечна система для околиці?",
            en: "Is the system safe for surroundings?",
          },
          answer: {
            uk: "Так, WITERoK розроблений з урахуванням безпеки. Він оснащений датчиком вітру, який автоматично зупиняє систему при небезпечних умовах. Система працює з дистанційним контролем.",
            en: "Yes. WITERoK is safety-first: wind sensors auto-stop in hazardous conditions and the system supports remote control.",
          },
        },
      ],
    },
    {
      category: { uk: "Екологія та енергія", en: "Ecology and energy" },
      items: [
        {
          question: {
            uk: "Скільки CO₂ економить система?",
            en: "How much CO₂ does it save?",
          },
          answer: {
            uk: "Один WITERoK генерує енергію еквівалентну 1,5 т CO₂ на рік. За 15 років служби це 22,5 т скороченого вуглецю.",
            en: "One WITERoK offsets about 1.5 t CO₂ per year. Over 15 years that is 22.5 t of carbon avoided.",
          },
        },
        {
          question: {
            uk: "Як система генерує енергію у безвітряні дні?",
            en: "How does it work in low-wind days?",
          },
          answer: {
            uk: "Система генерує енергію при швидкості вітру від 3 м/с. Навіть у безвітряні дні вітер на висоті 10-15 м часто достатній для генерації. Рекомендуємо мати резервне джерело живлення або батареї.",
            en: "It generates from 3 m/s wind. Even on calm days, wind at 10-15 m height is often enough. We recommend backup power or batteries.",
          },
        },
        {
          question: {
            uk: "Чи можна комбінувати з сонячними панелями?",
            en: "Can I combine with solar panels?",
          },
          answer: {
            uk: "Абсолютно! Гібридна система вітро + сонце забезпечує максимальну надійність. Вітер часто більший взимку, а сонце літом, що забезпечує стабільне постачання енергії цілий рік.",
            en: "Absolutely. Hybrid wind + solar gives maximum reliability—more wind in winter, more sun in summer for year-round supply.",
          },
        },
      ],
    },
    {
      category: { uk: "Бізнес та партнерство", en: "Business and partnership" },
      items: [
        {
          question: {
            uk: "Чи можна стати дилером WITERoK?",
            en: "Can I become a WITERoK dealer?",
          },
          answer: {
            uk: "Так! Ми активно розвиваємо мережу партнерів. Зв'яжіться з нами для обговорення умов та вимог партнерства в вашому регіоні.",
            en: "Yes. We are expanding our partner network. Contact us to discuss partnership terms in your region.",
          },
        },
        {
          question: {
            uk: "Чи надаєте ви гарантію якості?",
            en: "Do you provide quality warranty?",
          },
          answer: {
            uk: "Ми гарантуємо 5 років на всі компоненти та 15-20 років лінійного зниження продуктивності не більше 0,5% на рік.",
            en: "We provide a 5-year warranty on all components and guarantee performance degradation no more than 0.5% per year over 15-20 years.",
          },
        },
        {
          question: {
            uk: "Як отримати консультацію?",
            en: "How do I get a consultation?",
          },
          answer: {
            uk: "Заповніть форму на сайті або зв'яжіться з нами по телефону. Ми надаємо безкоштовну консультацію та розрахунок окупності для вашого об'єкта.",
            en: "Fill the form on the site or call us. We provide a free consultation and payback calculation for your site.",
          },
        },
        {
          question: {
            uk: "Які документи потрібні для замовлення?",
            en: "Which documents do I need to order?",
          },
          answer: {
            uk: "Потрібні документи про власність на об'єкт, технічні характеристики будівлі, дані про цільові напрямки вітру та тарифи на електроенергію. Ми допоможемо зібрати все необхідне.",
            en: "We need property documents, building specs, data on prevailing wind directions, and electricity tariffs. We help collect everything needed.",
          },
        },
      ],
    },
  ];

  return (
    <section id="faq" className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl text-primary mb-4">
            {lang === "uk" ? "Часті питання" : "FAQ"}
          </h2>
          <p className="text-xl text-foreground/80">
            {lang === "uk"
              ? "Все, що вам потрібно знати про WITERoK"
              : "Everything you need to know about WITERoK"}
          </p>
        </div>

        <div className="space-y-8">
          {faqs.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              <h3 className="text-2xl text-primary mb-4 pb-3 border-b-2 border-secondary">
                {lang === "uk" ? category.category.uk : category.category.en}
              </h3>
              <div className="space-y-3">
                {category.items.map((item, itemIndex) => {
                  const globalIndex = categoryIndex * 10 + itemIndex;
                  const isOpen = openItems.includes(globalIndex);

                  return (
                    <div
                      key={itemIndex}
                      className="border border-border rounded-lg overflow-hidden hover:border-secondary transition-colors"
                    >
                      <button
                        onClick={() => toggleItem(globalIndex)}
                        className="w-full px-6 py-4 flex items-center justify-between bg-muted hover:bg-muted/80 transition-colors text-left"
                      >
                        <span className="text-lg text-primary font-medium pr-4">
                          {lang === "uk" ? item.question.uk : item.question.en}
                        </span>
                        <ChevronDown
                          size={24}
                          className={`text-secondary flex-shrink-0 transition-transform ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-6 py-4 bg-white border-t border-border">
                          <p className="text-foreground/80 leading-relaxed">
                            {lang === "uk" ? item.answer.uk : item.answer.en}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 md:p-12 text-center text-white">
          <h3 className="text-2xl md:text-3xl mb-4">
            {lang === "uk" ? "Не знайшли відповідь?" : "Didn't find an answer?"}
          </h3>
          <p className="mb-6 text-white/90 max-w-2xl mx-auto">
            {lang === "uk"
              ? "Наша команда готова відповісти на будь-які ваші питання"
              : "Our team is ready to answer any questions"}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:info@witerok.ua"
              className="inline-block px-8 py-3 bg-white text-primary rounded-full hover:bg-gray-100 transition-colors font-medium"
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
