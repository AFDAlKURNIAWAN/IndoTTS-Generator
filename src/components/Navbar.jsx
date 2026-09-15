import { Mic2, Menu } from "lucide-react";

function Navbar() {
  return (
    <header className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-5 py-6 sm:px-8">
      <a
        href="#top"
        className="flex items-center gap-2 text-lg font-black tracking-tight"
      >
        <span className="grid size-9 place-items-center rounded-xl bg-[#102a25] text-[#d8f35d]">
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
        className="hidden rounded-full bg-[#102a25] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-emerald-800 sm:block"
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
