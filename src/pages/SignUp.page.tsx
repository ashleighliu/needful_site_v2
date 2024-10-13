import { SignUp } from '../components/SignUp/SignUp';
import { AppShell } from '@mantine/core';

export function SignUpPage() {
  return (
    <AppShell>
      <AppShell.Main>
        <SignUp />
      </AppShell.Main>
    </AppShell>
  );
}
