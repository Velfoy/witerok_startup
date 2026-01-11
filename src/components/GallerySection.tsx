import { useLanguage } from "../hooks/useLanguage";
import { useState, useEffect } from "react";
import { ChevronDown, X, Download } from "lucide-react";

// Import gallery images
import img1 from "../assets/9P6A1988-Улучшено-Ум. шума-2.jpg";
import img2 from "../assets/9P6A2018-Улучшено-Ум. шума-2.jpg";
import img3 from "../assets/9P6A2020-Улучшено-Ум. шума-2.jpg";
import img4 from "../assets/9P6A2050-Улучшено-Ум. шума-2.jpg";
import img5 from "../assets/DSC00275.jpg";
import img6 from "../assets/IMG_20260109_200624.jpg";
import img7 from "../assets/IMG_6489_natalinakovalyova_.jpg";
import img8 from "../assets/IMG_8394.jpg";
import img9 from "../assets/IMG_8396.jpg";
import img10 from "../assets/SVOE.IT_lisovoi_422.jpg";
import img11 from "../assets/0119.jpg";
import img12 from "../assets/-storage-emulated-0-DCIM-Camera-IMG_20250129_203502.jpg";
import img13 from "../assets/trashed-1747937738-IMG_20250422_204709.jpg";

// Gallery images array
const galleryImages = [
  {
    id: "1",
    src: img1,
    alt: { uk: "Робота над проєктом", en: "Working on the project" },
  },
  { id: "2", src: img2, alt: { uk: "Команда WITERoK", en: "WITERoK team" } },
  {
    id: "3",
    src: img3,
    alt: { uk: "Розробка прототипу", en: "Prototype development" },
  },
  {
    id: "4",
    src: img4,
    alt: { uk: "Тестування установки", en: "Testing the installation" },
  },
  {
    id: "5",
    src: img5,
    alt: { uk: "Презентація проєкту", en: "Project presentation" },
  },
  {
    id: "6",
    src: img6,
    alt: { uk: "Командна робота", en: "Team collaboration" },
  },
  {
    id: "7",
    src: img7,
    alt: { uk: "Учасники проєкту", en: "Project participants" },
  },
  {
    id: "8",
    src: img8,
    alt: { uk: "Демонстрація технології", en: "Technology demonstration" },
  },
  { id: "9", src: img9, alt: { uk: "Технічні роботи", en: "Technical work" } },
  {
    id: "10",
    src: img10,
    alt: { uk: "Інноваційні рішення", en: "Innovative solutions" },
  },
  {
    id: "11",
    src: img11,
    alt: { uk: "Момент розробки", en: "Development moment" },
  },
  { id: "12", src: img12, alt: { uk: "Робочий процес", en: "Work process" } },
  {
    id: "13",
    src: img13,
    alt: { uk: "Підготовка до тестування", en: "Preparation for testing" },
  },
];

const INITIAL_LOAD = 6; // Number of images to show initially
const LOAD_MORE_COUNT = 6; // Number of images to load when clicking "Load More"

