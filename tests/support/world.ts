import { User } from '../data/user';

export const world = {
  user: undefined as User | undefined,
  accountsToDelete: [] as User[],
};

export function resetWorld() {
  world.user = undefined;
  world.accountsToDelete = [];
}
