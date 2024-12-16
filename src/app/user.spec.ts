import { User } from './user';

describe('User', () => {
  it('should create an instance', () => {
    const user = new User(
      'John Doe', 
      'johndoe', 
      'https://example.com/avatar.jpg', 
      'https://github.com/johndoe', // html_url
      'New York', // location
      'Software Engineer', // bio
      10, // public_repos
      100, // followers
      50, // following
      new Date('2022-01-01') // created_at
    );
    expect(user).toBeTruthy();
  });
});
