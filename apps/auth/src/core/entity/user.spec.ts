import { User } from './user';

describe('User', function () {

  it('password', async function () {

    const user = new User();
    user.password = '$argon2id$v=19$m=65536,t=3,p=4$l4M0r7VurxXJFTpmsWEr0Q$DN5OTAGbbGtDtYbB0DKiO75jzJNhqKRrfS7nwNiAs+k';

    // await user.setPassword('admin');


    expect(await user.signIn('admin')).toBe(true);
  });

});
