import { NestFactory } from '@nestjs/core';
import { AsyncMicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { EventAppModule } from './event-app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<AsyncMicroserviceOptions>(
    EventAppModule,
    {
      useFactory: (configService: ConfigService) => ({
        transport: Transport.TCP,
        options: {
          port: configService.get<number>('EVENT_SERVICE_PORT'),
        },
      }),
      inject: [ConfigService],
    },
  );


  await app.listen();
}

bootstrap();
