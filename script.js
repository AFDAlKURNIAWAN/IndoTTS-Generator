const synth = window.speechSynthesis;
// Set this only for local testing. Production requests belong on a backend.
const ELEVENLABS_API_KEY = "";
const ELEVENLABS_VOICE_ID = "21m00Tcm4TlvDq8ikWAM";
const ELEVENLABS_MODEL_ID = "eleven_multilingual_v2";
const textInput = document.getElementById("textInput");
const characterCount = document.getElementById("characterCount");
const convertButton = document.getElementById("btnConvert");
const playButton = document.getElementById("btnPlay");
const playLabel = document.getElementById("playLabel");
const stopButton = document.getElementById("btnStop");
const speedSelect = document.getElementById("speedSelect");
const progressBar = document.getElementById("progressBar");
const statusMessage = document.getElementById("statusMessage");
const timeLabel = document.getElementById("timeLabel");
const durationLabel = document.getElementById("durationLabel");
const engineLabel = document.getElementById("engineLabel");
const downloadButton = document.getElementById("downloadButton");
let voices = [];
let chunks = [];
let chunkIndex = 0;
let isPaused = false;
let progressTimer = null;
let audioUrl = "";
let audioElement = null;
let activeEngine = "";
let speechRetryCount = 0;

function formatTime(seconds) {
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
}

function loadVoices() {
  voices = synth ? synth.getVoices() : [];
}

function getIndonesianVoice() {
  return (
    voices.find((voice) => voice.lang.toLowerCase() === "id-id") ||
    voices.find((voice) => voice.lang.toLowerCase().startsWith("id")) ||
    voices[0] ||
    null
  );
}

function waitForVoices() {
  loadVoices();
  if (voices.length || !synth) return Promise.resolve();
  return new Promise((resolve) => {
    const timeout = window.setTimeout(resolve, 1000);
    synth.addEventListener(
      "voiceschanged",
      () => {
        window.clearTimeout(timeout);
        loadVoices();
        resolve();
      },
      { once: true },
    );
  });
}

function splitText(text, maxLength = 180) {
  const sentences = text.match(/[^.!?]+[.!?]+|[^.!?]+$/g) || [text];
  const result = [];
  let current = "";
  sentences.forEach((sentence) => {
    if ((current + sentence).length > maxLength && current) {
      result.push(current.trim());
      current = "";
    }
    current += `${sentence} `;
  });
  if (current.trim()) result.push(current.trim());
  return result;
}

function resetProgress() {
  window.clearInterval(progressTimer);
  progressBar.value = 0;
  timeLabel.textContent = "Siap diputar";
  playLabel.textContent = "Putar artikel";
  playButton.querySelector(".play-icon").textContent = "▶";
}

function showStatus(message) {
  statusMessage.textContent = message;
}

function updateCharacterCount() {
  characterCount.textContent = `${textInput.value.length}/500`;
}

function resetAudio() {
  if (audioElement) audioElement.pause();
  if (audioUrl) URL.revokeObjectURL(audioUrl);
  audioUrl = "";
  downloadButton.hidden = true;
  playButton.disabled = true;
  stopButton.disabled = true;
  resetProgress();
}

function setPlayerReady(engine) {
  activeEngine = engine;
  engineLabel.textContent =
    engine === "elevenlabs"
      ? "ElevenLabs · suara natural"
      : "Mode suara standar · perangkat";
  playButton.disabled = false;
  stopButton.disabled = false;
}

function fallbackToSpeech(text) {
  if (!synth || !window.SpeechSynthesisUtterance) {
    showStatus("Browser ini tidak mendukung Web Speech API.");
    return;
  }
  setPlayerReady("speech");
  chunks = splitText(text);
  chunkIndex = 0;
  speechRetryCount = 0;
  showStatus("Mesin utama tidak tersedia, menggunakan mode suara standar.");
}

