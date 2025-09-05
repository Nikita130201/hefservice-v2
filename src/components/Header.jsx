"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // закрываем меню при переходе по ссылке
  useEffect(() => setOpen(false), [pathname]);

  // блокируем скролл при открытом меню
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = prev);
  }, [open]);

  // --- активный линк
  const isActive = (href) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const linkClass = (href) =>
    `hover:text-[var(--hef-accent)] transition ${
      isActive(href) ? "text-[var(--hef-accent)] font-bold" : ""
    }`;

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 bg-[var(--hef-bg)] text-[var(--hef-fg)] border-b border-gray-200">
        <nav className="shell h-14 flex items-center justify-between">
          {/* Лого */}
          <Link href="/" className=" group flex items-center gap-2" aria-label="На главную">
            <Image  src="/logo.svg" alt="Hef Service" width={110} height={40} priority  className="h-auto group-hover:scale-[1.02] transition" />
          </Link>

          {/* Десктопное меню */}
          <ul className="hidden lg:flex gap-10 text-lg font-display font-semibold">
            <li>
              <Link className={linkClass("/pricing")} href="/pricing">
                Цены
              </Link>
            </li>
            <li>
              <Link className={linkClass("/terms")} href="/terms">
                Условия
              </Link>
            </li>
            <li>
              <Link className={linkClass("/faq")} href="/faq">
                FAQ
              </Link>
            </li>
            <li>
              <Link className={linkClass("/sell-sim")} href="/sell-sim">
                Продать SIM
              </Link>
            </li>
            <li>
              <Link className={linkClass("/contact")} href="/contact">
                Контакты
              </Link>
            </li>
          </ul>

          {/* Кнопка-бургер */}
          <button
            aria-label="Открыть меню"
            onClick={() => setOpen(true)}
            className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-md hover:bg-[rgba(0,0,0,.06)] transition"
          >
            <span className="block h-[2px] w-6 bg-current relative">
              <span className="absolute -top-2 left-0 h-[2px] w-6 bg-current"></span>
              <span className="absolute top-2 left-0 h-[2px] w-6 bg-current"></span>
            </span>
          </button>
        </nav>
      </header>

      <MobileMenu open={open} onClose={() => setOpen(false)} isActive={isActive} />
      <div/>
    </>
  );
}

function MobileMenu({ open, onClose, isActive }) {
  const mobileItem = (href, label) => (
    <li>
      <Link
        href={href}
        onClick={onClose}
        aria-current={isActive(href) ? "page" : undefined}
        className={`block px-6 py-5 text-lg font-display transition ${
          isActive(href)
            ? "text-[var(--hef-accent)] font-bold bg-[rgba(125,211,252,.08)]"
            : "hover:text-[var(--hef-accent)]"
        }`}
      >
        {label}
      </Link>
    </li>
  );

  return (
    <div aria-hidden={!open} className={`fixed inset-0 z-50 lg:hidden ${open ? "" : "pointer-events-none"}`}>
      {/* фон */}
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/40 transition-opacity ${open ? "opacity-100" : "opacity-0"}`}
      />
      {/* меню */}
      <div
        className={`absolute inset-y-0 right-0 left-0 bg-[var(--hef-bg)] text-[var(--hef-fg)] shadow-xl transition-transform duration-500 ${
          open ? "translate-y-0" : "-translate-y-full"
        }`}
        role="dialog"
        aria-modal="true"
      >
        <div className="shell h-14 flex items-center justify-between">
          <Link href="/" aria-label="На главную">
            <Image src="/logo.svg" alt="Hef Service" width={110} height={40} priority />
          </Link>
          <button
            aria-label="Закрыть меню"
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md hover:bg-[rgba(0,0,0,.06)] transition"
          >
            <span className="relative block h-5 w-5">
              <span className="absolute inset-0 rotate-45 bg-current h-[2px] top-1/2" />
              <span className="absolute inset-0 -rotate-45 bg-current h-[2px] top-1/2" />
            </span>
          </button>
        </div>

        <ul className="mt-2 divide-y divide-[var(--hef-border)]">
          {mobileItem("/pricing", "Цены")}
          {mobileItem("/terms", "Условия")}
          {mobileItem("/faq", "FAQ")}
          {mobileItem("/sell-sim", "Продать SIM")}
          {mobileItem("/contact", "Контакты")}
        </ul>
      </div>
    </div>
  );
}
