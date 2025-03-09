FROM node:22-alpine
WORKDIR /app
COPY . .
RUN npm install && npm run build
CMD ["npx", "serve", "-s", "build"]
EXPOSE 3000