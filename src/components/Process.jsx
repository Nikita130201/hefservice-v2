"use client";

import { useEffect, useRef, useState } from "react";

const STEPS = [
  { title: "Свяжитесь с нами", text: "Оставьте заявку или напишите — согласуем детали и ответим на вопросы.", icon: "💬" },
  { title: "Оценка партии", text: "Быстро оценим: операторы, страна, объём, состояние SIM.", icon: "📊" },
  { title: "Отправка SIM", text: "Согласуем логистику: ТК по вашему выбору или наш забор.", icon: "🚚" },
  { title: "Оплата до 48 часов", text: "После проверки переводим деньги на карту/счёт в оговорённый срок.", icon: "💸" },
];

export default function Process({ steps = STEPS }) {
  const rootRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -15% 0px", threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={rootRef} className="shell my-12 md:my-16">
      <header className="mb-6 md:mb-10 text-center">
        <h2 className="text-2xl md:text-3xl font-display font-semibold tracking-tight">
          Процесс сотрудничества
        </h2>
        <p className="mt-2 text-[15px] text-[var(--hef-dim)]">
          Простая и быстрая схема сделки — всего четыре шага.
        </p>
      </header>

      {/* DESKTOP */}
      <div className="relative hidden md:block">
        <div className="absolute left-0 right-0 top-6 mx-4 h-[2px] bg-[var(--hef-border)] overflow-hidden" aria-hidden="true">
          <span
            className={`block h-full bg-[var(--hef-accent)] origin-left ${inView ? "animate-draw-line" : ""}`}
            style={{ animationDelay: "120ms" }}
          />
        </div>

        <ol className="grid grid-cols-4 gap-4">
          {steps.map((s, i) => (
            <li key={s.title} className="relative">
              <span
                className={[
                  "absolute -top-[18px] left-6 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full",
                  "bg-[#2b0d3a] text-white text-sm font-semibold shadow-md ring-4 ring-white",
                  inView ? "animate-pop" : "opacity-0"
                ].join(" ")}
                style={{ animationDelay: `${220 + i * 220}ms` }}
                aria-label={`Шаг ${i + 1}`}
              >
                {i + 1}
                <i
                  className={[
                    "absolute -right-2 -bottom-2 h-5 w-5 grid place-items-center rounded-full bg-[var(--hef-accent)] text-white text-[10px] shadow-md",
                    inView ? "animate-bounce-in" : "opacity-0"
                  ].join(" ")}
                  style={{ animationDelay: `${420 + i * 220}ms` }}
                  aria-hidden="true"
                >
                  ✓
                </i>
              </span>

              <div
                className={[
                  "group rounded-2xl border border-[var(--hef-border)] bg-white p-5 pl-16",
                  "transition-all hover:shadow-[0_10px_40px_rgba(0,0,0,.06)] hover:-translate-y-0.5",
                  inView ? "animate-fade-slide-up" : "opacity-0 translate-y-2"
                ].join(" ")}
                style={{ animationDelay: `${260 + i * 220}ms` }}
              >
                <div className="flex items-start gap-3">
                  <div className="text-xl select-none" aria-hidden="true">{s.icon}</div>
                  <div>
                    <h3 className="text-[16px] md:text-[17px] font-semibold">{s.title}</h3>
                    <p className="mt-1 text-[14.5px] text-[var(--hef-dim)]">{s.text}</p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>

      {/* MOBILE */}
      <div className="md:hidden">
        {/* больше «воздуха» слева, чтобы номера не налезали */}
        <ol className="relative ml-10 space-y-5">
          <div
            className={[
              "absolute left-1 top-2 bottom-2 w-px bg-[var(--hef-border)] overflow-hidden",
              inView ? "after:animate-draw-line-vert" : ""
            ].join(" ")}
            aria-hidden="true"
          />
          {steps.map((s, i) => (
            <li key={`m-${s.title}`} className="relative">
              <span
                className={[
                  "absolute -left-[28px] top-6 inline-flex h-8 w-8 items-center justify-center rounded-full",
                  "bg-[#2b0d3a] text-white text-xs font-semibold shadow ring-2 ring-white z-10",
                  inView ? "animate-pop" : "opacity-0"
                ].join(" ")}
                style={{ animationDelay: `${200 + i * 200}ms` }}
              >
                {i + 1}
              </span>

              <div
                className={[
                  "rounded-xl border border-[var(--hef-border)] bg-white p-4",
                  "relative z-0", // не даём кругу «вдавить» карточку
                  inView ? "animate-fade-slide-up" : "opacity-0 translate-y-2"
                ].join(" ")}
                style={{ animationDelay: `${250 + i * 200}ms` }}
              >
                <div className="flex items-start gap-3">
                  <div className="text-lg select-none" aria-hidden="true">{s.icon}</div>
                  <div>
                    <h3 className="text-[15.5px] font-semibold">{s.title}</h3>
                    <p className="mt-1 text-[14px] text-[var(--hef-dim)]">{s.text}</p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <style jsx>{`
        /* плавнее и медленнее */
        @keyframes fade-slide-up {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes pop {
          0% { opacity: 0; transform: scale(0.8); }
          65% { opacity: 1; transform: scale(1.06); }
          100% { transform: scale(1); }
        }
        @keyframes bounce-in {
          0% { opacity: 0; transform: scale(0.6) translateY(4px); }
          70% { opacity: 1; transform: scale(1.04) translateY(-1px); }
          100% { transform: scale(1) translateY(0); }
        }
        @keyframes draw-line {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
        @keyframes draw-line-vert {
          from { transform: scaleY(0); transform-origin: top; }
          to { transform: scaleY(1); transform-origin: top; }
        }

        .animate-fade-slide-up { animation: fade-slide-up .7s cubic-bezier(.22,.6,.2,1) both; }
        .animate-pop { animation: pop .6s cubic-bezier(.22,.6,.2,1) both; }
        .animate-bounce-in { animation: bounce-in .7s cubic-bezier(.22,.6,.2,1) both; }
        .animate-draw-line {
          animation: draw-line 1.4s cubic-bezier(.22,.9,.27,1) both;
          transform-origin: left;
        }
        .after\\:animate-draw-line-vert::after {
          content: "";
          position: absolute; inset: 0;
          background: var(--hef-accent);
          transform: scaleY(0);
          transform-origin: top;
          animation: draw-line-vert 1.4s cubic-bezier(.22,.9,.27,1) .12s both;
        }
      `}</style>
    </section>
  );
}