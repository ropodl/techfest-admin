export function useScrollTo(id, offset) {
  if (process.client) {
    var element = document.getElementById(id);
    var headerOffset = offset;
    var elementPosition = element.getBoundingClientRect().top;
    var offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }
}
