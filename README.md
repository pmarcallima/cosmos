# Cosmos

Uma plataforma de comunicação em tempo real para comunidades, equipes e amigos — com cliente web, aplicativo desktop e API Java.

> Cosmos é um produto original inspirado em necessidades comuns de comunicação online. Não utiliza marca, código ou assets do Discord.

## Stack

- **Cliente:** TypeScript, React, Vite e CSS próprio
- **Desktop:** Tauri, reutilizando o cliente React
- **API:** Java 21, Spring Boot e WebSocket/STOMP
- **Dados:** PostgreSQL para persistência e Redis para presença, cache e pub/sub
- **Entrega:** Docker Compose no desenvolvimento e CI preparado para GitHub Actions

## Estrutura

```text
apps/
  client/                 # Web app e UI compartilhada com o desktop
  desktop/src-tauri/      # Shell Tauri para Windows, Linux e macOS
services/
  api/                    # Backend Spring Boot
docker-compose.yml        # Stack local completa (web, API, PostgreSQL e Redis)
```

## Rodando tudo com Docker

Com Docker e Docker Compose instalados, suba toda a aplicação com um único comando:

```bash
docker compose up --build
```

Depois que os serviços estiverem saudáveis, acesse:

- Cliente web: `http://localhost:5173`
- API/health check: `http://localhost:8080/api/health`
- PostgreSQL: `localhost:5432` (banco, usuário e senha: `cosmos`)
- Redis: `localhost:6379`

O cliente encaminha as rotas `/api` e `/ws` internamente para a API. Os dados do
PostgreSQL ficam preservados no volume `cosmos-postgres`. Para encerrar a stack,
use `docker compose down`; para também apagar os dados locais, use
`docker compose down --volumes`.

## Rodando o cliente

```bash
npm install
npm run dev
```

O cliente abre em `http://localhost:5173`.

Com o Rust e o Tauri CLI instalados, o shell desktop pode ser iniciado com `cargo tauri dev` dentro de `apps/desktop/src-tauri`, mantendo o cliente web em execução.

## Rodando a API

```bash
docker compose up -d postgres redis
cd services/api
mvn spring-boot:run
```

A API responde em `http://localhost:8080/api/health`.

## Direção do produto

O Cosmos será desenvolvido em fatias verticais, mantendo cada etapa demonstrável:

1. Shell da aplicação, servidores, canais e mensagens mockadas.
2. Autenticação, usuários e persistência de mensagens.
3. WebSocket, presença e sincronização entre dispositivos.
4. Voz e vídeo com WebRTC, compartilhamento de tela e gravações locais.
5. Busca, threads, respostas, reações, uploads e moderação.
6. Notificações, acessibilidade, performance e distribuição desktop.

## Próximas decisões técnicas

- JWT com refresh token e rotação de sessões.
- STOMP sobre WebSocket para eventos de chat; WebRTC para mídia.
- Object storage compatível com S3 para anexos.
- Migrações versionadas com Flyway.
- Testes de integração com Testcontainers.
