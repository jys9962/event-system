import { Controller, Get, INestApplication, MiddlewareConsumer, Module, Req, RequestMethod } from '@nestjs/common';
import { JwtMiddleware } from './jwt.middleware';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { ConfigModule } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';

const JWT_SECRET = 'secret';

@Controller()
class TestController {
  @Get()
  async user(
    @Req() request: Express.Request,
  ) {
    return { user: request.user };
  }
}

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [
        () => ({
          JWT_SECRET: JWT_SECRET,
        }),
      ],
      ignoreEnvFile: true,
    }),
  ],
  controllers: [TestController],
})
class TestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}

describe('JwtMiddleware', function () {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TestModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });


  it('인증 헤더가 없으면 user가 undefined 이다.', async function () {
    const response = await request(app.getHttpServer())
      .get('/')
      .expect(200);

    expect(response.body.user).toBeUndefined();
  });

  describe('인증 헤더가 있으면', function () {
    it('올바른 JWT 토큰이면 user가 설정된다.', async function () {
      const validToken = jwt.sign({ userId: 'test-user-id' }, JWT_SECRET);

      const response = await request(app.getHttpServer())
        .get('/')
        .set('Authorization', `Bearer ${validToken}`)
        .expect(200);

      expect(response.body.user).toMatchObject({ userId: 'test-user-id' });
    });

    it('잘못된 JWT 토큰이면 오류가 발생한다.', async function () {
      const invalidToken = 'invalid-token';

      const response = await request(app.getHttpServer())
        .get('/')
        .set('Authorization', `Bearer ${invalidToken}`)
        .expect(401);

      expect(response.body.user).toBeUndefined();
    });
  });

});
