import { useLanguage } from "../hooks/useLanguage";
import {
  Calendar,
  Newspaper,
  ChevronDown,
  ChevronUp,
  Loader,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import type { Post } from "../services/api";
import { getPosts } from "../services/api";
import news1Img from "../assets/news1.jpg";
import news2Img from "../assets/news2.png";
import news3Img from "../assets/news3.jpg";

export interface NewsItem {
  id: string;
  title: { uk: string; en: string };
  content: { uk: string; en: string };
  date: string;
  image?: string;
}

// Fallback mock data in case API fails
const mockNews: NewsItem[] = [
  {
    id: "1",
    title: { uk: "Розробка нового прототипу", en: "New Prototype Development" },
    content: {
      uk: "Ми завершили розробку нового прототипу безлопатевої вітрової установки, яка демонструє на 30% вищу ефективність порівняно з попередньою версією. Інновації в аеродинамічному дизайні дозволяють досягти максимальної продуктивності навіть при низьких швидкостях вітру.",
      en: "We have completed the development of a new bladeless wind turbine prototype that demonstrates 30% higher efficiency compared to the previous version. Innovations in aerodynamic design allow maximum performance even at low wind speeds.",
    },
    date: new Date("2026-01-10").toISOString(),
    image: news1Img,
  },
  {
    id: "2",
    title: {
      uk: "Запуск нового веб-сайту WITERoK",
      en: "Launch of New WITERoK Website",
    },
    content: {
      uk: "Наш новий веб-сайт вже працює! Відкрийте для себе більше про нашу компанію та її діяльність на нашому веб-сайті, де зібрана вся актуальна інформація про наші інноваційні безлопатеві вітрові установки, технічні характеристики, фінансові показники та можливості співпраці.",
      en: "Our new website is now live! Discover more about our company and its activities on our website, where all current information about our innovative bladeless wind turbines, technical specifications, financial indicators and cooperation opportunities is collected.",
    },
    date: new Date("2026-01-08").toISOString(),
    image: news2Img,
  },
  {
    id: "3",
    title: {
      uk: "Успішні випробування в польових умовах",
      en: "Successful Field Testing",
    },
    content: {
      uk: "Команда WITERoK завершила серію польових випробувань наших вітрових установок. Результати показали стабільну роботу системи протягом 1000 годин безперервної експлуатації з ефективністю перетворення енергії на рівні 92%. Тести підтвердили надійність конструкції та готовність до серійного виробництва.",
      en: "The WITERoK team has completed a series of field tests of our wind turbines. The results showed stable system operation for 1000 hours of continuous operation with energy conversion efficiency of 92%. Tests confirmed the reliability of the design and readiness for mass production.",
    },
    date: new Date("2026-01-05").toISOString(),
    image: news3Img,
  },
];

function NewsCard({ item }: { item: NewsItem }) {
  const { lang } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isTruncated, setIsTruncated] = useState(false);
  const contentRef = useRef<HTMLParagraphElement>(null);
  const content = lang === "uk" ? item.content.uk : item.content.en;

  useEffect(() => {
    const checkTruncation = () => {
      if (contentRef.current && !isExpanded) {
        setIsTruncated(
          contentRef.current.scrollHeight > contentRef.current.clientHeight
        );
      }
    };

    checkTruncation();
    window.addEventListener("resize", checkTruncation);
    return () => window.removeEventListener("resize", checkTruncation);
  }, [content, isExpanded]);

  return (
    <div className="group glass-panel glass-hover rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-xl h-full flex flex-col">
      {item.image && (
        <div className="relative w-full h-48 overflow-hidden">
          <img
            src={item.image}
            alt={lang === "uk" ? item.title.uk : item.title.en}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        </div>
      )}
      <div className="p-6 md:p-8 flex-1 flex flex-col">
        <div className="flex items-start gap-3 mb-4">
          <div className="p-2 rounded-lg bg-secondary/10 group-hover:bg-secondary/20 transition-colors">
            <Newspaper className="w-5 h-5 text-secondary" />
          </div>
          <h3 className="flex-1 text-xl md:text-2xl font-bold text-foreground leading-tight">
            {lang === "uk" ? item.title.uk : item.title.en}
          </h3>
        </div>
        <p
          ref={contentRef}
          className={`text-foreground/70 mb-4 leading-relaxed ${
            !isExpanded ? "line-clamp-4" : ""
          }`}
        >
          {content}
        </p>
        {isTruncated && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 text-secondary hover:text-secondary/80 transition-colors mb-4 font-medium"
          >
            {isExpanded ? (
              <>
                <span>{lang === "uk" ? "Згорнути" : "Show less"}</span>
                <ChevronUp size={18} />
              </>
            ) : (
              <>
                <span>{lang === "uk" ? "Читати більше" : "Read more"}</span>
                <ChevronDown size={18} />
              </>
            )}
          </button>
        )}
        <div className="mt-auto flex items-center gap-2 pt-4 border-t border-white/5 text-sm text-foreground/50">
          <Calendar size={16} className="text-secondary/70" />
          <span>
            {new Date(item.date).toLocaleDateString(
              lang === "uk" ? "uk-UA" : "en-US"
            )}
          </span>
        </div>
      </div>
    </div>
  );
}

