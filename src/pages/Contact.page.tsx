import { Contact } from '../components/Contact/Contact';
import { AppShell } from '@mantine/core';
import { Navbar } from '../components/Navbar/Navbar';
export function ContactPage() {
  return (
    <AppShell>
      <AppShell.Header>
        <Navbar />
      </AppShell.Header>
      <AppShell.Main>
        <Contact />
      </AppShell.Main>
    </AppShell>
  );
}
