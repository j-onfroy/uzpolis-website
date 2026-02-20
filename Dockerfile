# 1-bosqich: Build (Node.js orqali kodni yig'ish)
FROM node:18-alpine AS build
WORKDIR /app

# Kutubxonalarni o'rnatish
COPY package*.json ./
RUN npm install

# Kodni nusxalash va build qilish
COPY . .
RUN npm run build

# 2-bosqich: Production (Nginx orqali chiqarish)
FROM nginx:stable-alpine

# O'zingiz bergan nginx.conf faylini konteyner ichiga nusxalash
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Build bo'lgan fayllarni (dist yoki build) Nginx'ga nusxalash
# DIQQAT: Agar loyihangizda build papkasi nomi "build" bo'lsa, dist ni build ga almashtiring
COPY --from=build /app/dist /usr/share/nginx/html

# Portni ochamiz (Sizning configda 10300 yozilgan)
EXPOSE 10300

CMD ["nginx", "-g", "daemon off;"]