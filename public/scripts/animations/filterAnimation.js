export function animateFiltersTable() {
  const table = document.getElementById("filtersTable");
  if (!table) return;

  const header = table.querySelector("thead");
  const rows = table.querySelectorAll("tbody tr");

  gsap.from(table, {
    opacity: 0,
    scale: 0.98,
    duration: 0.3,
    ease: "power2.out",
  });

  gsap.from(header, {
    opacity: 0,
    y: -10,
    duration: 0.3,
    ease: "power2.out",
    delay: 0.1,
  });

  gsap.from(rows, {
    opacity: 0,
    y: 12,
    duration: 0.35,
    stagger: 0.05,
    ease: "power2.out",
    delay: 0.15,
  });
}

export function animateLastRow() {
  const rows = document.querySelectorAll("#filtersTable tbody tr");
  const lastRow = rows[rows.length - 1];
  if (!lastRow) return;

  gsap.from(lastRow, {
    opacity: 0,
    y: 10,
    duration: 0.25,
    ease: "power1.out",
  });
}

export function animateChampionRow(row, onComplete) {
  if (!row) return;

  const cells = row.querySelectorAll("td");

  gsap.fromTo(
    cells,
    { scale: 0.5, opacity: 0 },
    {
      scale: 1,
      opacity: 1,
      duration: 1.5,
      ease: "back.out(1.7)",
      stagger: 0.05,
      onComplete,
    },
  );
}
