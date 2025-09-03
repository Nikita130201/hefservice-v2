"use client";

import Link from "next/link";
import Reveal from "@/components/Reveal";

const isExternalHref = (href = "") =>
  /^https?:\/\//i.test(href) || /^mailto:/i.test(href) || /^tel:/i.test(href);

function ContactCard({
  icon,
  title,
  children,
  href,
  cta,
  target,
  delay = 0,
  color,
  className = "",
}) {
  const external = href && isExternalHref(href);
  const Wrapper = href ? (external ? "a" : Link) : "div";
  const wrapperProps = href
    ? external
      ? { href, target: target || "_blank", rel: "noopener noreferrer" }
      : { href, prefetch: false }
    : {};

  return (
    <Reveal delay={delay} className="h-full" once>
      <Wrapper
        {...wrapperProps}
        className={[
          // 👇 фиксирующая «рамка» ширины каждого айтема
          "w-full max-w-[480px] sm:max-w-[520px]",
          "relative overflow-hidden block h-full rounded-2xl border bg-white/90 p-5",
          "border-[var(--hef-border)] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
          "hover:-translate-y-[2px] hover:shadow-[0_12px_44px_rgba(0,0,0,.12)]",
          "focus:outline-none focus:ring-2 focus:ring-[var(--hef-accent)]/40",
          className,
        ].join(" ")}
      >
        <span
          aria-hidden
          className="absolute -top-14 -right-14 h-40 w-40 rounded-full opacity-40"
          style={{
            background: `radial-gradient(ellipse at center, ${color}, transparent 70%)`,
          }}
        />
        <div className="flex items-start gap-4 relative z-10">
          <div className="shrink-0 grid place-items-center h-10 w-10 rounded-xl bg-[var(--hef-surface)] ring-1 ring-[var(--hef-border)]">
            <span className="text-xl" aria-hidden>
              {icon}
            </span>
          </div>
          <div className="min-w-0">
            <div className="font-semibold text-[17px] leading-snug">{title}</div>
            <div className="mt-1 text-[15px] leading-relaxed text-[var(--hef-dim)]">
              {children}
            </div>
            {cta && (
              <div className="mt-3 inline-flex h-9 items-center gap-1 rounded-lg px-3 font-semibold text-[14px] text-[var(--hef-accent)] ring-1 ring-[var(--hef-border)]/60 bg-white hover:bg-[var(--hef-surface)]/60 transition-colors">
                {cta}
                <svg
                  className="h-4 w-4 opacity-70 transition-transform group-hover:translate-x-0.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden
                >
                  <path
                    d="M8 5l8 7-8 7"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            )}
          </div>
        </div>
      </Wrapper>
    </Reveal>
  );
}

