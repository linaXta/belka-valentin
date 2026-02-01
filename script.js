(function () {
  const qs = new URLSearchParams(window.location.search);
  const to = (qs.get("to") || "Милашка").trim();
  const from = (qs.get("from") || "").trim();

  const title = document.getElementById("title");
  const subtitle = document.getElementById("subtitle");

  const yesBtn = document.getElementById("yesBtn");
  const noBtn = document.getElementById("noBtn");
  const buttons = document.getElementById("buttons");

  const result = document.getElementById("result");
  const resultText = document.getElementById("resultText");
  const copyBtn = document.getElementById("copyBtn");
  const copiedMsg = document.getElementById("copiedMsg");

  // Initial texts
  title.textContent = `${to} ,  будешь моим Валентином?`;
  subtitle.textContent = `Конечно я не давлю но мы живём вместе.`;

  // Move the "No" button to a random position
  function moveNoButton() {
    const wrap = buttons.getBoundingClientRect();
    const btn = noBtn.getBoundingClientRect();

    const padding = 8;
    const maxX = Math.max(padding, wrap.width - btn.width - padding);
    const maxY = Math.max(padding, wrap.height - btn.height - padding);

    const x = Math.floor(Math.random() * maxX);
    const y = Math.floor(Math.random() * maxY);

    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;
  }

  // Initial position after load
  window.addEventListener("load", () => {
    setTimeout(moveNoButton, 50);
  });

  // Desktop: run away on hover
  noBtn.addEventListener("mouseenter", moveNoButton);

  // Click on "No"
  noBtn.addEventListener("click", () => {
    moveNoButton();
    subtitle.textContent = `Предатель, выбери правильный ответ`;
  });

  // Mobile: run away on touch
  noBtn.addEventListener(
    "touchstart",
    (e) => {
      e.preventDefault();
      moveNoButton();
      subtitle.textContent = `Предатель, выбери правильный ответ`;
    },
    { passive: false }
  );

  // Click on "Yes"
  yesBtn.addEventListener("click", () => {
    buttons.classList.add("hidden");
    result.classList.remove("hidden");

    const lines = [
      `${from} я так и знала что ты адекватный :*`
    ];
    resultText.textContent = lines.join(" ");

    popHearts();
  });

  // Heart burst animation
  function popHearts() {
    const count = 18;

    for (let i = 0; i < count; i++) {
      const heart = document.createElement("div");
      heart.textContent = Math.random() > 0.5 ? "💜" : "💘";
      heart.style.position = "fixed";
      heart.style.left = `${Math.random() * 100}vw`;
      heart.style.top = `110vh`;
      heart.style.fontSize = `${14 + Math.random() * 22}px`;
      heart.style.zIndex = 9999;
      heart.style.transition = "transform 1.2s ease, opacity 1.2s ease";
      heart.style.opacity = "1";

      document.body.appendChild(heart);

      requestAnimationFrame(() => {
        const lift = 70 + Math.random() * 60;
        heart.style.transform = `translateY(-${lift}vh) rotate(${Math.random() * 80 - 40}deg)`;
        heart.style.opacity = "0";
      });

      setTimeout(() => heart.remove(), 1300);
    }
  }
})();
