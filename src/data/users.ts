import type { User } from '../types/user';
//Mock user data for development
export const mockUsers: User[] = [
  {
    username: 'torvalds',
    name: 'Linus Torvalds',
    bio: 'Linux Foundation',
    avatarUrl: 'https://avatars.githubusercontent.com/u/1024025?v=4',
    location: {
      latitude: 37.7749,
      longitude: -122.4194,
    },
  },
  {
    username: 'gaearon',
    name: 'Dan Abramov',
    bio: 'React core team',
    avatarUrl: 'https://avatars.githubusercontent.com/u/810438?v=4',
    location: {
      latitude: 37.8044,
      longitude: -122.2712,
    },
  },
  {
    username: 'tj',
    name: 'TJ Holowaychuk',
    bio: 'Open source maintainer',
    avatarUrl: 'https://avatars.githubusercontent.com/u/25254?v=4',
    location: {
      latitude: 37.6688,
      longitude: -122.0808,
    },
  },
];