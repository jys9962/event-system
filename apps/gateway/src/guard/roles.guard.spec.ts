import {
  Controller,
  Get,
  INestApplication,
  MiddlewareConsumer,
  Module,
  NestMiddleware,
  RequestMethod,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AllowRoles } from './allow-roles.decorator';
import { Role } from '@common/domain/role';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';


@Controller()
class TestController {

  constructor() {}

  @Get('guest')
  async guest() {
    return { data: true };
  }

  @AllowRoles(Role.User)
  @Get('user')
  async user() {
    return { data: true };
  }

  @AllowRoles(Role.Auditor)
  @Get('auditor')
  async Auditor() {
    return { data: true };
  }

  @AllowRoles(Role.Operator)
  @Get('operator')
  async Operator() {
    return { data: true };
  }

  @AllowRoles(Role.Admin)
  @Get('admin')
  async admin() {
    return { data: true };
  }

  @AllowRoles(Role.Admin, Role.Auditor)
  @Get('multi')
  async multi() {
    return { data: true };
  }

}

class QueryRoleMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: Function): any {
    if (req.query.role) {
      req.user = {
        role: req.query.role,
      } as any;
    }
    next();
  }
}

@Module({
  controllers: [
    TestController,
  ],
})
class TestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(QueryRoleMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL }); // 전 API 적용
  }

}

describe('AllowRoles', function () {
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

  describe('권한 설정이 없으면', function () {
    it('비회원을 포함한 모든 요청이 허용된다', async function () {
      await request(app.getHttpServer())
        .get('/guest')
        .expect(200);
    });
  });

  describe('권한 설정이 있으면', function () {

    it('비회원 요청은 오류가 발생한다.', async function () {
      await request(app.getHttpServer())
        .get(`/user`)
        .expect(403);
    });

    it('허용된 권한이 아닌 경우 오류가 발생한다.', async function () {
      await request(app.getHttpServer())
        .get(`/user?role=${Role.Operator}`)
        .expect(403);
    });

    it('허용된 권한은 정상동작한다.', async function () {
      await request(app.getHttpServer())
        .get(`/user?role=${Role.User}`)
        .expect(200);
    });

  });

  describe('허용된 권한이 여러개인 경우', function () {

    it.each([
      { role: Role.User, expected: 403 },
      { role: Role.Admin, expected: 200 },
      { role: Role.Auditor, expected: 200 },
      { role: Role.Operator, expected: 403 },
    ])('하나라도 만족하는 경우 정상동작한다', async function ({ role, expected }) {
      await request(app.getHttpServer())
        .get(`/multi?role=${role}`)
        .expect(expected);
    });
  });


});
