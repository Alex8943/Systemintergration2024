import express from 'express';
import bodyParser from 'body-parser';
import registerWebhook from './registerWebhook.js';

const app = express();
const PORT = 8080;

app.use(bodyParser.json());



const exposeeUrl = 'http://localhost:3000';
const registrationData = {
    eventType: 'message received',
    callbackURL: 'http://localhost:8080' 
};

// Simulate periodic processing of 'message received' events every 4 seconds
setInterval(() => {
    console.log("Processing 'message received' ");  
    registerWebhook(exposeeUrl, registrationData);
}, 10000); // 4000 milliseconds = 4 seconds



app.listen(PORT, () => {
    console.log(`Server is running on localhost:${PORT}`);
});
