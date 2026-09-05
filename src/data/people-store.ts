import { cast as defaultCast, crew as defaultCrew, type Person } from "./people";
import overrideData from "./people-overrides.json";

const STORAGE_KEY = "katakulli-people-v1";
const EVENT_NAME = "katakulli-data-updated";
type StoreData = { cast: Person[]; crew: Person[] };

function cloneDefaults(): StoreData {
  if (Array.isArray(overrideData.cast) && Array.isArray(overrideData.crew) && (overrideData.cast.length || overrideData.crew.length)) {
    return structuredClone(overrideData as StoreData);
  }
  return { cast: structuredClone(defaultCast), crew: structuredClone(defaultCrew) };
}

let cached: StoreData = cloneDefaults();
let loaded = false;

export function getPeopleData(): StoreData {
  return structuredClone(cached);
}

export async function loadPeopleData(): Promise<StoreData> {
  try {
    const response = await fetch("/api/people", { cache: "no-store" });
    if (response.ok) {
      const parsed = (await response.json()) as StoreData;
      if (Array.isArray(parsed.cast) && Array.isArray(parsed.crew)) {
        cached = parsed;
        loaded = true;
        window.dispatchEvent(new CustomEvent(EVENT_NAME));
        return structuredClone(cached);
      }
    }
  } catch {
    // Local fallback keeps the app usable if the dev API is unavailable.
  }
  if (!loaded) cached = cloneDefaults();
  return structuredClone(cached);
}

export async function savePeopleData(data: StoreData): Promise<void> {
  const response = await fetch("/api/people", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Veriler dosyaya kaydedilemedi.");
  cached = structuredClone(data);
  loaded = true;
  window.dispatchEvent(new CustomEvent(EVENT_NAME));
}

export async function resetPeopleData(): Promise<void> {
  const response = await fetch("/api/people", { method: "DELETE" });
  if (!response.ok) throw new Error("Varsayılan verilere dönülemedi.");
  cached = cloneDefaults();
  loaded = true;
  window.dispatchEvent(new CustomEvent(EVENT_NAME));
}

export function exportPeopleData() {
  const blob = new Blob([JSON.stringify(getPeopleData(), null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "katakulli-oyuncular-veri.json";
  a.click();
  URL.revokeObjectURL(url);
}

export function importPeopleData(file: File): Promise<void> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const parsed = JSON.parse(String(reader.result)) as StoreData;
        if (!Array.isArray(parsed.cast) || !Array.isArray(parsed.crew)) throw new Error("Geçersiz veri dosyası");
        await savePeopleData(parsed);
        resolve();
      } catch (error) { reject(error); }
    };
    reader.onerror = () => reject(reader.error ?? new Error("Dosya okunamadı"));
    reader.readAsText(file);
  });
}

export function subscribePeopleData(callback: () => void) {
  const handler = () => callback();
  window.addEventListener(EVENT_NAME, handler);
  window.addEventListener("storage", handler);
  return () => { window.removeEventListener(EVENT_NAME, handler); window.removeEventListener("storage", handler); };
}
