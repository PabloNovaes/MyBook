import { Adress } from "../class/adress.class.js";
import { Post } from "../class/post.class.js";
import { pageLoader } from "../components/pageLoader/index.js";
import { renderPost } from "../pages/profile/js/posts.js";

export const error = (message) => {
  const Toast = Swal.mixin({
    toast: true,
    position: "bottom-right",
    color: "#e6e6e6",
    showConfirmButton: false,
    timer: 4000,
    timerProgressBar: true,
  });

  Toast.fire({
    icon: "error",
    title: message,
    color: "black",
  });
};

export const success = (message) => {
  const Toast = Swal.mixin({
    toast: true,
    position: "bottom-right",
    color: "#e6e6e6",
    showConfirmButton: false,
    timer: 4000,
    timerProgressBar: true,
  });

  Toast.fire({
    icon: "success",
    title: message,
    color: "black",
  });
};

export const notify = (message, icon) => {
  const Toast = Swal.mixin({
    toast: true,
    position: "bottom-right",
    color: "#e6e6e6",
    showConfirmButton: false,
    timer: 4000,
    timerProgressBar: true,
  });

  Toast.fire({
    icon,
    title: message,
    color: "black",
  });
};

export const startPost = async () => {
  Swal.fire({
    showCancelButton: true,
    confirmButtonText: "Postar",
    cancelButtonText: "Cancelar",
    confirmButtonColor: "#1A57DF",
    html: `
    
    <header>
      <h1>Iniciar publicação</h1>
  </header>

  <div id="text">
  <textarea  id="text-content" cols="30" rows="10" placeholder="Escreva algo..."></textarea>
  </div>
<img id="post-image" src=""/>
  <div id="post-img">
  <input id="select-post-img" class="change-post-img" name="photo" type="file" />
  <label for="select-post-img" class="option">
  <i class="ti ti-photo-edit"></i>
  
  Escolher imagem</label>
  </div>
    `,
    didRender: () => {
      const input = document.querySelector(".change-post-img");
      const modal = document.querySelector(".swal2-modal");
      const img = document.querySelector("#post-image");
      modal.setAttribute("id", "start-post-modal");

      input.addEventListener("change", (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        if (!file) return;

        reader.onloadend = async () => {
          const result = reader.result;
          img.src = result;
          img.style.borderRadius = "1rem";
          img.style.marginBlock = "1rem";
        };

        reader.readAsDataURL(file);
      });
    },
  }).then(async (result) => {
    if (!result.isConfirmed) return;
    pageLoader.startLoader();

    const image_url = document.querySelector("#post-image").getAttribute("src");
    const description = document.querySelector("#text-content").value;
    let created_at = new Date().toLocaleString("pt-BR");

    try {
      const post = new Post(description, created_at, image_url);
      const createPost = await post.createPost(post);
      const newPost = createPost.post;
      const returnNewPost = async () => {
        await renderPost(newPost);
        success("Publicação criada com sucesso");
      };
      return await returnNewPost();
    } catch (error) {
      return error;
    } finally {
      return pageLoader.stopLoader();
    }
  });
};

export const viewImageProfileModal = (img) => {
  Swal.fire({
    html: `<img src="${img}" style="
    max-width: 50rem;">`,
    showConfirmButton: false,
  });
};

export const updateUserDataModal = async (user) => {
  Swal.fire({
    html: `
    <header>
    <h2>Editar dados</h2>
  </header>
  <div class="swal-input-container">
    <div class="input-case">
      <input 
      type="text"
       id="swalName" 
       class="swal2-input" 
       placeholder="Digite seu nome" />
    </div>
  </div>
  <div class="swal-input-container">
    <div class="input-case">
      <input
        id="swalEmail"
        class="swal2-input"
        placeholder="Digite seu email"
      />
    </div>
  </div>
  <div class="swal-input-container">
    <div class="input-case">
      <input
        id="swalNickname"
        class="swal2-input"
        placeholder="Digite seu nome de usuário"
      />
    </div>
  </div>
  <div class="swal-input-container">
    <div class="input-case">
      <input
        id="swalCpf"
        class="swal2-input"
        placeholder="Digite seu CPF"
      />
    </div>
  </div>
  `,
    showCancelButton: true,
    cancelButtonText: "Cancelar",
    background: "#ffffff21",
    confirmButtonColor: "#1A57DF",
    confirmButtonText: "Salvar",
  }).then((result) => {
    if (result.isConfirmed) {
    }
  });
};

