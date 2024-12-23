import { BlogPost } from "../components/BlogPost/BlogPost";
import { AppShell } from "@mantine/core";
import { Navbar } from "../components/Navbar/Navbar";
export function BlogPostPage() {
  return (
    <AppShell>
      <AppShell.Header>
        <Navbar />
      </AppShell.Header>
      <AppShell.Main>
        <BlogPost />
      </AppShell.Main>
    </AppShell>
  );
}
