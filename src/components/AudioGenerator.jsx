import { useEffect, useState } from "react";
import { generateSpeech } from "../services/elevenlabs";

const DEFAULT_VOICE_ID = "JBFqnCBsd6RMkjVDRZzb";
const SAMPLE_TEXTS = [
  "Halo! Selamat datang di IndoTTS Generator. Saya siap membaca teks dalam bahasa Indonesia dengan suara natural.",
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
    <main style={styles.page}>
      <div style={styles.glowOne} />
      <div style={styles.glowTwo} />

      <section style={styles.card}>
        <div style={styles.headerRow}>
          <div style={styles.iconBadge}>🎙️</div>
          <span style={styles.badge}>ElevenLabs</span>
        </div>

        <p style={styles.eyebrow}>Text-to-Speech</p>
        <h1 style={styles.title}>Ubah teks menjadi suara</h1>
        <p style={styles.description}>
          Masukkan teks berbahasa Indonesia, lalu hasilkan audio dengan satu
          klik untuk kebutuhan edukasi, demo, atau konten digital.
        </p>

        <div style={styles.exampleRow}>
          {SAMPLE_TEXTS.map((sample) => (
            <button
              key={sample}
              type="button"
              onClick={() => setText(sample)}
              style={styles.exampleButton}
            >
              {sample.slice(0, 32)}...
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.labelRow}>
            <label htmlFor="speech-text" style={styles.label}>
              Teks
            </label>
            <span style={styles.counter}>{characterCount} karakter</span>
          </div>

          <textarea
            id="speech-text"
            value={text}
            onChange={(event) => setText(event.target.value)}
            placeholder="Tuliskan teks yang ingin dibacakan..."
            rows={7}
            disabled={isLoading}
            style={styles.textarea}
          />

          <div style={styles.actionRow}>
            <button
              type="submit"
              disabled={isLoading}
              style={styles.primaryButton}
            >
              {isLoading ? "Membuat audio..." : "Buat audio"}
            </button>
            <button
              type="button"
              onClick={() => setText("")}
              disabled={isLoading}
              style={styles.secondaryButton}
            >
              Reset
            </button>
          </div>
        </form>

        {error && (
          <p style={styles.error} role="alert">
            {error}
          </p>
        )}

        {audioUrl && (
          <div style={styles.audioSection}>
            <p style={styles.audioLabel}>Audio berhasil dibuat</p>
            <audio controls autoPlay src={audioUrl} style={styles.audio}>
              Browser Anda tidak mendukung pemutar audio.
            </audio>
          </div>
        )}
      </section>
    </main>
  );
}

const styles = {
  page: {
    position: "relative",
    minHeight: "100vh",
    display: "grid",
    placeItems: "center",
    padding: "2rem 1rem",
    background:
      "linear-gradient(135deg, #eff6ff 0%, #f8fafc 50%, #ecfeff 100%)",
    color: "#172033",
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
    overflow: "hidden",
  },
  glowOne: {
    position: "absolute",
    width: "320px",
    height: "320px",
    borderRadius: "50%",
    background: "rgba(59, 130, 246, 0.12)",
    filter: "blur(40px)",
    top: "10%",
    left: "8%",
  },
  glowTwo: {
    position: "absolute",
    width: "360px",
    height: "360px",
    borderRadius: "50%",
    background: "rgba(14, 165, 233, 0.14)",
    filter: "blur(48px)",
    bottom: "8%",
    right: "10%",
  },
  card: {
    position: "relative",
    zIndex: 1,
    width: "min(100%, 760px)",
    padding: "clamp(1.5rem, 4vw, 2.5rem)",
    border: "1px solid rgba(148, 163, 184, 0.2)",
    borderRadius: "24px",
    background: "rgba(255, 255, 255, 0.88)",
    boxShadow: "0 24px 80px rgba(15, 23, 42, 0.12)",
    backdropFilter: "blur(10px)",
  },
  headerRow: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    marginBottom: "1rem",
  },
  iconBadge: {
    width: "42px",
    height: "42px",
    display: "grid",
    placeItems: "center",
    borderRadius: "12px",
    background: "linear-gradient(135deg, #dbeafe 0%, #c7d2fe 100%)",
    fontSize: "1.3rem",
  },
  badge: {
    padding: "0.45rem 0.7rem",
    borderRadius: "999px",
    background: "#ebf5ff",
    color: "#0f5fa6",
    fontSize: "0.75rem",
    fontWeight: 800,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
  },
  eyebrow: {
    margin: 0,
    color: "#2563eb",
    fontSize: "0.72rem",
    fontWeight: 700,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
  },
  title: {
    margin: "0.7rem 0 0.6rem",
    fontSize: "clamp(2rem, 5vw, 3.1rem)",
    lineHeight: 1.1,
  },
  description: {
    margin: "0 0 1.5rem",
    color: "#475569",
    lineHeight: 1.7,
    fontSize: "1.03rem",
  },
  exampleRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: "0.6rem",
    marginBottom: "1.5rem",
  },
  exampleButton: {
    border: "1px solid #dbeafe",
    background: "#f8fbff",
    color: "#0f172a",
    borderRadius: "999px",
    padding: "0.55rem 0.85rem",
    cursor: "pointer",
    font: "inherit",
    fontSize: "0.8rem",
  },
  form: { display: "grid", gap: "0.85rem" },
  labelRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "0.75rem",
  },
  label: { fontWeight: 700, fontSize: "0.95rem" },
  counter: {
    color: "#64748b",
    fontSize: "0.82rem",
    fontWeight: 600,
  },
  textarea: {
    width: "100%",
    boxSizing: "border-box",
    padding: "1rem 1.1rem",
    border: "1px solid #cbd5e1",
    borderRadius: "16px",
    background: "#f8fafc",
    font: "inherit",
    lineHeight: 1.6,
    resize: "vertical",
    transition: "border-color 0.2s ease, box-shadow 0.2s ease",
    outline: "none",
    boxShadow: "0 0 0 0 rgba(59,130,246,0.3)",
  },
  actionRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: "0.75rem",
    marginTop: "0.25rem",
  },
  primaryButton: {
    flex: "1 1 220px",
    padding: "0.9rem 1.25rem",
    border: 0,
    borderRadius: "12px",
    background: "linear-gradient(135deg, #0f7fe5 0%, #1554c9 100%)",
    color: "#ffffff",
    cursor: "pointer",
    font: "inherit",
    fontWeight: 700,
    boxShadow: "0 12px 28px rgba(21, 84, 201, 0.22)",
  },
  secondaryButton: {
    padding: "0.9rem 1rem",
    border: "1px solid #cbd5e1",
    borderRadius: "12px",
    background: "#ffffff",
    color: "#334155",
    cursor: "pointer",
    font: "inherit",
    fontWeight: 700,
  },
  error: {
    margin: "1rem 0 0",
    color: "#b42318",
    lineHeight: 1.5,
    fontWeight: 600,
  },
  audioSection: {
    marginTop: "2rem",
    paddingTop: "1.5rem",
    borderTop: "1px solid #e2e8f0",
  },
  audioLabel: {
    margin: "0 0 0.9rem",
    fontWeight: 800,
    color: "#0f172a",
  },
  audio: { width: "100%", borderRadius: "12px" },
};

export default AudioGenerator;
