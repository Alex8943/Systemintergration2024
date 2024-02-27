import express from "express"; 
const app = express();

//EMNE: SHORT POLLING: 
//Short polling er en teknik, hvor en klient sender en forespørgsel til serveren for at hente data.
//Problem ved short polling er over fetching. 
//Serveren sender data til klienten, selvom der ikke er noget nyt data.
//Det er ikke rigtig real time data, da det er delay på dataen (f.eks med seks sekunder)

//løsning: Keep alive header

app.use(express.static('public')) //Serves alle filer i public folder

const randomNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

app.get("/random", (req, res) => {
    res.send({data: randomNumbers})
});

app.get("/simulateNewRandomNumbers", (req, res) => {
    const newNumber = getRandomNumber(3, 1001)
    randomNumbers.push(newNumber);
    res.send({data: randomNumbers})
});

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const port = 3000; 
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
