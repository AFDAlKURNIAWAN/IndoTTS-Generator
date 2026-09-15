function Tutorial() {
  const steps = [
    ["01", "Tulis", "Masukkan naskah yang ingin kamu dengarkan."],
    ["02", "Buat audio", "Klik tombol dan biarkan Suara.id bekerja."],
    ["03", "Dengarkan", "Putar hasilnya, lalu gunakan untuk karyamu."],
  ];
  return (
    <section
      id="cara-kerja"
      className="bg-[#102a25] px-5 py-20 text-white sm:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#d8f35d]">
          Cara kerja
        </p>
        <h2 className="mb-12 max-w-lg text-3xl font-black tracking-tight sm:text-4xl">
          Dari ide ke suara dalam tiga langkah.
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          {steps.map(([number, title, copy]) => (
            <div key={number} className="border-t border-white/20 pt-5">
              <span className="text-sm font-bold text-[#d8f35d]">{number}</span>
              <h3 className="mt-12 text-xl font-black">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-300">{copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Tutorial;
