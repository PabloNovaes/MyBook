export const pageLoader = {
  element: document.querySelector("#loader-page"),
  startLoader() {
    this.element.style.display = "grid";
    this.element.classList.add("fade-in");
  },
  stopLoader() {
    this.element.classList.remove("fade-in");
    this.element.classList.add("fade-out");
    this.element.style.display = "none";
  },
};
