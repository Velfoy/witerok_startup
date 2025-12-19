import {
  Wind,
  Battery,
  Gauge,
  Shield,
  Wrench,
  TrendingUp,
  Calendar,
  Zap,
} from "lucide-react";

export function ProductSection() {
  const specs = [
    { icon: Wind, label: "Потужність", value: "5-10 кВт" },
    { icon: Gauge, label: "Швидкість вітру", value: "3-25 м/с" },
    { icon: Battery, label: "Автономність", value: "24/7" },
    { icon: Shield, label: "Гарантія", value: "5 років" },
    { icon: Calendar, label: "Термін служби", value: "15-20 років" },
    { icon: Wrench, label: "Обслуговування", value: "Мінімальне" },
    { icon: TrendingUp, label: "Окупність", value: "3-5 років" },
    { icon: Zap, label: "Ефективність", value: ">90%" },
  ];

  return (
    <section id="product" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl text-primary mb-4">
            Вітрогенератор WITERoK
          </h2>
          <p className="text-xl text-foreground/80">
            Інноваційне рішення для локальної енергонезалежності
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Product Image */}
          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1720135364880-2f748e0befb4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3aW5kJTIwdHVyYmluZXxlbnwxfHx8fDE3NjU5MTk4NTZ8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="WITERoK Wind Generator"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-secondary text-white p-6 rounded-xl shadow-xl">
              <div className="text-sm mb-1">Термін служби</div>
              <div className="text-3xl">15-20 років</div>
            </div>
          </div>

          {/* Product Features */}
          <div>
            <h3 className="text-3xl text-primary mb-8">Характеристики</h3>
            <div className="grid grid-cols-2 gap-6">
              {specs.map((spec, index) => {
                const Icon = spec.icon;
                return (
                  <div
                    key={index}
                    className="bg-muted rounded-xl p-4 hover:bg-secondary/10 transition-colors"
                  >
                    <Icon className="text-secondary mb-2" size={24} />
                    <div className="text-sm text-foreground/60 mb-1">
                      {spec.label}
                    </div>
                    <div className="text-lg text-primary">{spec.value}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="bg-gradient-to-br from-primary to-secondary rounded-2xl p-8 md:p-12 text-white">
          <h3 className="text-3xl mb-8 text-center">Переваги WITERoK</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl mb-3">⚡</div>
              <h4 className="text-xl mb-2">Швидке встановлення</h4>
              <p className="text-white/80">
                Не потребує складної інфраструктури та спецтехніки
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-3">💰</div>
              <h4 className="text-xl mb-2">Економія коштів</h4>
              <p className="text-white/80">
                Зниження витрат на електроенергію до 70%
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-3">🌱</div>
              <h4 className="text-xl mb-2">Екологічність</h4>
              <p className="text-white/80">Чиста енергія без викидів CO₂</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
