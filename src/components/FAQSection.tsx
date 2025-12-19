import { ChevronDown } from "lucide-react";
import { useState } from "react";

export function FAQSection() {
  const [openItems, setOpenItems] = useState<number[]>([0]);

  const toggleItem = (index: number) => {
    setOpenItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const faqs = [
    {
      category: "Про продукт",
      items: [
        {
          question: "Чи подходить WITERoK для мого регіону?",
          answer:
            "WITERoK розроблений спеціально для України. Він ефективно працює при швидкостях вітру від 3 м/с, що робить його ідеальним для більшості регіонів країни. Мінімальна середньорічна швидкість вітру для окупності - 4-5 м/с.",
        },
        {
          question: "Який термін служби вітрогенератора?",
          answer:
            "Термін служби WITERoK становить 15-20 років при правильному обслуговуванні. Ми надаємо гарантію 5 років на всі компоненти та безкоштовне обслуговування в цей період.",
        },
        {
          question: "Наскільки шумним є WITERoK?",
          answer:
            "Рівень шуму складає 35-40 дБ на відстані 300 м, що еквівалентно звуку тихого офісу. Це значно менше, ніж у традиційних горизонтальних вітряків (45-50 дБ).",
        },
        {
          question: "Чи потрібний дозвіл на встановлення?",
          answer:
            "Так, потрібно. Ми надаємо повну допомогу з отримання дозволів та координацією з місцевими органами влади. Для більшості обсягів встановлення це займає 2-3 тижні.",
        },
      ],
    },
    {
      category: "Фінанси та окупність",
      items: [
        {
          question: "Яка вартість встановлення?",
          answer:
            "Базова вартість встановлення WITERoK 5-10 кВт становить $10,000-15,000 залежно від місцевості та складності роботи. Це включає доставку, встановлення та налаштування.",
        },
        {
          question: "За скільки років окупиться система?",
          answer:
            "Період окупності зазвичай становить 3-5 років залежно від регіону, тарифів на електроенергію та навичок використання. Ми надаємо безкоштовний розрахунок окупності для вашого об'єкта.",
        },
        {
          question: "Чи є програми фінансування?",
          answer:
            "Так! Ми пропонуємо лізинг, розстрочку та кредитні програми у партнерстві з банками. Також доступні субсидії та грантові програми для бізнесу.",
        },
        {
          question: "Які витрати на обслуговування?",
          answer:
            "Середні річні витрати на обслуговування - 1-2% від вартості системи. Ми пропонуємо пакетні контракти на технічне обслуговування від $500/рік.",
        },
      ],
    },
    {
      category: "Встановлення та технічні питання",
      items: [
        {
          question: "Скільки часу займає встановлення?",
          answer:
            "Від замовлення до запуску системи займає 2-4 тижні, залежно від дозволів та погодних умов. Само встановлення займає 3-5 днів.",
        },
        {
          question: "Чи потрібен спеціальний фундамент?",
          answer:
            "WITERoK розроблений для простого встановлення. Потрібен бетонний фундамент глибиною 1,5 м та залізобетонна основа. Ми надаємо всі розрахунки та рекомендації.",
        },
        {
          question: "Яка мінімальна площа для встановлення?",
          answer:
            "Мінімальна площа - 50 м². Вітрогенератор займає вертикальний простір, тому ви можете встановити його на дахі, у дворі або на полі навіть на малій площі.",
        },
        {
          question: "Чи безпечна система для околиці?",
          answer:
            "Так, WITERoK розроблений з урахуванням безпеки. Він оснащений датчиком вітру, який автоматично зупиняє систему при небезпечних умовах. Система працює з дистанційним контролем.",
        },
      ],
    },
    {
      category: "Екологія та енергія",
      items: [
        {
          question: "Скільки CO₂ економить система?",
          answer:
            "Один WITERoK генерує енергію еквівалентну 1,5 т CO₂ на рік. За 15 років служби це 22,5 т скороченого вуглецю.",
        },
        {
          question: "Як система генерує енергію у безвітряні дні?",
          answer:
            "Система генерує енергію при швидкості вітру від 3 м/с. Навіть у безвітряні дні вітер на висоті 10-15 м часто достатній для генерації. Рекомендуємо мати резервне джерело живлення або батареї.",
        },
        {
          question: "Чи можна комбінувати з сонячними панелями?",
          answer:
            "Абсолютно! Гібридна система вітро + сонце забезпечує максимальну надійність. Вітер часто більший взимку, а сонце літом, що забезпечує стабільне постачання енергії цілий рік.",
        },
      ],
    },
    {
      category: "Бізнес та партнерство",
      items: [
        {
          question: "Чи можна стати дилером WITERoK?",
          answer:
            "Так! Ми активно розвиваємо мережу партнерів. Зв'яжіться з нами для обговорення умов та вимог партнерства в вашому регіоні.",
        },
        {
          question: "Чи надаєте ви гарантію якості?",
          answer:
            "Ми гарантуємо 5 років на всі компоненти та 15-20 років лінійного зниження продуктивності не більше 0,5% на рік.",
        },
        {
          question: "Як отримати консультацію?",
          answer:
            "Заповніть форму на сайті або зв'яжіться з нами по телефону. Ми надаємо безкоштовну консультацію та розрахунок окупності для вашого об'єкта.",
        },
        {
          question: "Які документи потрібні для замовлення?",
          answer:
            "Потрібні документи про власність на об'єкт, технічні характеристики будівлі, дані про цільові напрямки вітру та тарифи на електроенергію. Ми допоможемо зібрати все необхідне.",
        },
      ],
    },
  ];

  return (
    <section id="faq" className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl text-primary mb-4">
            Часті питання
          </h2>
          <p className="text-xl text-foreground/80">
            Все, що вам потрібно знати про WITERoK
          </p>
        </div>

        <div className="space-y-8">
          {faqs.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              <h3 className="text-2xl text-primary mb-4 pb-3 border-b-2 border-secondary">
                {category.category}
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
                          {item.question}
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
                            {item.answer}
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
          <h3 className="text-2xl md:text-3xl mb-4">Не знайшли відповідь?</h3>
          <p className="mb-6 text-white/90 max-w-2xl mx-auto">
            Наша команда готова відповісти на будь-які ваші питання
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:info@witerok.ua"
              className="inline-block px-8 py-3 bg-white text-primary rounded-full hover:bg-gray-100 transition-colors font-medium"
            >
              Надіслати питання
            </a>
            <a
              href="#contact"
              className="inline-block px-8 py-3 border-2 border-white text-white rounded-full hover:bg-white/10 transition-colors font-medium"
            >
              Запланувати дзвінок
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
