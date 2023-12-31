import {
  updateUserDataModal,
  registerAdressModal,
  startPost,
  viewImageProfileModal,
  error,
} from "../../../sweetAlert/sweet.js";
import { User } from "../../../class/user.class.js";
import { Adress } from "../../../class/adress.class.js";
import { getPostsByUser } from "./posts.js";
import {
  getOrders,
  renderOrders,
  setOrdersQuantityPerStatus,
} from "./orders.js";
import { pageLoader } from "../../../components/pageLoader/index.js";

//order navigation buttons
const awaitPaymentOrderPageBtn = document.querySelector("#pending-payment");
const evaluateProductPageBtn = document.querySelector("span#assessment");
const awaitSentOrderPageBtn = document.querySelector("#await-sent");
const sentProductPageBtn = document.querySelector("#sent-product");

const ordersControll = document.querySelectorAll("#track-purchase nav span");
const tabsBtn = document.querySelectorAll("#navigation p");
const openAccountAdresses = document.querySelector("#adress-tab");
const editAccountDataBtn = document.querySelector("#edit-data");
const openAccountData = document.querySelector("#account-tab");
const assessmentLink = document.querySelector("#assessment");
const adressesList = document.querySelector("#adresses ul");
const settingsBtn = document.querySelector("#settings-tab");
const addAdressBtn = document.querySelector("#add-adress");
const startPostBtn = document.querySelector("#start-post");
const accountLink = document.querySelector("#my-account");

const input = document.querySelector("#change-img");
const img = document.querySelector("#user-img");

const viewProfileImage = document.querySelector("#image-options ul li");
const imgOptions = document.querySelector("#image-options");
const hideImgOptions = imgOptions.querySelector("header");
const controllsOptions = imgOptions.querySelectorAll("ul .option");

const user = new User();
const adress = new Adress();

function renderAdresses(adress) {
  const { cep, city, uf, district, id, number, street } = adress;

  const adressElement = document.createElement("li");
  adressElement.classList.add("adress");
  adressElement.setAttribute("data-id", id);
  adressElement.innerHTML = `
      <i class="ti ti-map-pin"></i>
      <div class="data">
        <span class="adress-info">
          ${street}, ${number}, <br>${district}, ${city}, ${uf}, ${cep}
        </span>
      </div>
    `;

  adressesList.appendChild(adressElement);
}

async function renderUserData() {
  try {
    pageLoader.startLoader();
    const displayName = document.querySelector("#name");
    const userName = document.querySelector("#user-name");
    const accountName = document.querySelector('[data-id="name"]');
    const accountNickname = document.querySelector('[data-id="nickname"]');
    const accountEmail = document.querySelector('[data-id="email"]');
    const accountId = document.querySelector('[data-id="id"]');
    const accountCpf = document.querySelector('[data-id="cpf"]');

    const userData = await user.handleUserData();
    const { name, avatar_url, nickname, email, id, cpf } = userData.data;

    displayName.textContent = name;
    userName.textContent = nickname;
    img.src = avatar_url;
    accountEmail.textContent = email;
    accountNickname.textContent = nickname;
    accountId.textContent = id;
    accountName.textContent = name;
    accountCpf.textContent = cpf;
  } catch (error) {
    return err;
  } finally {
    return pageLoader.stopLoader();
  }
}

function openTab(event, tabName) {
  let i, tabContent, tabButton;

  tabContent = document.getElementsByClassName("tab-content");
  for (i = 0; i < tabContent.length; i++) {
    tabContent[i].classList.remove("fade-in-page");
    tabContent[i].style.display = "none";
  }

  tabButton = document.getElementsByClassName("tab-button");
  for (i = 0; i < tabButton.length; i++) {
    tabButton[i].className = tabButton[i].className.replace(" active", "");
  }

  document.getElementById(tabName).style.display = "flex";
  document.getElementById(tabName).classList.add("fade-in-page");

  return tabName;
}

