FROM node:22-alpine
WORKDIR /app
COPY build /app/build
RUN npm install -g serve

ENV REACT_APP_API_URL=http://localhost:3000

CMD ["serve", "-s", "build"]
EXPOSE 3000