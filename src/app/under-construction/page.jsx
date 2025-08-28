// src/app/under-construction/page.jsx

export const metadata = {
  title: "Страница в разработке — HEF Service",
  description:
    "Раздел временно недоступен. Мы работаем над наполнением страницы.",
};

import Link from "next/link";

export default function UnderConstructionPage() {
  return (
    <section className="min-h-[60vh] flex flex-col items-center justify-center px-6 text-center">
      {/* Локальные стили для анимации часов */}
      <style>{`
        .uc-hourglass {
          position: relative;
          width: 56px;
          height: 56px;
          margin-bottom: 16px;
          transform: rotate(0deg);
          animation: uc-rotate 2.4s linear infinite;
        }
        .uc-hourglass:before, .uc-hourglass:after {
          content: "";
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          width: 36px;
          height: 36px;
          border: 3px solid rgba(43, 13, 58, 0.12); /* контур */
          border-radius: 50%;
          box-sizing: border-box;
        }
        .uc-hourglass:before {
          top: 0;
          border-bottom-color: transparent;
          clip-path: polygon(0 0, 100% 0, 50% 55%, 0 0);
        }
        .uc-hourglass:after {
          bottom: 0;
          border-top-color: transparent;
          clip-path: polygon(50% 45%, 100% 100%, 0 100%, 50% 45%);
        }

        /* струйка песка */
        .uc-stream {
          position: absolute;
          left: 50%;
          top: 19px;
          transform: translateX(-50%);
          width: 4px;
          height: 18px;
          background: #F4C64E;
          border-radius: 2px;
          opacity: 0.9;
          animation: uc-stream 1.2s ease-in-out infinite;
        }

        /* верхняя и нижняя «кучи» песка */
        .uc-sand-top, .uc-sand-bottom {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          width: 24px;
          height: 14px;
          background: #F4C64E;
          border-radius: 2px;
          opacity: 0.95;
        }
        .uc-sand-top {
          top: 11px;
          clip-path: polygon(0 0, 100% 0, 50% 100%, 0 0);
          animation: uc-top 2.4s linear infinite;
        }
        .uc-sand-bottom {
          bottom: 11px;
          clip-path: polygon(50% 0, 100% 0, 100% 100%, 0 100%, 0 0, 50% 0);
          transform-origin: 50% 100%;
          animation: uc-bottom 2.4s linear infinite;
        }

        @keyframes uc-rotate {
          0% { transform: rotate(0deg); }
          50% { transform: rotate(180deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes uc-stream {
          0%, 100% { height: 18px; opacity: 0.9; }
          50% { height: 4px; opacity: 0.4; }
        }
        @keyframes uc-top {
          0%   { transform: translateX(-50%) scaleY(1); opacity: 0.95; }
          50%  { transform: translateX(-50%) scaleY(0.2); opacity: 0.5; }
          100% { transform: translateX(-50%) scaleY(1); opacity: 0.95; }
        }
        @keyframes uc-bottom {
          0%   { transform: translateX(-50%) scaleY(0.2); opacity: 0.5; }
          50%  { transform: translateX(-50%) scaleY(1);   opacity: 0.95; }
          100% { transform: translateX(-50%) scaleY(0.2); opacity: 0.5; }
        }
      `}</style>

      {/* Иконка — песочные часы */}
      <div aria-hidden className="uc-hourglass">
        <span className="uc-stream" />
        <span className="uc-sand-top" />
        <span className="uc-sand-bottom" />
      </div>

      <h1 className="text-2xl md:text-3xl font-bold text-[#2b0d3a]">
        Страница в разработке
      </h1>
      <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-[var(--hef-dim)]">
        Этот раздел временно недоступен. Мы активно работаем над контентом и
        скоро всё появится.
      </p>

      <div className="mt-6 flex flex-col sm:flex-row gap-3">
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-lg px-4 py-2
                     bg-[var(--hef-accent)] text-white hover:opacity-90 transition"
        >
          На главную
        </Link>
        <Link
          href="/contact"
          className="inline-flex items-center justify-center rounded-lg px-4 py-2
                     border border-[var(--hef-border)]
                     text-[var(--hef-link)] hover:text-[var(--hef-accent)] transition"
        >
          Связаться с нами
        </Link>
      </div>
    </section>
  );
}