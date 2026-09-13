const ELEVENLABS_API_URL = "https://api.elevenlabs.io/v1/text-to-speech";
const MODEL_ID = "eleven_flash_v2_5";

export async function generateSpeech(text, voiceId) {
  const apiKey = import.meta.env.VITE_ELEVENLABS_API_KEY;

  if (!apiKey || apiKey === "your_api_key_here") {
    throw new Error(
      "API key ElevenLabs belum dikonfigurasi di file .env.local.",
    );
  }

  const response = await fetch(`${ELEVENLABS_API_URL}/${voiceId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "audio/mpeg",
      "xi-api-key": apiKey,
    },
    body: JSON.stringify({
      text,
      model_id: MODEL_ID,
    }),
  });

  if (!response.ok) {
    const errorDetails = await response.text();
    throw new Error(
      `Gagal membuat audio (${response.status}): ${errorDetails || response.statusText}`,
    );
  }

  const audioBlob = await response.blob();
  return URL.createObjectURL(audioBlob);
}
