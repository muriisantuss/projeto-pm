// controllers/cadastroController.js
const pool = require('../data/db');

async function listarCadastros(req, res) {
  try {
    const result = await pool.query('SELECT * FROM cadastros ORDER BY id DESC');
    res.json(result.rows);
  } catch (error) {
    console.error('Erro ao listar cadastros:', error);
    res.status(500).json({ erro: "Erro ao listar cadastros" });
  }
}

async function cadastrar(req, res) {
  try {
    const { nome, email, senha } = req.body;
    const result = await pool.query(
      'INSERT INTO cadastros (nome, email, senha) VALUES ($1, $2, $3) RETURNING *',
      [nome, email, senha]
    );
    res.status(201).json({ mensagem: "Cadastro realizado", cadastro: result.rows[0] });
  } catch (error) {
    console.error('Erro ao cadastrar:', error);
    res.status(500).json({ erro: "Erro ao cadastrar" });
  }
}

async function atualizar(req, res) {
  try {
    const { id } = req.params;
    const { nome, email, senha } = req.body;

    const result = await pool.query(
      'UPDATE cadastros SET nome=$1, email=$2, senha=$3 WHERE id=$4 RETURNING *',
      [nome, email, senha, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ erro: "Cadastro não encontrado" });
    }

    res.json({ mensagem: "Cadastro atualizado", cadastro: result.rows[0] });
  } catch (error) {
    console.error('Erro ao atualizar cadastro:', error);
    res.status(500).json({ erro: "Erro ao atualizar" });
  }
}

async function remover(req, res) {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM cadastros WHERE id=$1', [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ erro: "Cadastro não encontrado" });
    }

    res.json({ mensagem: "Cadastro removido" });
  } catch (error) {
    console.error('Erro ao deletar cadastro:', error);
    res.status(500).json({ erro: "Erro ao deletar" });
  }
}

module.exports = {
  listarCadastros,
  cadastrar,
  atualizar,
  remover,
};
