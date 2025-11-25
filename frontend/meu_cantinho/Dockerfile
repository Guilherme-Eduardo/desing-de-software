FROM node:24.11.1-alpine

WORKDIR /app

# Habilita o PNPM
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copia tudo do projeto
COPY . .

# Instala dependências
RUN pnpm install

# Gera o build do Next.js
RUN pnpm build

EXPOSE 3000

CMD ["pnpm", "start"]
