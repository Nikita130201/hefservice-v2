// src/lib/pricing/merge.js

// Нормализация валютных кодов
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

// Символы валют
export const CUR_SIGN = { USD: "$", EUR: "€", RUB: "₽", UAH: "₴", PLN: "zł", KGS: "сом" };

// Локальные курсы: сколько единиц валюты за 1 USD
export const RATES_PER_USD_DEFAULT = { USD: 1, EUR: 0.92, RUB: 93, UAH: 41, PLN: 3.95, KGS: 87 };

// Конвертация из from → to по таблице выше
export function convert(price, fromCode, toCode, rates) {
  const f = normCur(fromCode);
  const t = normCur(toCode);
  if (price == null || isNaN(price)) return null;
  if (!rates[f] || !rates[t]) return null;
  if (f === t) return price;
  const usd = price / rates[f];
  return usd * rates[t];
}

// Перевод англ. названий стран в русские, для данных из pricing.json
const EN_TO_RU = {
  Russia: "Россия",
  Kyrgyzstan: "Киргизстан",
  // при необходимости расширишь (Spain→Испания и т.п.)
};

// Служебка для деталей
export function normalizeDetails(r) {
  if (Array.isArray(r?.details) && r.details.length) return r.details;
  const bag = [];
  if (typeof r?.note === "string" && r.note.trim()) bag.push(r.note.trim());
  if (Array.isArray(r?.notes)) bag.push(...r.notes.filter(Boolean));
  return bag.length ? bag : null;
}

/**
 * Склейка:
 * - ruCatalog: [{ country, flag, operators[] }]
 * - baseRows:  записи с ценами (country на англ/рус, operator, price, currency, logo, details/note)
 * Выход: Map<countryRu, { flag, rows: [{operator, logo, price, currency, details, note}] }>
 */
export function buildJoinedMap(ruCatalog, baseRows) {
  const map = new Map();

  // 1) создаём группы по ruCatalog
  for (const ru of ruCatalog) {
    map.set(ru.country, {
      flag: ru.flag || null,
      rows: (ru.operators || []).map((op) => ({ operator: op })),
    });
  }

  // 2) накладываем реальные прайсы из baseRows
  for (const r of baseRows) {
    const countryRu = EN_TO_RU[r.country] || r.country; // если в json на англ — переведём
    if (!map.has(countryRu)) {
      map.set(countryRu, { flag: r.flag || null, rows: [] });
    }
    const bucket = map.get(countryRu);

    const payload = {
      operator: r.operator || "—",
      logo: r.logo || null,
      price: typeof r.price === "number" ? r.price : null,
      currency: normCur(r.currency || "USD"),
      details: normalizeDetails(r),
      note: r.note || null,
    };

    const idx = bucket.rows.findIndex(
      (x) => (x.operator || "").toLowerCase() === (payload.operator || "").toLowerCase()
    );
    if (idx >= 0) {
      bucket.rows[idx] = { ...bucket.rows[idx], ...payload };
    } else {
      bucket.rows.push(payload);
    }

    if (!bucket.flag && r.flag) bucket.flag = r.flag;
  }

  // 3) сортировка операторов
  for (const [k, b] of map) {
    b.rows.sort((a, b) => (a.operator || "").localeCompare(b.operator || "", "ru"));
  }

  return map;
  
}