# Используем официальный образ Node.js в качестве базового
FROM node:18

# Устанавливаем рабочую директорию в контейнере
WORKDIR /usr/src/app

# Копируем package.json и package-lock.json в рабочую директорию
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем все файлы проекта в рабочую директорию
COPY . .

# Копируем файл .env
COPY .env .env

# Открываем порт, на котором будет работать приложение
EXPOSE 3000

# Команда для запуска приложения
CMD ["sh", "-c", "npm run migrate && npm start"]