import { useEffect, useState } from "react";
import {
  Check,
  LoaderCircle,
  Play,
  RotateCcw,
  Sparkles,
  WandSparkles,
} from "lucide-react";
import { generateSpeech } from "../services/elevenlabs";

const DEFAULT_VOICE_ID = "JBFqnCBsd6RMkjVDRZzb";
const SAMPLE_TEXTS = [
  "Halo! Selamat datang di Suara.id Generator. Saya siap membaca teks dalam bahasa Indonesia dengan suara natural.",
  "Hari ini adalah hari yang bagus untuk belajar dan berkreasi. Mari kita buat audio dari teks yang sudah kita tulis.",
];

function AudioGenerator() {
  const [text, setText] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    return () => {
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, [audioUrl]);

  const characterCount = text.length;

  async function handleSubmit(event) {
    event.preventDefault();
    const trimmedText = text.trim();

    if (!trimmedText) {
      setError("Masukkan teks terlebih dahulu.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const generatedAudioUrl = await generateSpeech(
        trimmedText,
        DEFAULT_VOICE_ID,
      );
      setAudioUrl(generatedAudioUrl);
    } catch (requestError) {
      setError(requestError.message || "Terjadi kesalahan saat membuat audio.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section
      id="generator"
      className="relative mx-auto max-w-6xl px-5 pb-24 sm:px-8"
    >
      <div className="grid overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_24px_70px_rgba(15,23,42,0.08)] lg:grid-cols-[0.82fr_1.18fr]">
        <div className="bg-[#102a25] p-7 text-white sm:p-10 lg:p-12">
          <div className="mb-16 flex items-center gap-3">
            <div className="grid size-11 place-items-center rounded-2xl bg-[#d8f35d] text-[#102a25]">
              <WandSparkles size={21} />
            </div>
            <span className="font-bold tracking-tight">
              Suara<span className="text-[#d8f35d]">.id</span>
            </span>
          </div>
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-[#d8f35d]">
            Studio suara Indonesia
          </p>
          <h2 className="max-w-sm text-3xl font-black leading-[1.05] tracking-[-0.04em] sm:text-4xl">
            Teks biasa, jadi suara yang berasa.
          </h2>
          <p className="mt-5 max-w-sm text-sm leading-7 text-slate-300">
            Buat narasi yang hangat dan natural untuk video, pembelajaran,
            podcast, dan apa pun yang sedang kamu bangun.
          </p>
          <div className="mt-12 space-y-4 text-sm text-slate-200">
            {[
              "Suara natural berbahasa Indonesia",
              "Proses cepat dengan satu klik",
              "Audio siap diputar dan diunduh",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <span className="grid size-5 place-items-center rounded-full bg-[#d8f35d] text-[#102a25]">
                  <Check size={13} strokeWidth={3} />
                </span>
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className="p-7 sm:p-10 lg:p-12">
          <div className="mb-8 flex items-start justify-between gap-4">
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-emerald-700">
                Mulai membuat
              </p>
              <h2 className="text-2xl font-black tracking-tight text-slate-950">
                Tulis naskahmu
              </h2>
            </div>
            <div className="rounded-full bg-[#f0f6d0] p-3 text-emerald-800">
              <Sparkles size={18} />
            </div>
          </div>
          <div className="mb-7 flex flex-wrap gap-2">
            {SAMPLE_TEXTS.map((sample) => (
              <button
                key={sample}
                type="button"
                onClick={() => setText(sample)}
                className="rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-left text-xs font-semibold text-slate-600 transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-800"
              >
                <Play size={11} className="mr-1 inline" />
                {sample.slice(0, 28)}...
              </button>
            ))}
          </div>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="flex items-center justify-between gap-3">
              <label
                htmlFor="speech-text"
                className="text-sm font-bold text-slate-800"
              >
                Naskah audio
              </label>
              <span className="text-xs font-semibold text-slate-400">
                {characterCount} karakter
              </span>
            </div>
            <textarea
              id="speech-text"
              value={text}
              onChange={(event) => setText(event.target.value)}
              placeholder="Tuliskan teks yang ingin dibacakan..."
              rows={7}
              disabled={isLoading}
              className="min-h-48 w-full resize-y rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm leading-7 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 disabled:cursor-wait disabled:opacity-60"
            />
            <div className="flex flex-col gap-3 pt-1 sm:flex-row">
              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#d8f35d] px-5 py-3.5 text-sm font-black text-[#102a25] shadow-lg shadow-lime-900/10 transition hover:bg-[#c9e84b] disabled:cursor-wait disabled:opacity-60"
              >
                {isLoading ? (
                  <LoaderCircle size={17} className="animate-spin" />
                ) : (
                  <WandSparkles size={17} />
                )}
                {isLoading ? "Membuat audio..." : "Buat audio"}
              </button>
              <button
                type="button"
                onClick={() => setText("")}
                disabled={isLoading}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-5 py-3.5 text-sm font-bold text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
              >
                <RotateCcw size={15} />
                Reset
              </button>
            </div>
          </form>
          {error && (
            <p
              className="mt-5 rounded-xl bg-red-50 p-3 text-sm font-semibold leading-6 text-red-700"
              role="alert"
            >
              {error}
            </p>
          )}
          {audioUrl && (
            <div className="mt-8 border-t border-slate-100 pt-6">
              <p className="mb-3 flex items-center gap-2 text-sm font-black text-emerald-800">
                <span className="grid size-5 place-items-center rounded-full bg-emerald-100">
                  <Check size={12} />
                </span>
                Audio berhasil dibuat
              </p>
              <audio controls autoPlay src={audioUrl} className="w-full">
                Browser Anda tidak mendukung pemutar audio.
              </audio>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default AudioGenerator;
