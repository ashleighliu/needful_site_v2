import { Link } from "react-router-dom";
import { Grid, Image, Title, Text, Box } from "@mantine/core";
import MeditatingWoman from "../../assets/MeditatingWoman.jpg";
import classes from "./Blog.module.css";

export const blogEntries = [
  {
    id: 1,
    title: "Welcome to the Needful Blog",
    excerpt:
      "Stay tuned for insights, updates, and tips to help you maximize your experience with Needful.",
    content: `Our blog is here to inspire and guide you, combining mindfulness and productivity into one seamless journey. 
    Check back regularly for content that empowers your personal and professional growth with Needful.`,
    image: MeditatingWoman,
  },
  {
    id: 2,
    title: "Meditation Meets Productivity",
    excerpt:
      "Discover how Needful blends meditation and productivity for individuals and teams.",
    content: `Needful is the only meditation app designed with productivity features for individuals and teams. 
    The micro-meditation protocol provides all of the benefits of traditional meditation, while allowing users to easily incorporate it into existing workflows and routines.`,
    image: MeditatingWoman,
  },
];

export function Blog() {
  return (
    <div className={classes.blogContainer}>
      <Title order={2} className={classes.sectionTitle}>
        Latest Mindfulness Articles
      </Title>
      <Grid gutter="lg">
        {blogEntries.map((entry) => (
          <Grid.Col key={entry.id}>
            <Link to={`/blog/${entry.id}`} className={classes.blogLink}>
              <Box className={classes.blogCard}>
                <Image
                  className={classes.blogImage}
                  src={entry.image}
                  alt={entry.title}
                />
                <Text className={classes.blogTitle}>{entry.title}</Text>
                <Text className={classes.blogExcerpt}>{entry.excerpt}</Text>
              </Box>
            </Link>
          </Grid.Col>
        ))}
      </Grid>
    </div>
  );
}
