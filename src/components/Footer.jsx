import Link from "next/link";
import Image from "next/image";

const LinkItem=({href,children})=>(
  <li><Link href={href} className="text-[15px] text-[var(--hef-fg)]/70 hover:text-[var(--hef-accent)] transition">{children}</Link></li>
);

export default function Footer(){
  const year=new Date().getFullYear();
  return (
    <footer className="mt-12 border-t border-[var(--hef-border)] bg-white/80 backdrop-blur">
      <div className="shell py-10">
        <div className="grid gap-8 sm:gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-items-center md:justify-items-start text-center md:text-left">
          <div className="flex flex-col items-center md:items-start gap-4">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <Image src="/logo.svg" alt="Hef Service" width={110} height={40} className="h-auto group-hover:scale-[1.02] transition"/>
            </Link>
            <p className="text-sm leading-relaxed text-[var(--hef-dim)] max-w-[28ch]">
              Надёжный сервис для работы с SIM-картами и услугами связи.
            </p>
          </div>
          <div>
            <div className="mb-3 text-sm font-semibold">Навигация</div>
            <ul className="space-y-1">
              <LinkItem href="/contact">Контакты</LinkItem>
              <LinkItem href="/faq">FAQ</LinkItem>
            </ul>
          </div>
          <div>
            <div className="mb-3 text-sm font-semibold">Наши ресурсы</div>
            <ul className="space-y-1">
              <LinkItem href="/resources">Наши ресурсы</LinkItem>
              <LinkItem href="/public-offer">Публичная оферта</LinkItem>
            </ul>
          </div>
          <div>
            <div className="mb-3 text-sm font-semibold">Юридическая информация</div>
            <ul className="space-y-1">
              <LinkItem href="/api-docs">Документация API</LinkItem>
              <LinkItem href="/legal">Юридическая информация</LinkItem>
            </ul>
          </div>
        </div>
        <div className="mt-3 border-t border-[var(--hef-border)] pt-2 text-center text-sm text-[var(--hef-dim)]">
          © {year} Hef Service. Все права защищены.
        </div>
      </div>
    </footer>
  );
}