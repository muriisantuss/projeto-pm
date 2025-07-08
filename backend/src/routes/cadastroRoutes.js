// routes/cadastroRoutes.js
const express = require("express");
const router = express.Router();
const controller = require("../controllers/cadastroController");

router.get("/cadastros", controller.listarCadastros);
router.post("/cadastrar", controller.cadastrar);
router.put("/cadastros/:id", controller.atualizar);
router.delete("/cadastros/:id", controller.remover);

module.exports = router;
