export type User = {
  /** Unique identifier assigned by the backend */
  id: number;

  /** GitHub username (e.g. "torvalds") */
  username: string;

  /** Full display name (e.g. "Linus Torvalds") */
  name: string;

  /** Short bio or affiliation shown in the map tooltip */
  bio: string;

  /** URL to the user's avatar image (typically from GitHub) */
  avatarUrl: string;

  /** Geographic location used to pin the user on the map */
  location: {
    latitude: number;
    longitude: number;
  };
};