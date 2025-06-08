# Quake log parser

## Task 1 - Construa um parser para o arquivo de log games.log e exponha uma API de consulta

O arquivo games.log é gerado pelo servidor de quake 3 arena. Ele registra todas as informações dos jogos, quando um jogo começa, quando termina, quem matou quem, quem morreu pq caiu no vazio, quem morreu machucado, entre outros.

O parser deve ser capaz de ler o arquivo, agrupar os dados de cada jogo, e em cada jogo deve coletar as informações de morte.

### Exemplo

      21:42 Kill: 1022 2 22: <world> killed Isgalamido by MOD_TRIGGER_HURT

  O player "Isgalamido" morreu pois estava ferido e caiu de uma altura que o matou.

      2:22 Kill: 3 2 10: Isgalamido killed Dono da Bola by MOD_RAILGUN

  O player "Isgalamido" matou o player Dono da Bola usando a arma Railgun.

Para cada jogo o parser deve gerar algo como:

    game_1: {
        total_kills: 45;
        players: ["Dono da bola", "Isgalamido", "Zeh"]
        kills: {
          "Dono da bola": 5,
          "Isgalamido": 18,
          "Zeh": 20
        }
      }

### Observações

1. Quando o `<world>` mata o player ele perde -1 kill.
2. `<world>` não é um player e não deve aparecer na lista de players e nem no dicionário de kills.
3. `total_kills` são os kills dos games, isso inclui mortes do `<world>`.

## Task 2 - Após construir o parser construa uma API que faça a exposição de um método de consulta que retorne um relatório de cada jogo

## Requisitos

1. Use a linguagem que você tem mais habilidade (temos preferência por nodejs, java ou python, mas pode ser usado qualquer linguagem desde que explicado a prefência).
2. As APIs deverão seguir o modelo RESTFul  com formato JSON
3. Faça testes unitários, suite de testes bem organizados. (Dica. De uma atenção especial a esse item!)
4. Use git e tente fazer commits pequenos e bem descritos.
5. Faça pelo menos um README explicando como fazer o setup, uma explicação da solução proposta, o mínimo de documentação para outro desenvolvedor entender seu código
6. Siga o que considera boas práticas de programação, coisas que um bom desenvolvedor olhe no seu código e não ache "feio" ou "ruim".
7. Após concluir o teste suba em um repositório privado e nos mande o link

## Extra

1. Armazene os eventos do jogo dentro de um banco de dados (de preferência ao mongodb, crie seed e migration), possibilitando a consulta via API. (crie uma rota diferente para consulta)

HAVE FUN :)

# Task 1: [x]
# Task 2: [ ]

## Como ativar o chat paralelo do Copilot

O chat paralelo do GitHub Copilot pode ser acessado diretamente em IDEs compatíveis, como o Visual Studio Code, através da extensão **GitHub Copilot Chat**. Siga os passos abaixo:

1. **Instale a extensão**: No VS Code, vá até a aba de extensões e procure por `GitHub Copilot Chat`. Instale a extensão oficial da GitHub.
2. **Faça login**: Certifique-se de estar autenticado com sua conta GitHub que possui acesso ao Copilot.
3. **Abra o chat**: Clique no ícone do Copilot na barra lateral ou use o atalho `Ctrl+I` (Windows/Linux) ou `Cmd+I` (Mac) para abrir o painel de chat.
4. **Utilize o chat paralelo**: Você pode abrir múltimas abas de chat clicando com o botão direito no painel do Copilot Chat e selecionando "Abrir em nova aba" ou "Split Editor" para chats paralelos.

> **Observação:** O recurso pode estar disponível apenas para assinantes do GitHub Copilot e pode exigir permissões específicas na sua organização.

Para mais detalhes, consulte a [documentação oficial do GitHub Copilot Chat](https://docs.github.com/pt/copilot/getting-started-with-github-copilot/github-copilot-chat).