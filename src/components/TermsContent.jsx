// src/app/terms/page.js
import Reveal from "@/components/Reveal";

export const metadata = {
  title: "Условия — HEF Service",
  description:
    "Краткие условия закупки SIM-карт для поставщиков. Полная редакция доступна ниже.",
};

export default function TermsPage() {
  return (
    <main className="relative">
      {/* фон — лёгкий градиент сверху (без styled-jsx) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-10 h-64"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 0%, rgba(124,58,237,0.08) 0%, rgba(59,130,246,0.06) 30%, rgba(255,255,255,0) 70%)",
        }}
      />

      <section className="max-w-6xl mx-auto px-4 py-12 md:py-14">
        {/* Заголовок */}
        <header className="text-center mb-8 md:mb-10">
          <Reveal>
            <h1 className="font-display text-3xl md:text-5xl font-extrabold tracking-tight">
              Условия HEF Service
            </h1>
          </Reveal>
          <Reveal delay={100}>
            <p className="mt-3 text-[15px] md:text-[16px] text-[var(--hef-dim)]">
              Ниже — краткие условия закупки SIM-карт для поставщиков. Полную
              редакцию можно открыть по ссылке внизу страницы.
            </p>
          </Reveal>
        </header>

        {/* Карточки условий */}
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3 mb-8">
          <Reveal>
            <Card
              title="Проверка и расчёт"
              text="Оплата производится в течение до 48 часов после входной проверки SIM-карт на стороне HEF Service."
            />
          </Reveal>

          <Reveal delay={80}>
            <Card
              title="Тестирование партии"
              text="Карты по получению ставятся в «SIM-банк». Выборочно проверяется до 20% партии — если тест пройден, партия считается рабочей и подлежит оплате."
            />
          </Reveal>

          <Reveal delay={160}>
            <Card
              title="Ответственность за блокировки"
              text="Если карта заблокирована оператором связи после начала использования в HEF Service, ответственность лежит на HEF Service."
            />
          </Reveal>

          <Reveal delay={240}>
            <Card
              title="Без комиссии"
              text="Мы не удерживаем комиссию (не по курсам, если иные условия не оговорены)."
            />
          </Reveal>

          <Reveal delay={320}>
            <Card
              title="Оплата и валюты"
              text="Возможна выплата в популярных валютах и способах: RUB, USD, EUR, BYN, UAH и др. Детально — в полной версии."
            />
          </Reveal>

          <Reveal delay={400}>
            <Card
              title="Гибкая логистика"
              text="Доставка и передача оговариваются отдельно. Escrow возможен (расходы на эскроу — на покупателя)."
            />
          </Reveal>
        </div>

        {/* Краткие условия (список) */}
        <Reveal>
          <div className="rounded-2xl border border-[var(--hef-border)] bg-white/80 shadow-[0_6px_24px_rgba(0,0,0,.05)] p-5 md:p-6">
            <h2 className="text-lg md:text-xl font-semibold mb-4">
              Краткие условия
            </h2>
            <ol className="list-decimal pl-5 space-y-3 text-[15px] leading-relaxed text-[var(--hef-ink)]">
              <li>
                <b>Состояние SIM.</b> Карта должна позволять исходящие звонки,
                SMS и приём вызовов/сообщений при положительном балансе.
                Обязательна возможность регистрации в сети и в регионах
                назначения (включая 2G). Карта, которая не заходит в сеть,
                считается неисправной.
              </li>
              <li>
                <b>Предупреждение о прошлой эксплуатации.</b> Если карты ранее
                использовались (исходящие, любые другие цели) — об этом
                необходимо сообщить до сделки. Иначе такие карты считаются
                неисправными. Также заранее оговариваются «минимальные
                пополнения» и тарифные условия.
              </li>
              <li>
                <b>Блокировки после старта.</b> Если оператор блокирует карту
                после начала использования в HEF Service, ответственность за
                блокировку берёт на себя HEF Service.
              </li>
              <li>
                <b>Расчёт.</b> Проводится после проверки SIM-карт
                представителем HEF Service. Гарантированное время расчёта —{" "}
                <b>до 48 часов</b> после получения партии.
              </li>
              <li>
                <b>Входная проверка.</b> Карты вставляются в «SIM-банк» и
                выборочно (до 20%) тестируются. Если проверка успешна — оплата
                распространяется на всю партию.
              </li>
              <li>
                <b>Финансовая защита.</b> При необходимости возможна сделка
                через эскроу/гарантийные сервисы. Расходы по таким сервисам — на
                стороне покупателя.
              </li>
              <li>
                <b>Комиссии.</b> Без комиссий с нашей стороны (по умолчанию).
                Если требуются специальные каналы/платёжные системы — комиссия
                может обсуждаться отдельно.
              </li>
              <li>
                <b>Валюты и переводы.</b> Выплата возможна в разных
                валютах/системах (RUB, USD, EUR, BYN, UAH и др., банковские
                переводы, SEPA и пр.). Точные способы и реквизиты согласуются
                перед сделкой.
              </li>
              <li>
                <b>Доставка.</b> Если отправку карт оплачивает поставщик —
                возможен небольшой бонус на усмотрение сервиса.
              </li>
            </ol>

            <p className="mt-4 text-[13px] text-[var(--hef-dim)]">
              <b>Важно.</b> Настоящий раздел содержит краткое описание. В случае
              расхождений приоритет имеет полная версия условий.
            </p>
          </div>
        </Reveal>

        {/* Кнопка на полную версию */}
        <Reveal delay={120}>
          <div className="mt-6 text-center">
            <a
              href="https://buysim.hefservice.com"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-[var(--hef-accent)] px-5 py-3 text-white font-semibold transition hover:opacity-90"
            >
              Открыть полную версию условий
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden
              >
                <path
                  d="M13 5h6v6M11 13l8-8M20 13v6h-6"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            <div className="mt-2 text-[12px] text-[var(--hef-dim)]">
              Ссылка откроется в новой вкладке.
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}

/* ---------- Вспомогательная карточка ---------- */
function Card({ title, text }) {
  return (
    <div className="rounded-2xl border border-[var(--hef-border)] bg-white/90 p-5 shadow-[0_6px_24px_rgba(0,0,0,.05)] transition hover:shadow-[0_10px_36px_rgba(0,0,0,.08)]">
      <h3 className="font-semibold text-[16px] mb-2">{title}</h3>
      <p className="text-[14px] text-[var(--hef-dim)] leading-relaxed">{text}</p>
    </div>
  );
}