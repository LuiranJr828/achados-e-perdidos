
const test = require("node:test");
const assert = require("node:assert/strict");
const request = require("supertest");
const { createApp, prepararBanco } = require("../app");
const { sequelize, Item } = require("../models");

let app;

test.before(async () => {
  await prepararBanco();
  app = createApp();
});

test.after(async () => {
  await sequelize.close();
});

test("a página inicial responde e apresenta o título", async () => {
  const resposta = await request(app).get("/");

  assert.equal(resposta.status, 200);
  assert.match(resposta.text, /Achados e Perdidos/);
});

test("a listagem apresenta pelo menos um registro inicial", async () => {
  const resposta = await request(app).get("/itens");
  const quantidade = await Item.count();

  assert.equal(resposta.status, 200);
  assert.ok(quantidade >= 1, "Deve existir pelo menos um item no banco");
  assert.match(resposta.text, /Itens perdidos e achados/i);
  assert.match(resposta.text, /item\(ns\) cadastrado\(s\)/i);
  assert.match(resposta.text, /class="grade"/);
});

test("a listagem apresenta os itens iniciais esperados", async () => {
  const resposta = await request(app).get("/itens");

  assert.equal(resposta.status, 200);
  assert.match(resposta.text, /Garrafa azul/);
  assert.match(resposta.text, /Caderno preto/);
});

test("GET /itens/1 retorna 200 para um registro existente", async () => {
  const item = await Item.findByPk(1);

  assert.ok(item, "O registro de ID 1 deve existir no banco de teste");

  const resposta = await request(app).get("/itens/1");

  assert.equal(resposta.status, 200);
  assert.match(resposta.text, /Garrafa azul/);
  assert.match(resposta.text, /Biblioteca/);
});

test("a página de detalhes apresenta um item existente", async () => {
  const item = await Item.findOne({
    where: { objeto: "Garrafa azul" }
  });

  assert.ok(item, "O item de teste precisa existir no banco");

  const resposta = await request(app).get(`/itens/${item.id}`);

  assert.equal(resposta.status, 200);
  assert.match(resposta.text, /Garrafa azul/);
  assert.match(resposta.text, /Biblioteca/);
});

test("GET /itens/abc retorna 404 para um identificador inválido", async () => {
  const resposta = await request(app).get("/itens/abc");

  assert.equal(resposta.status, 404);
  assert.match(resposta.text, /Item não encontrado/);
});

test("um item inexistente retorna 404", async () => {
  const resposta = await request(app).get("/itens/999999");

  assert.equal(resposta.status, 404);
  assert.match(resposta.text, /Item não encontrado/);
});

test("o endpoint de saúde responde em JSON", async () => {
  const resposta = await request(app).get("/saude");

  assert.equal(resposta.status, 200);
  assert.equal(resposta.body.status, "ok");
  assert.equal(resposta.body.aplicacao, "achados-e-perdidos");
});

test("um endereço inexistente retorna 404", async () => {
  const resposta = await request(app).get("/nao-existe");

  assert.equal(resposta.status, 404);
  assert.match(resposta.text, /Página não encontrada/);
});
