FROM oven/bun:latest

WORKDIR /app

COPY package.json bun.lockb ./

RUN bun install

COPY . .

EXPOSE 443

ENV NODE_ENV=production
ENV PORT=443

CMD ["bun", "run", "main.js"]
