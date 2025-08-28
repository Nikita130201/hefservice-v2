// src/app/faq/page.js
"use client";

import { useMemo, useState } from "react";
import Reveal from "@/components/Reveal"; // 👈 подключаем анимацию

// Данные FAQ
const FAQ = [
  { q: "Какой минимальный объём поставки?", a: "Обсуждается по стране и оператору. Ориентируемся на рыночную стоимость и логистику." },
  { q: "Как проверяются SIM?", a: "Все карты после получения вставляются в специальное оборудование («SIM-банк»). Выборочно небольшой процент (до 20%) тестируется. Если проверка успешна — оплата распространяется на всю партию." },
  { q: "Когда производится расчёт?", a: "После входной проверки SIM-карт представителем HEF Service. Гарантированное время расчёта — 24–48 часов после получения партии." },
  { q: "Какие операторы и страны подходят?", a: "Работаем практически со всеми операторами и странами. Конкретика — в диалоге; иногда есть ограничения." },
  { q: "Можно ли сдать б/у SIM-карты?", a: "Да, это возможно. Важно, чтобы карты регистрировались в сети, позволяли исходящие звонки/СМС и имели положительный баланс." },
  { q: "Что если карты окажутся заблокированными после старта?", a: "Ответственность за блокировку после начала использования в HEF Service лежит на нас. Это не влияет на ваш расчёт." },
  { q: "Есть ли комиссии?", a: "С нашей стороны комиссии нет (по умолчанию). Специальные каналы/платёжные системы обсуждаем отдельно." },
  { q: "В какой валюте можно получить оплату?", a: "Возможны RUB, USD, EUR, BYN, UAH и другие. Реквизиты и способ перевода согласуем при сделке." },
  { q: "Возможен ли эскроу?", a: "Да, при необходимости может быть проведена сделка через эскроу/гарантийный сервис. Расходы по таким сервисам — на стороне поставщика (если иное не согласовано)." },
  { q: "Как происходит логистика?", a: "Доставка и передача оговариваются отдельно. Если отправку карт оплачивает поставщик — возможен небольшой бонус по нашему усмотрению." },
];

export default function FaqPage() {
  const [query, setQuery] = useState("");
  const [openIdx, setOpenIdx] = useState(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return FAQ;
    return FAQ.filter(
      ({ q: title, a }) =>
        title.toLowerCase().includes(q) || a.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <section className="container mx-auto max-w-3xl px-4 py-10 md:py-14">
      {/* Заголовок */}
      <Reveal duration={900} distance={30} direction="up">
        <h1 className="text-center text-3xl font-semibold tracking-tight text-[#2b0d3a]">
          FAQ
        </h1>
        <p className="mt-2 text-center text-sm text-[var(--hef-dim)]">
          Частые вопросы о приёме и проверке SIM-карт, оплате и логистике.
        </p>
      </Reveal>

      {/* Поиск */}
      <Reveal duration={900} distance={30} direction="up" delay={150}>
        <div className="mt-5 relative">
          <input
            type="search"
            placeholder="Поиск по вопросам…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-xl border border-[var(--hef-border)] bg-white/70 px-4 py-3 pr-10 text-[15px] outline-none ring-0 placeholder:text-[var(--hef-dim)] focus:border-[var(--hef-accent)]"
          />
          <svg
            aria-hidden
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 opacity-50"
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5" />
            <path d="M20 20L17 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
      </Reveal>

      {/* Список вопросов */}
      <div className="mt-6 space-y-3">
        {filtered.map((item, i) => {
          const idx = FAQ.indexOf(item);
          const open = openIdx === idx;

          return (
            <Reveal
              key={idx}
              duration={1000}
              distance={300}
              direction={i % 2 === 0 ? "left" : "right"} // 👈 чередуем
              
            >
              <div className="rounded-xl border border-[var(--hef-border)] bg-white/80 backdrop-blur-sm">
                <button
                  className="flex w-full items-center gap-3 px-4 py-3 text-left"
                  onClick={() => setOpenIdx(open ? null : idx)}
                  aria-expanded={open}
                >
                  <span className="inline-flex h-6 min-w-6 select-none items-center justify-center rounded-full bg-[var(--hef-surface)] px-2 text-[12px] font-semibold text-[#2b0d3a] ring-1 ring-[var(--hef-border)]">
                    {idx + 1}
                  </span>

                  <span className="flex-1 text-[15px] font-medium text-[#2b0d3a]">
                    {item.q}
                  </span>

                  <svg
                    className={`h-4 w-4 shrink-0 transition-transform ${
                      open ? "rotate-180" : ""
                    }`}
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M6 9l6 6 6-6"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                <div
                  className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                    open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="min-h-0 overflow-hidden">
                    <div className="px-4 pb-3 text-[15px] leading-relaxed text-[var(--hef-dim)]">
                      {item.a}
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>

      {/* CTA-блок */}
      <Reveal duration={800} distance={200} direction="down" delay={filtered.length * 100 + 20}>
        <div className="mt-8 rounded-2xl border border-[var(--hef-border)] bg-[var(--hef-surface)]/70 p-4 text-center">
          <div className="text-[15px] font-medium text-[#2b0d3a]">
            Не нашли ответ на свой вопрос?
          </div>
          <p className="mt-1 text-sm text-[var(--hef-dim)]">
            Напишите нам — подскажем по срокам, логистике и требованиям к партиям.
          </p>

          <div className="mt-4 flex flex-col items-center gap-2 sm:flex-row sm:justify-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center rounded-xl bg-[var(--hef-accent)] px-4 py-2 text-sm font-medium text-white hover:opacity-90 transition"
            >
              Связаться с нами
            </a>
            <a
              href="/sell-sim"
              className="inline-flex items-center justify-center rounded-xl border border-[var(--hef-border)] bg-white px-4 py-2 text-sm font-medium text-[#2b0d3a] hover:bg-[var(--hef-surface)]/60 transition"
            >
              Предложить партию SIM
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}