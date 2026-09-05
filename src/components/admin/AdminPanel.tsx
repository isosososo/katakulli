import { useEffect, useMemo, useState, type ChangeEvent } from "react";
import { ArrowLeft, Download, ImagePlus, LogOut, Plus, RotateCcw, Save, Trash2, Upload } from "lucide-react";
import { exportPeopleData, getPeopleData, importPeopleData, loadPeopleData, resetPeopleData, savePeopleData } from "@/data/people-store";
import type { Person, Social } from "@/data/people";

const ADMIN_KEY = "katakulli-admin-session";
const ADMIN_PASSWORD = "katakulli2026";

const blankPerson = (kind: "cast" | "crew"): Person => ({
  slug: kind === "cast" ? "yeni-oyuncu" : "yeni-ekip-uyesi",
  name: kind === "cast" ? "Yeni Oyuncu" : "Yeni Ekip Üyesi",
  role: kind === "cast" ? "Karakter" : "Görev",
  short: "Kısa tanıtım metni.",
  bio: ["Biyografi metnini buraya yazın."],
  education: [],
  stage: [],
  other: [],
  katakulli: "Katakulli'deki rolü veya katkısı.",
  socials: [],
});

const linesToArray = (value: string) => value.split("\n").map((v) => v.trim()).filter(Boolean);
const arrayToLines = (value: string[]) => value.join("\n");

