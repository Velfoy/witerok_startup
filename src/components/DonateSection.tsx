import { Heart, Loader } from "lucide-react";
import { useLanguage } from "../hooks/useLanguage";
import { useState } from "react";
import { createDonation } from "../services/api";

export function DonateSection() {
  const { lang } = useLanguage();
  const [formData, setFormData] = useState({
    amount: 50,
    name: "",
    email: "",
    message: "",
    payment_method: "stripe" as "stripe" | "paypal",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const presetAmounts = [10, 25, 50, 100, 250];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus("idle");
    setErrorMessage("");

    try {
      if (!formData.name || !formData.email) {
        setStatus("error");
        setErrorMessage(
          lang === "uk"
            ? "Будь ласка, заповніть ім'я та email"
            : "Please fill in name and email",
        );
        setIsSubmitting(false);
        return;
      }

      const result = await createDonation(formData);

      if (result.success) {
        setStatus("success");
        setFormData({
          amount: 50,
          name: "",
          email: "",
          message: "",
          payment_method: "stripe",
        });

        setTimeout(() => {
          setStatus("idle");
        }, 5000);
      }
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        lang === "uk"
          ? "Помилка при обробці доната. Спробуйте ще раз."
          : "Error processing donation. Please try again.",
      );
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const copy = {
    title: { uk: "Підтримати проєкт", en: "Support Our Project" },
    subtitle: {
      uk: "Ваша підтримка допомагає нам розвивати чисту енергію",
      en: "Your support helps us advance clean energy solutions",
    },
    presetLabel: { uk: "Вибрати суму:", en: "Select amount:" },
    customLabel: { uk: "Своя сума (USD):", en: "Custom amount (USD):" },
    nameLabel: { uk: "Ім'я", en: "Name" },
    emailLabel: { uk: "Email", en: "Email" },
    messageLabel: { uk: "Коментар", en: "Message" },
    messagePlaceholder: {
      uk: "Залишіть коментар (опціонально)",
      en: "Leave a comment (optional)",
    },
    paymentMethod: { uk: "Спосіб оплати", en: "Payment method" },
    button: { uk: "Зробити донат", en: "Make Donation" },
    successMessage: {
      uk: "✓ Дякуємо за вашу щедрість! Транзакція обробляється.",
      en: "✓ Thank you for your generosity! Transaction is being processed.",
    },
  };

  return (
    <section id="donate" className="section-shell py-20">
      <div className="section-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-red-500/20 border border-red-500/30 shadow-md mb-6">
              <Heart className="w-8 h-8 text-red-500" />
            </div>
            <h2 className="text-3xl md:text-4xl text-foreground font-bold mb-4">
              {lang === "uk" ? copy.title.uk : copy.title.en}
            </h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              {lang === "uk" ? copy.subtitle.uk : copy.subtitle.en}
            </p>
          </div>

          <div className="max-w-2xl mx-auto rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-white/8 via-white/4 to-white/2 backdrop-blur-xl shadow-[0_18px_50px_rgba(20,64,115,0.16)] p-8 md:p-12">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Preset Amounts */}
              <div>
                <label className="block text-foreground font-semibold mb-4 text-sm">
                  {lang === "uk" ? copy.presetLabel.uk : copy.presetLabel.en}
                </label>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {presetAmounts.map((amount) => (
                    <button
                      key={amount}
                      type="button"
                      onClick={() => setFormData({ ...formData, amount })}
                      className={`py-3 px-4 rounded-lg font-semibold transition-all ${
                        formData.amount === amount
                          ? "bg-gradient-to-r from-primary to-[#1A6DCC] text-white shadow-[0_8px_24px_rgba(26,109,204,0.3)]"
                          : "bg-white/10 text-foreground border border-white/20 hover:bg-white/15"
                      }`}
                    >
                      ${amount}
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Amount */}
              <div>
                <label className="block text-foreground font-semibold mb-2 text-sm">
                  {lang === "uk" ? copy.customLabel.uk : copy.customLabel.en}
                </label>
                <input
                  type="number"
                  min="1"
                  value={formData.amount}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      amount: Number(e.target.value),
                    })
                  }
                  className="w-full px-4 py-3 rounded-xl bg-white/8 border border-white/15 text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 shadow-inner"
                />
              </div>

              {/* Name */}
              <div>
                <label className="block text-foreground font-semibold mb-2 text-sm">
                  {lang === "uk" ? copy.nameLabel.uk : copy.nameLabel.en}
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/8 border border-white/15 text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 shadow-inner"
                  placeholder={lang === "uk" ? "Ваше ім'я" : "Your name"}
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-foreground font-semibold mb-2 text-sm">
                  {lang === "uk" ? copy.emailLabel.uk : copy.emailLabel.en}
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/8 border border-white/15 text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 shadow-inner"
                  placeholder="your@email.com"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-foreground font-semibold mb-2 text-sm">
                  {lang === "uk" ? copy.messageLabel.uk : copy.messageLabel.en}
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl bg-white/8 border border-white/15 text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 shadow-inner resize-none"
                  placeholder={
                    lang === "uk"
                      ? copy.messagePlaceholder.uk
                      : copy.messagePlaceholder.en
                  }
                />
              </div>

              {/* Payment Method */}
              <div>
                <label className="block text-foreground font-semibold mb-2 text-sm">
                  {lang === "uk"
                    ? copy.paymentMethod.uk
                    : copy.paymentMethod.en}
                </label>
                <select
                  value={formData.payment_method}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      payment_method: e.target.value as "stripe" | "paypal",
                    })
                  }
                  className="w-full px-4 py-3 rounded-xl bg-white/8 border border-white/15 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 shadow-inner"
                >
                  <option value="stripe">Credit Card (Stripe)</option>
                  <option value="paypal">PayPal</option>
                </select>
              </div>

              {/* Status Messages */}
              {status === "success" && (
                <div className="p-4 rounded-lg bg-green-500/10 text-green-500 border border-green-500/20">
                  <p className="text-sm font-medium">
                    {lang === "uk"
                      ? copy.successMessage.uk
                      : copy.successMessage.en}
                  </p>
                </div>
              )}

              {status === "error" && (
                <div className="p-4 rounded-lg bg-red-500/10 text-red-500 border border-red-500/20">
                  <p className="text-sm font-medium">{errorMessage}</p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-[#1A6DCC] hover:from-primary/90 hover:to-[#1A6DCC]/90 text-white font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_14px_40px_rgba(26,109,204,0.30)] transition-colors"
              >
                {isSubmitting ? (
                  <>
                    <Loader className="w-4 h-4 animate-spin" />
                    {lang === "uk" ? "Обробка..." : "Processing..."}
                  </>
                ) : (
                  <>
                    <Heart className="w-4 h-4" />
                    {lang === "uk"
                      ? `${copy.button.uk} $${formData.amount}`
                      : `${copy.button.en} $${formData.amount}`}
                  </>
                )}
              </button>

              <p className="text-xs text-foreground/50 text-center">
                {lang === "uk"
                  ? "Ваша коротка інформація захищена и не буде передана третім особам"
                  : "Your information is secure and will not be shared with third parties"}
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
