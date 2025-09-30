// src/app/notizie/[slug]/page.tsx
import { POSTS } from "@/lib/content";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

/* ------------------------------- STATIC ----------------------------------- */

export function generateStaticParams() {
  // genera tutte le pagine
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { slug } = params;
  const p = POSTS.find((x) => x.slug === slug);
  if (!p) return {};

  const title = `${p.title} — Notizie`;
  const description = p.excerpt ?? "";
  const url = `https://example.com/notizie/${p.slug}`; // ← aggiorna dominio

  return {
    title,
    description,
    openGraph: {
      type: "article",
      url,
      title,
      description,
      images: [
        {
          url: absoluteAsset(p.image),
          width: 1200,
          height: 630,
          alt: p.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [absoluteAsset(p.image)],
    },
  };
}

/* --------------------------------- PAGE ---------------------------------- */

export default function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const p = POSTS.find((x) => x.slug === slug);
  if (!p) return notFound();

  const pub = new Date(p.date);
  const pageUrl = `https://example.com/notizie/${p.slug}`; // ← aggiorna dominio

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: p.title,
    datePublished: pub.toISOString(),
    image: absoluteAsset(p.image),
    description: p.excerpt,
    mainEntityOfPage: pageUrl,
    author: { "@type": "Organization", name: "Città Futura" },
    publisher: {
      "@type": "Organization",
      name: "Città Futura",
      logo: { "@type": "ImageObject", url: "https://example.com/logo.png" }, // ← aggiorna
    },
  };

  return (
    <main className="min-h-screen bg-white">
      {/* SEO structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* HERO — stesso approccio degli eventi (altezza responsiva con clamp) */}
      <header className="relative">
        <div className="relative h-[clamp(16rem,45vh,42rem)] md:h-[clamp(24rem,50vh,48rem)] w-full overflow-hidden">
          <Image
            src={p.image}               // immagini locali in /public come per gli eventi
            alt={p.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <div className="absolute inset-x-0 bottom-0">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pb-10">
              {/* NASCONDI il badge se la categoria è "Trasparenza" */}
              {p.category && p.category !== "Trasparenza" && (
                <span className="inline-flex items-center gap-2 text-xs font-semibold text-violet-700 bg-white rounded-full px-3 py-1">
                  {p.category}
                </span>
              )}
              <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
                {p.title}
              </h1>
              <p className="mt-2 text-white/90">
                {formatDate(pub)} • {p.read}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Corpo */}
      <article className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10">
        {p.body ? (
          <Markdown>{p.body}</Markdown>
        ) : (
          <p className="text-slate-700">{p.excerpt}</p>
        )}

        {/* Share */}
        <div className="mt-12">
          <p className="text-sm font-medium text-slate-500 mb-3">
            Condividi la notizia
          </p>
          <div className="flex gap-4">
            {/* X / Twitter */}
            <a
              href={shareTwitter(pageUrl, p.title)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Condividi su X/Twitter"
              className="w-10 h-10 rounded-full bg-[#000000]/10 flex items-center justify-center transition group hover:bg-[#000000]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className="w-5 h-5" fill="currentColor">
                <path
                  className="text-black group-hover:text-white"
                  d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z"
                />
              </svg>
            </a>

            {/* Facebook */}
            <a
              href={shareFacebook(pageUrl)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Condividi su Facebook"
              className="w-10 h-10 rounded-full bg-[#1877F2]/10 flex items-center justify-center transition group hover:bg-[#1877F2]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className="w-5 h-5" fill="currentColor">
                <path
                  className="text-[#1877F2] group-hover:text-white"
                  d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951"
                />
              </svg>
            </a>

            {/* WhatsApp */}
            <a
              href={shareWhatsApp(pageUrl, p.title)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Condividi su WhatsApp"
              className="w-10 h-10 rounded-full bg-[#25D366]/10 flex items-center justify-center transition group hover:bg-[#25D366]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className="w-5 h-5" fill="currentColor">
                <path
                  className="text-[#25D366] group-hover:text-white"
                  d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"
                />
              </svg>
            </a>

            {/* Telegram */}
            <a
              href={shareTelegram(pageUrl, p.title)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Condividi su Telegram"
              className="w-10 h-10 rounded-full bg-[#0088cc]/10 flex items-center justify-center transition group hover:bg-[#0088cc]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className="w-5 h-5" fill="currentColor">
                <path
                  className="text-[#0088cc] group-hover:text-white"
                  d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.287 5.906q-1.168.486-4.666 2.01-.567.225-.595.442c-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294q.39.01.868-.32 3.269-2.206 3.374-2.23c.05-.012.12-.026.166.016s.042.12.037.141c-.03.129-1.227 1.241-1.846 1.817-.193.18-.33.307-.358.336a8 8 0 0 1-.188.186c-.38.366-.664.64.015 1.088.327.216.589.393.85.571.284.194.568.387.936.629q.14.092.27.187c.331.236.63.448.997.414.214-.02.435-.22.547-.82.265-1.417.786-4.486.906-5.751a1.4 1.4 0 0 0-.013-.315.34.34 0 0 0-.114-.217.53.53 0 0 0-.31-.093c-.3.005-.763.166-2.984 1.09"
                />
              </svg>
            </a>
          </div>
        </div>

        {/* Torna alle notizie */}
        <div className="mt-12">
          <Link
            href="/notizie"
            className="text-sm font-semibold text-violet-700 hover:underline"
          >
            ← Torna alle notizie
          </Link>
        </div>
      </article>
    </main>
  );
}

/* -------------------------------- HELPERS --------------------------------- */

function formatDate(d: Date) {
  return d.toLocaleDateString("it-IT", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function absoluteAsset(path: string) {
  // per i meta/social serve un URL assoluto
  if (/^https?:\/\//.test(path)) return path;
  return `https://example.com${path}`; // ← aggiorna dominio
}

function shareTwitter(url: string, text: string) {
  return `https://twitter.com/intent/tweet?url=${encodeURIComponent(
    url
  )}&text=${encodeURIComponent(text)}`;
}
function shareFacebook(url: string) {
  return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
}
function shareWhatsApp(url: string, text: string) {
  return `https://api.whatsapp.com/send?text=${encodeURIComponent(text + " " + url)}`;
}
function shareTelegram(url: string, text: string) {
  return `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
}

/* markdown-lite minimal */
function Markdown({ children }: { children: string }) {
  const html = (children ?? "")
    .replace(/^### (.*$)/gim, "<h3>$1</h3>")
    .replace(/^## (.*$)/gim, "<h2>$1</h2>")
    .replace(/^# (.*$)/gim, "<h1>$1</h1>")
    .replace(/\*\*(.*?)\*\*/gim, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/gim, "<em>$1</em>")
    .replace(/^\> (.*$)/gim, "<blockquote>$1</blockquote>")
    .replace(/^- (.*$)/gim, "<li>$1</li>")
    .replace(/\n\n/g, "</p><p>")
    .replace(/\n/g, "<br/>");
  return (
    <div
      className="prose prose-slate max-w-none"
      dangerouslySetInnerHTML={{ __html: `<p>${html}</p>` }}
    />
  );
}
