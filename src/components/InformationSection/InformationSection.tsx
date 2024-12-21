import { Center, Image, Title, Text, Box, Grid } from "@mantine/core";
import AppPreviews from "../../assets/AppPreviews.svg";
import classes from "./InformationSection.module.css";

export function InformationSection() {
  return (
    <Grid align="center" gutter="xl" mt={200}>
      <Grid.Col span={6}>
        <Center ml={100}>
          <Image className={classes.icon} src={AppPreviews} />
        </Center>
      </Grid.Col>
      <Grid.Col span={6}>
        <Center className={classes.marginRightIntroduction}>
          <Box>
            <Title
              order={2}
              style={{ color: "#404040" }}
              className={classes.title}
            >
              Meditation meets productivity
            </Title>
            <Text c="#555555" mt={25} size="md" className={classes.body}>
              Needful is the only meditation app designed with productivity
              features for individuals and teams.
            </Text>
            <Text c="#555555" mt={25} size="md" className={classes.body}>
              The micro-meditation protocol provides all of the benefits of
              traditional meditation, while allowing users to easily incorporate
              it into existing workflows and routines.
            </Text>
            <Text c="#555555" mt={25} size="md" className={classes.body}>
              While users effortlessly tap into deeper levels of concentration,
              to-dos or breakthroughs are generated and stored in Needful.
            </Text>
          </Box>
        </Center>
      </Grid.Col>
    </Grid>
  );
}
