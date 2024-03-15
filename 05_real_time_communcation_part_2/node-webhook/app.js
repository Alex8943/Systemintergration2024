import express from 'express';
const app = express();


//Github webhook code example
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/githubwebhookjson", (req, res) => {
    res.status(req.body);
    res.sendStatus(204)
});

app.post("/githubwebhookform", (req, res) => {
    console.log(req.body)
    res.sendStatus(204)
});

app.listen(3000, () => {
    console.log('Server running on localhost:3000');
});