export function playAnimation() {
  const btn = document.querySelector(".play-btn");
  if (!btn) return;

  const left = btn.querySelector(".left");
  const right = btn.querySelector(".right");
  const top = btn.querySelector(".top");
  const bottom = btn.querySelector(".bottom");

  btn.addEventListener("mouseenter", () => {
    const tl = gsap.timeline();

    tl.to(left, {
      scaleY: 1,
      duration: 0.3,
      ease: "power2.out",
    });

    tl.to(
      right,
      {
        scaleY: 1,
        duration: 0.3,
        ease: "power2.out",
      },
      0.1,
    );

    tl.to(
      top,
      {
        scaleX: 1,
        duration: 0.25,
        ease: "power2.out",
      },
      0.15,
    );

    tl.to(
      bottom,
      {
        scaleX: 1,
        duration: 0.25,
        ease: "power2.out",
      },
      0.2,
    );
  });

  btn.addEventListener("mouseleave", () => {
    gsap.to([left, right], {
      scaleY: 0,
      duration: 0.25,
      ease: "power2.in",
    });

    gsap.to([top, bottom], {
      scaleX: 0,
      duration: 0.25,
      ease: "power2.in",
    });
  });
}
