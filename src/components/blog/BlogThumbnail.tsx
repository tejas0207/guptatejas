"use client";

interface BlogThumbnailProps {
  title: string;
  tags: string[];
  variant?: "card" | "hero";
  hideTitle?: boolean;
}

export function BlogThumbnail({ title, tags, variant = "card", hideTitle = false }: BlogThumbnailProps) {
  const isHero = variant === "hero";

  return (
    <div
      className={`relative overflow-hidden bg-surface ${
        isHero ? "aspect-[21/9]" : "aspect-[16/9]"
      }`}
    >
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-surface to-[#8B5CF6]/10" />

      {/* Grid pattern */}
      <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="thumb-grid" width="30" height="30" patternUnits="userSpaceOnUse">
            <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#thumb-grid)" />
      </svg>

      {/* Decorative circles */}
      <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-accent/10 blur-2xl" />
      <div className="absolute -left-8 -bottom-8 w-24 h-24 rounded-full bg-[#8B5CF6]/10 blur-2xl" />

      {/* Decorative AWS-style icons */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.06]">
        <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
      </div>

      {/* Content overlay (only if not hiding title) */}
      {!hideTitle && (
        <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-6">
          <div className="flex gap-2 mb-3">
            {(tags || []).slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded bg-accent/20 text-accent text-[10px] font-semibold font-mono uppercase tracking-wider"
              >
                {tag}
              </span>
            ))}
          </div>
          <h3
            className={`font-bold font-[family-name:var(--font-space-grotesk)] leading-tight ${
              isHero ? "text-xl md:text-2xl" : "text-sm md:text-base"
            }`}
          >
            {title}
          </h3>
        </div>
      )}
    </div>
  );
}