export default function ContactContent() {
  return (
    <section className="shell my-10 md:my-14">
      {/* Шапка */}
      <Reveal once>
        <header className="mb-6 md:mb-8">
          <h1 className="text-3xl md:text-4xl font-display font-semibold tracking-tight">
            Контакты для вендоров
          </h1>
          <p className="mt-2 text-[15px] text-[var(--hef-dim)]">
            Связь по поставкам SIM, условиям и выплатам. Клиентам советуем перейти
            на основной сайт HEF Service.
          </p>
          <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-[var(--hef-border)] bg-[var(--hef-surface)] px-3 py-1 text-xs">
            <span className="inline-block h-2 w-2 rounded-full bg-[var(--hef-accent)]" />
            Только для поставщиков SIM-карт
          </div>
        </header>
      </Reveal>

      {/* ВЕРХНИЕ КАРТОЧКИ */}
      <div className="mx-auto w-full lg:max-w-[1200px] xl:max-w-[1240px] 2xl:max-w-[1280px]">
        <div
          className={[
            "grid gap-4 items-stretch",
            "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
            // 👇 центрируем ряды, чтобы айтемы не «растягивались» строкой
            "justify-center",
          ].join(" ")}
        >
          <ContactCard
            icon="💬"
            title="Telegram (оперативно)"
            href="https://t.me/HefserviceSIM"
            cta="Написать в Telegram"
            color="rgba(59,130,246,.45)"
            className="h-full"
          >
            Быстрые ответы по сделкам, согласование условий и статусов. Рабочие
            часы: 10:00–20:00 (UTC+3).
          </ContactCard>

          <ContactCard
            icon="📢"
            title="Telegram-канал для вендоров"
            href="https://t.me/your_vendor_news"
            cta="Подписаться на обновления"
            color="rgba(168,85,247,.45)"
            className="h-full"
          >
            Апдейты по ценам, требованиям операторов и логистике. Рекомендуем
            подписаться.
          </ContactCard>

          <ContactCard
            icon="✉️"
            title="E-mail для заявок"
            href="mailto:sim@hefservice.com"
            cta="Отправить письмо"
            color="rgba(34,197,94,.45)"
            className="h-full"
          >
            sim@hefservice.com
            <br />
            Присылайте кратко: страна, оператор(ы), объём партии, ориентировочные сроки.
          </ContactCard>
        </div>
      </div>

     {/* Нижние панели */}
<div className="mt-8 grid gap-4 md:grid-cols-2 max-w-4xl mx-auto">
  <Reveal delay={100} once>
    <div className="relative overflow-hidden rounded-2xl border border-[var(--hef-border)] bg-white/90 p-5 transition duration-700 hover:-translate-y-[2px] hover:shadow-[0_12px_44px_rgba(0,0,0,.12)] h-full">
      <span
        aria-hidden
        className="absolute -top-14 -left-14 h-40 w-40 rounded-full opacity-35"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(168,85,247,.45), rgba(168,85,247,0) 70%)",
        }}
      />
      <div className="relative z-10">
        <div className="text-[17px] font-semibold">Готовы к сделке?</div>
        <p className="mt-1 text-[15px] text-[var(--hef-dim)]">
          Заполните короткую форму, мы свяжемся в течение рабочего дня.
        </p>
        <Link
          href="/sell-sim"
          prefetch={false}
          className="mt-3 inline-flex h-11 items-center justify-center rounded-xl bg-[var(--hef-accent)] px-5 font-semibold text-white hover:opacity-90 transition"
        >
          Заполнить форму
        </Link>
      </div>
    </div>
  </Reveal>

  <Reveal delay={250} once>
    <div className="relative overflow-hidden rounded-2xl border border-[var(--hef-border)] bg-white/90 p-5 transition duration-700 hover:-translate-y-[2px] hover:shadow-[0_12px_44px_rgba(0,0,0,.12)] h-full">
      <span
        aria-hidden
        className="absolute -bottom-14 -right-14 h-40 w-40 rounded-full opacity-35"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(34,197,94,.45), rgba(34,197,94,0) 70%)",
        }}
      />
      <div className="relative z-10">
        <div className="text-[17px] font-semibold">Вопросы по условиям?</div>
        <p className="mt-1 text-[15px] text-[var(--hef-dim)]">
          Краткие правила — на странице «Условия». Подробная версия доступна по ссылке.
        </p>
        <div className="mt-3 flex gap-2 flex-wrap">
          <Link
            href="/terms"
            prefetch={false}
            className="inline-flex h-11 items-center justify-center rounded-xl border border-[var(--hef-border)] bg-white px-5 font-semibold hover:bg-[var(--hef-surface)] transition"
          >
            Условия
          </Link>
          <a
            href="http://buysim.hefservice.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center justify-center rounded-xl border border-[var(--hef-border)] bg-white px-5 font-semibold hover:bg-[var(--hef-surface)] transition"
          >
            Полная версия
          </a>
        </div>
      </div>
    </div>
  </Reveal>
</div>


      {/* Важно */}
      <Reveal delay={200} once>
        <div className="mt-8 mx-auto w-full lg:max-w-[1200px] xl:max-w-[1240px] 2xl:max-w-[1280px]">
          <div className="rounded-2xl border border-[var(--hef-border)] bg-[var(--hef-surface)]/70 p-4 text-[13px] text-[var(--hef-dim)] transition duration-700">
            <b>Важно.</b> Этот раздел предназначен для поставщиков SIM-карт. Для клиентских услуг по связи
            используйте основной сайт HEF Service.
          </div>
        </div>
      </Reveal>
    </section>
  );
}