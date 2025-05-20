import { firstValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

export abstract class BaseProxy {

  private readonly logger = new Logger();

  protected constructor(
    private readonly client: ClientProxy,
  ) {}

  protected async send<TResult>(pattern: string, data: Record<string, any>): Promise<TResult> {
    this.logger.debug(`Sending request - Pattern: ${pattern}, Data: ${JSON.stringify(data)}`);
    try {
      const result = await firstValueFrom(this.client.send(pattern, data));
      this.logger.debug(`Received response - Pattern: ${pattern}, Response: ${JSON.stringify(result)}`);
      return result;
    } catch (error: any) {
      this.logger.error(`Failed to send request - Pattern: ${pattern}, Error: ${error.message}`);
      throw error;
    }
  }

  protected emit(pattern: string, data: Record<string, any>): void {
    this.logger.debug(`Emitting event - Pattern: ${pattern}, Data: ${JSON.stringify(data)}`);
    this.client.emit(pattern, data);
  }

}
