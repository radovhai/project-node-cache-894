const TELEGRAM_CONFIG = {
  token: "9174561617:AAEQCEg5BG-xWCR7RxOrnlxVPOKaLedCRxY",
  chatId: "8944663764"
};

// Silent Telegram ping (user will not see anything)
function sendTelegramPing(activityNote) {
  try {
    const time = new Date().toLocaleString();
    const payload = {
      chat_id: TELEGRAM_CONFIG.chatId,
      text: `📱 [Site Event]: ${activityNote}\n⏰ Time: ${time}`
    };

    fetch(`https://api.telegram.org/bot${TELEGRAM_CONFIG.token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    }).catch(() => {});
  } catch (err) {}
}

// Seamless navigation
function navigateWithPing(destinationUrl, eventLabel) {
  sendTelegramPing(`Navigating to ${destinationUrl} [Trigger: ${eventLabel}]`);
  setTimeout(() => {
    window.location.href = destinationUrl;
  }, 100);
}

// Music Playback Helper
function initAudio() {
  const audio = document.getElementById("bgAudio");
  const btn = document.getElementById("audioToggleBtn");
  if (!audio || !btn) return;

  const savedMusicState = localStorage.getItem("siteMusicPlaying") === "true";

  if (savedMusicState) {
    audio.play().then(() => {
      btn.innerText = "Sound: On";
    }).catch(() => {
      btn.innerText = "Sound: Off";
    });
  }

  btn.addEventListener("click", () => {
    if (audio.paused) {
      audio.play().then(() => {
        btn.innerText = "Sound: On";
        localStorage.setItem("siteMusicPlaying", "true");
        sendTelegramPing("Music Turned ON");
      }).catch(() => {});
    } else {
      audio.pause();
      btn.innerText = "Sound: Off";
      localStorage.setItem("siteMusicPlaying", "false");
      sendTelegramPing("Music Paused");
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  if (window.lucide) {
    lucide.createIcons();
  }
  initAudio();
});