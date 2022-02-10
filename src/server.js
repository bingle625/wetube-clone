import express from "express";

const app = express();
const PORT = 4000;


const handleListening = () => console.log(`Server listening on port 4000! http://localhost:${PORT}`);

app.listen(PORT, handleListening);