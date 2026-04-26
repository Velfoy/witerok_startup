import { useLanguage } from "../hooks/useLanguage.js";
import loc1 from "../assets/loc11.png";
import loc2 from "../assets/loc12.png";
import loc3 from "../assets/loc13.png";
import loc4 from "../assets/loc14.png";
import loc5 from "../assets/loc15.png";
import loc6 from "../assets/loc16.png";
import loc7 from "../assets/loc17.png";
import loc8 from "../assets/loc18.png";
export function TargetAudienceSection() {
  const { lang } = useLanguage();

  const locationImages = [
    {
      src: loc1,
      caption: {
        uk: "Приватный будинок",
        en: " Private House",
      },
    },
    {
      src: loc2,
      caption: {
        uk: "Еко-будинок",
        en: "Eco House",
      },
    },
    {
      src: loc3,
      caption: {
        uk: "Багатоповерхівки",
        en: "High-Rise Buildings",
      },
    },
    {
      src: loc4,
      caption: {
        uk: "Бізнес-центр ",
        en: "Business Center  ",
      },
    },
    {
      src: loc5,
      caption: {
        uk: "Сільськогосподарські поля з теплицями",
        en: "Agricultural Fields with Greenhouses",
      },
    },
    {
      src: loc6,
      caption: {
        uk: "Громадський парк",
        en: "Public Park",
      },
    },
    {
      src: loc7,
      caption: {
        uk: "Чиста електрозаправка",
        en: "Clean EV Charging Station ",
      },
    },
    {
      src: loc8,
      caption: {
        uk: "Відкрите поле для вітропарків",
        en: "Open Field for Wind Parks",
      },
    },
  ];

  return (
    <section id="locations" className="relative py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl text-white font-semibold drop-shadow-lg">
            {lang === "uk"
              ? "Локації встановлення WITERoK"
              : "WITERoK Installation Locations"}
          </h2>
        </div>

        {/* Gallery */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {locationImages.map((image, index) => (
            <article
              key={index}
              className="rounded-2xl overflow-hidden bg-white/10 border border-white/20 backdrop-blur-sm"
            >
              <div className="aspect-[4/3] overflow-hidden group">
                <img
                  src={image.src}
                  alt={lang === "uk" ? image.caption.uk : image.caption.en}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="px-4 py-3">
                <p className="text-sm sm:text-base text-white/90 text-center font-medium">
                  {lang === "uk" ? image.caption.uk : image.caption.en}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
