const express = require('express');
const app = express();
const port = process.env.PORT || 10000;

app.use(express.json());

const leads = {};

app.post('/', (req, res) => {
  const body = req.body;

  if (!body || !body.id || !body.metadata) {
    return res.status(400).send('❌ Payload inválido');
  }

  const leadId = body.id;
  const metadatas = body.metadata;

  if (!leads[leadId]) {
    leads[leadId] = { nome: null, email: null, telefone: null };
  }

  metadatas.forEach(item => {
    const [key, value] = Object.entries(item)[0];
    const valor = (value || '').toLowerCase();

    if (valor.includes('@')) {
      leads[leadId].email = value;
    } else if (valor.match(/^\(?\d{2}\)?\s?9?\d{4}-?\d{4}$/) || valor.includes('9999')) {
      leads[leadId].telefone = value;
    } else if (valor !== 'click') {
      leads[leadId].nome = value;
    }
  });

  const lead = leads[leadId];
  console.log('✅ Lead recebido:');
  console.log('Nome:', lead.nome || 'não informado');
  console.log('Email:', lead.email || 'não informado');
  console.log('Telefone:', lead.telefone || 'não informado');

  if (lead.nome && lead.email && lead.telefone) {
    console.log('🎯 LEAD COMPLETO:', lead);
  }

  res.sendStatus(200);
});

app.get('/', (req, res) => {
  res.send('✅ Webhook da Cakto está online');
});

app.listen(port, () => {
  console.log(`🚀 Servidor rodando na porta ${port}`);
});
