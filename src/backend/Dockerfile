FROM node:24.11.1-alpine

WORKDIR /app

# Habilita o pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copia as dependências para dentro do container
COPY package.json pnpm-lock.yaml ./

ENV CI=true

# Instala dependências
RUN pnpm install

# Agora copia o código para dentro do container
COPY . .

WORKDIR /app/src

# Back roda na porta 3000 xD
EXPOSE 3000

CMD ["node", "server.js"]