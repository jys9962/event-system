import { RequirementsPayload } from './requirements';

export interface RequirementsManager<TPayload extends RequirementsPayload> {
  get type(): string;

  isSatisfied(
    userId: string,
    requirements: TPayload,
  ): Promise<boolean>;

  isValidPayload(payload: TPayload): boolean;
}
