import { parseTxtToJson, parseCSVToJson, parseXmlToJson, parseYamlToJson, parseJsonToTxt } from './file_handling.js';
import express from 'express';

const app = express();

app.get("/txt", (req, res) => {
    try {
        const jsonResult = parseTxtToJson();
        res.send(jsonResult);
    } catch (error) {
        console.error("Error with txt file: ", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.get("/csv", (req, res) => {
    try {
        const jsonResult = parseCSVToJson();
        res.send(jsonResult);
    } catch (error) {
        console.error("Error with CSV file: ", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.get("/json", (req, res) => {
    try {
        const jsonResult = parseJsonToTxt();
        const person = { name: "John", age: 30, city: "New York"}
        res.send(person);
    } catch (error) {
        console.error("Error with JSON file: ", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.get("/xml", (req, res) => {
    try {
        const jsonResult = parseXmlToJson();
        res.send(jsonResult);
    } catch (error) {
        console.error("Error with XML file: ", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


app.get("/yaml", (req, res) => {
    try {
        const jsonResult = parseYamlToJson();
        res.send(jsonResult);
    } catch (error) {
        console.error("Error with yaml file: ", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
})