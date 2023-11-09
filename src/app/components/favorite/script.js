const closeFavoriteBtn = document.querySelector("#favorite .ph-x"),
  favorite = document.querySelector("#favorite");

export const openAndCloseFavorite = () => {
  document.body.classList.toggle("hidden");
  favorite.classList.toggle("open-fav");
  const windowWidth =
    window.innerWidth > 664
      ? shadow.classList.toggle("viewShadow")
      : shadow.classList.remove("viewShadow");
};

closeFavoriteBtn.addEventListener("click", openAndCloseFavorite);
