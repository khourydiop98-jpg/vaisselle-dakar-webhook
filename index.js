const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

const VERIFY_TOKEN = 'asna_whatsapp';
const MAKE_WEBHOOK_1 = 'https://hook.eu1.make.com/jqzvg3s7m7nyqpvfbh7agtv6a2rn25ex';
const MAKE_WEBHOOK_3 = 'https://hook.eu1.make.com/f8p6uo7mzv9hg3d37n0s399s6iyka7q7';
const META_TOKEN = 'EAASSNHnLMcIBR6bI26BSJKOAxTjHsoc6wOZBGFpICz62q9i9dYp7NVnsVp54b2Sg9fAQgQhnAbjoNYJpSWMjGU2GpVqvto4ND8809TzwzTa1eCg4xDbdlbI50o2aZAw1ZC4Se7l3rSPPIM2gbAw5pWCUCZCOZCHEnD5N3m5cZCTnSpm7ZCgzMA2X5f3qes9eW2fZCZAf3s3YASOdCjszwLngiHVAJZBtNL8xKw9zwH';
const PHONE_ID = '1186412447888256';

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
  const body = req.body;
  
  if (body.object === 'whatsapp_business_account') {
    const messages = body.entry?.[0]?.changes?.[0]?.value?.messages;
    
    if (messages && messages.length > 0) {
      const message = messages[0];
      
      if (message.type === 'image') {
        axios.post(MAKE_WEBHOOK_1, body);
      } else if (message.type === 'text') {
        axios.post(MAKE_WEBHOOK_3, body);
      }
    }
  }
  
  res.sendStatus(200);
});

app.listen(3000, () => console.log('Serveur Asna Boutique démarré sur port 3000'));
