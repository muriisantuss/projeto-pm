// controllers/cadastroController.js
const db = require("../data/db");

let cadastros = db.cadastros;

function listarCadastros(req, res) {
  res.json(cadastros);
}

function cadastrar(req, res) {
  const { nome, email, senha } = req.body;
  const novoCadastro = { id: Date.now(), nome, email, senha };
  cadastros.push(novoCadastro);
  res.status(201).json({ mensagem: "Cadastro realizado", cadastro: novoCadastro });
}

function atualizar(req, res) {
  const { id } = req.params;
  const { nome, email, senha } = req.body;
  const index = cadastros.findIndex(c => c.id == id);
  if (index === -1) return res.status(404).json({ erro: "Cadastro não encontrado" });
  cadastros[index] = { ...cadastros[index], nome, email, senha };
  res.json({ mensagem: "Cadastro atualizado", cadastro: cadastros[index] });
}

function remover(req, res) {
  const { id } = req.params;
  cadastros = cadastros.filter(c => c.id != id);
  db.cadastros = cadastros;
  res.json({ mensagem: "Cadastro removido" });
}

module.exports = {
  listarCadastros,
  cadastrar,
  atualizar,
  remover,
};
