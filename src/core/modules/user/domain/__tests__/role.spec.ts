import { Role, RoleType } from '../role';

describe('Role', () => {
  describe('canViewAgents', () => {
    it('should return true if role type is RoleType.SuperAdmin', () => {
      const role = new Role({ roleName: RoleType.SuperAdmin });
      expect(role.canViewAgents()).toBeTruthy();
    });

    it('should return true if role type is RoleType.Admin', () => {
      const role = new Role({ roleName: RoleType.Admin });
      expect(role.canViewAgents()).toBeTruthy();
    });

    it('should return true if role type is RoleType.Editor', () => {
      const role = new Role({ roleName: RoleType.Editor });
      expect(role.canViewAgents()).toBeTruthy();
    });

    it('should return true if role type is RoleType.User', () => {
      const role = new Role({ roleName: RoleType.User });
      expect(role.canViewAgents()).toBeTruthy();
    });

    it('should return false if role type is RoleType.None', () => {
      const role = new Role({ roleName: RoleType.None });
      expect(role.canViewAgents()).toBeFalsy();
    });
  });

  describe('canViewUsers', () => {
    it('should return true if role type is RoleType.SuperAdmin', () => {
      const role = new Role({ roleName: RoleType.SuperAdmin });
      expect(role.canViewUsers()).toBeTruthy();
    });

    it('should return true if role type is RoleType.Admin', () => {
      const role = new Role({ roleName: RoleType.Admin });
      expect(role.canViewUsers()).toBeTruthy();
    });

    it('should return false if role type is RoleType.Editor', () => {
      const role = new Role({ roleName: RoleType.Editor });
      expect(role.canViewUsers()).toBeFalsy();
    });

    it('should return false if role type is RoleType.User', () => {
      const role = new Role({ roleName: RoleType.User });
      expect(role.canViewUsers()).toBeFalsy();
    });

    it('should return false if role type is RoleType.None', () => {
      const role = new Role({ roleName: RoleType.None });
      expect(role.canViewUsers()).toBeFalsy();
    });
  });

  describe('canViewAgencies', () => {
    it('should return true if role type is RoleType.SuperAdmin', () => {
      const role = new Role({ roleName: RoleType.SuperAdmin });
      expect(role.canViewAgencies()).toBeTruthy();
    });

    it('should return false if role type is RoleType.Admin', () => {
      const role = new Role({ roleName: RoleType.Admin });
      expect(role.canViewAgencies()).toBeFalsy();
    });

    it('should return false if role type is RoleType.Editor', () => {
      const role = new Role({ roleName: RoleType.Editor });
      expect(role.canViewAgencies()).toBeFalsy();
    });

    it('should return false if role type is RoleType.User', () => {
      const role = new Role({ roleName: RoleType.User });
      expect(role.canViewAgencies()).toBeFalsy();
    });

    it('should return false if role type is RoleType.None', () => {
      const role = new Role({ roleName: RoleType.None });
      expect(role.canViewAgencies()).toBeFalsy();
    });
  });
});
