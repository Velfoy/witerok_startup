import { Linkedin, Mail } from "lucide-react";

export function TeamSection() {
  const team = [
    {
      name: "Олександр Коваленко",
      position: "CEO & Co-Founder",
      bio: "15 років у відновлюваній енергетиці. Раніше - Head of Business Development у провідній енергетичній компанії",
      skills: ["Стратегія", "Продажі", "Енергетика"],
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400",
    },
    {
      name: "Марія Петренко",
      position: "CTO & Co-Founder",
      bio: "PhD в галузі інженерії. 10 років досвіду розробки вітрових технологій у міжнародних компаніях",
      skills: ["R&D", "Інженерія", "Інновації"],
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400",
    },
    {
      name: "Дмитро Шевченко",
      position: "Head of Operations",
      bio: "Експерт у виробництві та логістиці. Досвід масштабування виробничих процесів у стартапах",
      skills: ["Виробництво", "Логістика", "Оптимізація"],
      image:
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400",
    },
    {
      name: "Анна Іваненко",
      position: "Head of Marketing",
      bio: "10 років у B2B маркетингу. Успішний досвід виведення технологічних продуктів на ринок",
      skills: ["Маркетинг", "Брендинг", "B2B"],
      image:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400",
    },
  ];

  const advisors = [
    {
      name: "Проф. Володимир Сидоренко",
      role: "Технічний радник",
      expertise: "Професор кафедри відновлюваної енергетики КПІ",
    },
    {
      name: "Ірина Мельник",
      role: "Бізнес-радник",
      expertise: "Ex-директор ЄБРР, експерт з зеленого фінансування",
    },
  ];

  return (
    <section id="team" className="py-24 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl text-primary mb-4">Команда</h2>
          <p className="text-xl text-foreground/80">
            Досвідчені професіонали з різних галузей
          </p>
        </div>

        {/* Core Team */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {team.map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all group"
            >
              <div className="aspect-square overflow-hidden bg-muted">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl text-primary mb-1">{member.name}</h3>
                <p className="text-secondary mb-4">{member.position}</p>
                <p className="text-sm text-foreground/70 mb-4">{member.bio}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {member.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-secondary/10 text-secondary text-xs rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3">
                  <button className="p-2 bg-muted rounded-full hover:bg-secondary/10 transition-colors">
                    <Linkedin size={18} className="text-secondary" />
                  </button>
                  <button className="p-2 bg-muted rounded-full hover:bg-secondary/10 transition-colors">
                    <Mail size={18} className="text-secondary" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Advisors */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h3 className="text-3xl text-primary mb-8 text-center">
            Радники та ментори
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {advisors.map((advisor, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-6 bg-muted rounded-xl"
              >
                <div className="flex-shrink-0 w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center">
                  <span className="text-2xl text-secondary">
                    {advisor.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h4 className="text-lg text-primary mb-1">{advisor.name}</h4>
                  <p className="text-secondary text-sm mb-2">{advisor.role}</p>
                  <p className="text-foreground/70 text-sm">
                    {advisor.expertise}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* We're Hiring */}
        <div className="mt-12 bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 text-center text-white">
          <h3 className="text-2xl mb-4">Приєднуйся до команди!</h3>
          <p className="mb-6 text-white/90">
            Ми шукаємо талановитих людей для спільної роботи над енергетичним
            майбутнім України
          </p>
          <a
            href="#contact"
            className="inline-block px-8 py-3 bg-white text-primary rounded-full hover:bg-gray-100 transition-colors"
          >
            Дивитися вакансії
          </a>
        </div>
      </div>
    </section>
  );
}
