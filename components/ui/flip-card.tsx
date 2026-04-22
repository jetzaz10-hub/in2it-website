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
  imgSrc
}: CardFlipProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      style={{
        ['--primary' as any]: color ?? '#2563eb',
      }}
      className="group relative h-[420px] w-full max-w-[340px] [perspective:2000px] mx-auto"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
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
            'bg-zinc-950',
            'border border-white/10 group-hover:border-[var(--primary)]/30',
            'shadow-xl transition-all duration-700',
            isFlipped ? 'opacity-0 invisible' : 'opacity-100 visible',
          )}
        >
          {/* FULL CARD Product Image */}
          {imgSrc && (
            <div className="absolute inset-0 z-0 h-full w-full">
              <img 
                src={imgSrc} 
                alt={title} 
                className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-1000 ease-out" 
              />
              {/* Vignette for Text Clarity */}
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
            </div>
          )}

          {/* Ambience / Highlighting */}
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/10 via-transparent to-blue-500/5 pointer-events-none z-10" />

          {/* Bottom content with ORIGINAL SCALE typography */}
          <div className="absolute right-0 bottom-0 left-0 p-6 z-30 bg-gradient-to-t from-zinc-950 via-zinc-950/70 to-transparent">
            <div className="flex items-center justify-between gap-4">
              <div className="space-y-1.5">
                <h3 className="text-lg leading-snug font-semibold tracking-tight text-white transition-all duration-500 ease-out group-hover:translate-y-[-4px]">
                  {title}
                </h3>
                <p className="line-clamp-2 text-sm tracking-tight text-zinc-300 transition-all delay-[50ms] duration-500 ease-out group-hover:translate-y-[-4px]">
                  {subtitle}
                </p>
              </div>
              <div className="group/icon relative flex-shrink-0">
                <div className="absolute inset-[-8px] rounded-lg transition-opacity duration-300 bg-gradient-to-br from-[var(--primary)]/20 via-[var(--primary)]/10 to-transparent opacity-0 group-hover/icon:opacity-100" />
                <Zap className="text-[var(--primary)] relative z-10 h-5 w-5 transition-all duration-300 group-hover/icon:scale-110 group-hover/icon:rotate-12" />
              </div>
            </div>
          </div>
        </div>

        {/* Back of card */}
        <div
          className={cn(
            'absolute inset-0 h-full w-full',
            '[transform:rotateY(180deg)] [backface-visibility:hidden]',
            'rounded-2xl p-6',
            'bg-zinc-900 border border-white/10',
            'shadow-2xl flex flex-col',
            'transition-all duration-700',
            isFlipped ? 'opacity-100 visible' : 'opacity-0 invisible',
          )}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/10 via-transparent to-blue-500/10 pointer-events-none" />

          <div className="relative z-10 flex-1 space-y-6">
            <div className="space-y-3">
              <div className="mb-2 flex items-center gap-2">
                <div className="from-[var(--primary)] via-[var(--primary)]/90 to-[var(--primary)]/80 flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br shadow-lg">
                  <Code2 className="h-4 w-4 text-white" />
                </div>
                <h3 className="text-lg leading-snug font-semibold tracking-tight text-white transition-all duration-500 ease-out group-hover:translate-y-[-2px]">
                  {title}
                </h3>
              </div>
              <p className="line-clamp-3 text-xs tracking-tight text-zinc-400 transition-all duration-500 ease-out group-hover:translate-y-[-2px]">
                {description}
              </p>
            </div>

            <div className="space-y-2.5">
              {features.map((feature, index) => {
                const icons = [Copy, Code2, Rocket, Zap];
                const IconComponent = icons[index % icons.length];

                return (
                  <div
                    key={feature}
                    className="flex items-center gap-3 text-xs text-zinc-300 transition-all duration-500"
                    style={{
                      transform: isFlipped ? 'translateX(0)' : 'translateX(-10px)',
                      opacity: isFlipped ? 1 : 0,
                      transitionDelay: `${index * 100 + 200}ms`,
                    }}
                  >
                    <div className="bg-[var(--primary)]/10 dark:bg-[var(--primary)]/20 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md">
                      <IconComponent className="text-[var(--primary)] h-3 w-3" />
                    </div>
                    <span className="font-medium">{feature}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="relative z-10 mt-auto border-t border-white/10 pt-4">
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'group/start relative',
                'flex items-center justify-between',
                'rounded-lg p-2.5',
                'transition-all duration-300',
                'bg-zinc-800',
                'hover:from-[var(--primary)]/10 hover:via-[var(--primary)]/5 hover:to-transparent',
                'hover:scale-[1.02] hover:cursor-pointer',
                'hover:border-[var(--primary)]/20 border border-transparent',
              )}
            >
              <span className="group-hover/start:text-[var(--primary)] text-sm font-semibold text-white transition-colors duration-300">
                Sale Kits
              </span>
              <div className="group/icon relative">
                <div
                  className={cn(
                    'absolute inset-[-6px] rounded-lg transition-all duration-300',
                    'from-[var(--primary)]/20 via-[var(--primary)]/10 bg-gradient-to-br to-transparent',
                    'scale-90 opacity-0 group-hover/start:scale-100 group-hover/start:opacity-100',
                  )}
                />
                <ArrowRight className="text-[var(--primary)] relative z-10 h-5 w-5 transition-all duration-300 group-hover/start:translate-x-1 group-hover/start:scale-110" />
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
