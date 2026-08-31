import React from "react";
import { Image } from "@/components/ui/image";
import BackButton from "@/components/BackButton";
import { useSiteContent } from "@/lib/useSiteContent";

export default function PageBanner({ title, subtitle, image, eyebrow, accent = "blue", pageKey }) {
  const override = useSiteContent(pageKey);
  const finalTitle = override?.heading || title;
  const finalSubtitle = override?.subheading || subtitle;
  const finalImage = override?.image_url || image;

  return (
    <section className="relative w-full overflow-hidden" style={{ minHeight: "clamp(320px, 45vh, 480px)" }}>
      <div className="absolute inset-0">
        <Image
          src={finalImage}
          alt={finalTitle}
          fittingType="fill"
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, hsl(222 100% 22% / 0.88) 0%, hsl(222 100% 22% / 0.72) 50%, hsl(222 100% 22% / 0.55) 100%)",
          }}
        />
      </div>

      <div className="absolute top-5 left-6 lg:left-8 z-20">
        <BackButton variant="light" />
      </div>

      <div className="relative z-10 flex flex-col justify-end h-full max-w-7xl mx-auto px-6 lg:px-8 pb-12 md:pb-16 pt-32">
        {eyebrow && (
          <div className="text-sm font-semibold uppercase tracking-wider text-white/80 mb-3">
            {eyebrow}
          </div>
        )}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white leading-tight tracking-tight max-w-3xl">
          {finalTitle}
        </h1>
        {finalSubtitle && (
          <p className="mt-4 text-lg md:text-xl text-white/85 leading-relaxed max-w-2xl">
            {finalSubtitle}
          </p>
        )}
      </div>
    </section>
  );
}