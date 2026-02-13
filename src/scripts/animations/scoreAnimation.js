export function scoreAnimation(element) {
  gsap.killTweensOf(element);

  gsap.to(element, {
    scale: 1.6,
    duration: 0.15,
    ease: "power2.out",
    yoyo: true,
    repeat: 1,
    overwrite: true,
  });
}
