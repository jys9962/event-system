import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthGatewayController } from './modules/auth-gateway.controller';
import { EventGatewayController } from './modules/event-gateway.controller';
import { JwtMiddleware } from './core/jwt.middleware';
import { ProxyModule } from './proxy/proxy.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ProxyModule,
  ],
  controllers: [
    AuthGatewayController,
    EventGatewayController,
  ],
  providers: [],
})
export class GatewayAppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL }); // 전 API 적용
  }
}
