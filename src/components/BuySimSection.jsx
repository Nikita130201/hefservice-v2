"use client";
import Link from "next/link";
import Reveal from "./Reveal";

export default function BuySimSection() {
  return (
    <section className="py-12 sm:py-16 bg-gradient-to-r from-purple-50 to-indigo-50">
      <div className="container mx-auto max-w-4xl px-4">
        <Reveal>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#2b0d3a] text-center">
            Закупаем SIM-карты у поставщиков по всему миру
          </h2>
        </Reveal>

        <Reveal className="mt-3 sm:mt-4">
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed text-center">
            Мы выкупаем SIM-карты для использования в GSM-VoIP шлюзах и приёме DID-номеров.
            Возможна закупка партий любых операторов и стран, включая б/у карты.
          </p>
        </Reveal>

        <Reveal className="mt-6 flex justify-center">
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/contact"
              className="cursor-pointer px-6 h-11 sm:h-12 inline-flex items-center justify-center
                         rounded-xl bg-gradient-to-r from-[#9a7de0] to-[#7b5cd6]
                         text-white font-semibold shadow-md hover:opacity-95 active:opacity-90 transition"
            >
              Связаться с нами
            </Link>
            <Link
              href="/sell-sim"
              className="cursor-pointer px-6 h-11 sm:h-12 inline-flex items-center justify-center
                         rounded-xl border border-gray-300 bg-white text-gray-900
                         font-medium hover:bg-gray-50 transition"
            >
              Предложить партию SIM
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
