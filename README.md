### 실행

```sh
docker-compose up -d --build
```

### 프로젝트 구조

```
root
├── apps/                    # 마이크로서비스 애플리케이션
│   ├── gateway/             # Gateway 서버
│   ├── auth/                # Auth 서버
│   └── event/               # Event 서버 
└── libs/                    # 
    └── common/              # 공통 라이브러리
```
