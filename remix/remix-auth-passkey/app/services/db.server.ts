import { type Authenticator } from "remix-auth-webauthn";

export type User = { id: string; username: string };

const authenticators = new Map<string, Authenticator>();
const users = new Map<string, User>();
export function getAuthenticatorById(id: string) {
  return authenticators.get(id) || null;
}
export function getAuthenticators(user: User | null) {
  if (!user) return [];

  const userAuthenticators: Authenticator[] = [];
  authenticators.forEach((authenticator) => {
    if (authenticator.userId === user.id) {
      userAuthenticators.push(authenticator);
    }
  });

  return userAuthenticators;
}
export function getUserByUsername(username: string) {
  users.forEach((user) => {
    if (user.username === username) {
      return user;
    }
  });
  return null;
}
export function getUserById(id: string) {
  return users.get(id) || null;
}
export function createAuthenticator(
  authenticator: Omit<Authenticator, "userId">,
  userId: string
) {
  authenticators.set(authenticator.credentialID, { ...authenticator, userId });
}
export function createUser(username: string) {
  const user = { id: Math.random().toString(36), username };
  users.set(user.id, user);
  return user;
}