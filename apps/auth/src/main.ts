import { NestFactory } from '@nestjs/core';
import { AuthAppModule } from './auth-app.module';
import { AsyncMicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<AsyncMicroserviceOptions>(
    AuthAppModule,
    {
      useFactory: (configService: ConfigService) => ({
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: configService.get<number>('AUTH_SERVICE_PORT'),
        },
      }),
      inject: [ConfigService],
    },
  );


  await app.listen();
}

bootstrap();
