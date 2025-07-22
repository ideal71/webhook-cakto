const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 10000;

app.post('/', (req, res) => {
  const data = req.body;
  console.log("✅ Lead recebido:");

  const metadata = data.metadata || [];

  // Extrai valores na ordem (ajuste se necessário)
  const nome = metadata[0] ? Object.values(metadata[0])[0] : "não informado";
  const email = metadata[1] ? Object.values(metadata[1])[0] : "não informado";
  const telefone = metadata[2] ? Object.values(metadata[2])[0] : "não informado";

  console.log("Nome:", nome);
  console.log("Email:", email);
  console.log("Telefone:", telefone);

  res.status(200).send('Lead recebido com sucesso!');
});

app.get('/', (req, res) => {
  res.send('✅ Webhook da Cakto está online');
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
