import { logout } from '../js/api/auth/logout.js';

describe('logout function', () => {
  it('Clears the token from browser storage', () => {
    logout();
    const accessToken = localStorage.getItem('accessToken');
    expect(accessToken).toBeFalsy();
  });
});
