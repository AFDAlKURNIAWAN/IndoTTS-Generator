import { Heart, Languages, Zap } from "lucide-react";

function About() {
  const features = [
    [
      Languages,
      "Bahasa Indonesia",
      "Dibuat untuk intonasi dan ritme bahasa kita.",
    ],
    [Zap, "Cepat dan praktis", "Tulis, klik, dan dengarkan hasilnya seketika."],
    [
      Heart,
      "Terdengar natural",
      "Suara yang hangat untuk cerita yang lebih hidup.",
    ],
  ];

  return (
    <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
      <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-emerald-700">
            Kenapa Suara.id?
          </p>
          <h2 className="max-w-xl text-3xl font-black tracking-tight text-[#102a25] sm:text-4xl">
            Lebih dari sekadar membaca teks.
          </h2>
        </div>
        <p className="max-w-xs text-sm leading-6 text-slate-500">
          Teknologi yang membantu idemu terdengar seperti yang kamu bayangkan.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {features.map(([Icon, title, copy]) => (
          <div
            key={title}
            className="rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/50"
          >
            <div className="mb-10 grid size-11 place-items-center rounded-xl bg-[#eef6c9] text-emerald-800">
              <Icon size={20} />
            </div>
            <h3 className="mb-2 font-black text-slate-900">{title}</h3>
            <p className="text-sm leading-6 text-slate-500">{copy}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default About;
