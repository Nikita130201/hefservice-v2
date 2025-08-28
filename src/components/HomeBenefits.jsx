export default function HomeBenefits() {
    const cards = [
      {
        title: "Быстрый выкуп",
        text: "Оплата в течение 48 часов после проверки SIM. Работаем прозрачно и без задержек.",
        icon: (
          <svg viewBox="0 0 24 24" className="h-6 w-6">
            <path d="M12 3v18M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        ),
      },
      {
        title: "Любые операторы и страны",
        text: "Принимаем SIM любых операторов и из любых стран. Возможен выкуп б/у партий.",
        icon: (
          <svg viewBox="0 0 24 24" className="h-6 w-6">
            <path d="M12 2a10 10 0 100 20 10 10 0 000-20Z" stroke="currentColor" strokeWidth="2" fill="none"/>
            <path d="M2 12h20M12 2c3 3.5 3 16.5 0 20M6 4.5c2 .8 10 .8 12 0" stroke="currentColor" strokeWidth="2" fill="none"/>
          </svg>
        ),
      },
      {
        title: "Прозрачные условия",
        text: "Фиксированная цена, понятные этапы сделки и чёткие сроки.",
        icon: (
          <svg viewBox="0 0 24 24" className="h-6 w-6">
            <path d="M4 7h16M4 12h10M4 17h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
          </svg>
        ),
      },
    ];
  
    return (
      <section className="container mx-auto px-6 py-10">
        <h2 className="text-2xl md:text-3xl font-semibold text-center">Почему поставщики выбирают нас</h2>
        <p className="mt-2 text-center text-gray-600">Минимум бюрократии — максимум скорости и предсказуемости сделки.</p>
  
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((c, i) => (
            <div
              key={i}
              className="rounded-2xl border border-[var(--hef-border,#e4e4e7)] bg-white/80 backdrop-blur
                         p-6 shadow-[0_8px_40px_rgba(0,0,0,.06)] hover:shadow-[0_12px_48px_rgba(0,0,0,.10)]
                         transition-shadow"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--hef-surface,#f7f7f8)] text-[var(--hef-header-bg,#2a0d53)]">
                  {c.icon}
                </div>
                <h3 className="text-lg font-semibold">{c.title}</h3>
              </div>
              <p className="mt-3 text-sm text-gray-600 leading-relaxed">{c.text}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }
  