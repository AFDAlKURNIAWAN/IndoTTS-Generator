import { useEffect, useState } from "react";
import { generateSpeech } from "../services/elevenlabs";

const DEFAULT_VOICE_ID = "JBFqnCBsd6RMkjVDRZzb";

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
      <section style={styles.card}>
        <p style={styles.eyebrow}>ElevenLabs Text-to-Speech</p>
        <h1 style={styles.title}>Ubah teks menjadi suara</h1>
        <p style={styles.description}>
          Masukkan teks berbahasa Indonesia, lalu hasilkan audio dengan satu
          klik.
        </p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <label htmlFor="speech-text" style={styles.label}>
            Teks
          </label>
          <textarea
            id="speech-text"
            value={text}
            onChange={(event) => setText(event.target.value)}
            placeholder="Tuliskan teks yang ingin dibacakan..."
            rows={7}
            disabled={isLoading}
            style={styles.textarea}
          />
          <button type="submit" disabled={isLoading} style={styles.button}>
            {isLoading ? "Membuat audio..." : "Buat audio"}
          </button>
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
    minHeight: "100vh",
    display: "grid",
    placeItems: "center",
    padding: "2rem 1rem",
    background: "#f4f7fb",
    color: "#172033",
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
  },
  card: {
    width: "min(100%, 680px)",
    padding: "clamp(1.5rem, 5vw, 3rem)",
    border: "1px solid #dbe3ef",
    borderRadius: "16px",
    background: "#ffffff",
    boxShadow: "0 16px 40px rgba(31, 55, 88, 0.1)",
  },
  eyebrow: {
    margin: 0,
    color: "#2878b5",
    fontSize: "0.8rem",
    fontWeight: 700,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
  },
  title: { margin: "0.5rem 0", fontSize: "clamp(2rem, 5vw, 3rem)" },
  description: { margin: "0 0 2rem", color: "#5d6b80", lineHeight: 1.6 },
  form: { display: "grid", gap: "0.75rem" },
  label: { fontWeight: 700 },
  textarea: {
    width: "100%",
    boxSizing: "border-box",
    padding: "0.9rem 1rem",
    border: "1px solid #bdc9d9",
    borderRadius: "10px",
    font: "inherit",
    lineHeight: 1.5,
    resize: "vertical",
  },
  button: {
    marginTop: "0.5rem",
    padding: "0.85rem 1.25rem",
    border: 0,
    borderRadius: "10px",
    background: "#176b9f",
    color: "#ffffff",
    cursor: "pointer",
    font: "inherit",
    fontWeight: 700,
  },
  error: { margin: "1rem 0 0", color: "#b42318", lineHeight: 1.5 },
  audioSection: {
    marginTop: "2rem",
    paddingTop: "1.5rem",
    borderTop: "1px solid #e4e9f0",
  },
  audioLabel: { margin: "0 0 0.75rem", fontWeight: 700 },
  audio: { width: "100%" },
};

export default AudioGenerator;
