export const postWithoutImage = (avatar_url, name, created_at, description, id) => {
    return `<header>
    <img
      class="user-img"
      src='${avatar_url}'
      alt=""
    />
    <span class="name-our-date">
      <p>${name}</p>
      <p>${created_at}</p>
    </span>
    <i class="ph-bold ph-dots-three"></i>
  </header>
  <span class="post-text">
    <p>${description}</p>
  </span>
  <i class="divider"></i>
  <footer post-id=${id}>
    <ul>
      <li>
        <i class="ti ti-thumb-up"></i>
        <p class="like"></p>
      </li>
      <li id="comment-btn">
        <i class="ti ti-message"></i>
        <p class="coments"></p>
      </li>
    </ul>
  </footer>`;
  };
  
  export const postWithImage = (
    avatar_url,
    name,
    created_at,
    description,
    image_url,
    id
  ) => {
    return `  <header>
    <img
      class="user-img"
      src='${avatar_url}'
      alt=""
    />
    <span class="name-our-date">
      <p>${name}</p>
      <p>${created_at}</p>
    </span>
    <i class="ph-bold ph-dots-three"></i>
  </header>
  <span class="post-text">
    <p>${description}</p>
  </span>
  <i class="divider"></i>
  <div class="post-content">
    <div class="img">
      <img
        src=${image_url}
        alt=""
      />
    </div>
  </div>
  <i class="divider"></i>
  
  <footer post-id=${id}>
    <ul>
      <li>
        <i class="ti ti-thumb-up"></i>
        <p class="like"></p>
      </li>
      <li id="comment-btn">
        <i class="ti ti-message"></i>
        <p class="coments"></p>
      </li>
    </ul>
  </footer>`;
  };