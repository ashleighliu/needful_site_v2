import { Link, useParams } from "react-router-dom";
import { Center, Image, Title, Text, Box, Container } from "@mantine/core";
import { blogEntries } from "../Blog/Blog";
import classes from "./BlogPost.module.css";

// BlogPost Component (for individual blog pages)
export function BlogPost() {
  const { post } = useParams();
  if (!post) return <Text>Blog post not found.</Text>;
  const entry = blogEntries.find((entry) => entry.id === parseInt(post));
  if (!entry) return <Text>Blog post not found.</Text>;

  return (
    <Container
      size="lg"
      className={classes.postContainer}
      style={{ marginTop: "100px" }}
    >
      <header className={classes.postHeader}>
        <Title order={1} className={classes.postTitle}>
          {entry.title}
        </Title>
        <Text className={classes.postDate} color="dimmed">
          Published: December 22, 2024
        </Text>
      </header>
      <Image className={classes.postImage} src={entry.image} />
      <article className={classes.postContentContainer}>
        <Text size="lg" className={classes.postContent}>
          {entry.content}
        </Text>
      </article>
    </Container>
  );
}
