# Инструкция по настройке проекта

## Шаг 1: Установка зависимостей

```bash
npm install
```

## Шаг 2: Настройка MongoDB

1. У вас уже есть MongoDB Atlas кластер
2. URI подключения: `mongodb+srv://Vercel-Admin-karlygash:9w306xLgxiYOe4Jx@karlygash.agb9che.mongodb.net/?retryWrites=true&w=majority`

## Шаг 3: Создание файла .env.local

Создайте файл `.env.local` в корне проекта:

```env
MONGODB_URI="mongodb+srv://Vercel-Admin-karlygash:9w306xLgxiYOe4Jx@karlygash.agb9che.mongodb.net/?retryWrites=true&w=majority"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

## Шаг 4: Запуск проекта

```bash
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000)

## Шаг 5: Первоначальная настройка

1. Перейдите в админ-панель: `/admin`
2. Создайте первого автора через API или напрямую в MongoDB
3. Создайте первую статью
4. Настройте главную страницу в разделе "Настройки"

## Структура MongoDB

После первого запуска создайте следующие коллекции (они создадутся автоматически при первом использовании):

- `articles` - Статьи
- `authors` - Авторы
- `pages` - Статические страницы
- `siteSettings` - Настройки сайта (создастся автоматически)
- `teamMembers` - Участники команды
- `tools` - Инструменты самопомощи

## Пример создания автора через MongoDB

```javascript
db.authors.insertOne({
  name: "А.Скибидиева",
  bio: "Опытный психолог с многолетним стажем работы с подростками",
  credentials: "Психолог, специалист по подростковой психологии",
  createdAt: new Date()
})
```

## Развертывание на Vercel

1. Подключите репозиторий к Vercel
2. В настройках проекта добавьте переменные окружения:
   - `MONGODB_URI`
   - `NEXT_PUBLIC_SITE_URL` (ваш домен)
3. Деплой произойдет автоматически

## Важные замечания

- Админ-панель пока не защищена авторизацией (нужно добавить NextAuth.js)
- Для production обязательно добавьте систему авторизации
- Настройте CORS в MongoDB Atlas для вашего домена

