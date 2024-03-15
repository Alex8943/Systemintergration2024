import express from 'express';
import bodyParser from 'body-parser';
import registerWebhook from './registerWebhook.js';

const app = express();
const PORT = 8080;

app.use(bodyParser.json());

// Example usage of registerWebhook function
const exposeeUrl = 'http://localhost:3000'; // Corrected Exposee server URL
const registrationData = {
    eventType: 'message received', // Use the correct event type
    callbackURL: 'http://localhost:8080' // Endpoint in the Integrator server to handle webhook notifications
};
registerWebhook(exposeeUrl, registrationData);

app.listen(PORT, () => {
    console.log(`Server is running on localhost:${PORT}`);
});
