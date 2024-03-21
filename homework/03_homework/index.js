import express from "express"; 

const app = express();


app.get("/get-data-txt", async (req, res) => {
    const response = await fetch('http://localhost:3000/txt');
    const result = await response.json();
    res.send(result);
}); 

app.get("/get-data-csv", async (req, res) => {
    const response = await fetch('http://localhost:3000/csv');
    const result = await response.json();
    res.send(result);
});

app.get("/get-data-yaml", async (req, res) => {
    const response = await fetch('http://localhost:3000/yaml');
    const result = await response.json();
    res.send(result);
});

app.get("/get-data-xml", async (req, res) => {
    const response = await fetch('http://localhost:3000/xml');
    const result = await response.text();
    res.send(result);
});

app.get("/get-data-json", async (req, res) => {
    const response = await fetch('http://localhost:3000/json');
    const result = await response.json();
    res.send(result);
});


app.listen(8080, err => {
    if (err) {
        return console.error(err);
    }
    console.log("Server is running on port 8080");
})