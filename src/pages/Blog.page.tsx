import { Blog } from "../components/Blog/Blog";
import { AppShell } from "@mantine/core";
import { Navbar } from "../components/Navbar/Navbar";
export function BlogPage() {
  return (
    <AppShell>
      <AppShell.Header>
        <Navbar />
      </AppShell.Header>
      <AppShell.Main>
        <Blog />
      </AppShell.Main>
    </AppShell>
  );
}
