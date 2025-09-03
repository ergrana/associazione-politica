// src/app/notizie/layout.tsx
export const metadata = {
  title: "Notizie — Città Futura",
  description:
    "Comunicati, aggiornamenti e storie dal territorio. Le notizie ufficiali di Città Futura.",
};

export default function NotizieLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
