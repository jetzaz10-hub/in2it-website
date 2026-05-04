/**
 * Custom smooth scroll using requestAnimationFrame.
 * Prevents browser kinetic scroll from cancelling the animation.
 * First kills any ongoing momentum, then animates to target.
 */

let activeAnimation: number | null = null;

export function smoothScrollTo(targetY: number, duration: number = 800) {
  // Cancel any ongoing animation
  if (activeAnimation !== null) {
    cancelAnimationFrame(activeAnimation);
    activeAnimation = null;
  }

  // Kill any ongoing kinetic scroll momentum
  const startY = window.scrollY;
  window.scrollTo({ top: startY, behavior: "instant" });

  const distance = targetY - startY;

  // If distance is negligible, just jump
  if (Math.abs(distance) < 2) {
    window.scrollTo({ top: targetY, behavior: "instant" });
    return;
  }

  const startTime = performance.now();

  // Ease-out cubic: fast start, smooth deceleration
  function easeOutCubic(t: number): number {
    return 1 - Math.pow(1 - t, 3);
  }

  function step(currentTime: number) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = easeOutCubic(progress);
    
    const currentY = startY + distance * easedProgress;
    window.scrollTo({ top: currentY, behavior: "instant" });

    if (progress < 1) {
      activeAnimation = requestAnimationFrame(step);
    } else {
      activeAnimation = null;
    }
  }

  activeAnimation = requestAnimationFrame(step);
}
