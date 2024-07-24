есть пользователь с айди 1 и балансом 10 000
пост-маршрут http://localhost:3000/api/users/up - увеличение баланса на 2
пост-маршрут http://localhost:3000/api/users/down - уменьшение баланса на 2

в теле запроса только айди юзера

гет-маршрут http://localhost:3000/api/users/{id} - получение баланса пользователя


docker-compose build
npm run check

https://t.me/volodzya13