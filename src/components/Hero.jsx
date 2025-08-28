// src/components/Hero.jsx
"use client";

import Image from "next/image";
import heroImg from "@/../public/preview/preview.png";
import Reveal from "@/components/Reveal";

export default function Hero() {
  return (
    <section
      className={[
        "relative",
        "min-h-[520px] md:min-h-[620px] lg:min-h-[680px]",
        "flex items-center",
      ].join(" ")}
    >
      {/* декоративный фон */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute right-[-8%] top-[-10%] h-[420px] w-[420px]
                     md:h-[520px] md:w-[520px] lg:h-[620px] lg:w-[620px]
                     rounded-full opacity-40 blur-3xl"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(125,211,252,.35), rgba(125,211,252,0) 60%)",
          }}
        />
      </div>

      <div className="mx-auto w-full max-w-6xl px-4">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          {/* ЛЕВАЯ — текст */}
          <Reveal direction="right" distance={300} >
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--hef-border)] bg-white/80 px-3 py-1 text-xs text-[var(--hef-dim)]">
                <span className="inline-block h-2 w-2 rounded-full bg-[var(--hef-accent)]" />
                Закупаем SIM. Быстрый расчёт.
              </div>

              <h1 className="mt-4 font-display text-4xl font-extrabold leading-tight md:text-5xl">
                Принимаем партии
                <br />
                SIM-карт из разных
                <br />
                регионов
              </h1>

              <p className="mt-3 max-w-xl text-[17px] leading-relaxed text-[var(--hef-dim)]">
                Проверка до 20% выборочно, оплата в течение 24–48 часов после входного теста.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="/sell-sim"
                  className="rounded-xl bg-[var(--hef-accent)] px-5 py-3 text-sm font-semibold text-white hover:opacity-90 transition"
                >
                  Продать SIM
                </a>
                <a
                  href="/faq"
                  className="rounded-xl border border-[var(--hef-border)] bg-white px-5 py-3 text-sm font-semibold hover:bg-[var(--hef-surface)]/70 transition"
                >
                  Частые вопросы
                </a>
              </div>
            </div>
          </Reveal>

          {/* ПРАВАЯ — картинка */}
          {/* ПРАВАЯ — картинка */}
          <Reveal direction="left" distance={300}>
            <div className="relative">
              <div
                className="relative mx-auto h-[360px] md:h-[480px] lg:h-[560px]
                           w-full max-w-[660px] rounded-3xl border border-[var(--hef-border)]
                           bg-white/90 shadow-[0_20px_60px_rgba(0,0,0,.08)] ring-1 ring-black/5 backdrop-blur
                           overflow-hidden"  /* важно: чтобы углы картинки не “выпирали” */
              >
                <div className="absolute inset-0 p-4 sm:p-6 md:p-8">
                  <Image
                    src={heroImg}
                    alt="Передача SIM за наличные — иллюстрация"
                    fill
                    priority
                    className="object-contain"
                    sizes="(max-width: 1024px) 90vw, 560px"
                  />
                </div>

                {/* мягкий ореол внутри рамки */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-[inherit]"
                  style={{
                    background:
                      "radial-gradient(ellipse at 70% 40%, rgba(125,211,252,.12), transparent 55%)",
                  }}
                />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

