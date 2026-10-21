# Achados e Perdidos

## 1. Integrantes

- Luiran Bezerra da Silva Junior
- Dayvid Jhonatas Firme da Costa
- Sarah Joquebede da Silva
- João Felipe de Oliveira Pinheiro

## 2. Sobre o projeto

O **Achados e Perdidos** é uma aplicação web desenvolvida como parte da disciplina de Programação para Internet (PPI), na Etapa 3. O projeto tem como objetivo facilitar a consulta de objetos perdidos ou encontrados nas dependências do IFRN.

A ideia surgiu da necessidade de ajudar estudantes a localizar seus pertences ou verificar se algum objeto perdido foi encontrado por outra pessoa. Para isso, a aplicação reúne informações sobre os objetos cadastrados, permitindo consultar sua descrição, categoria, local, data, situação e imagem.

O sistema apresenta uma página inicial com os registros mais recentes, uma página com a listagem dos objetos e uma página de detalhes para consultar cada registro individualmente.

## 3. Tecnologias utilizadas

As principais tecnologias utilizadas no desenvolvimento foram:

- **Node.js:** ambiente utilizado para executar o JavaScript no servidor.
- **Express:** framework responsável pela configuração do servidor web, pelas rotas e pelos middlewares.
- **Express Handlebars:** utilizado para gerar as páginas HTML dinamicamente a partir dos dados da aplicação.
- **Sequelize:** biblioteca utilizada para definir o modelo dos objetos e realizar consultas e operações no banco de dados.
- **SQLite:** banco de dados responsável por armazenar os registros dos objetos.
- **HTML e CSS:** utilizados para estruturar e estilizar as páginas da aplicação.
- **Node.js Test Runner:** ferramenta nativa do Node.js utilizada para executar os testes automatizados.
- **Supertest:** biblioteca utilizada para realizar requisições HTTP durante os testes, verificando as respostas das rotas.

## 4. Pré-requisitos

Para executar o projeto, é necessário ter instalado:

- Node.js versão 18 ou superior.
- NPM, que normalmente é instalado junto com o Node.js.
- Um navegador web para acessar a aplicação.

Para verificar se o Node.js e o NPM estão instalados, execute os seguintes comandos no terminal:

```bash
node -v
npm -v
```

## 5. Instalação e execução

### 5.1. Instalar as dependências

Abra o terminal na pasta principal do projeto, onde está localizado o arquivo `package.json`, e execute:

```bash
npm install
```

Esse comando instala as bibliotecas necessárias para executar a aplicação e os testes.

### 5.2. Iniciar o servidor

Após instalar as dependências, execute:

```bash
npm start
```

O servidor prepara o banco de dados e inicia a aplicação na porta 3000 por padrão.

Depois da inicialização, acesse o seguinte endereço no navegador:

http://localhost:3000

### 5.3. Executar em modo de desenvolvimento

O projeto também possui um comando para iniciar o servidor com reinicialização automática quando os arquivos monitorados são alterados:

```bash
npm run dev
```

### 5.4. Executar os testes

Para executar os testes automatizados, utilize:

```bash
npm test
```

Os testes verificam as respostas das rotas, a apresentação dos registros, a consulta de detalhes, o endpoint de saúde e o tratamento de endereços e identificadores inválidos.

## 6. Funcionalidades

A aplicação possui as seguintes funcionalidades:

- **Página inicial:** apresenta o projeto e exibe até três objetos em destaque, consultados no banco de dados.
- **Listagem de objetos:** apresenta os registros cadastrados, organizados pela data em ordem decrescente.
- **Detalhamento:** permite acessar um objeto específico por meio de seu identificador.
- **Identificação da situação:** informa se o objeto foi encontrado, está perdido, está em andamento ou foi devolvido.
- **Exibição de imagens:** permite associar uma imagem a cada objeto cadastrado.
- **Página de erro 404:** informa quando uma página não existe ou quando um objeto não é encontrado.
- **Tratamento de erros internos:** apresenta uma página de erro quando ocorre uma falha inesperada no servidor.
- **Endpoint de saúde:** disponibiliza uma rota para verificar se a aplicação está respondendo.

## 7. Entidade principal e banco de dados

A entidade principal do sistema é **Item**, definida por meio do Sequelize e armazenada no banco de dados SQLite.

Cada registro representa um objeto perdido ou encontrado no campus.

### 7.1. Campos da entidade

