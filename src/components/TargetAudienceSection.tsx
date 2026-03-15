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
    <section id="audience" className="relative py-24 min-h-[500px]">
      <div
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        style={{ zIndex: 10 }}
      >
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl text-white mb-4 drop-shadow-lg">
            {lang === "uk"
              ? "Локації встановлення WITERoK"
              : "WITERoK Installation Locations"}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 auto-rows-[150px] sm:auto-rows-[170px] lg:auto-rows-[190px] gap-3 sm:gap-4">
          <div className="sm:col-span-2 lg:col-span-2 lg:row-span-2 overflow-hidden rounded-xl">
            <img
              src={locationImages[0]}
              alt="WITERoK installation location"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover"
            />
          </div>

          {locationImages.slice(1).map((image, index) => (
            <div key={index} className="overflow-hidden rounded-xl">
              <img
                src={image}
                alt="WITERoK installation location"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
