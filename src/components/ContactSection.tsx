import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Facebook,
  Instagram,
} from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

export function ContactSection() {
  const { lang } = useLanguage();

  return (
    <section
      id="contact"
      className="py-24 bg-gradient-to-br from-primary to-secondary"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl text-white mb-4">
            {lang === "uk" ? "Зв'язатися з нами" : "Get in touch"}
          </h2>
          <p className="text-xl text-white/90">
            {lang === "uk"
              ? "Готові перейти на вітрову енергію? Зв'яжіться з нашою командою"
              : "Ready to switch to wind energy? Talk with our team"}
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
                  <div className="text-white/80 mb-1">
                    {lang === "uk" ? "Телефон" : "Phone"}
                  </div>
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
                  <div className="text-white/80 mb-1">
                    {lang === "uk" ? "Адреса" : "Address"}
                  </div>
                  <p className="text-white text-lg">
                    {lang === "uk" ? "вул. Хрещатик, 1" : "1 Khreshchatyk St."}
                    <br />
                    {lang === "uk"
                      ? "Київ, 01001, Україна"
                      : "Kyiv, 01001, Ukraine"}
                  </p>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div>
              <div className="text-white/80 mb-4">
                {lang === "uk" ? "Соціальні мережі" : "Social"}
              </div>
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
                  {lang === "uk" ? "Ім'я" : "Name"}
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/40"
                  placeholder={lang === "uk" ? "Ваше ім'я" : "Your name"}
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
                  {lang === "uk" ? "Компанія" : "Company"}
                </label>
                <input
                  type="text"
                  id="company"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/40"
                  placeholder={
                    lang === "uk" ? "Назва компанії" : "Company name"
                  }
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-white mb-2">
                  {lang === "uk" ? "Повідомлення" : "Message"}
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/40 resize-none"
                  placeholder={
                    lang === "uk"
                      ? "Розкажіть про ваш проєкт..."
                      : "Tell us about your project..."
                  }
                />
              </div>

              <button
                type="submit"
                className="w-full px-8 py-4 bg-white text-primary rounded-lg hover:bg-gray-100 transition-colors"
              >
                {lang === "uk" ? "Надіслати повідомлення" : "Send message"}
              </button>
            </form>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-12 text-center border border-white/20">
          <h3 className="text-3xl text-white mb-4">
            {lang === "uk"
              ? "Готові розпочати перехід на вітрову енергію?"
              : "Ready to start your wind transition?"}
          </h3>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            {lang === "uk"
              ? "Отримайте безкоштовну консультацію та розрахунок окупності для вашого об'єкта"
              : "Get a free consultation and payback calculation for your site"}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary rounded-full hover:bg-gray-100 transition-colors"
            >
              {lang === "uk" ? "Отримати консультацію" : "Get a consultation"}
            </a>
            <a
              href="#"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white rounded-full hover:bg-white/10 transition-colors"
            >
              {lang === "uk" ? "Розрахувати окупність" : "Calculate payback"}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
