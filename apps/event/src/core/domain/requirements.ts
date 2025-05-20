export type RequirementsPayload = Record<string, any>;

export interface Requirements {
  type: string;
  payload: RequirementsPayload;
}
