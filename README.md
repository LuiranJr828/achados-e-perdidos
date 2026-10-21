# Achados e Perdidos

## Integrantes

- Luiran Bezerra da Silva Junior
- Dayvid Jhonatas Firme da Costa
- Sarah Joquebede da Silva
- João Felipe de Oliveira Pinheiro

## Sobre o projeto

O **Achados e Perdidos** é uma aplicação web desenvolvida para a disciplina de Programação para Internet. O projeto tem como objetivo facilitar a consulta de objetos perdidos e encontrados no campus do IFRN, ajudando os estudantes a localizar seus pertences.

Por meio da plataforma, é possível visualizar uma lista de objetos e consultar informações como nome, categoria, local, data, situação e imagem.

## Tecnologias utilizadas

- **Node.js:** utilizado para executar JavaScript no servidor.
- **Express:** utilizado para configurar o servidor e as rotas da aplicação.
- **Handlebars:** utilizado para gerar as páginas HTML com os dados do sistema.
- **Sequelize:** utilizado para facilitar a comunicação com o banco de dados.
- **SQLite:** utilizado para armazenar as informações dos objetos.
- **HTML e CSS:** utilizados na estrutura e na aparência das páginas.
- **Node Test e Supertest:** utilizados na realização de testes automatizados.

## Pré-requisitos

Para executar o projeto, é necessário ter o Node.js versão 18 ou superior instalado, além do NPM, que acompanha a instalação do Node.js.

Para verificar se estão instalados, execute os comandos no terminal:

```bash
node -v
npm -v
```

## Como instalar e executar

### 1. Instalar as dependências

Abra o terminal na pasta principal do projeto e execute:

```bash
npm install
```

Esse comando instala as bibliotecas necessárias para o funcionamento da aplicação.

### 2. Iniciar o servidor

Após a instalação, execute:

```bash
npm start
```

O servidor será iniciado na porta 3000 por padrão. Em seguida, acesse o endereço abaixo no navegador:

http://localhost:3000

### 3. Executar os testes

Para executar os testes automatizados do projeto, utilize:

```bash
npm test
```

## Funcionalidades

- Apresentação do sistema na página inicial.
- Exibição dos três itens mais recentes na página inicial.
- Listagem dos objetos registrados no sistema.
- Consulta dos detalhes de cada objeto.
- Exibição da categoria, do local, da data e da situação dos itens.
- Apresentação de uma página de erro quando um endereço ou item não é encontrado.
- Verificação do funcionamento do servidor por meio de uma rota de saúde.

## Dados dos objetos

A aplicação utiliza a entidade `Item` para representar os objetos armazenados no banco de dados.

Cada item possui os seguintes campos:

| Campo | Descrição |
|---|---|
| `objeto` | Nome do objeto. |
| `categoria` | Categoria do objeto. |
| `local` | Local relacionado à ocorrência. |
| `data` | Data da ocorrência. |
| `situacao` | Situação atual do objeto. |
| `imagem` | Caminho da imagem do objeto. |

As situações utilizadas são: Encontrado, Perdido, Em andamento e Devolvido.

O sistema possui seis registros iniciais, que são inseridos no banco de dados quando a tabela ainda está vazia. Dessa forma, os mesmos registros não são adicionados novamente sempre que o servidor é iniciado.

A listagem é organizada pela data em ordem decrescente, mostrando primeiro os registros mais recentes.

## Rotas da aplicação

| Método | Rota | Descrição |
|---|---|---|
| GET | `/` | Exibe a página inicial. |
| GET | `/saude` | Retorna informações sobre o funcionamento do servidor em formato JSON. |
| GET | `/itens` | Exibe a lista de objetos. |
| GET | `/itens/:id` | Exibe os detalhes de um objeto específico. |

Quando um endereço não existe ou o identificador de um item é inválido, a aplicação apresenta uma página de erro 404.

## Organização do projeto

O código foi dividido em pastas e arquivos para facilitar a organização e a manutenção da aplicação.

- `app.js`: configura o Express, o Handlebars, os middlewares, as rotas e o tratamento de erros. Também contém a função responsável por preparar o banco de dados e inserir os registros iniciais.
- `server.js`: prepara o banco de dados e inicia o servidor.
- `models/`: contém a configuração do banco de dados e a definição da entidade `Item`.
- `routes/`: contém as rotas da página inicial e da listagem e detalhamento dos objetos.
- `views/`: contém os arquivos Handlebars responsáveis pela apresentação das páginas.
- `public/`: armazena os arquivos estáticos, como imagens e arquivos CSS.
- `test/`: contém os arquivos utilizados nos testes automatizados.
- `database/`: armazena o arquivo do banco de dados SQLite utilizado pela aplicação.

A organização segue uma estrutura inspirada no padrão MVC, separando os dados, o controle das requisições e a apresentação das páginas.

## Considerações finais

O desenvolvimento deste projeto permite colocar em prática os conhecimentos de programação para a internet, utilizando um servidor Node.js, rotas com Express, templates Handlebars e armazenamento de dados com SQLite e Sequelize.

A proposta é oferecer uma maneira simples e organizada de consultar objetos perdidos e encontrados no campus do IFRN, facilitando o acesso às informações pelos estudantes.

