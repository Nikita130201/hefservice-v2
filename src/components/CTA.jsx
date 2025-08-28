"use client";
import Link from "next/link";
import Reveal from "@/components/Reveal";

export default function Cta() {
  return (
    <section className="shell my-12 md:my-16">
      <Reveal>
        <div className="rounded-2xl border border-[var(--hef-border)] bg-white p-6 md:p-8 text-center shadow-[0_8px_40px_rgba(0,0,0,.04)]">
          <h3 className="text-2xl font-display font-semibold">Готовы к сотрудничеству?</h3>
          <p className="mt-2 text-[15px] text-[var(--hef-dim)]">Заполните форму — свяжемся в рабочее время.</p>
          <div className="mt-4 flex items-center justify-center gap-3">
            <Link href="/sell-sim" className="rounded-xl bg-[var(--hef-accent)] px-5 py-3 text-white font-semibold hover:opacity-90 transition">
              Продать SIM
            </Link>
            <Link href="/contact" className="rounded-xl border border-[var(--hef-border)] bg-white px-5 py-3 font-semibold hover:bg-[var(--hef-surface)] transition">
              Контакты
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}