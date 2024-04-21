import express from "express";
const app = express();

app.use(express.static("public"));
//Alt indenfor "video" mappem kan klienten tilgå også "public" mappen
app.use(express.static("videos"));

const PORT = process.env.PORT ?? 8080;
app.listen(PORT, () => console.log("Server is running on port:", PORT));
