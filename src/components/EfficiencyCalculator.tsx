import { useEffect, useMemo, useRef, useState } from "react";
import { Loader2 } from "lucide-react";
import { useLanguage } from "../hooks/useLanguage.js";
import {
  calculateEfficiency,
  type TurbineType,
} from "../services/efficiencyCalculatorApi";

type Status = "idle" | "loading" | "success" | "error";

export function EfficiencyCalculator() {
  const { lang } = useLanguage();

  const copy = useMemo(() => {
    const uk = {
      title: "Калькулятор ефективності",
      subtitle:
        "Вкажіть координати, щоб оцінити річну генерацію електроенергії.",
      lat: "Широта (latitude)",
      lon: "Довгота (longitude)",
      year: "Рік",
      turbine: "Тип турбіни",
      turbineStandard: "Стандартна HAWT",
      turbineWiterok: "WITERoK",
      calculate: "Розрахувати",
      calculating: "Розрахунок…",
      resultTitle: "Результат",
      resultUnit: "кВт·год/рік",
      note: "Перший розрахунок для нової локації може тривати довше через завантаження метеоданих.",
      errors: {
        required: "Вкажіть коректні значення широти та довготи.",
        rangeLat: "Широта має бути між -90 та 90.",
        rangeLon: "Довгота має бути між -180 та 180.",
        year: "Рік має бути цілим числом (2000–2030).",
      },
    };

    const en = {
      title: "Efficiency Calculator",
      subtitle: "Enter coordinates to estimate annual electricity generation.",
      lat: "Latitude",
      lon: "Longitude",
      year: "Year",
      turbine: "Turbine type",
      turbineStandard: "Standard HAWT",
      turbineWiterok: "WITERoK",
      calculate: "Calculate",
      calculating: "Calculating…",
      resultTitle: "Result",
      resultUnit: "kWh/year",
      note: "The first calculation for a new location may take longer while meteorological data is fetched.",
      errors: {
        required: "Please enter valid latitude and longitude.",
        rangeLat: "Latitude must be between -90 and 90.",
        rangeLon: "Longitude must be between -180 and 180.",
        year: "Year must be an integer (2000–2030).",
      },
    };

    return lang === "uk" ? uk : en;
  }, [lang]);

  const [lat, setLat] = useState<string>("46.8483");
  const [lon, setLon] = useState<string>("31.0821");
  const [year, setYear] = useState<string>("2023");
  const [turbine, setTurbine] = useState<TurbineType>("STANDARD_HAWT");

  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string>("");
  const [result, setResult] = useState<number | null>(null);

  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    return () => {
      abortRef.current?.abort();
    };
  }, []);

  const formattedResult = useMemo(() => {
    if (result === null) return null;
    return new Intl.NumberFormat(undefined, {
      maximumFractionDigits: 2,
    }).format(result);
  }, [result]);

  const validate = ():
    | {
        ok: true;
        payload: {
          value1: number;
          value2: number;
          year?: number;
          turbine: TurbineType;
        };
      }
    | {
        ok: false;
        message: string;
      } => {
    const value1 = Number(lat);
    const value2 = Number(lon);
    if (!Number.isFinite(value1) || !Number.isFinite(value2)) {
      return { ok: false, message: copy.errors.required };
    }
    if (value1 < -90 || value1 > 90) {
      return { ok: false, message: copy.errors.rangeLat };
    }
    if (value2 < -180 || value2 > 180) {
      return { ok: false, message: copy.errors.rangeLon };
    }

    const trimmedYear = year.trim();
    let parsedYear: number | undefined;
    if (trimmedYear !== "") {
      const num = Number(trimmedYear);
      if (!Number.isInteger(num) || num < 2000 || num > 2030) {
        return { ok: false, message: copy.errors.year };
      }
      parsedYear = num;
    }

    return {
      ok: true,
      payload: {
        value1,
        value2,
        year: parsedYear,
        turbine,
      },
    };
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setResult(null);

    const v = validate();
    if (!v.ok) {
      setStatus("error");
      setError(v.message);
      return;
    }

    abortRef.current?.abort();
    abortRef.current = new AbortController();

    try {
      setStatus("loading");
      const data = await calculateEfficiency(v.payload, {
        signal: abortRef.current.signal,
      });
      setResult(data.result);
      setStatus("success");
    } catch (err) {
      if ((err as { name?: string } | null)?.name === "AbortError") return;
      setStatus("error");
      setError(err instanceof Error ? err.message : "Unknown error");
    }
  }

  return (
    <section
      id="calculator"
      className="relative py-16 md:py-24 bg-gradient-to-b from-white via-[#f7fbff] to-white overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.08),transparent_36%),radial-gradient(circle_at_80%_30%,rgba(59,130,246,0.08),transparent_34%),radial-gradient(circle_at_50%_80%,rgba(14,165,233,0.05),transparent_32%)]" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-white/60 via-transparent to-white/70" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 md:mb-14">
          <h2 className="text-3xl sm:text-4xl md:text-5xl text-[#144073] font-semibold mt-2 md:mt-4 mb-3">
            {copy.title}
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            {copy.subtitle}
          </p>
        </div>

        <div className="mt-8 md:mt-12 max-w-4xl mx-auto rounded-2xl bg-white border border-slate-200 shadow-[0_8px_24px_rgba(0,0,0,0.06)] overflow-hidden">
          <div className="p-6 sm:p-8 md:p-10">
            <form
              onSubmit={onSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5"
            >
              <label className="block">
                <span className="block text-sm font-medium text-slate-700 mb-2">
                  {copy.lat}
                </span>
                <input
                  type="number"
                  inputMode="decimal"
                  step="any"
                  autoComplete="off"
                  value={lat}
                  onChange={(e) => setLat(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/30"
                  placeholder="46.8483"
                />
              </label>

              <label className="block">
                <span className="block text-sm font-medium text-slate-700 mb-2">
                  {copy.lon}
                </span>
                <input
                  type="number"
                  inputMode="decimal"
                  step="any"
                  autoComplete="off"
                  value={lon}
                  onChange={(e) => setLon(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/30"
                  placeholder="31.0821"
                />
              </label>

              <label className="block">
                <span className="block text-sm font-medium text-slate-700 mb-2">
                  {copy.year}
                </span>
                <input
                  type="number"
                  inputMode="numeric"
                  step="1"
                  autoComplete="off"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/30"
                  placeholder="2023"
                />
              </label>

              <label className="block">
                <span className="block text-sm font-medium text-slate-700 mb-2">
                  {copy.turbine}
                </span>
                <select
                  value={turbine}
                  onChange={(e) => setTurbine(e.target.value as TurbineType)}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/30"
                >
                  <option value="STANDARD_HAWT">{copy.turbineStandard}</option>
                  <option value="WITEROK">{copy.turbineWiterok}</option>
                </select>
              </label>

              <div className="md:col-span-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-1">
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all duration-300"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      {copy.calculating}
                    </>
                  ) : (
                    copy.calculate
                  )}
                </button>

                <p className="text-xs sm:text-sm text-slate-500 max-w-xl">
                  {copy.note}
                </p>
              </div>
            </form>

            {(status === "error" || status === "success") && (
              <div className="mt-7 sm:mt-8 rounded-xl border border-slate-200 bg-slate-50 p-5 overflow-hidden">
                {status === "error" ? (
                  <p className="text-sm text-red-700">{error}</p>
                ) : (
                  <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 min-w-0">
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-slate-700">
                        {copy.resultTitle}
                      </p>
                      <p className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[#144073] break-words">
                        {formattedResult}
                      </p>
                    </div>
                    <p className="text-sm text-slate-600 whitespace-nowrap">
                      {copy.resultUnit}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
