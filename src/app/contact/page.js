// src/app/contact/page.js
import ContactContent from "@/components/ContactContent";

export const metadata = {
  title: "Контакты для вендоров — HEF Service",
  description:
    "Контакты команды закупки SIM: Telegram и e-mail. Быстрая связь и ответственные сделки.",
};

export default function ContactVendorsPage() {
  return <ContactContent />;
}