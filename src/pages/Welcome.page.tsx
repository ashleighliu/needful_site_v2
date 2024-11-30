import { Welcome } from '@/components/Welcome/Welcome';
import { Navbar } from '../components/Navbar/Navbar';
import { AppShell } from '@mantine/core';

export function WelcomePage() {
  return (
    <AppShell>
      <AppShell.Header>
        <Navbar />
      </AppShell.Header>
      <AppShell.Main>
        <Welcome />
      </AppShell.Main>
    </AppShell>
  );
}
