import { QRCodeSVG } from "qrcode.react";
import { Check, Copy, QrCode, Share2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export function QrShare({ name }: { name: string }) {
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [canShare, setCanShare] = useState(false);

  useEffect(() => {
    setUrl(window.location.href);
    setCanShare(typeof navigator !== "undefined" && !!navigator.share);
  }, []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* ignore */
    }
  };

  const share = async () => {
    try {
      await navigator.share({ title: `${name} — Katakulli`, url });
    } catch {
      /* cancelled */
    }
  };

  return (
    <>
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex h-12 items-center gap-2 rounded-full border border-gold/50 px-5 text-sm font-semibold tracking-wide text-gold transition-colors hover:bg-gold hover:text-accent-foreground"
        >
          <QrCode className="h-4 w-4" />
          Bu sayfanın QR kodunu paylaş
        </button>
        {canShare && (
          <button
            type="button"
            onClick={share}
            className="inline-flex h-12 items-center gap-2 rounded-full border border-border px-5 text-sm font-semibold text-cream/80 transition-colors hover:border-gold hover:text-gold"
          >
            <Share2 className="h-4 w-4" />
            Paylaş
          </button>
        )}
      </div>

      {open && typeof document !== "undefined" && createPortal(
        <div
          role="dialog"
          aria-modal="true"
          aria-label="QR kod"
          className="fixed inset-0 z-[60] grid place-items-end bg-background/80 p-4 backdrop-blur-sm sm:place-items-center"
          onClick={() => setOpen(false)}
        >
          <div
            className="reveal w-full max-w-sm rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="eyebrow">QR Kod</p>
                <h3 className="font-display mt-1 text-2xl text-cream">{name}</h3>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Kapat"
                className="grid h-10 w-10 place-items-center rounded-full border border-border text-cream/70 hover:text-gold"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mx-auto mt-6 w-fit rounded-xl bg-cream p-4">
              {url && (
                <QRCodeSVG
                  value={url}
                  size={208}
                  level="M"
                  bgColor="transparent"
                  fgColor="#1a0f10"
                  marginSize={0}
                />
              )}
            </div>

            <p className="mt-5 truncate rounded-md bg-muted px-3 py-2 text-center font-mono text-xs text-muted-foreground">
              {url}
            </p>

            <button
              type="button"
              onClick={copy}
              className="mt-4 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copied ? "Bağlantı kopyalandı" : "Bağlantıyı kopyala"}
            </button>
          </div>
        </div>,
        document.body,
      )}
    </>
  );
}
