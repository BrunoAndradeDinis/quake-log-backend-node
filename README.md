# Quake Log Parser API

## Descrição

API REST que realiza o parse de logs do Quake 3 Arena, armazena os dados em MongoDB e disponibiliza endpoints para consulta das informações dos jogos.

## Tecnologias

- Node.js
- TypeScript
- Express
- MongoDB
- Docker
- Jest

## Requisitos

- Node.js
- Docker e Docker Compose
- Git

## Instalação e Execução

1. Clone o repositório e instale as dependências:

```bash
git clone https://github.com/BrunoAndradeDinis/desafio-tecnico.git
cd desafio-tecnico
npm install
```

2. Configure o ambiente:

```bash
# Edite o nome arquivo .env.exemple para .env na raiz do projeto, e seu conteúo dentro com:
PORT=3000
MONGODB_HOST=localhost
MONGODB_PORT=27017
MONGODB_USER=root
MONGODB_PASSWORD=example
MONGODB_DATABASE=quake_log_parser
```

3. Inicie o MongoDB:

```bash
docker-compose up -d
```
- Caso não tenha o docker instalado na sua máquina
Baixe e instale o [Docker Desktop]("https://www.docker.com/products/docker-desktop/")


4. Popule o banco de dados:

```bash
npm run seed
```

5. Inicie o servidor:

```bash
npm run dev
```

## Endpoints

### Listar Todos os Jogos

```
GET /games

Resposta:
{
  "game_1": {
    "total_kills": 45,
    "players": ["Dono da bola", "Isgalamido", "Zeh"],
    "kills": {
      "Dono da bola": 5,
      "Isgalamido": 18,
      "Zeh": 20
    }
  },
  "game_2": {
    ...
  }
}
```

### Buscar Jogo Específico

```
GET /games/game_1

Resposta:
{
  "game_1": {
    "total_kills": 45,
    "players": ["Dono da bola", "Isgalamido", "Zeh"],
    "kills": {
      "Dono da bola": 5,
      "Isgalamido": 18,
      "Zeh": 20
    }
  }
}
```

### Health Check

```
GET /health

Resposta:
{
  "status": "OK",
  "database": "Connected"
}
```

## Testes

Execute os testes:

```bash
npm run test
```

## Observações

- Quando um jogador é morto pelo `<world>`, ele perde 1 kill
- `<world>` não é considerado um jogador
- `total_kills` inclui todas as mortes, incluindo as do `<world>`

## Estrutura do Projeto

```
src/
  ├── config/         # Configurações (banco de dados, etc)
  ├── controllers/    # Controladores da API
  ├── models/         # Modelos do MongoDB
  ├── routes/         # Rotas da API
  ├── services/       # Lógica de negócio
  └── types/          # Definições de tipos TypeScript
```

## Formato dos Dados

Cada jogo é representado no seguinte formato:

```json
{
  "game_1": {
    "total_kills": 45,
    "players": ["Dono da bola", "Isgalamido", "Zeh"],
    "kills": {
      "Dono da bola": 5,
      "Isgalamido": 18,
      "Zeh": 20
    }
  }
}
```

## Desenvolvimento
Para contribuir com o projeto:

- Pode clonar o projeto ou fazer o fork para a sua feature, criar sua branch e fazer o pull request para a branch main, assim que eu vizualizar a sua solicitação darei o retorno o quanto antes!

