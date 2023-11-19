const loader = document.getElementById("loader-page");

export const pageLoader = {
  startLoader() {
    loader.classList.add("fade-in");
  },
  stopLoader() {
    loader.classList.remove("fade-in");
    loader.classList.add("fade-out");
  },
};
