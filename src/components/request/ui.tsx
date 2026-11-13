"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties, ElementType, HTMLAttributes, ReactNode } from "react";

const reducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Fades/slides children in the first time they scroll into view. */
export function Rv({
  as: Tag = "div",
  delay = 0,
  className = "",
  style,
  children,
  ...rest
}: {
  as?: ElementType;
  delay?: number;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
} & HTMLAttributes<HTMLElement>) {
  const ref = useRef<HTMLElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setOn(true);
          io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -6% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`rv ${on ? "in" : ""} ${className}`}
      style={{ "--d": `${delay}s`, ...style } as CSSProperties}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/** Counts from 0 up to `to` once it becomes visible. */
export function Count({ to, dec = 0 }: { to: number; dec?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [v, setV] = useState(0);

  useEffect(() => {
    if (reducedMotion()) {
      setV(to);
      return;
    }
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const tick = (t: number) => {
          const p = Math.min(1, (t - t0) / 1400);
          setV(to * (1 - Math.pow(1 - p, 3)));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to]);

  return <span ref={ref}>{v.toFixed(dec)}</span>;
}

/** Turns "92.9%", "<100 ms", "56B+", "~100" into an animated number with its prefix/suffix. */
export function MetricValue({ value }: { value: string }) {
  const m = value.match(/^([^\d]*)(\d+(?:\.\d+)?)(.*)$/);
  if (!m) return <>{value}</>;
  const [, prefix, num, suffix] = m;
  const dec = num.includes(".") ? num.split(".")[1].length : 0;
  const unit = suffix.trim();
  const isUnit = /^(ms|s)$/.test(unit);
  return (
    <>
      {prefix}
      <Count to={parseFloat(num)} dec={dec} />
      {isUnit ? <small> {unit}</small> : suffix}
    </>
  );
}

export function SunMoon({ dark }: { dark: boolean }) {
  return dark ? (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
    </svg>
  );
}
