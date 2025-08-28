"use client";
import Reveal from "@/components/Reveal";

export default function Advantages() {
  const items = [
    { icon: "🚚", title: "100% доставка за наш счёт", text: "Если по SIM возникли вопросы — логистику в обе стороны оплачиваем мы, в рамках условий сделки." },
    { icon: "🪪", title: "Берём на себя регистрацию", text: "Оформляем SIM через Госуслуги. Примем и уже зарегистрированные — либо предоставим данные для оформления." },
    { icon: "💸", title: "Удобная и быстрая оплата", text: "Рубли или криптовалюта (USDT). Выплаты своевременно и в полном объёме — без задержек." },
    { icon: "📈", title: "Регулярные крупные закупки", text: "Покупаем партиями на постоянной основе. За 2024 год вендорам выплачено свыше 20 млн ₽." },
    { icon: "⚡", title: "Проверка и расчёт до 48 часов", text: "Тестируем выборочно до 20% партии. Если тест пройден — оплачиваем всю поставку." },
    { icon: "🔒", title: "Прозрачные условия", text: "Все параметры сделки фиксируются заранее. Никаких сюрпризов по факту." },
  ];

  return (
    <section className="shell my-12 md:my-16">
      <Reveal>
        <header className="mb-6 md:mb-8">
          <h2 className="text-2xl md:text-3xl font-display font-semibold tracking-tight">
            Наши преимущества
          </h2>
          <p className="mt-2 text-[15px] text-[var(--hef-dim)]">
            Коротко о том, почему с нами удобно и безопасно сотрудничать.
          </p>
        </header>
      </Reveal>

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((it, i) => (
          <Reveal key={it.title} className="h-full" >
            <li className="group h-full rounded-2xl border border-[var(--hef-border)] bg-white p-5 transition hover:shadow-[0_8px_40px_rgba(0,0,0,.06)]">
              <div className="flex items-start gap-3">
                <div className="text-2xl leading-none select-none">{it.icon}</div>
                <div>
                  <h3 className="text-[17px] font-semibold">{it.title}</h3>
                  <p className="mt-1 text-[15px] text-[var(--hef-dim)]">{it.text}</p>
                </div>
              </div>
            </li>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}