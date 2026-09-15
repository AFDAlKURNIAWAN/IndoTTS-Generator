function Faq() {
  const questions = [
    [
      "Apakah bisa digunakan gratis?",
      "Ya, kamu bisa mencoba generator ini langsung dari browser.",
    ],
    [
      "Bahasa apa yang didukung?",
      "Suara.id difokuskan untuk teks berbahasa Indonesia.",
    ],
    [
      "Apakah audio bisa diunduh?",
      "Setelah audio dibuat, kamu dapat memutar dan menyimpan hasilnya dari pemutar audio browser.",
    ],
  ];
  return (
    <section id="faq" className="mx-auto max-w-3xl px-5 py-20 sm:px-8">
      <p className="mb-3 text-center text-xs font-bold uppercase tracking-[0.2em] text-emerald-700">
        FAQ
      </p>
      <h2 className="mb-10 text-center text-3xl font-black tracking-tight text-[#102a25]">
        Pertanyaan yang sering muncul
      </h2>
      <div className="divide-y divide-slate-200 border-y border-slate-200">
        {questions.map(([question, answer]) => (
          <details key={question} className="group py-5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-slate-800">
              <span>{question}</span>
              <span className="text-xl text-emerald-700 transition group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="mt-3 max-w-xl text-sm leading-6 text-slate-500">
              {answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}

export default Faq;
