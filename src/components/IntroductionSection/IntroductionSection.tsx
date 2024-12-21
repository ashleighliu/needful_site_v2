import { Box, Button, Center, Grid, Image, Text, Title } from "@mantine/core";
import Features from "../../assets/Features.svg";
import NeedfulIconAnimated from "../../assets/NeedfulIconAnimated.mp4";
import MobilePreview from "../../assets/MobilePreview.svg";
import classes from "./IntroductionSection.module.css";

export function IntroductionSection() {
  return (
    <Box mt={100}>
      <Grid align="center">
        <Grid.Col span={6}>
          <Center>
            <video
              className={classes.icon}
              autoPlay
              loop
              muted
              src={NeedfulIconAnimated}
            />
          </Center>
        </Grid.Col>
        <Grid.Col span={6}>
          <Center className={classes.marginRightIntroduction}>
            <Box>
              <Title order={2} className={classes.title}>
                What is Needful?
              </Title>
              <Text c="#555555" size="md" className={classes.body}>
                Needful combines the most accessible, effortless meditation
                technique that anyone can use, with a platform designed to boost
                productivity, enhance creativity, and achieve powerful results
                in life and work.
              </Text>
            </Box>
          </Center>
        </Grid.Col>
      </Grid>
      <Grid align="center" mt={200}>
        <Grid.Col span={6}>
          <Center className={classes.marginRightIntroduction}>
            <Image src={MobilePreview} />
          </Center>
        </Grid.Col>
        <Grid.Col span={6}>
          <Center className={classes.marginRightIntroduction}>
            <Box>
              <Title order={2} className={classes.title}>
                What does Needful do?
              </Title>
              <Text c="#555555" size="md" className={classes.body}>
                Needful facilitates a powerful micro-meditation protocol
                enhanced with a tactile interface and audio experience that
                increases concentration, creativity, and problem solving
                ability.
              </Text>
            </Box>
          </Center>
        </Grid.Col>
      </Grid>
      <Grid align="center" mt={200}>
        <Grid.Col span={6}>
          <Center>
            <Image src={Features} />
          </Center>
        </Grid.Col>
        <Grid.Col span={6}>
          <Center className={classes.marginRightIntroduction}>
            <Box>
              <Title order={2} className={classes.title}>
                How does Needful work?
              </Title>
              <Text c="#555555" size="md" className={classes.body}>
                The Needful micro-meditation technique quiets the mind and
                cultivates a deeper state of awareness bringing to the surface
                thoughts, ideas and initiatives which chart your path to
                success.
              </Text>
            </Box>
          </Center>
        </Grid.Col>
      </Grid>
      <Center mt={100}>
        <Button fz="md" radius="xl" variant="outline" h={50} w={250}>
          Get a Tour
        </Button>
      </Center>
    </Box>
  );
}