| Campo | Tipo | Descrição |
|---|---|---|
| `id` | Inteiro | Identificador único do registro, gerado automaticamente. |
| `objeto` | Texto (`STRING`) | Nome ou descrição do objeto. |
| `categoria` | Texto (`STRING`) | Categoria à qual o objeto pertence. |
| `local` | Texto (`STRING`) | Local relacionado ao objeto. |
| `data` | Data (`DATEONLY`) | Data associada ao registro do objeto. |
| `situacao` | Texto (`STRING`) | Situação atual do objeto. |
| `imagem` | Texto (`STRING`) | Caminho da imagem associada ao objeto. |

Os campos `objeto`, `categoria`, `local`, `data`, `situacao` e `imagem` são obrigatórios e possuem validações definidas no modelo.

O campo `situacao` aceita os seguintes valores:

- `Encontrado`
- `Perdido`
- `Em andamento`
- `Devolvido`

Além desses campos, o Sequelize administra os campos de data de criação e atualização do registro, pois o modelo utiliza `timestamps: true`.

### 7.2. Preparação do banco de dados

A preparação do banco é realizada pela função `prepararBanco()`, localizada em `app.js`.

Essa função verifica a conexão, sincroniza o modelo com o banco e consulta a quantidade de registros existentes. Caso a tabela esteja vazia, são inseridos seis objetos iniciais.

Os registros utilizados como dados iniciais são:

1. Garrafa azul — Biblioteca.
2. Caderno preto — Sala 05.
3. Chave com cordão — Pátio.
4. Estojo vermelho — Laboratório de informática.
5. Casaco cinza — Auditório.
6. Cartão de transporte — Entrada principal.

Os registros possuem datas e situações diferentes, permitindo demonstrar a listagem e o detalhamento dos objetos.

A inserção inicial ocorre somente quando não existem registros na tabela, evitando que os seis objetos sejam duplicados a cada inicialização normal da aplicação.

## 8. Rotas disponíveis

As rotas são responsáveis por receber as requisições do navegador, consultar os dados necessários e definir a resposta que será apresentada.

| Método | Rota | Função |
|---|---|---|
| `GET` | `/` | Apresenta a página inicial e os três objetos em destaque. |
| `GET` | `/saude` | Retorna um JSON indicando o estado da aplicação. |
| `GET` | `/itens` | Apresenta a listagem dos objetos cadastrados. |
| `GET` | `/itens/:id` | Apresenta os detalhes do objeto correspondente ao identificador informado. |
| `GET` | Qualquer rota inexistente | Retorna a página de erro 404. |

Na rota `/itens/:id`, o identificador é validado antes da consulta ao banco. Se for inválido ou não corresponder a um registro existente, a aplicação apresenta a resposta 404 com a mensagem de que o item não foi encontrado.

A rota `/saude` retorna um JSON semelhante ao exemplo abaixo:

```json
{
  "status": "ok",
  "aplicacao": "achados-e-perdidos"
}
```

## 9. Organização dos arquivos e diretórios

O projeto foi organizado em arquivos e diretórios que separam as responsabilidades da aplicação.

```text
achados-e-perdidos/
├── app.js
├── server.js
├── package.json
├── package-lock.json
├── README.md
├── models/
│   ├── index.js
│   └── item.js
├── routes/
│   ├── index.js
│   └── itens.js
├── views/
│   ├── layouts/
│   │   └── main.hbs
│   ├── partials/
│   ├── index.hbs
│   ├── 404.hbs
│   ├── erro.hbs
│   └── itens/
│       ├── listar.hbs
│       └── detalhar.hbs
├── public/
│   ├── img/
│   └── stylesheets/
│       └── style.css
├── database/
│   └── mural.sqlite
└── test/
    └── app.test.js
```


### Responsabilidade de cada parte

- **`app.js`:** configura o Express, o Handlebars, os arquivos estáticos, os middlewares, as rotas e o tratamento de erros. Também contém a função responsável pela preparação do banco e pelos dados iniciais.
- **`server.js`:** executa a preparação do banco e inicia o servidor na porta configurada.
- **`package.json`:** registra as informações do projeto, as dependências e os comandos de execução e teste.
- **`models/`:** define a entidade `Item` e configura a conexão com o banco de dados SQLite.
- **`routes/`:** contém as rotas da página inicial, do endpoint de saúde, da listagem e dos detalhes dos objetos.
- **`views/`:** contém os arquivos Handlebars que geram as páginas HTML apresentadas ao usuário.
- **`views/layouts/`:** contém o layout principal compartilhado pelas páginas.
- **`views/partials/`:** permite organizar componentes visuais reutilizáveis, evitando repetir o mesmo código HTML em diferentes páginas.
- **`public/`:** armazena os arquivos estáticos, como imagens e folhas de estilo CSS.
- **`database/`:** armazena o arquivo do banco SQLite utilizado pela aplicação.
- **`test/`:** contém os testes automatizados que verificam o funcionamento das rotas e das respostas da aplicação.

