import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs';
import path from 'path';
import { json } from 'express';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const webhooksFilePath = path.join(__dirname, 'webhook.txt');


let registeredWebhooks = [];

function loadWebhooksFromFile() {
  try {
    const data = fs.readFileSync(webhooksFilePath, 'utf-8');
    if (data.trim() !== '') {
      registeredWebhooks = JSON.parse(data);
      console.log("Webhook data:", registeredWebhooks); 
    }
  } catch (error) {
    
    console.error('Error loading webhooks:', error.message);
    if (error instanceof SyntaxError) {
      console.error('Syntax error at position:', error.at);
    }
  }
}



function registerWebhook(eventType, callbackURL) {

  registeredWebhooks.push({ eventType, callbackURL });
  
  
  saveWebhooksToFile();
}


function saveWebhooksToFile() {
  const data = JSON.stringify(registeredWebhooks, null, 2); 
  fs.writeFileSync(webhooksFilePath, data, 'utf-8'); 
}



function triggerWebhooks() {
  registeredWebhooks.forEach(webhook => {
    console.log(`Calling webhook for event type: ${webhook.eventType}`);
    
  });
}


// Simulate sending 'message sent' event every 4 seconds
setInterval(() => {
  triggerWebhooks();
}, 4000); // 4000 milliseconds = 4 seconds


export { 
    loadWebhooksFromFile, 
    registerWebhook,
    triggerWebhooks, 
    saveWebhooksToFile
 };
