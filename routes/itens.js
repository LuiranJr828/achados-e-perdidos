// const express = require("express");
// const { Publicacao } = require("../models");

// const router = express.Router();

// router.get("/", async (req, res, next) => {
//   try {
//     const publicacoes = await Publicacao.findAll({
//       order: [["createdAt", "DESC"]],
//       raw: true
//     });

//     res.render("publicacoes/listar", {
//       titulo: "Publicações da turma",
//       descricao:
//         "Dados recuperados do SQLite com Sequelize e renderizados pelo Handlebars.",
//       publicacoes,
//       possuiPublicacoes: publicacoes.length > 0,
//       quantidade: publicacoes.length
//     });
//   } catch (erro) {
//     next(erro);
//   }
// });

// router.get("/:id", async (req, res, next) => {
//   try {
//     const publicacao = await Publicacao.findByPk(req.params.id, { raw: true });

//     if (!publicacao) {
//       return res.status(404).render("404", {
//         titulo: "Publicação não encontrada",
//         caminho: `/publicacoes/${req.params.id}`
//       });
//     }

//     return res.render("publicacoes/detalhar", {
//       titulo: publicacao.titulo,
//       publicacao
//     });
//   } catch (erro) {
//     return next(erro);
//   }
// });

// module.exports = router;


const express = require("express");
const { Item } = require("../models");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const itens = await Item.findAll({
      order: [["createdAt", "DESC"]],
      raw: true
    });

    res.render("itens/listar", {
      titulo: "Itens perdidos e achados",
      descricao:
        "Itens cadastrados no sistema de achados e perdidos.",
      itens,
      possuiItens: itens.length > 0,
      quantidade: itens.length
    });
  } catch (erro) {
    next(erro);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const item = await Item.findByPk(req.params.id, {
      raw: true
    });

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

