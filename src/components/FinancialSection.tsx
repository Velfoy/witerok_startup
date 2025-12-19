import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { TrendingUp, DollarSign, PiggyBank, Target } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

export function FinancialSection() {
  const { lang } = useLanguage();

  const revenueData = [
    { year: "2024", revenue: 250, profit: 50 },
    { year: "2025", revenue: 800, profit: 200 },
    { year: "2026", revenue: 2000, profit: 600 },
    { year: "2027", revenue: 4500, profit: 1500 },
    { year: "2028", revenue: 8000, profit: 3000 },
  ];

  const costBreakdown = [
    {
      name: { uk: "Виробництво", en: "Manufacturing" },
      value: 40,
      color: "#144073",
    },
    { name: { uk: "Маркетинг", en: "Marketing" }, value: 25, color: "#1A6DCC" },
    { name: { uk: "R&D", en: "R&D" }, value: 15, color: "#5a9de8" },
    {
      name: { uk: "Операційні", en: "Operations" },
      value: 12,
      color: "#84b6f1",
    },
    { name: { uk: "Інше", en: "Other" }, value: 8, color: "#b3d4f5" },
  ];

  const metrics = [
    {
      icon: TrendingUp,
      label: { uk: "Прогнозований дохід 2025", en: "Forecasted revenue 2025" },
      value: "$800K",
      change: "+220%",
      positive: true,
    },
    {
      icon: DollarSign,
      label: { uk: "Середній чек", en: "Average order" },
      value: "$12K",
      change: { uk: "за установку", en: "per installation" },
      positive: true,
    },
    {
      icon: PiggyBank,
      label: { uk: "Необхідні інвестиції", en: "Funding needed" },
      value: "$500K",
      change: { uk: "Seed раунд", en: "Seed round" },
      positive: true,
    },
    {
      icon: Target,
      label: "Break-even",
      value: "Q3 2025",
      change: { uk: "18 місяців", en: "18 months" },
      positive: true,
    },
  ];

  const unitEconomics = [
    {
      metric: { uk: "Середня ціна продажу", en: "Average selling price" },
      value: "$12,000",
    },
    {
      metric: { uk: "Собівартість виробництва", en: "Production cost" },
      value: "$6,500",
    },
    {
      metric: { uk: "Валова маржа", en: "Gross margin" },
      value: "$5,500 (45%)",
    },
    {
      metric: {
        uk: "Вартість залучення клієнта (CAC)",
        en: "Customer acquisition cost (CAC)",
      },
      value: "$200",
    },
    {
      metric: { uk: "Lifetime Value (LTV)", en: "Lifetime Value (LTV)" },
      value: "$18,000",
    },
    { metric: { uk: "LTV/CAC", en: "LTV/CAC" }, value: "90x" },
  ];

  const investmentBullets = [
    {
      uk: "Розширення виробничих потужностей",
      en: "Scale manufacturing capacity",
    },
    {
      uk: "Збільшення команди продажів до 10 осіб",
      en: "Grow sales team to 10 reps",
    },
    {
      uk: "Розширення маркетингових каналів",
      en: "Expand marketing channels",
    },
    {
      uk: "R&D нової лінійки продуктів",
      en: "R&D for next product line",
    },
  ];

  const fundsAllocation = [
    { uk: "Виробництво", en: "Manufacturing", percent: 40 },
    { uk: "Продажі & Маркетинг", en: "Sales & Marketing", percent: 35 },
    { uk: "R&D", en: "R&D", percent: 15 },
    { uk: "Операційні витрати", en: "Operating expenses", percent: 10 },
  ];

  const localizedCostBreakdown = costBreakdown.map((entry) => ({
    ...entry,
    name: lang === "uk" ? entry.name.uk : entry.name.en,
  }));

  return (
    <section id="financial" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl text-primary mb-4">
            {lang === "uk" ? "Фінансова модель" : "Financial model"}
          </h2>
          <p className="text-xl text-foreground/80">
            {lang === "uk"
              ? "Прозора фінансова стратегія та прогнози зростання"
              : "Transparent financial strategy and growth outlook"}
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <div
                key={index}
                className="bg-muted rounded-xl p-6 hover:shadow-lg transition-all"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-secondary/10 rounded-lg mb-4">
                  <Icon className="text-secondary" size={24} />
                </div>
                <div className="text-sm text-foreground/60 mb-2">
                  {typeof metric.label === "string"
                    ? metric.label
                    : lang === "uk"
                    ? metric.label.uk
                    : metric.label.en}
                </div>
                <div className="text-3xl text-primary mb-2">{metric.value}</div>
                <div
                  className={`text-sm ${
                    metric.positive ? "text-green-600" : "text-foreground/60"
                  }`}
                >
                  {typeof metric.change === "string"
                    ? metric.change
                    : lang === "uk"
                    ? metric.change.uk
                    : metric.change.en}
                </div>
              </div>
            );
          })}
        </div>

        {/* Revenue & Profit Chart */}
        <div className="bg-muted rounded-2xl p-8 mb-16">
          <h3 className="text-2xl text-primary mb-6">
            {lang === "uk"
              ? "Прогноз доходів та прибутку (тис. USD)"
              : "Revenue and profit forecast (k USD)"}
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1A6DCC" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#1A6DCC" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#144073" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#144073" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#1A6DCC"
                fillOpacity={1}
                fill="url(#colorRevenue)"
                name={lang === "uk" ? "Дохід" : "Revenue"}
              />
              <Area
                type="monotone"
                dataKey="profit"
                stroke="#144073"
                fillOpacity={1}
                fill="url(#colorProfit)"
                name={lang === "uk" ? "Прибуток" : "Profit"}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Cost Structure Pie Chart */}
          <div className="bg-muted rounded-2xl p-8">
            <h3 className="text-2xl text-primary mb-6">
              {lang === "uk" ? "Структура витрат" : "Cost structure"}
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={localizedCostBreakdown}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({
                    name,
                    percent,
                  }: {
                    name: string;
                    percent: number;
                  }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {localizedCostBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Unit Economics */}
          <div className="bg-muted rounded-2xl p-8">
            <h3 className="text-2xl text-primary mb-6">
              {lang === "uk" ? "Unit Economics" : "Unit economics"}
            </h3>
            <div className="space-y-4">
              {unitEconomics.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center py-2 border-b border-border/50"
                >
                  <span className="text-foreground/80">
                    {typeof item.metric === "string"
                      ? item.metric
                      : lang === "uk"
                      ? item.metric.uk
                      : item.metric.en}
                  </span>
                  <span className="text-primary">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Investment Ask */}
        <div className="bg-gradient-to-br from-primary to-secondary rounded-2xl p-8 md:p-12 text-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl mb-4">
                {lang === "uk" ? "Інвестиційна пропозиція" : "Investment offer"}
              </h3>
              <p className="text-xl text-white/90 mb-6">
                {lang === "uk"
                  ? "Залучаємо $500K для масштабування виробництва та розширення команди продажів"
                  : "Raising $500K to scale manufacturing and expand the sales team"}
              </p>
              <div className="space-y-3">
                {investmentBullets.map((bullet, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-2 h-2 bg-white rounded-full mr-3" />
                    <span>{lang === "uk" ? bullet.uk : bullet.en}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
              <div className="space-y-6">
                <div>
                  <div className="text-white/80 mb-2">
                    {lang === "uk" ? "Використання коштів" : "Use of funds"}
                  </div>
                  <div className="space-y-2">
                    {fundsAllocation.map((fund, index) => (
                      <div key={index}>
                        <div className="flex justify-between text-sm mb-1">
                          <span>{lang === "uk" ? fund.uk : fund.en}</span>
                          <span>{fund.percent}%</span>
                        </div>
                        <div className="w-full bg-white/20 rounded-full h-2">
                          <div
                            className="bg-white h-full rounded-full"
                            style={{ width: `${fund.percent}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="pt-4 border-t border-white/20">
                  <div className="text-white/80 mb-2">
                    {lang === "uk" ? "Очікуваний ROI" : "Expected ROI"}
                  </div>
                  <div className="text-4xl">3-5x</div>
                  <div className="text-white/80 text-sm">
                    {lang === "uk" ? "протягом 3-4 років" : "over 3-4 years"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
