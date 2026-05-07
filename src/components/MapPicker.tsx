import { useEffect, useRef } from "react";
import { MapContainer, Marker, TileLayer, useMap, useMapEvents } from "react-leaflet";
import type { Map as LeafletMap } from "leaflet";
import "../lib/leafletIconFix";

export interface MapPickerProps {
  value: { lat: number; lon: number } | null;
  onChange: (coords: { lat: number; lon: number } | null) => void;
  mapRef?: React.MutableRefObject<LeafletMap | null>;
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
  mapRef: externalMapRef,
}: MapPickerProps) {
  const internalMapRef = useRef<LeafletMap | null>(null);
  const resolvedMapRef = externalMapRef ?? internalMapRef;
  const containerRef = useRef<HTMLDivElement | null>(null);

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
          <MapRefBinder mapRef={resolvedMapRef} containerRef={containerRef} />
          {value && <Marker position={[value.lat, value.lon]} />}
        </MapContainer>
      </div>
    </div>
  );
}
