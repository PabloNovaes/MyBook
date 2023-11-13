import axios from "../../../services/axios/axios.js";
import { auth } from "../services/firebase/auth.firebase.js";
import { collection, db, doc, setDoc } from "../class/chat.class.js";

export class User {
  email;
  name;
  lastName;
  password;
  id;
  avatar_url;
  /**
   * @param {string || null} password
   * @param {string} avatar_url
   * @param {string} email
   * @param {string} name
   * @param {string} id
   */
  constructor(email, name, password, id, avatar_url) {
    this.avatar_url = avatar_url;
    this.password = password;
    this.email = email;
    this.name = name;
    this.id = id;
  }

  async singInWithEmailAndPassword(user) {
    JSON.stringify(user);

    const request = await axios.post("/login", user);
    const response = await request.data;

    return response;
  }

  async signInwithGoogle(user) {
    JSON.stringify(user);

    const request = await axios.post("/auth", user);
    const response = await request.data;

    return response;
  }

  async registerWithEmailAndPassword(user) {
    JSON.stringify(user);

    const request = await axios.post("/create", user);
    const response = await request.data;

    const { id } = response.user;
    const docRef = doc(collection(db, "Conversas"), id);
    await setDoc(docRef, {
      conversas: [],
    });

    return response;
  }

  async registerWithGoogle(user) {
    JSON.stringify(user);

    const request = await axios.post("/create", user);
    const response = await request.data;

    const { id } = response.user;
    const docRef = doc(collection(db, "Conversas"), id);
    await setDoc(docRef, {
      conversas: [],
    });

    return response;
  }

  async signOut(alert, clearCookie) {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        alert("Usuário desconectado");
        localStorage.removeItem("User");
        return clearCookie("Auth");
      }

      auth.signOut().then((user) => {
        clearCookie("Auth");
        localStorage.removeItem("User");
        return alert("Usuário desconectado");
      });
    });
  }

  async renderAnotherUserData(id) {
    let userId = {
      id,
    };

    userId = JSON.stringify(userId);
    const result = await axios.post("/users/id", userId);
    const data = await result.data;

    if (!data?.status) {
      return;
    }

    return data;
  }

  async handleUserData() {
    const result = await axios.get("/users");
    const data = await result.data;

    if (!data?.status) {
      return;
    }

    return data;
  }

  updateUserImage(e, img) {
    const file = e.target.files[0];
    const reader = new FileReader();

    if (!file) return;

    reader.onloadend = async () => {
      const result = reader.result;
      let imgUrl = {
        url: result,
      };

      console.log(imgUrl.url);
      JSON.stringify(imgUrl);

      const response = await axios.post("/users/update-image", imgUrl);
      const data = await response;

      return (img.src = reader.result);
    };

    reader.readAsDataURL(file);
  }

  async updateUserData(data) {
    try {
      JSON.stringify(data);
      const request = await axios.post("/users/update-data", data);
      const response = request.data;
      return response;
    } catch (error) {
      return error;
    }
  }
}
