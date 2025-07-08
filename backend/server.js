// server.js
const express = require("express");
const cors = require("cors");

const cadastroRoutes = require("./src/routes/cadastroRoutes");

const app = express();
const port = 3001;

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

// rotas
app.use("/", cadastroRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
