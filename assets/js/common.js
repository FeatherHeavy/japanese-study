function speak(text) {
  if (!window.speechSynthesis || !text) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "ja-JP";
  u.rate = 0.85;
  const voice = speechSynthesis.getVoices().find((v) => v.lang.startsWith("ja"));
  if (voice) u.voice = voice;
  speechSynthesis.speak(u);
}

function ready(fn) {
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", fn);
  else fn();
}

ready(() => {
  const btn = document.querySelector(".menu-btn");
  const nav = document.querySelector(".nav");
  if (btn && nav) btn.addEventListener("click", () => nav.classList.toggle("open"));
});
