import { Box, Button, Center, Grid, Image, Text, Title } from "@mantine/core";
import Features from "../../assets/Features.svg";
import NeedfulIconAnimated from "../../assets/NeedfulIconAnimated.mp4";
import MobilePreview from "../../assets/MobilePreview.svg";
import NeedfulExplainerVideo from "../../assets/NeedfulExplainerVideo.mp4";
import { MutableRefObject, ReactNode } from "react";

type IntroductionSectionProps = {
  targetRef: MutableRefObject<HTMLDivElement>;
};

export function IntroductionSection(props: IntroductionSectionProps) {
  const { targetRef } = props;

  return (
    <Box mt={100}>
      {/* Add a title above the explainer video */}
      <Center>
        <Box mb={20}>
          <Title order={2} style={{ color: "#404040" }}>
            Needful Explainer Video
          </Title>
        </Box>
      </Center>

      {/* Add the explainer video */}
      <Center ref={targetRef}>
        <video
          controls
          src={NeedfulExplainerVideo}
          style={{ width: "100%", maxWidth: "800px", height: "auto" }}
        />
      </Center>

      <Grid align="center" mt={100}>
        <Grid.Col span={6}>
          <Center>
            <video autoPlay loop muted src={NeedfulIconAnimated} />
          </Center>
        </Grid.Col>
        <Grid.Col span={6}>
          <Center mr={300}>
            <Box>
              <Title order={2} style={{ color: "#404040" }}>
                What is Needful?
              </Title>
              <Text c="#555555" mt={50} size="md">
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
          <Center>
            <Image src={MobilePreview} />
          </Center>
        </Grid.Col>
        <Grid.Col span={6}>
          <Center mr={300}>
            <Box>
              <Title order={2} style={{ color: "#404040" }}>
                What does Needful do?
              </Title>
              <Text c="#555555" mt={50} size="md">
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
          <Center mr={300}>
            <Box>
              <Title order={2} style={{ color: "#404040" }}>
                How does Needful work?
              </Title>
              <Text c="#555555" mt={50} size="md">
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
