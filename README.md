# Task-tracker

Стэк проекта: Nest.js, Postgres, Typeorm, Swagger

## Установка и запуск

1. Создать файл .env и внести в него следующие данные (пример)
```yaml
PORT=8000
NODE_ENV=production

JWT_SECRET=123

POSTGRES_HOST=postgres
POSTGRES_PORT=5432
POSTGRES_USER=root
POSTGRES_PASSWORD=root
POSTGRES_DB=tasks

```
2. Запустить докер контейнеры
```bash
docker-compose up --build
```
3. Докуменация swagger доступна по адресу [http://localhost:8000/](http://localhost:8000/)

## Пример использования:

### 1) Запрос на создание задачи

```http
POST http://localhost:8000/api/tasks
```

Заголовки запроса:
```json
[
  {
    "Authorization": "Bearer <TOKEN>"
  }
]
```

Тело запроса:
```json
{
  "title": "Задача 3",
  "description": "Описание здачи",
  "deadline": "2024-12-31T23:59:59.999Z"
}
```

Пример ответа:
```json
{
  "title": "Задача 3",
  "description": "Описание здачи",
  "deadline": "2024-12-31T23:59:59.999Z",
  "status": "OPEN",
  "user": {
    "id": "401d430a-906b-4af9-8c21-60e4c31803b5",
    "email": "kochergin.develop@gmail.com"
  },
  "id": "395f213d-36d0-4356-9359-60a5399fb4fc",
  "createdAt": "2024-03-07T00:25:20.722Z",
  "updatedAt": "2024-03-07T00:25:20.722Z",
  "deletedAt": null
}
```

### 2) Запрос на получение списка задач юзера

```http
GET http://localhost:8000/api/tasks
```

Заголовки запроса:
```json
[
  {
    "Authorization": "Bearer <TOKEN>"
  }
]
```

Пример ответа:
```json
[
  {
    "id": "a7c0975f-e79a-456f-bef0-0e8c92000ff0",
    "title": "Задача 1",
    "deadline": "2024-12-31T23:59:59.999Z"
  },
  {
    "id": "387ac9d7-8ad9-499c-a7eb-a5055e94cd01",
    "title": "Задача 2",
    "deadline": "2024-12-31T23:59:59.999Z"
  },
  {
    "id": "395f213d-36d0-4356-9359-60a5399fb4fc",
    "title": "Задача 3",
    "deadline": "2024-12-31T23:59:59.999Z"
  }
]
```

### 3) Запрос на получение деталей задачи

```http
GET http://localhost:8000/api/tasks/:id
```

Заголовки запроса:
```json
[
  {
    "Authorization": "Bearer <TOKEN>"
  }
]
```

Параметры запроса:
```json
[
  {
    "id": "a7c0975f-e79a-456f-bef0-0e8c92000ff0"
  }
]
```

Пример ответа:
```json
{
  "id": "a7c0975f-e79a-456f-bef0-0e8c92000ff0",
  "createdAt": "2024-03-07T00:25:18.196Z",
  "updatedAt": "2024-03-07T00:25:18.196Z",
  "deletedAt": null,
  "title": "Задача 1",
  "description": "Описание здачи",
  "deadline": "2024-12-31T23:59:59.999Z",
  "status": "OPEN"
}
```
