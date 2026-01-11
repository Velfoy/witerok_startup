import { Mail, Send } from "lucide-react";
import { useLanguage } from "../hooks/useLanguage";
import { useState } from "react";

export function NewsletterSection() {
  const { lang } = useLanguage();
  const [email, setEmail] = useState("");
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
          : "Please enter a valid email address"
      );
      return;
    }

    setStatus("loading");

    try {
      // Mailchimp configuration
      // Replace these with your actual Mailchimp credentials:
      // 1. Sign up at https://mailchimp.com (Free: 500 contacts)
      // 2. Create an Audience (mailing list)
      // 3. Get API Key from Account > Extras > API keys
      // 4. Get Audience ID from Audience > Settings > Audience name and defaults
      const API_KEY = "YOUR_MAILCHIMP_API_KEY"; // e.g., "abc123...xyz-us21"
      const AUDIENCE_ID = "YOUR_AUDIENCE_ID"; // e.g., "a1b2c3d4e5"
      const DATACENTER = API_KEY.split("-")[1]; // Extract datacenter from API key (e.g., "us21")

      const response = await fetch(
        `https://${DATACENTER}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${btoa(`anystring:${API_KEY}`)}`,
          },
          body: JSON.stringify({
            email_address: email,
            status: "subscribed", // or "pending" for double opt-in
            tags: ["Website Signup"],
          }),
        }
      );

      if (response.ok) {
        setStatus("success");
        setMessage(
          lang === "uk"
            ? "Дякуємо за підписку! Ви будете отримувати наші новини."
            : "Thank you for subscribing! You'll receive our updates."
        );
        setEmail("");

        setTimeout(() => {
          setStatus("idle");
          setMessage("");
        }, 5000);
      } else {
        const error = await response.json();
        if (error.title === "Member Exists") {
          setStatus("error");
          setMessage(
            lang === "uk"
              ? "Ця email адреса вже підписана на розсилку."
              : "This email is already subscribed."
          );
        } else {
          throw new Error(error.detail || "Subscription failed");
        }
      }
    } catch (err) {
      console.error("Mailchimp error:", err);
      setStatus("error");
      setMessage(
        lang === "uk"
          ? "Помилка підписки. Спробуйте пізніше."
          : "Subscription error. Try again later."
      );

      setTimeout(() => {
        setStatus("idle");
        setMessage("");
      }, 5000);
    }
  };

  const copy = {
    title: { uk: "Будьте в курсі новин", en: "Stay Updated" },
    subtitle: {
      uk: "Підпишіться на нашу розсилку та отримуйте останні новини про WITERoK",
      en: "Subscribe to our newsletter and get the latest news about WITERoK",
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
    <section id="newsletter" className="section-shell">
      <div className="section-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="glass-panel rounded-3xl p-8 md:p-12">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Mail className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-3xl md:text-4xl text-foreground font-bold mb-4">
                {lang === "uk" ? copy.title.uk : copy.title.en}
              </h2>
              <p className="text-lg text-foreground/70">
                {lang === "uk" ? copy.subtitle.uk : copy.subtitle.en}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={
                      lang === "uk" ? copy.placeholder.uk : copy.placeholder.en
                    }
                    disabled={status === "loading"}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 focus:transition disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="px-6 py-3 rounded-lg bg-primary hover:bg-primary/90 text-white font-medium focus:transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                >
                  {status === "loading" ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      {lang === "uk" ? copy.button.uk : copy.button.en}
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

              {message && (
                <div
                  className={`mt-4 p-3 rounded-lg text-sm ${
                    status === "success"
                      ? "bg-green-500/10 text-green-500 border border-green-500/20"
                      : "bg-red-500/10 text-red-500 border border-red-500/20"
                  }`}
                >
                  {message}
                </div>
              )}
            </form>

            <p className="text-center text-xs text-foreground/50 mt-6">
              {lang === "uk" ? copy.privacy.uk : copy.privacy.en}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
