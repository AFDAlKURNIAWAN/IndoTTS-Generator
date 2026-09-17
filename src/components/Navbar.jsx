import { Mic2, Menu } from "lucide-react";

function Navbar() {
  return (
    <header className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-5 py-5 sm:px-8 sm:py-7">
      <a
        href="#top"
        className="flex items-center gap-2 text-lg font-extrabold tracking-tight"
      >
        <span className="grid size-9 place-items-center rounded-xl bg-[#102a25] text-[#d8f35d] shadow-[0_8px_20px_rgba(16,42,37,0.16)]">
          <Mic2 size={18} />
        </span>
        Suara<span className="text-emerald-700">.id</span>
      </a>
      <nav className="hidden items-center gap-8 text-sm font-semibold text-slate-500 md:flex">
        <a href="#generator" className="transition hover:text-emerald-800">
          Generator
        </a>
        <a href="#cara-kerja" className="transition hover:text-emerald-800">
          Cara kerja
        </a>
        <a href="#faq" className="transition hover:text-emerald-800">
          FAQ
        </a>
      </nav>
      <a
        href="#generator"
        className="hidden rounded-xl bg-[#102a25] px-5 py-2.5 text-sm font-bold text-white shadow-[0_8px_20px_rgba(16,42,37,0.15)] transition hover:-translate-y-0.5 hover:bg-emerald-800 sm:block"
      >
        Coba sekarang
      </a>
      <a
        href="#generator"
        aria-label="Buka generator"
        className="rounded-xl p-2 text-slate-700 sm:hidden"
      >
        <Menu size={22} />
      </a>
    </header>
  );
}

export default Navbar;
