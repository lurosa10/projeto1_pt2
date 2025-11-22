// server.js (CommonJS)

const express = require("express");
const path = require("path");
const { OpenAI } = require("openai");

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const openai = new OpenAI({
  apiKey: "" // não consegui deixar a chave na variável de ambiente e subir no git 
});

// ROTA DA IA
app.post("/api/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    const completion = await openai.responses.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "Você é o assistente da loja da Luana." },
        { role: "user", content: userMessage }
      ]
    });

    // AQUI estava o erro 🔥
    res.json({ reply: completion.output[0].content[0].text });

  } catch (err) {
    console.log("Erro IA:", err);
    res.status(500).json({ reply: "Erro ao acessar IA" });
  }
});

// iniciar servidor
app.listen(port, () => {
  console.log(`🔥 Servidor rodando: http://localhost:${port}`);
});
