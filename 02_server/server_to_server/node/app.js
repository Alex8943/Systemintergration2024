import express from 'express';

const app = express();


app.get("/expressData", (req, res) => {
    res.send({"message": "isRunning"});
});

app.get('/fastAPIData', async (req, res) => {
    const response = await fetch('http://localhost:8000/pythonData');
    const result = await response.json();
    res.send(result);
});

const PORT = 8080;
app.listen(PORT, () => {
    console.log('Server is running on port ', PORT);
});

