FROM node:24.11.1-alpine

WORKDIR /app

# habilita pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

COPY package.json pnpm-lock.yaml ./

# impede erros no Docker
ENV CI=true

# instala dependências
RUN pnpm install

# agora copia todo o projeto
COPY . .

# build da aplicação
RUN pnpm build

EXPOSE 3000

CMD ["pnpm", "start"]
