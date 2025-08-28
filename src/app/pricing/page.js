"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import baseData from "@/data/pricing.base.json";
import Reveal from "@/components/Reveal"; // 👈 подключили

/* ========= Локализация стран ========= */
const COUNTRY_RU = {
  Russia: "Россия",
  Ukraine: "Украина",
  Kyrgyzstan: "Киргизстан",
  Kazakhstan: "Казахстан",
  Georgia: "Грузия",
  Lithuania: "Литва",
  Latvia: "Латвия",
  Poland: "Польша",
  Germany: "Германия",
  Spain: "Испания",
  France: "Франция",
  Philippines: "Филиппины",
  Belarus: "Беларусь",
};
const displayCountry = (raw) => COUNTRY_RU[raw] || raw;

/* ========= Валюты и конвертация ========= */
function normCur(raw = "USD") {
  const v = String(raw).trim().toUpperCase();
  if (v === "$" || v === "USD") return "USD";
  if (v === "€" || v === "EUR") return "EUR";
  if (v === "₽" || v === "RUB") return "RUB";
  if (v === "₴" || v === "UAH") return "UAH";
  if (v === "ZŁ" || v === "PLN") return "PLN";
  if (["KGS", "СОМ", "СОМЫ", "SOM"].includes(v)) return "KGS";
  return v;
}
const CUR_SIGN = { USD: "$", EUR: "€", RUB: "₽", UAH: "₴", PLN: "zł", KGS: "сом" };
const RATES_PER_USD_DEFAULT = { USD: 1, EUR: 0.92, RUB: 93, UAH: 41, PLN: 3.95, KGS: 87 };

function convert(price, fromCode, toCode, rates) {
  const f = normCur(fromCode);
  const t = normCur(toCode);
  if (price == null || isNaN(price)) return null;
  if (!rates[f] || !rates[t]) return null;
  if (f === t) return price;
  const usd = price / rates[f];
  return usd * rates[t];
}

/* ========= Поддержка диапазонов цены ========= */
function formatPrice(r, displayCur, rates) {
  const sign = CUR_SIGN[displayCur] || displayCur;

  if (typeof r.price === "number") {
    const v = convert(r.price, r.currency, displayCur, rates);
    return v != null ? `${v.toFixed(2)} ${sign}` : "—";
  }

  if (Array.isArray(r.price) && r.price.length === 2) {
    const [min, max] = r.price;
    const vMin = convert(Number(min), r.currency, displayCur, rates);
    const vMax = convert(Number(max), r.currency, displayCur, rates);
    if (vMin != null && vMax != null) return `${vMin.toFixed(2)}–${vMax.toFixed(2)} ${sign}`;
    return "—";
  }

  if (r.price && typeof r.price === "object" && ("min" in r.price || "max" in r.price)) {
    const vMin = "min" in r.price ? convert(Number(r.price.min), r.currency, displayCur, rates) : null;
    const vMax = "max" in r.price ? convert(Number(r.price.max), r.currency, displayCur, rates) : null;
    if (vMin != null && vMax != null) return `${vMin.toFixed(2)}–${vMax.toFixed(2)} ${sign}`;
    if (vMin != null) return `от ${vMin.toFixed(2)} ${sign}`;
    if (vMax != null) return `до ${vMax.toFixed(2)} ${sign}`;
    return "—";
  }

  if (typeof r.price === "string") return r.price;

  return "—";
}

/* ========= UI: Чип страны ========= */
function CountryChip({ active, flag, label, count, onClick }) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={[
        "group relative overflow-hidden cursor-pointer",
        "flex items-center justify-between gap-3 rounded-2xl",
        "border bg-white/70 backdrop-blur px-4 py-3",
        "transition shadow-[0_4px_24px_rgba(0,0,0,.04)]",
        active
          ? "border-[var(--hef-accent)] ring-1 ring-[var(--hef-accent)]/40"
          : "border-[var(--hef-border)] hover:border-[var(--hef-accent)]/40 hover:shadow-[0_6px_28px_rgba(0,0,0,.06)]",
      ].join(" ")}
      title={label}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -right-6 -top-8 h-24 w-24 rounded-full opacity-60 transition group-hover:opacity-80"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(125,211,252,.18), rgba(125,211,252,0) 60%)",
        }}
      />
      <div className="flex items-center gap-3 min-w-0">
        {flag ? (
          <Image src={flag} alt="" width={22} height={16} className="rounded-[3px] object-cover" />
        ) : (
          <span className="inline-block h-[16px] w-[22px] rounded-[3px] bg-[var(--hef-surface)]" />
        )}
        <span className="truncate text-[15px] font-display font-semibold">{label}</span>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <span className="text-xs text-[var(--hef-dim)]">{count} операт.</span>
        <svg
          className={`h-4 w-4 transition-transform ${
            active ? "translate-x-[2px]" : "group-hover:translate-x-[2px]"
          }`}
          viewBox="0 0 24 24"
          fill="none"
        >
          <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </div>
    </button>
  );
}

