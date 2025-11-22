import { 
  auth, 
  db, 
  signOut, 
  onAuthStateChanged 
} from "./firebase-config.js";

import { 
  collection, addDoc, getDocs, deleteDoc, doc, updateDoc 
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";


window.addEventListener("DOMContentLoaded", () => {

  const logoutBtn = document.getElementById("logoutBtn");
  const form = document.getElementById("formProduto");
  const lista = document.getElementById("listaProdutos");

  //------------------------
  // VERIFICA LOGIN
  //------------------------
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      window.location.replace("index.html");
      return;
    }

    console.log("Usuário logado:", user.email);
    carregarProdutos();
  });

  //------------------------
  // LOGOUT
  //------------------------
  logoutBtn.addEventListener("click", async () => {
    await signOut(auth);
    window.location.replace("index.html");
  });

  //------------------------
  // ADICIONAR PRODUTO
  //------------------------
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nome = document.getElementById("nome").value;
    const preco = parseFloat(document.getElementById("preco").value);

    if (!nome || !preco) return alert("Preencha todos os campos!");

    await addDoc(collection(db, "produtos"), { nome, preco });

    form.reset();
    carregarProdutos();
  });

  //------------------------
  // CARREGAR PRODUTOS
  //------------------------
  async function carregarProdutos() {
    const snap = await getDocs(collection(db, "produtos"));
    lista.innerHTML = "";

    snap.forEach((docu) => {
      const p = docu.data();
      const li = document.createElement("li");

      li.innerHTML = `
        <span>${p.nome} - R$ ${p.preco.toFixed(2)}</span>
        <div>
          <button onclick="editarProduto('${docu.id}', '${p.nome}', ${p.preco})">✏️</button>
          <button onclick="excluirProduto('${docu.id}')">🗑️</button>
        </div>
      `;

      lista.appendChild(li);
    });
  }

  //------------------------
  // EXCLUIR PRODUTO
  //------------------------
  window.excluirProduto = async (id) => {
    if (confirm("Deseja excluir este produto?")) {
      await deleteDoc(doc(db, "produtos", id));
      carregarProdutos();
    }
  };

  //------------------------
  // EDITAR PRODUTO
  //------------------------
  window.editarProduto = async (id, nomeAtual, precoAtual) => {
    const novoNome = prompt("Novo nome:", nomeAtual);
    const novoPreco = parseFloat(prompt("Novo preço:", precoAtual));

    if (novoNome && novoPreco) {
      await updateDoc(doc(db, "produtos", id), { nome: novoNome, preco: novoPreco });
      carregarProdutos();
    }
  };
});