A organização separa as responsabilidades entre configuração, inicialização, acesso aos dados, rotas, apresentação e testes, seguindo uma estrutura inspirada no padrão MVC.

## 10. Testes automatizados

Os testes estão localizados em `test/app.test.js` e utilizam o test runner nativo do Node.js em conjunto com a biblioteca Supertest.

Antes dos testes, a aplicação prepara o banco de dados e cria a instância do Express. Ao final, a conexão com o banco é encerrada.

O arquivo possui testes para verificar:

1. Se a página inicial responde com status HTTP 200 e apresenta o título do projeto.
2. Se a listagem apresenta registros e os elementos esperados.
3. Se os objetos iniciais, como a garrafa azul e o caderno preto, aparecem na listagem.
4. Se a rota `/itens/1` retorna o objeto esperado.
5. Se a página de detalhes apresenta corretamente um objeto existente.
6. Se um identificador inválido, como `/itens/abc`, retorna status 404.
7. Se um objeto inexistente retorna status 404.
8. Se o endpoint `/saude` retorna um JSON com os dados esperados.
9. Se uma rota inexistente apresenta a página de erro 404.

Para executar todos os testes, utilize:

```bash
npm test
```

O resultado permite identificar problemas no funcionamento das rotas e verificar se os principais comportamentos previstos estão sendo atendidos.

## 11. Relação com os quatro wireframes

Os wireframes servem como referência para a organização das informações e para a estrutura visual das páginas. A aplicação utiliza essas referências para organizar as funcionalidades de consulta dos objetos.

- **Wireframe da página inicial:** corresponde à rota `/`, que apresenta a identificação do projeto e até três objetos em destaque obtidos do banco de dados.
- **Wireframe da listagem:** corresponde à rota `/itens`, responsável por apresentar os registros cadastrados de maneira organizada.
- **Wireframe do detalhamento:** corresponde à rota `/itens/:id`, que permite consultar individualmente as informações de um objeto.
- **Wireframe da página 404:** corresponde às situações em que o usuário acessa uma rota inexistente ou tenta consultar um objeto que não foi localizado.

A implementação deve preservar a composição e a hierarquia de informações previstas nos wireframes específicos do grupo, incluindo a organização dos elementos, a apresentação dos registros e as ações disponíveis em cada página.

## 12. Decisões e adaptações realizadas pelo grupo

Durante o desenvolvimento, foram adotadas decisões para adaptar a estrutura do projeto-base ao sistema de Achados e Perdidos.

- **Adaptação da entidade:** o modelo foi definido como `Item`, com campos específicos para descrever objetos perdidos ou encontrados.
- **Persistência dos dados:** os registros são armazenados no SQLite e acessados por meio do Sequelize, em vez de serem mantidos apenas em arrays ou escritos diretamente nas páginas.
- **Dados iniciais:** foram definidos seis objetos para demonstrar o funcionamento do sistema desde a primeira execução.
- **Prevenção de duplicações:** os dados iniciais são inseridos somente quando a tabela está vazia.
- **Ordenação dos registros:** a listagem apresenta os objetos em ordem decrescente de data.
- **Destaques na página inicial:** são consultados até três registros no banco de dados para compor a página inicial.
- **Validação dos identificadores:** a rota de detalhes verifica se o identificador informado é válido antes de consultar o banco.
- **Tratamento de erros:** foram implementadas respostas para páginas e objetos não encontrados, além de um middleware para falhas internas.
- **Formatação de datas:** foi criado um helper para apresentar datas no formato utilizado no Brasil.
- **Organização do código:** as responsabilidades foram distribuídas entre arquivos de configuração, servidor, modelos, rotas, views e testes.
- **Verificação do funcionamento:** foram criados testes automatizados para conferir as principais rotas e situações de erro.

Essas decisões procuram manter a aplicação organizada, facilitar sua manutenção e atender aos requisitos técnicos e funcionais definidos para o projeto.

## 13. Considerações finais

O desenvolvimento do Achados e Perdidos permite aplicar conhecimentos de programação para a web, incluindo a criação de rotas, a utilização de templates dinâmicos, a persistência de dados em banco de dados relacional e a realização de testes automatizados.

Além do aprendizado técnico, o projeto propõe uma solução para uma situação cotidiana no ambiente escolar, facilitando a consulta de informações sobre objetos perdidos ou encontrados no campus do IFRN.
