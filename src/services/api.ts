import type { User } from '../types/user';
const baseUrl = process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:3333';

/**
 * Fetches all registered users from the backend.
 */
export async function fetchUsers(): Promise<User[]> {
  const response = await fetch(`${baseUrl}/users`);

  if (!response.ok) {
    throw new Error(`Failed to fetch users: ${response.status}`);
  }

  return response.json();
}

 //Registers a new user in the backend.
 
export async function registerUser(user: Omit<User, 'id'>): Promise<User> {
  const response = await fetch(`${baseUrl}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    throw new Error(`Failed to register user: ${response.status}`);
  }

  return response.json();
}