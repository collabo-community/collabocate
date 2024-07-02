import express from "express";
import dotenv from "dotenv";
import path from 'path'
import { fileURLToPath } from 'url';

const app = express();
app.use(express.static("public"));

const PORT = process.env.PORT || 8080;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function genericErrorHandler (req, res) {
    res.status(500).sendFile(path.join(__dirname, 'public', 'error.html'));
}

app.listen(PORT, () => {
    console.log(`Client running on port ${PORT}`);
  });


app.all('*', genericErrorHandler);