var element = document.getElementById("contentLayout");
export function backUp(): void {
  element?.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
}
export function backDown(): void {
  element?.scrollTo({
    top: element.scrollHeight,
    left: 0,
    behavior: "smooth",
  });
}
