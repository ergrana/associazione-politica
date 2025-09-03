import { POSTS } from "@/lib/content";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

// In Next 15 i params sono async: tipizziamo come Promise e facciamo await
export async function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = POSTS.find((p) => p.slug === slug);
  if (!post) return {};
  const title = `${post.title} — Città Futura`;
  const description = post.excerpt;
  const url = `https://example.com/notizie/${post.slug}`; // ← aggiorna dominio al deploy
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      url,
      images: [{ url: post.image, width: 1200, height: 630, alt: post.title }],
    },
    twitter: { card: "summary_large_image", title, description, images: [post.image] },
  };
}

export default async function NotiziaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = POSTS.find((p) => p.slug === slug);
  if (!post) return notFound();

  return (
    <main className="min-h-screen">
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-indigo-600 via-indigo-500 to-amber-500 opacity-90" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-white">
          <div className="inline-flex items-center gap-3 text-sm">
            <span className="inline-flex rounded-full bg-white/20 px-2.5 py-1 font-medium">
              {post.category}
            </span>
            <span className="opacity-90">{fmtDate(post.date)}</span>
            <span className="opacity-90">• {post.read}</span>
          </div>
          <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight">
            {post.title}
          </h1>
          <p className="mt-3 max-w-2xl text-white/90">{post.excerpt}</p>
        </div>
      </header>

      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 prose prose-slate">
        <Image
          src={post.image}
          alt={post.title}
          width={1600}
          height={900}
          className="rounded-2xl border w-full h-auto"
          priority
        />
        <div className="not-prose mt-6 text-sm text-slate-500">
          {fmtDate(post.date)} — {post.read}
        </div>
        <section className="mt-4">
          <Markdown>{post.body || "Contenuto in aggiornamento."}</Markdown>
        </section>

        <hr className="my-8" />
        {/* Condivisione: solo link (niente onClick in Server Component) */}
        <div className="not-prose flex flex-wrap items-center gap-3">
          <ShareLinks urlPath={`/notizie/${post.slug}`} title={post.title} />
          <Link href="/notizie" className="ml-auto text-sm font-semibold text-indigo-700">
            ← Torna a Notizie
          </Link>
        </div>
      </article>
    </main>
  );
}

/* ----- Helpers ----- */
function fmtDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("it-IT", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });
}

// mini-renderer markdown (safe subset, niente html) senza dipendenze
function Markdown({ children }: { children: string }) {
  const html = children
    .replace(/^### (.*$)/gim, "<h3>$1</h3>")
    .replace(/^## (.*$)/gim, "<h2>$1</h2>")
    .replace(/^# (.*$)/gim, "<h1>$1</h1>")
    .replace(/\*\*(.*?)\*\*/gim, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/gim, "<em>$1</em>")
    .replace(/^- (.*$)/gim, "<li>$1</li>")
    .replace(/\n\n/g, "</p><p>")
    .replace(/\n/g, "<br/>");
  return <div dangerouslySetInnerHTML={{ __html: `<p>${html}</p>` }} />;
}

function ShareLinks({ urlPath, title }: { urlPath: string; title: string }) {
  const site = "https://example.com"; // ← sostituisci al deploy
  const url = encodeURIComponent(`${site}${urlPath}`);
  const text = encodeURIComponent(title);
  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="text-slate-600">Condividi:</span>
      <a className="underline" href={`https://t.me/share/url?url=${url}&text=${text}`}>
        Telegram
      </a>
      <a className="underline" href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}>
        Facebook
      </a>
      <a className="underline" href={`https://twitter.com/intent/tweet?url=${url}&text=${text}`}>
        X
      </a>
    </div>
  );
}
