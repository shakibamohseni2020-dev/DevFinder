export type User = {
    //gitub username, name, bio, avatarUrl, location (latitude and longitude)
  username: string;
  name: string;
  bio: string;
  avatarUrl: string;
  location: {
    latitude: number;
    longitude: number;
  };
};