"use client";
import { useEffect, useRef, useState } from "react";

/**
 * Универсальная обёртка для появления блока при скролле.
 *
 * Пропсы:
 * - direction: "up" | "down" | "left" | "right" | "none"   (направление смещения)
 * - distance:  число пикселей смещения (по умолч. 16)
 * - duration:  длительность в мс (по умолч. 800)
 * - delay:     задержка в мс (по умолч. 0)
 * - easing:    CSS timing function (по умолч. cubic-bezier(0.16,1,0.3,1))
 * - threshold: порог видимости IntersectionObserver (по умолч. 0.2)
 * - once:      показывать один раз или возвращать в скрытое состояние (по умолч. true)
 * - as:        тег-обёртка (div, section, li и т.п.) — по умолч. "div"
 */
export default function Reveal({
  children,
  className = "",
  direction = "up",
  distance = 16,
  duration = 800,
  delay = 0,
  easing = "cubic-bezier(0.16,1,0.3,1)",
  threshold = 0.2,
  once = true,
  as: Tag = "div",
}) {
  const ref = useRef(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShow(true);
            if (once) io.disconnect();
          } else if (!once) {
            setShow(false);
          }
        });
      },
      { threshold }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [threshold, once]);

  // стартовое смещение по направлению
  let translate = "translate3d(0,0,0)";
  if (!show) {
    if (direction === "up") translate = `translate3d(0, ${distance}px, 0)`;
    if (direction === "down") translate = `translate3d(0, -${distance}px, 0)`;
    if (direction === "left") translate = `translate3d(${distance}px, 0, 0)`;
    if (direction === "right") translate = `translate3d(-${distance}px, 0, 0)`;
  }

  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        opacity: show ? 1 : 0,
        transform: show ? "translate3d(0,0,0)" : translate,
        transitionProperty: "opacity, transform",
        transitionDuration: `${duration}ms`,
        transitionTimingFunction: easing,
        transitionDelay: `${delay}ms`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </Tag>
  );
}