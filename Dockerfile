# -------------------------
# 🛠️ 1. Build Stage
# -------------------------
FROM node:18-alpine AS builder

WORKDIR /app

# 의존성 설치를 위한 복사
COPY package*.json ./
COPY nest-cli.json tsconfig*.json ./

# 앱 및 라이브러리 복사
COPY .env ./.env
COPY apps ./apps
COPY libs ./libs

# 의존성 설치
RUN npm install

# APP_NAME 인자로 받기
ARG APP_NAME

# 앱 빌드
RUN npm run build:$APP_NAME

# -------------------------
# 🚀 2. Runtime Stage
# -------------------------
FROM node:18-alpine AS runner

WORKDIR /app

# 실행에 필요한 파일만 복사
COPY --from=builder /app/.env ./
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

# APP_NAME 전달 및 런타임 지정
ARG APP_NAME
ENV APP_NAME=${APP_NAME}

# 앱 실행
CMD ["sh", "-c", "node dist/apps/$APP_NAME/main.js"]
