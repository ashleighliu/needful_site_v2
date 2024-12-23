import { Link, useParams } from "react-router-dom";
import {
  Center,
  Image,
  Title,
  Text,
  Box,
  Container,
  Grid,
} from "@mantine/core";
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

      <section className={classes.moreBlogsSection}>
        <Title order={2} className={classes.moreBlogsTitle}>
          Check out more blogs:
        </Title>
        <Grid gutter="lg">
          {blogEntries
            .filter((blog) => blog.id !== entry.id)
            .map((blog) => (
              <Grid.Col key={blog.id}>
                <Link to={`/blog/${blog.id}`} className={classes.blogLink}>
                  <Box className={classes.blogCard}>
                    <Image
                      className={classes.blogImage}
                      src={blog.image}
                      alt={blog.title}
                    />
                    <Text className={classes.blogTitle}>{blog.title}</Text>
                    <Text className={classes.blogExcerpt}>{blog.excerpt}</Text>
                  </Box>
                </Link>
              </Grid.Col>
            ))}
        </Grid>
      </section>
    </Container>
  );
}
