import { Home } from '@/components/Home/Home';
import { AppShell } from '@mantine/core';

export function HomePage() {
  return (
    <AppShell>
      <AppShell.Main>
        <Home />
      </AppShell.Main>
    </AppShell>
  );
}
