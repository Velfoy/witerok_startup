import { useEffect, useMemo, useState } from "react";
import { useLanguage } from "../hooks/useLanguage";
import { Loader, CheckCircle, XCircle } from "lucide-react";

export function UnsubscribeSection() {
  const { lang } = useLanguage();

  const token = useMemo(() => {
    if (typeof window === "undefined") return null;
    return new URLSearchParams(window.location.search).get("token");
  }, []);

  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!token) return;

    const controller = new AbortController();

    const apiUrl = `${
      window.location.origin
    }/api/newsletter.php?action=unsubscribe&token=${encodeURIComponent(token)}`;

    fetch(apiUrl, { method: "GET", signal: controller.signal })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setStatus("success");
          setMessage(
            data.message ||
              (lang === "uk"
                ? "Ви успішно відписалися від розсилки"
                : "Successfully unsubscribed from newsletter")
          );
        } else {
          setStatus("error");
          setMessage(
            data.message ||
              (lang === "uk" ? "Помилка при відписці" : "Error unsubscribing")
          );
        }
      })
      .catch((error) => {
        if (error.name === "AbortError") return; // Request was cancelled
        setStatus("error");
        setMessage(
          lang === "uk"
            ? "Помилка при відписці. Спробуйте пізніше."
            : "Error unsubscribing. Please try again later."
        );
      });

    return () => controller.abort();
  }, [lang, token]);

  const currentStatus = token ? status : "error";
  const currentMessage = token
    ? message
    : lang === "uk"
    ? "Не знайдено токен для відписки"
    : "Unsubscribe token not found";

  const copy = {
    title: {
      uk: "Відписка від розсилки",
      en: "Unsubscribe from Newsletter",
    },
    home: { uk: "Повернутися на головну", en: "Back to Homepage" },
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 px-4 py-20">
      <div className="max-w-md w-full">
        <div className="rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-white/8 via-white/4 to-white/2 backdrop-blur-xl shadow-[0_18px_50px_rgba(20,64,115,0.16)] p-8 text-center">
          {currentStatus === "loading" && (
            <>
              <Loader className="w-16 h-16 text-primary mx-auto mb-4 animate-spin" />
              <h2 className="text-2xl font-bold text-foreground mb-2">
                {lang === "uk" ? "Обробка..." : "Processing..."}
              </h2>
              <p className="text-foreground/70">
                {lang === "uk" ? "Будь ласка, зачекайте..." : "Please wait..."}
              </p>
            </>
          )}

          {currentStatus === "success" && (
            <>
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-foreground mb-4">
                {lang === "uk" ? "Успішно!" : "Success!"}
              </h2>
              <p className="text-foreground/70 mb-6">{currentMessage}</p>
              <a
                href="/"
                className="inline-block px-6 py-3 bg-primary hover:bg-primary/90 text-white font-semibold rounded-xl transition-all duration-300"
              >
                {lang === "uk" ? copy.home.uk : copy.home.en}
              </a>
            </>
          )}

          {currentStatus === "error" && (
            <>
              <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-foreground mb-4">
                {lang === "uk" ? "Помилка" : "Error"}
              </h2>
              <p className="text-foreground/70 mb-6">{currentMessage}</p>
              <a
                href="/"
                className="inline-block px-6 py-3 bg-primary hover:bg-primary/90 text-white font-semibold rounded-xl transition-all duration-300"
              >
                {lang === "uk" ? copy.home.uk : copy.home.en}
              </a>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