export const registerAdressModal = async (loadingNewAdress) => {
  Swal.fire({
    html: `
    <header>
    <h2>Inserir novo endereço</h2>
  </header>
  <div class="swal-input-container">
    <div class="input-case">
      <input 
      type="text"
       id="swalCep" 
       class="swal2-input"
      placeholder="CEP" />
    </div>
  </div>
  <div class="swal-input-container">
    <div class="input-case">
      <input
        id="swalStreet"
        class="swal2-input"
        placeholder="Rua"
      />
    </div>
  </div>
  <div class="swal-input-container">
    <div class="input-case">
      <input
        id="swalDistrict"
        class="swal2-input"
        placeholder="Bairro"
      />
    </div>
  </div>
  <div class="swal-input-container">
    <div class="input-case">
      <input
        id="swalNumber"
        class="swal2-input"
        placeholder="Numero"
      />
    </div>
  </div>
  <div class="swal-input-container">
    <div class="input-case">
      <input
        id="swalUf"
        class="swal2-input"
        placeholder="UF"
      />
    </div>
  </div>
  <div class="swal-input-container">
    <div class="input-case">
      <input
        id="swalCity"
        class="swal2-input"
        placeholder="Cidade"
      />
    </div>
  </div>
  
  `,
    showCancelButton: true,
    cancelButtonText: "Cancelar",
    background: "#ffffff21",
    confirmButtonColor: "#1A57DF",
    confirmButtonText: "Salvar",
    didRender: () => {
      const inputCep = document.getElementById("swalCep");
      const city = document.getElementById("swalCity");
      const UF = document.getElementById("swalUf");
      const district = document.getElementById("swalDistrict");
      const street = document.getElementById("swalStreet");

      inputCep.addEventListener("input", async () => {
        let getCep = inputCep.value;
        if (getCep.length == 8) {
          const result = await fetch(
            `https://viacep.com.br/ws/${getCep}/json/`
          );
          getCep = await result.json();

          const { bairro, logradouro, uf, localidade } = getCep;
          city.value = localidade;
          city.disabled = true

          UF.value = uf;
          UF.disabled = true
          
          district.value = bairro;
          district.disabled = true
          
          street.value = logradouro;
          street.disabled = true
        }
      });
    },
  }).then(async (result) => {
    if (result.isConfirmed) {
      pageLoader.startLoader();
      try {
        const cep = document.getElementById("swalCep").value;
        const city = document.getElementById("swalCity").value;
        const UF = document.getElementById("swalUf").value;
        const district = document.getElementById("swalDistrict").value;
        const street = document.getElementById("swalStreet").value;
        let number = document.getElementById("swalNumber").value;

        number = parseInt(number);
        const adress = new Adress(street, district, cep, number, city, UF);

        const request = await adress.registerNewAdress(adress);
        const response = await request.data;

        if (response.status == "error") {
          return error(response.message);
        }
        setTimeout(() => {
          loadingNewAdress(response.adress);
          success(response.message);
        }, 500);
        return adress;
      } catch (error) {
        throw new Error(error);
      } finally {
        return pageLoader.stopLoader();
      }
    }
  });

  return html;
};

export const commentsModal = async (user) => {
  Swal.fire({
    html: `
    <header>
    <h2>Comentários</h2>
  </header>
  <div class="swal-comments-container">
   <ul id="comments">
    <li>
      <img src="https://github.com/pablonovaes.png">
      <div class="comment-content">
        <p class="user-name">Pablo Novaes</p>
        <p class="comment-text">livro ruimzao</p>
      </div>
    </li>
   
   </ul>
  </div>
  <i class="divider"></i>
 <footer>
    <div id="input-case">
      <input type ="text" placeholder="Faça um comentário"/>
    </div>
    <button>
      <i class="ph-fill ph-paper-plane-right"></i>
    </button>
 </footer>
  `,
    showConfirmButton: false,
    didRender: (e) => {
      const modal = document.querySelector(".swal2-modal");
      modal.setAttribute("id", "comment-modal");
    },
  });
};
