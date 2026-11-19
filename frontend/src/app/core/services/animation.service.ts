import { Injectable } from '@angular/core';
import { animate } from 'animejs';

@Injectable({
  providedIn: 'root',
})
export class AnimationService {
  isReducedMotion(): boolean {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  animateEntrance(targets: HTMLElement | HTMLElement[]): void {
    if (this.isReducedMotion()) return;
    animate(targets, {
      opacity: [0, 1],
      translateY: [14, 0],
      duration: 450,
      ease: 'outQuad',
    });
  }

  animateCounter(element: HTMLElement, from: number, to: number, duration = 350): void {
    if (this.isReducedMotion()) {
      element.textContent = String(to);
      return;
    }
    const obj = { val: from };
    animate(obj, {
      val: to,
      duration,
      ease: 'outQuad',
      onUpdate: () => {
        element.textContent = String(Math.round(obj.val));
      },
    });
  }

  animateFeedItem(element: HTMLElement): void {
    if (this.isReducedMotion()) return;
    animate(element, {
      opacity: [0, 1],
      translateX: [10, 0],
      duration: 200,
      ease: 'outCubic',
    });
  }

  animateAlert(element: HTMLElement): void {
    if (this.isReducedMotion()) return;
    animate(element, {
      scale: [1, 1.04, 1],
      duration: 300,
      ease: 'outBack',
    });
  }
}
