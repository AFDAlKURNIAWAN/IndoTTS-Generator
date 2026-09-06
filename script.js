const speechSynthesis = window.speechSynthesis;
let selectedVoice = null;

if (!speechSynthesis || !window.SpeechSynthesisUtterance) {
  document.getElementById("statusMessage").textContent =
    "Browser ini belum mendukung fitur text-to-speech.";
  document.getElementById("btnPlay").disabled = true;
}

function loadVoices() {
  if (!speechSynthesis) return;
  const voices = speechSynthesis.getVoices();
  selectedVoice =
    voices.find((voice) => voice.lang.toLowerCase().startsWith("id")) ||
    voices[0] ||
    null;
}

if (speechSynthesis) {
  loadVoices();
  speechSynthesis.addEventListener("voiceschanged", loadVoices);
}

function generateTTS() {
  const text = document.getElementById("textInput").value.trim();
  const speed = document.getElementById("speedSelect").value;
  const voiceName = document.getElementById("voiceSelect").value;
  const btnPlay = document.getElementById("btnPlay");
  const btnStop = document.getElementById("btnStop");
  const statusMessage = document.getElementById("statusMessage");

  if (!speechSynthesis || !window.SpeechSynthesisUtterance) {
    statusMessage.textContent =
      "Browser ini belum mendukung fitur text-to-speech.";
    return;
  }

  if (!text) {
    statusMessage.textContent = "Silakan masukkan teks terlebih dahulu.";
    return;
  }

  stopTTS();
  const utterance = new SpeechSynthesisUtterance(text);
  const isIndonesian = ["Gwyneth", "Ida", "Ardi"].includes(voiceName);
  const languagePrefix = isIndonesian ? "id" : "en";
  utterance.lang = isIndonesian ? "id-ID" : "en-US";
  utterance.rate = Number(speed);
  const matchingVoice = speechSynthesis
    .getVoices()
    .find((voice) => voice.lang.toLowerCase().startsWith(languagePrefix));
  if (matchingVoice) {
    utterance.voice = matchingVoice;
  }
  utterance.onstart = () => {
    btnPlay.disabled = true;
    btnStop.disabled = false;
    statusMessage.textContent = "Sedang memutar suara...";
  };
  utterance.onend = () => {
    btnPlay.disabled = false;
    btnStop.disabled = true;
    statusMessage.textContent = "Selesai.";
  };
  utterance.onerror = () => {
    btnPlay.disabled = false;
    btnStop.disabled = true;
    statusMessage.textContent =
      "Suara gagal diputar. Coba browser lain atau pendekkan teks.";
  };
  speechSynthesis.speak(utterance);
}

function stopTTS() {
  if (speechSynthesis) {
    speechSynthesis.cancel();
  }
  document.getElementById("btnPlay").disabled = false;
  document.getElementById("btnStop").disabled = true;
}
