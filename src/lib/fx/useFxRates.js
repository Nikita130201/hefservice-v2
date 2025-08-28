// src/lib/fx/useFxRates.js
"use client";

import { useEffect, useMemo, useState } from "react";
import { DEFAULT_RATES_PER_USD, SUPPORTED_CURRENCIES } from "@/data/currency";

// Нормализация кодов валют ("$", "eur" → "EUR" и т.п.)
export function normCur(raw = "USD") {
  const v = String(raw).trim().toUpperCase();
  if (v === "$" || v === "USD") return "USD";
  if (v === "€" || v === "EUR") return "EUR";
  if (v === "₽" || v === "RUB") return "RUB";
  if (v === "₴" || v === "UAH") return "UAH";
  if (v === "ZŁ" || v === "PLN") return "PLN";
  if (["KGS", "СОМ", "СОМЫ", "SOM"].includes(v)) return "KGS";
  return v;
}

// Конвертация из from → to через USD-базу
export function convert(price, fromCode, toCode, ratesPerUSD) {
  const f = normCur(fromCode);
  const t = normCur(toCode);
  if (price == null || isNaN(price)) return null;
  if (!ratesPerUSD[f] || !ratesPerUSD[t]) return null;
  if (f === t) return price;
  const usd = price / ratesPerUSD[f];
  return usd * ratesPerUSD[t];
}

/**
 * Получаем “живые” курсы через exchangerate.host:
 *   GET https://api.exchangerate.host/latest?base=USD&symbols=EUR,RUB,UAH,PLN,KGS
 * Возвращаем:
 *   { rates, loading, error, updatedAt }
 * rates — объект "сколько единиц валюты за 1 USD"
 */
export function useFxRates({ refreshMs = 6 * 60 * 60 * 1000 } = {}) {
  const [rates, setRates] = useState(DEFAULT_RATES_PER_USD);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatedAt, setUpdatedAt] = useState(null);

  const symbols = useMemo(() => SUPPORTED_CURRENCIES.filter(c => c !== "USD").join(","), []);

  useEffect(() => {
    let stop = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const url = `https://api.exchangerate.host/latest?base=USD&symbols=${encodeURIComponent(symbols)}`;
        const res = await fetch(url, { cache: "no-store" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();

        // API отдаёт rates вида { EUR: 0.91, RUB: 94, ... }
        const next = { ...DEFAULT_RATES_PER_USD, ...(json?.rates || {}) };

        if (!stop) {
          setRates(next);
          setUpdatedAt(json?.date || new Date().toISOString());
        }
      } catch (e) {
        if (!stop) setError(e);
      } finally {
        if (!stop) setLoading(false);
      }
    }

    load();
    const id = setInterval(load, refreshMs);
    return () => {
      stop = true;
      clearInterval(id);
    };
  }, [symbols, refreshMs]);

  return { rates, loading, error, updatedAt };
}