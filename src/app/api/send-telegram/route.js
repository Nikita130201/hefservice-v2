// src/app/api/send-telegram/route.js
export async function POST(req) {
  try {
    // форма приходит как multipart/form-data (json + file(опц.))
    const form = await req.formData();

    // "json" — это строка с данными формы из клиента
    const raw = form.get("json");
    const data = raw ? JSON.parse(String(raw)) : {};

    const {
      country,
      operators,
      amountType,
      exactQty,
      registration,
      telegram,
      email,
      comment,
    } = data;

    // нормализуем контакты
    const tg = (telegram || "").trim();
    const em = (email || "").trim();

    const contactsLines = [];
    if (tg) contactsLines.push(`💬 Telegram: ${tg.startsWith("@") ? tg : `@${tg}`}`);
    if (em) contactsLines.push(`📧 E-mail: ${em}`);

    const amountText =
      amountType === "exact" && exactQty ? `${exactQty}` : "Гибкая партия";

    // сообщение
    let text = [
      "🆕 Новая заявка с сайта",
      `🌍 Страна: ${country || "—"}`,
      `🧩 Операторы: ${operators || "—"}`,
      `📦 Кол-во: ${amountText}`,
      `🪪 Регистрация: ${registration || "—"}`,
      contactsLines.length ? contactsLines.join("\n") : "👤 Контакты: —",
      `📝 Комментарий: ${comment?.trim() || "—"}`,
    ].join("\n");

    // отправка в Telegram
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
      return new Response(JSON.stringify({ ok: false, error: "No TG env" }), { status: 500 });
    }

    // если был загружен файл/фото — отправим как фото с подписью,
    // иначе обычным текстом
    const file = form.get("file");
    if (file && typeof file === "object" && "arrayBuffer" in file) {
      const fd = new FormData();
      fd.set("chat_id", chatId);
      fd.set("caption", text);
      fd.set("photo", file); // фото или изображение
      await fetch(`https://api.telegram.org/bot${token}/sendPhoto`, {
        method: "POST",
        body: fd,
      });
    } else {
      await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text,
          parse_mode: "HTML",
          disable_web_page_preview: true,
        }),
      });
    }

    return Response.json({ ok: true });
  } catch (err) {
    console.error("tg route error:", err);
    return new Response(JSON.stringify({ ok: false, error: String(err) }), { status: 500 });
  }
}