async function requestElevenLabs(text) {
  if (!ELEVENLABS_API_KEY) throw new Error("ElevenLabs API key belum diatur");
  const response = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${ELEVENLABS_VOICE_ID}`,
    {
      method: "POST",
      headers: {
        Accept: "audio/mpeg",
        "Content-Type": "application/json",
        "xi-api-key": ELEVENLABS_API_KEY,
      },
      body: JSON.stringify({
        text,
        model_id: ELEVENLABS_MODEL_ID,
        voice_settings: { stability: 0.5, similarity_boost: 0.75 },
      }),
    },
  );
  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`ElevenLabs error ${response.status}: ${detail}`);
  }
  return response.blob();
}

async function convertText() {
  const text = textInput.value.trim();
  if (!text) {
    showStatus("Tulis teks terlebih dahulu.");
    textInput.focus();
    return;
  }
  if (synth) synth.cancel();
  resetAudio();
  convertButton.disabled = true;
  convertButton.textContent = "Mengubah menjadi suara...";
  showStatus("Menghubungkan ke mesin suara utama...");
  try {
    const blob = await requestElevenLabs(text);
    audioUrl = URL.createObjectURL(blob);
    audioElement = new Audio(audioUrl);
    audioElement.addEventListener("loadedmetadata", () => {
      durationLabel.textContent = formatTime(audioElement.duration);
    });
    audioElement.addEventListener("timeupdate", () => {
      if (audioElement.duration) {
        progressBar.value =
          (audioElement.currentTime / audioElement.duration) * 100;
        timeLabel.textContent = formatTime(audioElement.currentTime);
      }
    });
    audioElement.addEventListener("ended", finishAudioPlayback);
    setPlayerReady("elevenlabs");
    downloadButton.href = audioUrl;
    downloadButton.hidden = false;
    showStatus("Audio siap diputar.");
  } catch (error) {
    fallbackToSpeech(text);
    if (error instanceof TypeError) {
      showStatus(
        "ElevenLabs tidak dapat diakses. Periksa koneksi atau nonaktifkan Shields untuk halaman ini.",
      );
    } else if (error.message.includes("401")) {
      showStatus(
        "API key ElevenLabs ditolak atau sudah dicabut. Menggunakan suara standar.",
      );
    } else if (error.message.includes("429")) {
      showStatus("Kuota ElevenLabs habis. Menggunakan suara standar.");
    } else {
      showStatus("ElevenLabs gagal dimuat. Menggunakan suara standar.");
    }
  } finally {
    convertButton.disabled = false;
    convertButton.innerHTML =
      '<span aria-hidden="true">◉</span> Ubah Jadi Suara';
  }
}

function finishPlayback() {
  window.clearInterval(progressTimer);
  chunkIndex = 0;
  isPaused = false;
  progressBar.value = 100;
  timeLabel.textContent = durationLabel.textContent;
  playLabel.textContent = "Putar ulang";
  playButton.querySelector(".play-icon").textContent = "▶";
  stopButton.disabled = true;
  statusMessage.textContent = "Selesai.";
}

function finishAudioPlayback() {
  playLabel.textContent = "Putar ulang";
  playButton.querySelector(".play-icon").textContent = "▶";
  stopButton.disabled = true;
  progressBar.value = 100;
  showStatus("Selesai.");
}

async function speakNextChunk() {
  if (!synth || chunkIndex >= chunks.length) {
    finishPlayback();
    return;
  }
  await waitForVoices();
  const utterance = new SpeechSynthesisUtterance(chunks[chunkIndex]);
  utterance.lang = "id-ID";
  utterance.rate = Number(speedSelect.value);
  utterance.voice = getIndonesianVoice();
  utterance.onstart = () => {
    stopButton.disabled = false;
    showStatus("Sedang membacakan teks...");
    const estimatedSeconds = Math.max(
      1,
      Math.round(
        textInput.value.trim().length / 13 / Number(speedSelect.value),
      ),
    );
    durationLabel.textContent = formatTime(estimatedSeconds);
    progressTimer = window.setInterval(() => {
      const progress = ((chunkIndex + 0.5) / chunks.length) * 100;
      progressBar.value = Math.min(99, progress);
      timeLabel.textContent = formatTime(
        Math.round((estimatedSeconds * progress) / 100),
      );
    }, 400);
  };
  utterance.onend = () => {
    window.clearInterval(progressTimer);
    chunkIndex += 1;
    speakNextChunk();
  };
  utterance.onerror = (event) => {
    window.clearInterval(progressTimer);
    if (event.error === "canceled" || event.error === "interrupted") return;
    if (speechRetryCount < 1) {
      speechRetryCount += 1;
      synth.cancel();
      window.setTimeout(() => speakNextChunk(), 100);
      return;
    }
    stopButton.disabled = true;
    const errorLabel = event.error || "unknown";
    showStatus(
      voices.length
        ? `Suara perangkat gagal (${errorLabel}). Periksa izin audio Brave.`
        : "Voice perangkat tidak tersedia. Pasang voice Indonesia di sistem atau gunakan ElevenLabs.",
    );
  };
  synth.speak(utterance);
}

function startPlayback() {
  if (!synth || !window.SpeechSynthesisUtterance) {
    statusMessage.textContent = "Browser ini belum mendukung text-to-speech.";
    return;
  }
  if (activeEngine === "elevenlabs" && audioElement) {
    audioElement.play().catch(() => {
      showStatus("Audio diblokir browser. Tekan tombol putar sekali lagi.");
    });
    playLabel.textContent = "Jeda";
    playButton.querySelector(".play-icon").textContent = "Ⅱ";
    showStatus("Sedang memutar audio...");
    return;
  }
  if (isPaused) {
    synth.resume();
    isPaused = false;
    playLabel.textContent = "Jeda";
    playButton.querySelector(".play-icon").textContent = "Ⅱ";
    showStatus("Sedang membacakan teks...");
    return;
  }
  if (!isPaused) {
    synth.cancel();
    if (!chunks.length) chunks = splitText(textInput.value.trim());
    chunkIndex = 0;
    speechRetryCount = 0;
    resetProgress();
  }
  playLabel.textContent = "Jeda";
  playButton.querySelector(".play-icon").textContent = "Ⅱ";
  speakNextChunk();
}

playButton.addEventListener("click", () => {
  if (activeEngine === "elevenlabs" && audioElement) {
    if (audioElement.paused) startPlayback();
    else {
      audioElement.pause();
      playLabel.textContent = "Lanjutkan";
      playButton.querySelector(".play-icon").textContent = "▶";
      showStatus("Dijeda.");
    }
    return;
  }
  if (isPaused) startPlayback();
  else if (synth && synth.speaking) {
    synth.pause();
    isPaused = true;
    playLabel.textContent = "Lanjutkan";
    playButton.querySelector(".play-icon").textContent = "▶";
    statusMessage.textContent = "Dijeda.";
  } else startPlayback();
});

stopButton.addEventListener("click", () => {
  if (synth) synth.cancel();
  if (audioElement) audioElement.pause();
  isPaused = false;
  chunkIndex = 0;
  speechRetryCount = 0;
  stopButton.disabled = true;
  resetProgress();
  showStatus("Audio dihentikan.");
});

speedSelect.addEventListener("change", () => {
  if (activeEngine === "elevenlabs" && audioElement) {
    audioElement.playbackRate = Number(speedSelect.value);
    return;
  }
  if (synth && synth.speaking) {
    synth.cancel();
    isPaused = false;
    startPlayback();
  }
});

progressBar.addEventListener("input", () => {
  if (activeEngine === "elevenlabs" && audioElement && audioElement.duration) {
    audioElement.currentTime =
      (Number(progressBar.value) / 100) * audioElement.duration;
    return;
  }
  const selectedChunk = Math.floor(
    (Number(progressBar.value) / 100) * chunks.length,
  );
  if (chunks.length && selectedChunk !== chunkIndex) {
    chunkIndex = selectedChunk;
    if (synth) synth.cancel();
    isPaused = false;
    startPlayback();
  }
});

textInput.addEventListener("input", updateCharacterCount);
convertButton.addEventListener("click", convertText);

if (!synth || !window.SpeechSynthesisUtterance) {
  showStatus("Browser ini belum mendukung mode suara cadangan.");
} else {
  loadVoices();
  synth.addEventListener("voiceschanged", loadVoices);
}
