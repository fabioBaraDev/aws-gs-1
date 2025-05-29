const express = require('express');
const router = express.Router();

// Dados temporários (simulando um banco de dados)
let itens = [
  { id: 1, nome: 'Item 1' },
  { id: 2, nome: 'Item 2' }
];

// Rota GET - Buscar todos os itens
router.get('/', (req, res) => {
  res.json({
    success: true,
    data: itens
  });
});

// Rota GET - Buscar item por ID
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const item = itens.find(i => i.id === id);

  if (item) {
    res.json({
      success: true,
      data: item
    });
  } else {
    res.status(404).json({
      success: false,
      message: 'Item não encontrado'
    });
  }
});

// Rota POST - Adicionar novo item
router.post('/', (req, res) => {
  const { nome } = req.body;

  if (!nome) {
    return res.status(400).json({
      success: false,
      message: 'O campo "nome" é obrigatório'
    });
  }

  const novoItem = {
    id: itens.length + 1,
    nome: nome
  };

  itens.push(novoItem);

  res.status(201).json({
    success: true,
    data: novoItem
  });
});

module.exports = router;