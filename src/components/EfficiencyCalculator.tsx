import { useEffect, useMemo, useRef, useState } from "react";
import { Crosshair, Loader2 } from "lucide-react";
import type { Map as LeafletMap } from "leaflet";
import { useLanguage } from "../hooks/useLanguage.js";
import {
  calculateEfficiency,
  type TurbineType,
} from "../services/efficiencyCalculatorApi";
import { MapPicker } from "./MapPicker";

type Status = "idle" | "loading" | "success" | "error";

// API request mapping (unchanged):
//   POST {ORIGIN}/api/calculate
//   body: { value1: lat, value2: lon, year: number, turbine: TurbineType }

const YEAR = 2023;

interface TurbineOption {
  label: string;
  apiValue: TurbineType;
}

const TURBINE_OPTIONS: TurbineOption[] = [
  { label: "Standard HAWT", apiValue: "STANDARD_HAWT" },
];

export function EfficiencyCalculator() {
  const { lang } = useLanguage();

  const copy = useMemo(() => {
    const uk = {
      title: "Калькулятор ефективності",
      subtitle:
        "Оберіть точку на мапі, щоб оцінити річну генерацію електроенергії.",
      turbineModel: "Модель турбіни:",
      calculate: "Розрахувати",
      calculating: "Розрахунок…",
      resultTitle: "Результат",
      resultUnit: "кВт·год/рік",
      note: "Перший розрахунок для нової локації може тривати довше через завантаження метеоданих.",
      locate: "Дозволити геолокацію для швидкої оцінки",
      denied: "Доступ до геолокації заборонено. Оберіть точку на мапі вручну.",
      errors: {
        required: "Оберіть точку на мапі.",
      },
    };

    const en = {
      title: "Efficiency Calculator",
      subtitle:
        "Pick a point on the map to estimate annual electricity generation.",
      turbineModel: "Turbine model:",
      calculate: "Calculate",
      calculating: "Calculating…",
      resultTitle: "Result",
      resultUnit: "kWh/year",
      note: "The first calculation for a new location may take longer while meteorological data is fetched.",
      locate: "Allow location for fast estimation",
      denied: "Location access denied. Select manually on the map.",
      errors: {
        required: "Select a point on the map.",
      },
    };

    return lang === "uk" ? uk : en;
  }, [lang]);

  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(
    null,
  );
  const [selectedTurbine, setSelectedTurbine] = useState<TurbineOption>(
    TURBINE_OPTIONS[0],
  );

  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string>("");
  const [result, setResult] = useState<number | null>(null);

  const abortRef = useRef<AbortController | null>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const [geoError, setGeoError] = useState<string>("");

  function handleLocate() {
    setGeoError("");
    if (!("geolocation" in navigator)) {
      setGeoError(copy.denied);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
        setCoords({ lat, lon });
        mapRef.current?.flyTo([lat, lon], 10);
      },
      () => setGeoError(copy.denied),
    );
  }

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

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setResult(null);

    if (!coords) {
      setStatus("error");
      setError(copy.errors.required);
      return;
    }

    abortRef.current?.abort();
    abortRef.current = new AbortController();

    try {
      setStatus("loading");
      const data = await calculateEfficiency(
        {
          value1: coords.lat,
          value2: coords.lon,
          year: YEAR,
          turbine: selectedTurbine.apiValue,
        },
        { signal: abortRef.current.signal },
      );
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
      className="relative py-20 bg-white overflow-hidden"
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 md:mb-14">
          <h2 className="text-3xl sm:text-4xl md:text-5xl text-[#144073] font-semibold mt-2 md:mt-4 mb-3">
            {copy.title}
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            {copy.subtitle}
          </p>
        </div>

        <div className="mt-8 md:mt-12 max-w-[62rem] mx-auto rounded-2xl bg-white border border-slate-200 shadow-[0_8px_24px_rgba(0,0,0,0.06)] overflow-hidden">
          <div className="p-6 sm:p-8 md:p-10">
            <form
              onSubmit={onSubmit}
              className="flex flex-col gap-4 sm:gap-5 md:grid md:grid-cols-[10fr_7fr] md:items-start md:gap-8"
            >
              {/* Left: map */}
              <div className="w-full">
                <MapPicker
                  value={coords}
                  onChange={setCoords}
                  mapRef={mapRef}
                />
              </div>

              {/* Right: controls */}
              <div className="w-full flex flex-col gap-4 sm:gap-5">
                <button
                  type="button"
                  onClick={handleLocate}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-white font-semibold rounded-xl transition-all duration-300"
                >
                  <Crosshair className="w-5 h-5" />
                  {copy.locate}
                </button>

                {geoError && (
                  <p className="text-sm text-red-700">{geoError}</p>
                )}

                <div className="flex flex-col">
                  <span className="block text-sm font-medium text-slate-700 mb-1">
                    {copy.turbineModel}
                  </span>
                  <select
                    value={selectedTurbine.apiValue}
                    onChange={(e) => {
                      const next = TURBINE_OPTIONS.find(
                        (o) => o.apiValue === e.target.value,
                      );
                      if (next) setSelectedTurbine(next);
                    }}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/30"
                  >
                    {TURBINE_OPTIONS.map((opt) => (
                      <option key={opt.apiValue} value={opt.apiValue}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={status === "loading" || coords === null}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all duration-300"
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

                <p className="text-xs sm:text-sm text-slate-500">{copy.note}</p>

                {(status === "error" || status === "success") && (
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 overflow-hidden">
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
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
