const express = require("express");
const { Item } = require("../models");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const destaques = await Item.findAll({
      order: [["data", "DESC"]],
      limit: 3,
      raw: true
    });

    res.render("index", {
      titulo: "Achados e Perdidos",
      subtitulo: "Sistema de cadastro de objetos perdidos e encontrados",
      destaques
    });
  } catch (erro) {
    next(erro);
  }
});

router.get("/saude", (req, res) => {
  res.json({
    status: "ok",
    aplicacao: "achados-e-perdidos"
  });
});

module.exports = router;

