
const express = require("express");
const { Item } = require("../models");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const itens = await Item.findAll({
      order: [["data", "DESC"]],
      raw: true
    });

    return res.render("itens/listar", {
      titulo: "Itens perdidos e achados",
      descricao: "Itens cadastrados no sistema de achados e perdidos.",
      itens,
      possuiItens: itens.length > 0,
      quantidade: itens.length
    });
  } catch (erro) {
    return next(erro);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    // Valida o identificador antes da consulta
    if (!Number.isInteger(id) || id <= 0) {
      return res.status(404).render("404", {
        titulo: "Item não encontrado",
        caminho: `/itens/${req.params.id}`
      });
    }

    const item = await Item.findByPk(id, {
      raw: true
    });

    // Verifica se o item existe
    if (!item) {
      return res.status(404).render("404", {
        titulo: "Item não encontrado",
        caminho: `/itens/${req.params.id}`
      });
    }

    return res.render("itens/detalhar", {
      titulo: item.objeto,
      item
    });
  } catch (erro) {
    return next(erro);
  }
});

module.exports = router;
