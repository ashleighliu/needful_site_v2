import { VerifyEmail } from '@/components/VerifyEmail/VerifyEmail';
import { Navbar } from '../components/Navbar/Navbar';
import { AppShell } from '@mantine/core';

export function VerifyEmailPage() {
  return (
    <AppShell>
      <AppShell.Header>
        <Navbar />
      </AppShell.Header>
      <AppShell.Main>
        <VerifyEmail />
      </AppShell.Main>
    </AppShell>
  );
}