export function GallerySection() {
  const { lang } = useLanguage();
  const [visibleCount, setVisibleCount] = useState(INITIAL_LOAD);
  const [selectedImage, setSelectedImage] = useState<
    (typeof galleryImages)[0] | null
  >(null);

  const hasMore = visibleCount < galleryImages.length;
  const visibleImages = galleryImages.slice(0, visibleCount);

  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedImage(null);
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedImage]);

  const loadMore = () => {
    setVisibleCount((prev) =>
      Math.min(prev + LOAD_MORE_COUNT, galleryImages.length)
    );
  };

  const downloadImage = (src: string, alt: string) => {
    const link = document.createElement("a");
    link.href = src;
    link.download = `WITERoK-${alt.replace(/\s+/g, "-")}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const copy = {
    title: { uk: "Галерея", en: "Gallery" },
    subtitle: {
      uk: "Наші досягнення та моменти розробки",
      en: "Our achievements and development moments",
    },
    loadMore: { uk: "Завантажити більше", en: "Load More" },
    download: { uk: "Завантажити", en: "Download" },
    clickToView: { uk: "Натисніть для перегляду", en: "Click to view" },
    noImages: {
      uk: "Скоро тут з'являться фотографії нашої роботи",
      en: "Photos of our work will appear here soon",
    },
  };

  return (
    <section id="gallery" className="section-shell">
      <div className="section-surface">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl text-foreground font-bold mb-4">
            {lang === "uk" ? copy.title.uk : copy.title.en}
          </h2>
          <p className="text-lg text-foreground/70">
            {lang === "uk" ? copy.subtitle.uk : copy.subtitle.en}
          </p>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          {galleryImages.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-foreground/60">
                {lang === "uk" ? copy.noImages.uk : copy.noImages.en}
              </p>
              <p className="text-sm text-foreground/50 mt-4">
                {lang === "uk"
                  ? "Додайте зображення до папки src/assets/gallery/"
                  : "Add images to src/assets/gallery/ folder"}
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {visibleImages.map((image) => (
                  <div
                    key={image.id}
                    onClick={() => setSelectedImage(image)}
                    className="group relative aspect-[4/3] rounded-2xl overflow-hidden glass-panel gallery-item cursor-pointer"
                  >
                    <img
                      src={image.src}
                      alt={
                        typeof image.alt === "string"
                          ? image.alt
                          : lang === "uk"
                          ? image.alt.uk
                          : image.alt.en
                      }
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>

              {hasMore && (
                <div className="text-center mt-12">
                  <button
                    onClick={loadMore}
                    className="inline-flex items-center gap-2 px-8 py-3 rounded-xl text-white font-semibold transition-all duration-300 hover:shadow-[0_14px_36px_rgba(26,109,204,0.28)] hover:scale-105"
                    style={{
                      background: "linear-gradient(135deg, #144073, #1A6DCC)",
                    }}
                  >
                    <span>
                      {lang === "uk" ? copy.loadMore.uk : copy.loadMore.en}
                    </span>
                    <ChevronDown size={20} />
                  </button>
                  <p className="text-sm text-foreground/50 mt-4">
                    {lang === "uk"
                      ? `Показано ${visibleCount} з ${galleryImages.length}`
                      : `Showing ${visibleCount} of ${galleryImages.length}`}
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/90 backdrop-blur-sm p-4 overflow-y-auto"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="fixed top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-colors"
            aria-label="Close"
          >
            <X size={24} className="text-white" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              const altText =
                typeof selectedImage.alt === "string"
                  ? selectedImage.alt
                  : lang === "uk"
                  ? selectedImage.alt.uk
                  : selectedImage.alt.en;
              downloadImage(selectedImage.src, altText);
            }}
            className="fixed top-4 left-4 flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-colors"
            aria-label="Download"
          >
            <Download size={20} className="text-white" />
            <span className="text-white text-sm font-medium">
              {lang === "uk" ? copy.download.uk : copy.download.en}
            </span>
          </button>

          <div
            className="flex flex-col my-auto py-8 max-w-5xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex-1 flex items-center justify-center min-h-[50vh]">
              <img
                src={selectedImage.src}
                alt={
                  typeof selectedImage.alt === "string"
                    ? selectedImage.alt
                    : lang === "uk"
                    ? selectedImage.alt.uk
                    : selectedImage.alt.en
                }
                loading="lazy"
                decoding="async"
                className="w-full h-auto max-h-[75vh] object-contain rounded-lg"
              />
            </div>
            <div className="bg-gradient-to-t from-black/80 via-black/60 to-transparent mt-4 p-6 rounded-lg">
              <p className="text-white text-xl font-medium">
                {typeof selectedImage.alt === "string"
                  ? selectedImage.alt
                  : lang === "uk"
                  ? selectedImage.alt.uk
                  : selectedImage.alt.en}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
