const chatBox = document.getElementById("chatBox");
const msgField = document.getElementById("msgField");
const sendBtn = document.getElementById("sendBtn");

function addMessage(text, isBot = false) {
  const div = document.createElement("div");
  div.className = isBot ? "botMsg" : "userMsg";
  div.innerText = text;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}

async function enviarParaServidor(texto) {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: texto })
  });

  const data = await res.json();
  return data.reply;
}

sendBtn.addEventListener("click", async () => {
  const msg = msgField.value.trim();
  if (!msg) return;

  addMessage(msg, false);
  msgField.value = "";

  const resposta = await enviarParaServidor(msg);
  addMessage(resposta, true);
});
