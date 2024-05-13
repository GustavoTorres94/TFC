<h1 align="center"> Trybe Futebol Clube ⚽ </h1>

<div align="center"> 
  
  ![Badge em Desenvolvimento](http://img.shields.io/static/v1?label=STATUS&message=EM%20DESENVOLVIMENTO&color=GREEN&style=for-the-badge)

</div>

<div align="center">
  <h3>Descrição</h3>
  <p>
    Uma aplicação que possui front-end e back-end. Fiquei responsável por realizar o diretório de back-end da aplicação, a Trybe entregou o front.<br>
    Aplicação do back consiste em gerenciamento de uma tabela de campeonato de Futebol. Com funcionalidades de Login, Partidas, Times e da Tabela.<br>
    Utilizando o Docker para o deploy, junto com o NODE Js, Sequelize e TypeScript. Segurança de Software através do JWT - Jason Web Token e bcrypt.<br>
    Aplicação possui teste unitários desenvolvido com o uso de Jest, Mocha e Chai.<br>
    Aplicação desenvolvida utilizando POO - Programação Orientada a Objetos. <br>
    Uma parte considerável da aplicação foi testada, pretendo cobrir toda a aplicação ainda.<br>
  </p>
</div>

## Índice

- [Como Usar](#como-usar)
  
- [Funcionalidades](#funcionalidades)
  
- [Tecnologias](#tecnologias)

### Como Usar

    
<p>
  <ol>
    <li>
      Clone este repositório.
    </li>
    <li>
      Entre no diretório criado.
    </li>
    <li>
      Na raiz do proketo intale as dependências da aplicação, tanto front-end quanto back-end com o scrypt.
      
    npm run install:apps
                
  </li>
  <li>
    Na Raiz do projeto utilize o seguinte scrypt para "subir" os containers do Docker

    npm run compose:up
        
  </li>
  <li>
    Entre no diretório /app/backend
  </li>
  <li>
    Utilize o script de desnvolvimento para rodar a aplicação ou o de start para inicializar a aplicação, ambos rodam na PORT 3001

    npm run dev
    ou
    npm start
    
  </li>
  <li>
    Utlize um software de auxílio, insomnia ou semelhante, ou uma extensão do vscode, thunderclient ou semelhante, para realizar as requisições para os endpoints. Com o projeto clonado podes fazer requisições para

      localhost:3001/{endpoint}
    
  </li>
  </ol>
</p>

### Funcionalidades

Endpoints:<br>
/login - { post }<br>
/login/role - { get }<br>
/login/all - { get }<br>
/teams - { get }<br>
/teams/:id - { get }<br>
/matches - { get, post }<br>
/matches/:id - { get }<br>
/matches/:id/finish - { patch }<br>
/matches/:id - { patch }<br>
/leaderborad { get }<br>
/leaderborad/away { get }<br>
/leaderborad/home { get }<br>
Testes

### /login

Este endpoint contém um serviço para lidar com operações relacionadas a usuários, como autenticação, obtenção de usuários e verificação de papéis de usuário.

Funcionalidades Principais
<ol>
  <li>Obter Todos os Usuários { GET } </li>
  <ul>
    <li>
      A função <b><i>`getAllUsers`</i></b> permite obter todos os usuários registrados no sistema.
    </li>
    <li>
      Ela retorna uma lista de usuários com suas informações.<br>
    </li>
  </ul>
  <br>
  <li>Login de Usuário { POST } </li>
  <ul>
    <li>
     A função <b><i>`login`</i></b> realiza o processo de autenticação de um usuário com base em um email e senha fornecidos.
    </li>
    <li>
      Ela verifica se o email é válido e se a senha atende aos requisitos mínimos de comprimento.
    </li>
    <li>
      Em seguida, verifica se o email corresponde a um usuário registrado no banco de dados e se a senha fornecida corresponde à senha registrada para esse usuário, usando BCRYPT.
    </li>
    <li>
      Se a autenticação for bem-sucedida, a função gera um token JWT para o usuário autenticado.
    </li>
        <li>
      Exemplo de corpo da Requisição:
      
      {
        "username": "string",
        "password": "string"
      }
   </li><br>
  </ul>
  <br>
  <li> <b><i>["/login/role"]</i></b> Obter Papel do Usuário { GET } </li>
  <ul>
    <li>
      A função <b><i>`getRole`</i></b> obtém o papel (role) de um usuário com base nas informações decodificadas do token JWT.
    </li>
    <li>
      Ela verifica se o usuário correspondente ao ID decodificado do token existe no banco de dados e retorna o papel associado a esse usuário.<br>
    </li>
  </ul>
</ol>

### /teams

Este endpoint contém um serviço para lidar com operações relacionadas a equipes, como obtenção de todas as equipes e obtenção de uma equipe específica por ID.

Funcionalidades Principais
<ol>
  <li>Obter Todas as Equipes { GET }</li>
  <ul>
    <li>
      A função <b><i>`getAllTeams`</i></b> permite obter todas as equipes registradas no sistema.
    </li>
    <li>
      Ela retorna uma lista de equipes com suas informações.
    </li>
  </ul>
  <br>
  <li> <b><i>["/teams/:id"]</i></b> Obter Equipe por ID { GET } </li>
  <ul>
    <li>
      A função <b><i>`getTeamById`</i></b> permite obter uma equipe específica com base no seu ID.
    </li>
    <li>
      Ela recebe o ID da equipe como parâmetro e retorna a equipe correspondente, se existir, ou null caso contrário.
    </li>
    <li>
      Esta função é útil para buscar informações detalhadas de uma equipe específica.<br>
    </li><br>
  </ul>
</ol>
<br>

### /matches

Este endpoint contém um serviço para lidar com operações relacionadas a partidas de futebol, como obtenção de todas as partidas, obtenção de uma partida por ID, obtenção de partidas em andamento, finalização de uma partida, atualização de uma partida e criação de uma nova partida.

Funcionalidades Principais
<ol>
  <li>Obter Todas as Partidas { GET }
</li>
  <ul>
    <li>
      A função <b><i>`getAllMatches`</b></i> permite obter todas as partidas registradas no sistema.
    </li>
    <li>
      Ela retorna uma lista de partidas com suas informações.<br>
    </li>
  </ul>
        <br>
<li>
  <b><i>["/matches/:id"]</b></i> Obter Partida por ID { Get }
</li>
  <ul>
    <li>
      A função <b><i>`getMatchById`</b></i> permite obter uma partida específica com base no seu ID.
    </li>
    <li>
      Ela recebe o ID da partida como parâmetro e retorna a partida correspondente, se existir, ou null caso contrário.<br>
    </li>
  </ul>
        <br>
  <li>
    Obter Partidas em Andamento { GET } 
  </li>
  <ul>
    <li>
      A função <b><i>`getMatchesInProgress`</b></i> permite obter todas as partidas em andamento ou em progresso.
    </li>
    <li>
      Ela recebe um valor como parâmetro e retorna as partidas em andamento, se existirem.<br>
    </li>
  </ul>
        <br>
  <li>
     <b><i>["/matches/:id/finish"]</b></i> Finalizar uma Partida { PATCH } 
  </li>
  <ul>
    <li>
      A função <b><i>`finishMatch`</b></i> permite marcar uma partida como finalizada com base no seu ID.
    </li>
    <li>
      Ela recebe o ID da partida como parâmetro e atualiza o status da partida para finalizada.<br>
    </li>
  </ul>
        <br>
  <li>
    <b><i>["/matches/:id"]</b></i>  Atualizar uma Partida { PATCH }
  </li>
  <ul>
    <li>
      A função <b><i>`updateMatch`</b></i> permite atualizar os resultados de uma partida com base no seu ID.
    </li>
    <li>
      Ela recebe o ID da partida, os gols marcados pelo time da casa e os gols marcados pelo time visitante como parâmetros e atualiza os resultados da partida.<br>
    </li>
  </ul>
        <br>
  <li>
    Criar uma Nova Partida { POST }
  </li>
  <ul>
    <li>
      A função <b><i>`createMatch`</b></i>  permite criar uma nova partida com base nos IDs dos times participantes e os gols marcados por cada time.
    </li>
    <li>
      Ela verifica se os times existem no sistema e se são diferentes antes de criar a partida.
    </li>
    <li>
      Em seguida, cria a partida no banco de dados com os dados fornecidos.
    </li>
    <li>
      Exemplo do corpo da Requisição:

      {
        "homeTeamId": 16, // O valor deve ser o id do time
        "awayTeamId": 8, // O valor deve ser o id do time
        "homeTeamGoals": 2,
        "awayTeamGoals": 2
      }
      
   </li>
  </ul><br>
</ol>

### /leaderboard

O endpoint de Leaderboard oferece funcionalidades para lidar com informações sobre pontuações, vitórias, derrotas, gols e eficiência de equipes em partidas.

LeaderBoardEntity:<br>
A entidade LeaderBoardEntity fornece métodos auxiliares para calcular eficiência, filtrar e combinar informações da tabela de classificação.<br>

Funcionalidades da Entidade
<ol>
  <li>Ordenar Tabela de Classificação</li>
  <ul>
    <li>
      A função <b><i>`sortLeaderboard`</b></i></li> ordena a tabela de classificação com base em critérios como total de pontos, vitórias, saldo de gols e gols marcados.
    </li>
  </ul>
        <br>
    <li>Calcular Eficiência</li>
  <ul>
    <li>
      A função <b><i>`calculateEfficiency`</b></i></li> calcula a eficiência de uma equipe com base em pontos, empates e número de partidas.
    </li>
  </ul>
        <br>
    <li>
      Filtrar e Combinar Tabelas
    </li>
  <ul>
    <li>
      A função <b><i>`fullFilteredStatus`</b></i></li>, <b><i>`combine`</b></i> e <b><i>`combineLeaderboard`</b></i> são responsáveis por filtrar, combinar e calcular as informações necessárias para a tabela de classificação.<br>
    </li>
  </ul>
</ol>

<b>Funcionalidades Principais do EndPoint</b>
<ol>
  <li> <b><i>["/leaderboard/home"]</b></i> Obter Status da Tabela de Classificação { GET } </li>
  <ul>
    <li>
      A função <b><i>`homeStatus `</b></i> permite obter o status atualizado da tabela de classificação das equipes que atuam como time da casa.
    </li>
    <li>
      Ela retorna a tabela de classificação ordenada por critérios como total de pontos, vitórias, saldo de gols e gols marcados.
    </li>
  </ul>
        <br>
    <li><b><i>["/leaderboard/away"]</b></i> Obter Status da Tabela de Classificação (Time Visitante) { GET } </li>
  <ul>
    <li>
      A função <b><i>`awayStatus`</b></i> permite obter o status atualizado da tabela de classificação das equipes que atuam como time visitante.
    </li>
    <li>
      Ela também retorna a tabela de classificação ordenada pelos mesmos critérios mencionados anteriormente.
    </li>
  </ul>
        <br>
    <li>Obter Status Geral da Tabela de Classificação</li>
  <ul>
    <li>A função <b><i>`status`</b></i> combina as informações da tabela de classificação dos times da casa e visitantes para fornecer uma visão geral e atualizada do desempenho das equipes.</li>
    <li>Retorna a tabela de classificação combinada, ordenada pelos critérios de classificação.</li>
  </ul>
</ol>
<br>


### Testes

A aplicação foi testada utilizando o Jest, Mocha e Chai. Os testes são unitários e estão no diretório /app/backend/src/tests.<br>
Utilização de Mocks<br>
Os comandos para testar a aplicação são os seguintes:

    npm run test
    npm run test:coverage

### Tecnologias

Neste projeto utilizei as seguintes ferramentas:
<div align="center">
  <img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white" />
  <img src="https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white" />
  <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white" />
  <img src="https://img.shields.io/badge/Mocha-8D6748?style=for-the-badge&logo=Mocha&logoColor=white" />
  <img src="https://img.shields.io/badge/chai-A30701?style=for-the-badge&logo=chai&logoColor=white" />
  <img src="https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white" />
  <img src="https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white" />
</div>



<!-- Olá, Tryber!
Esse é apenas um arquivo inicial para o README do seu projeto.
É essencial que você preencha esse documento por conta própria, ok?
Não deixe de usar nossas dicas de escrita de README de projetos, e deixe sua criatividade brilhar!
:warning: IMPORTANTE: você precisa deixar nítido:
- quais arquivos/pastas foram desenvolvidos por você; 
- quais arquivos/pastas foram desenvolvidos por outra pessoa estudante;
- quais arquivos/pastas foram desenvolvidos pela Trybe.
-->
