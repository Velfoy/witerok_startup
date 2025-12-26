import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Facebook,
  Instagram,
} from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { useState } from "react";
import emailjs from "@emailjs/browser";

export function ContactSection() {
  const { lang } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(
    null
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // EmailJS configuration
      const serviceId = "service_btq3vp4";
      const templateId = "template_8vnj5hr";
      const publicKey = "WdICTs7D7xOv_EtOn";

      // Validate required fields
      if (!formData.name || !formData.email || !formData.message) {
        setSubmitStatus("error");
        setIsSubmitting(false);
        return;
      }

      const response = await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          company: formData.company || "Not specified",
          message: formData.message,
          email: "witerokgreenenergy@gmail.com",
        },
        publicKey
      );

      console.log("Email sent successfully:", response);
      setSubmitStatus("success");
      setFormData({ name: "", email: "", company: "", message: "" });
      setTimeout(() => setSubmitStatus(null), 5000);
    } catch (error: any) {
      console.error("Email send error:", error);
      console.error("Error details:", {
        status: error.status,
        text: error.text,
        message: error.message,
      });
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative py-24 pt-2 bg-gradient-to-b from-white via-[#f7fbff] to-white overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.08),transparent_36%),radial-gradient(circle_at_80%_30%,rgba(59,130,246,0.08),transparent_34%),radial-gradient(circle_at_50%_80%,rgba(14,165,233,0.05),transparent_32%)]" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-white/60 via-transparent to-white/70" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl text-[#144073] font-semibold mt-4 mb-3">
            {lang === "uk" ? "Зв'язатися з нами" : "Get in touch"}
          </h2>
          <p className="text-l text-slate-600 max-w-3xl mx-auto">
            {lang === "uk"
              ? "Готові перейти на вітрову енергію? Зв'яжіться з нашою командою"
              : "Ready to switch to wind energy? Talk with our team"}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="flex items-start gap-4 p-6 rounded-2xl bg-white border border-slate-200 shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_14px_36px_rgba(26,109,204,0.18)] transition">
            <div
              className="w-12 h-12 rounded-xl text-white flex items-center justify-center shadow-md flex-shrink-0"
              style={{
                background: "linear-gradient(135deg, #144073, #1A6DCC)",
              }}
            >
              <Mail size={24} />
            </div>
            <div className="flex flex-col flex-1">
              <p
                className="text-sm uppercase tracking-[0.2em] font-semibold"
                style={{ color: "#1A6DCC" }}
              >
                {lang === "uk" ? "Надішліть нам" : "Send us email"}
              </p>
              <a
                href="mailto:witerokgreenenergy@gmail.com"
                className="text-[#144073] hover:text-[#1A6DCC] font-semibold transition text-base mt-1"
              >
                witerokgreenenergy@gmail.com
              </a>
            </div>
          </div>

          <div className="flex items-start gap-4 p-6 rounded-2xl bg-white border border-slate-200 shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_14px_36px_rgba(26,109,204,0.18)] transition">
            <div
              className="w-12 h-12 rounded-xl text-white flex items-center justify-center shadow-md flex-shrink-0"
              style={{
                background: "linear-gradient(135deg, #144073, #1A6DCC)",
              }}
            >
              <Phone size={24} />
            </div>
            <div className="flex flex-col flex-1">
              <p
                className="text-sm uppercase tracking-[0.2em] font-semibold"
                style={{ color: "#1A6DCC" }}
              >
                {lang === "uk" ? "Подзвоніть нам" : "Call us"}
              </p>
              <a
                href="tel:+380441234567"
                className="text-[#144073] hover:text-[#1A6DCC] font-semibold transition text-base mt-1"
              >
                +38 (044) 123-45-67
              </a>
            </div>
          </div>

          <div className="flex items-start gap-4 p-6 rounded-2xl bg-white border border-slate-200 shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_14px_36px_rgba(26,109,204,0.18)] transition">
            <div
              className="w-12 h-12 rounded-xl text-white flex items-center justify-center shadow-md flex-shrink-0"
              style={{
                background: "linear-gradient(135deg, #144073, #1A6DCC)",
              }}
            >
              <MapPin size={24} />
            </div>
            <div className="flex flex-col flex-1">
              <p
                className="text-sm uppercase tracking-[0.2em] font-semibold"
                style={{ color: "#1A6DCC" }}
              >
                {lang === "uk" ? "Відвідайте нас" : "Visit us"}
              </p>
              <p className="text-[#144073] font-semibold transition text-base mt-1">
                {lang === "uk" ? "вул. Хрещатик, 1" : "1 Khreshchatyk St."}
                <br />
                {lang === "uk"
                  ? "Київ, 01001, Україна"
                  : "Kyiv, 01001, Ukraine"}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="rounded-2xl bg-white border border-slate-200 shadow-[0_8px_24px_rgba(0,0,0,0.06)] p-8 hover:shadow-[0_14px_36px_rgba(26,109,204,0.18)] transition">
            <h3 className="text-xl font-semibold text-[#144073] mb-6">
              {lang === "uk" ? "Надішліть повідомлення" : "Send Message"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-[#144073] font-semibold mb-2"
                >
                  {lang === "uk" ? "Ім'я" : "Name"}
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#1A6DCC] focus:border-transparent text-slate-900"
                  placeholder={lang === "uk" ? "Ваше ім'я" : "Your name"}
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-[#144073] font-semibold mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#1A6DCC] focus:border-transparent text-slate-900"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label
                  htmlFor="company"
                  className="block text-[#144073] font-semibold mb-2"
                >
                  {lang === "uk" ? "Компанія" : "Company"}
                </label>
                <input
                  type="text"
                  id="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#1A6DCC] focus:border-transparent text-slate-900"
                  placeholder={
                    lang === "uk" ? "Назва компанії" : "Company name"
                  }
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-[#144073] font-semibold mb-2"
                >
                  {lang === "uk" ? "Повідомлення" : "Message"}
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#1A6DCC] focus:border-transparent resize-none text-slate-900"
                  placeholder={
                    lang === "uk"
                      ? "Розкажіть про ваш проєкт..."
                      : "Tell us about your project..."
                  }
                />
              </div>

              {submitStatus === "success" && (
                <div className="p-4 rounded-lg bg-green-50 border border-green-200">
                  <p className="text-green-700 text-sm font-medium">
                    {lang === "uk"
                      ? "✓ Повідомлення успішно надіслано! Ми зв'яжемося з вами найближчим часом."
                      : "✓ Message sent successfully! We'll get back to you soon."}
                  </p>
                </div>
              )}

              {submitStatus === "error" && (
                <div className="p-4 rounded-lg bg-red-50 border border-red-200">
                  <p className="text-red-700 text-sm font-medium">
                    {lang === "uk"
                      ? "✗ Помилка відправки. Будь ласка, спробуйте ще раз або напишіть нам на email."
                      : "✗ Failed to send. Please try again or email us directly."}
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-8 py-3 bg-gradient-to-r from-[#144073] to-[#1A6DCC] text-white rounded-lg font-semibold hover:shadow-lg transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting
                  ? lang === "uk"
                    ? "Надсилання..."
                    : "Sending..."
                  : lang === "uk"
                  ? "Надіслати повідомлення"
                  : "Send message"}
              </button>
            </form>
          </div>

          <div className="rounded-2xl bg-white border border-slate-200 shadow-[0_8px_24px_rgba(0,0,0,0.06)] p-8 hover:shadow-[0_14px_36px_rgba(26,109,204,0.18)] transition">
            <h3 className="text-xl font-semibold text-[#144073] mb-6">
              {lang === "uk" ? "Стежте за нами" : "Follow Us"}
            </h3>
            <p className="text-slate-600 mb-8">
              {lang === "uk"
                ? "Приєднуйтесь до нашої спільноти і отримуйте останні новини"
                : "Join our community and get the latest updates"}
            </p>
            <div className="space-y-3">
              <a
                href="https://www.linkedin.com/in/startup-witerok-682429266/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-lg border border-slate-200 hover:border-[#1A6DCC] hover:bg-blue-50 transition group"
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{
                    background: "linear-gradient(135deg, #144073, #1A6DCC)",
                  }}
                >
                  <Linkedin className="text-white" size={20} />
                </div>
                <div>
                  <p className="font-semibold text-[#144073]">LinkedIn</p>
                  <p className="text-sm text-slate-600">@startup_witerok</p>
                </div>
              </a>

              <a
                href="https://www.facebook.com/witerok"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-lg border border-slate-200 hover:border-[#1A6DCC] hover:bg-blue-50 transition group"
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{
                    background: "linear-gradient(135deg, #144073, #1A6DCC)",
                  }}
                >
                  <Facebook className="text-white" size={20} />
                </div>
                <div>
                  <p className="font-semibold text-[#144073]">Facebook</p>
                  <p className="text-sm text-slate-600">@startup_witerok</p>
                </div>
              </a>

              <a
                href="https://www.instagram.com/witerok"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-lg border border-slate-200 hover:border-[#1A6DCC] hover:bg-blue-50 transition group"
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{
                    background: "linear-gradient(135deg, #144073, #1A6DCC)",
                  }}
                >
                  <Instagram className="text-white" size={20} />
                </div>
                <div>
                  <p className="font-semibold text-[#144073]">Instagram</p>
                  <p className="text-sm text-slate-600">@witerok</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
