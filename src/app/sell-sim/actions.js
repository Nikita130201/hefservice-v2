"use server";

import { z } from "zod";

const schema = z.object({
  country: z.string().min(2),
  operators: z.string().transform((v) => {
    try { return JSON.parse(v); } catch { return []; }
  }),
  qtyType: z.enum(["exact", "flex"]),
  qty: z.string().optional(),
  contactTg: z.string().optional(),
  contactEmail: z.string().email().optional().or(z.literal("")),
  regState: z.enum(["any","already","need"]),
  note: z.string().optional(),
  _hp: z.string().optional(), // honeypot
});

export async function submitSellSim(formData) {
  // Антиспам
  if (formData.get("_hp")) return { ok:false, error:"Spam detected" };

  const parsed = schema.safeParse({
    country: formData.get("country"),
    operators: formData.get("operators"),
    qtyType: formData.get("qtyType"),
    qty: formData.get("qty"),
    contactTg: formData.get("contactTg"),
    contactEmail: formData.get("contactEmail"),
    regState: formData.get("regState"),
    note: formData.get("note"),
    _hp: formData.get("_hp"),
  });

  if (!parsed.success) {
    return { ok:false, error:"Некорректные данные формы." };
  }
  const d = parsed.data;

  // хотя бы один контакт
  if (!d.contactTg && !d.contactEmail) {
    return { ok:false, error:"Укажите Telegram или e‑mail." };
  }
  // qty
  if (d.qtyType === "exact") {
    const n = Number(d.qty || 0);
    if (!Number.isFinite(n) || n <= 0) {
      return { ok:false, error:"Количество должно быть > 0." };
    }
  }

  // Файл (до 5 МБ)
  const file = formData.get("file");
  if (file && file.size > 5 * 1024 * 1024) {
    return { ok:false, error:"Файл больше 5 MB." };
  }

  // TODO: сохранить в БД/отправить в Slack/Telegram/почту
  // пример: отправка в Telegram ботом или запись в Notion/Sheets

  // Простейший лог (в деве)
  console.log("[SELL_SIM]", {
    ...d,
    operators: d.operators,
    file: file ? { name: file.name, size: file.size } : null,
  });

  return { ok:true };
}