/* ========= UI: Карточка оператора ========= */
function OperatorCard({ r, priceStr, onToggle, open }) {
  return (
    <div
      className={[
        "relative overflow-hidden rounded-2xl border bg-white",
        "border-[var(--hef-border)] shadow-[0_8px_40px_rgba(0,0,0,.05)]",
        "transition hover:shadow-[0_10px_48px_rgba(0,0,0,.07)]",
      ].join(" ")}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(125,211,252,.16), rgba(125,211,252,0) 65%)",
        }}
      />

      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            {r.logo ? (
              <Image src={r.logo} alt="" width={32} height={32} className="rounded object-contain" />
            ) : (
              <div className="h-8 w-8 rounded bg-[var(--hef-surface)]" />
            )}
            <div className="min-w-0">
              <div className="truncate font-semibold">{r.operator}</div>
            </div>
          </div>

          <div className="shrink-0 rounded-lg border border-[var(--hef-border)] bg-white/70 px-2.5 py-1 text-sm font-medium">
            {priceStr}
          </div>
        </div>

        <div className="mt-3 flex items-center gap-2">
          <button
            onClick={onToggle}
            aria-expanded={open}
            className="cursor-pointer inline-flex items-center gap-1 rounded-lg border border-[var(--hef-border)] px-3 py-1.5 text-sm hover:bg-[rgba(0,0,0,.03)] transition"
          >
            Подробнее
            <svg
              className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
              viewBox="0 0 24 24"
              fill="none"
            >
              <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>

          <a
            href="/sell-sim"
            className="inline-flex items-center justify-center rounded-lg border border-[var(--hef-border)] bg-[var(--hef-surface)] px-3 py-1.5 text-sm font-medium hover:bg-white transition"
          >
            Продать SIM
          </a>
        </div>

        <div
          className={`grid transition-[grid-template-rows] duration-300 ease-out mt-2 ${
            open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          }`}
        >
          <div className="min-h-0 overflow-hidden">
            <div className="rounded-xl border border-[var(--hef-border)] bg-white/80 p-3">
              {Array.isArray(r.details) && r.details.length ? (
                <ul className="list-disc pl-5 space-y-1 text-[14px] text-[var(--hef-dim)]">
                  {r.details.map((d, idx) => (
                    <li key={idx}>{d}</li>
                  ))}
                </ul>
              ) : (
                <div className="text-[14px] text-[var(--hef-dim)]">Подробные условия будут добавлены.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ========= Страница ========= */
export default function PricingPage() {
  const [rates] = useState(RATES_PER_USD_DEFAULT);
  const [displayCur, setDisplayCur] = useState("USD");
  const [countryQuery, setCountryQuery] = useState("");
  const [selected, setSelected] = useState(null);

  // группировка по стране
  const byCountry = useMemo(() => {
    const m = new Map();
    for (const r of baseData) {
      const k = r.country || "—";
      if (!m.has(k)) m.set(k, []);
      m.get(k).push(r);
    }
    for (const [, arr] of m) {
      arr.sort((a, b) => (a.operator || "").localeCompare(b.operator || ""));
    }
    return m;
  }, []);

  const countries = useMemo(
    () => Array.from(byCountry.keys()).sort((a, b) => displayCountry(a).localeCompare(displayCountry(b), "ru")),
    [byCountry]
  );

  const filteredCountries = useMemo(() => {
    const q = countryQuery.trim().toLowerCase();
    if (!q) return countries;
    return countries.filter((c) => displayCountry(c).toLowerCase().includes(q));
  }, [countries, countryQuery]);

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      {/* Заголовок (плавный) */}
      <Reveal duration={900} distance={16} direction="up">
        <header className="mb-6 md:mb-8">
          <h1 className="font-display text-3xl md:text-5xl font-extrabold tracking-tight">Цены</h1>
          <p className="mt-3 text-[17px] leading-relaxed text-[var(--hef-dim)]">
            Сначала выберите страну — затем оператора. Клик по «Подробнее» откроет условия.
          </p>
          <p className="mt-1 text-[13px] text-[var(--hef-dim)]">
            Конвертация локальная (примерная), для точных цен — уточняйте у менеджера.
          </p>
        </header>
      </Reveal>

      {/* Валюта + поиск (плавный) */}
      <Reveal duration={900} distance={16} direction="up" delay={120}>
        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between mb-4">
          <label className="relative block sm:max-w-md">
            <input
              type="search"
              placeholder="Поиск: страна…"
              value={countryQuery}
              onChange={(e) => setCountryQuery(e.target.value)}
              className="w-full rounded-2xl border border-[var(--hef-border)] bg-white/80 px-4 py-2.5 pr-10 text-[15px] outline-none focus:border-[var(--hef-accent)]"
            />
            <svg className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 opacity-60" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5" />
              <path d="M20 20L17 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </label>

          <div className="flex items-center gap-3">
            <span className="text-sm text-[var(--hef-dim)]">Валюта</span>
            <select
              value={displayCur}
              onChange={(e) => setDisplayCur(e.target.value)}
              className="rounded-2xl border border-[var(--hef-border)] bg-white/80 px-3 py-2 text-sm outline-none cursor-pointer"
            >
              {Object.keys(RATES_PER_USD_DEFAULT).map((code) => (
                <option key={code} value={code}>{code}</option>
              ))}
            </select>
          </div>
        </div>
      </Reveal>

      {/* Сетка стран с поочередной анимацией */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-8">
        {filteredCountries.map((c, i) => {
          const arr = byCountry.get(c) || [];
          const first = arr[0];
          const flag = first?.flag;
          const label = displayCountry(c);
          const isActive = selected === c;

          return (
            <Reveal key={c} duration={800} distance={18} direction="up" delay={i * 60}>
              <CountryChip
                active={isActive}
                flag={flag}
                label={label}
                count={arr.length || 0}
                onClick={() => setSelected((prev) => (prev === c ? null : c))}
              />
            </Reveal>
          );
        })}
        {filteredCountries.length === 0 && (
          <div className="col-span-full py-6 text-center text-sm text-[var(--hef-dim)]">Страна не найдена</div>
        )}
      </div>

      {/* Карточки выбранной страны (каждая с анимацией) */}
      {selected && (
        <OperatorsGrid
          key={selected}
          countryRu={displayCountry(selected)}
          rows={byCountry.get(selected) || []}
          displayCur={displayCur}
          rates={rates}
        />
      )}
    </main>
  );
}

/* ========= Сетка операторов ========= */
function OperatorsGrid({ countryRu, rows, displayCur, rates }) {
  const [openIdx, setOpenIdx] = useState(null);

  return (
    <section>
      <Reveal duration={1000} distance={14} direction="up">
        <div className="text-[15px] font-medium mb-3">Операторы — {countryRu}</div>
      </Reveal>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {rows.map((r, i) => {
          const priceStr = formatPrice(r, displayCur, rates);
          const open = openIdx === i;

          return (
            <Reveal key={`${r.operator}-${i}`} duration={850} distance={22} direction="up" delay={i * 10}>
              <OperatorCard
                r={r}
                priceStr={priceStr}
                open={open}
                onToggle={() => setOpenIdx(open ? null : i)}
              />
            </Reveal>
          );
        })}
      </div>

      <Reveal duration={700} distance={10} direction="up" delay={Math.min(rows.length, 6) * 70 + 100}>
        <div className="mt-3 text-xs text-[var(--hef-dim)]">
          * Конвертация выполняется локально по примерным курсам.
        </div>
      </Reveal>
    </section>
  );
}