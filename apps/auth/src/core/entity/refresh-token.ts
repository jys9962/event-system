import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type RefreshTokenDocument = HydratedDocument<RefreshToken>;

@Schema({ collection: 'refreshToken' })
export class RefreshToken {
  @Prop({ required: true })
  userId!: string;

  @Prop({ required: true })
  token!: string;

  @Prop({ required: true })
  expiresAt!: Date;

  @Prop({ default: false })
  revoked!: boolean;

  isActive(current: Date) {
    return current.getTime() > this.expiresAt.getTime();
  }
}


export const RefreshTokenSchema = SchemaFactory.createForClass(RefreshToken);
