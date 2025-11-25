# Tech Vehicles – Sistema de Gestão de Veículos (Frontend + Backend + Worker)

Este projeto é a minha participação em um teste técnico de gerenciamento de veículos da Info Tecnologia, composto por:

- Backend (NestJS) — responsável pelas APIs, regras de negócio e publicação de eventos.
- Frontend (Angular) - responsável pela listagem de Veículos cadastrados.
- Vehicle Worker (NestJS) — responsável por consumir eventos via RabbitMQ para processamento assíncrono.
- MongoDB para persistência de dados.
- RabbitMQ como broker de mensagens.
- Toda a infraestrutura é executável via Docker Compose.

### Instalação e Execução (via Docker)

Pré-requisitos

- Docker

## 1. Renomear arquivos .env.example

Como não há dados sensíveis, basta apenas renomear os arquivos.

```
Renomeie os arquivos .env.example para .env (dentro de /backend e dentro de /vehicle-worker)

```

## 2. Subir toda a stack

Na raiz do projeto:

```
docker compose up -d --build

```

## 3. Ver logs

```
docker logs -f vehicles-backend
docker logs -f vehicles-worker
```

# Para Visualizar a listagem de veículos no Frontend

Após subir o docker, acesse:

```
http://localhost:4200/vehicles
```

# Para testar endpoints da API (Swagger)

Após subir o ambiente:

Swagger disponível com todos endpoints em:

```
http://localhost:3000/api/docs
```
