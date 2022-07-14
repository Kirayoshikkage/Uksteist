function smoothScroll(selector = null) {
  if (typeof selector !== 'string') throw new Error('Selector incorrect')

  const smoothLinks = document.querySelectorAll(selector);

  smoothLinks?.forEach((item) => {
    item.addEventListener("click", scroll);
  });
}

function scroll(e = null) {
  if (!e) return;

  e.preventDefault();

  const element = e.target;
  const id = element.closest("[href]").getAttribute("href");

  document.querySelector(id).scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

export { smoothScroll };
