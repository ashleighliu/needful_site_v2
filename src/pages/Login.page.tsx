import { Login } from '@/components/Login/Login';
import { AppShell } from '@mantine/core';

export function LoginPage() {
  return (
    <AppShell>
      <AppShell.Main>
        <Login />
      </AppShell.Main>
    </AppShell>
  );
}
