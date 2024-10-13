import { AppShell } from '@mantine/core';
import { SSOLogin } from '../components/SSOLogin/SSOLogin';
import { Navbar } from '../components/Navbar/Navbar';

export function SSOLoginPage() {
  return (
    <AppShell>
      <AppShell.Header>
        <Navbar />
      </AppShell.Header>
      <AppShell.Main>
        <SSOLogin />
      </AppShell.Main>
    </AppShell>
  );
}
