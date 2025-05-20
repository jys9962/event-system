import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthAppService } from '@common/services/auth/auth-app.service';
import { AuthAppServiceProxy } from './auth-app.service.proxy';
import { EventAppService } from '@common/services/event/event-app.service';
import { EventAppServiceProxy } from './event-app.service.proxy';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        imports: [ConfigModule],
        name: 'AUTH_SERVICE',
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configService.getOrThrow<string>('AUTH_SERVICE_HOST'),
            port: configService.getOrThrow<number>('AUTH_SERVICE_PORT'),
          },
        }),
        inject: [ConfigService],
      },
    ]),
    ClientsModule.registerAsync([
      {
        imports: [ConfigModule],
        name: 'EVENT_SERVICE',
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configService.getOrThrow<string>('EVENT_SERVICE_HOST'),
            port: configService.getOrThrow<number>('EVENT_SERVICE_PORT'),
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  providers: [
    {
      provide: AuthAppService,
      useClass: AuthAppServiceProxy,
    },
    {
      provide: EventAppService,
      useClass: EventAppServiceProxy,
    },
  ],
  exports: [
    AuthAppService,
    EventAppService,
  ],
})
export class ProxyModule {}
