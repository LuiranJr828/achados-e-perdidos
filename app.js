const path = require("node:path");
const express = require("express");
const { engine } = require("express-handlebars");
const { sequelize, Item } = require("./models");

const indexRouter = require("./routes/index");
const itensRouter = require("./routes/itens");

function createApp() {
  const app = express();

  app.engine(
    "hbs",
    engine({
      extname: ".hbs",
      defaultLayout: "main",
      layoutsDir: path.join(__dirname, "views", "layouts"),
      partialsDir: path.join(__dirname, "views", "partials"),
      helpers: {
        formatarData(valor) {
          return new Intl.DateTimeFormat("pt-BR", {
            dateStyle: "short"
          }).format(new Date(valor));
        }
      }
    })
  );

  app.set("view engine", "hbs");
  app.set("views", path.join(__dirname, "views"));

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  app.use(express.static(path.join(__dirname, "public")));

  app.use("/", indexRouter);
  app.use("/itens", itensRouter);

  // Página 404 para rotas desconhecidas
  app.use((req, res) => {
    res.status(404).render("404", {
      titulo: "Página não encontrada",
      caminho: req.originalUrl
    });
  });

  // Tratamento de erros internos
  app.use((erro, req, res, next) => {
    console.error("Erro tratado pela aplicação:", erro);

    if (res.headersSent) {
      return next(erro);
    }

    return res.status(500).render("erro", {
      titulo: "Erro interno",
      mensagem:
        process.env.NODE_ENV === "development"
          ? erro.message
          : "Não foi possível concluir a solicitação. Tente novamente."
    });
  });

  return app;
}

async function prepararBanco() {
  await sequelize.authenticate();
  await sequelize.sync();

  const quantidade = await Item.count();

  if (quantidade === 0) {
    await Item.bulkCreate([
      {
        objeto: "Garrafa azul",
        categoria: "Garrafas",
        local: "Biblioteca",
        data: "2026-10-16",
        situacao: "Encontrado",
        imagem: "img/garrafa-azul.jpg"
      },
      {
        objeto: "Caderno preto",
        categoria: "Material escolar",
        local: "Sala 05",
        data: "2026-10-15",
        situacao: "Perdido",
        imagem: "img/caderno-preto.jpg"
      },
      {
        objeto: "Chave com cordão",
        categoria: "Chaves",
        local: "Pátio",
        data: "2026-10-14",
        situacao: "Encontrado",
        imagem: "img/chave-cordao.jpg"
      },
      {
        objeto: "Estojo vermelho",
        categoria: "Material escolar",
        local: "Laboratório de informática",
        data: "2026-10-13",
        situacao: "Em andamento",
        imagem: "img/estojo-vermelho.jpg"
      },
      {
        objeto: "Casaco cinza",
        categoria: "Roupas",
        local: "Auditório",
        data: "2026-10-12",
        situacao: "Devolvido",
        imagem: "img/casaco-cinza.jpg"
      },
      {
        objeto: "Cartão de transporte",
        categoria: "Documentos e cartões",
        local: "Entrada principal",
        data: "2026-10-11",
        situacao: "Encontrado",
        imagem: "img/cartao-transporte.jpg"
      }
    ]);
  }
}

module.exports = { createApp, prepararBanco };