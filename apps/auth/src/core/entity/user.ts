import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Role } from '@common/domain/role';
import * as argon2 from 'argon2';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true, collection: 'users' })
export class User {
  @Prop({ required: true, unique: true })
  name!: string;

  @Prop({ required: true })
  password!: string;

  @Prop({ required: true, type: [String], enum: Role.all() })
  roles!: Role[];

  id!: string;
  createdAt!: Date;
  updatedAt!: Date;

  isActiveUser() {
    // todo: 유저 상태 검사 ex:회원탈퇴

    return true;
  }

  async signIn(password: string): Promise<boolean> {
    if (!this.isActiveUser()) {
      return false;
    }

    return argon2.verify(this.password, password);
  }

  async setPassword(password: string) {
    this.password = await argon2.hash(password);
  }
}


export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.methods.isActiveUser = User.prototype.isActiveUser;
UserSchema.methods.signIn = User.prototype.signIn;
UserSchema.methods.setPassword = User.prototype.setPassword;

