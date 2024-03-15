import express from 'express';
import bodyParser from 'body-parser';
import * as webhooks from './webhooks.js';


const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Load existing webhooks from the file
webhooks.loadWebhooksFromFile();

// Register a webhook for 'message sent'
try {
    webhooks.registerWebhook('message sent', 'http://example.com/message-sent-webhook');
  } catch (error) {
    console.error('Error registering webhook:', error.message);
  }
  
  // Register a webhook for 'message received'
  try {
    webhooks.registerWebhook('message received', 'http://example.com/message-received-webhook');
  } catch (error) {
    console.error('Error registering webhook:', error.message);
  }

// Endpoint for registering webhooks
app.post('/webhooks/register', (req, res) => {
  const { eventType, callbackURL } = req.body;
  try {
    webhooks.registerWebhook(eventType, callbackURL);
    res.status(200).json({ message: `Webhook for ${eventType} registered successfully.` });
  } catch (error) {
    res.status(400).json({ error: `Failed to register webhook: ${error.message}` });
  }
});

// Test endpoint for triggering webhooks
app.get('/test', (req, res) => {
  webhooks.triggerWebhooks();
  return res.status(200).json({ message: 'Webhooks triggered successfully.' });
});



// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on localhost:${PORT}`);
});
