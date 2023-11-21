import { app } from "../services/firebase/auth.firebase.js";
import {
  getFirestore,
  arrayUnion,
  onSnapshot,
  collection,
  updateDoc,
  setDoc,
  getDoc,
  addDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";

export const db = getFirestore(app);
export { setDoc, doc, collection };

export class Chat {
  currentUser;
  otherUser;

  /**
   * @param {string} chatId
   * @param {string} userId
   * @param {string} otherUserId
   *
   */
  constructor(currentUser, otherUser) {
    this.currentUser = currentUser;
    this.otherUser = otherUser;
  }

  async initChat(currentUser, otherUser) {
    try {
      const newChat = await addDoc(collection(db, "Mensagens"), {
        mensagens: [],
      });
      const chatId = newChat.id;
      const usersId = [currentUser, otherUser];

      for (let user of usersId) {
        const { id } = user;
        const base = doc(db, "Conversas", id);
        const docSnap = await getDoc(base);
        const date = new Date().toLocaleString();

        if (docSnap.exists()) {
          await updateDoc(base, {
            conversas: arrayUnion({
              id: chatId,
              created: date,
              usuários: [currentUser, otherUser],
            }),
          });
        } else {
          await setDoc(base, {
            conversas: [
              {
                id: chatId,
                created: date,
                usuários: [currentUser, otherUser],
              },
            ],
          });
        }
      }
    } catch (error) {
      return error
    }
  }

  async listConversations(userId) {
    const list = await getDoc(doc(db, "Conversas", userId));
    const listData = list.data().conversas;

    const usersList = listData.map((conversa) => {
      const { id } = conversa;
      const usersInChat = conversa.usuários;

      const otherUsers = usersInChat.filter((user) => {
        if (user.id != userId) return user;
      });

      return otherUsers.map((user) => {
        return { chatId: id, ...user };
      });
    });

    const users = usersList.map((user) => {
      return user[0];
    });

    return users;
  }

  async loadMessages(renderMessage, chatId, localMessages) {
    const docRef = doc(db, "Mensagens", chatId);
    onSnapshot(docRef, (doc) => {
      if (doc.exists()) {
        localMessages.innerHTML = "";
        const messages = doc.data().mensagens;
        if (messages.length == 0) return;
        messages.forEach(async (message) => {
          renderMessage(message);
        });
        localMessages.parentNode.scrollTo(0, localMessages.scrollHeight + 1000);
      }
    });
    return;
  }

  async sendMessage(chatId, message) {
    const base = doc(db, "Mensagens", chatId);
    const messages = await getDoc(base);

    if (messages.exists()) {
      await updateDoc(base, {
        mensagens: arrayUnion(message),
      });
    }
  }
}
