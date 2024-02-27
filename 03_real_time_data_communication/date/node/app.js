console.log(new Date()); //Z står for UTC, hvilket står for Coordinated Universal Time

console.log(Date());

console.log(Date.now()); //Returnerer antal millisekunder siden 1. januar 1970
//Date.now() tager datoen for hvorfra serveren ligger. Derfra skal man altid bruge UTC, når man arbejder med tid .

//ISO 8601 format følger dette format: YYYY-MM-DD eller yyyymmdd

const date = new Date();
const danishTime = new Intl.DateTimeFormat('da-dk').format(date);
console.log(danishTime);

const americanDate = new Intl.DateTimeFormat('en-US').format(date);
console.log(americanDate);


//En anden standard er ICO/IEC 8601, som er en international standard for dato og tid. 
//Denne standard er baseret på ISO 8601 og er en udvidelse af denne.


//Et andet problem med datoer er 32 bit overflow.
//efter Y2038 
//Fix er 64 bit

//En dato


//__________________________________________________________________________________________
//Ngrok intergration mellem to servere, med at sende dato til en anden server

import express from 'express';
import axios from 'axios';

const app = express();

app.get("/", (req, res) => {
    //Time and date ISO format 
    const date = new Date();
    const danishTime = new Intl.DateTimeFormat('da-dk').format(date);
    res.send({date: danishTime, time: date.toString()});



});
app.get("/m", async (req, res) => {
    try {
        const response = await axios.get('https://7ac6-195-249-146-101.ngrok-free.app/utc');
        res.send({date: response.data});
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');  // Handle errors and send an appropriate response
    }
});


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});



