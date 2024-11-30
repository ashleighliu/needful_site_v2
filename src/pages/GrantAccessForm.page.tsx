import { GrantAccessForm } from '../components/GrantAccessForm/GrantAccessForm';
import { AppShell } from '@mantine/core';
import { Navbar } from '../components/Navbar/Navbar';
export function GrantAccessFormPage() {
  return (
    <AppShell>
      <AppShell.Header>
        <Navbar />
      </AppShell.Header>
      <AppShell.Main>
        <GrantAccessForm />
      </AppShell.Main>
    </AppShell>
  );
}
