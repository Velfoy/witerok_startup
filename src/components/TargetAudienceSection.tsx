import { useLanguage } from "../hooks/useLanguage.js";
import turbineImageA from "../assets/turbine.jpg";
import turbineImageB from "../assets/turbine2.png";
import turbineImageC from "../assets/IMG_20260109_200624.jpg";
import turbineImageD from "../assets/IMG_8394.jpg";
import turbineImageE from "../assets/IMG_8396.jpg";

export function TargetAudienceSection() {
  const { lang } = useLanguage();

  const locationImages = [
    turbineImageA,
    turbineImageB,
    turbineImageC,
    turbineImageD,
    turbineImageE,
  ];

  return (
    <section id="locations" className="relative py-16 md:py-24">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[200px] sm:auto-rows-[220px]">
          {/* Large main image */}
          <div className="sm:col-span-2 sm:row-span-2 rounded-xl overflow-hidden group">
            <img
              src={locationImages[0]}
              alt="WITERoK installation"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          {/* Smaller images */}
          {locationImages.slice(1).map((image, index) => (
            <div key={index} className="rounded-xl overflow-hidden group">
              <img
                src={image}
                alt="WITERoK installation"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
