import { User } from '../data/user';

export const world = {
  user: undefined as User | undefined,
  accountsToDelete: [] as User[],
};

export function resetWorld() {
  world.user = undefined;
  world.accountsToDelete = [];
}

// Lay user da tao trong scenario (qua signup hoac API); bao loi ro rang neu chua tao
export function currentUser(): User {
  if (!world.user) {
    throw new Error(
      'Chua tao user - hay chay buoc tao user (signup hoac account da dang ky) truoc',
    );
  }
  return world.user;
}