export function AdminPanel() {
  const [loggedIn, setLoggedIn] = useState(() => typeof window !== "undefined" && localStorage.getItem(ADMIN_KEY) === "1");
  const [password, setPassword] = useState("");
  const [kind, setKind] = useState<"cast" | "crew">("cast");
  const [data, setData] = useState(getPeopleData);
  const [selected, setSelected] = useState(0);
  const [message, setMessage] = useState("");

  useEffect(() => { loadPeopleData().then(setData).catch((error) => setMessage(error instanceof Error ? error.message : "Veriler yüklenemedi.")); }, []);

  const list = kind === "cast" ? data.cast : data.crew;
  const person = list[selected];

  const updatePerson = (patch: Partial<Person>) => {
    if (!person) return;
    const nextList = list.map((p, i) => (i === selected ? { ...p, ...patch } : p));
    const next = kind === "cast" ? { ...data, cast: nextList } : { ...data, crew: nextList };
    setData(next);
  };

  const persist = async () => {
    try {
      await savePeopleData(data);
      setMessage("Değişiklikler proje dosyasına kaydedildi. Site verisi artık kalıcıdır.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Kaydetme başarısız.");
      return;
    }
    setTimeout(() => setMessage(""), 3500);
  };

  const addPerson = () => {
    const nextPerson = blankPerson(kind);
    const next = kind === "cast" ? { ...data, cast: [...data.cast, nextPerson] } : { ...data, crew: [...data.crew, nextPerson] };
    setData(next);
    setSelected(list.length);
  };

  const deletePerson = () => {
    if (!person || !confirm(`${person.name} silinsin mi?`)) return;
    const nextList = list.filter((_, i) => i !== selected);
    const next = kind === "cast" ? { ...data, cast: nextList } : { ...data, crew: nextList };
    setData(next);
    setSelected(Math.max(0, selected - 1));
    void savePeopleData(next);
  };

  const uploadPhoto = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !person) return;

    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const response = await fetch("/api/upload-photo", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ slug: person.slug, dataUrl: String(reader.result) }),
        });
        const result = await response.json() as { ok?: boolean; path?: string; error?: string };
        if (!response.ok || !result.path) throw new Error(result.error ?? "Fotoğraf kaydedilemedi.");
        updatePerson({ photo: result.path });
        setMessage(`Fotoğraf dosyaya kaydedildi: public${result.path}`);
        setTimeout(() => setMessage(""), 5000);
      } catch (error) {
        setMessage(error instanceof Error ? error.message : "Fotoğraf yüklenemedi.");
      }
    };
    reader.readAsDataURL(file);
  };

  if (!loggedIn) {
    return (
      <main className="min-h-screen bg-background px-5 py-20 text-cream">
        <div className="mx-auto max-w-md rounded-2xl border border-border bg-card p-8 shadow-2xl">
          <p className="eyebrow">KATAKULLİ YÖNETİM</p>
          <h1 className="font-display mt-3 text-4xl">Yönetim Paneli</h1>
          <p className="mt-3 text-sm text-muted-foreground">Oyuncu ve yapım ekibi bilgilerini düzenleyin.</p>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={(e) => e.key === "Enter" && password === ADMIN_PASSWORD && (localStorage.setItem(ADMIN_KEY, "1"), setLoggedIn(true))} placeholder="Panel şifresi" className="mt-8 h-12 w-full rounded-xl border border-input bg-background px-4 outline-none focus:ring-2 focus:ring-gold" />
          <button onClick={() => { if (password === ADMIN_PASSWORD) { localStorage.setItem(ADMIN_KEY, "1"); setLoggedIn(true); } else alert("Şifre yanlış."); }} className="mt-4 inline-flex h-12 w-full items-center justify-center rounded-xl bg-primary font-semibold">Panele gir</button>
          <a href="/" className="mt-4 inline-flex w-full items-center justify-center gap-2 text-sm text-muted-foreground"><ArrowLeft className="h-4 w-4" /> Siteye dön</a>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background px-4 py-8 text-cream md:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 flex flex-col gap-4 border-b border-border pb-6 md:flex-row md:items-center md:justify-between">
          <div><p className="eyebrow">KATAKULLİ</p><h1 className="font-display mt-2 text-4xl">İçerik Yönetim Paneli</h1></div>
          <div className="flex flex-wrap gap-2">
            <button onClick={() => importPeopleData} className="hidden" />
            <label className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-lg border border-border px-4 text-sm"><Upload className="h-4 w-4" /> Veri içe aktar<input type="file" accept="application/json" className="hidden" onChange={async (e) => { const f = e.target.files?.[0]; if (!f) return; await importPeopleData(f); setData(getPeopleData()); setMessage("Veriler içe aktarıldı."); }} /></label>
            <button onClick={() => { exportPeopleData(); }} className="inline-flex h-10 items-center gap-2 rounded-lg border border-border px-4 text-sm"><Download className="h-4 w-4" /> Veriyi indir</button>
            <button onClick={() => { if (confirm("Varsayılan verilere dönülsün mü?")) { void resetPeopleData().then(() => { setData(getPeopleData()); setSelected(0); setMessage("Varsayılan veriler geri yüklendi."); }).catch((error) => setMessage(error instanceof Error ? error.message : "Sıfırlama başarısız.")); } }} className="inline-flex h-10 items-center gap-2 rounded-lg border border-border px-4 text-sm"><RotateCcw className="h-4 w-4" /> Sıfırla</button>
            <button onClick={() => { localStorage.removeItem(ADMIN_KEY); setLoggedIn(false); }} className="inline-flex h-10 items-center gap-2 rounded-lg border border-border px-4 text-sm"><LogOut className="h-4 w-4" /> Çıkış</button>
          </div>
        </header>

        {message && <div className="mb-6 rounded-xl border border-gold/30 bg-gold/10 px-4 py-3 text-sm text-gold">{message}</div>}

        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
          <aside className="rounded-2xl border border-border bg-card p-4">
            <div className="mb-4 grid grid-cols-2 rounded-xl bg-background p-1">
              <button onClick={() => { setKind("cast"); setSelected(0); }} className={`rounded-lg px-3 py-2 text-sm ${kind === "cast" ? "bg-primary text-cream" : "text-muted-foreground"}`}>Oyuncular</button>
              <button onClick={() => { setKind("crew"); setSelected(0); }} className={`rounded-lg px-3 py-2 text-sm ${kind === "crew" ? "bg-primary text-cream" : "text-muted-foreground"}`}>Ekip</button>
            </div>
            <button onClick={addPerson} className="mb-3 inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-gold/40 text-sm text-gold"><Plus className="h-4 w-4" /> Yeni kişi ekle</button>
            <div className="space-y-1">
              {list.map((p, i) => <button key={`${p.slug}-${i}`} onClick={() => setSelected(i)} className={`w-full rounded-lg px-3 py-3 text-left ${i === selected ? "bg-primary/30" : "hover:bg-background"}`}><div className="text-sm font-semibold">{p.name}</div><div className="text-xs text-muted-foreground">{p.role}</div></button>)}
            </div>
          </aside>

          {person ? <section className="rounded-2xl border border-border bg-card p-5 md:p-8">
            <div className="mb-6 flex items-center justify-between"><div><p className="eyebrow">{kind === "cast" ? "OYUNCU" : "YAPIM EKİBİ"}</p><h2 className="font-display mt-2 text-3xl">{person.name}</h2></div><div className="flex gap-2"><button onClick={deletePerson} className="inline-flex h-10 items-center gap-2 rounded-lg border border-destructive/40 px-3 text-sm text-destructive"><Trash2 className="h-4 w-4" /> Sil</button><button onClick={persist} className="inline-flex h-10 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold"><Save className="h-4 w-4" /> Kaydet</button></div></div>
            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Ad Soyad" value={person.name} onChange={(v) => updatePerson({ name: v })} />
              <Field label={kind === "cast" ? "Karakter" : "Görev"} value={person.role} onChange={(v) => updatePerson({ role: v })} />
              <Field label="URL slug" value={person.slug} onChange={(v) => updatePerson({ slug: v.toLowerCase().replace(/[^a-z0-9-çğıöşü]/gi, "-").replace(/-+/g, "-") })} hint={`/${kind === "cast" ? "oyuncular" : "ekip"}/${person.slug}`} />
              <div><label className="text-xs font-semibold tracking-wider text-gold uppercase">Fotoğraf</label><div className="mt-2 flex items-center gap-4"><div className="h-24 w-20 overflow-hidden rounded-lg bg-background">{person.photo && <img src={person.photo} className="h-full w-full object-cover" />}</div><label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-border px-4 py-3 text-sm"><ImagePlus className="h-4 w-4" /> Fotoğraf seç<input type="file" accept="image/*" className="hidden" onChange={uploadPhoto} /></label></div></div>
              <div className="md:col-span-2"><Field label="Kısa tanıtım" value={person.short} onChange={(v) => updatePerson({ short: v })} /></div>
              <TextArea label="Biyografi (her paragraf yeni satır)" value={arrayToLines(person.bio)} onChange={(v) => updatePerson({ bio: linesToArray(v) })} />
              <TextArea label="Eğitim (her satır bir madde)" value={arrayToLines(person.education)} onChange={(v) => updatePerson({ education: linesToArray(v) })} />
              <TextArea label={kind === "cast" ? "Sahne yolculuğu" : "Önceki çalışmalar"} value={arrayToLines(person.stage)} onChange={(v) => updatePerson({ stage: linesToArray(v) })} />
              <TextArea label="Diğer çalışmalar" value={arrayToLines(person.other)} onChange={(v) => updatePerson({ other: linesToArray(v) })} />
              <div className="md:col-span-2"><TextArea label="Katakulli'deki rolü / katkısı" value={person.katakulli} onChange={(v) => updatePerson({ katakulli: v })} /></div>
              <div className="md:col-span-2"><SocialEditor socials={person.socials} onChange={(socials) => updatePerson({ socials })} /></div>
            </div>
          </section> : <section className="rounded-2xl border border-border bg-card p-10 text-center text-muted-foreground">Henüz kişi yok. Yeni kişi ekleyin.</section>}
        </div>
      </div>
    </main>
  );
}

function Field({ label, value, onChange, hint }: { label: string; value: string; onChange: (v: string) => void; hint?: string }) {
  return <div><label className="text-xs font-semibold tracking-wider text-gold uppercase">{label}</label><input value={value} onChange={(e) => onChange(e.target.value)} className="mt-2 h-12 w-full rounded-xl border border-input bg-background px-4 outline-none focus:ring-2 focus:ring-gold" />{hint && <p className="mt-1 text-xs text-muted-foreground">QR/link adresi: {hint}</p>}</div>;
}
function TextArea({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return <div><label className="text-xs font-semibold tracking-wider text-gold uppercase">{label}</label><textarea value={value} onChange={(e) => onChange(e.target.value)} rows={6} className="mt-2 w-full rounded-xl border border-input bg-background p-4 leading-relaxed outline-none focus:ring-2 focus:ring-gold" /></div>;
}
function SocialEditor({ socials, onChange }: { socials: Social[]; onChange: (v: Social[]) => void }) {
  const [platform, setPlatform] = useState<Social["platform"]>("instagram");
  const [url, setUrl] = useState("");
  return <div><label className="text-xs font-semibold tracking-wider text-gold uppercase">Sosyal medya</label><div className="mt-2 space-y-2">{socials.map((s, i) => <div key={`${s.url}-${i}`} className="flex gap-2"><input value={s.platform} readOnly className="w-28 rounded-lg border border-input bg-background px-3 text-sm" /><input value={s.url} onChange={(e) => onChange(socials.map((x, j) => j === i ? { ...x, url: e.target.value } : x))} className="min-w-0 flex-1 rounded-lg border border-input bg-background px-3" /><button onClick={() => onChange(socials.filter((_, j) => j !== i))} className="rounded-lg border border-border px-3 text-sm">Sil</button></div>)}</div><div className="mt-3 flex flex-col gap-2 sm:flex-row"><select value={platform} onChange={(e) => setPlatform(e.target.value as Social["platform"])} className="rounded-lg border border-input bg-background px-3"><option value="instagram">Instagram</option><option value="youtube">YouTube</option><option value="x">X</option><option value="web">Web</option></select><input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://..." className="min-w-0 flex-1 rounded-lg border border-input bg-background px-3 py-2" /><button onClick={() => { if (!url) return; onChange([...socials, { platform, url }]); setUrl(""); }} className="rounded-lg border border-gold/40 px-4 text-sm text-gold">Ekle</button></div></div>;
}
