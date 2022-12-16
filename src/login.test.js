import { login } from '../js/api/auth/login.js';

describe('Login function', () => {
  it('returns a valid token when provided with valid credentials', async () => {
    await login('oysRos99836@stud.noroff.no', 'Password98');
    const accessToken = localStorage.getItem('accessToken');
    expect(accessToken).toBeTruthy();
  });
});
