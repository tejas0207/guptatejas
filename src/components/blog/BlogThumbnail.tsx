"use client";

import Image from "next/image";

interface BlogThumbnailProps {
  title: string;
  tags: string[];
  thumbnail?: string;
  variant?: "card" | "hero";
  hideTitle?: boolean;
}

export function BlogThumbnail({ title, tags, thumbnail, variant = "card", hideTitle = false }: BlogThumbnailProps) {
  const isHero = variant === "hero";

  return (
    <div className={`relative overflow-hidden bg-surface ${isHero ? "aspect-[16/7]" : "aspect-[16/9]"}`}>
      {thumbnail ? (
        <Image
          src={thumbnail}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      ) : (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-surface to-[#8B5CF6]/10" />
          <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-accent/10 blur-2xl" />
          <div className="absolute -left-8 -bottom-8 w-24 h-24 rounded-full bg-[#8B5CF6]/10 blur-2xl" />
        </>
      )}

      {/* Subtle dark overlay so text is always readable */}
      {!hideTitle && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      )}

      {!hideTitle && (
        <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-6">
          <div className="flex gap-2 mb-3">
            {(tags || []).slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded bg-accent/20 text-accent text-[10px] font-semibold font-mono uppercase tracking-wider backdrop-blur-sm"
              >
                {tag}
              </span>
            ))}
          </div>
          <h3 className={`font-bold font-[family-name:var(--font-space-grotesk)] leading-tight text-white ${isHero ? "text-xl md:text-2xl" : "text-sm md:text-base"}`}>
            {title}
          </h3>
        </div>
      )}
    </div>
  );
}
