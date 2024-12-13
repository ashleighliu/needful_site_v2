import { PrivacyPolicy } from "../components/PrivacyPolicy/PrivacyPolicy";
import { AppShell } from "@mantine/core";
import { Navbar } from "../components/Navbar/Navbar";
export function PrivacyPolicyPage() {
  return (
    <AppShell>
      <AppShell.Header>
        <Navbar />
      </AppShell.Header>
      <AppShell.Main>
        <PrivacyPolicy />
      </AppShell.Main>
    </AppShell>
  );
}
