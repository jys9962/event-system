import { NestFactory } from '@nestjs/core';
import { GatewayAppModule } from './gateway-app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(GatewayAppModule);

  const config = new DocumentBuilder()
    .setTitle('Event')
    .setVersion('1.0')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, documentFactory);

  const port = app.get(ConfigService).getOrThrow('GATEWAY_PORT');
  await app.listen(port);
}

bootstrap();
