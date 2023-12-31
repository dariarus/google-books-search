#### Поиск книг на сервисе Google Books

*Описание и функциональность*: Интерфейс поиска книг на сервисе Google Books с использованием Google Books API. Поиск производится по любому слову в поле поиска (поиск по совпадениям в названии книги, в авторе, в описании и т.д.). Результаты можно отсортировать по релевантности (relevance) и новизне (newest), а также выбрать категорию, к которой относится искомая книга. Первый поиск возвращает 30 книг. По нажатию кнопки Show more каждый раз подргужается еще по 30 книг или меньше, если книг больше нет. Нажатие на карточку книги отправляет пользователя на страницу с подробной информацией об этой книге.

*Используемые технологии*: React, TSX, Redux Toolkit, flexbox, grid layout, БЭМ, JavaScript, TypeScript, react-router-dom, Webpack, Google Books API, html-react-parser*, Docker

*<sub>html-react-parser применяется с целью безопасно (вместо `dangerouslySetInnerHTML: {__html: ...}`) распарсить html, который приходит в разделе с описанием книги</sub>

*Инструкция по запуску приложения*:
- для разработки:
```shell
npm start
```
- в Docker:
```shell
cd ./docker
docker compose build & docker compose up -d
```
*Ссылка на проектный сайт на GitHub Pages*: [Поиск книг в Google Books](https://dariarus.github.io/google-books-search/)

