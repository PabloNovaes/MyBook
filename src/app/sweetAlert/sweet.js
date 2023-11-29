import { Adress } from "../class/adress.class.js";
import { Post } from "../class/post.class.js";
import { User } from "../class/user.class.js";
import { pageLoader } from "../components/pageLoader/index.js";
import { renderPost } from "../pages/profile/js/posts.js";

export const error = (message) => {
  const Toast = Swal.mixin({
    toast: true,
    position: "bottom-right",
    color: "#e6e6e6",
    showConfirmButton: false,
    timer: 1800,
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
    timer: 1800,
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

export const updateUserDataModal = async (data) => {
  const userData = JSON.parse(data);
  const { name, email, nickname, cpf } = userData;
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
       placeholder="Digite seu nome" 
       value = ${name}
       />
    </div>
  </div>
  <div class="swal-input-container">
    <div class="input-case">
      <input
        id="swalEmail"
        class="swal2-input"
        placeholder="Digite seu email"
        value= ${email}
      />
    </div>
  </div>
  <div class="swal-input-container">
    <div class="input-case">
      <input
        id="swalNickname"
        class="swal2-input"
        placeholder="Digite seu nome de usuário"
        value= ${nickname}
      />
    </div>
  </div>
  <div class="swal-input-container">
    <div class="input-case">
      <input
        id="swalCpf"
        class="swal2-input"
        placeholder="Digite seu CPF"
        value= ${cpf}
      />
    </div>
  </div>
  `,
    showCancelButton: true,
    cancelButtonText: "Cancelar",
    background: "#ffffff21",
    confirmButtonColor: "#1A57DF",
    confirmButtonText: "Salvar",
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const data = {
          name: document.querySelector("#swalName").value,
          nickname: document.querySelector("#swalNickname").value,
          cpf: document.querySelector("#swalCpf").value,
          email: document.querySelector("#swalEmail").value,
        };

        const user = new User();
        const sendData = await user.updateUserData(data);

        return sendData;
      } catch (err) {
        return error(`Ocorreu um erro inesperado! ${err}`);
      }
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
          city.disabled = true;

          UF.value = uf;
          UF.disabled = true;

          district.value = bairro;
          district.disabled = true;

          street.value = logradouro;
          street.disabled = true;
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
        loadingNewAdress(response.adress);
        success(response.message);
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

export const setPaymentMethods = (element) => {
  Swal.fire({
    showCancelButton: false,
    confirmButtonText: "Confirmar",
    cancelButtonText: "Cancelar",
    confirmButtonColor: "#1A57DF",
    html: `
    <header>
    <h1>Métodos de pagamento</h1>
    <p>
    <i class="ti ti-shield-check-filled"></i>
      Esolha um método para prosseguir 
    </p>
    </header>
    <div>
  <ul>
    <li>
      <input type="checkbox" name="" id="card">
      <span class="method-data">
        <i class="ph-fill ph-credit-card"></i>
        <p>Cartao de crédito</p>
      </span>
    </li>
    <li>
      <input type="checkbox" name="" id="boleto" >
      <span class="method-data">
        <i class="ph-fill ph-barcode"></i>
        <p>Boleto</p>
      </span>
    </li>
  </ul>
</div>
    `,
    didRender: () => {
      const paymentnModal = document.querySelector(".swal2-popup");
      paymentnModal.classList.add("payment-modal");

      const inputs = paymentnModal.querySelectorAll("ul li input");

      inputs.forEach((input) => {
        input.addEventListener("click", (e) => {
          inputs.forEach((checkbox) => (checkbox.checked = false));
          e.target.checked = true;
        });
      });
    },
  }).then(async (result) => {
    if (result.isConfirmed) {
      const options = {
        boleto: ` <i class="ph-fill ph-barcode"></i>
        <p>Boleto</p>`,
        card: ` <i class="ph-fill ph-credit-card"></i>
        <p>Cartão de crédito</p>`,
      };

      const inputs = document.querySelectorAll(".payment-modal li input");
      const checkedInput = Array.from(inputs).filter((checkbox) => {
        return checkbox.checked == true;
      });

      const method = checkedInput[0].getAttribute("id");
      element.removeAttribute("method");
      element.setAttribute("method", method);
      return (element.querySelector("span").innerHTML = options[method]);
    }
  });
};

export const setAdressFromOrder = (element, adresses) => {
  Swal.fire({
    showCancelButton: false,
    confirmButtonText: "Confirmar",
    cancelButtonText: "Cancelar",
    confirmButtonColor: "#1A57DF",
    html: `
    <header>
    <h1>Endereços de entrega</h1>
    <p>
    <i class="ti ti-package"></i>
      Esolha um endereço para prosseguir 
    </p>
    </header>
    <div>
  <ul id="adress-list">
   
  </ul>
</div>
    `,
    didRender: () => {
      const setAddressModal = document.querySelector(".swal2-popup");
      setAddressModal.classList.add("adress-modal");

      const adressList = setAddressModal.querySelector("#adress-list");

      adresses.forEach((adress) => {
        const { street, district, cep, number, id, uf, city } = adress;
        const li = document.createElement("li");
        li.innerHTML = `
        <input type="checkbox" name="" id=${id}>
      <span class="adress-data">
        <p> ${street}, ${number}, <br>${district}, ${city}, ${uf}, ${cep}</p>
      </span>
        `;

        adressList.appendChild(li);
      });

      const inputs = setAddressModal.querySelectorAll("ul li input");

      inputs.forEach((input) => {
        input.addEventListener("click", (e) => {
          inputs.forEach((checkbox) => (checkbox.checked = false));
          e.target.checked = true;
        });
      });
    },
  }).then(async (result) => {
    if (result.isConfirmed) {
      const inputs = document.querySelectorAll(".adress-modal li input");

      const checkedInput = Array.from(inputs).filter((checkbox) => {
        return checkbox.checked == true;
      });

      element.removeAttribute("adress")
      element.setAttribute("adress-id", checkedInput[0].getAttribute("id"));

      const selectedAdressData =
        checkedInput[0].parentElement.querySelector("p").textContent;


      return (element.querySelector("span").innerHTML = selectedAdressData);
    }
  });
};
