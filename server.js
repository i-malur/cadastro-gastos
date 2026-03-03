require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));
app.post("/enviar", async (req, res) => {
  try {
    const response = await fetch(process.env.GOOGLE_SCRIPT_URL, {
      method: "POST",
      body: new URLSearchParams(req.body)
    });

    res.json({ status: "ok" });
  } catch (error) {
    res.status(500).json({ status: "erro" });
  }
});

const PORT = process.env.PORT || 3001;

app.get('/enviar', (req, res) => {
  res.send("Rota enviar funcionando!");
});


app.listen(PORT, () => 
  console.log(`Servidor rodando na porta ${PORT}`)
);