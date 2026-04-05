const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

const VERIFY_TOKEN = 'asna_whatsapp';
const MAKE_WEBHOOK = 'https://hook.eu1.make.com/iwk9xw2ddjoiva4x8s1eij3wjf70wyll';

app.get('/webhook', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];
  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

app.post('/webhook', (req, res) => {
  axios.post(MAKE_WEBHOOK, req.body);
  res.sendStatus(200);
});

app.listen(3000, () => console.log('Serveur démarré sur port 3000'));
