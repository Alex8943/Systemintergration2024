import express from 'express';
import bodyParser from 'body-parser';
import registerWebhook from './registerWebhook.js';

const app = express();
const PORT = 8080;

app.use(bodyParser.json());


const exposeeUrl = 'https://alex.serveo.net';
const registrationData = {
    eventType: 'message received',
    callbackURL: 'http://localhost:8080' 
};
registerWebhook(exposeeUrl, registrationData);

app.listen(PORT, () => {
    console.log(`Server is running on localhost:${PORT}`);
});
