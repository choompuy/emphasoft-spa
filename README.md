# Emphasoft - тестовое задание

SPA для управления пользователями: авторизация, список с фильтрацией и сортировкой, создание и редактирование.

![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-433E38)
![Zod](https://img.shields.io/badge/Zod-3E67B1?logo=zod&logoColor=white)

## Возможности

- Авторизация с сохранением сессии
- Список пользователей: поиск, фильтрация, сортировка по колонкам
- Создание и редактирование пользователя
- Валидация форм через Zod со схемами, общими для клиента и типов
- Адаптивная вёрстка

## Стек

React 19 + TypeScript · Vite · React Router 7 (nested routes) · Zustand · Zod · Axios

## Структура

Проект организован по принципам Feature-Sliced Design:

```bash
src/
  ├── app/        # провайдеры, роутинг, точка входа
  ├── pages/      # страницы
  ├── features/   # бизнес-логика по фичам
  └── shared/     # переиспользуемые компоненты, api, утилиты
```

Зависимости направлены строго вниз: `pages` может импортировать из `features` и `shared`, `shared` не знает ни о чём выше себя.

## Запуск

```bash
npm install
cp .env.example .env    # указать базовый URL API
npm run dev
```
