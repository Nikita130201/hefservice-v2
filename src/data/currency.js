// src/data/currency.js

// Какие валюты показываем на сайте
export const SUPPORTED_CURRENCIES = ["USD", "EUR", "RUB", "UAH", "PLN", "KGS"];

// Символы валют (как выводить рядом со значением)
export const CUR_SIGN = {
  USD: "$",
  EUR: "€",
  RUB: "₽",
  UAH: "₴",
  PLN: "zł",
  KGS: "сом",
};

// Фолбэк-курсы: сколько единиц валюты за 1 USD
// Используются, если сеть недоступна или API не ответил
export const DEFAULT_RATES_PER_USD = {
  USD: 1,
  EUR: 0.92,
  RUB: 93,
  UAH: 41,
  PLN: 3.95,
  KGS: 87,
};