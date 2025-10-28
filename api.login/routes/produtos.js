const express = require('express');
const router = express.Router();
const pool = require('../db');
const { autenticarToken } = require('../middleware/auth');

// GET /produtos
router.get('/', autenticarToken, async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM produtos WHERE usuario_id = ?", [req.usuario.id]);
    res.json({ success: true, produtos: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Erro ao buscar produtos" });
  }
});

// POST /produtos
router.post('/', autenticarToken, async (req, res) => {
  try {
    const { nome, preco } = req.body;
    if (!nome || isNaN(preco)) return res.status(400).json({ success: false, message: "Campos inválidos" });

    const [result] = await pool.query("INSERT INTO produtos (usuario_id, nome, preco) VALUES (?, ?, ?)", [req.usuario.id, nome, preco]);
    res.json({ success: true, id: result.insertId, message: "Produto adicionado!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Erro ao adicionar produto" });
  }
});

// PUT /produtos/:id
router.put('/:id', autenticarToken, async (req, res) => {
  try {
    const { nome, preco } = req.body;
    const { id } = req.params;
    const [result] = await pool.query("UPDATE produtos SET nome=?, preco=? WHERE id=? AND usuario_id=?", [nome, preco, id, req.usuario.id]);
    if (result.affectedRows === 0) return res.status(404).json({ success: false, message: "Produto não encontrado" });
    res.json({ success: true, message: "Produto atualizado!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Erro ao atualizar produto" });
  }
});

// DELETE /produtos/:id
router.delete('/:id', autenticarToken, async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query("DELETE FROM produtos WHERE id=? AND usuario_id=?", [id, req.usuario.id]);
    if (result.affectedRows === 0) return res.status(404).json({ success: false, message: "Produto não encontrado" });
    res.json({ success: true, message: "Produto excluído!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Erro ao excluir produto" });
  }
});

module.exports = router;
