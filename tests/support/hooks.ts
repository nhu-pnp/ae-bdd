import { After, Before } from './bdd';
import { resetWorld, world } from './world';

// Chay truoc moi scenario: lam rong "hop chua" du lieu
Before(async () => {
  resetWorld();
});

// Chay sau moi scenario (ke ca khi fail): xoa cac account da tao qua API
After(async ({ request }) => {
  for (const user of world.accountsToDelete) {
    const response = await request.delete('/api/deleteAccount', {
      form: { email: user.email, password: user.password },
    });
    const body = await response.json().catch(() => undefined);
    if (body?.responseCode !== 200) {
      console.warn(`Khong xoa duoc account ${user.email}:`, body ?? response.status());
    }
  }
});
