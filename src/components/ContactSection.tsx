import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Facebook,
  Instagram,
} from "lucide-react";

export function ContactSection() {
  return (
    <section
      id="contact"
      className="py-24 bg-gradient-to-br from-primary to-secondary"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl text-white mb-4">
            Зв'язатися з нами
          </h2>
          <p className="text-xl text-white/90">
            Готові перейти на вітрову енергію? Зв'яжіться з нашою командою
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <div className="space-y-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                  <Mail className="text-white" size={24} />
                </div>
                <div>
                  <div className="text-white/80 mb-1">Email</div>
                  <a
                    href="mailto:info@witerok.ua"
                    className="text-white text-lg hover:underline"
                  >
                    info@witerok.ua
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                  <Phone className="text-white" size={24} />
                </div>
                <div>
                  <div className="text-white/80 mb-1">Телефон</div>
                  <a
                    href="tel:+380441234567"
                    className="text-white text-lg hover:underline"
                  >
                    +38 (044) 123-45-67
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                  <MapPin className="text-white" size={24} />
                </div>
                <div>
                  <div className="text-white/80 mb-1">Адреса</div>
                  <p className="text-white text-lg">
                    вул. Хрещатик, 1<br />
                    Київ, 01001, Україна
                  </p>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div>
              <div className="text-white/80 mb-4">Соціальні мережі</div>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="text-white" size={24} />
                </a>
                <a
                  href="#"
                  className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="text-white" size={24} />
                </a>
                <a
                  href="#"
                  className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="text-white" size={24} />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-white mb-2">
                  Ім'я
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/40"
                  placeholder="Ваше ім'я"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-white mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/40"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label htmlFor="company" className="block text-white mb-2">
                  Компанія
                </label>
                <input
                  type="text"
                  id="company"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/40"
                  placeholder="Назва компанії"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-white mb-2">
                  Повідомлення
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/40 resize-none"
                  placeholder="Розкажіть про ваш проєкт..."
                />
              </div>

              <button
                type="submit"
                className="w-full px-8 py-4 bg-white text-primary rounded-lg hover:bg-gray-100 transition-colors"
              >
                Надіслати повідомлення
              </button>
            </form>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-12 text-center border border-white/20">
          <h3 className="text-3xl text-white mb-4">
            Готові розпочати перехід на вітрову енергію?
          </h3>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Отримайте безкоштовну консультацію та розрахунок окупності для
            вашого об'єкта
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary rounded-full hover:bg-gray-100 transition-colors"
            >
              Отримати консультацію
            </a>
            <a
              href="#"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white rounded-full hover:bg-white/10 transition-colors"
            >
              Розрахувати окупність
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
