export const pageLoader = {
  element: document.querySelector("#loader-page"),

  startLoader() {
    this.element.classList.add("fade-in");
  },
  stopLoader() {
    this.element.classList.remove("fade-in");
    this.element.classList.add("fade-out");
    this.element.classList.remove("fade-out");
  },
};
