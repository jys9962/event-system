import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { Role } from '@common/domain/role';
import { RolesGuard } from './roles.guard';
import { NonEmptyArray } from '@common/util/util.types';

export const ROLES_META_KEY = Symbol('roles');

export const AllowRoles =
  (...roles: NonEmptyArray<Role>) =>
    applyDecorators(
      SetMetadata(ROLES_META_KEY, roles),
      UseGuards(RolesGuard),
    );
