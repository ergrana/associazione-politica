// src/app/page.tsx
import AboutScreen from "@/components/AboutScreen";

export const metadata = {
  title: "Città Futura — Chi siamo",
  description:
    "Città Futura: partecipazione, trasparenza, futuro. La home presenta chi siamo, missione, risultati e leadership.",
};

export default function Home() {
  return <AboutScreen />;
}
