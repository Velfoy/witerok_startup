import { Mail, Send, Loader } from "lucide-react";
import { useLanguage } from "../hooks/useLanguage";
import { useState } from "react";
import { subscribeNewsletter } from "../services/api";

export function NewsletterSection() {
  const { lang } = useLanguage();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error");
      setMessage(
        lang === "uk"
          ? "Будь ласка, введіть коректну email адресу"
          : "Please enter a valid email address",
      );
      return;
    }

    setStatus("loading");

    try {
      await subscribeNewsletter({ email, name });
      setStatus("success");
      setMessage(
        lang === "uk"
          ? "Дякуємо за підписку! Ви будете отримувати наші новини."
          : "Thank you for subscribing! You'll receive our updates.",
      );
      setEmail("");
      setName("");

      setTimeout(() => {
        setStatus("idle");
        setMessage("");
      }, 5000);
    } catch (err) {
      setStatus("error");
      setMessage(
        lang === "uk"
          ? "Помилка при підписці. Спробуйте ще раз."
          : "Error subscribing. Please try again.",
      );
      console.error(err);
    }
  };

  const copy = {
    title: { uk: "Будьте в курсі новин", en: "Stay Updated" },
    subtitle: {
      uk: "Підпишіться на нашу розсилку та отримуйте останні новини про WITERoK",
      en: "Subscribe to our newsletter and get the latest news about WITERoK",
    },
    namePlaceholder: {
      uk: "Введіть ваше ім'я (опціонально)",
      en: "Enter your name (optional)",
    },
    placeholder: {
      uk: "Введіть вашу email адресу",
      en: "Enter your email address",
    },
    button: { uk: "Підписатися", en: "Subscribe" },
    privacy: {
      uk: "Ми поважаємо вашу конфіденційність і не передаємо дані третім особам",
      en: "We respect your privacy and do not share data with third parties",
    },
  };

  return (
    <section id="newsletter" className="section-shell py-20">
      <div className="section-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-white/8 via-white/4 to-white/2 backdrop-blur-xl shadow-[0_18px_50px_rgba(20,64,115,0.16)] p-8 md:p-12">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/15 border border-white/20 shadow-md mb-6">
                <Mail className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-3xl md:text-4xl text-foreground font-bold mb-4">
                {lang === "uk" ? copy.title.uk : copy.title.en}
              </h2>
              <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
                {lang === "uk" ? copy.subtitle.uk : copy.subtitle.en}
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="max-w-md mx-auto space-y-4"
            >
              <div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={
                    lang === "uk"
                      ? copy.namePlaceholder.uk
                      : copy.namePlaceholder.en
                  }
                  disabled={status === "loading"}
                  className="w-full px-4 py-3 rounded-xl bg-white/8 border border-white/15 text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 disabled:opacity-50 disabled:cursor-not-allowed shadow-inner"
                />
              </div>

              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={
                    lang === "uk" ? copy.placeholder.uk : copy.placeholder.en
                  }
                  disabled={status === "loading"}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/8 border border-white/15 text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 disabled:opacity-50 disabled:cursor-not-allowed shadow-inner"
                />
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-[#1A6DCC] hover:from-primary/90 hover:to-[#1A6DCC]/90 text-white font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_14px_40px_rgba(26,109,204,0.30)] transition-colors"
              >
                {status === "loading" ? (
                  <Loader className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    {lang === "uk" ? copy.button.uk : copy.button.en}
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>

              {message && (
                <div
                  className={`mt-2 p-3 rounded-lg text-sm ${
                    status === "success"
                      ? "bg-green-500/10 text-green-500 border border-green-500/20"
                      : "bg-red-500/10 text-red-500 border border-red-500/20"
                  }`}
                >
                  {message}
                </div>
              )}

              <p className="text-xs text-foreground/50 text-center pt-2">
                {lang === "uk" ? copy.privacy.uk : copy.privacy.en}
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
