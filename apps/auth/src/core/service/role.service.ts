import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../entity/user';
import { Model } from 'mongoose';
import { AddRoles, RemoveRoles, UpdateRoles } from '@common/services/auth/auth-app.service.method';

@Injectable()
export class RoleService {

  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async addRoles(
    {
      userId,
      roles,
    }: AddRoles.Request,
  ): Promise<void> {
    await this.userModel.findByIdAndUpdate(
      userId,
      { $addToSet: { roles: { $each: roles } } },
    );
  }

  async removeRoles(
    {
      userId,
      roles,
    }: RemoveRoles.Request,
  ): Promise<void> {
    await this.userModel.findByIdAndUpdate(
      userId,
      { $pullAll: { roles: roles } },
    );
  }

  async updateRoles(
    {
      userId,
      roles,
    }: UpdateRoles.Request,
  ): Promise<void> {
    await this.userModel.findByIdAndUpdate(
      userId,
      { $set: { roles: roles } },
    );
  }

}
