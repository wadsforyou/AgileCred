import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, CircleMarker, Tooltip, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Phone, MapPin, Navigation } from "lucide-react";
import { CONTACT_INFO } from "@/data/loanCategories";
import { base44 } from "@/api/base44Client";

export default function OfficeMap() {
  const [offices, setOffices] = useState(CONTACT_INFO.offices);
  const [serviceAreas, setServiceAreas] = useState(CONTACT_INFO.serviceAreas);
  const [mapActive, setMapActive] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await base44.entities.BranchLocation.list("-created_date", 200);
        const all = Array.isArray(res) ? res : res?.items || [];
        if (all.length === 0) return;
        // Only show approved (active + map_visible) locations with coordinates
        const visible = all.filter((l) => l.is_active && l.map_visible && l.lat != null && l.lng != null);
        if (visible.length === 0) return;
        const adminOffices = visible
          .filter((l) => l.type === "Office")
          .map((l) => ({
            name: l.name,
            address: [l.address, l.city].filter(Boolean).join(", "),
            phones: l.phone ? [l.phone] : [],
            position: [l.lat, l.lng],
          }));
        const adminAreas = visible
          .filter((l) => l.type === "Service Area")
          .map((l) => ({ name: l.city || l.name, position: [l.lat, l.lng] }));
        // Merge: admin takes precedence, append static not already present
        const seenNames = new Set();
        const mergedOffices = [...adminOffices];
        adminOffices.forEach((o) => seenNames.add(o.name.toLowerCase()));
        CONTACT_INFO.offices.forEach((o) => {
          if (!seenNames.has(o.name.toLowerCase())) { mergedOffices.push(o); seenNames.add(o.name.toLowerCase()); }
        });
        const mergedAreas = adminAreas.length > 0 ? adminAreas : CONTACT_INFO.serviceAreas;
        setOffices(mergedOffices);
        setServiceAreas(mergedAreas);
      } catch {
        // auth/empty: keep static fallback
      }
    })();
  }, []);

  const center = [-18.5, 30.0];

  return (
    <div className="space-y-6">
      <div
        className="relative"
        style={{ zIndex: 0 }}
        onClick={() => setMapActive(true)}
        onMouseLeave={() => setMapActive(false)}
      >
        <MapContainer
          center={center}
          zoom={6}
          scrollWheelZoom={false}
          style={{ height: "420px", width: "100%", borderRadius: "16px", overflow: "hidden", zIndex: 0 }}
          className="border border-border shadow-md"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; OpenStreetMap contributors'
          />

          {serviceAreas.map((area) => (
            <CircleMarker
              key={area.name}
              center={area.position}
              radius={6}
              pathOptions={{ color: "hsl(123 46% 34%)", fillColor: "hsl(123 46% 34%)", fillOpacity: 0.35, weight: 1 }}
            >
              <Tooltip direction="top" offset={[0, -8]} opacity={1}>
                <span style={{ fontSize: "12px", fontWeight: 600 }}>{area.name} — Service Coverage Area</span>
              </Tooltip>
            </CircleMarker>
          ))}

          {offices.map((office) => (
            <CircleMarker
              key={office.name}
              center={office.position}
              radius={11}
              pathOptions={{ color: "hsl(222 100% 22%)", fillColor: "hsl(222 100% 22%)", fillOpacity: 0.9, weight: 2 }}
            >
              <Popup>
                <div style={{ minWidth: "200px" }}>
                  <strong style={{ fontSize: "14px", color: "hsl(222 100% 22%)" }}>{office.name}</strong>
                  <div style={{ fontSize: "12px", marginTop: "4px", color: "#555" }}>{office.address}</div>
                  <div style={{ fontSize: "12px", marginTop: "6px" }}>
                    {office.phones.map((p) => (
                      <div key={p} style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                        <Phone size={11} /> {p}
                      </div>
                    ))}
                  </div>
                  <a
                    href={`https://www.openstreetmap.org/?mlat=${office.position[0]}&mlon=${office.position[1]}&zoom=15`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display: "inline-flex", alignItems: "center", gap: "4px", fontSize: "12px", marginTop: "8px", color: "hsl(123 46% 34%)", fontWeight: 600 }}
                  >
                    <Navigation size={11} /> Get Directions
                  </a>
                </div>
              </Popup>
              <Tooltip direction="top" offset={[0, -10]} opacity={1}>
                <span style={{ fontSize: "12px", fontWeight: 600 }}>{office.name}</span>
              </Tooltip>
            </CircleMarker>
          ))}
        </MapContainer>

        {!mapActive && (
          <div
            className="absolute inset-0 flex items-center justify-center rounded-2xl bg-white/40 backdrop-blur-[2px] cursor-pointer transition-opacity"
            style={{ zIndex: 5 }}
          >
            <div className="flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 shadow-md">
              <MapPin className="w-4 h-4" style={{ color: "hsl(var(--brand-blue))" }} />
              <span className="text-sm font-semibold text-foreground">Tap to use the map</span>
            </div>
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {offices.map((office) => (
          <div key={office.name} className="rounded-xl border border-border p-5 bg-white">
            <h4 className="font-heading font-bold text-foreground flex items-center gap-2">
              <MapPin className="w-4 h-4" style={{ color: "hsl(var(--brand-blue))" }} />
              {office.name}
            </h4>
            <p className="text-sm text-muted-foreground mt-2">{office.address}</p>
            <div className="mt-3 space-y-1">
              {office.phones.map((p) => (
                <a key={p} href={`tel:${p.replace(/\s/g, "")}`} className="flex items-center gap-2 text-sm hover:underline" style={{ color: "hsl(var(--brand-green))" }}>
                  <Phone className="w-3.5 h-3.5" />
                  {p}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-dashed p-4" style={{ borderColor: "hsl(var(--brand-green))", backgroundColor: "hsl(var(--brand-green-light))" }}>
        <p className="text-sm" style={{ color: "hsl(var(--brand-green))" }}>
          <strong>Service Coverage Areas:</strong> {serviceAreas.map((a) => a.name).join(" · ")}
        </p>
        <p className="text-xs mt-1.5" style={{ color: "hsl(var(--brand-green))" }}>
          These areas represent AgileCred's field and service coverage — not all are confirmed branch offices.
        </p>
      </div>
    </div>
  );
}