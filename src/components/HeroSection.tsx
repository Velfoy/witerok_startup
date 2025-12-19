import { ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `linear-gradient(rgba(20, 64, 115, 0.7), rgba(26, 109, 204, 0.5)), url('https://images.unsplash.com/photo-1599405032290-29d6e9e7274c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aW5kJTIwdHVyYmluZSUyMGVuZXJneXxlbnwxfHx8fDE3NjU4NjkxNjF8MA&ixlib=rb-4.1.0&q=80&w=1080')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        <h1 className="text-5xl md:text-7xl text-white mb-6">
          Вітроенергія нового покоління
        </h1>
        <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-12">
          WITERoK — компактні вітрогенератори для локальної енергонезалежності
          бізнесу та громад
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#product"
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary rounded-full hover:bg-gray-100 transition-all group"
          >
            Дізнатися більше
            <ArrowRight
              className="ml-2 group-hover:translate-x-1 transition-transform"
              size={20}
            />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white rounded-full hover:bg-white/10 transition-all"
          >
            Зв'язатися з нами
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-white/70 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}
