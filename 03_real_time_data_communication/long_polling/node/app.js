import express from 'express';
const app = express();

const clients = [];

//Det long polling udnytter er at vi kan holde en forbindelse åben i lang tid, 
//og så sende data tilbage til klienten når vi har noget nyt.

//Det der er fordelen ved long polling er, at vi ikke overfetcher data,
//Vi venter faktisk på at der er ny data. 

app.get("/events/subsrcibe", (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    clients.push(res);

    req.on('close', () => {
        console.log("Connection request ", clients.length);
        clients.filter(client => client !== res);
        console.log("Connection closed ", clients.length);

    });
});


app.get("/events/publish", (req, res) => {
    const newData = {data : "This is a new message"}

    clients.forEach(client => {
        client.send(newData); 
    })

    clients = [];

    res.status(204).end();

});



app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
