// src/app/sell-sim/page.js
import SellSimForm from "@/components/SellSimForm";

export const metadata = {
  title: "Быстрый выкуп SIM — HEF Service",
  description: "Форма заявки на продажу партий SIM. Быстрый тест и оплата 24–48 часов.",
};

export default function SellSimPage() {
  return (
    <section className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-indigo-50/40 to-purple-50/30 py-10 md:py-14">
      {/* Заголовок */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-display font-semibold text-[var(--hef-dark)]">
          Быстрый выкуп SIM-карт
        </h1>
        <p className="mt-2 text-[15px] text-[var(--hef-dim)] max-w-2xl mx-auto">
          Укажите страну, оператора и примерное количество — мы свяжемся с вами в течение 24 часов.
          <br />
          Работаем по всему миру, принимаем любые операторы и партии.
        </p>
      </div>

      {/* Форма в карточке */}
      <div className="mx-auto w-full max-w-xl bg-white rounded-2xl border border-gray-200 shadow-md p-6 md:p-8">
        <SellSimForm />
      </div>
    </section>
  );
}