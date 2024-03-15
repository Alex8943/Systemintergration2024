import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs';
import path from 'path';
import { json } from 'express';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// File path for storing registered webhooks
const webhooksFilePath = path.join(__dirname, 'webhook.txt');

// In-memory storage for registered webhooks
let registeredWebhooks = [];

// Load registered webhooks from the file
function loadWebhooksFromFile() {
  try {
    const data = fs.readFileSync(webhooksFilePath, 'utf-8');
    if (data.trim() !== '') {
      registeredWebhooks = JSON.parse(data);
      console.log("Webhook data:", registeredWebhooks); 
    }
  } catch (error) {
    // Log detailed error information
    console.error('Error loading webhooks:', error.message);
    if (error instanceof SyntaxError) {
      console.error('Syntax error at position:', error.at);
    }
  }
}


// Register a webhook
function registerWebhook(eventType, callbackURL) {
  const existingWebhook = registeredWebhooks.find(webhook => webhook.eventType === eventType);

  
  // Push the new webhook to the registeredWebhooks array
  registeredWebhooks.push({ eventType, callbackURL });
  
  // Save the updated list of webhooks to the file
  saveWebhooksToFile();
}

// Save registered webhooks to the file
function saveWebhooksToFile() {
  const data = JSON.stringify(registeredWebhooks, null, 2); // Convert to JSON format
  fs.writeFileSync(webhooksFilePath, data, 'utf-8'); // Write data to the file
}




// Trigger all registered webhooks
function triggerWebhooks() {
  registeredWebhooks.forEach(webhook => {
    console.log(`Calling webhook for event type: ${webhook.eventType}`);
    // In a real system, you would send data to the callback URLs
  });
}

export { 
    loadWebhooksFromFile, 
    registerWebhook,
    triggerWebhooks, 
    saveWebhooksToFile
 };
