const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = 3001;

const cadastroRoutes = require("./src/routes/cadastroRoutes");

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

app.use(cadastroRoutes); // rotas separadas

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
