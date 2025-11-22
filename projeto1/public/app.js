
import {
  auth,
  provider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  db
} from "./firebase-config.js";

import {
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

// ELEMENTOS DA PÁGINA
const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
const userInfo = document.getElementById("userInfo");
const listaProdutos = document.getElementById("listaProdutos");

// 🔹 LOGIN GOOGLE
loginBtn.addEventListener("click", async () => {
  try {
    await signInWithPopup(auth, provider);
    window.location.href = "produtos.html"; 
  } catch (err) {
    console.error(err);
  }
});

// 🔹 LOGOUT
logoutBtn.addEventListener("click", async () => {
  await signOut(auth);
});

onAuthStateChanged(auth, (user) => {
  if (user) {
    loginBtn.classList.add("hidden");
    logoutBtn.classList.remove("hidden");
    userInfo.textContent = user.displayName;
  } else {
    loginBtn.classList.remove("hidden");
    logoutBtn.classList.add("hidden");
    userInfo.textContent = "";
  }
});

async function carregarProdutos() {
  try {
    const produtosRef = collection(db, "produtos");
    const snapshot = await getDocs(produtosRef);

    listaProdutos.innerHTML = "";
    snapshot.forEach((doc) => {
      let p = doc.data();
      const li = document.createElement("li");
      li.textContent = `${p.nome} - R$ ${p.preco}`;
      listaProdutos.appendChild(li);
    });
  } catch (err) {
    console.error("Erro ao carregar produtos:", err);
  }
}

if (listaProdutos) {
  carregarProdutos();
};
