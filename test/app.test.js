
const test = require("node:test");
const assert = require("node:assert/strict");
const { createApp, prepararBanco } = require("../app");
const { sequelize, Item } = require("../models");

let servidor;
let baseUrl;

test.before(async () => {
  await prepararBanco();

  servidor = createApp().listen(0);

  await new Promise((resolve) => servidor.once("listening", resolve));

  baseUrl = `http://127.0.0.1:${servidor.address().port}`;
});

test.after(async () => {
  if (servidor) {
    await new Promise((resolve, reject) => {
      servidor.close((erro) => (erro ? reject(erro) : resolve()));
    });
  }

  await sequelize.close();
});

test("a página inicial responde e apresenta o título", async () => {
  const resposta = await fetch(`${baseUrl}/`);
  const html = await resposta.text();

  assert.equal(resposta.status, 200);
  assert.match(html, /Achados e Perdidos/);
});

test("a listagem apresenta os itens cadastrados", async () => {
  const resposta = await fetch(`${baseUrl}/itens`);
  const html = await resposta.text();
  const quantidade = await Item.count();

  assert.equal(resposta.status, 200);
  assert.match(html, /Itens perdidos e achados/i);
  assert.match(html, /Garrafa azul/);
  assert.match(html, /Caderno preto/);
  const textoSemTags = html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ");
  assert.match(textoSemTags, new RegExp(`${quantidade}\\s*item\\(ns\\) cadastrado\\(s\\)\\.`));
});

test("a página de detalhes apresenta um item", async () => {
  const item = await Item.findOne({
    where: { objeto: "Garrafa azul" }
  });

  assert.ok(item, "O item de teste precisa existir no banco");

  const resposta = await fetch(`${baseUrl}/itens/${item.id}`);
  const html = await resposta.text();

  assert.equal(resposta.status, 200);
  assert.match(html, /Garrafa azul/);
  assert.match(html, /Biblioteca/);
});

test("o endpoint de saúde responde em JSON", async () => {
  const resposta = await fetch(`${baseUrl}/saude`);
  const dados = await resposta.json();

  assert.equal(resposta.status, 200);
  assert.equal(dados.status, "ok");
  assert.equal(dados.aplicacao, "achados-e-perdidos");
});

test("um endereço inexistente retorna 404", async () => {
  const resposta = await fetch(`${baseUrl}/nao-existe`);
  const html = await resposta.text();

  assert.equal(resposta.status, 404);
  assert.match(html, /Página não encontrada/);
});

test("um item inexistente retorna 404", async () => {
  const resposta = await fetch(`${baseUrl}/itens/999999`);
  const html = await resposta.text();

  assert.equal(resposta.status, 404);
  assert.match(html, /Item não encontrado/);
});
