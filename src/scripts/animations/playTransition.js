export function playTransition(onPlay) {
  const btn = document.querySelector(".play-btn");
  if (!btn) return;

  btn.addEventListener("click", () => {
    const landing = document.querySelector(".landing-page");

    const overlay = document.createElement("div");
    overlay.style.position = "fixed";
    overlay.style.top = 0;
    overlay.style.left = 0;
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.backgroundColor = "#111111";
    overlay.style.zIndex = 9999;
    overlay.style.opacity = 0;
    document.body.appendChild(overlay);

    const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });

    tl.to(overlay, { opacity: 1, duration: 0.4 });
    tl.to(landing, { opacity: 0, duration: 0.3 }, "<");

    tl.add(() => {
      if (typeof onPlay === "function") onPlay();

      gsap.fromTo(
        overlay,
        { opacity: 1 },
        {
          opacity: 0,
          duration: 0.4,
          ease: "power2.out",
          onComplete: () => overlay.remove(),
        },
      );
    });
  });
}
