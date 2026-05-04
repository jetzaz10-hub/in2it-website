'use client';

import { cn } from '../../lib/utils';
import { ArrowRight, Code2, Copy, Rocket, Zap } from 'lucide-react';
import { useState } from 'react';

export interface CardFlipProps {
  title?: string;
  subtitle?: string;
  description?: string;
  features?: string[];
  color?: string;
  link?: string;
  imgSrc?: string;
  imgPosition?: string;
}

export default function CardFlip({
  title = 'Build MVPs Fast',
  subtitle = 'Launch your idea in record time',
  description = 'Copy, paste, customize—and launch your MVP faster than ever with our developer-first component library.',
  features = [
    'Copy & Paste Ready',
    'Developer-First',
    'MVP Optimized',
    'Zero Setup Required',
  ],
  color = '#ff2e88',
  link = '#',
  imgSrc,
  imgPosition = 'object-cover'
}: CardFlipProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      style={{
        ['--primary' as any]: color ?? '#2563eb',
      }}
      className="group relative h-[460px] w-full max-w-[360px] [perspective:2000px] mx-auto cursor-pointer"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      {/* Outer Glow Effect */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-[60px] z-0 pointer-events-none"
        style={{ backgroundColor: 'var(--primary)', opacity: 0.15 }}
      />

      <div
        className={cn(
          'relative h-full w-full',
          '[transform-style:preserve-3d]',
          'transition-all duration-700',
          isFlipped
            ? '[transform:rotateY(180deg)]'
            : '[transform:rotateY(0deg)]',
        )}
      >
        {/* Front of card */}
        <div
          className={cn(
            'absolute inset-0 h-full w-full',
            '[transform:rotateY(0deg)] [backface-visibility:hidden]',
            'overflow-hidden rounded-2xl',
            'bg-zinc-900/80 backdrop-blur-md',
            'border-2 border-white/20 group-hover:border-[var(--primary)]',
            'shadow-2xl transition-all duration-700',
            'group-hover:shadow-[0_0_50px_-10px_var(--primary)]',
            isFlipped ? 'opacity-0 invisible' : 'opacity-100 visible',
          )}
        >
          {/* FULL CARD Product Image */}
          {imgSrc && (
            <div className="absolute inset-0 z-0 h-full w-full">
              <img
                src={imgSrc}
                alt={title}
                className={cn("w-full h-full opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000 ease-out brightness-[1.1] group-hover:brightness-[1.2]", imgPosition)}
                draggable={false}
              />
              {/* Lighter Vignette for Text Clarity */}
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/60 via-transparent to-transparent" />
            </div>
          )}

          {/* Ambience / Highlighting */}
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/20 via-transparent to-blue-500/10 pointer-events-none z-10" />

          {/* Bottom content with ORIGINAL SCALE typography */}
          <div className="absolute right-0 bottom-0 left-0 p-8 z-30 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent">
            <div className="flex items-center justify-between gap-4">
              <div className="space-y-2">
                <h3 className="text-[26px] leading-tight font-bold tracking-tight text-white transition-all duration-500 ease-out group-hover:translate-y-[-4px]">
                  {title}
                </h3>
                <p className="line-clamp-2 text-base font-medium tracking-tight text-zinc-200 transition-all delay-[50ms] duration-500 ease-out group-hover:translate-y-[-4px]">
                  {subtitle}
                </p>
              </div>
              <div className="group/icon relative flex-shrink-0">
                <div className="absolute inset-[-12px] rounded-full transition-opacity duration-300 bg-gradient-to-br from-[var(--primary)]/30 via-[var(--primary)]/20 to-transparent opacity-0 group-hover/icon:opacity-100 blur-sm" />
                <Zap className="text-[var(--primary)] relative z-10 h-8 w-8 transition-all duration-300 group-hover/icon:scale-110 group-hover/icon:rotate-12 fill-[var(--primary)]/20" />
              </div>
            </div>
          </div>
        </div>

        {/* Back of card */}
        <div
          className={cn(
            'absolute inset-0 h-full w-full',
            '[transform:rotateY(180deg)] [backface-visibility:hidden]',
            'rounded-2xl p-8',
            'bg-zinc-900/95 backdrop-blur-2xl border-2 border-[var(--primary)]/50',
            'shadow-2xl flex flex-col',
            'transition-all duration-700',
            isFlipped ? 'opacity-100 visible' : 'opacity-0 invisible',
          )}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/20 via-transparent to-blue-500/15 pointer-events-none" />

          <div className="relative z-10 flex-1 space-y-8">
            <div className="space-y-4">
              <div className="mb-4 flex items-center gap-3">
                <div className="from-[var(--primary)] via-[var(--primary)]/90 to-[var(--primary)]/80 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br shadow-xl">
                  <Code2 className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-[24px] leading-snug font-bold tracking-tight text-white">
                  {title}
                </h3>
              </div>
              <p className="line-clamp-4 text-sm font-medium leading-relaxed tracking-tight text-zinc-300">
                {description}
              </p>
            </div>

            <div className="space-y-3.5">
              {features.map((feature, index) => {
                const icons = [Copy, Code2, Rocket, Zap];
                const IconComponent = icons[index % icons.length];

                return (
                  <div
                    key={feature}
                    className="flex items-center gap-4 text-sm font-semibold text-zinc-200 transition-all duration-500"
                    style={{
                      transform: isFlipped ? 'translateX(0)' : 'translateX(-15px)',
                      opacity: isFlipped ? 1 : 0,
                      transitionDelay: `${index * 100 + 200}ms`,
                    }}
                  >
                    <div className="bg-[var(--primary)]/20 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg border border-[var(--primary)]/30">
                      <IconComponent className="text-[var(--primary)] h-4 w-4" />
                    </div>
                    <span className="tracking-wide">{feature}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="relative z-10 mt-auto border-t border-white/20 pt-6">
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-sale-kit w-full group/start"
            >
              <span className="text-white font-bold">
                Sale Kits
              </span>
              <div className="group/icon relative">
                <div
                  className={cn(
                    'absolute inset-[-10px] rounded-full transition-all duration-300',
                    'bg-white/20 blur-md',
                    'scale-90 opacity-0 group-hover/start:scale-100 group-hover/start:opacity-100',
                  )}
                />
                <ArrowRight className="text-white relative z-10 h-6 w-6 transition-all duration-300 group-hover/start:translate-x-1 group-hover/start:scale-110" />
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