editAccountDataBtn.addEventListener("click", async () => {
  const values = document.querySelectorAll(
    "#view-account-data #data ul li p.value"
  );

  const user = new Map();

  for (let i = 0; i < values.length; i++) {
    user.set(values[i].getAttribute("data-id"), values[i].textContent);
  }

  updateUserDataModal(JSON.stringify(Object.fromEntries(user)));
});

assessmentLink.addEventListener("click", () => {
  openTab(event, "publications");
});

accountLink.addEventListener("click", () => {
  openTab(event, "account");
});

settingsBtn.addEventListener("click", () => {
  const page = openTab(event, "account-settings");
  const backBtn = document.querySelector(`#${page}`).querySelector("#back-to");

  backBtn.addEventListener("click", () => {
    openTab(event, "account");
  });
});

awaitSentOrderPageBtn.addEventListener("click", () => {
  const page = openTab(event, "order-awaiting-sent");
  const backBtn = document.querySelector(`#${page}`).querySelector("#back-to");

  backBtn.addEventListener("click", () => {
    openTab(event, "account");
  });
});

awaitPaymentOrderPageBtn.addEventListener("click", () => {
  const page = openTab(event, "order-pending-payment");
  const backBtn = document.querySelector(`#${page}`).querySelector("#back-to");

  backBtn.addEventListener("click", () => {
    openTab(event, "account");
  });
});

sentProductPageBtn.addEventListener("click", () => {
  const page = openTab(event, "order-dispatched");
  const backBtn = document.querySelector(`#${page}`).querySelector("#back-to");

  backBtn.addEventListener("click", () => {
    openTab(event, "account");
  });
});

evaluateProductPageBtn.addEventListener("click", () => {
  const page = openTab(event, "order-evaluate-product");
  const backBtn = document.querySelector(`#${page}`).querySelector("#back-to");

  backBtn.addEventListener("click", () => {
    openTab(event, "account");
  });
});

openAccountData.addEventListener("click", () => {
  const page = openTab(event, "view-account-data");
  const backBtn = document.querySelector(`#${page}`).querySelector("#back-to");

  backBtn.addEventListener("click", () => {
    openTab(event, "account-settings");
  });
});

openAccountAdresses.addEventListener("click", () => {
  const page = openTab(event, "view-adress");
  const backBtn = document.querySelector(`#${page}`).querySelector("#back-to");

  backBtn.addEventListener("click", () => {
    openTab(event, "account-settings");
  });
});

startPostBtn.addEventListener("click", async () => {
  const createPost = await startPost();
  return createPost;
});

tabsBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    tabsBtn.forEach((btn) => {
      btn.classList.remove("active");
    });
    btn.classList.toggle("active");
  });
});

function viewOrHideOptions() {
  imgOptions.classList.toggle("view-image-options");
  document.body.classList.toggle("hidden");
  shadow.classList.toggle("viewShadow");
}

controllsOptions.forEach((btn) => {
  btn.addEventListener("click", viewOrHideOptions);
});

input.addEventListener("change", async (e) => {
  user.updateUserImage(e, img);
});

addAdressBtn.addEventListener("click", async () => {
  await registerAdressModal(renderAdresses);
});

viewProfileImage.addEventListener("click", () => {
  viewImageProfileModal(img.src);
});

img.addEventListener("click", viewOrHideOptions);

hideImgOptions.addEventListener("click", viewOrHideOptions);

async function loadOrders() {
  const orders = await getOrders();

  if (!orders) return;

  localStorage.setItem("orders", JSON.stringify(orders));
  setOrdersQuantityPerStatus(orders, ordersControll);

  orders.forEach((order) => {
    try {
      renderOrders(order);
    } catch (error) {
      throw new Error(error);
    }
  });
}

try {
  await Promise.allSettled([
    renderUserData(),
    loadOrders(),
    getPostsByUser(),
    adress.getAdress(renderAdresses),
  ]);
} catch (err) {
  throw new Error(err);
}
