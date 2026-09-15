import { ArrowDownRight, AudioLines } from "lucide-react";

function Hero() {
  return (
    <section
      id="top"
      className="relative mx-auto max-w-6xl px-5 pb-16 pt-12 sm:px-8 sm:pt-20 lg:pb-24"
    >
      <div className="pointer-events-none absolute -right-28 top-0 size-80 rounded-full bg-[#e4f3a5]/70 blur-3xl" />
      <div className="relative max-w-4xl">
        <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/70 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-emerald-800">
          <AudioLines size={14} /> Text-to-speech bahasa Indonesia
        </div>
        <h1 className="max-w-4xl text-5xl font-black leading-[0.98] tracking-[-0.06em] text-[#102a25] sm:text-7xl lg:text-8xl">
          Suaramu, <span className="text-emerald-700">ceritamu.</span>
        </h1>
        <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <p className="max-w-md text-base leading-7 text-slate-600 sm:text-lg">
            Ubah tulisan menjadi suara yang natural dan terasa dekat. Sederhana
            untuk dimulai, kuat untuk setiap cerita.
          </p>
          <a
            href="#generator"
            className="group inline-flex items-center gap-2 self-start text-sm font-black text-[#102a25] sm:self-end"
          >
            Mulai dari sini{" "}
            <span className="grid size-9 place-items-center rounded-full bg-[#d8f35d] transition group-hover:translate-x-1">
              <ArrowDownRight size={17} />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}

export default Hero;
