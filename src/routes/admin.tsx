import { createFileRoute } from "@tanstack/react-router";
import { AdminPanel } from "@/components/admin/AdminPanel";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Yönetim Paneli — Katakulli" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: AdminPanel,
});
