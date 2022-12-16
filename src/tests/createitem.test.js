import { login } from '../js/api/auth/login.js';
import { createPost } from '../js/api/posts/create.js';

describe('Create post function', () => {
  it('creates a new post on the API', async () => {
    await login('oysRos99836@stud.noroff.no', 'Password98');
    const testPost = await createPost('test', 'testing');
    expect(testPost.body).toEqual('testing');
  });
});
