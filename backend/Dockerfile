FROM node:24.11.1-alpine

WORKDIR /app

# Habilita o PNPM
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copia apenas arquivos de dependências primeiro (melhor cache)
COPY package.json pnpm-lock.yaml ./

# Diz para o pnpm que está em ambiente CI (sem TTY)
ENV CI=true

# Instala dependências
RUN pnpm install

# Agora copia o restante do código
COPY . .

EXPOSE 3002

CMD ["pnpm", "start"]