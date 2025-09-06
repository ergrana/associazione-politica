// src/app/notizie/layout.tsx
export const metadata = {
  title: "Notizie — La Repubblica degli Italiani nel Mondo",
  description:
    "Comunicati, aggiornamenti e storie dal territorio. Le notizie ufficiali dell'associazione.",
};

export default function NotizieLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
