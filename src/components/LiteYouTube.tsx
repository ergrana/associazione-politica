// components/LiteYouTube.tsx
"use client";
import Image from "next/image";
import { useState } from "react";

export default function LiteYouTube({ id }: { id: string }) {
  const [play, setPlay] = useState(false);
  const thumb = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
  return (
    <div className="relative w-full overflow-hidden rounded-2xl" style={{paddingTop:"56.25%"}}>
      {play ? (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`}
          title="Video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      ) : (
        <button
          onClick={() => setPlay(true)}
          className="absolute inset-0 w-full h-full group"
          aria-label="Riproduci video"
        >
          <Image src={thumb} alt="" fill className="object-cover" />
          <span className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition" />
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                           inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/90">
            ▶
          </span>
        </button>
      )}
    </div>
  );
}
