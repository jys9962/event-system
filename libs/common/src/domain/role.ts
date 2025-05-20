export enum Role {
  User = 'USER',
  Operator = 'OPERATOR',
  Auditor = 'AUDITOR',
  Admin = 'ADMIN',
}

export namespace Role {

  export const all = (): Role[] => Object.values(Role) as Role[];

  const hierarchy: Record<Role, Role[]> = {
    ADMIN: [Role.Admin, Role.Operator, Role.User, Role.Auditor],
    OPERATOR: [Role.Operator],
    USER: [Role.User],
    AUDITOR: [Role.Auditor],
  };

  export const hasAccess = (
    userRoles: Role[],
    requiredRoles: Role[],
  ): boolean => {
    const allowedRoles = new Set(
      userRoles.flatMap(t => hierarchy[t] || []),
    );

    return requiredRoles.some(t => allowedRoles.has(t));
  };

}
