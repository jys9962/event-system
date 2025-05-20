import { Role } from '@common/domain/role';

describe('Role', function () {

  it('all()', async function () {
    expect(Role.all.length).toEqual(4);
    expect(Role.all[0]).toEqual(Role.User);
  });

  describe('isAllow()', function () {
    it.each([
      { required: [Role.User] },
      { required: [Role.Operator] },
      { required: [Role.Auditor] },
      { required: [Role.Admin] },
    ])('Admin은 모든 역할에 접근 가능해야 한다', ({ required }) => {
      expect(Role.hasAccess([Role.Admin], required)).toBe(true);
    });

    it('Operator는 Operator만 접근 가능해야 한다', () => {
      expect(Role.hasAccess([Role.Operator], [Role.Operator])).toBe(true);
      expect(Role.hasAccess([Role.Operator], [Role.User])).toBe(false);
      expect(Role.hasAccess([Role.Operator], [Role.Admin])).toBe(false);
    });

    it('User는 User만 접근 가능해야 한다', () => {
      expect(Role.hasAccess([Role.User], [Role.User])).toBe(true);
      expect(Role.hasAccess([Role.User], [Role.Operator])).toBe(false);
      expect(Role.hasAccess([Role.User], [Role.Admin])).toBe(false);
    });

    it('Auditor는 Auditor만 접근 가능해야 한다', () => {
      expect(Role.hasAccess([Role.Auditor], [Role.Auditor])).toBe(true);
      expect(Role.hasAccess([Role.Auditor], [Role.User])).toBe(false);
      expect(Role.hasAccess([Role.Auditor], [Role.Admin])).toBe(false);
    });

    it('allowsRoles에 여러 개가 있어도 하나라도 포함되면 true', () => {
      expect(Role.hasAccess([Role.Admin], [Role.User, Role.Operator])).toBe(true);
      expect(Role.hasAccess([Role.Operator], [Role.User, Role.Auditor])).toBe(false);
    });

    it('허용된 역할이 없으면 항상 false', () => {
      expect(Role.hasAccess([Role.User], [])).toBe(false);
      expect(Role.hasAccess([Role.Admin], [])).toBe(false);
    });
  });

});
