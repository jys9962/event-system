import { Test, TestingModule } from '@nestjs/testing';
import { INestMicroservice } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { AuthAppModule } from '../../src/auth-app.module';
import { firstValueFrom } from 'rxjs';

describe('Microservice E2E', () => {
  let app: INestMicroservice;
  let client: ClientProxy;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AuthAppModule],
    }).compile();

    app = moduleFixture.createNestMicroservice({
      transport: Transport.TCP,
    });

    await app.listen();

    client = ClientProxyFactory.create({
      transport: Transport.TCP,
    });
  });

  afterAll(async () => {
    await app.close();
    await client.close();
  });

  it('should return sum of numbers', async () => {
    const result = await firstValueFrom(
      client.send('sign-up', [1, 2, 3]),
    );

    console.log({ result });
  });
});