export function NewsSection() {
  const { lang } = useLanguage();
  const [news, setNews] = useState<NewsItem[]>(mockNews);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadNews = async () => {
      try {
        setLoading(true);
        console.log("🔄 Loading news from API...");
        const apiPosts = await getPosts(6);
        console.log("✅ API response:", apiPosts);
        console.log("📊 Number of posts:", apiPosts.length);

        if (apiPosts.length === 0) {
          console.warn("⚠️ API returned 0 posts. Check:");
          console.warn("1. Are news added in admin panel?");
          console.warn('2. Is status set to "published"?');
          console.warn(
            "3. Visit https://witerok.com/api/posts.php to see raw API response"
          );
        }

        // Convert API posts to NewsItem format
        const convertedNews: NewsItem[] = apiPosts.map((post: Post) => ({
          id: post.id.toString(),
          title: {
            uk: post.title,
            en: post.title,
          },
          content: {
            uk: post.excerpt,
            en: post.excerpt,
          },
          date: post.date,
          image: post.image || undefined,
        }));

        // Use API news if available, otherwise fallback to mock
        if (convertedNews.length > 0) {
          console.log("✅ Using API news");
          setNews(convertedNews);
        } else {
          console.log("⚠️ Using fallback mock news");
          setNews(mockNews);
        }
        setError(null);
      } catch (err) {
        console.error("❌ Failed to load news:", err);
        setError(
          lang === "uk"
            ? "Не вдалося завантажити новини"
            : "Failed to load news"
        );
        // Keep fallback data visible
        setNews(mockNews);
      } finally {
        setLoading(false);
      }
    };

    loadNews();
  }, [lang]);

  const copy = {
    title: { uk: "Новини", en: "News" },
    subtitle: {
      uk: "Останні оновлення та досягнення",
      en: "Latest updates and achievements",
    },
  };

  return (
    <section id="news" className="section-shell">
      <div className="section-surface">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl text-foreground font-bold mb-4">
            {lang === "uk" ? copy.title.uk : copy.title.en}
          </h2>
          <p className="text-lg text-foreground/70">
            {lang === "uk" ? copy.subtitle.uk : copy.subtitle.en}
          </p>
        </div>

        {loading && (
          <div className="flex justify-center items-center py-12">
            <Loader className="w-8 h-8 text-secondary animate-spin" />
          </div>
        )}

        {error && !loading && (
          <div className="text-center py-12">
            <p className="text-secondary">{error}</p>
          </div>
        )}

        {!loading && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
            {(() => {
              const single = news.length === 1;
              return (
                <div
                  className={
                    single
                      ? "grid grid-cols-1 place-items-center gap-6 md:gap-8"
                      : "grid grid-cols-[repeat(auto-fit,minmax(min(100%,350px),1fr))] gap-6 md:gap-8 items-stretch auto-rows-fr"
                  }
                >
                  {news.map((item) => (
                    <div
                      key={item.id}
                      className={single ? "w-full max-w-3xl" : "w-full h-full"}
                    >
                      <NewsCard item={item} />
                    </div>
                  ))}
                </div>
              );
            })()}
          </div>
        )}
      </div>
    </section>
  );
}
