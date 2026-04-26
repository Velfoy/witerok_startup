import { useEffect, useRef, useState } from "react";
import { MapContainer, Marker, TileLayer, useMap, useMapEvents } from "react-leaflet";
import type { Map as LeafletMap } from "leaflet";
import { Crosshair } from "lucide-react";
import "../lib/leafletIconFix";

export interface MapPickerProps {
  value: { lat: number; lon: number } | null;
  onChange: (coords: { lat: number; lon: number } | null) => void;
  locateLabel?: string;
  deniedLabel?: string;
}

function ClickHandler({
  onChange,
}: {
  onChange: (coords: { lat: number; lon: number }) => void;
}) {
  useMapEvents({
    click(e) {
      onChange({ lat: e.latlng.lat, lon: e.latlng.lng });
    },
  });
  return null;
}

function MapRefBinder({
  mapRef,
  containerRef,
}: {
  mapRef: React.MutableRefObject<LeafletMap | null>;
  containerRef: React.RefObject<HTMLDivElement | null>;
}) {
  const map = useMap();
  useEffect(() => {
    mapRef.current = map;
    const invalidate = () => map.invalidateSize();
    invalidate();
    const t1 = setTimeout(invalidate, 0);
    const t2 = setTimeout(invalidate, 200);
    let ro: ResizeObserver | null = null;
    if (containerRef.current && typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(() => invalidate());
      ro.observe(containerRef.current);
    }
    window.addEventListener("resize", invalidate);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      ro?.disconnect();
      window.removeEventListener("resize", invalidate);
    };
  }, [map, mapRef, containerRef]);
  return null;
}

export function MapPicker({
  value,
  onChange,
  locateLabel = "Allow location for fast estimation",
  deniedLabel = "Location access denied. Select manually on the map.",
}: MapPickerProps) {
  const mapRef = useRef<LeafletMap | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [geoError, setGeoError] = useState<string>("");

  function handleLocate() {
    setGeoError("");
    if (!("geolocation" in navigator)) {
      setGeoError(deniedLabel);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
        onChange({ lat, lon });
        mapRef.current?.flyTo([lat, lon], 10);
      },
      () => {
        setGeoError(deniedLabel);
      },
    );
  }

  return (
    <div className="w-full">
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden rounded-2xl border border-slate-200"
        style={{ aspectRatio: "16 / 9" }}
      >
        <MapContainer
          center={[50.0, 30.0]}
          zoom={5}
          scrollWheelZoom={false}
          style={{ width: "100%", height: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <ClickHandler onChange={onChange} />
          <MapRefBinder mapRef={mapRef} containerRef={containerRef} />
          {value && <Marker position={[value.lat, value.lon]} />}
        </MapContainer>
      </div>

      <button
        type="button"
        onClick={handleLocate}
        className="mt-4 w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-white font-semibold rounded-xl transition-all duration-300"
      >
        <Crosshair className="w-5 h-5" />
        {locateLabel}
      </button>

      {geoError && (
        <p className="mt-2 text-sm text-red-700">{geoError}</p>
      )}
    </div>
  );
}
