// src/app/page.tsx
import AboutScreen from "@/components/AboutScreen";

export const metadata = {
  title: "Chi siamo — La Repubblica degli Italiani nel Mondo",
  description:
    "Città Futura: partecipazione, trasparenza, futuro. La home presenta chi siamo, missione, risultati e leadership.",
};

export default function Home() {
  return <AboutScreen />;
}
