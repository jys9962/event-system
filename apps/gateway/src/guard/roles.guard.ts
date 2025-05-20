import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '@common/domain/role';
import { ROLES_META_KEY } from './allow-roles.decorator';
import { NonEmptyArray } from '@common/util/util.types';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const allowRoles = this.reflector.getAllAndOverride<NonEmptyArray<Role>>(ROLES_META_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!allowRoles) {
      return true;
    }

    const { user }: Express.Request = context.switchToHttp().getRequest();
    if (!user) {
      return false;
    }

    return Role.hasAccess(user.roles, allowRoles);
  }
}
