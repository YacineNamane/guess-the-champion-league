export function typewriter({
  element,
  texts,
  speed = 60,
  delayBetween = 1200,
}) {
  const lines = texts.map(() => {
    const line = document.createElement("div");
    line.classList.add("type-line");
    element.appendChild(line);
    return line;
  });

  let textIndex = 0;
  let charIndex = 0;

  function type() {
    const currentText = texts[textIndex];
    const currentLine = lines[textIndex];

    currentLine.classList.add("cursor");

    currentLine.textContent = currentText.slice(0, charIndex);
    charIndex++;

    if (charIndex <= currentText.length) {
      setTimeout(type, speed);
    } else {
      currentLine.classList.remove("cursor");

      textIndex++;
      charIndex = 0;

      if (textIndex < texts.length) {
        setTimeout(type, delayBetween);
      }
    }
  }

  if (texts.length > 0) type();
}
