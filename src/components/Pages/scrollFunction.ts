export function backUp(): void {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
}
export function backDown(): void {
  window.scrollTo({
    top: document.body.scrollHeight,
    left: 0,
    behavior: "smooth",
  });
}
