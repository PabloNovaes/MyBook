import "https://unpkg.com/scrollreveal";
const sr = ScrollReveal({ reset: true });

sr.reveal(".post", {
  origin: "bottom",
  scale: 1,
  distance: "1.5rem",
  duration: 800,
  reset: false,
  zIndex: 0,
  beforeReveal: (post) => {
    post.style = "";
  },
});

sr.reveal("#start-post", {
  origin: "bottom",
  scale: 1,
  delay: 100,
  distance: "1.5rem",
  duration: 800,
  reset: false,
});

sr.reveal("#user-name", {
  origin: "bottom",
  scale: 1,
  delay: 200,
  distance: "1rem",
  duration: 800,
  reset: false,
});

sr.reveal("#user-img", {
  origin: "bottom",
  scale: 1,
  delay: 200,
  distance: "1rem",
  duration: 800,
  reset: false,
});

sr.reveal("#user-info", {
  origin: "bottom",
  scale: 1,
  delay: 200,
  distance: "1rem",
  duration: 800,
  reset: false,
});

sr.reveal("#navigation", {
  origin: "bottom",
  scale: 1,
  delay: 200,
  distance: "1rem",
  duration: 800,
  reset: false,
});
