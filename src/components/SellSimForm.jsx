"use client";

import { useRef, useState, useMemo } from "react";

const POPULAR_BY_COUNTRY = {
  Russia: ["Beeline", "MTS", "Megafon", "Tele2", "Yota"],
  Kazakhstan: ["Beeline", "Tele2", "Altel", "Kcell"],
  Ukraine: ["Kyivstar", "Vodafone", "lifecell"],
  Kyrgyzstan: ["Beeline", "MegaCom", "O!"],
};

const INITIAL = {
  country: "Russia",
  operators: [],
  amountType: "flex",
  exactQty: "",
  registration: "Любая / обсудим",
  telegram: "",
  email: "",
  comment: "",
};

const IMAGE_TYPES = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
const IMAGE_MAX_MB = 10;

export default function SellSimForm() {
  const formRef = useRef(null);

  // state
  const [country, setCountry] = useState(INITIAL.country);
  const [operators, setOperators] = useState(INITIAL.operators);
  const [amountType, setAmountType] = useState(INITIAL.amountType);
  const [exactQty, setExactQty] = useState(INITIAL.exactQty);
  const [registration, setRegistration] = useState(INITIAL.registration);
  const [telegram, setTelegram] = useState(INITIAL.telegram);
  const [email, setEmail] = useState(INITIAL.email);
  const [comment, setComment] = useState(INITIAL.comment);

  const [file, setFile] = useState(null);          // Blob (image)
  const [previewUrl, setPreviewUrl] = useState(""); // for <img>

  const [status, setStatus] = useState(null); // {type:'ok'|'err', msg:string}
  const [sending, setSending] = useState(false);

  const popularList = useMemo(() => POPULAR_BY_COUNTRY[country] || [], [country]);

  // operators helpers
  const addOperator = (op) => {
    setOperators((prev) => (prev.includes(op) ? prev : [...prev, op].slice(0, 12)));
  };
  const removeOperator = (op) => setOperators((prev) => prev.filter((x) => x !== op));
  const onAddFromInput = (e) => {
    if (e.key !== "Enter") return;
    e.preventDefault();
    const value = (e.currentTarget.value || "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    if (!value.length) return;
    const merged = Array.from(new Set([...operators, ...value]));
    setOperators(merged.slice(0, 12));
    e.currentTarget.value = "";
  };

  // image select + preview
  const onPickFile = (e) => {
    const f = e.target.files?.[0] ?? null;
    if (!f) {
      setFile(null);
      setPreviewUrl("");
      return;
    }
    if (!IMAGE_TYPES.includes(f.type)) {
      setStatus({ type: "err", msg: "Поддерживаются изображения: PNG/JPG/WebP." });
      e.target.value = "";
      return;
    }
    if (f.size > IMAGE_MAX_MB * 1024 * 1024) {
      setStatus({ type: "err", msg: `Фото должно быть ≤ ${IMAGE_MAX_MB} MB.` });
      e.target.value = "";
      return;
    }
    setStatus(null);
    setFile(f);
    setPreviewUrl(URL.createObjectURL(f));
  };
  const clearFile = () => {
    setFile(null);
    setPreviewUrl("");
    // очистим input[type=file]
    const input = formRef.current?.querySelector('input[type="file"]');
    if (input) input.value = "";
  };

  // validation
  const isEmptyPayload = () => {
    const hasBasics = country && (operators.length > 0 || comment.trim().length > 0);
    const hasContact = (telegram && telegram.trim().length > 1) || (email && email.trim().length > 3);
    if (!hasBasics) return "Добавьте операторы или кратко опишите партию.";
    if (!hasContact) return "Укажите контакт: Telegram или e-mail.";
    if (amountType === "exact" && (!exactQty || Number(exactQty) <= 0)) {
      return "Введите точное количество (> 0) или выберите «Гибкая партия».";
    }
    return null;
  };

  // submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);

    const v = isEmptyPayload();
    if (v) {
      setStatus({ type: "err", msg: v });
      return;
    }

    try {
      setSending(true);

      const json = {
        country,
        operators,
        amountType,
        exactQty: amountType === "exact" ? exactQty : "",
        registration,
        telegram,
        email,
        comment,
      };

      const fd = new FormData();
      fd.append("json", JSON.stringify(json));
      if (file) fd.append("file", file);

      const res = await fetch("/api/send-telegram", { method: "POST", body: fd });
      const data = await res.json();

      if (!res.ok || !data?.ok) {
        throw new Error(data?.error || "Не удалось отправить заявку.");
      }

      // success
      setStatus({
        type: "ok",
        msg:
          "Заявка успешно отправлена. Мы свяжемся с вами в рабочее время. " +
          "Спасибо!",
      });

      // reset form
      setCountry(INITIAL.country);
      setOperators(INITIAL.operators);
      setAmountType(INITIAL.amountType);
      setExactQty(INITIAL.exactQty);
      setRegistration(INITIAL.registration);
      setTelegram(INITIAL.telegram);
      setEmail(INITIAL.email);
      setComment(INITIAL.comment);
      clearFile();
    } catch (err) {
      setStatus({ type: "err", msg: String(err.message || err) });
    } finally {
      setSending(false);
    }
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto space-y-8 bg-white p-8 rounded-2xl shadow-lg border border-[var(--hef-border)]"
    >
      <div>
        <h1 className="text-2xl md:text-3xl font-display font-semibold tracking-tight">
          Продать SIM-карты
        </h1>
        <p className="mt-2 text-[15px] text-[var(--hef-dim)]">
          Заполните форму — мы свяжемся в течение рабочего дня и согласуем детали.
        </p>
      </div>

      {/* Country */}
      <div className="grid gap-2">
        <label className="text-sm font-medium">Страна</label>
        <select
          name="country"
          value={country}
          onChange={(e) => {
            setCountry(e.target.value);
            setOperators([]); // очищаем по смене страны
          }}
          className="w-full rounded-xl border border-[var(--hef-border)] bg-[var(--hef-surface)] px-3 py-2 text-[15px] focus:ring-2 focus:ring-[var(--hef-accent)] outline-none transition"
          required
        >
          {Object.keys(POPULAR_BY_COUNTRY).map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
          <option value="Other">Other</option>
        </select>

        {popularList.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {popularList.map((op) => (
              <button
                type="button"
                key={op}
                onClick={() => addOperator(op)}
                className="rounded-full border border-[var(--hef-border)] bg-[var(--hef-surface)] px-3 py-1 text-sm hover:bg-[var(--hef-border)]/20 transition"
              >
                + {op}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Operators */}
      <div className="grid gap-2">
        <label className="text-sm font-medium">Операторы</label>
        <input
          type="text"
          placeholder="Введите оператор и нажмите Enter (можно через запятую)"
          onKeyDown={onAddFromInput}
          className="w-full rounded-xl border border-[var(--hef-border)] bg-[var(--hef-surface)] px-3 py-2 text-[15px] focus:ring-2 focus:ring-[var(--hef-accent)] outline-none transition"
        />
        {!!operators.length && (
          <ul className="mt-2 flex flex-wrap gap-2">
            {operators.map((op) => (
              <li
                key={op}
                className="group inline-flex items-center gap-2 rounded-full bg-[var(--hef-surface)] px-3 py-1 text-[14px] ring-1 ring-[var(--hef-border)]"
              >
                {op}
                <button
                  type="button"
                  onClick={() => removeOperator(op)}
                  className="rounded-full px-2 py-0.5 text-[12px] bg-white/70 ring-1 ring-[var(--hef-border)] hover:bg-white"
                  aria-label={`Удалить ${op}`}
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        )}
        <p className="text-xs text-[var(--hef-dim)]">
          Подсказка: используйте Enter для добавления, можно перечислить через запятую.
        </p>
      </div>

      {/* Amount */}
      <div className="grid gap-2">
        <label className="text-sm font-medium">Количество</label>
        <div className="flex flex-wrap items-center gap-4">
          <label className="inline-flex items-center gap-2">
            <input
              type="radio"
              name="amountType"
              value="flex"
              checked={amountType === "flex"}
              onChange={() => setAmountType("flex")}
            />
            <span className="text-[15px]">Гибкая партия</span>
          </label>
          <label className="inline-flex items-center gap-2">
            <input
              type="radio"
              name="amountType"
              value="exact"
              checked={amountType === "exact"}
              onChange={() => setAmountType("exact")}
            />
            <span className="text-[15px]">Точное количество</span>
          </label>

          {amountType === "exact" && (
            <input
              type="number"
              min={1}
              value={exactQty}
              onChange={(e) =>
                setExactQty(e.target.value === "" ? "" : Number(e.target.value))
              }
              placeholder="Введите число"
              className="ml-2 w-44 rounded-xl border border-[var(--hef-border)] bg-[var(--hef-surface)] px-3 py-2 text-[15px] focus:ring-2 focus:ring-[var(--hef-accent)] outline-none transition"
            />
          )}
        </div>
      </div>

      {/* Registration */}
      <div className="grid gap-2">
        <label className="text-sm font-medium">Регистрация SIM</label>
        <select
          name="registration"
          value={registration}
          onChange={(e) => setRegistration(e.target.value)}
          className="w-full rounded-xl border border-[var(--hef-border)] bg-[var(--hef-surface)] px-3 py-2 text-[15px] focus:ring-2 focus:ring-[var(--hef-accent)] outline-none transition"
        >
          <option>Любая / обсудим</option>
          <option>Нужна регистрация</option>
          <option>Уже зарегистрированы</option>
        </select>
      </div>

      {/* Contacts */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="grid gap-2">
          <label className="text-sm font-medium">Telegram</label>
          <input
            type="text"
            name="telegram"
            value={telegram}
            onChange={(e) => setTelegram(e.target.value)}
            placeholder="@username"
            className="w-full rounded-xl border border-[var(--hef-border)] bg-[var(--hef-surface)] px-3 py-2 text-[15px] focus:ring-2 focus:ring-[var(--hef-accent)] outline-none transition"
          />
        </div>
        <div className="grid gap-2">
          <label className="text-sm font-medium">E-mail</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@domain.com"
            className="w-full rounded-xl border border-[var(--hef-border)] bg-[var(--hef-surface)] px-3 py-2 text-[15px] focus:ring-2 focus:ring-[var(--hef-accent)] outline-none transition"
          />
        </div>
      </div>

      {/* Photo upload */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="grid gap-2">
          <label className="text-sm font-medium">Фото партии (опц.)</label>
          <input
            type="file"
            accept="image/*"
            onChange={onPickFile}
            className="block w-full text-[15px] file:mr-3 file:rounded-lg file:border-0 file:bg-[var(--hef-accent)] file:px-4 file:py-2 file:text-white file:font-semibold file:hover:opacity-90 file:transition rounded-xl border border-[var(--hef-border)] bg-[var(--hef-surface)] px-3 py-2"
          />
          <p className="text-xs text-[var(--hef-dim)]">
            PNG/JPG/WebP, до {IMAGE_MAX_MB} MB. Фото ускорит оценку.
          </p>

          {previewUrl && (
            <div className="mt-2 flex items-center gap-3">
              <img
                src={previewUrl}
                alt="preview"
                className="h-20 w-20 rounded-lg object-cover ring-1 ring-[var(--hef-border)]"
              />
              <button
                type="button"
                onClick={clearFile}
                className="text-sm rounded-lg px-3 py-1.5 border border-[var(--hef-border)] hover:bg-[var(--hef-surface)]"
              >
                Удалить фото
              </button>
            </div>
          )}
        </div>

        <div className="grid gap-2">
          <label className="text-sm font-medium">Комментарий (опц.)</label>
          <textarea
            name="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Страна, операторы, сроки, особенности партии…"
            className="min-h-[112px] w-full rounded-xl border border-[var(--hef-border)] bg-[var(--hef-surface)] px-3 py-2 text-[15px] focus:ring-2 focus:ring-[var(--hef-accent)] outline-none transition"
          />
        </div>
      </div>

      {/* actions */}
      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={sending}
          className="rounded-xl bg-[var(--hef-accent)] px-6 py-3 text-white font-semibold hover:opacity-90 transition disabled:opacity-60"
        >
          {sending ? "Отправляем…" : "Отправить заявку"}
        </button>
        <a
          href="/terms"
          target="_blank"
          className="px-6 py-3 rounded-xl border border-[var(--hef-border)] bg-[var(--hef-surface)] text-[15px] font-semibold hover:bg-[var(--hef-border)]/20 transition"
        >
          Условия
        </a>
      </div>

      {/* status line */}
      {status && (
        <div
          className={`text-sm ${
            status.type === "ok" ? "text-green-600" : "text-rose-600"
          }`}
        >
          {status.type === "ok" ? "✅" : "❌"} {status.msg}
        </div>
      )}
    </form>
  );
}