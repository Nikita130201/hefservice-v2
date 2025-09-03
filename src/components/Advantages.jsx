// src/components/Advantages.js
"use client";

const items = [
  {
    icon: "🚚",
    title: "100% доставка за наш счёт",
    text: "Если по SIM возникли вопросы — логистику в обе стороны оплачиваем мы, в рамках условий сделки.",
    glow: "rgba(59,130,246,.22)", // синий
  },
  {
    icon: "🧾",
    title: "Берём на себя регистрацию",
    text: "Оформляем SIM через Госуслуги. Прием и уже зарегистрированные — либо предоставим данные для оформления.",
    glow: "rgba(168,85,247,.22)", // фиолетовый
  },
  {
    icon: "⚡️",
    title: "Удобная и быстрая оплата",
    text: "Рубли или криптовалюта (USDT). Выплаты своевременно и в полном объёме — без задержек.",
    glow: "rgba(34,197,94,.22)", // зелёный
  },
  {
    icon: "📈",
    title: "Регулярные крупные закупки",
    text: "Покупаем партиями на постоянной основе. За 2024 год вендорам выплачено свыше 20 млн ₽.",
    glow: "rgba(250,204,21,.22)", // жёлтый
  },
  {
    icon: "🧪",
    title: "Проверка и расчёт до 48 часов",
    text: "Тестируем выборочно до 20% партии. Если тест пройден — оплачиваем всю поставку.",
    glow: "rgba(59,130,246,.22)",
  },
  {
    icon: "🔒",
    title: "Прозрачные условия",
    text: "Все параметры сделки фиксируются заранее. Никаких сюрпризов по факту.",
    glow: "rgba(168,85,247,.22)",
  },
];

export default function Advantages() {
  return (
    <section className="shell my-10 md:my-14">
      <header className="mb-4 md:mb-6">
        <h2 className="text-2xl md:text-3xl font-display font-semibold tracking-tight">
          Наши преимущества
        </h2>
        <p className="mt-2 text-[15px] text-[var(--hef-dim)]">
          Коротко о том, почему с нами удобно и безопасно сотрудничать.
        </p>
      </header>

      {/* 1 / 2 / 3 колонки. Никакого 4-го ряда на ультрашироких — фиксимся на 3. */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {items.map((card, i) => (
          <AdvCard key={i} {...card} />
        ))}
      </div>
    </section>
  );
}

function AdvCard({ icon, title, text, glow }) {
  return (
    <div
      className={[
        "group relative h-full min-h-[140px] overflow-hidden rounded-2xl",
        "border border-[var(--hef-border)] bg-white/90 p-4 sm:p-5",
        "transition-all duration-500 ease-[cubic-bezier(.16,1,.3,1)]",
        "shadow-[0_6px_24px_rgba(0,0,0,.05)]",
        "hover:-translate-y-0.5 hover:shadow-[0_12px_44px_rgba(0,0,0,.12)]",
        "focus-within:-translate-y-0.5 focus-within:shadow-[0_12px_44px_rgba(0,0,0,.12)]",
      ].join(" ")}
    >
      {/* Мягкий ореол в углу */}
      <span
        aria-hidden
        className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full opacity-60 transition-transform duration-500 group-hover:scale-110"
        style={{
          background: `radial-gradient(ellipse at center, ${glow}, rgba(255,255,255,0) 70%)`,
        }}
      />

      <div className="relative z-10 flex h-full flex-col">
        <div className="mb-2 flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-[var(--hef-surface)] ring-1 ring-[var(--hef-border)] text-lg">
            {icon}
          </span>
          <h3 className="text-[16px] font-semibold leading-snug">{title}</h3>
        </div>

        <p className="mt-1 text-[14px] leading-relaxed text-[var(--hef-dim)]">
          {text}
        </p>

        {/* Индикаторная линия */}
        <span className="mt-3 h-[2px] w-12 rounded-full bg-[var(--hef-surface)] transition-all duration-500 group-hover:w-20 group-hover:bg-[var(--hef-accent)]/70" />
      </div>
    </div>
  );
}