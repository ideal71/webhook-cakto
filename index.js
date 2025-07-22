const express = require("express");
const app = express();
app.use(express.json());

app.post("/webhook", (req, res) => {
  const { nome, email, telefone } = req.body;

  console.log("✅ Lead recebido:");
  console.log("Nome:", nome || "não informado");
  console.log("Email:", email || "não informado");
  console.log("Telefone:", telefone || "não informado");

  res.status(200).send("OK");
});

app.get("/", (req, res) => {
  res.send("✅ Webhook da Cakto está online");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});